import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import connectDB from "@/lib/db";
import Call from "@/models/callModel";

const SECRET = process.env.ELEVENLABS_WEBHOOK_SECRET!;

/** Return true if signature header matches payload */
function isValid(raw: Buffer, header: string | null) {
  if (!header) return false;

  const elements = header.split(",").reduce((acc: any, part) => {
    const [k, v] = part.split("=");
    acc[k] = v;
    return acc;
  }, {});

  const timestamp = elements["t"];
  const receivedHash = elements["v0"];

  const hmac = crypto
    .createHmac("sha256", SECRET)
    .update(`${timestamp}.${raw}`)
    .digest("hex");

  return receivedHash && crypto.timingSafeEqual(Buffer.from(receivedHash), Buffer.from(hmac));
}

export async function POST(req: NextRequest) {
  const raw = Buffer.from(await req.arrayBuffer());

  if (!isValid(raw, req.headers.get("elevenlabs-signature")))
    return NextResponse.json({ ok: false }, { status: 401 });

  const { type, data } = JSON.parse(raw.toString());

  if (type !== "post_call_transcription")
    return NextResponse.json({ ok: true }); // ignore other events

  const {
    metadata: { call_sid, call_duration_secs = 0, cost = 0 },
    transcript,
    analysis = {},
    conversation_id,
    status,
  } = data;

  const transcript_summary = analysis.transcript_summary ?? "";  // 👈✔
  console.log("Webhook payload:", JSON.stringify(data, null, 2));

  await connectDB();
  const call = await Call.findOne({ elevenLabsCallSid: call_sid });
  if (!call) return NextResponse.json({ ok: true });

  call.status = status === "done" ? "completed" : "failed";
  call.duration = call_duration_secs;
  call.cost = cost / 100;        // paise/cents → rupees/dollars
  call.endTime = new Date();
  call.transcription = transcript
    ?.map((seg: { role: string; message: string }) => `${seg.role}: ${seg.message}`)
    .join("\n");
  call.summary = transcript_summary || "";
  call.conversationId = conversation_id;   //  👈  save it
  call.hasAudio = status === "done";  //  👈  audio is ready
  await call.save();
  return NextResponse.json({ ok: true });
}
