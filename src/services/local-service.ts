import { Note } from "@/types/Data";
import { generateUserId } from "@/utils/id-generator";
import { localStorageAvailable } from "@/utils/storage-available";

const ANONYMOUS_NOTES_KEY = "anonymous_notes";
const ANONYMOUS_USER_ID_KEY = "anonymous_user_id";

/**
 * Check if local storage is available and throw error if not
 */
const ensureLocalStorage = (): void => {
  if (!localStorageAvailable()) {
    throw new Error("Local storage is not available in this browser.");
  }
};

/**
 * Get all notes from local storage
 */
const getAllNotes = (): Note | null => {
  ensureLocalStorage();
  try {
    const data = localStorage.getItem(ANONYMOUS_NOTES_KEY);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error("Error reading notes from local storage:", error);
    return null;
  }
};

/**
 * Save all notes to local storage
 */
const saveNote = (note: Note): void => {
  ensureLocalStorage();
  try {
    localStorage.setItem(ANONYMOUS_NOTES_KEY, JSON.stringify(note));
    console.log(note, 'saveNote - notes')
  } catch (error) {
    console.error("Error saving notes to local storage:", error);
    throw error;
  }
};


// ----------------------------------------------------------------------
// Service Export
// ----------------------------------------------------------------------

export const localStorageService = {
  /**
   * Get or create anonymous user ID
   */
  getAnonymousUserId(): string {
    ensureLocalStorage();
    let userId = localStorage.getItem(ANONYMOUS_USER_ID_KEY);
    if (!userId) {
      userId = `anon_${generateUserId()}`;
      localStorage.setItem(ANONYMOUS_USER_ID_KEY, userId);
    }
    return userId;
  },

  /**
   * Create a new note
   */
  createNote(note: Note): Note {
    console.log(note, 'createNote - note')
    saveNote(note);
    return note;
  },

  /**
   * Get a single note by ID
   */
  getNote(noteId?: string): Note | null {
    const notes = getAllNotes();
    if (noteId) {
      return notes?.id === noteId ? notes : null;
    }
    return notes || null;
  },


  /**
   * Update a note
   */
  updateNote(noteId: string, updates: Partial<Note>): Note | null {
    const notes = getAllNotes();
    const note = notes;

    if (!note) {
      return null;
    }

    const updatedNote = {
      ...note,
      ...updates,
      updatedAt: Date.now(),
    };

    saveNote(updatedNote);
    return updatedNote;
  },

  /**
   * Delete a note
   */
  deleteNote(noteId: string): boolean {
    const notes = getAllNotes();

    if (!notes) {
      return false;
    }
    if (notes.id !== noteId) {
      return false;
    }

    localStorage.removeItem(ANONYMOUS_NOTES_KEY);
    return true;
  },

  /**
   * Get notes by status
   */
  // getNotesByStatus(status: "active" | "archived" | "trashed"): Note[] {
  //   const notes = this.getNotes();
  //   return notes.filter((note) => note.status === status);
  // },

  /**
   * Clear all notes
   */
  clearAllNotes(): void {
    ensureLocalStorage();
    localStorage.removeItem(ANONYMOUS_NOTES_KEY);
  },
};
