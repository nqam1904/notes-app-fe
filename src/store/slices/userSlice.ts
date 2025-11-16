import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User, UserPreferences } from '@/types/Data';
import { localStorageService } from '@/services/localStorageService';

interface UserState {
  user: User | null;
  isAuthenticated: boolean;
  isAnonymous: boolean;
  anonymousUserId: string | null;
  loading: boolean;
  error: string | null;
  preferences: UserPreferences;
}

const initialState: UserState = {
  user: null,
  isAuthenticated: false,
  isAnonymous: false,
  anonymousUserId: null,
  loading: false,
  error: null,
  preferences: {
    theme: 'system',
    language: 'en',
    fontSize: 'normal',
    sortBy: 'date',
    sortOrder: 'desc',
  },
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User | null>) => {
      state.user = action.payload;
      state.isAuthenticated = !!action.payload;
      state.isAnonymous = false;
      state.anonymousUserId = null;
    },
    setAnonymousUser: (state) => {
      const anonymousUserId = localStorageService.getAnonymousUserId();
      state.anonymousUserId = anonymousUserId;
      state.isAnonymous = true;
      state.isAuthenticated = false;
      state.user = null;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    setPreferences: (state, action: PayloadAction<Partial<UserPreferences>>) => {
      state.preferences = {
        ...state.preferences,
        ...action.payload,
      };
    },
    updateUser: (state, action: PayloadAction<Partial<User>>) => {
      if (state.user) {
        state.user = {
          ...state.user,
          ...action.payload,
        };
      }
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.isAnonymous = false;
      state.anonymousUserId = null;
      state.preferences = initialState.preferences;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
});

export const {
  setUser,
  setAnonymousUser,
  setLoading,
  setError,
  setPreferences,
  updateUser,
  logout,
  clearError,
} = userSlice.actions;

export default userSlice.reducer;

