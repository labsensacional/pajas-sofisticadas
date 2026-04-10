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
  import { findStatic } from '$lib/actions.js';
  import { isMod } from '$lib/moderator.js';

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

  $: allWarnings = accion
    ? (accion.warnings ?? [...(accion.common_errors ?? []), ...(accion.warning ? [accion.warning] : [])])
    : [];

  $: id = $page.params.id;

  const AXES = [
    { key: 'arousal',    label: 'Activación', color: '#FF8C42' },
    { key: 'trance',     label: 'Trance',     color: '#7B68EE' },
    { key: 'pleasure',   label: 'Placer',     color: '#FF6B9D' },
    { key: 'dopamine',   label: 'Dopamina',   color: '#FFD166' },
    { key: 'endorphins', label: 'Endorfinas', color: '#06D6A0' },
    { key: 'oxytocin',   label: 'Oxitocina',  color: '#74B0FF' },
    { key: 'energy',     label: 'Energía',    color: '#aaa' },
  ];

  onMount(() => {
    // Load from static catalog first
    accion = findStatic(id);

    if (auth) onAuthStateChanged(auth, v => { user = v; if (v) loadUserSave(); });

    if (hasFirebaseConfig && db) {
      // Always check Firestore — override static if a Firestore version exists
      loadFromFirestore();
      loadComments();
      loadSaveCount();
    }
  });

  async function loadFromFirestore() {
    const { getDoc, doc: docRef } = await import('firebase/firestore');
    const snap = await getDoc(docRef(db, 'acciones', id));
    if (snap.exists()) accion = { id: snap.id, ...snap.data() };
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
    } catch (e) { error = e?.message ?? 'Error al guardar.'; }
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
      const currentUsername = auth?.currentUser?.displayName || user.displayName || user.email?.split('@')[0] || 'Usuario';
      await addDoc(collection(db, 'comments'), {
        parentId: id, parentType: 'accion', uid: user.uid,
        text: commentText.trim(),
        displayName: commentAnonymous ? 'Anónimo' : currentUsername,
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
      notice = 'Marcada como revisada.';
    } catch (e) { error = e?.message ?? 'Error.'; }
  }

  async function deleteAccion() {
    if (!confirm('¿Eliminar esta acción?')) return;
    try {
      if (storage && accion.photos?.length) {
        const { ref, deleteObject } = await import('firebase/storage');
        await Promise.all(accion.photos.map(url => deleteObject(ref(storage, url)).catch(() => {})));
      }
      await deleteDoc(doc(db, 'acciones', id));
      notice = 'Acción eliminada.'; accion = null;
    } catch (e) { error = e?.message ?? 'Error.'; }
  }
</script>

<svelte:head><title>{accion?.name ?? 'Acción'} · Laboratorio Sensacional</title></svelte:head>

