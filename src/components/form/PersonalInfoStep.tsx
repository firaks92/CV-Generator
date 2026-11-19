'use client';

import { useCVStore } from '@/store/cvStore';
import { PhotoUpload } from './PhotoUpload';
import { ArrowRight, User, Briefcase, Calendar, MapPin, Phone, Mail } from 'lucide-react';

export function PersonalInfoStep() {
  const { cv, updatePersonalInfo, nextStep } = useCVStore();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    nextStep();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Photo Upload Section */}
      <PhotoUpload />

      <div className="w-full h-px bg-app-border my-3" />

      {/* Full Name */}
      <div>
        <label className="block text-xs font-semibold uppercase tracking-wider text-app-text-secondary mb-1.5">
          Фамилия, Имя, Отчество <span className="text-app-red">*</span>
        </label>
        <div className="relative">
          <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-app-text-muted" />
          <input
            type="text"
            required
            value={cv.personalInfo.fullName}
            onChange={(e) => updatePersonalInfo({ fullName: e.target.value })}
            placeholder="Иванов Иван Сергеевич"
            className="w-full pl-9 pr-3 py-2.5 rounded-md bg-app-input border border-app-border text-app-text placeholder:text-app-text-muted text-sm focus:outline-none focus:border-app-accent focus:ring-1 focus:ring-app-accent transition-colors"
          />
        </div>
      </div>

      {/* Target Job Title */}
      <div>
        <label className="block text-xs font-semibold uppercase tracking-wider text-app-text-secondary mb-1.5">
          Профессия / Специализация
        </label>
        <div className="relative">
          <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-app-text-muted" />
          <input
            type="text"
            value={cv.personalInfo.jobTitle || ''}
            onChange={(e) => updatePersonalInfo({ jobTitle: e.target.value })}
            placeholder="Senior Frontend Developer"
            className="w-full pl-9 pr-3 py-2.5 rounded-md bg-app-input border border-app-border text-app-text placeholder:text-app-text-muted text-sm focus:outline-none focus:border-app-accent focus:ring-1 focus:ring-app-accent transition-colors"
          />
        </div>
      </div>

      {/* Birth Year & Location Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-app-text-secondary mb-1.5">
            Год рождения <span className="text-app-red">*</span>
          </label>
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-app-text-muted" />
            <input
              type="number"
              required
              min={1940}
              max={2015}
              value={cv.personalInfo.birthYear || ''}
              onChange={(e) => updatePersonalInfo({ birthYear: parseInt(e.target.value, 10) || 1995 })}
              placeholder="1995"
              className="w-full pl-9 pr-3 py-2.5 rounded-md bg-app-input border border-app-border text-app-text placeholder:text-app-text-muted text-sm focus:outline-none focus:border-app-accent focus:ring-1 focus:ring-app-accent transition-colors"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-app-text-secondary mb-1.5">
            Город проживания
          </label>
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-app-text-muted" />
            <input
              type="text"
              value={cv.personalInfo.address || ''}
              onChange={(e) => updatePersonalInfo({ address: e.target.value })}
              placeholder="Москва, Россия"
              className="w-full pl-9 pr-3 py-2.5 rounded-md bg-app-input border border-app-border text-app-text placeholder:text-app-text-muted text-sm focus:outline-none focus:border-app-accent focus:ring-1 focus:ring-app-accent transition-colors"
            />
          </div>
        </div>
      </div>

      {/* Contact Grid: Phone & Email */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-app-text-secondary mb-1.5">
            Телефон
          </label>
          <div className="relative">
            <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-app-text-muted" />
            <input
              type="tel"
              value={cv.personalInfo.phone || ''}
              onChange={(e) => updatePersonalInfo({ phone: e.target.value })}
              placeholder="+7 (999) 000-00-00"
              className="w-full pl-9 pr-3 py-2.5 rounded-md bg-app-input border border-app-border text-app-text placeholder:text-app-text-muted text-sm focus:outline-none focus:border-app-accent focus:ring-1 focus:ring-app-accent transition-colors"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-app-text-secondary mb-1.5">
            Email
          </label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-app-text-muted" />
            <input
              type="email"
              value={cv.personalInfo.email || ''}
              onChange={(e) => updatePersonalInfo({ email: e.target.value })}
              placeholder="example@mail.ru"
              className="w-full pl-9 pr-3 py-2.5 rounded-md bg-app-input border border-app-border text-app-text placeholder:text-app-text-muted text-sm focus:outline-none focus:border-app-accent focus:ring-1 focus:ring-app-accent transition-colors"
            />
          </div>
        </div>
      </div>

      {/* Navigation Footer */}
      <div className="pt-4 flex justify-end">
        <button
          type="submit"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-md bg-app-accent text-white font-medium text-sm hover:opacity-90 active:scale-[0.98] transition-all shadow-subtle"
        >
          <span>Далее: Опыт</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </form>
  );
}
