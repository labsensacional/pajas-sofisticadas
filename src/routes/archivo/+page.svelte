<script>
  import { onMount } from 'svelte';
  import { auth, db, hasFirebaseConfig } from '$lib/firebase/client.js';
  import { onAuthStateChanged } from 'firebase/auth';
  import {
    collection,
    deleteDoc,
    doc,
    getDocs,
    limit,
    orderBy,
    query,
    runTransaction,
    serverTimestamp,
    startAfter,
    updateDoc,
    where
  } from 'firebase/firestore';
  import { deleteObject, ref } from 'firebase/storage';
  import { storage } from '$lib/firebase/client.js';
  import { getCachedPosts, setCachedPosts } from '$lib/feedCache.js';

  let user = null;
  let posts = [];
  let loading = true;
  let error = '';
  let selectedTag = '';
  let search = '';
  let sort = 'recent';
  let lastDoc = null;
  let hasMore = true;
  let loadingMore = false;
  let userReactions = {};
  let revealed = {};
  let usingCache = false;
  let editId = '';
  let editData = {
    title: '',
    summary: '',
    tried: '',
    results: '',
    state: '',
    context: '',
    tagsInput: ''
  };

  onMount(() => {
    if (!hasFirebaseConfig) {
      loading = false;
      return;
    }

    if (auth) {
      onAuthStateChanged(auth, (value) => {
        user = value;
        if (user) {
          loadUserReactions(posts.map((post) => post.id));
        }
      });
    }
    loadPosts(true);
  });

  async function loadPosts(reset = false) {
    error = '';
    if (reset) {
      const cached = getCachedPosts(sort);
      if (cached?.length) {
        posts = cached;
        usingCache = true;
        loading = false;
      } else {
        posts = [];
        loading = true;
      }
      lastDoc = null;
      hasMore = true;
      userReactions = {};
    } else {
      loadingMore = true;
    }

    if (!hasFirebaseConfig || !hasMore) {
      loading = false;
      loadingMore = false;
      return;
    }

    try {
      const base = collection(db, 'posts');
      const sortField =
        sort === 'saved'
          ? 'saveCount'
          : sort === 'tried'
            ? 'triedCount'
            : sort === 'regular'
              ? 'regularCount'
              : 'createdAt';

      let q =
        sort === 'recent'
          ? query(base, orderBy(sortField, 'desc'), limit(20))
          : query(base, orderBy(sortField, 'desc'), orderBy('createdAt', 'desc'), limit(20));

      if (lastDoc) {
        q =
          sort === 'recent'
            ? query(base, orderBy(sortField, 'desc'), startAfter(lastDoc), limit(20))
            : query(base, orderBy(sortField, 'desc'), orderBy('createdAt', 'desc'), startAfter(lastDoc), limit(20));
      }

      const snapshot = await getDocs(q);
      const newPosts = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      if (reset) {
        posts = newPosts;
      } else {
        posts = [...posts, ...newPosts];
      }
      lastDoc = snapshot.docs[snapshot.docs.length - 1] ?? lastDoc;
      hasMore = snapshot.size === 20;

      if (reset) {
        setCachedPosts(sort, posts);
        usingCache = false;
      }

      if (user) {
        await loadUserReactions(newPosts.map((post) => post.id));
      }
    } catch (err) {
      error = err?.message ?? 'No se pudo cargar el archivo.';
    } finally {
      loading = false;
      loadingMore = false;
    }
  }

  async function loadUserReactions(postIds) {
    if (!user || postIds.length === 0) return;

    const batches = [];
    for (let i = 0; i < postIds.length; i += 10) {
      batches.push(postIds.slice(i, i + 10));
    }

    const updates = {};
    for (const batch of batches) {
      const q = query(
        collection(db, 'postReactions'),
        where('uid', '==', user.uid),
        where('postId', 'in', batch)
      );
      const snapshot = await getDocs(q);
      snapshot.forEach((doc) => {
        updates[doc.data().postId] = doc.data();
      });
    }

    userReactions = { ...userReactions, ...updates };
  }

  function formatTags(tags = []) {
    return Array.isArray(tags) ? tags.join(', ') : '';
  }

  function startEdit(post) {
    editId = post.id;
    editData = {
      title: post.title ?? '',
      summary: post.summary ?? '',
      tried: post.tried ?? '',
      results: post.results ?? '',
      state: post.state ?? '',
      context: post.context ?? '',
      tagsInput: formatTags(post.tags)
    };
  }

  function cancelEdit() {
    editId = '';
  }

  async function saveEdit(post) {
    error = '';
    const tags = editData.tagsInput
      .split(',')
      .map((tag) => tag.trim().toLowerCase())
      .filter(Boolean);

    try {
      await updateDoc(doc(db, 'posts', post.id), {
        title: editData.title.trim(),
        summary: editData.summary.trim(),
        tried: editData.tried.trim(),
        results: editData.results.trim(),
        state: editData.state.trim(),
        context: editData.context.trim(),
        tags
      });
      editId = '';
      await loadPosts();
    } catch (err) {
      error = err?.message ?? 'No se pudo guardar.';
    }
  }

  async function removePost(post) {
    error = '';
    try {
      if (post.images?.length && storage) {
        for (const image of post.images) {
          if (image.path) {
            await deleteObject(ref(storage, image.path));
          }
        }
      }
      await deleteDoc(doc(db, 'posts', post.id));
      await loadPosts();
    } catch (err) {
      error = err?.message ?? 'No se pudo borrar.';
    }
  }

  function toggleReveal(postId, index) {
    const key = `${postId}-${index}`;
    revealed = { ...revealed, [key]: !revealed[key] };
  }

  async function toggleReaction(post, field) {
    if (!user) return;
    error = '';

    const postRef = doc(db, 'posts', post.id);
    const reactionId = `${post.id}_${user.uid}`;
    const reactionRef = doc(db, 'postReactions', reactionId);

    try {
      await runTransaction(db, async (tx) => {
        const postSnap = await tx.get(postRef);
        if (!postSnap.exists()) throw new Error('Post no encontrado.');

        const reactionSnap = await tx.get(reactionRef);
        const current = reactionSnap.exists()
          ? reactionSnap.data()
          : { saved: false, tried: false, regular: false };

        const nextValue = !current[field];
        const delta = nextValue ? 1 : -1;
        const data = postSnap.data();

        const updates = {
          saveCount: data.saveCount ?? 0,
          triedCount: data.triedCount ?? 0,
          regularCount: data.regularCount ?? 0
        };

        if (field === 'saved') updates.saveCount += delta;
        if (field === 'tried') updates.triedCount += delta;
        if (field === 'regular') updates.regularCount += delta;

        tx.update(postRef, updates);
        tx.set(
          reactionRef,
          {
            postId: post.id,
            uid: user.uid,
            saved: field === 'saved' ? nextValue : current.saved,
            tried: field === 'tried' ? nextValue : current.tried,
            regular: field === 'regular' ? nextValue : current.regular,
            updatedAt: serverTimestamp()
          },
          { merge: true }
        );
      });

      userReactions = {
        ...userReactions,
        [post.id]: {
          ...(userReactions[post.id] ?? {}),
          [field]: !(userReactions[post.id]?.[field] ?? false)
        }
      };

      posts = posts.map((item) => {
        if (item.id !== post.id) return item;
        return {
          ...item,
          saveCount: field === 'saved' ? (item.saveCount ?? 0) + (userReactions[post.id]?.[field] ? 1 : -1) : item.saveCount,
          triedCount: field === 'tried' ? (item.triedCount ?? 0) + (userReactions[post.id]?.[field] ? 1 : -1) : item.triedCount,
          regularCount: field === 'regular' ? (item.regularCount ?? 0) + (userReactions[post.id]?.[field] ? 1 : -1) : item.regularCount
        };
      });
    } catch (err) {
      error = err?.message ?? 'No se pudo guardar la reaccion.';
    }
  }

  $: tagCounts = posts.reduce((acc, post) => {
    if (Array.isArray(post.tags)) {
      post.tags.forEach((tag) => {
        acc[tag] = (acc[tag] ?? 0) + 1;
      });
    }
    return acc;
  }, {});

  $: availableTags = Object.entries(tagCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10)
    .map(([tag]) => tag);

  $: filteredPosts = posts.filter((post) => {
    const matchesTag = selectedTag ? (post.tags ?? []).includes(selectedTag) : true;
    const haystack = [
      post.title,
      post.summary,
      post.tried,
      post.results,
      post.state,
      post.context,
      Array.isArray(post.tags) ? post.tags.join(' ') : ''
    ]
      .filter(Boolean)
      .join(' ')
      .toLowerCase();
    const matchesSearch = search.trim() ? haystack.includes(search.trim().toLowerCase()) : true;
    return matchesTag && matchesSearch;
  });
