'use client';

import { ReactNode } from 'react';
import NotesContainer from '@/components/notes/NotesContainer';
import styles from './layout.module.scss';

export default function NotesLayout({ children }: { children: ReactNode }) {
  return (
    <div className={styles.notesLayout}>
      <NotesContainer>{children}</NotesContainer>
    </div>
  );
}

