'use client';

import { useRef, useState } from 'react';
import { useCVStore } from '@/store/cvStore';
import { Camera, Trash2, Upload } from 'lucide-react';

export function PhotoUpload() {
  const { cv, updatePersonalInfo } = useCVStore();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setErrorMsg('Пожалуйста, выберите изображение (JPG, PNG или WebP)');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setErrorMsg('Размер фото не должен превышать 5 МБ');
      return;
    }

    setErrorMsg(null);
    setIsUploading(true);

    try {
      // Use FileReader for fast client-side preview and base64 storage
      const reader = new FileReader();
      reader.onload = (event) => {
        const base64Url = event.target?.result as string;
        updatePersonalInfo({ photoUrl: base64Url });
        setIsUploading(false);
      };
      reader.readAsDataURL(file);
    } catch (err: any) {
      setErrorMsg('Не удалось загрузить изображение');
      setIsUploading(false);
    }
  };

  const handleRemovePhoto = () => {
    updatePersonalInfo({ photoUrl: '' });
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <label className="text-xs font-semibold uppercase tracking-wider text-app-text-secondary">
        Фотография для резюме
      </label>

      <div className="flex items-center gap-4">
        {/* Photo Avatar Preview */}
        <div className="relative w-20 h-24 sm:w-24 sm:h-28 rounded-md border border-app-border bg-app-input flex items-center justify-center overflow-hidden shadow-subtle group">
          {cv.personalInfo.photoUrl ? (
            <img
              src={cv.personalInfo.photoUrl}
              alt={cv.personalInfo.fullName || 'Фото кандидата'}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="flex flex-col items-center justify-center text-app-text-muted p-2 text-center">
              <Camera className="w-6 h-6 mb-1 opacity-70" />
              <span className="text-[10px] leading-tight">3:4</span>
            </div>
          )}

          {isUploading && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center text-white text-xs">
              Загрузка...
            </div>
          )}
        </div>

        {/* Upload Buttons */}
        <div className="flex flex-col gap-2">
          <input
            ref={fileInputRef}
            type="file"
            accept="image/jpeg,image/png,image/webp"
            onChange={handleFileChange}
            className="hidden"
            id="photo-upload-input"
          />

          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium rounded-md border border-app-border bg-app-surface hover:bg-app-elevated text-app-text transition-colors"
          >
            <Upload className="w-3.5 h-3.5 text-app-accent" />
            <span>{cv.personalInfo.photoUrl ? 'Заменить фото' : 'Загрузить фото'}</span>
          </button>

          {cv.personalInfo.photoUrl && (
            <button
              type="button"
              onClick={handleRemovePhoto}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md text-app-red hover:bg-app-red/10 border border-transparent transition-colors text-left"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Удалить фото</span>
            </button>
          )}

          <p className="text-[11px] text-app-text-muted leading-tight">
            JPG, PNG или WebP до 5 МБ. Оптимально: соотношение 3:4.
          </p>
        </div>
      </div>

      {errorMsg && (
        <p className="text-xs text-app-red mt-1 font-medium">{errorMsg}</p>
      )}
    </div>
  );
}
