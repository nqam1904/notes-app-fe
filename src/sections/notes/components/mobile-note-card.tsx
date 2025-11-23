'use client';

import { Note } from '@/types/Data';
import { formatDistanceToNow } from 'date-fns';
import { enUS, vi } from 'date-fns/locale';
import { useTranslation } from 'react-i18next';
import { LockOutlined, PushpinFilled } from '@ant-design/icons';

interface MobileNoteCardProps {
  note: Note;
  onClick: () => void;
}

export function MobileNoteCard({ note, onClick }: MobileNoteCardProps) {
  const { i18n, t } = useTranslation();
  const locale = i18n.language === 'vi' ? vi : enUS;

  const timeAgo = formatDistanceToNow(new Date(note.updatedAt), {
    addSuffix: true,
    locale,
  });

  const title = note.title || t('note.untitled');
  const preview = note.content.substring(0, 80).replace(/<[^>]*>/g, '');

  return (
    <div
      className="hidden flex-col p-lg rounded-lg cursor-pointer transition-all duration-base shadow-md min-h-[140px] relative overflow-hidden max-[480px]:flex before:content-[''] before:absolute before:inset-0 before:bg-white/10 before:pointer-events-none active:scale-[0.98] active:shadow-lg"
      style={{ backgroundColor: `var(--color-note-default)` }}
      onClick={onClick}
    >
      <div className="relative z-10 flex flex-col gap-md h-full">
        <div className="flex items-start justify-between gap-md">
          <h3 className="text-base font-semibold m-0 text-black/80 flex-1 overflow-hidden text-ellipsis line-clamp-2 leading-[1.3]">{title}</h3>
          <div className="flex gap-xs flex-shrink-0">
            {note.isPinned && (
              <span className="text-sm">
                <PushpinFilled />
              </span>
            )}
            {note.isLocked && (
              <span className="text-sm">
                <LockOutlined />
              </span>
            )}
          </div>
        </div>

        <p className="text-sm text-black/60 m-0 overflow-hidden text-ellipsis line-clamp-2 leading-[1.4] flex-1">{preview}</p>

        <div className="flex items-center justify-between gap-md pt-sm border-t border-black/10 mt-auto">
          <span className="text-xs text-black/50">{timeAgo}</span>
          {note.tags && note.tags.length > 0 && (
            <span className="text-[11px] bg-black/10 px-1.5 py-0.5 rounded-full text-black/60">{note.tags.length} tags</span>
          )}
        </div>
      </div>
    </div>
  );
}

