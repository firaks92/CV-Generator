import { NextResponse } from 'next/server';
import { TEMPLATES } from '@/constants/templates';

export async function GET() {
  return NextResponse.json({ templates: Object.values(TEMPLATES) });
}
