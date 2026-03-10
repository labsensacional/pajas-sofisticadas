<script>
  import { goto } from '$app/navigation';
  import { hasFirebaseConfig } from '$lib/firebase/client.js';
  import { login, loginWithGoogle, register, resetPassword } from '$lib/auth.js';

  let email = '';
  let password = '';
  let mode = 'login';
  let message = '';
  let error = '';

  async function handleSubmit() {
    message = '';
    error = '';

    try {
      if (mode === 'login') {
        await login(email, password);
        message = 'Sesion iniciada.';
        goto('/archivo');
      } else {
        await register(email, password);
        message = 'Cuenta creada. Revisa tu email.';
        goto('/archivo');
      }
    } catch (err) {
      error = err?.message ?? 'Error inesperado.';
    }
  }

  async function handleGoogle() {
    message = '';
    error = '';

    try {
      await loginWithGoogle();
      message = 'Sesion iniciada con Google.';
      goto('/archivo');
    } catch (err) {
      error = err?.message ?? 'Error inesperado.';
    }
  }

  async function handleReset() {
    message = '';
    error = '';

    try {
      await resetPassword(email);
      message = 'Email de recuperacion enviado.';
    } catch (err) {
      error = err?.message ?? 'Error inesperado.';
    }
  }
</script>

<svelte:head>
  <title>Login · Pajas Sofisticadas</title>
</svelte:head>

<main class="page">
  <header class="header">
    <h1>{mode === 'login' ? 'Ingresar' : 'Crear cuenta'}</h1>
    <p>Acceso al archivo.</p>
  </header>

  {#if !hasFirebaseConfig}
    <div class="warning">
      <p>Firebase no esta configurado. Completa las variables en `.env`.</p>
    </div>
  {/if}

  <form class="form" on:submit|preventDefault={handleSubmit}>
    <label>
      Email
      <input type="email" bind:value={email} required />
    </label>
    <label>
      Contrasena
      <input type="password" bind:value={password} required />
    </label>

    <button type="submit" disabled={!hasFirebaseConfig}>
      {mode === 'login' ? 'Ingresar' : 'Crear cuenta'}
    </button>

    <button type="button" class="google" on:click={handleGoogle} disabled={!hasFirebaseConfig}>
      Entrar con Google
    </button>

    <div class="links">
      <button type="button" class="link" on:click={() => (mode = mode === 'login' ? 'register' : 'login')}>
        {mode === 'login' ? 'Crear cuenta' : 'Ya tengo cuenta'}
      </button>
      <button type="button" class="link" on:click={handleReset} disabled={!email}>
        Olvide mi contrasena
      </button>
    </div>

    {#if message}
      <p class="message">{message}</p>
    {/if}
    {#if error}
      <p class="error">{error}</p>
    {/if}
  </form>
</main>

<style>
  .page {
    max-width: 480px;
    margin: 0 auto;
    padding: 48px 24px;
  }

  .form {
    display: flex;
    flex-direction: column;
    gap: 16px;
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
    padding: 10px 18px;
    border-radius: 999px;
    border: none;
    background: #0c0c15;
    color: #fff;
  }

  .links {
    display: flex;
    justify-content: space-between;
  }

  .google {
    background: #fff;
    color: #0c0c15;
    border: 1px solid #0c0c15;
  }

  .link {
    background: none;
    border: none;
    color: #0c0c15;
    text-decoration: underline;
    padding: 0;
    cursor: pointer;
  }

  .message {
    color: #0b6b3a;
  }

  .error {
    color: #b91c1c;
  }

  .warning {
    background: #fff3d4;
    padding: 12px;
    border-radius: 12px;
    margin-bottom: 16px;
  }
</style>
