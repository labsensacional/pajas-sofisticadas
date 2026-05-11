<script>
  // @ts-nocheck
  import { onMount } from 'svelte';
  import { page } from '$app/stores';
  import { goto } from '$app/navigation';
  import { signOut, onAuthStateChanged } from 'firebase/auth';
  import { auth, hasFirebaseConfig } from '$lib/firebase/client.js';
  import { confirmAgeGate, isAgeGateConfirmed } from '$lib/ageGate.js';
  import { ensureUserProfile, getUserProfile } from '$lib/auth.js';
  import { isMod } from '$lib/moderator.js';
  import { applyTheme, persistTheme, resolveTheme } from '$lib/theme.js';
  import { t, initLocale, setLocale } from '$lib/i18n.js';

  export let data;

  let showGate = true;
  let user = null;
  onMount(() => {
    initLocale();
    applyTheme(resolveTheme());
    showGate = !isAgeGateConfirmed();

    if (auth) {
      return onAuthStateChanged(auth, async (v) => {
        if (v && hasFirebaseConfig) {
          await ensureUserProfile(v);
          const profile = await getUserProfile(v);
          if (profile?.locale) {
            setLocale(profile.locale);
          }
          if (profile?.themePreference) {
            persistTheme(profile.themePreference);
            applyTheme(resolveTheme(profile.themePreference));
          }
          user = auth.currentUser ?? v;
          return;
        }
        user = v;
      });
    }
  });

  function handleConfirm() { confirmAgeGate(); showGate = false; }
  async function handleLogout() { if (auth) await signOut(auth); }
</script>

<svelte:head>
  <title>{data.meta.title}</title>
  <meta name="description" content={data.meta.description} />
  <link rel="canonical" href={data.meta.canonical} />

  <meta property="og:locale" content="es_AR" />
  <meta property="og:type" content="website" />
  <meta property="og:site_name" content={data.meta.siteName} />
  <meta property="og:title" content={data.meta.title} />
  <meta property="og:description" content={data.meta.description} />
  <meta property="og:url" content={data.meta.canonical} />
  <meta property="og:image" content={data.meta.image} />
  <meta property="og:image:secure_url" content={data.meta.image} />
  <meta property="og:image:type" content="image/png" />
  <meta property="og:image:width" content="1200" />
  <meta property="og:image:height" content="630" />
  <meta property="og:image:alt" content="Preview de Recetario Sensacional con fondo oscuro y acceso a introducción, prácticas y sesiones." />

  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content={data.meta.title} />
  <meta name="twitter:description" content={data.meta.description} />
  <meta name="twitter:image" content={data.meta.image} />

  <link rel="manifest" href="/manifest.webmanifest" />
  <meta name="mobile-web-app-capable" content="yes" />
  <meta name="apple-mobile-web-app-capable" content="yes" />
  <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
  <meta name="apple-mobile-web-app-title" content="Recetario Sensacional" />
</svelte:head>