</script>

<svelte:head>
  <title>Archivo · Pajas Sofisticadas</title>
</svelte:head>

<main class="page">
  <header class="header">
    <h1>Archivo</h1>
    <p>Explora experiencias recientes.</p>
  </header>

  {#if !hasFirebaseConfig}
    <div class="warning">Completa `.env` con Firebase.</div>
  {/if}

  {#if loading}
    <div class="skeletons">
      {#each Array(3) as _}
        <div class="skeleton-card">
          <div class="skeleton-title"></div>
          <div class="skeleton-thumb"></div>
          <div class="skeleton-line"></div>
          <div class="skeleton-line short"></div>
        </div>
      {/each}
    </div>
  {:else if error}
    <p class="error">{error}</p>
  {:else if posts.length === 0}
    <section class="empty">
      <p>No hay posts aun. Se viene el primer upload.</p>
      <a class="primary" href="/publicar">Publicar una experiencia</a>
    </section>
  {:else}
    <div class="controls">
      <div class="search">
        <input
          type="text"
          placeholder="Buscar por texto o tags"
          bind:value={search}
        />
      </div>
      <div class="sort">
        <label>
          Ordenar por
          <select bind:value={sort} on:change={() => loadPosts(true)}>
            <option value="recent">Recientes</option>
            <option value="saved">Mas guardadas</option>
            <option value="tried">Mas intentadas</option>
            <option value="regular">Mas practicadas</option>
          </select>
        </label>
      </div>
    </div>
    {#if availableTags.length}
      <div class="filters">
        <button class:selected={!selectedTag} on:click={() => (selectedTag = '')}>Todos</button>
        {#each availableTags as tag}
          <button
            class:selected={selectedTag === tag}
            on:click={() => (selectedTag = selectedTag === tag ? '' : tag)}
          >
            #{tag} ({tagCounts[tag]})
          </button>
        {/each}
      </div>
    {/if}
    <section class="list">
      {#each filteredPosts as post}
        <article>
          {#if editId === post.id}
            <div class="edit">
              <label>
                Titulo
                <input type="text" bind:value={editData.title} />
              </label>
              <label>
                Resumen
                <textarea rows="3" bind:value={editData.summary}></textarea>
              </label>
              <label>
                Que probaste
                <textarea rows="2" bind:value={editData.tried}></textarea>
              </label>
              <label>
                Resultados
                <textarea rows="2" bind:value={editData.results}></textarea>
              </label>
              <label>
                Estado mental/emocional
                <textarea rows="2" bind:value={editData.state}></textarea>
              </label>
              <label>
                Contexto / setup
                <textarea rows="2" bind:value={editData.context}></textarea>
              </label>
              <label>
                Tags
                <input type="text" bind:value={editData.tagsInput} />
              </label>
              <div class="actions">
                <button class="primary" on:click={() => saveEdit(post)}>Guardar</button>
                <button class="ghost" on:click={cancelEdit}>Cancelar</button>
              </div>
            </div>
          {:else}
            <div class="card-header">
              <h2><a href={`/archivo/${post.id}`}>{post.title}</a></h2>
              <span class="date">{post.createdAt?.toDate?.().toLocaleDateString?.() ?? ''}</span>
            </div>
            {#if post.images?.length && user}
              <div class="thumb {post.images[0].nsfw ? 'nsfw' : ''}" on:click={() => toggleReveal(post.id, 0)}>
                <img
                  src={post.images[0].url}
                  alt={post.title}
                  class:blurred={post.images[0].nsfw && !revealed[`${post.id}-0`]}
                />
                {#if post.images[0].nsfw && !revealed[`${post.id}-0`]}
                  <span class="nsfw-label">NSFW</span>
                {/if}
              </div>
            {:else if post.images?.length}
              <div class="thumb locked">
                <span>Inicia sesion para ver imagenes</span>
              </div>
            {/if}
            <p class="summary">{post.summary}</p>
            {#if post.tags?.length}
              <p class="tags">{post.tags.map((tag) => `#${tag}`).join(' ')}</p>
            {/if}
            <div class="reactions">
              <button
                class:active={userReactions[post.id]?.saved}
                on:click={() => toggleReaction(post, 'saved')}
                disabled={!user}
              >
                Guardar ({post.saveCount ?? 0})
              </button>
              <button
                class:active={userReactions[post.id]?.tried}
                on:click={() => toggleReaction(post, 'tried')}
                disabled={!user}
              >
                Lo probe ({post.triedCount ?? 0})
              </button>
              <button
                class:active={userReactions[post.id]?.regular}
                on:click={() => toggleReaction(post, 'regular')}
                disabled={!user}
              >
                Lo hago regularmente ({post.regularCount ?? 0})
              </button>
            </div>
            <p class="meta">
              {post.isAnonymous ? 'Anonimo' : (post.displayName || 'Autor')} · {post.createdAt?.toDate?.().toLocaleString?.() ?? ''}
            </p>
            {#if user && (user.email === 'mathigatti@gmail.com' || (post.authorUid && post.authorUid === user.uid))}
              <div class="actions">
                <button class="ghost" on:click={() => startEdit(post)}>Editar</button>
                <button class="danger" on:click={() => removePost(post)}>Eliminar</button>
              </div>
            {/if}
          {/if}
        </article>
      {/each}
    </section>
    {#if hasMore}
      <div class="load-more">
        <button on:click={() => loadPosts()} disabled={loadingMore}>
          {loadingMore ? 'Cargando...' : 'Cargar mas'}
        </button>
      </div>
    {/if}
  {/if}
</main>

<style>
  .page {
    max-width: 960px;
    margin: 0 auto;
    padding: 48px 24px;
  }

  .header {
    margin-bottom: 32px;
  }

  .empty {
    background: rgba(255, 255, 255, 0.8);
    padding: 24px;
    border-radius: 16px;
  }

  .primary {
    display: inline-block;
    margin-top: 12px;
    padding: 10px 18px;
    border-radius: 999px;
    background: #0c0c15;
    color: #fff;
    text-decoration: none;
  }

  .warning {
    background: #fff3d4;
    padding: 12px;
    border-radius: 12px;
    margin-bottom: 16px;
  }

  .error {
    color: #b91c1c;
  }

  .list {
    display: grid;
    gap: 16px;
  }

  article {
    background: rgba(255, 255, 255, 0.8);
    padding: 20px;
    border-radius: 16px;
  }

  .card-header {
    display: flex;
    justify-content: space-between;
    gap: 12px;
    align-items: baseline;
  }

  .date {
    font-size: 0.8rem;
    color: #6b7280;
  }

  .thumb {
    position: relative;
    margin: 12px 0;
    border-radius: 14px;
    overflow: hidden;
    background: #f3f4f6;
    cursor: pointer;
  }

  .thumb img {
    width: 100%;
    height: 220px;
    object-fit: cover;
    display: block;
  }

  .thumb img.blurred {
    filter: blur(14px);
  }

  .nsfw-label {
    position: absolute;
    bottom: 10px;
    right: 10px;
    background: rgba(0, 0, 0, 0.7);
    color: #fff;
    padding: 4px 8px;
    border-radius: 999px;
    font-size: 0.75rem;
  }

  .thumb.locked {
    display: grid;
    place-items: center;
    height: 180px;
    color: #6b7280;
    font-weight: 600;
  }

  .summary {
    margin: 8px 0 12px;
  }

  .meta {
    font-size: 0.85rem;
    color: #4b5563;
  }

  .filters {
    display: flex;
    gap: 8px;
    flex-wrap: wrap;
    margin-bottom: 16px;
  }

  .filters button {
    border: 1px solid rgba(12, 12, 21, 0.2);
    background: transparent;
    padding: 6px 12px;
    border-radius: 999px;
    cursor: pointer;
  }

  .filters .selected {
    background: #0c0c15;
    color: #fff;
    border-color: #0c0c15;
  }

  .controls {
    display: flex;
    gap: 16px;
    flex-wrap: wrap;
    align-items: end;
    margin-bottom: 12px;
  }

  .search {
    flex: 1;
    min-width: 240px;
  }

  .search input {
    width: 100%;
    border: 1px solid rgba(12, 12, 21, 0.2);
    border-radius: 12px;
    padding: 10px 12px;
    font: inherit;
  }

  .sort select {
    margin-left: 8px;
    border-radius: 10px;
    border: 1px solid rgba(12, 12, 21, 0.2);
    padding: 6px 10px;
    font: inherit;
  }

  h2 a {
    color: #0c0c15;
    text-decoration: none;
  }

  h2 a:hover {
    text-decoration: underline;
  }

  .tags {
    color: #6b7280;
    font-size: 0.9rem;
  }

  .reactions {
    display: flex;
    gap: 8px;
    flex-wrap: wrap;
    margin: 10px 0;
  }

  .reactions button {
    border: 1px solid rgba(12, 12, 21, 0.2);
    background: transparent;
    padding: 6px 10px;
    border-radius: 999px;
    cursor: pointer;
  }

  .reactions button.active {
    background: #0c0c15;
    color: #fff;
    border-color: #0c0c15;
  }

  .actions {
    display: flex;
    gap: 8px;
    margin-top: 12px;
  }

  .primary {
    background: #0c0c15;
    color: #fff;
    border: none;
    padding: 6px 12px;
    border-radius: 999px;
  }

  .ghost {
    background: transparent;
    border: 1px solid #0c0c15;
    color: #0c0c15;
    padding: 6px 12px;
    border-radius: 999px;
  }

  .danger {
    background: #b91c1c;
    color: #fff;
    border: none;
    padding: 6px 12px;
    border-radius: 999px;
  }

  .edit {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .edit label {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  .edit input,
  .edit textarea {
    border: 1px solid rgba(12, 12, 21, 0.2);
    border-radius: 10px;
    padding: 8px 10px;
    font: inherit;
  }

  .load-more {
    margin-top: 16px;
  }

  .load-more button {
    border: 1px solid rgba(12, 12, 21, 0.2);
    background: transparent;
    padding: 8px 16px;
    border-radius: 999px;
    cursor: pointer;
  }

  .skeletons {
    display: grid;
    gap: 16px;
  }

  .skeleton-card {
    background: rgba(255, 255, 255, 0.7);
    padding: 20px;
    border-radius: 16px;
    display: grid;
    gap: 12px;
  }

  .skeleton-title,
  .skeleton-thumb,
  .skeleton-line {
    background: linear-gradient(90deg, #f3f4f6 0%, #e5e7eb 50%, #f3f4f6 100%);
    background-size: 200% 100%;
    animation: shimmer 1.4s ease-in-out infinite;
    border-radius: 10px;
  }

  .skeleton-title {
    height: 22px;
    width: 60%;
  }

  .skeleton-thumb {
    height: 180px;
  }

  .skeleton-line {
    height: 14px;
  }

  .skeleton-line.short {
    width: 70%;
  }

  @keyframes shimmer {
    0% {
      background-position: 200% 0;
    }
    100% {
      background-position: -200% 0;
    }
  }
</style>
