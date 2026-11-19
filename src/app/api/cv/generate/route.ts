import { NextRequest, NextResponse } from 'next/server';
import { generateAISummaryAndAnalysis } from '@/lib/gemini';
import { CV } from '@/types';

export async function POST(req: NextRequest) {
  try {
    const cv: CV = await req.json();

    if (!cv.personalInfo?.fullName) {
      return NextResponse.json(
        { error: { code: 'VALIDATION_ERROR', message: 'Ф.И.О. обязательно для заполнения' } },
        { status: 400 }
      );
    }

    const aiResult = await generateAISummaryAndAnalysis(cv);

    return NextResponse.json(aiResult, { status: 200 });
  } catch (error: any) {
    console.error('API Error in /api/cv/generate:', error);
    return NextResponse.json(
      { error: { code: 'AI_GENERATION_FAILED', message: error?.message || 'Не удалось сгенерировать резюме' } },
      { status: 500 }
    );
  }
}
