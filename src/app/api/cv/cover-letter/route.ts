import { NextRequest, NextResponse } from 'next/server';
import { generateAICoverLetter } from '@/lib/gemini';
import { CV } from '@/types';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { cv, targetCompany, targetPosition } = body as {
      cv: CV;
      targetCompany: string;
      targetPosition: string;
    };

    if (!cv?.personalInfo?.fullName) {
      return NextResponse.json(
        { error: { code: 'VALIDATION_ERROR', message: 'Данные резюме не предоставлены' } },
        { status: 400 }
      );
    }

    const content = await generateAICoverLetter(cv, targetCompany, targetPosition);

    return NextResponse.json({
      id: `cl-${Date.now()}`,
      content,
      targetCompany: targetCompany || '',
      targetPosition: targetPosition || '',
      generatedAt: new Date().toISOString(),
    });
  } catch (error: any) {
    console.error('API Error in /api/cv/cover-letter:', error);
    return NextResponse.json(
      { error: { code: 'COVER_LETTER_FAILED', message: error?.message || 'Ошибка генерации письма' } },
      { status: 500 }
    );
  }
}
