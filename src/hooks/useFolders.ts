'use client';

import { folderService } from '@/services/folder-service';
import { AppDispatch, RootState } from '@/store';
import {
  addFolder,
  deleteFolder,
  setError,
  setFolders,
  setLoading,
  updateFolder,
} from '@/store/slices/foldersSlice';
import { Folder } from '@/types/Data';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export const useFolders = (userId: string | undefined) => {
  const dispatch = useDispatch<AppDispatch>();
  const { folders, selectedFolderId, loading, error } = useSelector(
    (state: RootState) => state.folders
  );

  // Load folders on mount
  useEffect(() => {
    if (!userId) return;

    dispatch(setLoading(true));

    const unsubscribe = folderService.subscribeToFolders(userId, (fetchedFolders) => {
      dispatch(setFolders([...fetchedFolders].sort((a, b) => b.updatedAt - a.updatedAt)));
      dispatch(setLoading(false));
    });

    return () => {
      unsubscribe();
    };
  }, [userId, dispatch]);

  const createFolderData = async (folderData: Omit<Folder, 'id'>) => {
    if (!userId) throw new Error('User ID is required');

    try {
      dispatch(setLoading(true));
      const newFolder = await folderService.createFolder(userId, folderData);
      dispatch(addFolder(newFolder));
      dispatch(setError(null));
      return newFolder;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to create folder';
      dispatch(setError(errorMessage));
      throw err;
    } finally {
      dispatch(setLoading(false));
    }
  };

  const updateFolderData = async (folderId: string, updates: Partial<Folder>) => {
    if (!userId) throw new Error('User ID is required');

    try {
      dispatch(setLoading(true));
      await folderService.updateFolder(userId, folderId, updates);

      const updatedFolder = folders.find(f => f.id === folderId);
      if (updatedFolder) {
        dispatch(updateFolder({ ...updatedFolder, ...updates }));
      }
      dispatch(setError(null));
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to update folder';
      dispatch(setError(errorMessage));
      throw err;
    } finally {
      dispatch(setLoading(false));
    }
  };

  const deleteFolderData = async (folderId: string) => {
    if (!userId) throw new Error('User ID is required');

    try {
      dispatch(setLoading(true));
      await folderService.deleteFolder(userId, folderId);
      dispatch(deleteFolder(folderId));
      dispatch(setError(null));
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to delete folder';
      dispatch(setError(errorMessage));
      throw err;
    } finally {
      dispatch(setLoading(false));
    }
  };

  return {
    folders,
    selectedFolderId,
    loading,
    error,
    createFolder: createFolderData,
    updateFolder: updateFolderData,
    deleteFolder: deleteFolderData,
  };
};

