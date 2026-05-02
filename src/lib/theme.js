const THEME_KEY = 'laboratorio-theme';
const VALID_THEMES = new Set(['system', 'light', 'dark']);

export function getStoredTheme() {
  if (typeof localStorage === 'undefined') return null;
  const value = localStorage.getItem(THEME_KEY);
  return VALID_THEMES.has(value) ? value : null;
}

export function getSystemTheme() {
  if (typeof window === 'undefined') return 'light';
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

export function resolveTheme(preference = getStoredTheme()) {
  return preference === 'light' || preference === 'dark' ? preference : getSystemTheme();
}

export function applyTheme(theme) {
  if (typeof document === 'undefined') return;
  document.documentElement.dataset.theme = theme;
  const themeColor = theme === 'dark' ? '#0a0f18' : '#f7efe6';
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content', themeColor);
}

export function persistTheme(theme) {
  if (typeof localStorage === 'undefined') return;
  if (theme === 'system') {
    localStorage.removeItem(THEME_KEY);
    return;
  }
  localStorage.setItem(THEME_KEY, theme);
}
