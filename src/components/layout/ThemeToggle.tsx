'use client';

import { useEffect, useState } from 'react';
import { Sun, Moon } from 'lucide-react';

export function ThemeToggle() {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');

  useEffect(() => {
    const saved = localStorage.getItem('cv-gen-theme') as 'dark' | 'light' | null;
    if (saved) {
      setTheme(saved);
      document.documentElement.setAttribute('data-theme', saved);
    } else {
      document.documentElement.setAttribute('data-theme', 'dark');
    }
  }, []);

  const toggleTheme = () => {
    const next = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('cv-gen-theme', next);
  };

  return (
    <button
      onClick={toggleTheme}
      type="button"
      className="inline-flex items-center justify-center p-2 rounded-md border border-app-border bg-app-surface text-app-text hover:bg-app-elevated transition-colors focus:outline-none focus:ring-2 focus:ring-app-accent"
      title={theme === 'dark' ? 'Переключить на светлую тему' : 'Переключить на тёмную тему'}
      aria-label="Переключение темы оформления"
    >
      {theme === 'dark' ? (
        <Sun className="w-4 h-4 text-app-amber" />
      ) : (
        <Moon className="w-4 h-4 text-app-accent" />
      )}
    </button>
  );
}
