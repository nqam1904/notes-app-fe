'use client';

import { ReactNode, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store';
import { setUser } from '@/store/slices/userSlice';
import NotesHeader from './NotesHeader';
import NotesSidebar from './NotesSidebar';
import styles from './NotesContainer.module.scss';

interface NotesContainerProps {
  children: ReactNode;
}

export default function NotesContainer({ children }: NotesContainerProps) {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state: RootState) => state.user);

  useEffect(() => {
    // Initialize user from localStorage or Firebase Auth
    // This is a placeholder - implement actual auth logic
    const mockUser = {
      id: '123',
      email: 'user@example.com',
      displayName: 'User',
      createdAt: Date.now(),
      updatedAt: Date.now(),
      preferences: {
        theme: 'light',
        language: 'en',
        fontSize: 'normal',
        sortBy: 'date',
        sortOrder: 'desc',
      },
    };
    dispatch(setUser(mockUser));
  }, [dispatch]);

  if (!isAuthenticated) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.container}>
      <NotesHeader />
      <div className={styles.mainContent}>
        <NotesSidebar />
        <div className={styles.content}>{children}</div>
      </div>
    </div>
  );
}

