import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { DegreeType } from '@/types';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function transliterate(text: string): string {
  const ruToEn: Record<string, string> = {
    а: 'a', б: 'b', в: 'v', г: 'g', д: 'd', е: 'e', ё: 'yo', ж: 'zh',
    з: 'z', и: 'i', й: 'y', к: 'k', л: 'l', м: 'm', н: 'n', о: 'o',
    п: 'p', р: 'r', с: 's', т: 't', у: 'u', ф: 'f', х: 'kh', ц: 'ts',
    ч: 'ch', ш: 'sh', щ: 'shch', ъ: '', ы: 'y', ь: '', э: 'e', ю: 'yu',
    я: 'ya',
  };

  return text
    .toLowerCase()
    .split('')
    .map((char) => ruToEn[char] ?? char)
    .join('')
    .replace(/[^a-z0-9]+/g, '_')
    .replace(/^_+|_+$/g, '');
}

export function formatMonthYear(dateString: string | null | undefined): string {
  if (!dateString) return 'По наст. время';
  const [year, month] = dateString.split('-');
  if (!year) return '';
  if (!month) return year;

  const months = [
    'Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн',
    'Июл', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек'
  ];
  const mIndex = parseInt(month, 10) - 1;
  const monthName = months[mIndex] || month;
  return `${monthName} ${year}`;
}

export const DEGREE_LABELS: Record<DegreeType, string> = {
  bachelor: 'Бакалавр',
  master: 'Магистр',
  specialist: 'Специалист',
  secondary: 'Среднее общее',
  vocational: 'Среднее профессиональное',
  phd: 'Кандидат наук',
  doctorate: 'Доктор наук',
  other: 'Диплом / Сертификат',
};
