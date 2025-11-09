import { database } from '@/config/firebase';
import {
  ref,
  push,
  update,
  remove,
  get,
  onValue,
  off,
} from 'firebase/database';
import { Folder } from '@/types/Data';

const FOLDERS_PATH = 'folders';

export const folderService = {
  /**
   * Create a new folder
   */
  async createFolder(userId: string, folderData: Omit<Folder, 'id'>): Promise<Folder> {
    try {
      const foldersRef = ref(database, `${FOLDERS_PATH}/${userId}`);
      const newFolderRef = push(foldersRef);

      const folder: Folder = {
        ...folderData,
        id: newFolderRef.key || '',
      };

      await update(newFolderRef, folder);
      return folder;
    } catch (error) {
      console.error('Error creating folder:', error);
      throw error;
    }
  },

  /**
   * Get all folders for a user
   */
  async getFolders(userId: string): Promise<Folder[]> {
    try {
      const foldersRef = ref(database, `${FOLDERS_PATH}/${userId}`);
      const snapshot = await get(foldersRef);

      if (!snapshot.exists()) {
        return [];
      }

      const folders: Folder[] = [];
      snapshot.forEach(childSnapshot => {
        folders.push(childSnapshot.val());
      });

      return folders;
    } catch (error) {
      console.error('Error fetching folders:', error);
      throw error;
    }
  },

  /**
   * Get a single folder by ID
   */
  async getFolder(userId: string, folderId: string): Promise<Folder | null> {
    try {
      const folderRef = ref(database, `${FOLDERS_PATH}/${userId}/${folderId}`);
      const snapshot = await get(folderRef);

      if (!snapshot.exists()) {
        return null;
      }

      return snapshot.val();
    } catch (error) {
      console.error('Error fetching folder:', error);
      throw error;
    }
  },

  /**
   * Update a folder
   */
  async updateFolder(userId: string, folderId: string, updates: Partial<Folder>): Promise<void> {
    try {
      const folderRef = ref(database, `${FOLDERS_PATH}/${userId}/${folderId}`);
      await update(folderRef, {
        ...updates,
        updatedAt: Date.now(),
      });
    } catch (error) {
      console.error('Error updating folder:', error);
      throw error;
    }
  },

  /**
   * Delete a folder
   */
  async deleteFolder(userId: string, folderId: string): Promise<void> {
    try {
      const folderRef = ref(database, `${FOLDERS_PATH}/${userId}/${folderId}`);
      await remove(folderRef);
    } catch (error) {
      console.error('Error deleting folder:', error);
      throw error;
    }
  },

  /**
   * Subscribe to real-time updates for all user folders
   */
  subscribeToFolders(userId: string, callback: (folders: Folder[]) => void): () => void {
    try {
      const foldersRef = ref(database, `${FOLDERS_PATH}/${userId}`);

      const unsubscribe = onValue(foldersRef, snapshot => {
        const folders: Folder[] = [];
        if (snapshot.exists()) {
          snapshot.forEach(childSnapshot => {
            folders.push(childSnapshot.val());
          });
        }
        callback(folders);
      });

      return () => off(foldersRef);
    } catch (error) {
      console.error('Error subscribing to folders:', error);
      throw error;
    }
  },
};

