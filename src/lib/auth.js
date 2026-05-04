import { doc, getDoc, serverTimestamp, setDoc } from 'firebase/firestore';
import { auth, db, hasFirebaseConfig } from './firebase/client.js';
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  updatePassword,
  updateProfile
} from 'firebase/auth';

const USERNAME_ADJECTIVES = ['cosmico', 'sensual', 'lucido', 'suave', 'hipnotico', 'vibrante', 'nocturno', 'orbital'];
const USERNAME_NOUNS = ['viajero', 'loto', 'pulso', 'ritual', 'eco', 'cometa', 'faro', 'delta'];

export function generateRandomUsername() {
  const adjective = USERNAME_ADJECTIVES[Math.floor(Math.random() * USERNAME_ADJECTIVES.length)];
  const noun = USERNAME_NOUNS[Math.floor(Math.random() * USERNAME_NOUNS.length)];
  const suffix = Math.floor(1000 + Math.random() * 9000);
  return `${adjective}-${noun}-${suffix}`;
}

export function ensureAuthReady() {
  if (!hasFirebaseConfig || !auth) {
    throw new Error('Firebase no configurado. Completa las variables VITE_FIREBASE_*');
  }
}

export async function register(email, password) {
  ensureAuthReady();
  const result = await createUserWithEmailAndPassword(auth, email, password);
  await ensureUserProfile(result.user);
  return result;
}

export async function login(email, password) {
  ensureAuthReady();
  const result = await signInWithEmailAndPassword(auth, email, password);
  await ensureUserProfile(result.user);
  return result;
}

export async function loginWithGoogle() {
  ensureAuthReady();
  const provider = new GoogleAuthProvider();
  const result = await signInWithPopup(auth, provider);
  await ensureUserProfile(result.user);
  return result;
}

export async function resetPassword(email) {
  ensureAuthReady();
  return sendPasswordResetEmail(auth, email);
}

export async function updateDisplayName(displayName) {
  ensureAuthReady();
  if (!auth.currentUser) throw new Error('No hay una sesión activa.');

  await updateProfile(auth.currentUser, { displayName });

  if (db) {
    await setDoc(doc(db, 'users', auth.currentUser.uid), {
      displayName,
      updatedAt: serverTimestamp()
    }, { merge: true });
  }
}

export async function getUserProfile(user = auth?.currentUser) {
  ensureAuthReady();
  if (!user || !db) return null;

  const snap = await getDoc(doc(db, 'users', user.uid));
  return snap.exists() ? snap.data() : null;
}

export async function updateUserPreferences(preferences, user = auth?.currentUser) {
  ensureAuthReady();
  if (!user) throw new Error('No hay una sesión activa.');
  if (!db) return;

  await setDoc(doc(db, 'users', user.uid), {
    ...preferences,
    updatedAt: serverTimestamp()
  }, { merge: true });
}

export async function sendCurrentUserPasswordReset() {
  ensureAuthReady();
  if (!auth.currentUser?.email) throw new Error('Tu cuenta no tiene email asociado.');
  return sendPasswordResetEmail(auth, auth.currentUser.email);
}

export async function updateCurrentUserPassword(password) {
  ensureAuthReady();
  if (!auth.currentUser) throw new Error('No hay una sesión activa.');
  return updatePassword(auth.currentUser, password);
}

export async function ensureUserProfile(user = auth?.currentUser) {
  ensureAuthReady();
  if (!user) throw new Error('No hay una sesión activa.');

  const displayName = user.displayName?.trim() || generateRandomUsername();

  if (user.displayName !== displayName) {
    await updateProfile(user, { displayName });
  }

  if (db) {
    await setDoc(doc(db, 'users', user.uid), {
      displayName,
      updatedAt: serverTimestamp()
    }, { merge: true });
  }

  return displayName;
}
