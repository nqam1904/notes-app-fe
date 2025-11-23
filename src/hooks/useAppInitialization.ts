import { localStorageService } from "@/services/local-service";
import { RootState } from "@/store";
import { setNotes } from "@/store/slices/notesSlice";
import { setAnonymousUser } from "@/store/slices/userSlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

/**
 * Hook to initialize the app for anonymous or authenticated users
 */
export const useAppInitialization = () => {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state: RootState) => state.user);
  const initializeApp = () => {
    if (!isAuthenticated) {
      // Initialize anonymous user
      dispatch(setAnonymousUser());
      // Load notes from local storage
      const localNotes = localStorageService.getNote();
      console.log(localNotes, 'localNotes')
      dispatch(setNotes(localNotes ? [localNotes] : []));
    }
  };

  useEffect(() => {
    initializeApp();
  }, [dispatch, isAuthenticated]);
};
