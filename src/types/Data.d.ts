// Note App Data Types

export type NoteColor = 'default' | 'red' | 'orange' | 'yellow' | 'green' | 'blue' | 'purple' | 'pink' | 'brown' | 'gray';

export type NoteStatus = 'active' | 'archived' | 'trashed';

export interface Note {
  id: string;
  title: string;
  content: string;
  folderId?: string;
  color: NoteColor;
  status: NoteStatus;
  isPinned: boolean;
  isLocked: boolean;
  createdAt: number;
  updatedAt: number;
  userId: string;
  tags?: string[];
  reminder?: number;
  isShared?: boolean;
  sharedWith?: string[];
}

export interface Folder {
  id: string;
  name: string;
  userId: string;
  createdAt: number;
  updatedAt: number;
  icon?: string;
  color?: string;
  noteCount?: number;
}

export interface User {
  id: string;
  email: string;
  displayName?: string;
  photoURL?: string;
  createdAt: number;
  updatedAt: number;
  preferences?: UserPreferences;
}

export interface UserPreferences {
  theme: 'light' | 'dark' | 'system';
  language: 'en' | 'vi';
  fontSize: 'small' | 'normal' | 'large';
  sortBy: 'date' | 'title' | 'color';
  sortOrder: 'asc' | 'desc';
}

export interface NoteFilter {
  folderId?: string;
  status?: NoteStatus;
  color?: NoteColor;
  isPinned?: boolean;
  isLocked?: boolean;
  tags?: string[];
}
