<script>
  // @ts-nocheck
  import { onMount } from 'svelte';
  import { page } from '$app/stores';
  import { db, auth, storage, hasFirebaseConfig } from '$lib/firebase/client.js';
  import { onAuthStateChanged } from 'firebase/auth';
  import {
    addDoc, collection, deleteDoc, doc, getDoc,
    getDocs, orderBy, query, serverTimestamp, updateDoc, where
  } from 'firebase/firestore';
  import { getPracticeById, getPracticeName, listPractices } from '$lib/practiceCatalog.js';
  import { isMod } from '$lib/moderator.js';
  import { t } from '$lib/i18n.js';

  /** @type {any} */
  let user = null;
  /** @type {any} */
  let sesion = null;
  let saved = false;
  let saveId = null;
  let saveCount = 0;
  let commentText = '';
  /** @type {any[]} */
  let comments = [];
  let loadingComments = false;
  let currentPhoto = 0;
  let error = '';
  let notice = '';
  let commentAnonymous = false;
  let practiceCatalog = [];
  let practiceNames = {};
  $: visibleAuthorName = !sesion?.isAnonymous && sesion?.authorName ? sesion.authorName : '';

  $: id = $page.params.id;

  onMount(() => {
    if (auth) onAuthStateChanged(auth, v => { user = v; if (v) loadUserSave(); });
    if (hasFirebaseConfig && db) {
      loadSesion();
      loadComments();
      loadSaveCount();
    }
    loadActions();
  });

  async function loadSesion() {
    const snap = await getDoc(doc(db, 'sesiones', id));
    if (snap.exists()) sesion = { id: snap.id, ...snap.data() };
  }

  async function loadSaveCount() {
    const snap = await getDocs(query(collection(db, 'saves'), where('parentId', '==', id), where('parentType', '==', 'sesion')));
    saveCount = snap.size;
  }

  async function loadUserSave() {
    if (!user) return;
    const snap = await getDocs(query(collection(db, 'saves'), where('uid', '==', user.uid), where('parentId', '==', id), where('parentType', '==', 'sesion')));
    if (!snap.empty) { saved = true; saveId = snap.docs[0].id; }
    else { saved = false; saveId = null; }
  }

  async function toggleSave() {
    if (!user || !db) return;
    try {
      if (saved && saveId) {
        await deleteDoc(doc(db, 'saves', saveId));
        saved = false; saveId = null; saveCount--;
      } else {
        const ref = await addDoc(collection(db, 'saves'), { uid: user.uid, parentId: id, parentType: 'sesion', createdAt: serverTimestamp() });
        saved = true; saveId = ref.id; saveCount++;
      }
    } catch (e) { error = e?.message ?? 'Error.'; }
  }

  async function loadComments() {
    loadingComments = true;
    const snap = await getDocs(query(collection(db, 'comments'), where('parentId', '==', id), where('parentType', '==', 'sesion'), orderBy('createdAt', 'asc')));
    comments = snap.docs.map(d => ({ id: d.id, ...d.data() }));
    loadingComments = false;
  }

  async function addComment() {
    if (!user || !commentText.trim()) return;
    try {
      const currentUsername = auth?.currentUser?.displayName || user.displayName || user.email?.split('@')[0] || $t('common.user');
      await addDoc(collection(db, 'comments'), {
        parentId: id, parentType: 'sesion', uid: user.uid,
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

  async function deleteComment(cid) {
    try { await deleteDoc(doc(db, 'comments', cid)); await loadComments(); }
    catch (e) { error = e?.message ?? 'Error.'; }
  }

  async function markReviewed() {
    try { await updateDoc(doc(db, 'sesiones', id), { reviewed: true }); sesion = { ...sesion, reviewed: true }; notice = $t('sesion.marked_reviewed'); }
    catch (e) { error = e?.message ?? 'Error.'; }
  }

  async function deleteSesion() {
    if (!confirm($t('sesion.delete_confirm'))) return;
    try {
      if (storage && sesion.photos?.length) {
        const { ref, deleteObject } = await import('firebase/storage');
        await Promise.all(sesion.photos.map(url => deleteObject(ref(storage, url)).catch(() => {})));
      }
      await deleteDoc(doc(db, 'sesiones', id));
      notice = $t('sesion.deleted'); sesion = null;
    } catch (e) { error = e?.message ?? 'Error.'; }
  }

  async function loadActions() {
    try {
      practiceCatalog = await listPractices({ db: hasFirebaseConfig ? db : null });
      practiceNames = Object.fromEntries(practiceCatalog.map((practice) => [practice.id, practice.name]));
      await loadMissingPracticeNames();
    } catch (e) {
      console.error(e);
    }
  }

  async function loadMissingPracticeNames() {
    if (!sesion?.accionTags?.length) return;

    const missingIds = sesion.accionTags.filter((aid) => !practiceNames[aid]);
    if (!missingIds.length) return;

    const entries = await Promise.all(
      missingIds.map(async (aid) => {
        try {
          const practice = await getPracticeById(aid, { db: hasFirebaseConfig ? db : null });
          return [aid, practice?.name ?? aid];
        } catch {
          return [aid, aid];
        }
      })
    );

    practiceNames = { ...practiceNames, ...Object.fromEntries(entries) };
  }

  $: if (sesion?.accionTags?.length) {
    loadMissingPracticeNames();
  }

</script>

<svelte:head><title>{sesion?.title ?? $t('sesion.title_fallback')} · Recetario Sensacional</title></svelte:head>

<main class="page">
  <a href="/sesiones" class="back">{$t('sesion.back')}</a>

  {#if !sesion && !notice}
    <p class="loading">{$t('sesion.loading')}</p>
  {:else if notice && !sesion}
    <p class="notice-big">{notice}</p>
  {:else if sesion}
    <article class="card">
      <header class="art-header">
        <h1>{sesion.title}</h1>
        <div class="meta">
          {#if visibleAuthorName}
            <span>{visibleAuthorName}</span>
            <span>·</span>
          {/if}
          <span>{sesion.createdAt?.toDate?.().toLocaleDateString?.() ?? ''}</span>
        </div>
      </header>

      {#if sesion.body}
        <div class="body">{sesion.body}</div>
      {/if}

      {#if sesion.accionTags?.length}
        <div class="tag-group">
          <span class="tag-group-label">{$t('sesion_form.acciones')}</span>
          <div class="action-chips">
            {#each sesion.accionTags as at}
              <a href="/practicas/{at}" class="action-chip">{practiceNames[at] ?? getPracticeName(at, practiceCatalog)}</a>
            {/each}
          </div>
        </div>
      {/if}

      {#if sesion.tags?.length}
        <div class="tag-group">
          <span class="tag-group-label">{$t('sesion_form.tags')}</span>
          <div class="free-chips">
            {#each sesion.tags as tag}
              <a href="/sesiones?tag={tag}" class="free-chip">#{tag}</a>
            {/each}
          </div>
        </div>
      {/if}

      {#if sesion.photos?.length}
        <div class="gallery">
          <div class="photo-frame">
            <img src={sesion.photos[currentPhoto]} alt={sesion.title} class="main-photo" />
          </div>
          {#if sesion.photos.length > 1}
            <div class="photo-thumbs">
              {#each sesion.photos as p, i}
                <button class="thumb-btn {currentPhoto === i ? 'active' : ''}" on:click={() => currentPhoto = i}>
                  <img src={p} alt="" />
                </button>
              {/each}
            </div>
          {/if}
        </div>
      {/if}

      <div class="actions-row">
        <button class="save-btn {saved ? 'saved' : ''}" on:click={toggleSave} disabled={!user}>
          {saved ? $t('sesion.saved') : $t('sesion.save')} ({saveCount})
        </button>
        {#if !user}<span class="auth-hint"><a href="/login">Login</a> {$t('sesion.auth_hint')}</span>{/if}

        {#if isMod(user) || (user && sesion.authorUid === user.uid)}
          <div class="mod-actions">
            {#if isMod(user) && !sesion.reviewed}
              <button class="mod-btn review" on:click={markReviewed}>{$t('sesion.mark_reviewed')}</button>
            {/if}
            <a href="/sesiones/{id}/editar" class="mod-btn edit">{$t('sesion.edit')}</a>
            {#if isMod(user) || (user && sesion.authorUid === user.uid)}
              <button class="mod-btn delete" on:click={deleteSesion}>{$t('sesion.delete')}</button>
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
        <p>{$t('comments.loading')}</p>
      {:else if comments.length === 0}
        <p class="empty-c">{$t('comments.empty')}</p>
      {:else}
        <div class="comment-list">
          {#each comments as c}
            <div class="comment">
              <div class="comment-header">
                <strong>{c.isAnonymous ? $t('common.anonymous') : (c.displayName || $t('common.user'))}</strong>
                <span class="cdate">{c.createdAt?.toDate?.().toLocaleDateString?.() ?? ''}</span>
                {#if user && (c.uid === user.uid || isMod(user))}
                  <button class="del-c" on:click={() => deleteComment(c.id)}>{$t('comments.delete')}</button>
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
  .loading, .notice-big { color: var(--muted-soft); }

  .card { background: var(--surface-solid); border: 1px solid var(--line); border-radius: 18px; padding: 32px; margin-bottom: 20px; display: flex; flex-direction: column; gap: 20px; box-shadow: var(--shadow); }

  .art-header h1 { margin: 0 0 8px; font-size: 1.6rem; letter-spacing: -0.01em; }
  .meta { display: flex; gap: 8px; font-size: 0.85rem; color: var(--muted-soft); }

  .gallery { display: flex; flex-direction: column; gap: 8px; }
  .photo-frame { width: 100%; height: 420px; background: var(--surface-soft); border-radius: 12px; display: flex; align-items: center; justify-content: center; overflow: hidden; }
  .main-photo { max-width: 100%; max-height: 100%; object-fit: contain; border-radius: 8px; }
  .photo-thumbs { display: flex; gap: 8px; }
  .thumb-btn { border: 2px solid transparent; border-radius: 8px; overflow: hidden; cursor: pointer; padding: 0; background: none; }
  .thumb-btn.active { border-color: var(--accent); }
  .thumb-btn img { width: 60px; height: 60px; object-fit: cover; display: block; }

  .body { white-space: pre-wrap; font-size: 0.95rem; line-height: 1.7; color: var(--text); }

  .tag-group { display: flex; flex-direction: column; gap: 8px; }
  .tag-group-label { font-size: 0.75rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.08em; color: var(--muted-soft); }
  .action-chips, .free-chips { display: flex; flex-wrap: wrap; gap: 6px; }
  .action-chip { font-size: 0.82rem; background: rgba(124, 58, 237, 0.14); color: #7c3aed; padding: 4px 12px; border-radius: 999px; text-decoration: none; font-weight: 600; }
  .action-chip:hover { background: rgba(124, 58, 237, 0.24); }
  .free-chip { font-size: 0.82rem; background: var(--pill-bg); color: var(--pill-text); padding: 4px 12px; border-radius: 999px; text-decoration: none; border: 1px solid var(--line); }
  .free-chip:hover { background: var(--pill-bg-hover); }

  .actions-row { display: flex; align-items: center; gap: 12px; flex-wrap: wrap; }
  .save-btn { border: 1.5px solid var(--line-strong); background: var(--pill-bg); color: var(--pill-text); padding: 8px 16px; border-radius: 999px; cursor: pointer; font-weight: 700; font-size: 0.9rem; }
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
  .cdate { font-size: 0.75rem; color: var(--muted-soft); }
  .del-c { margin-left: auto; background: #fee2e2; border: none; cursor: pointer; color: #b91c1c; font-size: 0.75rem; font-weight: 700; padding: 4px 8px; border-radius: 999px; }
  .comment p { margin: 0; font-size: 0.9rem; line-height: 1.5; color: var(--text); }
  .empty-c { color: var(--muted-soft); font-size: 0.9rem; }

  @media (max-width: 600px) {
    .card { padding: 22px 18px; }
    .comments-section { padding: 20px 18px; }
  }
</style>
