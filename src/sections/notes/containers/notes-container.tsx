'use client';

import { RootState } from '@/store';
import { ReactNode, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AnonymousNotesView } from '../anonymous/view';
import { NotesHeader } from '../components/note-header';
import { NotesSidebar } from '../components/note-sidebar';

interface NotesContainerProps {
  children: ReactNode;
}

export function NotesContainer({ children }: NotesContainerProps) {
  const dispatch = useDispatch();
  const { loading, isAnonymous, isAuthenticated } = useSelector(
    (state: RootState) => state.user
  );
  useEffect(() => {
    // Placeholder for future authenticated user initialization (e.g., Firebase Auth)
    // dispatch(setUser(fetchedUser));
  }, [dispatch]);

  // Show loading screen while determining user state OR if state is undetermined
  if (loading || (!isAnonymous && !isAuthenticated)) {
    return (
      <div className="flex items-center justify-center w-full min-h-screen bg-[rgb(var(--color-bg-primary))]">
        <div className="flex flex-col items-center gap-4" aria-label="Loading notes" role="status">
          <div className="relative w-12 h-12">
            <div className="absolute inset-0 border-4 border-[rgb(var(--color-border))] rounded-full opacity-20"></div>
            <div className="absolute inset-0 border-4 border-[rgb(var(--color-accent))] rounded-full border-t-transparent animate-spin"></div>
          </div>
        </div>
      </div>
    );
  }

  // Anonymous users: simple notepad-style UI without sidebar/header
  if (isAnonymous && !isAuthenticated) {
    return <AnonymousNotesView>{children}</AnonymousNotesView>;
  }

  // Authenticated users: full layout with header, sidebar, folders, user info
  return (
    <div className="flex flex-col w-full h-full bg-[rgb(var(--color-bg-primary))]">
      <NotesHeader />
      <div className="flex flex-1 overflow-hidden md:flex-col">
        <NotesSidebar />
        <div className="flex-1 flex overflow-hidden md:w-full">{children}</div>
      </div>
    </div>
  );
}

