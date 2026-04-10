<script>
  // @ts-nocheck
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';
  import { db, auth, storage, hasFirebaseConfig } from '$lib/firebase/client.js';
  import { onAuthStateChanged } from 'firebase/auth';
  import { collection, getDocs, orderBy, query, serverTimestamp } from 'firebase/firestore';
  import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
  import { compressImage } from '$lib/compressImage.js';
  import { ACTIONS } from '$lib/actions.js';

  /** @type {any} */
  let user = null;
  let submitted = false;
  let loading = false;
  let uploading = false;
  let error = '';

  let title = '';
  let body = '';
  let tags_input = '';
  let tags = /** @type {string[]} */ ([]);
  let tag_field_value = '';
  /** @type {File[]} */
  let imageFiles = [];
  let accionSearch = '';
  let accionTags = /** @type {string[]} */ ([]);
  let communityActions = /** @type {any[]} */ ([]);
  let publishAnonymous = false;

  $: firestoreIds = new Set(communityActions.map((action) => action.id));
  $: actionCatalog = [...ACTIONS.filter((action) => !firestoreIds.has(action.id)), ...communityActions];

  onMount(() => {
    if (auth) {
      const unsubscribe = onAuthStateChanged(auth, v => { user = v; if (!v) goto('/login'); });
      loadCommunityActions();
      return unsubscribe;
    }
    loadCommunityActions();
  });

  async function loadCommunityActions() {
    if (!hasFirebaseConfig || !db) return;
    try {
      const snap = await getDocs(query(collection(db, 'acciones'), orderBy('createdAt', 'desc')));
      communityActions = snap.docs.map((docSnapshot) => ({ id: docSnapshot.id, ...docSnapshot.data() }));
    } catch (e) {
      console.error(e);
    }
  }

  // Action search: merge static + inline firestore names
  $: accionSuggestions = accionSearch.trim().length > 0
    ? actionCatalog.filter(a => a.name.toLowerCase().includes(accionSearch.toLowerCase()) && !accionTags.includes(a.id)).slice(0, 6)
    : [];

  function addAccionTag(id) { if (!accionTags.includes(id)) accionTags = [...accionTags, id]; accionSearch = ''; }
  function removeAccionTag(id) { accionTags = accionTags.filter(a => a !== id); }

  function handleTagKeydown(e) {
    if (e.key === ',' || e.key === 'Enter') {
      e.preventDefault();
      const v = tag_field_value.trim().toLowerCase();
      if (v && !tags.includes(v)) tags = [...tags, v];
      tag_field_value = '';
    } else if (e.key === 'Backspace' && !tag_field_value && tags.length) {
      tags = tags.slice(0, -1);
    }
  }

  function handleTagBlur() {
    const v = tag_field_value.trim().toLowerCase();
    if (v && !tags.includes(v)) tags = [...tags, v];
    tag_field_value = '';
  }

  function handleFiles(e) { imageFiles = Array.from(e.target.files ?? []).slice(0, 5); }

  async function handleSubmit() {
    if (!user || !hasFirebaseConfig || !db) return;
    if (!title.trim()) { error = 'El título es obligatorio.'; return; }
    loading = true; error = '';
    try {
      const currentUsername = auth?.currentUser?.displayName || user.displayName || user.email?.split('@')[0] || 'Usuario';
      const sesionRef = (await import('firebase/firestore')).doc(collection(db, 'sesiones'));
      const sesionId = sesionRef.id;
      const photos = [];
      if (imageFiles.length && storage) {
        uploading = true;
        for (const file of imageFiles) {
          const path = `sesiones/${sesionId}/${Date.now()}-${file.name.replace(/\s+/g, '-')}`;
          const storRef = ref(storage, path);
          const compressed = await compressImage(file);
          await uploadBytes(storRef, compressed, { contentType: 'image/jpeg' });
          photos.push(await getDownloadURL(storRef));
        }
        uploading = false;
      }
      await (await import('firebase/firestore')).setDoc(sesionRef, {
        title: title.trim(), body: body.trim(),
        photos, accionTags, tags,
        authorUid: user.uid,
        authorName: publishAnonymous ? 'Anónimo' : currentUsername,
        isAnonymous: publishAnonymous,
        saves: 0, reviewed: false,
        createdAt: serverTimestamp()
      });
      submitted = true;
    } catch (e) { error = e?.message ?? 'Error.'; }
    finally { loading = false; uploading = false; }
  }

  function accionName(id) { return actionCatalog.find(a => a.id === id)?.name ?? id; }
