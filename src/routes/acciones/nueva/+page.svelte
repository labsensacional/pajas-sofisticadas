<script>
  // @ts-nocheck
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';
  import { db, auth, storage, hasFirebaseConfig } from '$lib/firebase/client.js';
  import { onAuthStateChanged } from 'firebase/auth';
  import { addDoc, collection, doc, serverTimestamp } from 'firebase/firestore';
  import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
  import { compressImage } from '$lib/compressImage.js';
  import { getScoreFields } from '$lib/scoreFields.js';
  import { t } from '$lib/i18n.js';

  /** @type {any} */
  let user = null;
  let submitted = false;
  let loading = false;
  let uploading = false;
  let error = '';
  /** @type {File[]} */
  let imageFiles = [];
  let publishAnonymous = false;

  // Form fields
  let name = '';
  let description = '';
  let hello_world = '';
  let warnings_text = '';
  /** @type {Record<string, number|null>} */
  let scores = { arousal: null, trance: null, pleasure: null, dopamine: null, endorphins: null, oxytocin: null, energy: null };
  /** @type {Record<string,string>} */
  let whyValues = { arousal: '', trance: '', pleasure: '' };
  let tags_input = '';

  // tooltip expandido
  /** @type {string|null} */
  let expandedTooltip = null;

  $: SCORE_FIELDS = getScoreFields($t);

  onMount(() => {
    if (auth) return onAuthStateChanged(auth, v => { user = v; if (!v) goto('/login'); });
  });

  async function handleSubmit() {
    if (!user || !hasFirebaseConfig || !db) return;
    if (!name.trim() || !description.trim()) { error = $t('accion_form.required'); return; }
    loading = true; error = '';
    try {
      const currentUsername = auth?.currentUser?.displayName || user.displayName || user.email?.split('@')[0] || $t('common.user');
      const tags = tags_input.split(',').map(t => t.trim().toLowerCase()).filter(Boolean);
      const warnings = warnings_text.split('\n').map(l => l.trim()).filter(Boolean);
      const accionRef = doc(collection(db, 'acciones'));
      const photos = [];
      if (imageFiles.length && storage) {
        uploading = true;
        for (const file of imageFiles) {
          const path = `acciones/${accionRef.id}/${Date.now()}-${file.name.replace(/\s+/g, '-')}`;
          const storRef = ref(storage, path);
          const compressed = await compressImage(file);
          await uploadBytes(storRef, compressed, { contentType: 'image/jpeg' });
          photos.push(await getDownloadURL(storRef));
        }
        uploading = false;
      }
      const { arousal, trance, pleasure, dopamine, endorphins, oxytocin, energy } = scores;
      await (await import('firebase/firestore')).setDoc(accionRef, {
        name: name.trim(), description: description.trim(),
        hello_world: hello_world.trim(), warnings, photos,
        arousal, trance, pleasure, dopamine, endorphins, oxytocin, energy,
        arousal_why: whyValues.arousal.trim(), trance_why: whyValues.trance.trim(), pleasure_why: whyValues.pleasure.trim(),
        tags,
        createdBy: user.uid,
        authorName: publishAnonymous ? 'Anónimo' : currentUsername,
        isAnonymous: publishAnonymous,
        reviewed: false,
        createdAt: serverTimestamp()
      });
      submitted = true;
    } catch (e) { error = e?.message ?? 'Error al guardar.'; }
    finally { loading = false; uploading = false; }
  }

</script>

<svelte:head><title>Nueva acción · Laboratorio Sensacional</title></svelte:head>

