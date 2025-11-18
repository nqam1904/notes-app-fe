# AnonymousButton Component

Reusable button component for Anonymous Notes Layout with automatic styling based on disabled state.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `icon` | `ReactNode` | - | Icon element to display |
| `text` | `string` | - | Full text for desktop view |
| `shortText` | `string` | - | Short text for mobile view |
| `disabled` | `boolean` | `false` | Whether button is disabled |
| `onClick` | `() => void` | - | Click handler (optional) |

## Styling

### Active State (disabled = false)
- Background: `#fcd34d` (amber-300)
- Text: `#000` (black)
- Cursor: `pointer`
- Hover: `bg-amber-400`

### Disabled State (disabled = true)
- Background: `#d1d5db` (gray-300)
- Text: `#6b7280` (gray-500)
- Cursor: `not-allowed`
- No hover effect

## Usage

```tsx
import AnonymousButton from './AnonymousButton';
import { FileAddOutlined } from '@ant-design/icons';

// Active button
<AnonymousButton
  icon={<FileAddOutlined style={{ fontSize: '16px', fontWeight: 'bold' }} />}
  text="New Note"
  shortText="New"
  onClick={handleClick}
/>

// Disabled button
<AnonymousButton
  icon={<ShareAltOutlined style={{ fontSize: '16px', fontWeight: 'bold' }} />}
  text="Share URL"
  shortText="Share"
  disabled
/>
```

## Features

- ✅ Responsive text (full text on desktop, short on mobile)
- ✅ Automatic color switching based on disabled prop
- ✅ Ant Design Button base
- ✅ Consistent styling across all anonymous buttons
- ✅ TypeScript support

