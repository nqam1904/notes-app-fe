'use client';

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '@/store';
import {
  setNotes,
  addNote,
  updateNote,
  deleteNote,
  setLoading,
  setError,
  setFilter,
  setSearchQuery,
} from '@/store/slices/notesSlice';
import { noteService } from '@/services/noteService';
import { localStorageService } from '@/services/localStorageService';
import { Note, NoteFilter } from '@/types/Data';

export const useNotes = (userId?: string | null, isAnonymous = false) => {
  const dispatch = useDispatch<AppDispatch>();
  const { notes, filteredNotes, selectedNoteId, loading, error } = useSelector(
    (state: RootState) => state.notes
  );

  // Load notes on mount
  useEffect(() => {
    if (!userId && !isAnonymous) return;

    dispatch(setLoading(true));
    
    if (isAnonymous) {
      // Load from local storage for anonymous users
      const localNotes = localStorageService.getNotes();
      dispatch(setNotes(localNotes.sort((a, b) => b.updatedAt - a.updatedAt)));
      dispatch(setLoading(false));
    } else if (userId) {
      // Subscribe to Firebase for authenticated users
      const unsubscribe = noteService.subscribeToNotes(userId, (fetchedNotes) => {
        dispatch(setNotes(fetchedNotes.sort((a, b) => b.updatedAt - a.updatedAt)));
        dispatch(setLoading(false));
      });

      return () => {
        unsubscribe();
      };
    }
  }, [userId, isAnonymous, dispatch]);

  const createNote = async (noteData: Omit<Note, 'id'>) => {
    try {
      dispatch(setLoading(true));
      
      if (isAnonymous) {
        // Create in local storage
        const newNote: Note = {
          id: `note_${Date.now()}_${Math.random().toString(36).substring(2, 10)}`,
          ...noteData,
        };
        localStorageService.createNote(newNote);
        dispatch(addNote(newNote));
        return newNote;
      } else {
        if (!userId) throw new Error('User ID is required');
        const newNote = await noteService.createNote(userId, noteData);
        dispatch(addNote(newNote));
        return newNote;
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to create note';
      dispatch(setError(errorMessage));
      throw err;
    } finally {
      dispatch(setLoading(false));
    }
  };

  const updateNoteData = async (noteId: string, updates: Partial<Note>) => {
    try {
      dispatch(setLoading(true));
      
      if (isAnonymous) {
        // Update in local storage
        localStorageService.updateNote(noteId, updates);
        dispatch(updateNote({ id: noteId, changes: updates }));
      } else {
        if (!userId) throw new Error('User ID is required');
        await noteService.updateNote(userId, noteId, updates);
        dispatch(updateNote({ id: noteId, changes: updates }));
      }
      
      dispatch(setError(null));
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to update note';
      dispatch(setError(errorMessage));
      throw err;
    } finally {
      dispatch(setLoading(false));
    }
  };

  const deleteNoteData = async (noteId: string) => {
    try {
      dispatch(setLoading(true));
      
      if (isAnonymous) {
        // Delete from local storage
        localStorageService.deleteNote(noteId);
        dispatch(deleteNote(noteId));
      } else {
        if (!userId) throw new Error('User ID is required');
        await noteService.deleteNote(userId, noteId);
        dispatch(deleteNote(noteId));
      }
      
      dispatch(setError(null));
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to delete note';
      dispatch(setError(errorMessage));
      throw err;
    } finally {
      dispatch(setLoading(false));
    }
  };

  const applyFilter = (filter: NoteFilter) => {
    dispatch(setFilter(filter));
  };

  const search = (query: string) => {
    dispatch(setSearchQuery(query));
  };

  return {
    notes,
    filteredNotes,
    selectedNoteId,
    loading,
    error,
    createNote,
    updateNote: updateNoteData,
    deleteNote: deleteNoteData,
    applyFilter,
    search,
  };
};

