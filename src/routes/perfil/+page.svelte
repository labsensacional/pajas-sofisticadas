<script>
  import { onMount } from 'svelte';
  import { auth, db, hasFirebaseConfig } from '$lib/firebase/client.js';
  import { onAuthStateChanged } from 'firebase/auth';
  import { doc, getDoc, serverTimestamp, setDoc } from 'firebase/firestore';

  let user = null;
  let loading = true;
  let displayName = '';
  let message = '';
  let error = '';

  onMount(() => {
    if (!hasFirebaseConfig) {
      loading = false;
      return;
    }

    if (auth) {
      return onAuthStateChanged(auth, async (value) => {
        user = value;
        if (user) {
          await loadProfile();
        }
        loading = false;
      });
    }
  });

  async function loadProfile() {
    if (!user) return;
    const snap = await getDoc(doc(db, 'users', user.uid));
    if (snap.exists()) {
      displayName = snap.data().displayName ?? '';
    } else {
      displayName = user.email?.split('@')[0] ?? '';
    }
  }

  async function saveProfile() {
    if (!user) return;
    message = '';
    error = '';

    const name = displayName.trim();
    if (!name) {
      error = 'El nombre de usuario no puede quedar vacio.';
      return;
    }

    try {
      await setDoc(
        doc(db, 'users', user.uid),
        {
          displayName: name,
          updatedAt: serverTimestamp()
        },
        { merge: true }
      );
      message = 'Nombre actualizado.';
    } catch (err) {
      error = err?.message ?? 'No se pudo guardar.';
    }
  }
</script>

<svelte:head>
  <title>Perfil · Pajas Sofisticadas</title>
</svelte:head>

<main class="page">
  <header class="header">
    <h1>Perfil</h1>
    <p>Edita tu nombre de usuario visible en posts no anonimos.</p>
  </header>

  {#if !hasFirebaseConfig}
    <div class="warning">Completa `.env` con Firebase.</div>
  {:else if !user}
    <div class="warning">Inicia sesion para editar tu perfil. <a href="/login">Login</a></div>
  {:else if loading}
    <p>Cargando...</p>
  {:else}
    <div class="card">
      <label>
        Nombre de usuario
        <input type="text" bind:value={displayName} />
      </label>
      <button on:click={saveProfile}>Guardar cambios</button>
      {#if message}
        <p class="message">{message}</p>
      {/if}
      {#if error}
        <p class="error">{error}</p>
      {/if}
    </div>
    <div class="links">
      <a href="/mis-posts">Ver mis posts</a>
      <a href="/listas">Ver mis listas</a>
    </div>
  {/if}
</main>

<style>
  .page {
    max-width: 640px;
    margin: 0 auto;
    padding: 40px 24px;
  }

  .header {
    margin-bottom: 20px;
  }

  .card {
    background: rgba(255, 255, 255, 0.85);
    padding: 20px;
    border-radius: 16px;
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  label {
    display: flex;
    flex-direction: column;
    gap: 6px;
    font-weight: 600;
  }

  input {
    border: 1px solid rgba(12, 12, 21, 0.2);
    border-radius: 12px;
    padding: 10px 12px;
    font: inherit;
  }

  button {
    align-self: flex-start;
    border: none;
    background: #0c0c15;
    color: #fff;
    padding: 8px 16px;
    border-radius: 999px;
  }

  .links {
    margin-top: 16px;
    display: flex;
    gap: 16px;
  }

  .links a {
    color: #0c0c15;
    font-weight: 600;
    text-decoration: none;
  }

  .warning {
    background: #fff3d4;
    padding: 12px;
    border-radius: 12px;
    margin-bottom: 16px;
  }

  .message {
    color: #0b6b3a;
  }

  .error {
    color: #b91c1c;
  }
</style>
