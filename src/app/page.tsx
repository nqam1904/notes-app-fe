'use client';

import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import ROUTES from '@/routes/path';
import { RootState } from '@/store';
import AnonymousNotesLayout from '@/components/notes/notes-container/AnonymousNotesLayout';

export default function HomePage() {
  const router = useRouter();
  const { isAuthenticated } = useSelector((state: RootState) => state.user);

  // If the user is authenticated, send them straight into the full notes UI
  useEffect(() => {
    if (isAuthenticated) {
      router.replace(ROUTES.NOTES);
    }
  }, [isAuthenticated, router]);

  // Anonymous (or not yet authenticated) users see the simple notepad UI
  if (!isAuthenticated) {
    return <AnonymousNotesLayout />;
  }

  // While redirecting for authenticated users, render nothing
  return null;
}

