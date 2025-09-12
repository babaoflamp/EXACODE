import { NextRequest, NextResponse } from 'next/server';
import { verifyAuthToken } from '@/lib/auth/server-only';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { token } = body;
    
    if (!token) {
      return NextResponse.json(
        { success: false, error: 'Token is required' },
        { status: 400 }
      );
    }
    
    const user = verifyAuthToken(token);
    
    if (user) {
      return NextResponse.json({
        success: true,
        user,
      });
    } else {
      return NextResponse.json(
        { success: false, error: 'Invalid token' },
        { status: 401 }
      );
    }
    
  } catch (error) {
    console.error('Token verification error:', error);
    return NextResponse.json(
      { success: false, error: 'Token verification failed' },
      { status: 500 }
    );
  }
}