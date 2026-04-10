<script>
  // @ts-nocheck
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';
  import { auth, hasFirebaseConfig } from '$lib/firebase/client.js';
  import { login, loginWithGoogle, register, resetPassword } from '$lib/auth.js';
  import { onAuthStateChanged } from 'firebase/auth';

  let email = '';
  let password = '';
  let mode = 'login'; // 'login' | 'register' | 'reset'
  let error = '';
  let notice = '';
  let loading = false;

  onMount(() => {
    if (auth) return onAuthStateChanged(auth, (u) => { if (u) goto('/'); });
  });

  async function handleSubmit() {
    error = ''; notice = ''; loading = true;
    try {
      if (mode === 'login') { await login(email, password); goto('/'); }
      else if (mode === 'register') { await register(email, password); goto('/'); }
      else { await resetPassword(email); notice = 'Email de recuperación enviado.'; }
    } catch (e) { error = e?.message ?? 'Error.'; }
    finally { loading = false; }
  }

  async function handleGoogle() {
    error = ''; loading = true;
    try { await loginWithGoogle(); goto('/'); }
    catch (e) { error = e?.message ?? 'Error.'; }
    finally { loading = false; }
  }
</script>

<svelte:head><title>Login · Laboratorio Sensacional</title></svelte:head>

<main class="page">
  <div class="card">
    <h1>{mode === 'reset' ? 'Recuperar contraseña' : mode === 'register' ? 'Crear cuenta' : 'Iniciar sesión'}</h1>

    {#if !hasFirebaseConfig}
      <div class="warn">Configura Firebase en el archivo .env</div>
    {/if}

    {#if notice}<p class="success">{notice}</p>{/if}
    {#if error}<p class="error">{error}</p>{/if}

    <form on:submit|preventDefault={handleSubmit}>
      <label>Email <input type="email" bind:value={email} required /></label>
      {#if mode !== 'reset'}
        <label>Contraseña <input type="password" bind:value={password} required /></label>
      {/if}
      <button type="submit" class="primary" disabled={loading}>
        {loading ? '...' : mode === 'reset' ? 'Enviar' : mode === 'register' ? 'Crear cuenta' : 'Entrar'}
      </button>
    </form>

    {#if mode !== 'reset'}
      <button class="google" on:click={handleGoogle} disabled={loading}>
        Entrar con Google
      </button>
    {/if}

    <div class="links">
      {#if mode === 'login'}
        <button class="link" on:click={() => mode = 'register'}>Crear cuenta</button>
        <button class="link" on:click={() => mode = 'reset'}>Olvidé mi contraseña</button>
      {:else}
        <button class="link" on:click={() => mode = 'login'}>Volver al login</button>
      {/if}
    </div>
  </div>
</main>

<style>
  .page { display: grid; place-items: center; min-height: calc(100vh - 70px); padding: 24px; }
  .card { background: #fff; border-radius: 20px; padding: 36px; width: 100%; max-width: 380px; box-shadow: 0 4px 24px rgba(0,0,0,0.07); }
  h1 { margin: 0 0 24px; font-size: 1.4rem; }
  form { display: flex; flex-direction: column; gap: 14px; }
  label { display: flex; flex-direction: column; gap: 5px; font-weight: 600; font-size: 0.9rem; }
  input { border: 1px solid rgba(12,12,21,0.15); border-radius: 10px; padding: 10px 12px; font: inherit; }
  .primary { background: #0c0c15; color: #fff; border: none; padding: 12px; border-radius: 999px; cursor: pointer; font-weight: 700; font-size: 0.95rem; }
  .google { width: 100%; margin-top: 10px; background: #fff; border: 1px solid rgba(12,12,21,0.2); padding: 11px; border-radius: 999px; cursor: pointer; font-weight: 600; font-size: 0.9rem; }
  .links { display: flex; gap: 16px; justify-content: center; margin-top: 16px; }
  .link { background: none; border: none; color: #6b7280; cursor: pointer; font-size: 0.85rem; text-decoration: underline; }
  .error { color: #b91c1c; font-size: 0.9rem; margin: 8px 0 0; }
  .success { color: #0b6b3a; font-size: 0.9rem; margin: 8px 0 0; }
  .warn { background: #fff3cd; padding: 10px; border-radius: 8px; font-size: 0.85rem; margin-bottom: 14px; }
</style>
