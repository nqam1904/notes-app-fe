import { firestore } from "@/config/firebase";
import {
  collection,
  doc,
  addDoc,
  getDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  query,
  where,
  onSnapshot,
  orderBy,
  Timestamp,
  Unsubscribe,
} from "firebase/firestore";
import { Folder } from "@/types/Data";

const FOLDERS_COLLECTION = "folders";

// Helper function to ensure Firestore is available
const ensureFirestore = () => {
  if (!firestore) {
    throw new Error(
      "Firestore is not initialized. Please check your Firebase configuration."
    );
  }
  return firestore;
};

// Helper function to convert Firestore timestamp to number
const convertTimestamp = (timestamp: any): number => {
  if (timestamp && typeof timestamp.toMillis === "function") {
    return timestamp.toMillis();
  }
  return timestamp || Date.now();
};

export const folderService = {
  /**
   * Create a new folder
   */
  async createFolder(
    userId: string,
    folderData: Omit<Folder, "id">
  ): Promise<Folder> {
    try {
      const db = ensureFirestore();
      const foldersRef = collection(db, FOLDERS_COLLECTION);

      const folderToCreate = {
        ...folderData,
        userId,
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now(),
      };

      const docRef = await addDoc(foldersRef, folderToCreate);

      const folder: Folder = {
        ...folderData,
        id: docRef.id,
      };

      return folder;
    } catch (error) {
      console.error("Error creating folder:", error);
      throw error;
    }
  },

  /**
   * Get all folders for a user
   */
  async getFolders(userId: string): Promise<Folder[]> {
    try {
      const db = ensureFirestore();
      const foldersRef = collection(db, FOLDERS_COLLECTION);
      const q = query(
        foldersRef,
        where("userId", "==", userId),
        orderBy("createdAt", "desc")
      );

      const querySnapshot = await getDocs(q);
      const folders: Folder[] = [];

      querySnapshot.forEach((doc) => {
        const data = doc.data();
        folders.push({
          id: doc.id,
          name: data.name,
          userId: data.userId,
          createdAt: convertTimestamp(data.createdAt),
          updatedAt: convertTimestamp(data.updatedAt),
          icon: data.icon,
          color: data.color,
          noteCount: data.noteCount,
        } as Folder);
      });

      return folders;
    } catch (error) {
      console.error("Error fetching folders:", error);
      throw error;
    }
  },

  /**
   * Get a single folder by ID
   */
  async getFolder(userId: string, folderId: string): Promise<Folder | null> {
    try {
      const db = ensureFirestore();
      const folderRef = doc(db, FOLDERS_COLLECTION, folderId);
      const docSnap = await getDoc(folderRef);

      if (!docSnap.exists()) {
        return null;
      }

      const data = docSnap.data();

      // Verify the folder belongs to the user
      if (data.userId !== userId) {
        throw new Error("Unauthorized access to folder");
      }

      return {
        id: docSnap.id,
        name: data.name,
        userId: data.userId,
        createdAt: convertTimestamp(data.createdAt),
        updatedAt: convertTimestamp(data.updatedAt),
        icon: data.icon,
        color: data.color,
        noteCount: data.noteCount,
      } as Folder;
    } catch (error) {
      console.error("Error fetching folder:", error);
      throw error;
    }
  },

  /**
   * Update a folder
   */
  async updateFolder(
    userId: string,
    folderId: string,
    updates: Partial<Folder>
  ): Promise<void> {
    try {
      const db = ensureFirestore();
      const folderRef = doc(db, FOLDERS_COLLECTION, folderId);

      // First verify the folder belongs to the user
      const docSnap = await getDoc(folderRef);
      if (!docSnap.exists()) {
        throw new Error("Folder not found");
      }

      if (docSnap.data().userId !== userId) {
        throw new Error("Unauthorized access to folder");
      }

      // Remove id from updates if present
      const { id, userId: _, createdAt, ...updateData } = updates as any;

      await updateDoc(folderRef, {
        ...updateData,
        updatedAt: Timestamp.now(),
      });
    } catch (error) {
      console.error("Error updating folder:", error);
      throw error;
    }
  },

  /**
   * Delete a folder
   */
  async deleteFolder(userId: string, folderId: string): Promise<void> {
    try {
      const db = ensureFirestore();
      const folderRef = doc(db, FOLDERS_COLLECTION, folderId);

      // First verify the folder belongs to the user
      const docSnap = await getDoc(folderRef);
      if (!docSnap.exists()) {
        throw new Error("Folder not found");
      }

      if (docSnap.data().userId !== userId) {
        throw new Error("Unauthorized access to folder");
      }

      await deleteDoc(folderRef);
    } catch (error) {
      console.error("Error deleting folder:", error);
      throw error;
    }
  },

  /**
   * Subscribe to real-time updates for all user folders
   */
  subscribeToFolders(
    userId: string,
    callback: (folders: Folder[]) => void
  ): Unsubscribe {
    try {
      const db = ensureFirestore();
      const foldersRef = collection(db, FOLDERS_COLLECTION);
      const q = query(
        foldersRef,
        where("userId", "==", userId),
        orderBy("createdAt", "desc")
      );

      const unsubscribe = onSnapshot(
        q,
        (querySnapshot) => {
          const folders: Folder[] = [];
          querySnapshot.forEach((doc) => {
            const data = doc.data();
            folders.push({
              id: doc.id,
              name: data.name,
              userId: data.userId,
              createdAt: convertTimestamp(data.createdAt),
              updatedAt: convertTimestamp(data.updatedAt),
              icon: data.icon,
              color: data.color,
              noteCount: data.noteCount,
            } as Folder);
          });
          callback(folders);
        },
        (error) => {
          console.error("Error in folders subscription:", error);
        }
      );

      return unsubscribe;
    } catch (error) {
      console.error("Error subscribing to folders:", error);
      throw error;
    }
  },
};
