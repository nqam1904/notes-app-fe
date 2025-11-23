import { firestore } from '@/config/firebase';
import {
  collection,
  doc,
  addDoc,
  getDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  query,
  where,
  onSnapshot,
  orderBy,
  Timestamp,
  Unsubscribe,
} from 'firebase/firestore';
import { Note, NoteStatus } from '@/types/Data';

const NOTES_COLLECTION = 'notes';

// Helper function to ensure Firestore is available
const ensureFirestore = () => {
  if (!firestore) {
    throw new Error('Firestore is not initialized. Please check your Firebase configuration.');
  }
  return firestore;
};

// Helper function to convert Firestore timestamp to number
const convertTimestamp = (timestamp: any): number => {
  if (timestamp && typeof timestamp.toMillis === 'function') {
    return timestamp.toMillis();
  }
  return timestamp || Date.now();
};

export const noteService = {
  /**
   * Create a new note
   */
  async createNote(userId: string, noteData: Omit<Note, 'id'>): Promise<Note> {
    try {
      const db = ensureFirestore();
      const notesRef = collection(db, NOTES_COLLECTION);

      const noteToCreate = {
        ...noteData,
        userId,
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now(),
      };

      const docRef = await addDoc(notesRef, noteToCreate);

      const note: Note = {
        ...noteData,
        id: docRef.id,
      };

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
      const db = ensureFirestore();
      const notesRef = collection(db, NOTES_COLLECTION);
      const q = query(
        notesRef,
        where('userId', '==', userId),
        orderBy('updatedAt', 'desc')
      );

      const querySnapshot = await getDocs(q);
      const notes: Note[] = [];

      querySnapshot.forEach((doc) => {
        const data = doc.data();
        notes.push({
          id: doc.id,
          title: data.title,
          content: data.content,
          folderId: data.folderId,
          status: data.status,
          isPinned: data.isPinned,
          isLocked: data.isLocked,
          createdAt: convertTimestamp(data.createdAt),
          updatedAt: convertTimestamp(data.updatedAt),
          userId: data.userId,
          tags: data.tags,
          reminder: data.reminder,
          isShared: data.isShared,
          sharedWith: data.sharedWith,
        } as Note);
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
      const db = ensureFirestore();
      const noteRef = doc(db, NOTES_COLLECTION, noteId);
      const docSnap = await getDoc(noteRef);

      if (!docSnap.exists()) {
        return null;
      }

      const data = docSnap.data();
      
      // Verify the note belongs to the user
      if (data.userId !== userId) {
        throw new Error('Unauthorized access to note');
      }

      return {
        id: docSnap.id,
        title: data.title,
        content: data.content,
        folderId: data.folderId,
        status: data.status,
        isPinned: data.isPinned,
        isLocked: data.isLocked,
        createdAt: convertTimestamp(data.createdAt),
        updatedAt: convertTimestamp(data.updatedAt),
        userId: data.userId,
        tags: data.tags,
        reminder: data.reminder,
        isShared: data.isShared,
        sharedWith: data.sharedWith,
      } as Note;
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
      const db = ensureFirestore();
      const noteRef = doc(db, NOTES_COLLECTION, noteId);
      
      // First verify the note belongs to the user
      const docSnap = await getDoc(noteRef);
      if (!docSnap.exists()) {
        throw new Error('Note not found');
      }
      
      if (docSnap.data().userId !== userId) {
        throw new Error('Unauthorized access to note');
      }

      // Remove id from updates if present
      const { id, userId: _, createdAt, ...updateData } = updates as any;

      await updateDoc(noteRef, {
        ...updateData,
        updatedAt: Timestamp.now(),
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
      const db = ensureFirestore();
      const noteRef = doc(db, NOTES_COLLECTION, noteId);
      
      // First verify the note belongs to the user
      const docSnap = await getDoc(noteRef);
      if (!docSnap.exists()) {
        throw new Error('Note not found');
      }
      
      if (docSnap.data().userId !== userId) {
        throw new Error('Unauthorized access to note');
      }

      await deleteDoc(noteRef);
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
      const db = ensureFirestore();
      const notesRef = collection(db, NOTES_COLLECTION);
      const q = query(
        notesRef,
        where('userId', '==', userId),
        where('status', '==', status),
        orderBy('updatedAt', 'desc')
      );

      const querySnapshot = await getDocs(q);
      const notes: Note[] = [];

      querySnapshot.forEach((doc) => {
        const data = doc.data();
        notes.push({
          id: doc.id,
          title: data.title,
          content: data.content,
          folderId: data.folderId,
          status: data.status,
          isPinned: data.isPinned,
          isLocked: data.isLocked,
          createdAt: convertTimestamp(data.createdAt),
          updatedAt: convertTimestamp(data.updatedAt),
          userId: data.userId,
          tags: data.tags,
          reminder: data.reminder,
          isShared: data.isShared,
          sharedWith: data.sharedWith,
        } as Note);
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
  subscribeToNotes(userId: string, callback: (notes: Note[]) => void): Unsubscribe {
    try {
      const db = ensureFirestore();
      const notesRef = collection(db, NOTES_COLLECTION);
      const q = query(
        notesRef,
        where('userId', '==', userId),
        orderBy('updatedAt', 'desc')
      );

      const unsubscribe = onSnapshot(
        q,
        (querySnapshot) => {
          const notes: Note[] = [];
          querySnapshot.forEach((doc) => {
            const data = doc.data();
            notes.push({
              id: doc.id,
              title: data.title,
              content: data.content,
              folderId: data.folderId,
              status: data.status,
              isPinned: data.isPinned,
              isLocked: data.isLocked,
              createdAt: convertTimestamp(data.createdAt),
              updatedAt: convertTimestamp(data.updatedAt),
              userId: data.userId,
              tags: data.tags,
              reminder: data.reminder,
              isShared: data.isShared,
              sharedWith: data.sharedWith,
            } as Note);
          });
          callback(notes);
        },
        (error) => {
          console.error('Error in notes subscription:', error);
        }
      );

      return unsubscribe;
    } catch (error) {
      console.error('Error subscribing to notes:', error);
      throw error;
    }
  },

  /**
   * Subscribe to real-time updates for a single note
   */
  subscribeToNote(userId: string, noteId: string, callback: (note: Note | null) => void): Unsubscribe {
    try {
      const db = ensureFirestore();
      const noteRef = doc(db, NOTES_COLLECTION, noteId);

      const unsubscribe = onSnapshot(
        noteRef,
        (docSnap) => {
          if (docSnap.exists()) {
            const data = docSnap.data();
            
            // Verify the note belongs to the user
            if (data.userId !== userId) {
              callback(null);
              return;
            }

            callback({
              id: docSnap.id,
              title: data.title,
              content: data.content,
              folderId: data.folderId,
              status: data.status,
              isPinned: data.isPinned,
              isLocked: data.isLocked,
              createdAt: convertTimestamp(data.createdAt),
              updatedAt: convertTimestamp(data.updatedAt),
              userId: data.userId,
              tags: data.tags,
              reminder: data.reminder,
              isShared: data.isShared,
              sharedWith: data.sharedWith,
            } as Note);
          } else {
            callback(null);
          }
        },
        (error) => {
          console.error('Error in note subscription:', error);
        }
      );

      return unsubscribe;
    } catch (error) {
      console.error('Error subscribing to note:', error);
      throw error;
    }
  },
};

