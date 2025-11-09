'use client';

import { Note } from '@/types/Data';
import { formatDistanceToNow } from 'date-fns';
import { enUS, vi } from 'date-fns/locale';
import { useTranslation } from 'react-i18next';
import styles from './NotesListItem.module.scss';

interface NotesListItemProps {
  note: Note;
  onClick: () => void;
}

export default function NotesListItem({ note, onClick }: NotesListItemProps) {
  const { i18n } = useTranslation();
  const locale = i18n.language === 'vi' ? vi : enUS;

  const timeAgo = formatDistanceToNow(new Date(note.updatedAt), {
    addSuffix: true,
    locale,
  });

  const title = note.title || 'Untitled';
  const preview = note.content.substring(0, 50).replace(/<[^>]*>/g, '');

  return (
    <button className={styles.item} onClick={onClick}>
      <div className={styles.content}>
        <div className={styles.header}>
          <h3 className={styles.title}>{title}</h3>
          {note.isPinned && <span className={styles.pinnedBadge}>📌</span>}
          {note.isLocked && <span className={styles.lockedBadge}>🔒</span>}
        </div>
        <p className={styles.preview}>{preview || 'No additional text'}</p>
        <div className={styles.footer}>
          <span className={styles.time}>{timeAgo}</span>
          {note.tags && note.tags.length > 0 && (
            <div className={styles.tags}>
              {note.tags.slice(0, 2).map(tag => (
                <span key={tag} className={styles.tag}>
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

