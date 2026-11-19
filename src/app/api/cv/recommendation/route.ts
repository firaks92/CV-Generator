import { NextRequest, NextResponse } from 'next/server';
import { generateAIRecommendation } from '@/lib/gemini';
import { CV } from '@/types';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { cv, recommenderName, recommenderPosition, recommenderCompany } = body as {
      cv: CV;
      recommenderName: string;
      recommenderPosition: string;
      recommenderCompany: string;
    };

    if (!cv?.personalInfo?.fullName) {
      return NextResponse.json(
        { error: { code: 'VALIDATION_ERROR', message: 'Данные резюме не предоставлены' } },
        { status: 400 }
      );
    }

    const content = await generateAIRecommendation(
      cv,
      recommenderName,
      recommenderPosition,
      recommenderCompany
    );

    return NextResponse.json({
      id: `rec-${Date.now()}`,
      content,
      recommenderName: recommenderName || '',
      recommenderPosition: recommenderPosition || '',
      recommenderCompany: recommenderCompany || '',
      generatedAt: new Date().toISOString(),
    });
  } catch (error: any) {
    console.error('API Error in /api/cv/recommendation:', error);
    return NextResponse.json(
      { error: { code: 'RECOMMENDATION_FAILED', message: error?.message || 'Ошибка генерации рекомендации' } },
      { status: 500 }
    );
  }
}
