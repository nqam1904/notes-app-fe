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
import { Note, NoteFilter } from '@/types/Data';

export const useNotes = (userId: string | undefined) => {
  const dispatch = useDispatch<AppDispatch>();
  const { notes, filteredNotes, selectedNoteId, loading, error } = useSelector(
    (state: RootState) => state.notes
  );

  // Load notes on mount
  useEffect(() => {
    if (!userId) return;

    dispatch(setLoading(true));
    
    const unsubscribe = noteService.subscribeToNotes(userId, (fetchedNotes) => {
      dispatch(setNotes(fetchedNotes.sort((a, b) => b.updatedAt - a.updatedAt)));
      dispatch(setLoading(false));
    });

    return () => {
      unsubscribe();
    };
  }, [userId, dispatch]);

  const createNote = async (noteData: Omit<Note, 'id'>) => {
    if (!userId) throw new Error('User ID is required');
    
    try {
      dispatch(setLoading(true));
      const newNote = await noteService.createNote(userId, noteData);
      dispatch(addNote(newNote));
      dispatch(setError(null));
      return newNote;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to create note';
      dispatch(setError(errorMessage));
      throw err;
    } finally {
      dispatch(setLoading(false));
    }
  };

  const updateNoteData = async (noteId: string, updates: Partial<Note>) => {
    if (!userId) throw new Error('User ID is required');
    
    try {
      dispatch(setLoading(true));
      await noteService.updateNote(userId, noteId, updates);
      
      const updatedNote = notes.find(n => n.id === noteId);
      if (updatedNote) {
        dispatch(updateNote({ ...updatedNote, ...updates }));
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
    if (!userId) throw new Error('User ID is required');
    
    try {
      dispatch(setLoading(true));
      await noteService.deleteNote(userId, noteId);
      dispatch(deleteNote(noteId));
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

