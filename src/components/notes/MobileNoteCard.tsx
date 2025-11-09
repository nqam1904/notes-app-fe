'use client';

import { Note } from '@/types/Data';
import { formatDistanceToNow } from 'date-fns';
import { enUS, vi } from 'date-fns/locale';
import { useTranslation } from 'react-i18next';
import styles from './MobileNoteCard.module.scss';

interface MobileNoteCardProps {
  note: Note;
  onClick: () => void;
}

export default function MobileNoteCard({ note, onClick }: MobileNoteCardProps) {
  const { i18n } = useTranslation();
  const locale = i18n.language === 'vi' ? vi : enUS;

  const timeAgo = formatDistanceToNow(new Date(note.updatedAt), {
    addSuffix: true,
    locale,
  });

  const title = note.title || 'Untitled';
  const preview = note.content.substring(0, 80).replace(/<[^>]*>/g, '');

  return (
    <div
      className={styles.card}
      style={{ backgroundColor: `var(--color-note-${note.color})` }}
      onClick={onClick}
    >
      <div className={styles.content}>
        <div className={styles.header}>
          <h3 className={styles.title}>{title}</h3>
          <div className={styles.badges}>
            {note.isPinned && <span className={styles.badge}>📌</span>}
            {note.isLocked && <span className={styles.badge}>🔒</span>}
          </div>
        </div>

        <p className={styles.preview}>{preview}</p>

        <div className={styles.footer}>
          <span className={styles.time}>{timeAgo}</span>
          {note.tags && note.tags.length > 0 && (
            <span className={styles.tagCount}>{note.tags.length} tags</span>
          )}
        </div>
      </div>
    </div>
  );
}

