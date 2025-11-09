# LocalStorage Utility - Usage Guide

## 📦 Overview

Complete localStorage utility with type-safe operations and error handling.

**Location**: `src/utils/storage-available.ts`

---

## 🎯 Available Functions

### Core Functions

| Function | Purpose |
|----------|---------|
| `localStorageAvailable()` | Check if localStorage is available |
| `localStorageGetItem<T>()` | Get item (auto-parses JSON) |
| `localStorageSetItem<T>()` | Set item (auto-stringifies objects) |
| `localStorageRemoveItem()` | Remove single item |
| `localStorageClear()` | Clear all storage |
| `localStorageGetKeys()` | Get all storage keys |
| `localStorageHasKey()` | Check if key exists |
| `localStorageSize()` | Get storage size in bytes |

---

## 💻 Usage Examples

### 1. Check Storage Availability

```typescript
import { localStorageAvailable } from '@/utils/storage-available';

if (localStorageAvailable()) {
  console.log('localStorage is ready');
}
```

### 2. Set Item (Primitive Values)

```typescript
import { localStorageSetItem } from '@/utils/storage-available';

// String
localStorageSetItem('username', 'John Doe');

// Number (auto-stringified)
localStorageSetItem('count', 42);

// Boolean
localStorageSetItem('isLoggedIn', true);
```

### 3. Set Item (Objects)

```typescript
import { localStorageSetItem, STORAGE_KEYS } from '@/utils/storage-available';

// Object (auto-JSON-stringified)
const user = {
  id: '123',
  name: 'John',
  email: 'john@example.com'
};

localStorageSetItem(STORAGE_KEYS.USER, user);

// Array
const notes = ['Note 1', 'Note 2', 'Note 3'];
localStorageSetItem('notes', notes);
```

### 4. Get Item (with Type Safety)

```typescript
import { localStorageGetItem, STORAGE_KEYS } from '@/utils/storage-available';

// String with default
const theme = localStorageGetItem(STORAGE_KEYS.THEME, 'light');

// Object with type
interface User {
  id: string;
  name: string;
  email: string;
}

const user = localStorageGetItem<User>(STORAGE_KEYS.USER);

// With default object
const preferences = localStorageGetItem<Preferences>(
  STORAGE_KEYS.PREFERENCES,
  { theme: 'light', language: 'en' }
);
```

### 5. Remove Item

```typescript
import { localStorageRemoveItem, STORAGE_KEYS } from '@/utils/storage-available';

// Remove single item
const success = localStorageRemoveItem(STORAGE_KEYS.AUTH_TOKEN);

if (success) {
  console.log('Token removed');
}
```

### 6. Clear All Storage

```typescript
import { localStorageClear } from '@/utils/storage-available';

// Clear everything (use with caution!)
const success = localStorageClear();

if (success) {
  console.log('All storage cleared');
}
```

### 7. Check if Key Exists

```typescript
import { localStorageHasKey, STORAGE_KEYS } from '@/utils/storage-available';

if (localStorageHasKey(STORAGE_KEYS.AUTH_TOKEN)) {
  console.log('User is authenticated');
} else {
  console.log('No auth token found');
}
```

### 8. Get All Keys

```typescript
import { localStorageGetKeys } from '@/utils/storage-available';

const keys = localStorageGetKeys();
console.log('All storage keys:', keys);
// ['notes_user', 'notes_theme', 'notes_language', ...]
```

### 9. Get Storage Size

```typescript
import { localStorageSize } from '@/utils/storage-available';

const size = localStorageSize();

if (size !== null) {
  console.log(`Storage size: ${size} bytes`);
  console.log(`Storage size: ${(size / 1024).toFixed(2)} KB`);
}
```

---

## 🔑 Storage Keys Constants

Use predefined keys for consistency:

```typescript
import { STORAGE_KEYS } from '@/utils/storage-available';

// Available keys:
STORAGE_KEYS.USER              // 'notes_user'
STORAGE_KEYS.AUTH_TOKEN        // 'notes_auth_token'
STORAGE_KEYS.THEME             // 'notes_theme'
STORAGE_KEYS.LANGUAGE          // 'notes_language'
STORAGE_KEYS.FONT_SIZE         // 'notes_font_size'
STORAGE_KEYS.SIDEBAR_STATE     // 'notes_sidebar_state'
STORAGE_KEYS.LAST_FOLDER       // 'notes_last_folder'
STORAGE_KEYS.EDITOR_STATE      // 'notes_editor_state'
STORAGE_KEYS.PREFERENCES       // 'notes_preferences'
```

---

## 🎓 Real-World Examples

### Save User Preferences

```typescript
import { localStorageSetItem, STORAGE_KEYS } from '@/utils/storage-available';

interface Preferences {
  theme: 'light' | 'dark';
  language: 'en' | 'vi';
  fontSize: 'small' | 'normal' | 'large';
}

const savePreferences = (prefs: Preferences) => {
  const success = localStorageSetItem(STORAGE_KEYS.PREFERENCES, prefs);
  return success;
};

// Usage
savePreferences({
  theme: 'dark',
  language: 'en',
  fontSize: 'normal'
});
```

### Load User Preferences

```typescript
import { localStorageGetItem, STORAGE_KEYS } from '@/utils/storage-available';

const loadPreferences = (): Preferences => {
  const defaultPrefs: Preferences = {
    theme: 'light',
    language: 'en',
    fontSize: 'normal'
  };

  return localStorageGetItem<Preferences>(
    STORAGE_KEYS.PREFERENCES,
    defaultPrefs
  ) || defaultPrefs;
};

// Usage
const prefs = loadPreferences();
console.log('Theme:', prefs.theme);
```

