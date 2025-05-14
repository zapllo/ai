import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import User from '@/models/userModel';
import crypto from 'crypto';

export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const { email } = await request.json();

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      // For security reasons, we still return success even if user not found
      // This prevents email enumeration attacks
      return NextResponse.json(
        { message: 'If your email is registered, you will receive reset instructions.' },
        { status: 200 }
      );
    }

    // Generate reset token
    const resetToken = crypto.randomBytes(32).toString('hex');

    // Save the hashed token in the database with expiry (30 minutes)
    user.resetPasswordToken = crypto
      .createHash('sha256')
      .update(resetToken)
      .digest('hex');

    user.resetPasswordExpire = new Date(Date.now() + 30 * 60 * 1000);
    await user.save();

    // In a real implementation, you would send an email with the reset link:
    // const resetUrl = `${process.env.NEXT_PUBLIC_FRONTEND_URL}/reset-password?token=${resetToken}`;

    // For development purposes, log the token to console
    console.log(`Reset token for ${email}: ${resetToken}`);
    console.log(`Reset URL: ${process.env.NEXT_PUBLIC_FRONTEND_URL}/reset-password?token=${resetToken}`);

    return NextResponse.json({
      message: 'If your email is registered, you will receive reset instructions.',
      // Remove the token in production - only for testing
      resetToken: resetToken
    }, { status: 200 });

  } catch (error: any) {
    console.error('Password reset request error:', error);
    return NextResponse.json(
      { message: 'There was an error processing your request. Please try again.' },
      { status: 500 }
    );
  }
}
