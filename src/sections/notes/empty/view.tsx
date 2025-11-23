'use client';

import { useTranslation } from 'react-i18next';
import { FileTextOutlined } from '@ant-design/icons';

export function EmptyView() {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col items-center justify-center w-full h-full bg-gradient-to-br from-[rgb(var(--color-bg-primary))] to-[rgb(var(--color-bg-secondary))] text-[rgb(var(--color-text-tertiary))] text-center p-xl">
      <FileTextOutlined className="text-[80px] mb-xl opacity-40" />
      <h2 className="text-[2rem] font-bold m-0 mb-md tracking-tight text-[rgb(var(--color-text-primary))]">{t('app.name')}</h2>
      <p className="text-base m-0 mb-xl max-w-[400px] text-[rgb(var(--color-text-secondary))]">{t('app.tagline')}</p>
      <div className="flex flex-col gap-md pt-xl border-t border-[rgb(var(--color-border))] max-w-[500px]">
        <p className="text-sm m-0 text-[rgb(var(--color-text-secondary))]">{t('note.create')}</p>
      </div>
    </div>
  );
}

