<script>
  // @ts-nocheck
  import { onMount } from 'svelte';
  import { signOut, onAuthStateChanged } from 'firebase/auth';
  import { auth, hasFirebaseConfig } from '$lib/firebase/client.js';
  import { confirmAgeGate, isAgeGateConfirmed } from '$lib/ageGate.js';
  import { ensureUserProfile } from '$lib/auth.js';
  import { isMod } from '$lib/moderator.js';

  let showGate = true;
  let user = null;

  onMount(() => {
    showGate = !isAgeGateConfirmed();
    if (auth) {
      return onAuthStateChanged(auth, async (v) => {
        if (v && hasFirebaseConfig) {
          await ensureUserProfile(v);
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

{#if showGate}
  <div class="gate">
    <div class="card">
      <p class="eyebrow">Acceso +18</p>
      <h2>Contenido para adultos</h2>
      <p>Este sitio contiene material explícito sobre sexualidad y prácticas de alto arousal.</p>
      <div class="gate-actions">
        <button class="primary" on:click={handleConfirm}>Tengo 18 años o más</button>
        <a class="exit" href="https://www.google.com" rel="noreferrer">Salir</a>
      </div>
    </div>
  </div>
{/if}

<header class="topbar">
  <a class="brand" href="/">Laboratorio Sensacional</a>
  <nav>
    <a href="/teoria">Teoría</a>
    <a href="/acciones">Acciones</a>
    <a href="/sesiones">Sesiones</a>
    {#if user}
      <a href="/perfil">Perfil</a>
      {#if isMod(user)}
        <a href="/admin/promote" class="mod-link">Admin</a>
      {/if}
      <button class="logout" on:click={handleLogout}>Salir</button>
    {:else}
      <a href="/login">Login</a>
    {/if}
  </nav>
</header>

<slot />

<style>
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
    background: #fff;
    padding: 36px;
    border-radius: 20px;
    max-width: 440px;
    margin: 16px;
    text-align: center;
    box-shadow: 0 24px 60px rgba(0, 0, 0, 0.3);
  }

  .eyebrow {
    text-transform: uppercase;
    letter-spacing: 0.16em;
    font-size: 0.7rem;
    color: #6b7280;
    margin: 0 0 10px;
  }

  .card h2 { margin: 0 0 10px; }

  .card p { color: #4b5563; font-size: 0.95rem; margin: 0 0 20px; }

  .gate-actions { display: flex; flex-direction: column; gap: 12px; }

  .primary {
    background: #0c0c15;
    color: #fff;
    border: none;
    padding: 13px 20px;
    border-radius: 999px;
    cursor: pointer;
    font-size: 1rem;
    font-weight: 600;
  }

  .exit { color: #6b7280; text-decoration: none; font-weight: 600; font-size: 0.9rem; }

  .topbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 18px 28px;
    position: sticky;
    top: 0;
    background: rgba(255, 255, 255, 0.82);
    backdrop-filter: blur(10px);
    z-index: 10;
    border-bottom: 1px solid rgba(0, 0, 0, 0.06);
  }

  .brand {
    font-weight: 800;
    font-size: 1.05rem;
    text-decoration: none;
    color: #0c0c15;
    letter-spacing: -0.01em;
  }

  nav { display: flex; gap: 20px; align-items: center; }

  nav a {
    text-decoration: none;
    color: #374151;
    font-weight: 600;
    font-size: 0.95rem;
  }

  nav a:hover { color: #0c0c15; }

  .mod-link { color: #7c3aed !important; }

  .logout {
    border: 1px solid rgba(12, 12, 21, 0.2);
    background: transparent;
    padding: 6px 14px;
    border-radius: 999px;
    cursor: pointer;
    font-weight: 600;
    font-size: 0.9rem;
    color: #374151;
  }

  @media (max-width: 640px) {
    .topbar { flex-direction: column; align-items: flex-start; gap: 12px; padding: 14px 18px; }
    nav { flex-wrap: wrap; gap: 12px; }
    .brand { font-size: 0.95rem; }
  }
</style>
