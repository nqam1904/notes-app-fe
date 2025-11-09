'use server';

import { folderService } from '@/services/folderService';
import { Folder } from '@/types/Data';

/**
 * Server Action: Create a new folder
 */
export async function createFolderAction(
  userId: string,
  folderData: Omit<Folder, 'id'>
): Promise<{ success: boolean; data?: Folder; error?: string }> {
  try {
    if (!userId) {
      throw new Error('User ID is required');
    }

    const newFolder = await folderService.createFolder(userId, folderData);
    return { success: true, data: newFolder };
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to create folder';
    console.error('Error creating folder:', message);
    return { success: false, error: message };
  }
}

/**
 * Server Action: Get all folders for a user
 */
export async function getFoldersAction(
  userId: string
): Promise<{ success: boolean; data?: Folder[]; error?: string }> {
  try {
    if (!userId) {
      throw new Error('User ID is required');
    }

    const folders = await folderService.getFolders(userId);
    return { success: true, data: folders };
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to fetch folders';
    console.error('Error fetching folders:', message);
    return { success: false, error: message };
  }
}

/**
 * Server Action: Get a single folder
 */
export async function getFolderAction(
  userId: string,
  folderId: string
): Promise<{ success: boolean; data?: Folder | null; error?: string }> {
  try {
    if (!userId || !folderId) {
      throw new Error('User ID and Folder ID are required');
    }

    const folder = await folderService.getFolder(userId, folderId);
    return { success: true, data: folder };
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to fetch folder';
    console.error('Error fetching folder:', message);
    return { success: false, error: message };
  }
}

/**
 * Server Action: Update a folder
 */
export async function updateFolderAction(
  userId: string,
  folderId: string,
  updates: Partial<Folder>
): Promise<{ success: boolean; error?: string }> {
  try {
    if (!userId || !folderId) {
      throw new Error('User ID and Folder ID are required');
    }

    await folderService.updateFolder(userId, folderId, updates);
    return { success: true };
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to update folder';
    console.error('Error updating folder:', message);
    return { success: false, error: message };
  }
}

/**
 * Server Action: Delete a folder
 */
export async function deleteFolderAction(
  userId: string,
  folderId: string
): Promise<{ success: boolean; error?: string }> {
  try {
    if (!userId || !folderId) {
      throw new Error('User ID and Folder ID are required');
    }

    await folderService.deleteFolder(userId, folderId);
    return { success: true };
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to delete folder';
    console.error('Error deleting folder:', message);
    return { success: false, error: message };
  }
}

/**
 * Server Action: Rename a folder
 */
export async function renameFolderAction(
  userId: string,
  folderId: string,
  newName: string
): Promise<{ success: boolean; error?: string }> {
  try {
    if (!userId || !folderId) {
      throw new Error('User ID and Folder ID are required');
    }

    if (!newName || newName.trim() === '') {
      throw new Error('Folder name cannot be empty');
    }

    await folderService.updateFolder(userId, folderId, {
      name: newName,
      updatedAt: Date.now(),
    });
    return { success: true };
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to rename folder';
    console.error('Error renaming folder:', message);
    return { success: false, error: message };
  }
}

/**
 * Server Action: Change folder color
 */
export async function changeFolderColorAction(
  userId: string,
  folderId: string,
  color: string
): Promise<{ success: boolean; error?: string }> {
  try {
    if (!userId || !folderId) {
      throw new Error('User ID and Folder ID are required');
    }

    await folderService.updateFolder(userId, folderId, {
      color,
      updatedAt: Date.now(),
    });
    return { success: true };
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to change folder color';
    console.error('Error changing folder color:', message);
    return { success: false, error: message };
  }
}

/**
 * Server Action: Change folder icon
 */
export async function changeFolderIconAction(
  userId: string,
  folderId: string,
  icon: string
): Promise<{ success: boolean; error?: string }> {
  try {
    if (!userId || !folderId) {
      throw new Error('User ID and Folder ID are required');
    }

    await folderService.updateFolder(userId, folderId, {
      icon,
      updatedAt: Date.now(),
    });
    return { success: true };
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to change folder icon';
    console.error('Error changing folder icon:', message);
    return { success: false, error: message };
  }
}

