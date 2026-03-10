import { browser } from '$app/environment';
import { initializeApp, getApps } from 'firebase/app';
import { getAuth, setPersistence, browserLocalPersistence } from 'firebase/auth';
import { enableIndexedDbPersistence, getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const config = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};

export const hasFirebaseConfig = Object.values(config).every(Boolean);

let app = null;
let auth = null;
let db = null;
let storage = null;

if (browser && hasFirebaseConfig) {
  app = getApps().length ? getApps()[0] : initializeApp(config);
  auth = getAuth(app);
  setPersistence(auth, browserLocalPersistence).catch(() => {});
  db = getFirestore(app);
  enableIndexedDbPersistence(db).catch(() => {});
  storage = getStorage(app);
}

export { app as firebaseApp, auth, db, storage };
