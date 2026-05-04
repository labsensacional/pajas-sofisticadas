/**
 * Local snapshot of practices.
 *
 * Runtime is currently Firestore-first and this snapshot is intentionally empty.
 * When you want to move published practices back to local for faster initial loads,
 * paste the exported array here and the rest of the app will pick it up.
 */

/** @type {any[]} */
export const ACTIONS = [];

/**
 * @param {string} id
 */
export function findStatic(id) {
  return ACTIONS.find((action) => action.id === id);
}

export function allStaticTags() {
  const set = new Set();
  ACTIONS.forEach((action) => {
    const tags = Array.isArray(action.tags) ? action.tags : String(action.tags ?? '').split(/[,\s]+/);
    tags.forEach((tag) => tag && set.add(tag));
  });
  return [...set].sort();
}
