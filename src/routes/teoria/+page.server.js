import { error } from '@sveltejs/kit';
import { marked } from 'marked';

const files = import.meta.glob('/src/content/teoria/*.md', { query: '?raw', import: 'default', eager: true });

export function load() {
  const raw = files['/src/content/teoria/about.md'];

  if (!raw) throw error(404, 'Documento no encontrado');

  const html = marked(/** @type {string} */ (raw));
  const titleMatch = /** @type {string} */ (raw).match(/^#\s+(.+)/m);
  const title = titleMatch ? titleMatch[1] : 'about';

  return { html, title };
}
