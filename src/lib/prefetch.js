import { collection, getDocs, limit, orderBy, query } from 'firebase/firestore';
import { getCachedPosts, markPrefetched, setCachedPosts } from './feedCache.js';

export async function prefetchRecent(db) {
  if (getCachedPosts('recent')) return;

  const q = query(collection(db, 'posts'), orderBy('createdAt', 'desc'), limit(20));
  const snapshot = await getDocs(q);
  const posts = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  setCachedPosts('recent', posts);
  markPrefetched();
}
