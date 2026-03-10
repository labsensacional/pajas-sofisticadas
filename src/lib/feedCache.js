let cache = new Map();
let prefetched = false;

export function getCachedPosts(key) {
  return cache.get(key) ?? null;
}

export function setCachedPosts(key, posts) {
  cache.set(key, posts);
}

export function hasPrefetched() {
  return prefetched;
}

export function markPrefetched() {
  prefetched = true;
}
