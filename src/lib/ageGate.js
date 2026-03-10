import { browser } from '$app/environment';

const KEY = 'ps_age_gate_confirmed';

export function isAgeGateConfirmed() {
  if (!browser) return false;
  return window.localStorage.getItem(KEY) === 'true';
}

export function confirmAgeGate() {
  if (!browser) return;
  window.localStorage.setItem(KEY, 'true');
}

export function resetAgeGate() {
  if (!browser) return;
  window.localStorage.removeItem(KEY);
}
