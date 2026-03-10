import { auth, hasFirebaseConfig } from './firebase/client.js';
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
  sendPasswordResetEmail
} from 'firebase/auth';

export function ensureAuthReady() {
  if (!hasFirebaseConfig || !auth) {
    throw new Error('Firebase no configurado. Completa las variables VITE_FIREBASE_*');
  }
}

export async function register(email, password) {
  ensureAuthReady();
  return createUserWithEmailAndPassword(auth, email, password);
}

export async function login(email, password) {
  ensureAuthReady();
  return signInWithEmailAndPassword(auth, email, password);
}

export async function loginWithGoogle() {
  ensureAuthReady();
  const provider = new GoogleAuthProvider();
  return signInWithPopup(auth, provider);
}

export async function resetPassword(email) {
  ensureAuthReady();
  return sendPasswordResetEmail(auth, email);
}
