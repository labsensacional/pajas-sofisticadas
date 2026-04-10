<script>
  // @ts-nocheck
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';
  import { onAuthStateChanged } from 'firebase/auth';
  import { collection, doc, getDoc, getDocs, query, where } from 'firebase/firestore';
  import { findStatic } from '$lib/actions.js';
  import { auth, db, hasFirebaseConfig } from '$lib/firebase/client.js';
  import { ensureUserProfile, updateCurrentUserPassword, updateDisplayName } from '$lib/auth.js';
  import { applyTheme, persistTheme, resolveTheme } from '$lib/theme.js';

  let user = null;
  let loading = true;
  let loadingSaved = true;
  let saving = false;
  let savingPassword = false;
  let publicName = '';
  let newPassword = '';
  let confirmPassword = '';
  let notice = '';
  let error = '';
  let savedActions = [];
  let savedSessions = [];
  let accountPanelOpen = false;
  let appearancePanelOpen = false;
  let savedPanelOpen = false;
  let theme = 'light';

  $: hasPasswordProvider = Boolean(user?.providerData?.some((provider) => provider.providerId === 'password'));

  onMount(() => {
    theme = resolveTheme();

    if (!auth) {
      loading = false;
      return;
    }

    return onAuthStateChanged(auth, async (value) => {
      if (!value) {
        goto('/login');
        return;
      }

      await ensureUserProfile(value);
      user = auth.currentUser ?? value;
      publicName = user.displayName || '';
      await loadSavedContent(user.uid);
      loading = false;
    });
  });

  async function loadSavedContent(uid) {
    loadingSaved = true;
    savedActions = [];
    savedSessions = [];

    if (!hasFirebaseConfig || !db) {
      loadingSaved = false;
      return;
    }

    try {
      const snap = await getDocs(query(collection(db, 'saves'), where('uid', '==', uid)));
      const saves = snap.docs.map((entry) => entry.data());

      const savedActionIds = [...new Set(saves.filter((entry) => entry.parentType === 'accion').map((entry) => entry.parentId))];
      const savedSessionIds = [...new Set(saves.filter((entry) => entry.parentType === 'sesion').map((entry) => entry.parentId))];

      savedActions = await Promise.all(savedActionIds.map(async (id) => {
        const staticAction = findStatic(id);
        if (staticAction) return staticAction;

        const actionSnap = await getDoc(doc(db, 'acciones', id));
        return actionSnap.exists() ? { id: actionSnap.id, ...actionSnap.data() } : null;
      })).then((items) => items.filter(Boolean));

      savedSessions = await Promise.all(savedSessionIds.map(async (id) => {
        const sessionSnap = await getDoc(doc(db, 'sesiones', id));
        return sessionSnap.exists() ? { id: sessionSnap.id, ...sessionSnap.data() } : null;
      })).then((items) => items.filter(Boolean));
    } catch (e) {
      error = e?.message ?? 'No se pudieron cargar tus guardados.';
    } finally {
      loadingSaved = false;
    }
  }

  async function saveUsername() {
    const nextUsername = publicName.trim();
    if (!nextUsername) {
      error = 'El nombre público no puede estar vacío.';
      return;
    }

    saving = true;
    error = '';
    notice = '';

    try {
      await updateDisplayName(nextUsername);
      user = auth.currentUser ?? user;
      notice = 'Nombre público actualizado.';
    } catch (e) {
      error = e?.message ?? 'No se pudo actualizar el nombre público.';
    } finally {
      saving = false;
    }
  }

  async function savePassword() {
    if (newPassword.length < 6) {
      error = 'La contraseña debe tener al menos 6 caracteres.';
      return;
    }

    if (newPassword !== confirmPassword) {
      error = 'Las contraseñas no coinciden.';
      return;
    }

    savingPassword = true;
    error = '';
    notice = '';

    try {
      await updateCurrentUserPassword(newPassword);
      newPassword = '';
      confirmPassword = '';
      notice = hasPasswordProvider
        ? 'Contraseña actualizada.'
        : 'Contraseña definida para esta cuenta.';
    } catch (e) {
      error = e?.code === 'auth/requires-recent-login'
        ? 'Por seguridad, cerrá sesión y volvé a entrar antes de cambiar la contraseña.'
        : (e?.message ?? 'No se pudo actualizar la contraseña.');
    } finally {
      savingPassword = false;
    }
  }

  function toggleTheme() {
    theme = theme === 'dark' ? 'light' : 'dark';
    persistTheme(theme);
    applyTheme(theme);
  }
