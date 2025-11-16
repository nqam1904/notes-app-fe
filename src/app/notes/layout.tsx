'use client';

import { ReactNode } from 'react';
import NotesContainer from '@/components/notes/notes-container';
import { useAppInitialization } from '@/hooks/useAppInitialization';

export default function NotesLayout({ children }: { children: ReactNode }) {
  // Initialize app for anonymous or authenticated users
  useAppInitialization();

  return (
    <div className="h-full">
      <NotesContainer>{children}</NotesContainer>
    </div>
  );
}

