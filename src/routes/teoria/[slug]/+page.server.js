import { error } from '@sveltejs/kit';
import { marked } from 'marked';

const files = import.meta.glob('/src/content/teoria/*.md', { query: '?raw', import: 'default', eager: true });

export function load({ params }) {
  const entry = Object.entries(files).find(([path]) =>
    path.split('/').pop().replace('.md', '') === params.slug
  );

  if (!entry) throw error(404, 'Documento no encontrado');

  const [, raw] = entry;
  const html = marked(/** @type {string} */ (raw));
  const titleMatch = /** @type {string} */ (raw).match(/^#\s+(.+)/m);
  const title = titleMatch ? titleMatch[1] : params.slug;

  return { html, title, slug: params.slug };
}
