import { NextResponse } from 'next/server';
import dbConnect from '../../../lib/dbConnect';

export async function GET() {
  try {
    await dbConnect();
    return NextResponse.json({ 
      success: true, 
      message: '✅ Database connected successfully!' 
    });
  } catch (error) {
    console.error('Database connection error:', error);
    return NextResponse.json({ 
      success: false, 
      message: '❌ Database connection failed',
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}