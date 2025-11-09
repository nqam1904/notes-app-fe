import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Note, NoteFilter } from '@/types/Data';

interface NotesState {
  notes: Note[];
  filteredNotes: Note[];
  selectedNoteId: string | null;
  loading: boolean;
  error: string | null;
  filter: NoteFilter;
  searchQuery: string;
}

const initialState: NotesState = {
  notes: [],
  filteredNotes: [],
  selectedNoteId: null,
  loading: false,
  error: null,
  filter: {},
  searchQuery: '',
};

const notesSlice = createSlice({
  name: 'notes',
  initialState,
  reducers: {
    setNotes: (state, action: PayloadAction<Note[]>) => {
      state.notes = action.payload;
      state.filteredNotes = action.payload;
    },
    addNote: (state, action: PayloadAction<Note>) => {
      state.notes.unshift(action.payload);
      state.filteredNotes.unshift(action.payload);
    },
    updateNote: (state, action: PayloadAction<Note>) => {
      const index = state.notes.findIndex(note => note.id === action.payload.id);
      if (index !== -1) {
        state.notes[index] = action.payload;
        state.filteredNotes = state.filteredNotes.map(note =>
          note.id === action.payload.id ? action.payload : note
        );
      }
    },
    deleteNote: (state, action: PayloadAction<string>) => {
      state.notes = state.notes.filter(note => note.id !== action.payload);
      state.filteredNotes = state.filteredNotes.filter(note => note.id !== action.payload);
      if (state.selectedNoteId === action.payload) {
        state.selectedNoteId = null;
      }
    },
    setSelectedNote: (state, action: PayloadAction<string | null>) => {
      state.selectedNoteId = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    setFilter: (state, action: PayloadAction<NoteFilter>) => {
      state.filter = action.payload;
      applyFilter(state);
    },
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
      applyFilter(state);
    },
    clearError: (state) => {
      state.error = null;
    },
  },
});

function applyFilter(state: NotesState) {
  let filtered = state.notes;

  // Apply search query
  if (state.searchQuery) {
    const query = state.searchQuery.toLowerCase();
    filtered = filtered.filter(
      note =>
        note.title.toLowerCase().includes(query) ||
        note.content.toLowerCase().includes(query) ||
        (note.tags && note.tags.some(tag => tag.toLowerCase().includes(query)))
    );
  }

  // Apply filters
  if (state.filter.folderId) {
    filtered = filtered.filter(note => note.folderId === state.filter.folderId);
  }
  if (state.filter.status) {
    filtered = filtered.filter(note => note.status === state.filter.status);
  }
  if (state.filter.color) {
    filtered = filtered.filter(note => note.color === state.filter.color);
  }
  if (state.filter.isPinned !== undefined) {
    filtered = filtered.filter(note => note.isPinned === state.filter.isPinned);
  }
  if (state.filter.isLocked !== undefined) {
    filtered = filtered.filter(note => note.isLocked === state.filter.isLocked);
  }

  state.filteredNotes = filtered;
}

export const {
  setNotes,
  addNote,
  updateNote,
  deleteNote,
  setSelectedNote,
  setLoading,
  setError,
  setFilter,
  setSearchQuery,
  clearError,
} = notesSlice.actions;

export default notesSlice.reducer;

