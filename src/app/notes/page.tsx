'use client';

import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import NotesList from '@/components/notes/NotesList';
import NoteEditor from '@/components/notes/NoteEditor';
import EmptyState from '@/components/notes/EmptyState';
import styles from './page.module.scss';

export default function NotesPage() {
  const { filteredNotes, selectedNoteId } = useSelector(
    (state: RootState) => state.notes
  );

  const selectedNote = filteredNotes.find(note => note.id === selectedNoteId);

  return (
    <div className={styles.page}>
      <div className={styles.listSection}>
        <NotesList notes={filteredNotes} />
      </div>
      <div className={styles.editorSection}>
        {selectedNote ? (
          <NoteEditor note={selectedNote} />
        ) : (
          <EmptyState />
        )}
      </div>
    </div>
  );
}