</script>

<svelte:head><title>Perfil · Laboratorio Sensacional</title></svelte:head>

<main class="page">
  <a href="/" class="back">← Inicio</a>
  <h1>Perfil</h1>

  {#if loading}
    <p class="hint">Cargando…</p>
  {:else if user}
    <div class="card">
      <section class="panel">
        <button class="panel-toggle" on:click={() => accountPanelOpen = !accountPanelOpen} aria-expanded={accountPanelOpen}>
          <div>
            <h2>Cuenta</h2>
            <p class="subtle">Nombre Público y contraseña</p>
          </div>
          <span class="panel-icon">{accountPanelOpen ? '−' : '+'}</span>
        </button>

        {#if accountPanelOpen}
          <div class="panel-content">
            <section class="block">
              <h3>Nombre Público</h3>
              <p class="subtle">Si todavía no elegiste uno, la cuenta recibe uno aleatorio. Podés cambiarlo siempre.</p>
              <label>
                <span>Nombre Público</span>
                <input type="text" bind:value={publicName} placeholder="Cómo querés aparecer" />
              </label>
              <button class="primary" on:click={saveUsername} disabled={saving}>
                {saving ? 'Guardando…' : 'Guardar nombre público'}
              </button>
            </section>

            <section class="block">
              <h3>{hasPasswordProvider ? 'Cambiar contraseña' : 'Definir contraseña'}</h3>
              <p class="subtle">
                {#if hasPasswordProvider}
                  Cambiala directamente desde esta página.
                {:else}
                  Si entraste con Google, podés definir una contraseña acá y después entrar también con email.
                {/if}
              </p>
              <label>
                <span>Nueva contraseña</span>
                <input type="password" bind:value={newPassword} placeholder="Mínimo 6 caracteres" />
              </label>
              <label>
                <span>Repetir contraseña</span>
                <input type="password" bind:value={confirmPassword} placeholder="Repetí la contraseña" />
              </label>
              <button class="secondary" on:click={savePassword} disabled={savingPassword}>
                {savingPassword ? 'Guardando…' : hasPasswordProvider ? 'Cambiar contraseña' : 'Definir contraseña'}
              </button>
            </section>
          </div>
        {/if}
      </section>

      <section class="panel">
        <button class="panel-toggle" on:click={() => appearancePanelOpen = !appearancePanelOpen} aria-expanded={appearancePanelOpen}>
          <div>
            <h2>Apariencia</h2>
            <p class="subtle">Modo claro u oscuro</p>
          </div>
          <span class="panel-icon">{appearancePanelOpen ? '−' : '+'}</span>
        </button>

        {#if appearancePanelOpen}
          <div class="panel-content">
            <section class="block">
              <h3>Tema</h3>
              <p class="subtle">Elegí si querés usar el sitio en modo claro u oscuro.</p>
              <button class="secondary theme-toggle" on:click={toggleTheme}>
                {theme === 'dark' ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
              </button>
            </section>
          </div>
        {/if}
      </section>

      <section class="panel">
        <button class="panel-toggle" on:click={() => savedPanelOpen = !savedPanelOpen} aria-expanded={savedPanelOpen}>
          <div>
            <h2>Guardados</h2>
            <p class="subtle">Acciones y sesiones guardadas</p>
          </div>
          <span class="panel-icon">{savedPanelOpen ? '−' : '+'}</span>
        </button>

        {#if savedPanelOpen}
          <div class="panel-content">
            <div class="saved-header">
              <div class="saved-links">
                <a href="#acciones-guardadas" class="pill-link">Acciones ({savedActions.length})</a>
                <a href="#sesiones-guardadas" class="pill-link">Sesiones ({savedSessions.length})</a>
              </div>
            </div>

            {#if loadingSaved}
              <p class="subtle">Cargando guardados…</p>
            {:else}
              <div class="saved-grid">
                <div class="saved-column" id="acciones-guardadas">
                  <h3>Acciones guardadas</h3>
                  {#if savedActions.length === 0}
                    <p class="subtle">Todavía no guardaste acciones.</p>
                  {:else}
                    <div class="saved-list">
                      {#each savedActions as action}
                        <a href="/acciones/{action.id}" class="saved-item">
                          <strong>{action.name}</strong>
                          {#if action.description}<span>{action.description.slice(0, 90)}{action.description.length > 90 ? '…' : ''}</span>{/if}
                        </a>
                      {/each}
                    </div>
                  {/if}
                </div>

                <div class="saved-column" id="sesiones-guardadas">
                  <h3>Sesiones guardadas</h3>
                  {#if savedSessions.length === 0}
                    <p class="subtle">Todavía no guardaste sesiones.</p>
                  {:else}
                    <div class="saved-list">
                      {#each savedSessions as session}
                        <a href="/sesiones/{session.id}" class="saved-item">
                          <strong>{session.title}</strong>
                          {#if session.body}<span>{session.body.slice(0, 90)}{session.body.length > 90 ? '…' : ''}</span>{/if}
                        </a>
                      {/each}
                    </div>
                  {/if}
                </div>
              </div>
            {/if}
          </div>
        {/if}
      </section>

      {#if notice}<p class="notice">{notice}</p>{/if}
      {#if error}<p class="error">{error}</p>{/if}
    </div>
  {/if}
</main>

<style>
  .page { max-width: 720px; margin: 0 auto; padding: 48px 24px; }
  .back { display: inline-block; margin-bottom: 16px; text-decoration: none; color: var(--muted); font-weight: 600; font-size: 0.9rem; }
  h1 { margin: 0 0 24px; }
  .hint { color: var(--muted-soft); }

  .card {
    background: var(--surface-solid);
    border: 1px solid var(--line);
    border-radius: 18px;
    padding: 28px;
    display: flex;
    flex-direction: column;
    gap: 24px;
    box-shadow: var(--shadow);
  }

  .panel {
    border: 1px solid var(--line);
    border-radius: 16px;
    background: var(--surface-soft);
  }

  .panel-toggle {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 16px;
    background: transparent;
    border: none;
    padding: 20px 22px;
    text-align: left;
    cursor: pointer;
  }

  .panel-icon {
    font-size: 1.4rem;
    line-height: 1;
    color: var(--muted);
  }

  .panel-content {
    padding: 0 22px 22px;
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  .block { display: flex; flex-direction: column; gap: 12px; }
  .block h3 { margin: 0; font-size: 0.95rem; }
  .subtle { margin: 0; color: var(--muted); line-height: 1.5; }

  .saved-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    gap: 16px;
    flex-wrap: wrap;
  }

  .saved-links { display: flex; gap: 8px; flex-wrap: wrap; }
  .pill-link {
    text-decoration: none;
    padding: 8px 12px;
    border-radius: 999px;
    background: var(--pill-bg);
    color: var(--pill-text);
    font-weight: 600;
    font-size: 0.85rem;
    border: 1px solid var(--line);
  }

  .saved-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
    gap: 16px;
  }

  .saved-column { display: flex; flex-direction: column; gap: 10px; }
  .saved-list { display: flex; flex-direction: column; gap: 8px; }
  .saved-item {
    display: flex;
    flex-direction: column;
    gap: 4px;
    text-decoration: none;
    color: inherit;
    border: 1px solid var(--line);
    border-radius: 12px;
    padding: 12px 14px;
    background: var(--surface-solid);
  }
  .saved-item strong { font-size: 0.92rem; }
  .saved-item span { color: var(--muted); font-size: 0.82rem; line-height: 1.4; }

  label { display: flex; flex-direction: column; gap: 6px; font-weight: 600; font-size: 0.9rem; }
  input {
    border: 1px solid rgba(12,12,21,0.15);
    border-radius: 10px;
    padding: 10px 12px;
    font: inherit;
  }

  button {
    width: fit-content;
    border: none;
    border-radius: 999px;
    padding: 12px 18px;
    font: inherit;
    font-weight: 700;
    cursor: pointer;
  }
  button:disabled { opacity: 0.6; cursor: default; }
  .primary { background: var(--pill-active-bg); color: var(--pill-active-text); }
  .secondary { background: var(--pill-bg); color: var(--pill-text); border: 1px solid var(--line); }
  .theme-toggle { align-self: flex-start; }

  .notice { margin: 0; color: #047857; background: #ecfdf5; padding: 10px 12px; border-radius: 10px; }
  .error { margin: 0; color: #b91c1c; background: #fee2e2; padding: 10px 12px; border-radius: 10px; }
</style>
