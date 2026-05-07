<script>
  // @ts-nocheck
  import { onMount } from 'svelte';
  import { page } from '$app/stores';
  import { goto } from '$app/navigation';
  import { db, auth, storage, hasFirebaseConfig } from '$lib/firebase/client.js';
  import { onAuthStateChanged } from 'firebase/auth';
  import { doc, getDoc, serverTimestamp, updateDoc } from 'firebase/firestore';
  import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
  import { compressImage } from '$lib/compressImage.js';
  import { getPracticeName, listPractices } from '$lib/practiceCatalog.js';
  import { isMod } from '$lib/moderator.js';
  import { t } from '$lib/i18n.js';

  /** @type {any} */
  let user = null;
  /** @type {any} */
  let sesion = null;
  let loading = true;
  let saving = false;
  let uploading = false;
  let error = '';

  let title = '';
  let body = '';
  /** @type {string[]} */
  let tags = [];
  let tag_field_value = '';
  /** @type {string[]} */
  let accionTags = [];
  let accionSearch = '';
  /** @type {File[]} */
  let imageFiles = [];
  /** @type {string[]} */
  let existingPhotos = [];
  let practiceCatalog = /** @type {any[]} */ ([]);
  let publishAnonymous = false;

  $: id = $page.params.id;

  onMount(() => {
    if (auth) onAuthStateChanged(auth, async v => {
      user = v;
      if (!v) { goto('/login'); return; }
      if (db) await loadSesion();
    });
    loadCommunityActions();
  });

  async function loadCommunityActions() {
    try {
      practiceCatalog = await listPractices({ db: hasFirebaseConfig ? db : null });
    } catch (e) {
      console.error(e);
    }
  }

  async function loadSesion() {
    loading = true;
    try {
      const snap = await getDoc(doc(db, 'sesiones', id));
      if (!snap.exists()) { error = 'Sesión no encontrada.'; loading = false; return; }
      sesion = { id: snap.id, ...snap.data() };
      if (!isMod(user) && sesion.authorUid !== user.uid) {
        goto(`/sesiones/${id}`); return;
      }
      title = sesion.title ?? '';
      body = sesion.body ?? '';
      tags = sesion.tags ?? [];
      accionTags = sesion.accionTags ?? [];
      existingPhotos = sesion.photos ?? [];
      publishAnonymous = Boolean(sesion.isAnonymous);
    } catch (e) { error = e?.message ?? 'Error al cargar.'; }
    loading = false;
  }

  $: accionSuggestions = accionSearch.trim().length > 0
    ? practiceCatalog.filter(a => a.name.toLowerCase().includes(accionSearch.toLowerCase()) && !accionTags.includes(a.id)).slice(0, 6)
    : [];

  function addAccionTag(aid) { if (!accionTags.includes(aid)) accionTags = [...accionTags, aid]; accionSearch = ''; }
  function removeAccionTag(aid) { accionTags = accionTags.filter(a => a !== aid); }
  function accionName(aid) { return getPracticeName(aid, practiceCatalog); }

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
  function removeExistingPhoto(url) { existingPhotos = existingPhotos.filter(p => p !== url); }

  async function handleSubmit() {
    if (!user || !db) return;
    if (!title.trim()) { error = $t('sesion_form.required'); return; }
    saving = true; error = '';
    try {
      const currentUsername = auth?.currentUser?.displayName || user.displayName || user.email?.split('@')[0] || $t('common.user');
      let photos = [...existingPhotos];
      if (imageFiles.length && storage) {
        uploading = true;
        for (const file of imageFiles) {
          const path = `sesiones/${id}/${Date.now()}-${file.name.replace(/\s+/g, '-')}`;
          const storRef = ref(storage, path);
          const compressed = await compressImage(file);
          await uploadBytes(storRef, compressed, { contentType: 'image/jpeg' });
          photos.push(await getDownloadURL(storRef));
        }
        uploading = false;
      }
      await updateDoc(doc(db, 'sesiones', id), {
        title: title.trim(), body: body.trim(),
        photos, accionTags, tags,
        authorName: publishAnonymous ? '' : currentUsername,
        isAnonymous: publishAnonymous,
        updatedAt: serverTimestamp()
      });
      goto(`/sesiones/${id}`);
    } catch (e) { error = e?.message ?? 'Error.'; saving = false; uploading = false; }
  }
</script>

<svelte:head><title>Editar sesión · Laboratorio Sensacional</title></svelte:head>

