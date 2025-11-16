'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import { generateNoteId } from '@/utils/idGenerator';
import { localStorageService } from '@/services/localStorageService';

export default function NotesPage() {
  const router = useRouter();
  const { notes } = useSelector((state: RootState) => state.notes);
  const { isAuthenticated } = useSelector((state: RootState) => state.user);

  useEffect(() => {
    // Check if there are existing notes
    let existingNotes = notes;

    if (!isAuthenticated && notes.length === 0) {
      // For anonymous users, check local storage
      existingNotes = localStorageService.getNotes();
    }

    if (existingNotes.length > 0) {
      // If there are notes, redirect to the most recent one
      const mostRecentNote = existingNotes.sort((a, b) => b.updatedAt - a.updatedAt)[0];
      router.push(`/notes/${mostRecentNote.id}`);
    } else {
      // No notes exist, create a new one with random ID
      const newNoteId = generateNoteId();
      router.push(`/notes/${newNoteId}`);
    }
  }, [router, notes, isAuthenticated]);

  return (
    <div className="flex items-center justify-center w-full h-screen">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 border-4 border-gray-300 border-t-accent rounded-full animate-spin" />
        <p>Loading notes...</p>
      </div>
    </div>
  );
}

