'use client';

import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/store';
import { setSelectedNote } from '@/store/slices/notesSlice';
import { useTranslation } from 'react-i18next';
import { Note } from '@/types/Data';
import { formatDistanceToNow } from 'date-fns';
import { enUS, vi } from 'date-fns/locale';
import { FileTextOutlined } from '@ant-design/icons';
import NotesListItem from '../notes-list-item';

interface NotesListProps {
  notes: Note[];
}

export default function NotesList({ notes }: NotesListProps) {
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch<AppDispatch>();

  if (notes.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-center p-xl text-[rgb(var(--color-text-tertiary))]">
        <FileTextOutlined className="text-[64px] mb-lg opacity-50" />
        <p className="text-sm m-0">{t('note.empty')}</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full p-sm gap-xs overflow-y-auto">
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

