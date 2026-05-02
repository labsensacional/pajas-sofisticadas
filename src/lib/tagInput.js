/**
 * @param {string} value
 */
export function normalizeTag(value) {
  return value.trim().toLowerCase().replace(/\s+/g, '-');
}

/**
 * @param {Array<{ tags?: string[] | string }>} items
 */
export function extractTags(items) {
  return items.flatMap((item) => {
    const tags = item?.tags;
    if (Array.isArray(tags)) return tags.map(normalizeTag).filter(Boolean);
    if (typeof tags === 'string') return tags.split(/[,\s]+/).map(normalizeTag).filter(Boolean);
    return [];
  });
}

/**
 * @param {string[]} knownTags
 * @param {string[]} selectedTags
 * @param {string} input
 */
export function getFilteredTagSuggestions(knownTags, selectedTags, input) {
  const needle = normalizeTag(input);
  if (!needle) return knownTags.filter((tag) => !selectedTags.includes(tag)).slice(0, 8);
  return knownTags
    .filter((tag) => !selectedTags.includes(tag) && tag.includes(needle))
    .slice(0, 8);
}
