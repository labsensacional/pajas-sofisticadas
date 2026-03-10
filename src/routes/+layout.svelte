<script>
  import { onMount } from 'svelte';
  import { onAuthStateChanged, signOut } from 'firebase/auth';
  import { auth, db, hasFirebaseConfig } from '$lib/firebase/client.js';
  import { hasPrefetched } from '$lib/feedCache.js';
  import { prefetchRecent } from '$lib/prefetch.js';
  import { confirmAgeGate, isAgeGateConfirmed } from '$lib/ageGate.js';

  let showGate = true;
  let user = null;

  onMount(() => {
    showGate = !isAgeGateConfirmed();
    if (auth) {
      return onAuthStateChanged(auth, (value) => {
        user = value;
        if (user && hasFirebaseConfig && db && !hasPrefetched()) {
          prefetchRecent(db).catch(() => {});
        }
      });
    }
  });

  function handleConfirm() {
    confirmAgeGate();
    showGate = false;
  }

  async function handleLogout() {
    if (!auth) return;
    await signOut(auth);
  }
</script>

{#if showGate}
  <div class="gate">
    <div class="card">
      <p class="eyebrow">Acceso +18</p>
      <h2>Este archivo contiene contenido adulto.</h2>
      <p>Confirma que tienes 18+ para continuar.</p>
      <div class="actions">
        <button class="primary" on:click={handleConfirm}>Soy mayor de 18</button>
        <a class="exit" href="https://www.google.com" rel="noreferrer">Salir</a>
      </div>
    </div>
  </div>
{/if}

<header class="topbar">
  <a class="brand" href="/">Pajas Sofisticadas</a>
  <nav>
    <a href="/archivo">Archivo</a>
    {#if user}
      <a href="/publicar">Publicar</a>
      <a href="/mis-posts">Mis posts</a>
      <a href="/listas">Mis listas</a>
      <a href="/perfil">Perfil</a>
      <button on:click={handleLogout}>Salir</button>
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
    background: rgba(10, 10, 18, 0.7);
    display: grid;
    place-items: center;
    z-index: 10;
  }

  .card {
    background: white;
    padding: 32px;
    border-radius: 20px;
    max-width: 420px;
    margin: 16px;
    text-align: center;
    box-shadow: 0 24px 60px rgba(0, 0, 0, 0.2);
  }

  .eyebrow {
    text-transform: uppercase;
    letter-spacing: 0.16em;
    font-size: 0.7rem;
    margin: 0 0 12px;
  }

  .actions {
    display: flex;
    flex-direction: column;
    gap: 12px;
    margin-top: 20px;
  }

  .primary {
    background: #0c0c15;
    color: #fff;
    border: none;
    padding: 12px 20px;
    border-radius: 999px;
    cursor: pointer;
  }

  .exit {
    color: #0c0c15;
    text-decoration: none;
    font-weight: 600;
  }

  .topbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px 24px;
    gap: 12px;
    position: sticky;
    top: 0;
    background: rgba(255, 255, 255, 0.75);
    backdrop-filter: blur(8px);
    z-index: 5;
  }

  .brand {
    font-weight: 700;
    text-decoration: none;
    color: #0c0c15;
  }

  nav {
    display: flex;
    gap: 16px;
    align-items: center;
  }

  nav a {
    text-decoration: none;
    color: #0c0c15;
    font-weight: 600;
  }

  nav button {
    border: 1px solid #0c0c15;
    background: transparent;
    padding: 6px 14px;
    border-radius: 999px;
    cursor: pointer;
  }
</style>
