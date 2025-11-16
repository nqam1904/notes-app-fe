'use client';

import { ReactNode, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store';
import { setUser } from '@/store/slices/userSlice';
import NotesHeader from '../notes-header';
import NotesSidebar from '../notes-sidebar';
import AnonymousNotesLayout from './AnonymousNotesLayout';

interface NotesContainerProps {
  children: ReactNode;
}

export default function NotesContainer({ children }: NotesContainerProps) {
  const dispatch = useDispatch();
  const { loading, isAnonymous, isAuthenticated } = useSelector(
    (state: RootState) => state.user
  );

  useEffect(() => {
    // Placeholder for future authenticated user initialization (e.g., Firebase Auth)
    // dispatch(setUser(fetchedUser));
  }, [dispatch]);

  if (loading) {
    return (
      <div className="flex items-center justify-center w-full min-h-screen bg-[rgb(var(--color-bg-primary))]">
        <div className="flex items-center gap-2" aria-label="Loading notes" role="status">
          <span className="w-2.5 h-2.5 rounded-full bg-[#4285f4] animate-[googleBounce_0.8s_ease-in-out_infinite_alternate]" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#ea4335] animate-[googleBounce_0.8s_ease-in-out_infinite_alternate] [animation-delay:0.1s]" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#fbbc05] animate-[googleBounce_0.8s_ease-in-out_infinite_alternate] [animation-delay:0.2s]" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#34a853] animate-[googleBounce_0.8s_ease-in-out_infinite_alternate] [animation-delay:0.3s]" />
        </div>
      </div>
    );
  }

  // Anonymous users: simple notepad-style UI without sidebar/header
  if (isAnonymous && !isAuthenticated) {
    return <AnonymousNotesLayout>{children}</AnonymousNotesLayout>;
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

