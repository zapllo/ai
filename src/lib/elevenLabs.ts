import mongoose from 'mongoose';
import connectDB from './db';
import Agent from '@/models/agentModel';
import callModel from '@/models/callModel';

const ELEVENLABS_API_KEY = process.env.ELEVENLABS_API_KEY!;
const ELEVENLABS_PHONE_ID = process.env.ELEVENLABS_PHONE_ID!;

export async function createAgent(data: {
  userId: string;
  name: string;
  description?: string;
  voice_id: string;
  first_message?: string;
  system_prompt?: string;
}) {
  try {
    const {
      userId,
      name,
      description = '',
      voice_id,
      first_message = '',
      system_prompt = '',
    } = data;

    /* ───────── call ElevenLabs ───────── */
    const res = await fetch(
      'https://api.elevenlabs.io/v1/convai/agents/create',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'xi-api-key': ELEVENLABS_API_KEY!,
        },
        body: JSON.stringify({
          name,
          description,
          voice_id,                    // <-- must be top-level
          conversation_config: {
            agent: {
              first_message,
              prompt: { prompt: system_prompt },
            },
            enable_summary: true,
          },
        }),
      },
    );

    if (!res.ok) {
      const text = await res.text();
      throw new Error(`ElevenLabs API error: ${text}`);
    }

    const { agent_id } = await res.json();

    /* ───────── save locally ───────── */
    await connectDB();
    const agent = await Agent.create({
      userId,
      name,
      description,
      agentId: agent_id,
      voiceId: voice_id,
      firstMessage: first_message,
      systemPrompt: system_prompt,
      usageMinutes: 0,
    });

    return agent;
  } catch (err) {
    console.error('Error creating agent:', err);
    throw err;
  }
}


export async function getAgent(agentId: string) {
  try {
    await connectDB();
    const agent = await Agent.findOne({ agentId });
    if (!agent) {
      throw new Error("Agent not found");
    }

    // Get additional details from ElevenLabs if needed
    const response = await fetch(`https://api.elevenlabs.io/v1/convai/agents/${agentId}`, {
      headers: {
        "xi-api-key": ELEVENLABS_API_KEY,
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`ElevenLabs API error: ${errorText}`);
      // Return local data if API fails
      return agent;
    }

    const elevenlabsData = await response.json();

    // Merge data
    return {
      ...agent.toObject(),
      usage_minutes: agent.usageMinutes,
      disabled: elevenlabsData.disabled || agent.disabled,
      conversation_config: {
        first_message: agent.firstMessage,
        system_prompt: agent.systemPrompt,
      }
    };
  } catch (error) {
    console.error("Error getting agent:", error);
    throw error;
  }
}

export async function updateAgent(agentId: string, updates: any) {
  try {
    // First, update in ElevenLabs
    const elevenlabsUpdates: any = {};

    if (updates.name) elevenlabsUpdates.name = updates.name;
    if (updates.first_message) elevenlabsUpdates.first_message = updates.first_message;
    if (updates.system_prompt) elevenlabsUpdates.system_prompt = updates.system_prompt;
    if (updates.voice_id) elevenlabsUpdates.voice_id = updates.voice_id;
    if (updates.disabled !== undefined) elevenlabsUpdates.disabled = updates.disabled;

    if (Object.keys(elevenlabsUpdates).length > 0) {
      const response = await fetch(`https://api.elevenlabs.io/v1/convai/agents/${agentId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "xi-api-key": ELEVENLABS_API_KEY,
        },
        body: JSON.stringify(elevenlabsUpdates),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`ElevenLabs API error: ${errorText}`);
      }
    }

    // Then, update in our database
    await connectDB();
    const agent = await Agent.findOne({ agentId });
    if (!agent) {
      throw new Error("Agent not found");
    }

    if (updates.name) agent.name = updates.name;
    if (updates.description) agent.description = updates.description;
    if (updates.first_message) agent.firstMessage = updates.first_message;
    if (updates.system_prompt) agent.systemPrompt = updates.system_prompt;
    if (updates.voice_id) agent.voiceId = updates.voice_id;
    if (updates.disabled !== undefined) agent.disabled = updates.disabled;

    await agent.save();
    return agent;
  } catch (error) {
    console.error("Error updating agent:", error);
    throw error;
  }
}

export async function deleteAgent(agentId: string) {
  try {
    // First, delete from ElevenLabs
    const response = await fetch(`https://api.elevenlabs.io/v1/convai/agents/${agentId}`, {
      method: "DELETE",
      headers: {
        "xi-api-key": ELEVENLABS_API_KEY,
      },
    });

    // Then, delete from our database
    await connectDB();
    await Agent.deleteOne({ agentId });

    return { success: true };
  } catch (error) {
    console.error("Error deleting agent:", error);
    throw error;
  }
}

export async function initiateCall(
  userId: string,
  agentId: string,
  phoneNumber: string,
  contactName: string,
  customMessage?: string
) {
  await connectDB();

  // ——— fetch agent ———
  const agent = await Agent.findOne({ agentId, userId });
  if (!agent) throw new Error("Agent not found");

  // ——— normalise the number (India by default) ———
  let formatted = phoneNumber.trim().replace(/[\s\-\(\)]/g, "");
  if (!formatted.startsWith("+"))
    formatted = formatted.startsWith("91") ? `+${formatted}` : `+91${formatted}`;

  // ——— create DB row (status=queued) ———
  const call = await callModel.create({
    userId,
    agentId: agent._id,
    phoneNumber: formatted,
    direction: "outbound",
    status: "queued",
    contactName,
    customMessage,
    startTime: new Date(),
  });

  // ——— hit ElevenLabs ———
  const resp = await fetch(
    "https://api.elevenlabs.io/v1/convai/twilio/outbound_call",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "xi-api-key": process.env.ELEVENLABS_API_KEY!,
      },
      body: JSON.stringify({
        agent_id: agent.agentId,
        agent_phone_number_id: process.env.ELEVENLABS_PHONE_ID!,
        to_number: formatted,
        agent_start_message: customMessage || undefined,
      }),
    }
  );

  if (!resp.ok) {
    const err = await resp.text();
    call.status = "failed";
    call.notes = `ElevenLabs error: ${err}`;
    await call.save();
    throw new Error(err);
  }

  const { call_id } = await resp.json();
  call.elevenLabsCallSid = call_id;


  call.status = "initiated";

  await call.save();

  agent.lastCalledAt = new Date();
  await agent.save();

  return { id: call._id, status: "initiated", call_id };
}


/* NEW ──────────────────────────────────────────────────────────────── */
export async function getConversation(callSid: string) {
  // GET /v1/conversations/{conversation_id}
  const res = await fetch(
    `https://api.elevenlabs.io/v1/conversations/${callSid}`,
    { headers: { "xi-api-key": ELEVENLABS_API_KEY } }
  );

  if (!res.ok) {
    throw new Error(
      `ElevenLabs conversation fetch failed – ${res.status} ${res.statusText}`
    );
  }
  /* shape per docs: https://elevenlabs.io/docs/api-reference/conversations/get-conversation#response
     {
       conversation_id: "...",
       agent_id: "...",
       summary: "...",
       messages: [...],
       ...
     }
  */
  return res.json() as Promise<{
    summary?: string;
    messages?: { role: "agent" | "user"; text: string }[];
  }>;
}
