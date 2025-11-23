'use client';

import NoteEditor from '@/components/input/input-editor';
import { localStorageService } from '@/services/local-service';
import { noteService } from '@/services/note-service';
import { RootState } from '@/store';
import { addNote, setSelectedNote } from '@/store/slices/notesSlice';
import { Note } from '@/types/Data';
import { isAnonymousNote } from '@/utils/id-generator';
import { createEmptyNote } from '@/utils/note-utils';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

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
            // console.log('[NotePage] Note not found for authenticated user, creating new blank note:', noteId);
            // const newNote: Note = {
            //   ...createEmptyNote(user.id),
            // };
            // await noteService.createNote(user.id, newNote);
            // dispatch(addNote(newNote));
            // setNote(newNote);
            // dispatch(setSelectedNote(noteId));
          }
        } else {
          // Anonymous user - use local storage
          // First, check if noteId has correct anonymous
          if (isAnonymousNote(noteId)) {
            const fetchedNote = localStorageService.getNote(noteId);
            // Check if note doesn't exist
            if (!fetchedNote) {
              console.log('[NotePage] Note not found in localStorage, creating new blank note:', noteId);

              // Get anonymous user ID
              const anonymousUserId = localStorageService.getAnonymousUserId();

              // Create a new blank note with the requested ID
              const newNote: Note = createEmptyNote(noteId, anonymousUserId);
              localStorageService.createNote(newNote);
              dispatch(addNote(newNote));
              setNote(newNote);
              dispatch(setSelectedNote(noteId));
            } else {
              setNote(fetchedNote);
              dispatch(setSelectedNote(noteId));
            }
          }


        }
      } catch (err) {
        console.error('[NotePage] Error loading note:', err);
        // Still create empty note even on error
        // const userId = user?.id || localStorageService.getAnonymousUserId();
        // const emptyNote: Note = {
        //   ...createEmptyNote(noteId, userId),
        // };
        // setNote(emptyNote);
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

