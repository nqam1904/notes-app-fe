'use client';

import { useAppInitialization } from '@/hooks/useAppInitialization';
import { ROOT } from '@/routes/path';
import { RootState } from '@/store';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';

export default function HomePage() {
  const router = useRouter();
  const { isAuthenticated, user } = useSelector((state: RootState) => state.user);
  console.log("INIT APP")
  // Step 1: Initialize app - Always set up anonymous user first
  // This ensures users can start using the app immediately
  useAppInitialization();

  // Step 2: Route users based on authentication status
  useEffect(() => {
    if (isAuthenticated && user) {
      // User is logged in - redirect to authenticated dashboard
      console.log('[HomePage] User authenticated, redirecting to dashboard:', user.id);
      router.replace(ROOT.NOTES);
    } else {
      // Anonymous user - redirect to notes page with anonymous mode
      console.log('[HomePage] Anonymous user, redirecting to notes page');
      router.replace(ROOT.NOTES);
    }
  }, [isAuthenticated, user, router]);

  // Next.js loading.tsx will handle the loading UI
  return null;
}

