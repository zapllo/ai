// app/api/webhook/route.ts
import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import connectDB from "@/lib/db";
import Call from "@/models/callModel";

const SECRET = process.env.ELEVENLABS_WEBHOOK_SECRET!;

/** Verify ElevenLabs signature header */
function isValidSignature(raw: Buffer, header: string | null) {
  if (!header) return false;

  const parts = header.split(",").reduce<Record<string, string>>((acc, p) => {
    const [k, v] = p.split("=");
    acc[k] = v;
    return acc;
  }, {});

  const timestamp = parts["t"];
  const received  = parts["v0"];
  if (!timestamp || !received) return false;

  const expected = crypto
    .createHmac("sha256", SECRET)
    .update(`${timestamp}.${raw}`)
    .digest("hex");

  return crypto.timingSafeEqual(Buffer.from(received), Buffer.from(expected));
}

export async function POST(req: NextRequest) {
  /** 1 ▸ read raw body & verify signature */
  const raw = Buffer.from(await req.arrayBuffer());

  if (!isValidSignature(raw, req.headers.get("elevenlabs-signature"))) {
    return NextResponse.json({ ok: false, error: "Invalid signature" }, { status: 401 });
  }

  /** 2 ▸ parse once */
  const payload = JSON.parse(raw.toString());

  /**
   * ElevenLabs sends two slightly different shapes:
   *   A) { type, data:{ …analysis:{transcript_summary}… } }
   *   B) { status:'done', analysis:{transcript_summary}, … }   (no wrapper)
   *
   * event = the object that actually holds call details.
   */
  const event = payload.data ?? payload;
  const eventType = payload.type ?? event.type ?? "post_call_transcription";

  if (eventType !== "post_call_transcription") {
    // ignore other webhook types (e.g., TTS status)
    return NextResponse.json({ ok: true });
  }

  /** 3 ▸ pull the fields we care about from event */
  const {
    metadata: {
      call_sid,
      call_duration_secs = 0,
      cost = 0,
    } = {},
    transcript = [],
    analysis = {},
    transcript_summary: legacySummary,
    conversation_id,
    status,
  } = event;

  // summary can live in analysis or directly on the root (legacy)
  const transcript_summary =
    analysis.transcript_summary ?? legacySummary ?? "";

  console.log("Webhook summary:", transcript_summary);

  /** 4 ▸ update DB */
  await connectDB();
  const call = await Call.findOne({ elevenLabsCallSid: call_sid });
  if (!call) {
    console.warn("Call not found for SID", call_sid);
    return NextResponse.json({ ok: true });
  }

  call.status       = status === "done" ? "completed" : "failed";
  call.duration     = call_duration_secs;
  call.cost         = cost / 100;                 // paise/cents → rupees/dollars
  call.endTime      = new Date();
  call.transcription = transcript
    .map((seg: { role: string; message: string }) => `${seg.role}: ${seg.message}`)
    .join("\n");
  call.summary        = transcript_summary;
  call.conversationId = conversation_id;
  call.hasAudio       = status === "done";

  await call.save();

  return NextResponse.json({ ok: true });
}
