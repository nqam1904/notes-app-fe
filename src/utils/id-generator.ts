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
 * Generate a short random ID with mixed case
 * Format: 9 characters starting with uppercase letter
 * Example: Tkf4N3Q71
 */
const generateShortMixedId = (): string => {
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";

  // First character must be uppercase letter
  const upperChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  result += upperChars.charAt(Math.floor(Math.random() * upperChars.length));

  // Generate remaining 8 characters
  for (let i = 0; i < 8; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }

  return result;
};

/**
 * Generate a unique note ID
 * Format: Short mixed case ID or anon_ prefix for anonymous users
 * Examples:
 * - Authenticated: "user_Tkf4N3Q71"
 * - Anonymous: "Tkf4N3Q71"
 */
export const generateNoteId = (isAnonymous: boolean = false): string => {
  const shortId = generateShortMixedId();
  return isAnonymous ? shortId : `user_${shortId}`;
};

/**
 * Generate a unique user ID for anonymous users
 * Format: anon_random
 * Example: anon_a4b9c2d7
 */
export const generateUserId = (): string => {
  return generateId();
};

/**
 * Generate a unique folder ID
 * Format: folder_random
 * Example: folder_a4b9c2d7
 */
export const generateFolderId = (): string => {
  return `folder_${generateId()}`;
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
 * Supports both formats:
 * - Short format: "Tkf4N3Q71" (9 chars, starts with uppercase)
 * - User format: "user_Tkf4N3Q71"
 * - Legacy format: "1699123456789_a4b9c2d7" (for backward compatibility)
 */
export const isValidNoteId = (id: string): boolean => {
  // New short format: uppercase letter + 8 alphanumeric chars
  const shortFormat = /^[A-Z][A-Za-z0-9]{8}$/;
  // User format: user_ + short format
  const userFormat = /^user_[A-Z][A-Za-z0-9]{8}$/;
  // Legacy format: timestamp_random
  const legacyFormat = /^[0-9]+_[a-z0-9]+$/;

  return shortFormat.test(id) || userFormat.test(id) || legacyFormat.test(id);
};

/**
 * Check if a note ID is from an anonymous user (does not have user_ prefix)
 * Anonymous notes have format: "Tkf4N3Q71" or "ano_customid"
 */
export const isAnonymousNote = (noteId: string): boolean => {
  if (!noteId) return false;

  return !noteId.startsWith("user_");
};
