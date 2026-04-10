const files = import.meta.glob('/src/content/teoria/*.md', { query: '?raw', import: 'default', eager: true });

const subtitles = {
  '01-modelo-3-ejes': 'Por qué esta brújula de tres ejes ayuda a orientarse mejor que hablar sólo de orgasmo o excitación.',
  '02-ejes-de-puntuacion': 'Proxies corporales, expresión, conducta y referencias útiles para leer activación, placer y trance.',
  '03-como-puntuar-acciones': 'Una forma práctica de asignar puntajes comparables sin fingir una precisión que no existe.',
  '04-puentes-somaticos-y-emocionales': 'Cómo usar marcadores corporales, labilidad emocional e inversiones a favor del diseño de una sesión.'
};

export function load() {
  const docs = Object.entries(files).map(([path, raw]) => {
    const slug = path.split('/').pop().replace('.md', '');
    const titleMatch = /** @type {string} */ (raw).match(/^#\s+(.+)/m);
    const title = titleMatch ? titleMatch[1] : slug;
    const summary = subtitles[slug] ?? '';
    return { slug, title, summary };
  }).sort((a, b) => a.slug.localeCompare(b.slug));

  return { docs };
}