{#if showGate}
  <div class="gate">
    <div class="card">
      <p class="eyebrow">{$t('gate.eyebrow')}</p>
      <h2>{$t('gate.title')}</h2>
      <p>{$t('gate.body')}</p>
      <div class="gate-actions">
        <button class="primary" on:click={handleConfirm}>{$t('gate.confirm')}</button>
        <a class="exit" href="https://www.google.com" rel="noreferrer">{$t('gate.exit')}</a>
      </div>
    </div>
  </div>
{/if}

<header class="topbar">
  <a class="brand" href="/">Recetario Sensacional</a>
  <div class="mobile-utility-actions">
    {#if user}
      {#if isMod(user)}
        <a href="/admin/promote" class="mod-link mobile-utility-link">{$t('nav.admin')}</a>
      {/if}
      <button class="logout mobile-utility-button" on:click={handleLogout}>{$t('nav.logout')}</button>
    {/if}
  </div>
  <nav class="desktop-nav">
    <a href="/practicas" on:click|preventDefault={() => goto('/practicas')}>{$t('nav.acciones')}</a>
    <a href="/sesiones">{$t('nav.sesiones')}</a>
    <a href="/concepto">{$t('nav.teoria')}</a>
    {#if user}
      <a href="/perfil">{$t('nav.perfil')}</a>
      {#if isMod(user)}
        <a href="/admin/promote" class="mod-link">{$t('nav.admin')}</a>
      {/if}
      <button class="logout" on:click={handleLogout}>{$t('nav.logout')}</button>
    {:else}
      <a href="/login">{$t('nav.login')}</a>
    {/if}
  </nav>
</header>

<nav class="mobile-nav">
  <a href="/practicas" on:click|preventDefault={() => goto('/practicas')} class:active={$page.url.pathname.startsWith('/practicas')}><span class="mobile-tab-kicker">🧪</span><span>{$t('nav.acciones')}</span></a>
  <a href="/sesiones" class:active={$page.url.pathname.startsWith('/sesiones')}><span class="mobile-tab-kicker">🌀</span><span>{$t('nav.sesiones')}</span></a>
  <a href="/concepto" class:active={$page.url.pathname.startsWith('/concepto')}><span class="mobile-tab-kicker">📚</span><span>{$t('nav.teoria')}</span></a>
  {#if user}
    <a href="/perfil" class:active={$page.url.pathname.startsWith('/perfil')}><span class="mobile-tab-kicker">👤</span><span>{$t('nav.perfil')}</span></a>
  {:else}
    <a href="/login" class:active={$page.url.pathname.startsWith('/login')}><span class="mobile-tab-kicker">🔐</span><span>{$t('nav.login.mobile')}</span></a>
  {/if}
</nav>

<slot />

<style>
  :global(:root) {
    color-scheme: light;
    --bg: #efe5da;
    --bg-strong: #f6eee7;
    --surface: rgba(250, 243, 236, 0.88);
    --surface-solid: #fbf6f0;
    --surface-soft: #f2e9e0;
    --text: #17141f;
    --muted: #5b6070;
    --muted-soft: #8d92a2;
    --line: rgba(23, 20, 31, 0.1);
    --line-strong: rgba(23, 20, 31, 0.18);
    --accent: #17141f;
    --accent-contrast: #fffaf5;
    --shadow: 0 20px 60px rgba(44, 23, 6, 0.12);
    --pill-bg: #f0e7de;
    --pill-bg-hover: #e7ddd4;
    --pill-text: #2d3443;
    --pill-active-bg: #17141f;
    --pill-active-text: #fffaf5;
  }

  :global(html[data-theme='dark']) {
    color-scheme: dark;
    --bg: #10151d;
    --bg-strong: #161c25;
    --surface: rgba(22, 29, 39, 0.88);
    --surface-solid: #1a2230;
    --surface-soft: #222d3c;
    --text: #f3efe9;
    --muted: #b2b8c7;
    --muted-soft: #8790a4;
    --line: rgba(243, 239, 233, 0.1);
    --line-strong: rgba(243, 239, 233, 0.18);
    --accent: #f1c27d;
    --accent-contrast: #10151e;
    --shadow: 0 24px 70px rgba(0, 0, 0, 0.35);
    --pill-bg: #243040;
    --pill-bg-hover: #2c394b;
    --pill-text: #edf1f7;
    --pill-active-bg: #f1c27d;
    --pill-active-text: #10151e;
  }

  :global(html) {
    background:
      radial-gradient(circle at top, rgba(241, 194, 125, 0.18), transparent 30%),
      linear-gradient(180deg, var(--bg-strong), var(--bg));
    min-height: 100%;
  }

  :global(body) {
    margin: 0;
    min-height: 100vh;
    color: var(--text);
    background: transparent;
    font-family: "Segoe UI", sans-serif;
    transition: background-color 160ms ease, color 160ms ease;
  }

  :global(a) {
    color: inherit;
  }

  :global(main) {
    color: var(--text);
  }

  :global(input),
  :global(textarea),
  :global(select) {
    background: var(--surface-solid);
    color: var(--text);
    border-color: var(--line-strong);
  }

  :global(select) {
    box-shadow: inset 0 0 0 999px var(--surface-solid);
  }

  :global(option) {
    background: var(--surface-solid);
    color: var(--text);
  }

  :global(input::placeholder),
  :global(textarea::placeholder) {
    color: var(--muted-soft);
  }

  :global(.card),
  :global(.section-card),
  :global(.item),
  :global(.comments-section),
  :global(.more-dropdown) {
    background: var(--surface-solid);
    border-color: var(--line);
    box-shadow: var(--shadow);
  }

  :global(.warn) {
    color: #8f5a00;
  }

  :global(html[data-theme='dark'] .warn) {
    background: #3a2b12 !important;
    color: #ffd99a !important;
  }

  :global(.error) {
    color: #b91c1c;
  }

  :global(html[data-theme='dark'] .error) {
    color: #ff9898 !important;
  }

  :global(.success),
  :global(.notice) {
    color: #0b6b3a;
  }

  :global(html[data-theme='dark'] .success),
  :global(html[data-theme='dark'] .notice) {
    color: #87e2b0 !important;
  }

  :global(.back),
  :global(.hint),
  :global(.desc),
  :global(.meta-info),
  :global(.comment-date),
  :global(.empty),
  :global(.loading),
  :global(.loading-hint),
  :global(.auth-hint),
  :global(.header p),
  :global(.card p),
  :global(.section-card p) {
    color: var(--muted) !important;
  }

  :global(.tag),
  :global(.chip),
  :global(.google),
  :global(.logout),
  :global(.btn.ghost) {
    color: var(--pill-text) !important;
    border-color: var(--line-strong) !important;
  }

  :global(.tag),
  :global(.chip),
  :global(.google),
  :global(.btn.ghost) {
    background: var(--pill-bg);
  }

  :global(.chip:hover),
  :global(.google:hover),
  :global(.btn.ghost:hover) {
    background: var(--pill-bg-hover);
  }

  :global(.chip.active),
  :global(.btn.primary) {
    background: var(--pill-active-bg);
    color: var(--pill-active-text) !important;
    border-color: var(--pill-active-bg) !important;
  }

  :global(.photo-frame),
  :global(.axis-bar-track),
  :global(.bar-track),
  :global(.score-card),
  :global(.tooltip-copy),
  :global(.warn-box) {
    background: var(--surface-soft) !important;
  }

  .gate {
    position: fixed;
    inset: 0;
    background: rgba(10, 10, 18, 0.85);
    display: grid;
    place-items: center;
    z-index: 100;
    backdrop-filter: blur(4px);
  }

  .card {
    padding: 36px;
    border-radius: 20px;
    max-width: 440px;
    margin: 16px;
    text-align: center;
  }

  .eyebrow {
    text-transform: uppercase;
    letter-spacing: 0.16em;
    font-size: 0.7rem;
    color: var(--muted);
    margin: 0 0 10px;
  }

  .card h2 { margin: 0 0 10px; }

  .card p { color: var(--muted); font-size: 0.95rem; margin: 0 0 20px; }

  .gate-actions { display: flex; flex-direction: column; gap: 12px; }

  .primary {
    background: var(--accent);
    color: var(--accent-contrast);
    border: none;
    padding: 13px 20px;
    border-radius: 999px;
    cursor: pointer;
    font-size: 1rem;
    font-weight: 600;
  }

  .exit { color: var(--muted); text-decoration: none; font-weight: 600; font-size: 0.9rem; }

  .topbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 18px 28px;
    position: sticky;
    top: 0;
    background: var(--surface);
    backdrop-filter: blur(10px);
    z-index: 10;
    border-bottom: 1px solid var(--line);
  }

  .brand {
    font-weight: 800;
    font-size: 1.05rem;
    text-decoration: none;
    color: var(--text);
    letter-spacing: -0.01em;
  }

  .desktop-nav,
  .mobile-nav { display: flex; gap: 20px; align-items: center; }

  .desktop-nav a,
  .mobile-nav a {
    text-decoration: none;
    color: var(--text);
    font-weight: 600;
    font-size: 0.95rem;
  }

  .desktop-nav a:hover,
  .mobile-nav a:hover { color: var(--accent); }

  .mobile-nav { display: none; }
  .mobile-utility-actions { display: none; }

  .mod-link { color: #7c3aed !important; }

  .logout {
    border: 1px solid var(--line-strong);
    background: transparent;
    padding: 6px 14px;
    border-radius: 999px;
    cursor: pointer;
    font-weight: 600;
    font-size: 0.9rem;
    color: var(--text);
    transition: background 120ms ease, border-color 120ms ease, color 120ms ease;
  }

  .logout:hover {
    background: var(--surface-soft);
    border-color: var(--accent);
    color: var(--accent);
  }

  @media (max-width: 640px) {
    :global(body) { padding-bottom: 88px; }
    .topbar {
      padding: 14px 18px;
      align-items: center;
      justify-content: space-between;
    }
    .mobile-utility-actions {
      display: flex;
      align-items: center;
      gap: 8px;
      margin-left: auto;
    }
    .mobile-utility-link,
    .mobile-utility-button {
      font-size: 0.78rem;
      padding: 5px 10px;
      border-radius: 999px;
      border: 1px solid var(--line-strong);
      background: var(--surface-solid);
      text-decoration: none;
      color: var(--text);
      white-space: nowrap;
    }
    .desktop-nav { display: none; }
    .mobile-nav {
      position: fixed;
      left: 0;
      right: 0;
      bottom: 0;
      z-index: 20;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 8px;
      padding: 10px 12px calc(10px + env(safe-area-inset-bottom));
      background: var(--surface);
      backdrop-filter: blur(14px);
      border-top: 1px solid var(--line);
    }
    .mobile-nav::-webkit-scrollbar { display: none; }
    .mobile-nav a {
      flex: 1 1 0;
      min-width: 0;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 4px;
      padding: 8px 6px;
      border-radius: 16px;
      font-size: 0.72rem;
      line-height: 1.1;
      color: var(--muted);
      background: transparent;
      transition: background 120ms ease, color 120ms ease, transform 120ms ease;
    }
    .mobile-nav a.active {
      background: var(--pill-active-bg);
      color: var(--pill-active-text);
      transform: translateY(-1px);
    }
    .mobile-tab-kicker {
      width: 26px;
      height: 26px;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      border-radius: 10px;
      background: rgba(23, 20, 31, 0.08);
      font-size: 0.95rem;
      font-weight: 800;
      letter-spacing: 0.04em;
    }
    .mobile-nav a.active .mobile-tab-kicker {
      background: rgba(255,255,255,0.18);
    }
    .brand { font-size: 0.95rem; }
  }
</style>