<main class="page">
  <a href="/acciones" class="back">{$t('accion.back')}</a>
  <h1>{$t('accion_form.title.new')}</h1>
  <p class="hint">{$t('accion_form.hint')}</p>

  {#if !hasFirebaseConfig}
    <div class="warn">{$t('accion_form.firebase_warn')}</div>
  {:else if !user}
    <div class="warn">{$t('accion_form.login_warn_prefix')} <a href="/login">{$t('accion_form.login_warn_link')}</a> {$t('accion_form.login_warn_suffix')}</div>
  {:else if submitted}
    <div class="success">
      <p>{$t('accion_form.success')}</p>
      <div class="links">
        <a href="/acciones" class="btn primary">{$t('accion_form.view_actions')}</a>
        <button class="btn ghost" on:click={() => { submitted = false; name = ''; description = ''; }}>{$t('accion_form.add_another')}</button>
      </div>
    </div>
  {:else}
    <form on:submit|preventDefault={handleSubmit}>
      <label>{$t('accion_form.name')}
        <input type="text" bind:value={name} placeholder={$t('accion_form.name.placeholder')} required />
      </label>

      <label>{$t('accion_form.description')} <small>{$t('accion_form.description.hint')}</small>
        <textarea rows="3" bind:value={description} required placeholder={$t('accion_form.description.placeholder')}></textarea>
      </label>

      <label>{$t('accion_form.how_to')} <small>{$t('accion_form.how_to.hint')}</small>
        <textarea rows="2" bind:value={hello_world} placeholder={$t('accion_form.how_to.placeholder')}></textarea>
      </label>

      <label>{$t('accion_form.warnings')} <small>{$t('accion_form.warnings.hint')}</small>
        <textarea rows="3" bind:value={warnings_text} placeholder={$t('accion_form.warnings.placeholder')}></textarea>
      </label>

      <fieldset>
        <legend>{$t('accion_form.scores')} <a href="/teoria/02-ejes-de-puntuacion" target="_blank" class="more-info">{$t('accion_form.scores.guide')}</a></legend>
        <div class="scores">
          {#each SCORE_FIELDS as field}
            {@const isSet = scores[field.key] !== null}
            <div class="score-card" class:unset={!isSet} style="--accent: {field.color}">
              <div class="score-header">
                <div class="score-meta">
                  <span class="score-name">{field.tech}</span>
                  <span class="score-question">{field.question}</span>
                </div>
                <div class="score-right">
                  {#if isSet}
                    <span class="score-val" style="color:{field.color}">{scores[field.key]}</span>
                    <button type="button" class="clear-btn" title={$t('accion_form.scores.remove')}
                      on:click={() => scores[field.key] = null}>×</button>
                  {:else}
                    <span class="score-none">—</span>
                  {/if}
                  <button type="button" class="tooltip-btn" title={$t('accion_form.scores.info')}
                    on:click={() => expandedTooltip = expandedTooltip === field.key ? null : field.key}>?</button>
                </div>
              </div>
              {#if isSet}
                <input type="range" min={field.min} max={field.max} step="1" bind:value={scores[field.key]}
                  style="--c: {field.color}" />
              {:else}
                <button type="button" class="activate-btn"
                  on:click={() => scores[field.key] = 0}>{$t('accion_form.scores.add')}</button>
              {/if}
              {#if expandedTooltip === field.key}
                <p class="tooltip-text">{field.tooltip}</p>
              {/if}
              {#if isSet && field.key in whyValues}
                <input type="text" class="why-input"
                  bind:value={whyValues[field.key]}
                  placeholder={$t('accion_form.scores.why.placeholder')} />
              {/if}
            </div>
          {/each}
        </div>
      </fieldset>

      <label>{$t('accion_form.tags')} <small>{$t('accion_form.tags.hint')}</small>
        <input type="text" bind:value={tags_input} placeholder={$t('accion_form.tags.placeholder')} />
      </label>

      <label class="checkbox-row">
        <input type="checkbox" bind:checked={publishAnonymous} />
        <span>{$t('accion_form.anonymous')}</span>
      </label>

      <label>{$t('accion_form.photos')} <small>{$t('accion_form.photos.hint')}</small>
        <input class="file-input" type="file" multiple accept="image/*" id="accion-fotos" on:change={e => { imageFiles = Array.from(e.target.files ?? []).slice(0, 5); }} />
        <label for="accion-fotos" class="upload-box">
          <span class="upload-kicker">{$t('accion_form.photos.label')}</span>
          <strong>{imageFiles.length ? $t('accion_form.photos.selected', { count: imageFiles.length }) : $t('accion_form.photos.choose')}</strong>
          <span>{imageFiles.length ? $t('accion_form.photos.replace') : $t('accion_form.photos.info')}</span>
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
        {uploading ? $t('accion_form.submit.uploading') : loading ? $t('accion_form.submit.loading') : $t('accion_form.submit.new')}
      </button>
    </form>
  {/if}
</main>

<style>
  .page { max-width: 760px; margin: 0 auto; padding: 48px 24px; }
  .back { display: inline-block; margin-bottom: 16px; text-decoration: none; color: #6b7280; font-weight: 600; font-size: 0.9rem; }
  h1 { margin: 0 0 6px; }
  .hint { color: #6b7280; margin: 0 0 28px; font-size: 0.9rem; }

  form { display: flex; flex-direction: column; gap: 16px; }

  label { display: flex; flex-direction: column; gap: 5px; font-weight: 600; font-size: 0.9rem; }
  label small { font-weight: 400; color: #9ca3af; }
  .checkbox-row { flex-direction: row; align-items: center; gap: 10px; }
  .checkbox-row input { width: 16px; height: 16px; }

  input[type="text"], textarea {
    border: 1px solid rgba(12,12,21,0.15);
    border-radius: 10px; padding: 10px 12px; font: inherit;
  }
  textarea { resize: vertical; }

  fieldset { border: 1px solid rgba(12,12,21,0.1); border-radius: 12px; padding: 16px 20px; }
  legend { font-weight: 700; font-size: 0.9rem; padding: 0 6px; display: flex; align-items: center; gap: 10px; }
  .more-info { font-size: 0.78rem; font-weight: 500; color: #6b7280; text-decoration: none; border: 1px solid rgba(12,12,21,0.15); border-radius: 999px; padding: 2px 8px; }
  .more-info:hover { color: #0c0c15; border-color: rgba(12,12,21,0.35); }

  .scores { display: flex; flex-direction: column; gap: 8px; }
  .score-card {
    border: 1px solid rgba(12,12,21,0.08);
    border-radius: 10px;
    padding: 10px 14px;
    display: flex; flex-direction: column; gap: 8px;
    background: rgba(12,12,21,0.02);
  }
  .score-header { display: flex; align-items: flex-start; justify-content: space-between; gap: 10px; }
  .score-meta { display: flex; flex-direction: column; gap: 2px; }
  .score-name { font-size: 0.82rem; font-weight: 700; color: var(--accent); }
  .score-question { font-size: 0.8rem; color: #6b7280; font-weight: 400; }
  .score-card.unset { background: transparent; border-color: rgba(12,12,21,0.05); }
  .score-card.unset .score-name { color: #9ca3af; }
  .score-card.unset .score-question { color: #c0c4cc; }

  .score-right { display: flex; align-items: center; gap: 6px; flex-shrink: 0; }
  .score-val { font-family: monospace; font-size: 1.1rem; font-weight: 700; min-width: 28px; text-align: right; }
  .score-none { font-family: monospace; font-size: 1rem; color: #d1d5db; min-width: 28px; text-align: right; }
  .clear-btn {
    width: 20px; height: 20px; border-radius: 50%;
    border: 1px solid rgba(12,12,21,0.15);
    background: transparent; cursor: pointer;
    font-size: 0.85rem; color: #9ca3af; line-height: 1;
    display: flex; align-items: center; justify-content: center; padding: 0;
    flex-shrink: 0;
  }
  .clear-btn:hover { background: #fee2e2; border-color: #fca5a5; color: #b91c1c; }
  .activate-btn {
    align-self: flex-start;
    font-size: 0.75rem; font-weight: 500; color: #9ca3af;
    background: transparent; border: 1px dashed rgba(12,12,21,0.15);
    border-radius: 6px; padding: 4px 10px; cursor: pointer;
  }
  .activate-btn:hover { color: #4b5563; border-color: rgba(12,12,21,0.3); background: rgba(12,12,21,0.03); }
  .tooltip-btn {
    width: 20px; height: 20px; border-radius: 50%;
    border: 1px solid rgba(12,12,21,0.2);
    background: transparent; cursor: pointer;
    font-size: 0.7rem; color: #9ca3af;
    display: flex; align-items: center; justify-content: center; padding: 0;
    flex-shrink: 0;
  }
  .tooltip-btn:hover { background: rgba(12,12,21,0.06); color: #4b5563; }
  input[type="range"] {
    flex: 1; width: 100%;
    accent-color: var(--c, #0c0c15);
  }
  .tooltip-text {
    font-size: 0.78rem;
    color: var(--text);
    line-height: 1.6;
    background: var(--surface-soft);
    border: 1px solid var(--line);
    border-radius: 10px;
    padding: 9px 11px;
    margin: 0;
    white-space: pre-line;
  }
  .why-input {
    border: 1px solid var(--line-strong) !important;
    border-radius: 8px !important; padding: 7px 10px !important;
    font: inherit; font-size: 0.8rem !important;
    color: var(--text);
    background: var(--surface-solid);
  }
  .why-input::placeholder { color: var(--muted-soft); }

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
  .success {
    background: var(--surface-solid);
    border: 1px solid var(--line);
    box-shadow: var(--shadow);
    color: var(--text);
    padding: 24px;
    border-radius: 14px;
  }
  .success p { margin: 0 0 16px; }
  .links { display: flex; gap: 12px; flex-wrap: wrap; }
  .btn { padding: 10px 20px; border-radius: 999px; text-decoration: none; font-weight: 700; cursor: pointer; }
  .btn.primary {
    background: var(--accent);
    color: var(--accent-contrast);
    border: 1px solid var(--line-strong);
  }
  .btn.ghost {
    background: transparent;
    border: 1.5px solid var(--line-strong);
    color: var(--text);
  }
</style>
