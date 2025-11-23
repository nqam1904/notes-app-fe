# FlickNote - Online Note-Taking App

A modern, feature-rich note-taking application built with Next.js and Firebase Firestore.

## Features

- 📝 **Rich Text Editing**: Create and edit notes with a powerful editor
- 📁 **Folder Organization**: Organize your notes into customizable folders
- 🔒 **User Authentication**: Secure user authentication with Firebase Auth
- ☁️ **Cloud Sync**: Real-time synchronization across devices with Firestore
- 🌓 **Dark Mode**: Toggle between light and dark themes
- 🌍 **Internationalization**: Multi-language support (English, Vietnamese)
- 📱 **Responsive Design**: Works seamlessly on desktop, tablet, and mobile
- 🔍 **Search**: Quickly find notes and folders
- 📌 **Pin Notes**: Keep important notes at the top
- 🗑️ **Trash**: Soft delete notes with recovery option
- 📤 **Share Notes**: Share notes with other users (coming soon)

## Tech Stack

- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: TailwindCSS, Ant Design
- **State Management**: Redux Toolkit
- **Database**: Firebase Firestore
- **Authentication**: Firebase Auth
- **Storage**: Firebase Storage
- **Internationalization**: i18next
- **Build Tool**: Next.js

## Getting Started

### Prerequisites

- Node.js 18+ and npm/yarn
- Firebase account and project

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd note-fe
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set up Firebase**

   Follow the [Firebase Setup Guide](FIREBASE_SETUP_GUIDE.md) to:
   - Create a Firebase project
   - Enable Authentication, Firestore, and Storage
   - Get your Firebase configuration

4. **Configure environment variables**

   The `.env.local` file has already been created with your Firebase configuration. Make sure it contains:

   ```env
   NEXT_PUBLIC_FIREBASE_API_KEY=your-api-key
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-auth-domain
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-storage-bucket
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
   NEXT_PUBLIC_FIREBASE_APP_ID=your-app-id
   NEXT_PUBLIC_FIREBASE_DATABASE_URL=your-database-url
   ```

5. **Set up Firestore**

   Follow the [Firestore Migration Guide](FIRESTORE_MIGRATION_GUIDE.md) to:
   - Enable Firestore in Firebase Console
   - Configure security rules
   - (Optional) Migrate data from Realtime Database

6. **Run the development server**

   ```bash
   npm run dev
   # or
   yarn dev
   ```

   Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
note-fe/
├── src/
│   ├── actions/           # Server actions
│   │   ├── folderActions.ts
│   │   └── noteActions.ts
│   ├── app/              # Next.js app directory
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   └── notes/
│   ├── components/       # React components
│   │   ├── notes/
│   │   ├── UI/
│   │   └── providers/
│   ├── config/          # Configuration files
│   │   └── firebase.ts
│   ├── hooks/           # Custom React hooks
│   ├── locales/         # Internationalization
│   ├── services/        # API services
│   │   ├── folderService.ts
│   │   ├── noteService.ts
│   │   └── localStorageService.ts
│   ├── store/           # Redux store
│   │   └── slices/
│   ├── types/           # TypeScript types
│   └── utils/           # Utility functions
├── public/              # Static assets
├── scripts/             # Utility scripts
│   ├── migrate-to-firestore.js
│   └── README.md
├── firestore.rules      # Firestore security rules
├── .env.local           # Environment variables (not in git)
└── package.json
```

## Database Architecture

### Firestore Collections

#### **folders**
```typescript
{
  id: string;              // Auto-generated document ID
  name: string;            // Folder name
  userId: string;          // Owner's user ID
  createdAt: Timestamp;    // Creation timestamp
  updatedAt: Timestamp;    // Last update timestamp
  icon?: string;           // Optional folder icon
  color?: string;          // Optional folder color
  noteCount?: number;      // Number of notes in folder
}
```

#### **notes**
```typescript
{
  id: string;              // Auto-generated document ID
  title: string;           // Note title
  content: string;         // Note content (rich text)
  folderId?: string;       // Parent folder ID
  status: 'active' | 'archived' | 'trashed';
  isPinned: boolean;       // Pinned status
  isLocked: boolean;       // Locked status
  createdAt: Timestamp;    // Creation timestamp
  updatedAt: Timestamp;    // Last update timestamp
  userId: string;          // Owner's user ID
  tags?: string[];         // Optional tags
  reminder?: number;       // Optional reminder timestamp
  isShared?: boolean;      // Shared status
  sharedWith?: string[];   // Array of user IDs
}
```

### Security Rules

Firestore security rules ensure that:
- Users can only access their own data
- Shared notes can be read by specified users
- Data validation is enforced on create/update operations

See [firestore.rules](firestore.rules) for the complete security rules.

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run clean` - Clean build artifacts and dependencies

## Migration from Realtime Database

If you have existing data in Firebase Realtime Database, follow these steps:

1. Read the [Firestore Migration Guide](FIRESTORE_MIGRATION_GUIDE.md)
2. Run the migration script:
   ```bash
   npm install firebase-admin
   node scripts/migrate-to-firestore.js
   ```

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import project in Vercel
3. Add environment variables
4. Deploy

### Docker

```bash
docker build -t note-fe .
docker run -p 3000:3000 note-fe
```

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `NEXT_PUBLIC_FIREBASE_API_KEY` | Firebase API key | Yes |
| `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN` | Firebase auth domain | Yes |
| `NEXT_PUBLIC_FIREBASE_PROJECT_ID` | Firebase project ID | Yes |
| `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET` | Firebase storage bucket | Yes |
| `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID` | Firebase sender ID | Yes |
| `NEXT_PUBLIC_FIREBASE_APP_ID` | Firebase app ID | Yes |
| `NEXT_PUBLIC_FIREBASE_DATABASE_URL` | Firebase database URL | Yes |
| `NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID` | Firebase analytics ID | No |
| `NEXT_PUBLIC_STATIC_EXPORT` | Enable static export | No |

## Features Roadmap

- [x] Basic note CRUD operations
- [x] Folder organization
- [x] Real-time synchronization
- [x] User authentication
- [x] Firestore integration
- [ ] Note sharing
- [ ] Rich text formatting toolbar
- [ ] File attachments
- [ ] Tags and filters
- [ ] Search functionality
- [ ] Reminders and notifications
- [ ] Export notes (PDF, Markdown)
- [ ] Collaboration features

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is private and proprietary.

## Support

For issues and questions:
- Check the [Firebase Setup Guide](FIREBASE_SETUP_GUIDE.md)
- Check the [Firestore Migration Guide](FIRESTORE_MIGRATION_GUIDE.md)
- Review [Firestore Documentation](https://firebase.google.com/docs/firestore)

## Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- Powered by [Firebase](https://firebase.google.com/)
- UI components from [Ant Design](https://ant.design/)
- Styled with [TailwindCSS](https://tailwindcss.com/)
