'use server';

import { noteService } from '@/services/note-service';
import { Note } from '@/types/Data';

/**
 * Server Action: Create a new note
 */
export async function createNoteAction(
  userId: string,
  noteData: Omit<Note, 'id'>
): Promise<{ success: boolean; data?: Note; error?: string }> {
  try {
    if (!userId) {
      throw new Error('User ID is required');
    }

    const newNote = await noteService.createNote(userId, noteData);
    return { success: true, data: newNote };
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to create note';
    console.error('Error creating note:', message);
    return { success: false, error: message };
  }
}

/**
 * Server Action: Get all notes for a user
 */
export async function getNotesAction(
  userId: string
): Promise<{ success: boolean; data?: Note[]; error?: string }> {
  try {
    if (!userId) {
      throw new Error('User ID is required');
    }

    const notes = await noteService.getNotes(userId);
    return { success: true, data: notes };
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to fetch notes';
    console.error('Error fetching notes:', message);
    return { success: false, error: message };
  }
}

/**
 * Server Action: Get a single note
 */
export async function getNoteAction(
  userId: string,
  noteId: string
): Promise<{ success: boolean; data?: Note | null; error?: string }> {
  try {
    if (!userId || !noteId) {
      throw new Error('User ID and Note ID are required');
    }

    const note = await noteService.getNote(userId, noteId);
    return { success: true, data: note };
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to fetch note';
    console.error('Error fetching note:', message);
    return { success: false, error: message };
  }
}

/**
 * Server Action: Update a note
 */
export async function updateNoteAction(
  userId: string,
  noteId: string,
  updates: Partial<Note>
): Promise<{ success: boolean; error?: string }> {
  try {
    if (!userId || !noteId) {
      throw new Error('User ID and Note ID are required');
    }

    await noteService.updateNote(userId, noteId, updates);
    return { success: true };
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to update note';
    console.error('Error updating note:', message);
    return { success: false, error: message };
  }
}

/**
 * Server Action: Delete a note
 */
export async function deleteNoteAction(
  userId: string,
  noteId: string
): Promise<{ success: boolean; error?: string }> {
  try {
    if (!userId || !noteId) {
      throw new Error('User ID and Note ID are required');
    }

    await noteService.deleteNote(userId, noteId);
    return { success: true };
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to delete note';
    console.error('Error deleting note:', message);
    return { success: false, error: message };
  }
}

/**
 * Server Action: Get notes by status (archived, trashed, etc.)
 */
export async function getNotesByStatusAction(
  userId: string,
  status: 'active' | 'archived' | 'trashed'
): Promise<{ success: boolean; data?: Note[]; error?: string }> {
  try {
    if (!userId) {
      throw new Error('User ID is required');
    }

    const notes = await noteService.getNotesByStatus(userId, status);
    return { success: true, data: notes };
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to fetch notes by status';
    console.error('Error fetching notes by status:', message);
    return { success: false, error: message };
  }
}

/**
 * Server Action: Archive a note
 */
export async function archiveNoteAction(
  userId: string,
  noteId: string
): Promise<{ success: boolean; error?: string }> {
  try {
    if (!userId || !noteId) {
      throw new Error('User ID and Note ID are required');
    }

    await noteService.updateNote(userId, noteId, {
      status: 'archived',
      updatedAt: Date.now(),
    });
    return { success: true };
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to archive note';
    console.error('Error archiving note:', message);
    return { success: false, error: message };
  }
}

/**
 * Server Action: Restore a note from trash/archive
 */
export async function restoreNoteAction(
  userId: string,
  noteId: string
): Promise<{ success: boolean; error?: string }> {
  try {
    if (!userId || !noteId) {
      throw new Error('User ID and Note ID are required');
    }

    await noteService.updateNote(userId, noteId, {
      status: 'active',
      updatedAt: Date.now(),
    });
    return { success: true };
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to restore note';
    console.error('Error restoring note:', message);
    return { success: false, error: message };
  }
}

/**
 * Server Action: Soft delete a note (move to trash)
 */
export async function moveNoteToTrashAction(
  userId: string,
  noteId: string
): Promise<{ success: boolean; error?: string }> {
  try {
    if (!userId || !noteId) {
      throw new Error('User ID and Note ID are required');
    }

    await noteService.updateNote(userId, noteId, {
      status: 'trashed',
      updatedAt: Date.now(),
    });
    return { success: true };
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to move note to trash';
    console.error('Error moving note to trash:', message);
    return { success: false, error: message };
  }
}

/**
 * Server Action: Pin/Unpin a note
 */
export async function toggleNotePinAction(
  userId: string,
  noteId: string,
  isPinned: boolean
): Promise<{ success: boolean; error?: string }> {
  try {
    if (!userId || !noteId) {
      throw new Error('User ID and Note ID are required');
    }

    await noteService.updateNote(userId, noteId, {
      isPinned,
      updatedAt: Date.now(),
    });
    return { success: true };
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to toggle note pin';
    console.error('Error toggling note pin:', message);
    return { success: false, error: message };
  }
}

/**
 * Server Action: Lock/Unlock a note
 */
export async function toggleNoteLockAction(
  userId: string,
  noteId: string,
  isLocked: boolean
): Promise<{ success: boolean; error?: string }> {
  try {
    if (!userId || !noteId) {
      throw new Error('User ID and Note ID are required');
    }

    await noteService.updateNote(userId, noteId, {
      isLocked,
      updatedAt: Date.now(),
    });
    return { success: true };
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to toggle note lock';
    console.error('Error toggling note lock:', message);
    return { success: false, error: message };
  }
}

/**
 * Server Action: Change note color
 */
export async function changeNoteColorAction(
  userId: string,
  noteId: string,
  color: string
): Promise<{ success: boolean; error?: string }> {
  try {
    if (!userId || !noteId) {
      throw new Error('User ID and Note ID are required');
    }

    await noteService.updateNote(userId, noteId, {
      updatedAt: Date.now(),
    });
    return { success: true };
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to change note color';
    console.error('Error changing note color:', message);
    return { success: false, error: message };
  }
}

/**
 * Server Action: Update note title and content
 */
export async function updateNoteContentAction(
  userId: string,
  noteId: string,
  title: string,
  content: string
): Promise<{ success: boolean; error?: string }> {
  try {
    if (!userId || !noteId) {
      throw new Error('User ID and Note ID are required');
    }

    await noteService.updateNote(userId, noteId, {
      title,
      content,
      updatedAt: Date.now(),
    });
    return { success: true };
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to update note content';
    console.error('Error updating note content:', message);
    return { success: false, error: message };
  }
}

