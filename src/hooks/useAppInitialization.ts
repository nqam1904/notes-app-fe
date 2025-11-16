import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store';
import { setAnonymousUser, setLoading } from '@/store/slices/userSlice';
import { setNotes } from '@/store/slices/notesSlice';
import { localStorageService } from '@/services/localStorageService';

/**
 * Hook to initialize the app for anonymous or authenticated users
 */
export const useAppInitialization = () => {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state: RootState) => state.user);

  useEffect(() => {
    if (!isAuthenticated) {
      dispatch(setLoading(true));

      try {
        // Initialize anonymous user
        dispatch(setAnonymousUser());

        // Load notes from local storage
        const localNotes = localStorageService.getNotes();
        dispatch(setNotes(localNotes));
      } finally {
        dispatch(setLoading(false));
      }
    }
  }, [dispatch, isAuthenticated]);
};

