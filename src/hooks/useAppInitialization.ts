import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { setAnonymousUser } from "@/store/slices/userSlice";
import { setNotes } from "@/store/slices/notesSlice";
import { localStorageService } from "@/services/localStorageService";

/**
 * Hook to initialize the app for anonymous or authenticated users
 *
 * DEBUG MODE:
 * - Set DEBUG_SPLASH_DELAY in localStorage to add delay (in ms)
 * - Example: localStorage.setItem('DEBUG_SPLASH_DELAY', '3000')
 * - This will show splash screen for 3 seconds
 */
export const useAppInitialization = () => {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state: RootState) => state.user);

  useEffect(() => {
    const initializeApp = async () => {
      if (!isAuthenticated) {
        // DEBUG: Check for splash screen delay
        const debugDelay = localStorage.getItem("DEBUG_SPLASH_DELAY");
        if (debugDelay) {
          const delayMs = parseInt(debugDelay, 10);
          console.log(`[DEBUG] Adding ${delayMs}ms delay to see splash screen`);
          await new Promise((resolve) => setTimeout(resolve, delayMs));
        }

        // Initialize anonymous user
        dispatch(setAnonymousUser());

        // Migrate old note IDs from ano_ to anon_ (one-time migration)
        localStorageService.migrateOldNoteIds();

        // Load notes from local storage
        const localNotes = localStorageService.getNotes();
        dispatch(setNotes(localNotes));
      }
    };

    initializeApp();
  }, [dispatch, isAuthenticated]);
};
