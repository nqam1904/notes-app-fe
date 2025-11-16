'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store';
import { setSelectedNote, updateNote, addNote } from '@/store/slices/notesSlice';
import NoteEditor from '@/components/notes/note-editor';
import { localStorageService } from '@/services/localStorageService';
import { noteService } from '@/services/noteService';
import { Note } from '@/types/Data';
import { createEmptyNote } from '@/utils/note-utils';
import { generateNoteId } from '@/utils/idGenerator';

export default function NotePage() {
  const params = useParams();
  const router = useRouter();
  const dispatch = useDispatch();
  const noteId = params.noteId as string;

  const { isAuthenticated, user } = useSelector((state: RootState) => state.user);
  const { notes } = useSelector((state: RootState) => state.notes);

  const [note, setNote] = useState<Note | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Load note on mount
  useEffect(() => {
    const loadNote = async () => {
      try {
        setLoading(true);
        setError(null);

        if (isAuthenticated && user) {
          // Authenticated user - fetch from Firebase
          const fetchedNote = await noteService.getNote(user.id, noteId);
          
          if (fetchedNote) {
            setNote(fetchedNote);
            dispatch(setSelectedNote(noteId));
          } else {
            // Note doesn't exist, create a new one
            const newNote: Note = {
              id: noteId,
              ...createEmptyNote(user.id),
            };
            await noteService.createNote(user.id, newNote);
            setNote(newNote);
            dispatch(addNote(newNote));
          }
        } else {
          // Anonymous user - use local storage
          let fetchedNote = localStorageService.getNote(noteId);
          
          if (!fetchedNote) {
            // Note doesn't exist, create a new one
            const anonymousUserId = localStorageService.getAnonymousUserId();
            const newNote: Note = {
              id: noteId,
              ...createEmptyNote(anonymousUserId),
            };
            localStorageService.createNote(newNote);
            fetchedNote = newNote;
            dispatch(addNote(newNote));
          }
          
          setNote(fetchedNote);
          dispatch(setSelectedNote(noteId));
        }
      } catch (err) {
        console.error('Error loading note:', err);
        setError('Failed to load note. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    loadNote();
  }, [noteId, isAuthenticated, user, dispatch]);

  // Sync note updates from editor to local state
  useEffect(() => {
    // Listen for note updates from Redux store
    const currentNote = notes.find(n => n.id === noteId);
    if (currentNote) {
      setNote(currentNote);
    }
  }, [notes, noteId]);

  if (loading) {
    return (
      <div className="flex items-center justify-center w-full h-full">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-gray-300 border-t-accent rounded-full animate-spin" />
          <p>Loading note...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center w-full h-full">
        <div className="flex flex-col items-center gap-4 text-center">
          <h2 className="text-2xl font-bold">Error</h2>
          <p className="text-[rgb(var(--color-text-secondary))]">{error}</p>
          <button 
            className="px-6 py-3 bg-accent text-white rounded-lg hover:bg-accent-hover transition-colors"
            onClick={() => router.push('/notes')}
          >
            Back to Notes
          </button>
        </div>
      </div>
    );
  }

  if (!note) {
    return (
      <div className="flex items-center justify-center w-full h-full">
        <div className="flex flex-col items-center gap-4 text-center">
          <h2 className="text-2xl font-bold">Note Not Found</h2>
          <p className="text-[rgb(var(--color-text-secondary))]">The note you&apos;re looking for doesn&apos;t exist.</p>
          <button 
            className="px-6 py-3 bg-accent text-white rounded-lg hover:bg-accent-hover transition-colors"
            onClick={() => router.push('/notes')}
          >
            Back to Notes
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full">
      <NoteEditor note={note} />
    </div>
  );
}

