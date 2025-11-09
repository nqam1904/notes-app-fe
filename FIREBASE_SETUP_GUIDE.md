# Firebase Setup Guide

This guide will walk you through creating a Firebase project and configuring it for this application.

## Step 1: Create a Firebase Project

1. **Go to Firebase Console**
   - Visit: https://console.firebase.google.com/
   - Sign in with your Google account

2. **Create a New Project**
   - Click "Add project" or "Create a project"
   - Enter a project name (e.g., "note-fe" or "my-notes-app")
   - Click "Continue"

3. **Google Analytics (Optional)**
   - Choose whether to enable Google Analytics (you can disable it for simpler setup)
   - Click "Create project"
   - Wait for the project to be created (usually takes 30-60 seconds)

## Step 2: Register Your Web App

1. **Add a Web App**
   - In your Firebase project dashboard, click on the **Web icon** (`</>`) to add a web app
   - Give your app a nickname (e.g., "Note App Web")
   - **Optional**: Check "Also set up Firebase Hosting" if you want to use Firebase Hosting
   - Click "Register app"

2. **Get Your Firebase Configuration**
   - After registration, you'll see a configuration object that looks like this:

   ```javascript
   const firebaseConfig = {
     apiKey: "AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
     authDomain: "your-project-id.firebaseapp.com",
     projectId: "your-project-id",
     storageBucket: "your-project-id.appspot.com",
     messagingSenderId: "123456789012",
     appId: "1:123456789012:web:abcdef1234567890",
     databaseURL: "https://your-project-id-default-rtdb.firebaseio.com"
   };
   ```

   - **Copy these values** - you'll need them in the next step
   - Click "Continue to console"

## Step 3: Enable Firebase Services

Your app uses the following Firebase services. You need to enable them:

### 3.1 Enable Firebase Authentication

1. In the Firebase Console, click **"Authentication"** in the left sidebar
2. Click **"Get started"**
3. Go to the **"Sign-in method"** tab
4. Enable the authentication methods you want to use:
   - **Email/Password**: Click on it, toggle "Enable", and Save
   - **Google**: (Optional) Click on it, toggle "Enable", and Save
   - Add any other providers you need

### 3.2 Enable Firebase Realtime Database

1. In the Firebase Console, click **"Realtime Database"** in the left sidebar
2. Click **"Create Database"**
3. Choose a location (select the one closest to your users)
4. Start in **"Test mode"** for development (you can update security rules later)
5. Click **"Enable"**
6. **Copy the database URL** from the top of the page (e.g., `https://your-project-id-default-rtdb.firebaseio.com`)

### 3.3 Enable Firebase Storage

1. In the Firebase Console, click **"Storage"** in the left sidebar
2. Click **"Get started"**
3. Review the security rules (start in test mode for development)
4. Click **"Next"**
5. Choose a location (same as your database location)
6. Click **"Done"**

## Step 4: Configure Your Local Project

1. **Create a `.env.local` file** in the root of your project:

   ```bash
   # In your terminal, run:
   cp .env.local.example .env.local
   ```

2. **Edit `.env.local`** and replace the placeholder values with your Firebase configuration:

   ```env
   NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project-id.firebaseapp.com
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project-id.appspot.com
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789012
   NEXT_PUBLIC_FIREBASE_APP_ID=1:123456789012:web:abcdef1234567890
   NEXT_PUBLIC_FIREBASE_DATABASE_URL=https://your-project-id-default-rtdb.firebaseio.com
   ```

3. **Restart your development server** for the changes to take effect:

   ```bash
   npm run dev
   # or
   yarn dev
   ```

## Step 5: Update Security Rules (Production)

Before deploying to production, update your security rules:

### Realtime Database Rules

1. Go to **Realtime Database > Rules**
2. Replace the rules with secure ones (example):

   ```json
   {
     "rules": {
       "users": {
         "$uid": {
           ".read": "$uid === auth.uid",
           ".write": "$uid === auth.uid"
         }
       },
       "notes": {
         "$uid": {
           ".read": "$uid === auth.uid",
           ".write": "$uid === auth.uid"
         }
       },
       "folders": {
         "$uid": {
           ".read": "$uid === auth.uid",
           ".write": "$uid === auth.uid"
         }
       }
     }
   }
   ```

3. Click **"Publish"**

### Storage Rules

1. Go to **Storage > Rules**
2. Replace the rules with secure ones (example):

   ```
   rules_version = '2';
   service firebase.storage {
     match /b/{bucket}/o {
       match /users/{userId}/{allPaths=**} {
         allow read, write: if request.auth != null && request.auth.uid == userId;
       }
     }
   }
   ```

3. Click **"Publish"**

## Step 6: Verify Your Setup

1. **Run your application**:
   ```bash
   npm run dev
   ```

2. **Test the connection**:
   - Open your browser's console (F12)
   - Look for any Firebase errors
   - Try creating a note or folder to test the database connection

## Troubleshooting

### Common Issues

1. **"Firebase: Error (auth/unauthorized-domain)"**
   - Solution: Go to Authentication > Settings > Authorized domains
   - Add your domain (e.g., `localhost`, your production domain)

2. **"Permission denied" errors**
   - Solution: Check your security rules in Realtime Database and Storage
   - Ensure you're authenticated before making requests

3. **Environment variables not loading**
   - Solution: Restart your development server
   - Ensure `.env.local` is in the project root
   - Variable names must start with `NEXT_PUBLIC_` to be accessible in the browser

## Additional Resources

- [Firebase Documentation](https://firebase.google.com/docs)
- [Firebase Authentication Docs](https://firebase.google.com/docs/auth)
- [Firebase Realtime Database Docs](https://firebase.google.com/docs/database)
- [Firebase Storage Docs](https://firebase.google.com/docs/storage)
- [Next.js Environment Variables](https://nextjs.org/docs/basic-features/environment-variables)

## Security Best Practices

1. **Never commit `.env.local`** to version control (it's already in `.gitignore`)
2. **Use environment variables** for all sensitive data
3. **Update security rules** before going to production
4. **Enable App Check** for additional security (optional but recommended)
5. **Monitor usage** in Firebase Console to detect unusual activity

---

If you encounter any issues, check the Firebase Console logs or the browser console for detailed error messages.

