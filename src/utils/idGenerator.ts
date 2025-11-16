// ----------------------------------------------------------------------
// ID Generation Utilities
// ----------------------------------------------------------------------

/**
 * Generate a unique random ID
 * Format: 8 characters of alphanumeric characters
 * Example: a4b9c2d7
 */
export const generateId = (): string => {
  return Math.random().toString(36).substring(2, 10);
};

/**
 * Generate a unique note ID
 * Format: note_timestamp_random
 * Example: note_1699123456789_a4b9c2d7
 */
export const generateNoteId = (): string => {
  return `note_${generateId()}`;
};

/**
 * Generate a unique user ID for anonymous users
 * Format: anon_timestamp_random
 * Example: anon_1699123456789_a4b9c2d7
 */
export const generateAnonymousUserId = (): string => {
  return `anon_${generateId()}`;
};

/**
 * Generate a unique folder ID
 * Format: folder_timestamp_random
 * Example: folder_1699123456789_a4b9c2d7
 */
export const generateFolderId = (): string => {
  return `folder_${Date.now()}_${generateId()}`;
};

/**
 * Generate a short random ID (4 characters)
 * Example: a4b9
 */
export const generateShortId = (): string => {
  return Math.random().toString(36).substring(2, 6);
};

/**
 * Generate a UUID v4-like ID
 * Example: 550e8400-e29b-41d4-a716-446655440000
 */
export const generateUUID = (): string => {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};

/**
 * Check if an ID is a valid note ID format
 */
export const isValidNoteId = (id: string): boolean => {
  return /^note_\d+_[a-z0-9]+$/.test(id);
};

/**
 * Check if a user ID is anonymous
 */
export const isAnonymousUser = (userId: string): boolean => {
  return userId.startsWith("anon_");
};
