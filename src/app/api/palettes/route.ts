import { NextResponse } from 'next/server';
import { PALETTES } from '@/constants/palettes';

export async function GET() {
  return NextResponse.json({ palettes: Object.values(PALETTES) });
}
