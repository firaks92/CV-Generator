import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get('photo') as File | null;

    if (!file) {
      return NextResponse.json(
        { error: { code: 'FILE_MISSING', message: 'Файл не прикреплен' } },
        { status: 400 }
      );
    }

    if (!file.type.startsWith('image/')) {
      return NextResponse.json(
        { error: { code: 'INVALID_TYPE', message: 'Разрешены только изображения (JPEG, PNG, WebP)' } },
        { status: 400 }
      );
    }

    // Max 5MB
    if (file.size > 5 * 1024 * 1024) {
      return NextResponse.json(
        { error: { code: 'FILE_TOO_LARGE', message: 'Максимальный размер файла — 5 МБ' } },
        { status: 400 }
      );
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const base64 = buffer.toString('base64');
    const dataUrl = `data:${file.type};base64,${base64}`;

    return NextResponse.json({
      photoUrl: dataUrl,
      size: file.size,
      mimeType: file.type,
    });
  } catch (error: any) {
    console.error('API Error in /api/upload/photo:', error);
    return NextResponse.json(
      { error: { code: 'UPLOAD_FAILED', message: error?.message || 'Ошибка загрузки фото' } },
      { status: 500 }
    );
  }
}