### Persist Editor State

```typescript
import { localStorageSetItem, localStorageGetItem, STORAGE_KEYS } from '@/utils/storage-available';

interface EditorState {
  content: string;
  cursorPosition: number;
  scrollPosition: number;
}

// Save
const saveEditorState = (state: EditorState) => {
  localStorageSetItem(STORAGE_KEYS.EDITOR_STATE, state);
};

// Load
const loadEditorState = (): EditorState | null => {
  return localStorageGetItem<EditorState>(STORAGE_KEYS.EDITOR_STATE);
};

// Usage
saveEditorState({
  content: 'My note content',
  cursorPosition: 42,
  scrollPosition: 100
});

const state = loadEditorState();
if (state) {
  console.log('Restored editor state');
}
```

### Authentication Token Management

```typescript
import { 
  localStorageSetItem, 
  localStorageGetItem, 
  localStorageRemoveItem,
  localStorageHasKey,
  STORAGE_KEYS 
} from '@/utils/storage-available';

// Save token
export const saveAuthToken = (token: string): boolean => {
  return localStorageSetItem(STORAGE_KEYS.AUTH_TOKEN, token);
};

// Get token
export const getAuthToken = (): string | null => {
  return localStorageGetItem<string>(STORAGE_KEYS.AUTH_TOKEN);
};

// Check if authenticated
export const isAuthenticated = (): boolean => {
  return localStorageHasKey(STORAGE_KEYS.AUTH_TOKEN);
};

// Logout
export const logout = (): boolean => {
  return localStorageRemoveItem(STORAGE_KEYS.AUTH_TOKEN);
};

// Usage
if (saveAuthToken('abc123xyz')) {
  console.log('Login successful');
}

if (isAuthenticated()) {
  const token = getAuthToken();
  // Use token for API calls
}

logout();
```

### Theme Switcher

```typescript
import { localStorageSetItem, localStorageGetItem, STORAGE_KEYS } from '@/utils/storage-available';

type Theme = 'light' | 'dark' | 'system';

export const saveTheme = (theme: Theme): void => {
  localStorageSetItem(STORAGE_KEYS.THEME, theme);
  document.documentElement.setAttribute('data-theme', theme);
};

export const loadTheme = (): Theme => {
  const theme = localStorageGetItem<Theme>(STORAGE_KEYS.THEME, 'system');
  document.documentElement.setAttribute('data-theme', theme);
  return theme;
};

// Usage
saveTheme('dark');
const currentTheme = loadTheme();
```

### Sidebar State Persistence

```typescript
import { localStorageSetItem, localStorageGetItem, STORAGE_KEYS } from '@/utils/storage-available';

export const saveSidebarState = (isOpen: boolean): void => {
  localStorageSetItem(STORAGE_KEYS.SIDEBAR_STATE, isOpen);
};

export const loadSidebarState = (): boolean => {
  return localStorageGetItem<boolean>(STORAGE_KEYS.SIDEBAR_STATE, true) ?? true;
};

// Usage in component
const [sidebarOpen, setSidebarOpen] = useState(loadSidebarState());

const toggleSidebar = () => {
  const newState = !sidebarOpen;
  setSidebarOpen(newState);
  saveSidebarState(newState);
};
```

---

## ✨ Features

✅ **Type-Safe** - Generic types for get/set operations  
✅ **Auto-Parse** - Automatically parses JSON objects  
✅ **Auto-Stringify** - Automatically stringifies objects  
✅ **Error Handling** - Try-catch with fallbacks  
✅ **Availability Check** - Verifies localStorage is accessible  
✅ **Return Status** - Boolean success/failure indicators  
✅ **Console Warnings** - Helpful error messages  
✅ **Constants** - Predefined storage keys  

---

## 🔒 Error Handling

All functions handle errors gracefully:

```typescript
// If localStorage is not available
if (!localStorageAvailable()) {
  // Functions return default values
  // No errors thrown
}

// Try-catch wrapping all operations
try {
  localStorageSetItem('key', value);
} catch (error) {
  // Automatically logged to console
  // Returns false
}
```

---

## 📊 Type Safety Examples

```typescript
// Primitive types
const name = localStorageGetItem<string>('name', 'Anonymous');
const count = localStorageGetItem<number>('count', 0);
const enabled = localStorageGetItem<boolean>('enabled', false);

// Complex types
interface User {
  id: string;
  name: string;
  roles: string[];
}

const user = localStorageGetItem<User>(STORAGE_KEYS.USER);

if (user) {
  console.log(user.name); // Type-safe access
  console.log(user.roles); // Array access
}
```

---

## 🚀 Best Practices

1. **Use Constants**
   ```typescript
   // Good
   localStorageGetItem(STORAGE_KEYS.USER);
   
   // Avoid
   localStorageGetItem('user');
   ```

2. **Provide Defaults**
   ```typescript
   const theme = localStorageGetItem(STORAGE_KEYS.THEME, 'light');
   ```

3. **Check Availability First** (for critical operations)
   ```typescript
   if (localStorageAvailable()) {
     // Save important data
   }
   ```

4. **Type Your Data**
   ```typescript
   const data = localStorageGetItem<MyType>(key, defaultValue);
   ```

5. **Handle Nulls**
   ```typescript
   const user = localStorageGetItem<User>(STORAGE_KEYS.USER);
   if (user) {
     // Use user safely
   }
   ```

---

**Status**: ✅ Ready to Use  
**Location**: `src/utils/storage-available.ts`

