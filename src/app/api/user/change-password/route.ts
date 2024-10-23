import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import { decodeToken } from '@/lib/jwt';
import { DecodedToken } from './types';

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  try {
    const { newPassword } = await request.json();
    const token = request.cookies.get("token")?.value;
   
    if (!token || !newPassword) {
      return NextResponse.json({ error: 'Token and new password are required.' }, { status: 400 });
    }

    const decoded = decodeToken(token) as DecodedToken; 

    if (!decoded || !decoded.userId) {
      return NextResponse.json({ error: 'Invalid or expired token.' }, { status: 401 });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10); 

    await prisma.user.update({
      where: { id: decoded.userId },
      data: { password: hashedPassword },
    });

    return NextResponse.json({ message: 'Password updated successfully.' });
  } catch (error) {
    console.error('Error changing password:', error);
    return NextResponse.json({ error: 'Internal server error.' }, { status: 500 });
  }
}