<main class="page">
  <a href="/sesiones/{id}" class="back">{$t('sesion.back')}</a>
  <h1>{$t('sesion_form.title.edit')}</h1>

  {#if loading}
    <p class="hint">{$t('sesion.loading')}</p>
  {:else if error && !sesion}
    <p class="error">{error}</p>
  {:else if sesion}
    <form on:submit|preventDefault={handleSubmit}>
      <label>{$t('sesion_form.title_field')}
        <input type="text" bind:value={title} required placeholder={$t('sesion_form.title_field.placeholder')} />
      </label>

      <label>{$t('sesion_form.body')}
        <textarea rows="8" bind:value={body} placeholder={$t('sesion_form.body.placeholder')}></textarea>
      </label>

      <div class="field-group">
        <span class="field-label">{$t('sesion_form.acciones')}</span>
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
          placeholder={$t('sesion_form.acciones.placeholder')}
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

      <label>{$t('sesion_form.tags')}
        <div class="tag-input-box">
          {#each tags as tag}
            <span class="tag-chip">{tag} <button type="button" on:click={() => tags = tags.filter(x => x !== tag)}>×</button></span>
          {/each}
          <input
            type="text"
            placeholder={$t('sesion_form.tags.placeholder')}
            bind:value={tag_field_value}
            on:keydown={handleTagKeydown}
            on:blur={handleTagBlur}
          />
        </div>
      </label>

      <label class="checkbox-row">
        <input type="checkbox" bind:checked={publishAnonymous} />
        <span>{$t('sesion_form.anonymous')}</span>
      </label>

      {#if existingPhotos.length}
        <div class="field-group">
          <span class="field-label">{$t('sesion_form.existing_photos')}</span>
          <div class="existing-photos">
            {#each existingPhotos as p}
              <div class="existing-photo">
                <img src={p} alt="" />
                <button type="button" class="remove-photo" on:click={() => removeExistingPhoto(p)}>×</button>
              </div>
            {/each}
          </div>
        </div>
      {/if}

      <label>{$t('sesion_form.photos')} <small>{$t('accion_form.photos.hint')}</small>
        <input class="file-input" type="file" multiple accept="image/*" id="editar-sesion-fotos" on:change={handleFiles} />
        <label for="editar-sesion-fotos" class="upload-box">
          <span class="upload-kicker">{$t('sesion_form.photos.label')}</span>
          <strong>{imageFiles.length ? $t('sesion_form.photos.selected', { count: imageFiles.length }) : $t('sesion_form.photos.choose')}</strong>
          <span>{imageFiles.length ? $t('sesion_form.photos.replace') : $t('sesion_form.photos.info')}</span>
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

      <button type="submit" class="submit" disabled={saving}>
        {uploading ? $t('sesion_form.submit.uploading') : saving ? $t('sesion_form.submit.loading') : $t('sesion_form.submit.edit')}
      </button>
    </form>
  {/if}
</main>

<style>
  .page { max-width: 720px; margin: 0 auto; padding: 48px 24px; }
  .back { display: inline-block; margin-bottom: 16px; text-decoration: none; color: #6b7280; font-weight: 600; font-size: 0.9rem; }
  h1 { margin: 0 0 24px; }
  .hint { color: #9ca3af; }

  form { display: flex; flex-direction: column; gap: 16px; }
  label { display: flex; flex-direction: column; gap: 5px; font-weight: 600; font-size: 0.9rem; }
  label small { font-weight: 400; color: #9ca3af; }
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

  .suggestions { display: flex; flex-wrap: wrap; gap: 6px; }
  .suggestions button {
    background: var(--pill-bg); border: 1px solid var(--line); padding: 5px 12px; border-radius: 999px;
    cursor: pointer; font-size: 0.82rem; font-weight: 600; color: var(--pill-text);
  }
  .suggestions button:hover { background: #ddd6fe; color: #5b21b6; }

  .existing-photos { display: flex; flex-wrap: wrap; gap: 10px; }
  .existing-photo { position: relative; }
  .existing-photo img { width: 100px; height: 100px; object-fit: cover; border-radius: 10px; display: block; }
  .remove-photo {
    position: absolute; top: 4px; right: 4px;
    background: rgba(0,0,0,0.55); color: #fff; border: none;
    border-radius: 999px; width: 22px; height: 22px; cursor: pointer;
    font-size: 0.85rem; display: flex; align-items: center; justify-content: center; padding: 0;
  }

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
</style>
