'use client';

import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/store';
import { setSelectedNote } from '@/store/slices/notesSlice';
import { useTranslation } from 'react-i18next';
import { Note } from '@/types/Data';
import { formatDistanceToNow } from 'date-fns';
import { enUS, vi } from 'date-fns/locale';
import NotesListItem from './NotesListItem';
import styles from './NotesList.module.scss';

interface NotesListProps {
  notes: Note[];
}

export default function NotesList({ notes }: NotesListProps) {
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch<AppDispatch>();

  if (notes.length === 0) {
    return (
      <div className={styles.emptyState}>
        <div className={styles.emptyIcon}>📝</div>
        <p className={styles.emptyText}>{t('note.empty')}</p>
      </div>
    );
  }

  return (
    <div className={styles.list}>
      {notes.map(note => (
        <NotesListItem
          key={note.id}
          note={note}
          onClick={() => dispatch(setSelectedNote(note.id))}
        />
      ))}
    </div>
  );
}

