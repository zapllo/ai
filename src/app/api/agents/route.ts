import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Agent from '@/models/agentModel';
import { getUserFromRequest } from '@/lib/jwt';
import { createAgent } from '@/lib/elevenLabs';

export async function GET(request: NextRequest) {
  try {
    const userData = await getUserFromRequest(request);
    if (!userData) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    await connectDB();

    // Get all agents for the user
    const agents = await Agent.find({ userId: typeof userData === 'object' ? userData.userId : userData });

    // Format response for the client
    const formattedAgents = agents.map(agent => ({
      agent_id: agent.agentId,
      name: agent.name,
      description: agent.description,
      disabled: agent.disabled,
      voice_id: agent.voiceId,
      usage_minutes: agent.usageMinutes,
      last_called_at: agent.lastCalledAt,
      conversation_config: {
        first_message: agent.firstMessage,
        system_prompt: agent.systemPrompt
      }
    }));

    return NextResponse.json({ agents: formattedAgents });
  } catch (error: any) {
    console.error('Error fetching agents:', error);
    return NextResponse.json(
      { message: 'Failed to fetch agents', error: error.message },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const userData = await getUserFromRequest(request);
    if (!userData) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();

    // Map the request body fields to what elevenLabs.ts expects
    const agentData = {
      userId: typeof userData === 'object' ? userData.userId : userData,
      name: body.name,
      description: body.description || "",
      voice_id: body.voice_id, // Make sure this matches what your frontend sends
      first_message: body.first_message || body.conversation_config?.first_message, // Handle different possible formats
      system_prompt: body.system_prompt || body.conversation_config?.system_prompt
    };

    const agent = await createAgent(agentData);

    return NextResponse.json(agent);
  } catch (error: any) {
    console.error('Error creating agent:', error);
    return NextResponse.json(
      { message: 'Failed to create agent', error: error.message },
      { status: 500 }
    );
  }
}
