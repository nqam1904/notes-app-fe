'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store';
import { setSelectedNote, addNote } from '@/store/slices/notesSlice';
import NoteEditor from '@/components/notes/note-editor';
import { localStorageService } from '@/services/localStorageService';
import { noteService } from '@/services/noteService';
import { Note } from '@/types/Data';
import { createEmptyNote } from '@/utils/note-utils';
import { generateNoteId, isAnonymousNote } from '@/utils/idGenerator';

export default function NotePage() {
  const params = useParams();
  const router = useRouter();
  const dispatch = useDispatch();
  const noteId = params.noteId as string;

  const { isAuthenticated, user } = useSelector((state: RootState) => state.user);
  const { notes } = useSelector((state: RootState) => state.notes);

  const [note, setNote] = useState<Note | null>(null);

  // Load note on mount
  useEffect(() => {
    const loadNote = async () => {
      try {
        if (isAuthenticated && user) {
          // Authenticated user - fetch from Firebase
          const fetchedNote = await noteService.getNote(user.id, noteId);

          if (fetchedNote) {
            setNote(fetchedNote);
            dispatch(setSelectedNote(noteId));
          } else {
            // Note doesn't exist, create a new blank note
            console.log('[NotePage] Note not found for authenticated user, creating new blank note:', noteId);
            const newNote: Note = {
              id: noteId,
              ...createEmptyNote(user.id),
            };
            await noteService.createNote(user.id, newNote);
            dispatch(addNote(newNote));
            setNote(newNote);
            dispatch(setSelectedNote(noteId));
          }
        } else {
          // Anonymous user - use local storage
          // First, check if noteId has correct anonymous format (ano_ prefix)
          if (!isAnonymousNote(noteId)) {
            console.log('[NotePage] Invalid anonymous note ID (missing ano_ prefix):', noteId);
            console.log('[NotePage] Clearing data and creating new anonymous note');

            // Clear all data to start fresh
            localStorageService.clearAllData();

            // Create new anonymous user ID
            const newAnonymousUserId = localStorageService.getAnonymousUserId();

            // Generate new note ID with ano_ prefix
            const newNoteId = generateNoteId(true);

            // Create the note FIRST before redirect to avoid loop
            const newNote: Note = {
              id: newNoteId,
              ...createEmptyNote(newAnonymousUserId),
            };
            localStorageService.createNote(newNote);
            dispatch(addNote(newNote));

            console.log('[NotePage] Created new anonymous note, redirecting:', newNoteId);
            router.replace(`/notes/${newNoteId}`);
            return;
          }

          const fetchedNote = localStorageService.getNote(noteId);

          // Check if note doesn't exist
          if (!fetchedNote) {
            console.log('[NotePage] Note not found in localStorage, creating new blank note:', noteId);

            // Get anonymous user ID
            const anonymousUserId = localStorageService.getAnonymousUserId();

            // Create a new blank note with the requested ID
            const newNote: Note = {
              id: noteId,
              ...createEmptyNote(anonymousUserId),
            };
            localStorageService.createNote(newNote);
            dispatch(addNote(newNote));
            setNote(newNote);
            dispatch(setSelectedNote(noteId));
          } else {
            setNote(fetchedNote);
            dispatch(setSelectedNote(noteId));
          }
        }
      } catch (err) {
        console.error('[NotePage] Error loading note:', err);
        // Still create empty note even on error
        const userId = user?.id || localStorageService.getAnonymousUserId();
        const emptyNote: Note = {
          id: noteId,
          ...createEmptyNote(userId),
        };
        setNote(emptyNote);
      }
    };

    loadNote();
  }, [noteId, isAuthenticated, user, dispatch, router]);

  // Sync note updates from editor to local state
  useEffect(() => {
    // Listen for note updates from Redux store
    const currentNote = notes.find(n => n.id === noteId);
    if (currentNote) {
      setNote(currentNote);
    }
  }, [notes, noteId]);

  // Don't render until note is loaded
  if (!note) {
    return null;
  }

  return (
    <div className="w-full h-full">
      <NoteEditor note={note} />
    </div>
  );
}

