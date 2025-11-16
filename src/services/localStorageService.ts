// ----------------------------------------------------------------------
// Local Storage Service for Anonymous Notes
// ----------------------------------------------------------------------

import { Note, Folder } from '@/types/Data';
import { localStorageAvailable } from '@/utils/storage-available';

const ANONYMOUS_NOTES_KEY = 'anonymous_notes';
const ANONYMOUS_FOLDERS_KEY = 'anonymous_folders';
const ANONYMOUS_USER_ID_KEY = 'anonymous_user_id';

// ----------------------------------------------------------------------
// Helper Functions
// ----------------------------------------------------------------------

/**
 * Check if local storage is available and throw error if not
 */
const ensureLocalStorage = (): void => {
  if (!localStorageAvailable()) {
    throw new Error('Local storage is not available in this browser.');
  }
};

/**
 * Get all notes from local storage
 */
const getAllNotes = (): Record<string, Note> => {
  ensureLocalStorage();
  try {
    const data = localStorage.getItem(ANONYMOUS_NOTES_KEY);
    return data ? JSON.parse(data) : {};
  } catch (error) {
    console.error('Error reading notes from local storage:', error);
    return {};
  }
};

/**
 * Save all notes to local storage
 */
const saveAllNotes = (notes: Record<string, Note>): void => {
  ensureLocalStorage();
  try {
    localStorage.setItem(ANONYMOUS_NOTES_KEY, JSON.stringify(notes));
  } catch (error) {
    console.error('Error saving notes to local storage:', error);
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
      userId = `anon_${Date.now()}_${Math.random().toString(36).substring(2, 10)}`;
      localStorage.setItem(ANONYMOUS_USER_ID_KEY, userId);
    }
    console.log('userId', userId);
    return userId;
  },

  /**
   * Create a new note
   */
  createNote(note: Note): Note {
    const notes = getAllNotes();
    notes[note.id] = note;
    saveAllNotes(notes);
    return note;
  },

  /**
   * Get a single note by ID
   */
  getNote(noteId: string): Note | null {
    const notes = getAllNotes();
    return notes[noteId] || null;
  },

  /**
   * Get all notes
   */
  getNotes(): Note[] {
    const notes = getAllNotes();
    return Object.values(notes);
  },

  /**
   * Update a note
   */
  updateNote(noteId: string, updates: Partial<Note>): Note | null {
    const notes = getAllNotes();
    const note = notes[noteId];
    
    if (!note) {
      return null;
    }

    const updatedNote = {
      ...note,
      ...updates,
      updatedAt: Date.now(),
    };

    notes[noteId] = updatedNote;
    saveAllNotes(notes);
    return updatedNote;
  },

  /**
   * Delete a note
   */
  deleteNote(noteId: string): boolean {
    const notes = getAllNotes();
    
    if (!notes[noteId]) {
      return false;
    }

    delete notes[noteId];
    saveAllNotes(notes);
    return true;
  },

  /**
   * Get notes by status
   */
  getNotesByStatus(status: 'active' | 'archived' | 'trashed'): Note[] {
    const notes = this.getNotes();
    return notes.filter(note => note.status === status);
  },

  /**
   * Get notes by folder
   */
  getNotesByFolder(folderId: string): Note[] {
    const notes = this.getNotes();
    return notes.filter(note => note.folderId === folderId);
  },

  /**
   * Search notes
   */
  searchNotes(query: string): Note[] {
    const notes = this.getNotes();
    const lowerQuery = query.toLowerCase();
    
    return notes.filter(note =>
      note.title.toLowerCase().includes(lowerQuery) ||
      note.content.toLowerCase().includes(lowerQuery) ||
      note.tags?.some(tag => tag.toLowerCase().includes(lowerQuery))
    );
  },

  /**
   * Clear all notes
   */
  clearAllNotes(): void {
    ensureLocalStorage();
    localStorage.removeItem(ANONYMOUS_NOTES_KEY);
  },

  /**
   * Get folders
   */
  getFolders(): Folder[] {
    ensureLocalStorage();
    try {
      const data = localStorage.getItem(ANONYMOUS_FOLDERS_KEY);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error('Error reading folders from local storage:', error);
      return [];
    }
  },

  /**
   * Create a folder
   */
  createFolder(folder: Folder): Folder {
    const folders = this.getFolders();
    folders.push(folder);
    localStorage.setItem(ANONYMOUS_FOLDERS_KEY, JSON.stringify(folders));
    return folder;
  },

  /**
   * Update a folder
   */
  updateFolder(folderId: string, updates: Partial<Folder>): Folder | null {
    const folders = this.getFolders();
    const folderIndex = folders.findIndex(f => f.id === folderId);
    
    if (folderIndex === -1) {
      return null;
    }

    const updatedFolder = {
      ...folders[folderIndex],
      ...updates,
      updatedAt: Date.now(),
    };

    folders[folderIndex] = updatedFolder;
    localStorage.setItem(ANONYMOUS_FOLDERS_KEY, JSON.stringify(folders));
    return updatedFolder;
  },

  /**
   * Delete a folder
   */
  deleteFolder(folderId: string): boolean {
    const folders = this.getFolders();
    const filteredFolders = folders.filter(f => f.id !== folderId);
    
    if (filteredFolders.length === folders.length) {
      return false;
    }

    localStorage.setItem(ANONYMOUS_FOLDERS_KEY, JSON.stringify(filteredFolders));
    return true;
  },

  /**
   * Export all data
   */
  exportAllData(): { notes: Note[]; folders: Folder[]; userId: string } {
    return {
      notes: this.getNotes(),
      folders: this.getFolders(),
      userId: this.getAnonymousUserId(),
    };
  },

  /**
   * Import data
   */
  importData(data: { notes: Note[]; folders?: Folder[] }): void {
    ensureLocalStorage();
    
    // Convert notes array to object
    const notesObject: Record<string, Note> = {};
    data.notes.forEach(note => {
      notesObject[note.id] = note;
    });
    
    saveAllNotes(notesObject);
    
    if (data.folders) {
      localStorage.setItem(ANONYMOUS_FOLDERS_KEY, JSON.stringify(data.folders));
    }
  },

  /**
   * Get storage statistics
   */
  getStorageStats(): {
    noteCount: number;
    folderCount: number;
    storageUsed: number;
  } {
    const notes = this.getNotes();
    const folders = this.getFolders();
    const notesData = localStorage.getItem(ANONYMOUS_NOTES_KEY) || '';
    const foldersData = localStorage.getItem(ANONYMOUS_FOLDERS_KEY) || '';
    
    return {
      noteCount: notes.length,
      folderCount: folders.length,
      storageUsed: notesData.length + foldersData.length,
    };
  },
};

