const THEME_KEY = 'laboratorio-theme';

export function getStoredTheme() {
  if (typeof localStorage === 'undefined') return null;
  const value = localStorage.getItem(THEME_KEY);
  return value === 'dark' || value === 'light' ? value : null;
}

export function getSystemTheme() {
  if (typeof window === 'undefined') return 'light';
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

export function resolveTheme() {
  return getStoredTheme() ?? getSystemTheme();
}

export function applyTheme(theme) {
  if (typeof document === 'undefined') return;
  document.documentElement.dataset.theme = theme;
  const themeColor = theme === 'dark' ? '#0a0f18' : '#f7efe6';
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content', themeColor);
}

export function persistTheme(theme) {
  if (typeof localStorage === 'undefined') return;
  localStorage.setItem(THEME_KEY, theme);
}

