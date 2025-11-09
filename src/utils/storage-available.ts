// ----------------------------------------------------------------------

/**
 * Check if localStorage is available
 */
export function localStorageAvailable(): boolean {
  try {
    const key = "__storage_test__";
    window.localStorage.setItem(key, key);
    window.localStorage.removeItem(key);
    return true;
  } catch (error) {
    return false;
  }
}

/**
 * Get item from localStorage
 * @param key - Storage key
 * @param defaultValue - Default value if key doesn't exist
 * @returns Stored value or default value
 */
export function localStorageGetItem<T = string>(
  key: string,
  defaultValue?: T
): T | string | null {
  if (!localStorageAvailable()) {
    return defaultValue ?? null;
  }

  try {
    const item = window.localStorage.getItem(key);

    if (item === null) {
      return defaultValue ?? null;
    }

    // Try to parse as JSON if it's a valid JSON string
    try {
      return JSON.parse(item) as T;
    } catch {
      // Return as string if not valid JSON
      return item as T;
    }
  } catch (error) {
    console.error(`Error getting item from localStorage: ${key}`, error);
    return defaultValue ?? null;
  }
}

/**
 * Set item in localStorage
 * @param key - Storage key
 * @param value - Value to store (will be JSON stringified if object)
 * @returns Success status
 */
export function localStorageSetItem<T = any>(key: string, value: T): boolean {
  if (!localStorageAvailable()) {
    console.warn("localStorage is not available");
    return false;
  }

  try {
    const serializedValue =
      typeof value === "string" ? value : JSON.stringify(value);

    window.localStorage.setItem(key, serializedValue);
    return true;
  } catch (error) {
    console.error(`Error setting item in localStorage: ${key}`, error);
    return false;
  }
}

/**
 * Remove item from localStorage
 * @param key - Storage key to remove
 * @returns Success status
 */
export function localStorageRemoveItem(key: string): boolean {
  if (!localStorageAvailable()) {
    console.warn("localStorage is not available");
    return false;
  }

  try {
    window.localStorage.removeItem(key);
    return true;
  } catch (error) {
    console.error(`Error removing item from localStorage: ${key}`, error);
    return false;
  }
}

/**
 * Clear all items from localStorage
 * @returns Success status
 */
export function localStorageClear(): boolean {
  if (!localStorageAvailable()) {
    console.warn("localStorage is not available");
    return false;
  }

  try {
    window.localStorage.clear();
    return true;
  } catch (error) {
    console.error("Error clearing localStorage", error);
    return false;
  }
}

/**
 * Get all keys from localStorage
 * @returns Array of storage keys
 */
export function localStorageGetKeys(): string[] {
  if (!localStorageAvailable()) {
    return [];
  }

  try {
    return Object.keys(window.localStorage);
  } catch (error) {
    console.error("Error getting localStorage keys", error);
    return [];
  }
}

/**
 * Check if key exists in localStorage
 * @param key - Storage key to check
 * @returns True if key exists
 */
export function localStorageHasKey(key: string): boolean {
  if (!localStorageAvailable()) {
    return false;
  }

  try {
    return window.localStorage.getItem(key) !== null;
  } catch (error) {
    return false;
  }
}

/**
 * Get storage size in bytes (approximate)
 * @returns Size in bytes or null if unavailable
 */
export function localStorageSize(): number | null {
  if (!localStorageAvailable()) {
    return null;
  }

  try {
    let size = 0;
    for (const key in window.localStorage) {
      if (window.localStorage.hasOwnProperty(key)) {
        size += window.localStorage[key].length + key.length;
      }
    }
    return size;
  } catch (error) {
    console.error("Error calculating localStorage size", error);
    return null;
  }
}

// ----------------------------------------------------------------------
// Storage Keys Constants
// ----------------------------------------------------------------------

export const STORAGE_KEYS = {
  USER: "notes_user",
  AUTH_TOKEN: "notes_auth_token",
  THEME: "notes_theme",
  LANGUAGE: "notes_language",
  FONT_SIZE: "notes_font_size",
  SIDEBAR_STATE: "notes_sidebar_state",
  LAST_FOLDER: "notes_last_folder",
  EDITOR_STATE: "notes_editor_state",
  PREFERENCES: "notes_preferences",
} as const;
