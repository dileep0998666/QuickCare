import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import dbConnect from '@/lib/dbConnect';
import User from '@/models/User';

// Function to verify Google JWT token
async function verifyGoogleToken(credential: string) {
  try {
    const response = await fetch(`https://oauth2.googleapis.com/tokeninfo?id_token=${credential}`);
    const data = await response.json();
    
    if (data.error) {
      throw new Error(data.error_description || 'Invalid token');
    }
    
    return data;
  } catch (error) {
    throw new Error('Failed to verify Google token');
  }
}

export async function POST(request: NextRequest) {
  try {
    await dbConnect();
    
    const { credential } = await request.json();
    
    if (!credential) {
      return NextResponse.json({ success: false, message: 'No credential provided' }, { status: 400 });
    }

    // Verify the Google token
    const googleUser = await verifyGoogleToken(credential);
    
    const { email, name, picture, sub: googleId } = googleUser;

    if (!email) {
      return NextResponse.json({ success: false, message: 'No email found in Google account' }, { status: 400 });
    }

    // Check if user exists
    let user = await User.findOne({ email });

    if (!user) {
      // Create new user
      user = new User({
        name: name || email.split('@')[0],
        email,
        googleId,
        avatar: picture,
        isGoogleUser: true,
        // No password needed for Google users
      });
      
      await user.save();
    } else if (!user.googleId) {
      // Link existing account with Google
      user.googleId = googleId;
      user.avatar = picture;
      user.isGoogleUser = true;
      await user.save();
    }

    // Create JWT token
    const token = jwt.sign(
      { 
        userId: user._id, 
        email: user.email,
        name: user.name 
      },
      process.env.JWT_SECRET!,
      { expiresIn: '7d' }
    );

    // Create response
    const response = NextResponse.json({
      success: true,
      message: 'Google sign-in successful',
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
      },
    });

    // Set HTTP-only cookie
    response.cookies.set('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60, // 7 days
    });

    return response;
  } catch (error) {
    console.error('Google auth error:', error);
    return NextResponse.json({ 
      success: false, 
      message: error instanceof Error ? error.message : 'Internal server error' 
    }, { status: 500 });
  }
}