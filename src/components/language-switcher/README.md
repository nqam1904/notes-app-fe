# Language Switcher Component

A beautiful language switcher component using Ant Design Dropdown with flat flag icons.

## Features

- 🎨 Flat design flag icons (Vietnam & UK)
- 🔄 Smooth language switching with toast notifications
- 📱 Responsive design
- ⚡ Built with Ant Design
- 🌐 Integrated with i18next

## Usage

The component is already integrated into:
1. **AnonymousNotesLayout** - For anonymous users
2. **NotesHeader** - For authenticated users

### Manual Integration

```tsx
import LanguageSwitcher from '@/components/language-switcher';

export default function MyComponent() {
  return (
    <div>
      <LanguageSwitcher />
    </div>
  );
}
```

## Design

- **Button**: Shows current language flag + label (on desktop) + globe icon
- **Dropdown**: Shows all available languages with their flags
- **Hover**: Smooth hover effects
- **Active**: Highlights currently selected language

## Customization

To add more languages:

1. Update `/src/locales/all-langs.ts` with new language config
2. Add the flag SVG component in `LanguageSwitcher.tsx`
3. Add language files in `/src/locales/langs/{lang}/all.json`

## Technical Details

- Uses `useTranslate` hook from `/src/locales/use-locales.ts`
- Language change triggers toast notification
- Automatically refreshes the router after language change
- Supports keyboard navigation (Ant Design Dropdown)

