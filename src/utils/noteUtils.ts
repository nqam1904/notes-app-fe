import { Note, NoteColor } from '@/types/Data';

/**
 * Generate a unique ID for a note
 */
export const generateNoteId = (): string => {
  return `note_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};

/**
 * Create a new empty note
 */
export const createEmptyNote = (userId: string, folderId?: string): Omit<Note, 'id'> => {
  const now = Date.now();
  return {
    title: '',
    content: '',
    folderId,
    color: 'default' as NoteColor,
    status: 'active',
    isPinned: false,
    isLocked: false,
    createdAt: now,
    updatedAt: now,
    userId,
    tags: [],
  };
};

/**
 * Sanitize note content for HTML rendering
 */
export const sanitizeContent = (content: string): string => {
  const div = document.createElement('div');
  div.textContent = content;
  return div.innerHTML;
};

/**
 * Truncate text to a maximum length
 */
export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
};

/**
 * Get note preview (first 100 chars)
 */
export const getNotePreview = (note: Note): string => {
  const cleanContent = note.content.replace(/<[^>]*>/g, '');
  return truncateText(cleanContent, 100);
};

/**
 * Check if note is empty
 */
export const isNoteEmpty = (note: Note): boolean => {
  return (!note.title || note.title.trim() === '') && 
         (!note.content || note.content.trim() === '');
};

/**
 * Sort notes by various criteria
 */
export const sortNotes = (
  notes: Note[],
  sortBy: 'date' | 'title' | 'color' = 'date',
  sortOrder: 'asc' | 'desc' = 'desc'
): Note[] => {
  const sorted = [...notes].sort((a, b) => {
    let compareValue = 0;

    switch (sortBy) {
      case 'title':
        compareValue = a.title.localeCompare(b.title);
        break;
      case 'color':
        compareValue = a.color.localeCompare(b.color);
        break;
      case 'date':
      default:
        compareValue = a.updatedAt - b.updatedAt;
    }

    return sortOrder === 'asc' ? compareValue : -compareValue;
  });

  return sorted;
};

/**
 * Filter notes by tags
 */
export const filterNotesByTags = (notes: Note[], tags: string[]): Note[] => {
  if (tags.length === 0) return notes;

  return notes.filter(note =>
    tags.some(tag => note.tags?.includes(tag))
  );
};

/**
 * Search notes by query
 */
export const searchNotes = (notes: Note[], query: string): Note[] => {
  const lowerQuery = query.toLowerCase();

  return notes.filter(note =>
    note.title.toLowerCase().includes(lowerQuery) ||
    note.content.toLowerCase().includes(lowerQuery) ||
    note.tags?.some(tag => tag.toLowerCase().includes(lowerQuery))
  );
};

/**
 * Get note statistics
 */
export const getNoteStats = (notes: Note[]) => {
  return {
    total: notes.length,
    active: notes.filter(n => n.status === 'active').length,
    archived: notes.filter(n => n.status === 'archived').length,
    trashed: notes.filter(n => n.status === 'trashed').length,
    pinned: notes.filter(n => n.isPinned).length,
    locked: notes.filter(n => n.isLocked).length,
  };
};

/**
 * Export note as text file
 */
export const exportNoteAsText = (note: Note): void => {
  const content = `${note.title}\n\n${note.content}`;
  const element = document.createElement('a');
  element.setAttribute('href', `data:text/plain;charset=utf-8,${encodeURIComponent(content)}`);
  element.setAttribute('download', `${note.title || 'note'}.txt`);
  element.style.display = 'none';
  document.body.appendChild(element);
  element.click();
  document.body.removeChild(element);
};

/**
 * Export note as JSON file
 */
export const exportNoteAsJSON = (note: Note): void => {
  const element = document.createElement('a');
  element.setAttribute('href', `data:application/json;charset=utf-8,${encodeURIComponent(JSON.stringify(note, null, 2))}`);
  element.setAttribute('download', `${note.title || 'note'}.json`);
  element.style.display = 'none';
  document.body.appendChild(element);
  element.click();
  document.body.removeChild(element);
};

/**
 * Get word count from note content
 */
export const getWordCount = (content: string): number => {
  const cleanContent = content.replace(/<[^>]*>/g, '').trim();
  if (!cleanContent) return 0;
  return cleanContent.split(/\s+/).length;
};

/**
 * Get character count from note content
 */
export const getCharacterCount = (content: string): number => {
  const cleanContent = content.replace(/<[^>]*>/g, '').trim();
  return cleanContent.length;
};

/**
 * Estimate reading time in minutes
 */
export const getReadingTime = (content: string): number => {
  const wordCount = getWordCount(content);
  const wordsPerMinute = 200; // Average reading speed
  return Math.max(1, Math.ceil(wordCount / wordsPerMinute));
};

