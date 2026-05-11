<script>
  // @ts-nocheck
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';
  import { db, auth, storage, hasFirebaseConfig } from '$lib/firebase/client.js';
  import { onAuthStateChanged } from 'firebase/auth';
  import { collection, doc, serverTimestamp } from 'firebase/firestore';
  import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
  import { loadKnownPracticeTags } from '$lib/practiceCatalog.js';
  import { compressImage } from '$lib/compressImage.js';
  import { getAutoWhyText, getScoreFields } from '$lib/scoreFields.js';
  import { extractTags, getFilteredTagSuggestions, normalizeTag } from '$lib/tagInput.js';
  import { locale, t } from '$lib/i18n.js';

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
  let scores = { arousal: null, trance: null, pleasure: null, dopamine: null, oxytocin: null, energy: null };
  /** @type {Record<string,string>} */
  let whyValues = { arousal: '', trance: '', pleasure: '', dopamine: '', oxytocin: '', energy: '' };
  let whyTouched = { arousal: false, trance: false, pleasure: false, dopamine: false, oxytocin: false, energy: false };
  let tagInput = '';
  /** @type {string[]} */
  let tagValues = [];
  /** @type {string[]} */
  let knownTags = [];

  // tooltip expandido
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

  onMount(() => {
    loadKnownTags();
    if (auth) return onAuthStateChanged(auth, v => { user = v; if (!v) goto('/login'); });
  });

  async function handleSubmit() {
    if (!user || !hasFirebaseConfig || !db) return;
    if (!name.trim() || !description.trim()) { error = $t('accion_form.required'); return; }
    if ([scores.arousal, scores.trance, scores.pleasure].some(value => value === null)) {
      error = $t('accion_form.required_scores');
      return;
    }
    loading = true; error = '';
    try {
      const currentUsername = auth?.currentUser?.displayName || user.displayName || user.email?.split('@')[0] || $t('common.user');
      const tags = tagValues;
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
      const { arousal, trance, pleasure, dopamine, oxytocin, energy } = scores;
      await (await import('firebase/firestore')).setDoc(accionRef, {
        name: name.trim(), description: description.trim(),
        hello_world: hello_world.trim(), warnings, photos,
        arousal, trance, pleasure, dopamine, oxytocin, energy,
        arousal_why: whyValues.arousal.trim(),
        trance_why: whyValues.trance.trim(),
        pleasure_why: whyValues.pleasure.trim(),
        dopamine_why: whyValues.dopamine.trim(),
        oxytocin_why: whyValues.oxytocin.trim(),
        energy_why: whyValues.energy.trim(),
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
      knownTags = [];
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

<svelte:head><title>{$t('accion_form.title.new')} · Recetario Sensacional</title></svelte:head>

<main class="page">
  <a href="/practicas" class="back">{$t('accion.back')}</a>
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
        <a href="/practicas" class="btn primary">{$t('accion_form.view_actions')}</a>
        <button class="btn ghost" on:click={() => { submitted = false; name = ''; description = ''; hello_world = ''; warnings_text = ''; scores = { arousal: null, trance: null, pleasure: null, dopamine: null, oxytocin: null, energy: null }; whyValues = { arousal: '', trance: '', pleasure: '', dopamine: '', oxytocin: '', energy: '' }; whyTouched = { arousal: false, trance: false, pleasure: false, dopamine: false, oxytocin: false, energy: false }; tagInput = ''; tagValues = []; imageFiles = []; }}>{$t('accion_form.add_another')}</button>
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
        <legend>{$t('accion_form.scores')}</legend>
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
  .checkbox-row { flex-direction: row; align-items: center; gap: 10px; font-weight: 500; }
  .checkbox-row input {
    width: 18px;
    height: 18px;
    margin: 0;
    accent-color: var(--accent);
    transform: translateY(-1px);
    flex-shrink: 0;
  }

  input[type="text"], textarea {
    border: 1px solid rgba(12,12,21,0.15);
    border-radius: 10px; padding: 10px 12px; font: inherit;
  }
  textarea { resize: vertical; }

  fieldset { border: 1px solid rgba(12,12,21,0.1); border-radius: 12px; padding: 16px 20px; }
  legend { font-weight: 700; font-size: 0.9rem; padding: 0 6px; display: flex; align-items: center; gap: 10px; }
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
  .score-name { font-size: 0.92rem; font-weight: 800; color: var(--accent); white-space: normal; overflow-wrap: anywhere; }
  .required-mark { color: #dc2626; }
  .score-question { font-size: 0.74rem; color: #6b7280; font-weight: 400; white-space: normal; overflow-wrap: anywhere; line-height: 1.4; }
  .score-card.unset { background: transparent; border-color: rgba(12,12,21,0.05); }
  .score-card.unset .score-name { color: #9ca3af; }
  .score-card.unset .score-question { color: #c0c4cc; }

  .score-right { display: flex; align-items: center; gap: 6px; flex-shrink: 0; }
  .score-val { font-family: monospace; font-size: 0.92rem; font-weight: 700; min-width: 28px; text-align: right; }
  .score-none { font-family: monospace; font-size: 0.88rem; color: #d1d5db; min-width: 28px; text-align: right; }
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
    font-size: 0.74rem;
    color: var(--muted);
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
    font: inherit; font-size: 0.76rem !important;
    color: var(--muted);
    background: var(--surface-solid);
    min-height: 72px;
    resize: vertical;
    line-height: 1.45;
    white-space: pre-wrap;
    overflow-wrap: anywhere;
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
  @media (max-width: 640px) {
    .score-header { flex-wrap: wrap; }
    .score-right { width: 100%; justify-content: flex-end; }
  }
</style>
