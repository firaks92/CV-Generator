import type { Metadata } from 'next';
import { Playfair_Display, Lora, JetBrains_Mono } from 'next/font/google';
import './globals.css';

const playfair = Playfair_Display({
  subsets: ['latin', 'cyrillic'],
  variable: '--font-playfair',
  weight: ['400', '600', '700'],
  display: 'swap',
});

const lora = Lora({
  subsets: ['latin', 'cyrillic'],
  variable: '--font-lora',
  weight: ['400', '500', '600', '700'],
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin', 'cyrillic'],
  variable: '--font-mono',
  weight: ['400', '500'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Конструктор резюме с ИИ | Профессиональное CV за 3 минуты',
  description:
    'Умный конструктор резюме нового поколения: автоматическая формулировка описания, анализ сильных и слабых сторон, 5 дизайн-шаблонов, смена палитр, сопроводительные письма и экспорт в PDF.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="ru"
      data-theme="dark"
      className={`${playfair.variable} ${lora.variable} ${jetbrainsMono.variable}`}
    >
      <body className="min-h-screen bg-app-base text-app-text antialiased">
        {children}
      </body>
    </html>
  );
}
