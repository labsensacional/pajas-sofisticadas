<script>
  // @ts-nocheck
  import { onMount } from 'svelte';
  import { page } from '$app/stores';
  import { goto } from '$app/navigation';
  import { db, auth, storage, hasFirebaseConfig } from '$lib/firebase/client.js';
  import { onAuthStateChanged } from 'firebase/auth';
  import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
  import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
  import { compressImage } from '$lib/compressImage.js';
  import { getPracticeById, loadKnownPracticeTags } from '$lib/practiceCatalog.js';
  import { isMod } from '$lib/moderator.js';
  import { getAutoWhyText, getScoreFields } from '$lib/scoreFields.js';
  import { extractTags, getFilteredTagSuggestions, normalizeTag } from '$lib/tagInput.js';
  import { locale, t } from '$lib/i18n.js';

  /** @type {any} */
  let user = null;
  /** @type {any} */
  let accion = null;
  let loading = true;
  let saving = false;
  let uploading = false;
  let error = '';
  /** @type {File[]} */
  let imageFiles = [];
  /** @type {string[]} */
  let existingPhotos = [];

  let name = '';
  let description = '';
  let hello_world = '';
  let warnings_text = '';
  /** @type {Record<string, number|null>} */
  let scores = { arousal: null, trance: null, pleasure: null, dopamine: null, oxytocin: null, energy: null };
  /** @type {Record<string,string>} */
  let whyValues = { arousal: '', trance: '', pleasure: '', dopamine: '', oxytocin: '', energy: '' };
  let whyTouched = { arousal: false, trance: false, pleasure: false, dopamine: false, oxytocin: false, energy: false };
  let tagInput = '';
  /** @type {string[]} */
  let tagValues = [];
  /** @type {string[]} */
  let knownTags = [];

  /** @type {string|null} */
  let expandedTooltip = null;
  const REQUIRED_SCORE_KEYS = new Set(['arousal', 'trance', 'pleasure']);

  $: SCORE_FIELDS = getScoreFields($t);
  $: {
    scores;
    whyTouched;
    SCORE_FIELDS;
    syncAutoWhyText();
  }
  $: filteredTagSuggestions = getFilteredTagSuggestions(knownTags, tagValues, tagInput);

  $: id = $page.params.id;

  onMount(() => {
    loadKnownTags();
    if (auth) onAuthStateChanged(auth, async v => {
      user = v;
      if (!v) { goto('/login'); return; }
      if (db) await loadAccion();
    });
  });

  async function loadAccion() {
    loading = true;
    try {
      accion = await getPracticeById(id, { db });
      if (!accion) { error = $t('accion_form.not_found'); loading = false; return; }

      if (!isMod(user) && accion.createdBy !== user.uid) {
        goto(`/practicas/${id}`); return;
      }

      name = accion.name ?? '';
      description = accion.description ?? '';
      hello_world = accion.hello_world ?? '';
      // Merge legacy common_errors + warning into warnings
      const legacyErrors = Array.isArray(accion.common_errors) ? accion.common_errors : [];
      const legacyWarning = accion.warning ? [accion.warning] : [];
      const combined = accion.warnings ?? [...legacyErrors, ...legacyWarning];
      warnings_text = combined.join('\n');
      scores = {
        arousal: accion.arousal ?? null,
        trance: accion.trance ?? null,
        pleasure: accion.pleasure ?? null,
        dopamine: accion.dopamine ?? null,
        oxytocin: accion.oxytocin ?? null,
        energy: accion.energy ?? null,
      };
      whyValues = {
        arousal: accion.arousal_why ?? '',
        trance: accion.trance_why ?? '',
        pleasure: accion.pleasure_why ?? '',
        dopamine: accion.dopamine_why ?? '',
        oxytocin: accion.oxytocin_why ?? '',
        energy: accion.energy_why ?? '',
      };
      whyTouched = {
        arousal: Boolean(whyValues.arousal),
        trance: Boolean(whyValues.trance),
        pleasure: Boolean(whyValues.pleasure),
        dopamine: Boolean(whyValues.dopamine),
        oxytocin: Boolean(whyValues.oxytocin),
        energy: Boolean(whyValues.energy),
      };
      tagValues = extractTags([accion]);
      existingPhotos = accion.photos ?? [];
    } catch (e) { error = e?.message ?? 'Error al cargar.'; }
    loading = false;
  }

  async function handleSubmit() {
    if (!user || !db) return;
    if (!name.trim() || !description.trim()) { error = $t('accion_form.required'); return; }
    if ([scores.arousal, scores.trance, scores.pleasure].some(value => value === null)) {
      error = $t('accion_form.required_scores');
      return;
    }
    saving = true; error = '';
    try {
      const tags = tagValues;
      const warnings = warnings_text.split('\n').map(l => l.trim()).filter(Boolean);
      // setDoc creates or overwrites — handles both new Firestore overrides and existing docs
      let photos = [...existingPhotos];
      if (imageFiles.length && storage) {
        uploading = true;
        for (const file of imageFiles) {
          const path = `acciones/${id}/${Date.now()}-${file.name.replace(/\s+/g, '-')}`;
          const storRef = ref(storage, path);
          const compressed = await compressImage(file);
          await uploadBytes(storRef, compressed, { contentType: 'image/jpeg' });
          photos.push(await getDownloadURL(storRef));
        }
        uploading = false;
      }
      const { arousal, trance, pleasure, dopamine, oxytocin, energy } = scores;
      await setDoc(doc(db, 'acciones', id), {
        name: name.trim(), description: description.trim(),
        hello_world: hello_world.trim(), warnings, photos,
        arousal, trance, pleasure, dopamine, endorphins: accion.endorphins ?? null, oxytocin, energy,
        arousal_why: whyValues.arousal.trim(),
        trance_why: whyValues.trance.trim(),
        pleasure_why: whyValues.pleasure.trim(),
        dopamine_why: whyValues.dopamine.trim(),
        endorphins_why: accion.endorphins_why ?? '',
        oxytocin_why: whyValues.oxytocin.trim(),
        energy_why: whyValues.energy.trim(),
        tags,
        createdBy: accion.createdBy || user.uid,
        authorName: accion.authorName ?? user.displayName ?? user.email?.split('@')[0] ?? $t('common.user'),
        isAnonymous: accion.isAnonymous ?? false,
        createdAt: accion.createdAt ?? serverTimestamp(),
        reviewed: accion.reviewed ?? false,
        updatedAt: serverTimestamp()
      });
      goto(`/practicas/${id}`);
    } catch (e) { error = e?.message ?? 'Error al guardar.'; saving = false; uploading = false; }
  }

  function syncAutoWhyText() {
    const nextWhyValues = { ...whyValues };
    const nextWhyTouched = { ...whyTouched };
    let changed = false;

    for (const key of Object.keys(nextWhyValues)) {
      const score = scores[key];
      if (score === null) {
        if (nextWhyValues[key] !== '' || nextWhyTouched[key] !== false) {
          nextWhyValues[key] = '';
          nextWhyTouched[key] = false;
          changed = true;
        }
        continue;
      }

      if (nextWhyTouched[key]) continue;

      const field = SCORE_FIELDS.find((entry) => entry.key === key);
      if (!field) continue;
      const autoText = getAutoWhyText(field.key, Number(score), $locale);
      if (nextWhyValues[key] !== autoText) {
        nextWhyValues[key] = autoText;
        changed = true;
      }
    }

    if (changed) {
      whyValues = nextWhyValues;
      whyTouched = nextWhyTouched;
    }
  }

  function clearScore(key) {
    scores = { ...scores, [key]: null };
    if (key in whyValues) {
      whyValues = { ...whyValues, [key]: '' };
      whyTouched = { ...whyTouched, [key]: false };
    }
  }

  function handleWhyInput(key, value) {
    whyTouched = { ...whyTouched, [key]: true };
    whyValues = { ...whyValues, [key]: value };
  }

  function setScore(key, value) {
    scores = { ...scores, [key]: value };
  }

  async function loadKnownTags() {
    try {
      knownTags = await loadKnownPracticeTags({ db: hasFirebaseConfig ? db : null });
    } catch (e) {
      console.error(e);
      knownTags = extractTags([accion]).sort((a, b) => a.localeCompare(b));
    }
  }

  function handleTagInput(event) {
    const value = event.currentTarget.value;
    if (value.includes(',')) {
      const parts = value.split(',');
      parts.slice(0, -1).forEach(commitTag);
      tagInput = parts.at(-1) ?? '';
      return;
    }
    tagInput = value;
  }

  function handleTagKeydown(event) {
    if (event.key === ',' || event.key === 'Enter' || event.key === 'Tab') {
      if (!tagInput.trim()) return;
      event.preventDefault();
      commitTag(tagInput);
      return;
    }

    if (event.key === 'Backspace' && !tagInput && tagValues.length) {
      tagValues = tagValues.slice(0, -1);
    }
  }

  function commitTag(rawTag) {
    const tag = normalizeTag(rawTag);
    if (!tag || tagValues.includes(tag)) {
      tagInput = '';
      return;
    }
    tagValues = [...tagValues, tag];
    tagInput = '';
  }

  function removeTag(tag) {
    tagValues = tagValues.filter((entry) => entry !== tag);
  }
