const files = import.meta.glob('/src/content/teoria/*.md', { query: '?raw', import: 'default', eager: true });

export function load() {
  const docs = Object.entries(files).map(([path, raw]) => {
    const slug = path.split('/').pop().replace('.md', '');
    const titleMatch = /** @type {string} */ (raw).match(/^#\s+(.+)/m);
    const title = titleMatch ? titleMatch[1] : slug;
    const summaryMatch = /** @type {string} */ (raw).match(/\n\n(.{20,200})/);
    const summary = summaryMatch ? summaryMatch[1].replace(/[#*_]/g, '').slice(0, 120) + '…' : '';
    return { slug, title, summary };
  }).sort((a, b) => a.slug.localeCompare(b.slug));

  return { docs };
}
