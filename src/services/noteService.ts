import { database } from '@/config/firebase';
import {
  ref,
  push,
  update,
  remove,
  get,
  query,
  orderByChild,
  equalTo,
  onValue,
  off,
} from 'firebase/database';
import { Note, NoteStatus } from '@/types/Data';

const NOTES_PATH = 'notes';

export const noteService = {
  /**
   * Create a new note
   */
  async createNote(userId: string, noteData: Omit<Note, 'id'>): Promise<Note> {
    try {
      const notesRef = ref(database, `${NOTES_PATH}/${userId}`);
      const newNoteRef = push(notesRef);
      
      const note: Note = {
        ...noteData,
        id: newNoteRef.key || '',
      };

      await update(newNoteRef, note);
      return note;
    } catch (error) {
      console.error('Error creating note:', error);
      throw error;
    }
  },

  /**
   * Get all notes for a user
   */
  async getNotes(userId: string): Promise<Note[]> {
    try {
      const notesRef = ref(database, `${NOTES_PATH}/${userId}`);
      const snapshot = await get(notesRef);

      if (!snapshot.exists()) {
        return [];
      }

      const notes: Note[] = [];
      snapshot.forEach(childSnapshot => {
        notes.push(childSnapshot.val());
      });

      return notes;
    } catch (error) {
      console.error('Error fetching notes:', error);
      throw error;
    }
  },

  /**
   * Get a single note by ID
   */
  async getNote(userId: string, noteId: string): Promise<Note | null> {
    try {
      const noteRef = ref(database, `${NOTES_PATH}/${userId}/${noteId}`);
      const snapshot = await get(noteRef);

      if (!snapshot.exists()) {
        return null;
      }

      return snapshot.val();
    } catch (error) {
      console.error('Error fetching note:', error);
      throw error;
    }
  },

  /**
   * Update a note
   */
  async updateNote(userId: string, noteId: string, updates: Partial<Note>): Promise<void> {
    try {
      const noteRef = ref(database, `${NOTES_PATH}/${userId}/${noteId}`);
      await update(noteRef, {
        ...updates,
        updatedAt: Date.now(),
      });
    } catch (error) {
      console.error('Error updating note:', error);
      throw error;
    }
  },

  /**
   * Delete a note
   */
  async deleteNote(userId: string, noteId: string): Promise<void> {
    try {
      const noteRef = ref(database, `${NOTES_PATH}/${userId}/${noteId}`);
      await remove(noteRef);
    } catch (error) {
      console.error('Error deleting note:', error);
      throw error;
    }
  },

  /**
   * Get notes by status
   */
  async getNotesByStatus(userId: string, status: NoteStatus): Promise<Note[]> {
    try {
      const notesRef = ref(database, `${NOTES_PATH}/${userId}`);
      const notesQuery = query(notesRef, orderByChild('status'), equalTo(status));
      const snapshot = await get(notesQuery);

      if (!snapshot.exists()) {
        return [];
      }

      const notes: Note[] = [];
      snapshot.forEach(childSnapshot => {
        notes.push(childSnapshot.val());
      });

      return notes;
    } catch (error) {
      console.error('Error fetching notes by status:', error);
      throw error;
    }
  },

  /**
   * Subscribe to real-time updates for all user notes
   */
  subscribeToNotes(userId: string, callback: (notes: Note[]) => void): () => void {
    try {
      const notesRef = ref(database, `${NOTES_PATH}/${userId}`);

      const unsubscribe = onValue(notesRef, snapshot => {
        const notes: Note[] = [];
        if (snapshot.exists()) {
          snapshot.forEach(childSnapshot => {
            notes.push(childSnapshot.val());
          });
        }
        callback(notes);
      });

      return () => off(notesRef);
    } catch (error) {
      console.error('Error subscribing to notes:', error);
      throw error;
    }
  },

  /**
   * Subscribe to real-time updates for a single note
   */
  subscribeToNote(userId: string, noteId: string, callback: (note: Note | null) => void): () => void {
    try {
      const noteRef = ref(database, `${NOTES_PATH}/${userId}/${noteId}`);

      const unsubscribe = onValue(noteRef, snapshot => {
        if (snapshot.exists()) {
          callback(snapshot.val());
        } else {
          callback(null);
        }
      });

      return () => off(noteRef);
    } catch (error) {
      console.error('Error subscribing to note:', error);
      throw error;
    }
  },
};