</script>

<svelte:head><title>{$t('accion_form.title.edit')} · Laboratorio Sensacional</title></svelte:head>

<main class="page">
  <a href="/practicas/{id}" class="back">{$t('accion.back')}</a>
  <h1>{$t('accion_form.title.edit')}</h1>

  {#if loading}
    <p class="hint">{$t('accion.loading')}</p>
  {:else if error && !accion}
    <p class="error">{error}</p>
  {:else if accion}
    <form on:submit|preventDefault={handleSubmit}>
      <label>{$t('accion_form.name')}
        <input type="text" bind:value={name} required placeholder={$t('accion_form.name.placeholder')} />
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
        <legend>{$t('accion_form.scores')} <a href="/concepto/02-ejes-de-puntuacion" target="_blank" class="more-info">{$t('accion_form.scores.guide')}</a></legend>
        <div class="scores">
          {#each SCORE_FIELDS as field}
            {@const isSet = scores[field.key] !== null}
            <div class="score-card" class:unset={!isSet} style="--accent: {field.color}">
              <div class="score-header">
                <div class="score-meta">
                  <span class="score-name">{field.tech}{#if REQUIRED_SCORE_KEYS.has(field.key)} <span class="required-mark">*</span>{/if}</span>
                  <span class="score-question">{field.question}</span>
                </div>
                <div class="score-right">
                  {#if isSet}
                    <span class="score-val" style="color:{field.color}">{scores[field.key]}</span>
                    <button type="button" class="clear-btn" title={$t('accion_form.scores.remove')}
                      on:click={() => clearScore(field.key)}>×</button>
                  {:else}
                    <span class="score-none">—</span>
                  {/if}
                  <button type="button" class="tooltip-btn" title={$t('accion_form.scores.info')}
                    on:click={() => expandedTooltip = expandedTooltip === field.key ? null : field.key}>?</button>
                </div>
              </div>
              {#if isSet}
                <input type="range" min={field.min} max={field.max} step="1" value={scores[field.key]}
                  on:input={(event) => setScore(field.key, Number(event.currentTarget.value))}
                  style="--c: {field.color}" />
              {:else}
                <button type="button" class="activate-btn"
                  on:click={() => setScore(field.key, 0)}>{$t('accion_form.scores.add')}</button>
              {/if}
              {#if expandedTooltip === field.key}
                <p class="tooltip-text">{field.tooltip}</p>
              {/if}
              {#if isSet && field.key in whyValues}
                <textarea
                  class="why-input"
                  rows="3"
                  value={whyValues[field.key]}
                  on:input={(event) => {
                    handleWhyInput(field.key, event.currentTarget.value);
                    event.currentTarget.style.height = 'auto';
                    event.currentTarget.style.height = `${event.currentTarget.scrollHeight}px`;
                  }}
                  placeholder={$t('accion_form.scores.why.placeholder')}></textarea>
              {/if}
            </div>
          {/each}
        </div>
      </fieldset>

      <label>{$t('accion_form.tags')} <small>{$t('accion_form.tags.hint')}</small>
        <div class="tags-field">
          <div class="tags-box">
            {#each tagValues as tag}
              <button type="button" class="tag-chip" on:click={() => removeTag(tag)}>
                {tag} <span>×</span>
              </button>
            {/each}
            <input
              type="text"
              class="tag-input"
              value={tagInput}
              on:input={handleTagInput}
              on:keydown={handleTagKeydown}
              placeholder={tagValues.length ? '' : $t('accion_form.tags.placeholder')}
            />
          </div>
          {#if filteredTagSuggestions.length}
            <div class="tag-suggestions">
              {#each filteredTagSuggestions as tag}
                <button type="button" class="tag-suggestion" on:click={() => commitTag(tag)}>{tag}</button>
              {/each}
            </div>
          {/if}
        </div>
      </label>

      {#if existingPhotos.length}
        <div class="field-group">
          <span class="field-label">{$t('sesion_form.existing_photos')}</span>
          <div class="existing-photos">
            {#each existingPhotos as p}
              <div class="existing-photo">
                <img src={p} alt="" />
                <button type="button" class="remove-photo" on:click={() => existingPhotos = existingPhotos.filter(x => x !== p)}>×</button>
              </div>
            {/each}
          </div>
        </div>
      {/if}

      <label>{$t('accion_form.photos')} <small>{$t('accion_form.photos.hint')}</small>
        <input class="file-input" type="file" multiple accept="image/*" id="editar-accion-fotos" on:change={e => { imageFiles = Array.from(e.target.files ?? []).slice(0, 5); }} />
        <label for="editar-accion-fotos" class="upload-box">
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

      <button type="submit" class="submit" disabled={saving}>
        {uploading ? $t('accion_form.submit.uploading') : saving ? $t('accion_form.submit.loading') : $t('accion_form.submit.edit')}
      </button>
    </form>
  {/if}
</main>

<style>
  .page { max-width: 760px; margin: 0 auto; padding: 48px 24px; }
  .back { display: inline-block; margin-bottom: 16px; text-decoration: none; color: #6b7280; font-weight: 600; font-size: 0.9rem; }
  h1 { margin: 0 0 24px; }
  .hint { color: #9ca3af; }

  form { display: flex; flex-direction: column; gap: 16px; }
  label { display: flex; flex-direction: column; gap: 5px; font-weight: 600; font-size: 0.9rem; }
  label small { font-weight: 400; color: #9ca3af; }
  input[type="text"], textarea { border: 1px solid rgba(12,12,21,0.15); border-radius: 10px; padding: 10px 12px; font: inherit; }
  textarea { resize: vertical; }

  fieldset { border: 1px solid rgba(12,12,21,0.1); border-radius: 12px; padding: 16px 20px; }
  legend { font-weight: 700; font-size: 0.9rem; padding: 0 6px; display: flex; align-items: center; gap: 10px; }
  .more-info { font-size: 0.78rem; font-weight: 500; color: #6b7280; text-decoration: none; border: 1px solid rgba(12,12,21,0.15); border-radius: 999px; padding: 2px 8px; }
  .more-info:hover { color: #0c0c15; border-color: rgba(12,12,21,0.35); }
  .tags-field { display: flex; flex-direction: column; gap: 8px; }
  .tags-box {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    align-items: center;
    border: 1px solid rgba(12,12,21,0.15);
    border-radius: 10px;
    padding: 8px 10px;
    background: var(--surface-solid);
  }
  .tag-input {
    border: none !important;
    padding: 4px 2px !important;
    flex: 1 1 160px;
    min-width: 120px;
    background: transparent;
    outline: none;
  }
  .tag-chip {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    border: 1px solid rgba(12,12,21,0.12);
    background: rgba(12,12,21,0.05);
    border-radius: 999px;
    padding: 6px 10px;
    cursor: pointer;
    font: inherit;
  }
  .tag-chip span { color: #6b7280; }
  .tag-suggestions { display: flex; flex-wrap: wrap; gap: 6px; }
  .tag-suggestion {
    border: 1px dashed rgba(12,12,21,0.18);
    background: transparent;
    border-radius: 999px;
    padding: 5px 10px;
    cursor: pointer;
    font: inherit;
    color: var(--muted);
  }
  .tag-suggestion:hover { color: var(--text); border-color: rgba(12,12,21,0.35); }

  .scores { display: flex; flex-direction: column; gap: 8px; }
  .score-card {
    border: 1px solid rgba(12,12,21,0.08);
    border-radius: 10px;
    padding: 10px 14px;
    display: flex; flex-direction: column; gap: 8px;
    background: rgba(12,12,21,0.02);
  }
  .score-header { display: flex; align-items: flex-start; justify-content: space-between; gap: 10px; }
  .score-meta { display: flex; flex: 1 1 0; min-width: 0; flex-direction: column; gap: 2px; }
  .score-name { font-size: 0.82rem; font-weight: 700; color: var(--accent); white-space: normal; overflow-wrap: anywhere; }
  .required-mark { color: #dc2626; }
  .score-question { font-size: 0.8rem; color: #6b7280; font-weight: 400; white-space: normal; overflow-wrap: anywhere; line-height: 1.35; }
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
    border: 1px solid rgba(12,12,21,0.12) !important;
    border-radius: 8px !important; padding: 7px 10px !important;
    font: inherit; font-size: 0.8rem !important;
    color: #4b5563;
    background: #fff;
    min-height: 72px;
    resize: vertical;
    line-height: 1.45;
    white-space: pre-wrap;
    overflow-wrap: anywhere;
  }
  .why-input::placeholder { color: #c0c4cc; }

  .field-group { display: flex; flex-direction: column; gap: 6px; }
  .field-label { font-weight: 600; font-size: 0.9rem; }
  .existing-photos { display: flex; flex-wrap: wrap; gap: 10px; }
  .existing-photo { position: relative; }
  .existing-photo img { width: 100px; height: 100px; object-fit: cover; border-radius: 10px; display: block; }
  .remove-photo { position: absolute; top: 4px; right: 4px; background: rgba(0,0,0,0.55); color: #fff; border: none; border-radius: 999px; width: 22px; height: 22px; cursor: pointer; font-size: 0.85rem; display: flex; align-items: center; justify-content: center; padding: 0; }
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
  @media (max-width: 640px) {
    .score-header { flex-wrap: wrap; }
    .score-right { width: 100%; justify-content: flex-end; }
  }
</style>
