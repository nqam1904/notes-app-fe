'use client';

import { ROUTES } from '@/routes/path';
import { localStorageService } from '@/services/localStorageService';
import { RootState } from '@/store';
import { generateNoteId } from '@/utils/id-generator';
import { logAction } from '@/utils/log-utils';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';

export default function NotesPage() {
  const router = useRouter();
  const { notes } = useSelector((state: RootState) => state.notes);
  const { isAuthenticated } = useSelector((state: RootState) => state.user);

  useEffect(() => {
    const startTime = Date.now();

    try {
      console.log('[NotesPage] Initializing notes page');
      console.log('[NotesPage] Authentication status:', isAuthenticated ? 'Authenticated' : 'Anonymous');
      console.log('[NotesPage] Notes in Redux store:', notes.length);

      // Check if there are existing notes
      let existingNotes = notes;

      if (!isAuthenticated && notes.length === 0) {
        // For anonymous users, check local storage
        console.log('[NotesPage] Checking local storage for anonymous user notes');
        existingNotes = localStorageService.getNotes();
        console.log('[NotesPage] Notes found in local storage:', existingNotes.length);
      }

      if (existingNotes.length > 0) {
        // If there are notes, redirect to the most recent one
        // Create a copy of the array before sorting to avoid mutating read-only Redux state
        const mostRecentNote = [...existingNotes].sort((a, b) => b.updatedAt - a.updatedAt)[0];
        const targetRoute = ROUTES.NOTES_ANONYMOUS.replace(':id', mostRecentNote.id);
        console.log('[NotesPage] Redirecting to most recent note:', {
          noteId: mostRecentNote.id,
          title: mostRecentNote.title,
          route: targetRoute
        });
        router.push(targetRoute);
        logAction('info', 'NotesPage - Redirect to existing note', startTime, 'Success', {
          noteId: mostRecentNote.id,
          totalNotes: existingNotes.length
        });
      } else {
        // No notes exist, create a new one with random ID
        const newNoteId = generateNoteId(!isAuthenticated);
        const targetRoute = ROUTES.NOTES_ANONYMOUS.replace(':id', newNoteId);
        console.log('[NotesPage] No notes found, creating new note:', {
          noteId: newNoteId,
          route: targetRoute
        });
        router.push(targetRoute);
        logAction('info', 'NotesPage - Create new note', startTime, 'Success', {
          noteId: newNoteId
        });
      }
    } catch (error: any) {
      console.error('[NotesPage] Error during initialization:', error);
      logAction('error', 'NotesPage - Initialization', startTime, error.message);
    }
  }, [router, notes, isAuthenticated]);

  // Next.js loading.tsx will handle the loading UI during navigation
  return null;
}