</script>

<svelte:head><title>Nueva sesión · Laboratorio Sensacional</title></svelte:head>

<main class="page">
  <a href="/sesiones" class="back">← Sesiones</a>
  <h1>Compartir una sesión</h1>

  {#if !user}
    <div class="warn">Necesitás <a href="/login">iniciar sesión</a> para publicar.</div>
  {:else if submitted}
    <div class="success">
      <p>Sesión publicada.</p>
      <div class="links">
        <a href="/sesiones" class="btn primary">Ver sesiones</a>
        <button class="btn ghost" on:click={() => { submitted = false; title = ''; body = ''; tags = []; accionTags = []; imageFiles = []; }}>Publicar otra</button>
      </div>
    </div>
  {:else}
    <form on:submit|preventDefault={handleSubmit}>
      <label>Título *
        <input type="text" bind:value={title} required placeholder="Un título descriptivo…" />
      </label>

      <label>Descripción / relato (opcional)
        <textarea rows="8" bind:value={body} placeholder="Describí la sesión en detalle — qué probaste, qué pasó, el estado antes y después…"></textarea>
      </label>

      <div class="field-group">
        <span class="field-label">Acciones usadas (opcional)</span>
        {#if accionTags.length}
          <div class="accion-chips">
            {#each accionTags as a}
              <span class="accion-tag">
                {accionName(a)}
                <button type="button" on:click={() => removeAccionTag(a)}>×</button>
              </span>
            {/each}
          </div>
        {/if}
        <input
          class="accion-search"
          type="text"
          placeholder="Buscar acción para agregar…"
          bind:value={accionSearch}
          autocomplete="off"
        />
        {#if accionSuggestions.length}
          <div class="suggestions">
            {#each accionSuggestions as a}
              <button type="button" on:mousedown|preventDefault={() => addAccionTag(a.id)}>{a.name}</button>
            {/each}
          </div>
        {/if}
      </div>

      <label>Tags (opcional) <small>Enter o coma para agregar</small>
        <div class="tag-input-box">
          {#each tags as t}
            <span class="tag-chip">{t} <button type="button" on:click={() => tags = tags.filter(x => x !== t)}>×</button></span>
          {/each}
          <input
            type="text"
            placeholder="tantra, porro, solo…"
            bind:value={tag_field_value}
            on:keydown={handleTagKeydown}
            on:blur={handleTagBlur}
          />
        </div>
      </label>

      <label class="checkbox-row">
        <input type="checkbox" bind:checked={publishAnonymous} />
        <span>Publicar como anónimo</span>
      </label>

      <label>Fotos (opcional) <small>Máximo 5</small>
        <input class="file-input" type="file" multiple accept="image/*" id="sesion-fotos" on:change={handleFiles} />
        <label for="sesion-fotos" class="upload-box">
          <span class="upload-kicker">Imagenes</span>
          <strong>{imageFiles.length ? `${imageFiles.length} archivo(s) listos` : 'Adjuntar fotos a la sesion'}</strong>
          <span>{imageFiles.length ? 'Podés volver a tocar para cambiarlas.' : 'Hace que el relato quede más claro. Hasta 5 imagenes.'}</span>
        </label>
      </label>

      {#if imageFiles.length}
        <div class="previews">
          {#each imageFiles as f}
            <img src={URL.createObjectURL(f)} alt={f.name} class="preview-img" />
          {/each}
        </div>
      {/if}

      {#if error}<p class="error">{error}</p>{/if}

      <button type="submit" class="submit" disabled={loading}>
        {uploading ? 'Subiendo fotos…' : loading ? 'Guardando…' : 'Publicar sesión'}
      </button>
    </form>
  {/if}
</main>

<style>
  .page { max-width: 720px; margin: 0 auto; padding: 48px 24px; }
  .back { display: inline-block; margin-bottom: 16px; text-decoration: none; color: #6b7280; font-weight: 600; font-size: 0.9rem; }
  h1 { margin: 0 0 24px; }

  form { display: flex; flex-direction: column; gap: 16px; }
  label { display: flex; flex-direction: column; gap: 5px; font-weight: 600; font-size: 0.9rem; }
  label small { font-weight: 400; color: #9ca3af; }
  .checkbox-row { flex-direction: row; align-items: center; gap: 10px; }
  .checkbox-row input { width: 16px; height: 16px; }
  input[type="text"], textarea { border: 1px solid rgba(12,12,21,0.15); border-radius: 10px; padding: 10px 12px; font: inherit; }
  textarea { resize: vertical; }

  .field-group { display: flex; flex-direction: column; gap: 6px; }
  .field-label { font-weight: 600; font-size: 0.9rem; }

  .accion-chips { display: flex; flex-wrap: wrap; gap: 6px; }
  .accion-search {
    border: 1px solid rgba(12,12,21,0.15); border-radius: 10px;
    padding: 10px 12px; font: inherit; width: 100%; box-sizing: border-box;
  }

  .tag-input-box {
    display: flex; flex-wrap: wrap; gap: 6px;
    border: 1px solid var(--line-strong); border-radius: 10px;
    padding: 8px 10px; background: var(--surface-solid); min-height: 44px;
  }
  .tag-input-box input { border: none; outline: none; font: inherit; flex: 1; min-width: 120px; padding: 2px; background: transparent; color: var(--text); }

  .accion-tag, .tag-chip {
    display: inline-flex; align-items: center; gap: 5px;
    padding: 3px 10px; border-radius: 999px; font-size: 0.82rem; font-weight: 600;
  }
  .accion-tag { background: #ede9fe; color: #5b21b6; }
  .tag-chip { background: var(--pill-bg); color: var(--pill-text); }
  .accion-tag button, .tag-chip button { background: none; border: none; cursor: pointer; font-size: 0.9rem; color: inherit; padding: 0; }

  .suggestions {
    display: flex; flex-wrap: wrap; gap: 6px;
  }
  .suggestions button {
    background: var(--pill-bg); border: 1px solid var(--line); padding: 5px 12px; border-radius: 999px;
    cursor: pointer; font-size: 0.82rem; font-weight: 600; color: var(--pill-text);
  }
  .suggestions button:hover { background: #ddd6fe; color: #5b21b6; }

  .previews { display: flex; gap: 10px; flex-wrap: wrap; }
  .preview-img { width: 100px; height: 100px; object-fit: cover; border-radius: 10px; }
  .file-input { position: absolute; opacity: 0; pointer-events: none; width: 1px; height: 1px; }
  .upload-box {
    display: flex;
    flex-direction: column;
    gap: 4px;
    padding: 16px 18px;
    border: 1.5px dashed var(--line-strong);
    border-radius: 16px;
    background: var(--surface-soft);
    color: var(--text);
    cursor: pointer;
    transition: border-color 120ms ease, transform 120ms ease, background 120ms ease;
  }
  .upload-box:hover {
    border-color: var(--accent);
    background: var(--surface-solid);
    transform: translateY(-1px);
  }
  .upload-kicker {
    text-transform: uppercase;
    letter-spacing: 0.08em;
    font-size: 0.72rem;
    color: var(--muted-soft);
  }
  .upload-box strong { font-size: 1rem; }
  .upload-box span:last-child { font-size: 0.84rem; color: var(--muted); font-weight: 400; }

  .submit {
    background: var(--accent);
    color: var(--accent-contrast);
    border: 1px solid var(--line-strong);
    box-shadow: 0 0 0 1px rgba(255,255,255,0.08), 0 10px 24px rgba(0,0,0,0.18);
    padding: 13px 24px;
    border-radius: 999px;
    cursor: pointer;
    font-weight: 700;
    font-size: 1rem;
    align-self: flex-start;
  }
  .submit:disabled { opacity: 0.5; }

  .error { color: #b91c1c; font-size: 0.9rem; }
  .warn { background: #fff3cd; padding: 12px 16px; border-radius: 10px; font-size: 0.9rem; }
  .success { background: #ecfdf5; padding: 24px; border-radius: 14px; }
  .success p { margin: 0 0 16px; }
  .links { display: flex; gap: 12px; }
  .btn { padding: 10px 20px; border-radius: 999px; text-decoration: none; font-weight: 700; cursor: pointer; font-size: 0.9rem; }
  .btn.primary { background: #0c0c15; color: #fff; border: none; }
  .btn.ghost { background: transparent; border: 1.5px solid rgba(12,12,21,0.2); color: #0c0c15; }
</style>