<main class="page">
  <a href="/acciones" class="back">← Acciones</a>

  {#if !accion}
    <p class="loading">Cargando…</p>
  {:else}
    <article class="card">
      <header class="art-header">
        <div class="title-row">
          <h1>{accion.name}</h1>
        </div>
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

      <p class="desc">{accion.description}</p>

      {#if allWarnings.length}
        <div class="warnings">
          {#each allWarnings as w}<p>⚠ {w}</p>{/each}
        </div>
      {/if}

      <div class="axes">
        {#each [
          { key:'arousal', label:'Activación', color:'#FF8C42' },
          { key:'trance',  label:'Trance',  color:'#7B68EE' },
          { key:'pleasure',label:'Placer',  color:'#FF6B9D' },
        ] as ax}
          {@const v = accion[ax.key] ?? 0}
          <div class="axis-block">
            <div class="axis-head" style="color:{ax.color}">{ax.label}</div>
            <div class="axis-bar-track">
              <div class="bar-center"></div>
              <div class="axis-bar-fill" style="left:{v >= 0 ? 50 : 50 + v * 5}%; width:{Math.abs(v) * 5}%; background:{ax.color}"></div>
            </div>
            <div class="axis-val">{v}</div>
            {#if accion[ax.key + '_why']}<p class="axis-why">{accion[ax.key + '_why']}</p>{/if}
          </div>
        {/each}
      </div>

      <div class="secondary-bars">
        {#each [
          { key:'dopamine',   label:'Dopamina',   color:'#FFD166', bipolar: true },
          { key:'endorphins', label:'Endorfinas',  color:'#06D6A0', bipolar: true },
          { key:'oxytocin',   label:'Oxitocina',   color:'#74B0FF', bipolar: true },
          { key:'energy',     label:'Energía',     color:'#aaa',    bipolar: false },
        ] as ax}
          {@const v = accion[ax.key] ?? 0}
          <div class="sec-row">
            <span class="sec-label">{ax.label}</span>
            <div class="bar-track">
              {#if ax.bipolar}<div class="bar-center"></div>{/if}
              <div class="bar-fill" style="{ax.bipolar ? `left:${v >= 0 ? 50 : 50 + v * 5}%; width:${Math.abs(v) * 5}%` : `left:0; width:${v * 10}%`}; background:{ax.color}"></div>
            </div>
            <span class="sec-val">{v}</span>
          </div>
        {/each}
      </div>

      {#if accion.hello_world}
        <section class="section">
          <h3>Hello world</h3>
          <p>{accion.hello_world}</p>
        </section>
      {/if}


      {#if accion.tags?.length}
        <div class="tags">
          {#each (Array.isArray(accion.tags) ? accion.tags : accion.tags.split(' ')) as tag}
            <a href="/acciones?tag={tag}" class="tag">{tag}</a>
          {/each}
        </div>
      {/if}

      <div class="actions-row">
        <button class="save-btn {saved ? 'saved' : ''}" on:click={toggleSave} disabled={!user}>
          {saved ? '★ Guardada' : '☆ Guardar'} ({saveCount})
        </button>
        {#if !user}<span class="auth-hint"><a href="/login">Login</a> para guardar y comentar</span>{/if}

        {#if isMod(user) || (user && accion.createdBy === user.uid)}
          <div class="mod-actions">
            {#if isMod(user) && !accion.reviewed && !accion._static}
              <button class="mod-btn review" on:click={markReviewed}>Marcar como revisada</button>
            {/if}
            <a href="/acciones/{id}/editar" class="mod-btn edit">Editar</a>
            {#if !accion._static}
              <button class="mod-btn delete" on:click={deleteAccion}>Eliminar</button>
            {/if}
          </div>
        {/if}
      </div>

      {#if error}<p class="error">{error}</p>{/if}
      {#if notice}<p class="notice">{notice}</p>{/if}
    </article>

    <section class="comments-section">
      <h2>Comentarios</h2>
      {#if user}
        <div class="comment-form">
          <textarea rows="3" placeholder="Escribí un comentario…" bind:value={commentText}></textarea>
          <label class="comment-anon">
            <input type="checkbox" bind:checked={commentAnonymous} />
            <span>Comentar como anónimo</span>
          </label>
          <button on:click={addComment} disabled={!commentText.trim()}>Comentar</button>
        </div>
      {:else}
        <p class="auth-hint"><a href="/login">Iniciá sesión</a> para comentar.</p>
      {/if}

      {#if loadingComments}
        <p class="loading">Cargando comentarios…</p>
      {:else if comments.length === 0}
        <p class="empty-comments">Sin comentarios todavía.</p>
      {:else}
        <div class="comment-list">
          {#each comments as c}
            <div class="comment">
              <div class="comment-header">
                <strong>{c.isAnonymous ? 'Anónimo' : (c.displayName || 'Usuario')}</strong>
                <span class="comment-date">{c.createdAt?.toDate?.().toLocaleDateString?.() ?? ''}</span>
                {#if user && (c.uid === user.uid || isMod(user))}
                  <button class="del-comment" on:click={() => deleteComment(c.id)}>Borrar</button>
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

  .axes { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; }
  .axis-block { display: flex; flex-direction: column; gap: 6px; }
  .axis-head { font-weight: 800; font-size: 0.85rem; text-transform: uppercase; letter-spacing: 0.08em; }
  .axis-bar-track { height: 6px; background: var(--surface-soft); border-radius: 4px; position: relative; overflow: hidden; }
  .axis-bar-fill { position: absolute; height: 100%; border-radius: 4px; transition: left 0.3s, width 0.3s; }
  .axis-val { font-size: 1.2rem; font-weight: 800; font-family: monospace; color: var(--text); }
  .axis-why { margin: 0; font-size: 0.8rem; color: var(--muted); line-height: 1.4; }

  .secondary-bars { display: flex; flex-direction: column; gap: 6px; }
  .sec-row { display: flex; align-items: center; gap: 8px; }
  .sec-label { font-size: 0.8rem; color: var(--muted); width: 80px; }
  .bar-track { flex: 1; height: 4px; background: var(--surface-soft); border-radius: 4px; position: relative; overflow: hidden; }
  .bar-center { position: absolute; left: 50%; width: 1px; height: 100%; background: var(--line-strong); }
  .bar-fill { position: absolute; height: 100%; border-radius: 4px; }
  .sec-val { font-size: 0.75rem; font-family: monospace; color: var(--muted-soft); width: 20px; }

  .section h3 { margin: 0 0 8px; font-size: 0.9rem; text-transform: uppercase; letter-spacing: 0.06em; color: var(--muted-soft); }
  .section p { margin: 0; font-size: 0.92rem; line-height: 1.6; color: var(--text); }

  .tags { display: flex; flex-wrap: wrap; gap: 6px; }
  .tag { font-size: 0.78rem; background: var(--pill-bg); color: var(--pill-text); padding: 4px 10px; border-radius: 999px; text-decoration: none; border: 1px solid var(--line); }
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
    .axes { grid-template-columns: 1fr 1fr; }
    .card { padding: 22px 18px; }
    .comments-section { padding: 20px 18px; }
  }
</style>
