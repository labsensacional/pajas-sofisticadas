const MODERATORS = ['mathigatti@gmail.com'];

/** @param {{ email?: string | null } | null} user */
export function isMod(user) {
  return Boolean(user?.email && MODERATORS.includes(user.email));
}
