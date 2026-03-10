<script>
  import { onMount } from 'svelte';
  import { auth, db, hasFirebaseConfig } from '$lib/firebase/client.js';
  import {
    EmailAuthProvider,
    onAuthStateChanged,
    reauthenticateWithCredential,
    sendPasswordResetEmail,
    updatePassword
  } from 'firebase/auth';
  import { doc, getDoc, serverTimestamp, setDoc } from 'firebase/firestore';

  let user = null;
  let loading = true;
  let displayName = '';
  let message = '';
  let error = '';
  let passwordMessage = '';
  let passwordError = '';
  let currentPassword = '';
  let newPassword = '';

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

  async function savePassword() {
    if (!user || !auth) return;
    passwordMessage = '';
    passwordError = '';

    if (!user.email) {
      passwordError = 'No encontramos un email asociado.';
      return;
    }

    if (!newPassword || newPassword.length < 6) {
      passwordError = 'La nueva contraseña debe tener al menos 6 caracteres.';
      return;
    }

    try {
      const hasPasswordProvider = user.providerData?.some((p) => p.providerId === 'password');
      if (hasPasswordProvider) {
        if (!currentPassword) {
          passwordError = 'Ingresa tu contraseña actual.';
          return;
        }
        const credential = EmailAuthProvider.credential(user.email, currentPassword);
        await reauthenticateWithCredential(user, credential);
      }

      await updatePassword(user, newPassword);
      currentPassword = '';
      newPassword = '';
      passwordMessage = 'Contraseña actualizada.';
    } catch (err) {
      passwordError = err?.message ?? 'No se pudo actualizar la contraseña.';
    }
  }

  async function sendResetLink() {
    if (!user || !auth) return;
    passwordMessage = '';
    passwordError = '';

    if (!user.email) {
      passwordError = 'No encontramos un email asociado.';
      return;
    }

    try {
      await sendPasswordResetEmail(auth, user.email);
      passwordMessage = 'Te enviamos un email para crear o cambiar la contraseña.';
    } catch (err) {
      passwordError = err?.message ?? 'No se pudo enviar el email.';
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
    <div class="card">
      <h2>Seguridad</h2>
      <p class="hint">Puedes cambiar tu contraseña o crear una si entraste con Google.</p>
      {#if user.providerData?.some((p) => p.providerId === 'password')}
        <label>
          Contraseña actual
          <input type="password" bind:value={currentPassword} />
        </label>
      {/if}
      <label>
        Nueva contraseña
        <input type="password" bind:value={newPassword} />
      </label>
      <div class="actions">
        <button on:click={savePassword}>Guardar contraseña</button>
        <button class="ghost" on:click={sendResetLink}>Enviar link por email</button>
      </div>
      {#if passwordMessage}
        <p class="message">{passwordMessage}</p>
      {/if}
      {#if passwordError}
        <p class="error">{passwordError}</p>
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
    margin-bottom: 16px;
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
    cursor: pointer;
  }

  .actions {
    display: flex;
    gap: 10px;
    flex-wrap: wrap;
  }

  .ghost {
    background: transparent;
    color: #0c0c15;
    border: 1px solid #0c0c15;
  }

  h2 {
    margin: 0;
  }

  .hint {
    margin: 0;
    color: #4b5563;
    font-size: 0.92rem;
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
