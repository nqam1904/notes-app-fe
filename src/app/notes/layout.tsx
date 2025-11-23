'use client';

import { useAppInitialization } from '@/hooks/useAppInitialization';
import { NotesContainer } from '@/sections/notes/containers/notes-container';
import { ReactNode } from 'react';

export default function NotesLayout({ children }: { children: ReactNode }) {
  // Initialize app for anonymous or authenticated users
  useAppInitialization();

  return (
    <div className="h-screen">
      <NotesContainer>{children}</NotesContainer>
    </div>
  );
}

