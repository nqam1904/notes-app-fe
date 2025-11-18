# Debug Tools

Debug utilities for development and testing.

## 🔧 Available Tools

### 1. Splash Screen Viewer
**URL:** `/debug/splash`

View the loading splash screen with all animations.

### 2. Main Debug Dashboard
**URL:** `/debug`

Central hub with multiple debug options:

#### Features:
- 🎨 **View Splash Screen** - See loading animation
- 🗑️ **Clear LocalStorage** - Reset all data
- 👁️ **View LocalStorage** - Inspect stored data
- ⏱️ **Enable Splash Delay** - Add delay to see splash screen
- ❌ **Disable Splash Delay** - Remove delay
- ⬅️ **Back to App** - Return to main app

## 📝 Manual Debug Methods

### Method 1: Add Splash Screen Delay

```javascript
// In browser console:
localStorage.setItem('DEBUG_SPLASH_DELAY', '3000'); // 3 seconds
window.location.reload();
```

### Method 2: View LocalStorage Data

```javascript
// In browser console:
console.log({
  notes: localStorage.getItem('anonymous_notes'),
  userId: localStorage.getItem('anonymous_user_id'),
  folders: localStorage.getItem('anonymous_folders')
});
```

### Method 3: Clear All Data

```javascript
// In browser console:
localStorage.clear();
window.location.reload();
```

## 🎯 Common Use Cases

### Testing Splash Screen
1. Go to `/debug`
2. Click "Enable Splash Delay"
3. Enter delay (e.g., 3000ms)
4. Reload page to see splash screen

### Debugging Note Storage
1. Go to `/debug`
2. Click "View LocalStorage"
3. Check browser console for data

### Reset App State
1. Go to `/debug`
2. Click "Clear LocalStorage"
3. Confirm action

## 🚀 Quick Access

Add to browser bookmarks:
- Main Debug: `http://localhost:3000/debug`
- Splash Screen: `http://localhost:3000/debug/splash`

## ⚠️ Important Notes

- Debug tools are for development only
- Don't use in production
- Data cleared is permanent
- Refresh page to see changes after localStorage modifications

