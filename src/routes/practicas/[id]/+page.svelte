<script>
  // @ts-nocheck
  import { onMount } from 'svelte';
  import { page } from '$app/stores';
  import { db, auth, storage, hasFirebaseConfig } from '$lib/firebase/client.js';
  import { onAuthStateChanged } from 'firebase/auth';
  import {
    addDoc, collection, deleteDoc, doc, getDocs,
    orderBy, query, serverTimestamp, updateDoc, where
  } from 'firebase/firestore';
  import { getPracticeById } from '$lib/practiceCatalog.js';
  import { splitTextWithLinks } from '$lib/linkify.js';
  import { isMod } from '$lib/moderator.js';
  import { t } from '$lib/i18n.js';

  /** @type {any} */
  let user = null;
  /** @type {any} */
  let accion = null;
  let saved = false;
  let saveId = null;
  let saveCount = 0;
  let commentText = '';
  /** @type {any[]} */
  let comments = [];
  let loadingComments = false;
  let error = '';
  let notice = '';
  let currentPhoto = 0;
  let commentAnonymous = false;
  let expandedAxisInfo = null;
  let expandedAxisWhy = null;
  $: visibleAuthorName = !accion?.isAnonymous && accion?.authorName ? accion.authorName : '';

  $: allWarnings = accion
    ? (accion.warnings ?? [...(accion.common_errors ?? []), ...(accion.warning ? [accion.warning] : [])])
    : [];
  $: visibleAxes = AXES.filter(ax => accion?.[ax.key] != null);

  $: id = $page.params.id;

  $: AXES = [
    { key: 'arousal',    label: $t('axis.arousal'),    color: '#FF8C42', brief: $t('scores.arousal.brief') },
    { key: 'trance',     label: $t('axis.trance'),     color: '#7B68EE', brief: $t('scores.trance.brief') },
    { key: 'pleasure',   label: $t('axis.pleasure'),   color: '#FF6B9D', brief: $t('scores.pleasure.brief') },
    { key: 'dopamine',   label: $t('axis.dopamine'),   color: '#FFD166', brief: $t('scores.dopamine.brief') },
    { key: 'oxytocin',   label: $t('axis.oxytocin'),   color: '#74B0FF', brief: $t('scores.oxytocin.brief') },
    { key: 'energy',     label: $t('axis.energy'),     color: '#aaa', brief: $t('scores.energy.brief') },
  ];

  onMount(() => {
    if (auth) onAuthStateChanged(auth, v => { user = v; if (v) loadUserSave(); });

    loadAction();

    if (hasFirebaseConfig && db) {
      loadComments();
      loadSaveCount();
    }
  });

  async function loadAction() {
    accion = await getPracticeById(id, { db: hasFirebaseConfig ? db : null });
  }

  async function loadSaveCount() {
    const snap = await getDocs(query(collection(db, 'saves'), where('parentId', '==', id), where('parentType', '==', 'accion')));
    saveCount = snap.size;
  }

  async function loadUserSave() {
    if (!user) return;
    const snap = await getDocs(query(collection(db, 'saves'), where('uid', '==', user.uid), where('parentId', '==', id), where('parentType', '==', 'accion')));
    if (!snap.empty) { saved = true; saveId = snap.docs[0].id; }
    else { saved = false; saveId = null; }
  }

  async function toggleSave() {
    if (!user || !db) return;
    error = '';
    try {
      if (saved && saveId) {
        await deleteDoc(doc(db, 'saves', saveId));
        saved = false; saveId = null; saveCount--;
      } else {
        const ref = await addDoc(collection(db, 'saves'), {
          uid: user.uid, parentId: id, parentType: 'accion', createdAt: serverTimestamp()
        });
        saved = true; saveId = ref.id; saveCount++;
      }
    } catch (e) { error = e?.message ?? $t('accion.error_save'); }
  }

  async function loadComments() {
    loadingComments = true;
    const snap = await getDocs(query(collection(db, 'comments'), where('parentId', '==', id), where('parentType', '==', 'accion'), orderBy('createdAt', 'asc')));
    comments = snap.docs.map(d => ({ id: d.id, ...d.data() }));
    loadingComments = false;
  }

  async function addComment() {
    if (!user || !commentText.trim()) return;
    error = '';
    try {
      const currentUsername = auth?.currentUser?.displayName || user.displayName || user.email?.split('@')[0] || $t('common.user');
      await addDoc(collection(db, 'comments'), {
        parentId: id, parentType: 'accion', uid: user.uid,
        text: commentText.trim(),
        displayName: commentAnonymous ? $t('common.anonymous') : currentUsername,
        isAnonymous: commentAnonymous,
        createdAt: serverTimestamp()
      });
      commentText = '';
      commentAnonymous = false;
      await loadComments();
    } catch (e) { error = e?.message ?? 'Error.'; }
  }

  async function deleteComment(commentId) {
    try { await deleteDoc(doc(db, 'comments', commentId)); await loadComments(); }
    catch (e) { error = e?.message ?? 'Error.'; }
  }

  async function markReviewed() {
    try {
      await updateDoc(doc(db, 'acciones', id), { reviewed: true });
      accion = { ...accion, reviewed: true };
      notice = $t('accion.marked_reviewed');
    } catch (e) { error = e?.message ?? 'Error.'; }
  }

  async function deleteAccion() {
    if (!confirm($t('accion.delete_confirm'))) return;
    try {
      if (storage && accion.photos?.length) {
        const { ref, deleteObject } = await import('firebase/storage');
        await Promise.all(accion.photos.map(url => deleteObject(ref(storage, url)).catch(() => {})));
      }
      await deleteDoc(doc(db, 'acciones', id));
      notice = $t('accion.deleted'); accion = null;
    } catch (e) { error = e?.message ?? 'Error.'; }
  }
