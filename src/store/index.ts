import { configureStore } from '@reduxjs/toolkit';
import notesReducer from './slices/notesSlice';
import foldersReducer from './slices/foldersSlice';
import userReducer from './slices/userSlice';

export const store = configureStore({
  reducer: {
    notes: notesReducer,
    folders: foldersReducer,
    user: userReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;

