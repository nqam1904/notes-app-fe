import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Folder } from '@/types/Data';

interface FoldersState {
  folders: Folder[];
  selectedFolderId: string | null;
  loading: boolean;
  error: string | null;
}

const initialState: FoldersState = {
  folders: [],
  selectedFolderId: null,
  loading: false,
  error: null,
};

const foldersSlice = createSlice({
  name: 'folders',
  initialState,
  reducers: {
    setFolders: (state, action: PayloadAction<Folder[]>) => {
      state.folders = action.payload;
    },
    addFolder: (state, action: PayloadAction<Folder>) => {
      state.folders.unshift(action.payload);
    },
    updateFolder: (state, action: PayloadAction<Folder>) => {
      const index = state.folders.findIndex(folder => folder.id === action.payload.id);
      if (index !== -1) {
        state.folders[index] = action.payload;
      }
    },
    deleteFolder: (state, action: PayloadAction<string>) => {
      state.folders = state.folders.filter(folder => folder.id !== action.payload);
      if (state.selectedFolderId === action.payload) {
        state.selectedFolderId = null;
      }
    },
    setSelectedFolder: (state, action: PayloadAction<string | null>) => {
      state.selectedFolderId = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
});

export const {
  setFolders,
  addFolder,
  updateFolder,
  deleteFolder,
  setSelectedFolder,
  setLoading,
  setError,
  clearError,
} = foldersSlice.actions;

export default foldersSlice.reducer;

