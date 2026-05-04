import { collection, doc, getDoc, getDocs, orderBy, query } from 'firebase/firestore';
import { ACTIONS, allStaticTags, findStatic } from '$lib/actions.js';
import { extractTags } from '$lib/tagInput.js';

export const PRACTICE_CATALOG_SOURCE = 'firestore';

/**
 * @param {any} practice
 */
function normalizePractice(practice) {
  if (!practice) return practice;
  if (typeof practice.tags === 'string') {
    return { ...practice, tags: extractTags([practice]) };
  }
  return practice;
}

/**
 * @param {{ db?: any }} [options]
 */
export async function listPractices(options = {}) {
  const { db } = options;
  const bundled = ACTIONS.map(normalizePractice);

  if (!db) return bundled;

  const snap = await getDocs(query(collection(db, 'acciones'), orderBy('createdAt', 'desc')));
  const firestorePractices = snap.docs.map((entry) => normalizePractice({ id: entry.id, ...entry.data() }));
  const firestoreIds = new Set(firestorePractices.map((practice) => practice.id));
  return [...firestorePractices, ...bundled.filter((practice) => !firestoreIds.has(practice.id))];
}

/**
 * @param {string} id
 * @param {{ db?: any }} [options]
 */
export async function getPracticeById(id, options = {}) {
  const { db } = options;

  if (db) {
    const snap = await getDoc(doc(db, 'acciones', id));
    if (snap.exists()) return normalizePractice({ id: snap.id, ...snap.data() });
  }

  return normalizePractice(findStatic(id));
}

/**
 * @param {{ db?: any }} [options]
 */
export async function loadKnownPracticeTags(options = {}) {
  const { db } = options;
  const tagSet = new Set(allStaticTags());

  if (db) {
    const snap = await getDocs(query(collection(db, 'acciones'), orderBy('createdAt', 'desc')));
    extractTags(snap.docs.map((entry) => entry.data())).forEach((tag) => tagSet.add(tag));
  }

  return [...tagSet].sort((a, b) => a.localeCompare(b));
}

/**
 * @param {string} id
 * @param {Array<any>} [catalog]
 */
export function getPracticeName(id, catalog = []) {
  return catalog.find((practice) => practice.id === id)?.name ?? findStatic(id)?.name ?? id;
}
