'use client';

import { CV, PaletteColors, PDFFormat } from '@/types';
import { formatMonthYear, DEGREE_LABELS } from '@/lib/utils';
import { Mail, Phone, MapPin, Calendar, CheckCircle2 } from 'lucide-react';

interface TemplateProps {
  cv: CV;
  colors: PaletteColors;
  format: PDFFormat;
}

export function ClassicTemplate({ cv, colors, format }: TemplateProps) {
  const isMobile = format === 'mobile';
  const { personalInfo, experience, skills, workHistory, education, aiGenerated } = cv;

  return (
    <div
      className="w-full text-left transition-colors font-body leading-normal"
      style={{
        backgroundColor: colors.background,
        color: colors.text,
      }}
    >
      {/* Container: on mobile it collapses into single column, on desktop it's two-column */}
      <div className={isMobile ? 'flex flex-col' : 'flex flex-row min-h-[900px]'}>
        {/* Left Sidebar (32% width on desktop) */}
        <div
          className={isMobile ? 'w-full p-4 border-b' : 'w-[32%] p-5 sm:p-6 border-r flex flex-col'}
          style={{
            backgroundColor: `${colors.primary}0D`, // 5% opacity tint
            borderColor: `${colors.primary}26`,
          }}
        >
          {/* Photo */}
          {personalInfo.photoUrl && (
            <div className="mb-5 flex justify-center">
              <div
                className="w-24 h-32 rounded-md overflow-hidden border shadow-sm"
                style={{ borderColor: colors.border }}
              >
                <img
                  src={personalInfo.photoUrl}
                  alt={personalInfo.fullName}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          )}

          {/* Contacts */}
          <div className="space-y-2 mb-6">
            <h3
              className="text-xs font-semibold uppercase tracking-wider pb-1 border-b font-heading"
              style={{ color: colors.primary, borderColor: `${colors.primary}40` }}
            >
              Контакты
            </h3>

            <div className="space-y-1.5 text-xs">
              {personalInfo.phone && (
                <div className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 flex-shrink-0" style={{ color: colors.accent }} />
                  <span className="truncate">{personalInfo.phone}</span>
                </div>
              )}
              {personalInfo.email && (
                <div className="flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 flex-shrink-0" style={{ color: colors.accent }} />
                  <span className="truncate">{personalInfo.email}</span>
                </div>
              )}
              {personalInfo.address && (
                <div className="flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 flex-shrink-0" style={{ color: colors.accent }} />
                  <span>{personalInfo.address}</span>
                </div>
              )}
              {personalInfo.birthYear > 0 && (
                <div className="flex items-center gap-2">
                  <Calendar className="w-3.5 h-3.5 flex-shrink-0" style={{ color: colors.accent }} />
                  <span>{personalInfo.birthYear} г.р.</span>
                </div>
              )}
            </div>
          </div>

          {/* Skills */}
          {skills.length > 0 && (
            <div className="space-y-2 mb-6">
              <h3
                className="text-xs font-semibold uppercase tracking-wider pb-1 border-b font-heading"
                style={{ color: colors.primary, borderColor: `${colors.primary}40` }}
              >
                Навыки и стек
              </h3>

              <div className="flex flex-wrap gap-1.5">
                {skills.map((skill) => (
                  <span
                    key={skill.id}
                    className="inline-block px-2 py-0.5 rounded text-[11px] font-mono border"
                    style={{
                      backgroundColor: `${colors.primary}15`,
                      color: colors.primary,
                      borderColor: `${colors.primary}30`,
                    }}
                  >
                    {skill.name}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Education */}
          {education.length > 0 && (
            <div className="space-y-2 mb-6">
              <h3
                className="text-xs font-semibold uppercase tracking-wider pb-1 border-b font-heading"
                style={{ color: colors.primary, borderColor: `${colors.primary}40` }}
              >
                Образование
              </h3>

              <div className="space-y-3">
                {education.map((edu) => (
                  <div key={edu.id} className="text-xs">
                    <p className="font-semibold" style={{ color: colors.text }}>
                      {edu.institution}
                    </p>
                    <p style={{ color: colors.textSecondary }}>
                      {DEGREE_LABELS[edu.degree]} · {edu.fieldOfStudy}
                    </p>
                    <p className="text-[11px] font-mono" style={{ color: colors.textSecondary }}>
                      {edu.startYear} — {edu.endYear || 'н.в.'}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Main Column (68% width on desktop) */}
        <div className={isMobile ? 'w-full p-4 space-y-5' : 'w-[68%] p-6 sm:p-8 space-y-6'}>
          {/* Header Name & Title */}
          <div className="border-b pb-4" style={{ borderColor: `${colors.primary}20` }}>
            <h1
              className="text-2xl sm:text-3xl font-bold font-heading tracking-tight"
              style={{ color: colors.primary }}
            >
              {personalInfo.fullName || 'Имя Фамилия'}
            </h1>
            {personalInfo.jobTitle && (
              <p className="text-sm sm:text-base font-medium mt-1" style={{ color: colors.accent }}>
                {personalInfo.jobTitle}
              </p>
            )}
          </div>

          {/* Professional Summary */}
          {(aiGenerated?.summary || experience.text) && (
            <div className="space-y-1.5">
              <h2
                className="text-xs font-semibold uppercase tracking-wider font-heading"
                style={{ color: colors.primary }}
              >
                О себе / Профессиональный профиль
              </h2>
              <p className="text-xs sm:text-sm leading-relaxed" style={{ color: colors.textSecondary }}>
                {aiGenerated?.summary || experience.text}
              </p>
            </div>
          )}

          {/* Strengths (Сильные стороны из AI) */}
          {aiGenerated?.analysis?.strengths && aiGenerated.analysis.strengths.length > 0 && (
            <div className="space-y-2">
              <h2
                className="text-xs font-semibold uppercase tracking-wider font-heading flex items-center gap-1.5"
                style={{ color: colors.primary }}
              >
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>Ключевые сильные стороны</span>
              </h2>

              <div className="grid grid-cols-1 gap-1.5">
                {aiGenerated.analysis.strengths.map((str, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-xs">
                    <span className="font-bold text-emerald-600">✓</span>
                    <div>
                      <span className="font-semibold" style={{ color: colors.text }}>
                        {str.title}:
                      </span>{' '}
                      <span style={{ color: colors.textSecondary }}>{str.description}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Work History */}
          {workHistory.length > 0 && (
            <div className="space-y-4">
              <h2
                className="text-xs font-semibold uppercase tracking-wider font-heading"
                style={{ color: colors.primary }}
              >
                Опыт работы
              </h2>

              <div className="space-y-4">
                {workHistory.map((work) => (
                  <div
                    key={work.id}
                    className="space-y-1 border-l-2 pl-3"
                    style={{ borderColor: `${colors.primary}40` }}
                  >
                    <div className="flex flex-wrap items-baseline justify-between gap-1">
                      <h4 className="font-semibold text-sm" style={{ color: colors.text }}>
                        {work.position}
                      </h4>
                      <span className="text-[11px] font-mono" style={{ color: colors.textSecondary }}>
                        {formatMonthYear(work.startDate)} —{' '}
                        {work.isCurrent ? 'По наст. время' : formatMonthYear(work.endDate)}
                      </span>
                    </div>

                    <p className="text-xs font-medium" style={{ color: colors.accent }}>
                      {work.company}
                    </p>

                    {work.description && (
                      <p className="text-xs leading-relaxed" style={{ color: colors.textSecondary }}>
                        {work.description}
                      </p>
                    )}

                    {work.achievements && work.achievements.length > 0 && (
                      <ul className="list-disc list-inside text-xs space-y-0.5 pt-1 text-slate-700">
                        {work.achievements.map((ach, aIdx) => (
                          <li key={aIdx} style={{ color: colors.textSecondary }}>
                            {ach}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
