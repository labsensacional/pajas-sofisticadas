import { writable, derived } from 'svelte/store';
import es from './locales/es.js';
import en from './locales/en.js';

/** @type {Record<string, Record<string, string>>} */
const LOCALES = { es, en };
export const SUPPORTED_LOCALES = /** @type {const} */ (['es', 'en']);

/**
 * Detect locale from localStorage or browser language.
 * @returns {'es' | 'en'}
 */
function detectLocale() {
  if (typeof localStorage !== 'undefined') {
    const stored = localStorage.getItem('locale');
    if (stored && SUPPORTED_LOCALES.includes(/** @type {any} */ (stored))) {
      return /** @type {'es' | 'en'} */ (stored);
    }
  }
  if (typeof navigator !== 'undefined') {
    for (const entry of navigator.languages ?? [navigator.language]) {
      const lang = entry?.split('-')[0];
      if (lang && SUPPORTED_LOCALES.includes(/** @type {any} */ (lang))) {
        return /** @type {'es' | 'en'} */ (lang);
      }
    }
  }
  return 'es';
}

export const locale = writable(/** @type {'es' | 'en'} */ ('es'));

/**
 * Set the active locale and persist to localStorage.
 * @param {'es' | 'en'} lang
 */
export function setLocale(lang) {
  if (SUPPORTED_LOCALES.includes(lang)) {
    locale.set(lang);
    if (typeof localStorage !== 'undefined') localStorage.setItem('locale', lang);
    if (typeof document !== 'undefined') document.documentElement.lang = lang;
  }
}

/**
 * Call this in layout onMount to initialize locale from browser/storage.
 */
export function initLocale() {
  const detected = detectLocale();
  locale.set(detected);
  if (typeof document !== 'undefined') document.documentElement.lang = detected;
  return detected;
}

/**
 * Reactive translation function derived from the locale store.
 * Use as `$t('key')` or `$t('key', { count: 5 })` in Svelte components.
 */
export const t = derived(locale, ($locale) => {
  const strings = LOCALES[$locale] ?? LOCALES.es;
  /**
   * @param {string} key
   * @param {Record<string, string | number>} [params]
   * @returns {string}
   */
  return (key, params = {}) => {
    let str = strings[key] ?? LOCALES.es[key] ?? key;
    for (const [k, v] of Object.entries(params)) {
      str = str.replace(`{${k}}`, String(v));
    }
    return str;
  };
});
