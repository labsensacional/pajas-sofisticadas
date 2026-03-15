import { collection, getDocs, limit, orderBy, query } from 'firebase/firestore';
import { getCachedPosts, markPrefetched, setCachedPosts } from './feedCache.js';

export async function prefetchRecent(db) {
  if (getCachedPosts('recent')) return;

  const q = query(collection(db, 'posts'), orderBy('createdAt', 'desc'), limit(10));
  const snapshot = await getDocs(q);
  const posts = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  setCachedPosts('recent', posts);
  markPrefetched();

  // Prefetch los otros sorts en background para que estén listos cuando el usuario los use
  prefetchOtherSorts(db);
}

async function prefetchOtherSorts(db) {
  const sorts = [
    { key: 'saved', field: 'saveCount' },
    { key: 'tried', field: 'triedCount' },
    { key: 'regular', field: 'regularCount' }
  ];

  for (const { key, field } of sorts) {
    if (getCachedPosts(key)) continue;
    try {
      const q = query(
        collection(db, 'posts'),
        orderBy(field, 'desc'),
        orderBy('createdAt', 'desc'),
        limit(10)
      );
      const snapshot = await getDocs(q);
      const posts = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setCachedPosts(key, posts);
    } catch {
      // Ignorar errores de prefetch — no son críticos
    }
  }
}
