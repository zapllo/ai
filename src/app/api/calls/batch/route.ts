import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Contact from '@/models/contactModel';
import { getUserFromRequest } from '@/lib/jwt';
import { initiateCall } from '@/lib/elevenLabs';

export async function POST(request: NextRequest) {
  try {
    const userData = await getUserFromRequest(request);
    if (!userData || typeof userData === 'string') {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    await connectDB();
    const body = await request.json();
    const { agentId, contacts } = body;

    if (!agentId || !contacts || !Array.isArray(contacts) || contacts.length === 0) {
      return NextResponse.json(
        { message: 'Agent ID and contacts array are required' },
        { status: 400 }
      );
    }

    // Initialize counters
    let initiated = 0;
    let failed = 0;

    // Process each contact
    for (const contactId of contacts) {
      try {
        // Find the contact
        const contact = await Contact.findById(contactId);
        if (!contact) {
          failed++;
          continue;
        }

        // Initiate the call
        await initiateCall(
          userData.userId as string,
          agentId,
          contact.phoneNumber,
          contact.name || 'Customer'
        );

        // Update contact's lastContacted field
        await Contact.findByIdAndUpdate(contactId, {
          lastContacted: new Date()
        });

        initiated++;
      } catch (error) {
        console.error('Error initiating call for contact:', contactId, error);
        failed++;
      }
    }

    return NextResponse.json({
      message: `Initiated ${initiated} calls, ${failed} failed`,
      initiated,
      failed
    });
  } catch (error: any) {
    console.error('Error processing batch call initiation:', error);
    return NextResponse.json(
      { message: 'Failed to process batch calls', error: error.message },
      { status: 500 }
    );
  }
}
