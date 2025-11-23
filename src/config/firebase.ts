import { CONFIG } from "@/config-global";
import { initializeApp, getApp, getApps, FirebaseApp } from "firebase/app";
import { getAuth, Auth } from "firebase/auth";
import { getDatabase, Database } from "firebase/database";
import { getStorage, FirebaseStorage } from "firebase/storage";
import { getFirestore, Firestore } from "firebase/firestore";

const {
  apiKey,
  authDomain,
  projectId,
  storageBucket,
  messagingSenderId,
  appId,
  databaseURL,
} = CONFIG;
const firebaseConfig = {
  apiKey,
  authDomain,
  projectId,
  storageBucket,
  messagingSenderId,
  appId,
  databaseURL,
};
// Check if we have valid Firebase config
const hasValidConfig = () => {
  return !!(apiKey && authDomain && projectId && appId);
};

// Only initialize Firebase on client-side with valid config
let app: FirebaseApp | null = null;
let auth: Auth | null = null;
let database: Database | null = null;
let storage: FirebaseStorage | null = null;
let firestore: Firestore | null = null;

if (typeof window !== "undefined" && hasValidConfig()) {
  // Initialize Firebase only in browser with valid config
  app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
  auth = getAuth(app);
  database = getDatabase(app);
  storage = getStorage(app);
  firestore = getFirestore(app);
}

// Export services (will be null on server or without valid config)
export { auth, database, storage, firestore };
export default app;