</script>

<svelte:head><title>{accion?.name ?? $t('accion.title_fallback')} · Recetario Sensacional</title></svelte:head>

<main class="page">
  <a href="/practicas" class="back">{$t('accion.back')}</a>

  {#if !accion}
    <p class="loading">{$t('accion.loading')}</p>
  {:else}
    <article class="card">
      <header class="art-header">
        <div class="title-row">
          <h1>{accion.name}</h1>
        </div>
        {#if visibleAuthorName}
          <div class="meta">
            <span>{visibleAuthorName}</span>
          </div>
        {/if}
      </header>

      {#if accion.photos?.length}
        <div class="gallery">
          <div class="photo-frame">
            <img src={accion.photos[currentPhoto]} alt={accion.name} class="main-photo" />
          </div>
          {#if accion.photos.length > 1}
            <div class="photo-thumbs">
              {#each accion.photos as p, i}
                <button class="thumb-btn {currentPhoto === i ? 'active' : ''}" on:click={() => currentPhoto = i}>
                  <img src={p} alt="" />
                </button>
              {/each}
            </div>
          {/if}
        </div>
      {/if}

      <section class="section desc-section">
        <h3>{$t('accion.description.title')}</h3>
        <p class="desc">
          {#each splitTextWithLinks(accion.description) as part}
            {#if part.type === 'link'}
              <a href={part.value} target="_blank" rel="noopener noreferrer" class="inline-link">
                {part.value}
              </a>
            {:else}
              {part.value}
            {/if}
          {/each}
        </p>
      </section>

      {#if accion.hello_world}
        <section class="section">
          <h3>{$t('accion.how_to.title')}</h3>
          <p class="section-subtitle">{$t('accion.how_to.subtitle')}</p>
          <p class="preserve-breaks">
            {#each splitTextWithLinks(accion.hello_world) as part}
              {#if part.type === 'link'}
                <a href={part.value} target="_blank" rel="noopener noreferrer" class="inline-link">
                  {part.value}
                </a>
              {:else}
                {part.value}
              {/if}
            {/each}
          </p>
        </section>
      {/if}

      {#if visibleAxes.length}
        <section class="scores-section">
          <div class="scores-header">
            <h3>{$t('accion.scores.title')}</h3>
            <p>{$t('accion.score_note')}</p>
          </div>
          <div class="axes">
            {#each visibleAxes as ax}
              {@const v = accion[ax.key] ?? 0}
              <div class="axis-block">
                <div class="axis-top">
                  <button
                    type="button"
                    class="axis-title-btn"
                    aria-expanded={expandedAxisWhy === ax.key}
                    on:click={() => expandedAxisWhy = expandedAxisWhy === ax.key ? null : ax.key}>
                    <div class="axis-head" style="color:{ax.color}">{ax.label}</div>
                  </button>
                  <button
                    type="button"
                    class="info-btn"
                    title={$t('accion_form.scores.info')}
                    aria-expanded={expandedAxisInfo === ax.key}
                    on:click={() => expandedAxisInfo = expandedAxisInfo === ax.key ? null : ax.key}>?</button>
                </div>
                <button
                  type="button"
                  class="axis-summary-btn"
                  aria-expanded={expandedAxisWhy === ax.key}
                  on:click={() => expandedAxisWhy = expandedAxisWhy === ax.key ? null : ax.key}>
                  <div class="axis-bar-track">
                    {#if ax.key !== 'energy'}
                      <div class="bar-center"></div>
                    {/if}
                    <div
                      class="axis-bar-fill"
                      style={ax.key === 'energy'
                        ? `left:0; width:${v * 10}%; background:${ax.color}`
                        : `left:${v >= 0 ? 50 : 50 + v * 5}%; width:${Math.abs(v) * 5}%; background:${ax.color}`}></div>
                  </div>
                  <span class="axis-val">{v}</span>
                </button>
                {#if expandedAxisInfo === ax.key}
                  <p class="axis-info">{ax.brief}</p>
                {/if}
                {#if expandedAxisWhy === ax.key && accion[ax.key + '_why']}
                  <p class="axis-why">{accion[ax.key + '_why']}</p>
                {/if}
              </div>
            {/each}
          </div>
        </section>
      {/if}

      {#if allWarnings.length}
        <section class="section">
          <h3>{$t('accion.warnings.title')}</h3>
          <p class="section-subtitle">{$t('accion.warnings.subtitle')}</p>
          <div class="warnings">
            {#each allWarnings as w}<p>⚠ {w}</p>{/each}
          </div>
        </section>
      {/if}

      {#if accion.tags?.length}
        <div class="tags">
          {#each (Array.isArray(accion.tags) ? accion.tags : accion.tags.split(' ')) as tag}
            <a href="/?tag={tag}" class="tag">{tag}</a>
          {/each}
        </div>
      {/if}

      <div class="actions-row">
        <button class="save-btn {saved ? 'saved' : ''}" on:click={toggleSave} disabled={!user}>
          {saved ? $t('accion.saved') : $t('accion.save')} ({saveCount})
        </button>
        {#if !user}<span class="auth-hint"><a href="/login">Login</a> {$t('accion.auth_hint')}</span>{/if}

        {#if isMod(user) || (user && accion.createdBy === user.uid)}
          <div class="mod-actions">
            {#if isMod(user) && !accion.reviewed && !accion._static}
              <button class="mod-btn review" on:click={markReviewed}>{$t('accion.mark_reviewed')}</button>
            {/if}
            <a href="/practicas/{id}/editar" class="mod-btn edit">{$t('accion.edit')}</a>
            {#if !accion._static}
              <button class="mod-btn delete" on:click={deleteAccion}>{$t('accion.delete')}</button>
            {/if}
          </div>
        {/if}
      </div>

      {#if error}<p class="error">{error}</p>{/if}
      {#if notice}<p class="notice">{notice}</p>{/if}
    </article>

    <section class="comments-section">
      <h2>{$t('comments.title')}</h2>
      {#if user}
        <div class="comment-form">
          <textarea rows="3" placeholder={$t('comments.placeholder')} bind:value={commentText}></textarea>
          <label class="comment-anon">
            <input type="checkbox" bind:checked={commentAnonymous} />
            <span>{$t('comments.anonymous_label')}</span>
          </label>
          <button on:click={addComment} disabled={!commentText.trim()}>{$t('comments.submit')}</button>
        </div>
      {:else}
        <p class="auth-hint"><a href="/login">{$t('comments.auth_prefix')}</a> {$t('comments.auth_suffix')}</p>
      {/if}

      {#if loadingComments}
        <p class="loading">{$t('comments.loading')}</p>
      {:else if comments.length === 0}
        <p class="empty-comments">{$t('comments.empty')}</p>
      {:else}
        <div class="comment-list">
          {#each comments as c}
            <div class="comment">
              <div class="comment-header">
                <strong>{c.isAnonymous ? $t('common.anonymous') : (c.displayName || $t('common.user'))}</strong>
                <span class="comment-date">{c.createdAt?.toDate?.().toLocaleDateString?.() ?? ''}</span>
                {#if user && (c.uid === user.uid || isMod(user))}
                  <button class="del-comment" on:click={() => deleteComment(c.id)}>{$t('comments.delete')}</button>
                {/if}
              </div>
              <p>{c.text}</p>
            </div>
          {/each}
        </div>
      {/if}
    </section>
  {/if}
</main>

<style>
  .page { max-width: 760px; margin: 0 auto; padding: 44px 24px; }
  .back { display: inline-block; margin-bottom: 20px; text-decoration: none; color: var(--muted); font-weight: 600; font-size: 0.9rem; }
  .back:hover { color: var(--accent); }
  .loading { color: var(--muted-soft); }

  .card {
    background: var(--surface-solid);
    border: 1px solid var(--line);
    border-radius: 18px;
    border-top: 4px solid var(--accent);
    padding: 32px;
    margin-bottom: 24px;
    display: flex;
    flex-direction: column;
    gap: 20px;
    box-shadow: var(--shadow);
  }

  .art-header { display: flex; justify-content: space-between; align-items: flex-start; gap: 12px; }
  .title-row { display: flex; align-items: center; gap: 10px; }
  .art-header h1 { margin: 0; font-size: 1.6rem; letter-spacing: -0.01em; }
  .gallery { display: flex; flex-direction: column; gap: 8px; }
  .photo-frame { width: 100%; height: 420px; background: var(--surface-soft); border-radius: 12px; display: flex; align-items: center; justify-content: center; overflow: hidden; }
  .main-photo { max-width: 100%; max-height: 100%; object-fit: contain; border-radius: 8px; }
  .photo-thumbs { display: flex; gap: 8px; }
  .thumb-btn { border: 2px solid transparent; border-radius: 8px; overflow: hidden; cursor: pointer; padding: 0; background: none; }
  .thumb-btn.active { border-color: var(--accent); }
  .thumb-btn img { width: 60px; height: 60px; object-fit: cover; display: block; }

  .desc { margin: 0; line-height: 1.7; color: var(--text); }
  .inline-link {
    color: var(--accent);
    text-decoration: underline;
    text-decoration-thickness: 1.5px;
    text-underline-offset: 0.16em;
    overflow-wrap: anywhere;
    word-break: break-word;
  }

  .warnings {
    background: #fff7ed; border: 1px solid #fdba74;
    border-radius: 10px; padding: 12px 16px;
    color: #7c2d12; font-size: 0.9rem;
    display: flex; flex-direction: column; gap: 4px;
  }
  .warnings p { margin: 0; }
  :global(html[data-theme='dark']) .warnings {
    background: #3b2614;
    border-color: #fb923c;
    color: #ffddb7;
  }

  .card > :is(.scores-section, .section, .tags, .actions-row) {
    border-top: 1px solid var(--line);
    padding-top: 16px;
  }

  .desc-section { gap: 10px; }
  .desc { margin: 0; font-size: 0.92rem; line-height: 1.7; color: var(--text); }
  .scores-section {
    display: flex;
    flex-direction: column;
    gap: 14px;
  }
  .scores-header {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }
  .scores-header h3 {
    margin: 0;
    font-size: 1rem;
    text-transform: uppercase;
    letter-spacing: 0.06em;
    color: var(--muted-soft);
  }
  .scores-header p {
    margin: 0;
    font-size: 0.78rem;
    line-height: 1.5;
    color: var(--muted);
  }
  .axes { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; }
  .axis-block { display: flex; flex-direction: column; gap: 6px; }
  .axis-top { display: flex; align-items: center; justify-content: space-between; gap: 8px; }
  .axis-title-btn {
    flex: 1;
    padding: 0;
    border: none;
    background: transparent;
    cursor: pointer;
    text-align: left;
  }
  .axis-head { font-weight: 800; font-size: 0.9rem; text-transform: uppercase; letter-spacing: 0.08em; }
  .axis-summary-btn {
    display: flex;
    align-items: center;
    gap: 10px;
    width: 100%;
    padding: 0;
    border: none;
    background: transparent;
    cursor: pointer;
    text-align: left;
  }
  .axis-bar-track { height: 6px; background: var(--surface-soft); border-radius: 4px; position: relative; overflow: hidden; }
  .axis-summary-btn .axis-bar-track { flex: 1; }
  .axis-bar-fill { position: absolute; height: 100%; border-radius: 4px; transition: left 0.3s, width 0.3s; }
  .axis-val { font-size: 1rem; font-weight: 800; font-family: monospace; color: var(--text); }
  .axis-info { margin: 0; font-size: 0.72rem; color: var(--muted-soft); line-height: 1.45; }
  .axis-why { margin: 0; font-size: 0.76rem; color: var(--muted); line-height: 1.45; }
  .info-btn {
    width: 20px;
    height: 20px;
    border-radius: 999px;
    border: 1px solid var(--line-strong);
    background: transparent;
    color: var(--muted-soft);
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 0;
    cursor: pointer;
    font-size: 0.7rem;
    flex-shrink: 0;
  }
  .info-btn:hover {
    color: var(--text);
    background: var(--surface-soft);
  }
  .bar-center {
    position: absolute;
    left: 50%;
    top: -2px;
    width: 2px;
    height: calc(100% + 4px);
    transform: translateX(-50%);
    background: var(--text);
    opacity: 0.5;
    border-radius: 999px;
    box-shadow: 0 0 0 1px rgba(255,255,255,0.18);
    z-index: 1;
  }

  .section h3 { margin: 0 0 8px; font-size: 1rem; text-transform: uppercase; letter-spacing: 0.06em; color: var(--muted-soft); }
  .section-subtitle {
    margin: -4px 0 10px;
    font-size: 0.72rem;
    line-height: 1.45;
    color: var(--muted-soft);
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }
  .section p { margin: 0; font-size: 0.88rem; line-height: 1.65; color: var(--text); }
  .preserve-breaks { white-space: pre-line; }

  .tags { display: flex; flex-wrap: wrap; gap: 6px; }
  .tag { font-size: 0.72rem; background: var(--pill-bg); color: var(--pill-text); padding: 4px 10px; border-radius: 999px; text-decoration: none; border: 1px solid var(--line); }
  .tag:hover { background: var(--pill-bg-hover); }

  .actions-row { display: flex; align-items: center; gap: 12px; flex-wrap: wrap; }

  .save-btn {
    border: 1.5px solid var(--line-strong); background: var(--pill-bg); color: var(--pill-text);
    padding: 8px 16px; border-radius: 999px; cursor: pointer; font-weight: 700; font-size: 0.9rem;
    transition: background 120ms, color 120ms;
  }
  .save-btn.saved { background: var(--pill-active-bg); color: var(--pill-active-text); border-color: var(--pill-active-bg); }
  .save-btn:disabled { opacity: 0.5; cursor: default; }

  .auth-hint { font-size: 0.85rem; color: var(--muted); }
  .auth-hint a { color: var(--accent); }

  .mod-actions { display: flex; gap: 8px; margin-left: auto; }
  .mod-btn { padding: 6px 14px; border-radius: 999px; cursor: pointer; font-size: 0.85rem; font-weight: 600; border: none; }
  .mod-btn.review { background: #ecfdf5; color: #047857; }
  .mod-btn.edit { background: #eff6ff; color: #1d4ed8; text-decoration: none; }
  .mod-btn.delete { background: #fee2e2; color: #b91c1c; }

  .error { color: #b91c1c; font-size: 0.9rem; margin: 0; }
  .notice { color: #047857; font-size: 0.9rem; margin: 0; }

  .comments-section { background: var(--surface-solid); border: 1px solid var(--line); border-radius: 18px; padding: 28px 32px; box-shadow: var(--shadow); }
  .comments-section h2 { margin: 0 0 20px; font-size: 1.1rem; }

  .comment-form { display: flex; flex-direction: column; gap: 8px; margin-bottom: 20px; }
  .comment-form textarea { border: 1px solid var(--line-strong); border-radius: 10px; padding: 10px 12px; font: inherit; resize: vertical; background: var(--surface-solid); color: var(--text); }
  .comment-form button { align-self: flex-start; background: var(--pill-active-bg); color: var(--pill-active-text); border: 1px solid var(--line-strong); padding: 8px 16px; border-radius: 999px; cursor: pointer; font-weight: 700; }
  .comment-form button:disabled { opacity: 0.4; }
  .comment-anon { display: flex; align-items: center; gap: 8px; font-size: 0.85rem; color: var(--muted); }

  .comment-list { display: flex; flex-direction: column; gap: 12px; }
  .comment { border-bottom: 1px solid var(--line); padding-bottom: 12px; }
  .comment:last-child { border-bottom: none; }
  .comment-header { display: flex; align-items: baseline; gap: 8px; margin-bottom: 4px; }
  .comment-header strong { font-size: 0.9rem; }
  .comment-date { font-size: 0.75rem; color: var(--muted-soft); }
  .del-comment { margin-left: auto; background: #fee2e2; border: none; cursor: pointer; color: #b91c1c; font-size: 0.75rem; font-weight: 700; padding: 4px 8px; border-radius: 999px; }
  .comment p { margin: 0; font-size: 0.9rem; color: var(--text); line-height: 1.5; }
  .empty-comments { color: var(--muted-soft); font-size: 0.9rem; }

  @media (max-width: 600px) {
    .axes { grid-template-columns: 1fr; }
    .card { padding: 22px 18px; }
    .comments-section { padding: 20px 18px; }
  }
</style>
