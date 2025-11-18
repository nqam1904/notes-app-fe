'use client';

import { Note } from '@/types/Data';
import { formatDistanceToNow } from 'date-fns';
import { enUS, vi } from 'date-fns/locale';
import { useTranslation } from 'react-i18next';
import { LockOutlined, PushpinFilled } from '@ant-design/icons';

interface NotesListItemProps {
  note: Note;
  onClick: () => void;
}

export default function NotesListItem({ note, onClick }: NotesListItemProps) {
  const { i18n, t } = useTranslation();
  const locale = i18n.language === 'vi' ? vi : enUS;

  const timeAgo = formatDistanceToNow(new Date(note.updatedAt), {
    addSuffix: true,
    locale,
  });

  const title = note.title || t('note.untitled');
  const preview = note.content.substring(0, 50).replace(/<[^>]*>/g, '');

  return (
    <button className="flex flex-col p-md bg-[rgb(var(--color-bg-primary))] border border-transparent rounded-md cursor-pointer transition-all duration-fast text-left w-full border-b border-[rgb(var(--color-border))] hover:bg-[rgb(var(--color-bg-secondary))] hover:border-[rgb(var(--color-border))] active:scale-[0.99]" onClick={onClick}>
      <div className="flex flex-col gap-sm">
        <div className="flex items-center justify-between gap-md">
          <h3 className="text-sm font-semibold m-0 overflow-hidden text-ellipsis whitespace-nowrap flex-1 text-[rgb(var(--color-text-primary))]">{title}</h3>
          {note.isPinned && (
            <span className="text-xs flex-shrink-0">
              <PushpinFilled />
            </span>
          )}
          {note.isLocked && (
            <span className="text-xs flex-shrink-0">
              <LockOutlined />
            </span>
          )}
        </div>
        <p className="text-[13px] m-0 overflow-hidden text-ellipsis leading-[1.3] line-clamp-2 text-[rgb(var(--color-text-secondary))]">{preview || t('note.content.placeholder')}</p>
        <div className="flex items-center justify-between gap-sm pt-xs border-t border-[rgb(var(--color-border))]">
          <span className="text-[11px] text-[rgb(var(--color-text-tertiary))]">{timeAgo}</span>
          {note.tags && note.tags.length > 0 && (
            <div className="flex gap-xs flex-wrap justify-end">
              {note.tags.slice(0, 2).map(tag => (
                <span key={tag} className="text-[10px] px-1 py-0.5 bg-[rgb(var(--color-border))] rounded-sm whitespace-nowrap text-[rgb(var(--color-text-secondary))]">
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </button>
  );
}

