import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { PDFFormat, DocumentType } from '@/types';
import { transliterate } from './utils';

export interface PDFExportOptions {
  elementId: string;
  fullName: string;
  format: PDFFormat; // 'desktop' | 'mobile'
  documentType: DocumentType;
}

export async function exportElementToPDF({
  elementId,
  fullName,
  format,
  documentType,
}: PDFExportOptions): Promise<void> {
  const element = document.getElementById(elementId);
  if (!element) {
    throw new Error(`Элемент #${elementId} не найден для экспорта`);
  }

  // Capture element at high resolution
  const canvas = await html2canvas(element, {
    scale: 2.5,
    useCORS: true,
    logging: false,
    backgroundColor: '#FFFFFF',
    windowWidth: format === 'mobile' ? 420 : 1200,
  });

  const imgData = canvas.toDataURL('image/jpeg', 0.95);
  const cleanName = transliterate(fullName || 'resume') || 'resume';

  const prefixMap: Record<DocumentType, string> = {
    cv: 'cv',
    'cover-letter': 'cover_letter',
    recommendation: 'recommendation',
  };
  const fileName = `${prefixMap[documentType]}_${cleanName}_${format}.pdf`;

  if (format === 'desktop') {
    // Standard A4: 210 x 297 mm
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
    });

    const pdfWidth = 210;
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

    if (pdfHeight <= 297) {
      pdf.addImage(imgData, 'JPEG', 0, 0, pdfWidth, pdfHeight);
    } else {
      let position = 0;
      let remainingHeight = pdfHeight;
      const pageHeight = 297;

      while (remainingHeight > 0) {
        pdf.addImage(imgData, 'JPEG', 0, position, pdfWidth, pdfHeight);
        remainingHeight -= pageHeight;
        position -= pageHeight;
        if (remainingHeight > 0) {
          pdf.addPage();
        }
      }
    }

    pdf.save(fileName);
  } else {
    // Mobile format: Compact portrait (105mm x adaptive height)
    const pdfWidth = 105;
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: [pdfWidth, Math.max(148, pdfHeight)],
    });

    pdf.addImage(imgData, 'JPEG', 0, 0, pdfWidth, pdfHeight);
    pdf.save(fileName);
  }
}

/**
 * Exports text documents (Cover Letters & Recommendation Letters)
 * with 100% Cyrillic support, beautiful layout, and zero mojibake by rendering through HTML canvas.
 */
export async function exportTextDocumentToPDF(
  title: string,
  content: string,
  authorName: string,
  fileName: string
): Promise<void> {
  // Create an offscreen, beautifully styled A4 document element
  const container = document.createElement('div');
  container.style.position = 'fixed';
  container.style.left = '-9999px';
  container.style.top = '0';
  container.style.width = '794px'; // ~210mm at 96 DPI
  container.style.minHeight = '1123px'; // ~297mm at 96 DPI
  container.style.padding = '60px 70px';
  container.style.backgroundColor = '#FFFFFF';
  container.style.color = '#1A202C';
  container.style.fontFamily = "'Lora', 'Georgia', serif";
  container.style.boxSizing = 'border-box';
  container.style.zIndex = '-9999';

  const today = new Date().toLocaleDateString('ru-RU', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  const formattedParagraphs = content
    .split('\n\n')
    .map(
      (p) =>
        `<p style="margin-bottom: 14px; font-size: 14px; line-height: 1.6; color: #2D3748;">${p.replace(
          /\n/g,
          '<br/>'
        )}</p>`
    )
    .join('');

  container.innerHTML = `
    <div style="border-bottom: 2px solid #1E3A5F; padding-bottom: 16px; margin-bottom: 28px;">
      <h1 style="font-family: 'Playfair Display', Georgia, serif; font-size: 24px; color: #1E3A5F; margin: 0 0 6px 0; font-weight: bold;">
        ${title}
      </h1>
      <div style="display: flex; justify-content: space-between; font-size: 12px; color: #718096;">
        <span>Кандидат: <strong>${authorName}</strong></span>
        <span>Дата: ${today}</span>
      </div>
    </div>

    <div style="margin-bottom: 40px;">
      ${formattedParagraphs}
    </div>

    <div style="margin-top: 50px; padding-top: 20px; border-top: 1px dashed #CBD5E0; font-size: 13px; color: #4A5568;">
      <p style="margin: 0 0 4px 0;">С уважением,</p>
      <p style="margin: 0; font-weight: bold; color: #1E3A5F;">${authorName}</p>
    </div>
  `;

  document.body.appendChild(container);

  try {
    const canvas = await html2canvas(container, {
      scale: 2.5,
      useCORS: true,
      logging: false,
      backgroundColor: '#FFFFFF',
    });

    const imgData = canvas.toDataURL('image/jpeg', 0.95);
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
    });

    const pdfWidth = 210;
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

    pdf.addImage(imgData, 'JPEG', 0, 0, pdfWidth, Math.min(297, pdfHeight));
    pdf.save(fileName);
  } finally {
    document.body.removeChild(container);
  }
}
