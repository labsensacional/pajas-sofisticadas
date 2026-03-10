<script>
  import { onMount } from 'svelte';
  import { page } from '$app/stores';
  import { auth, db, hasFirebaseConfig } from '$lib/firebase/client.js';
  import { onAuthStateChanged } from 'firebase/auth';
  import {
    addDoc,
    collection,
    doc,
    getDoc,
    getDocs,
    orderBy,
    query,
    runTransaction,
    serverTimestamp,
    where
  } from 'firebase/firestore';

  let user = null;
  let post = null;
  let loading = true;
  let error = '';
  let reaction = { saved: false, tried: false, regular: false };
  let commentText = '';
  let comments = [];
  let loadingComments = false;
  let revealed = {};

  $: postId = $page.params.id;

  onMount(() => {
    if (!hasFirebaseConfig) {
      loading = false;
      return;
    }

    if (auth) {
      onAuthStateChanged(auth, (value) => {
        user = value;
        loadPost();
        if (user) {
          loadReaction();
        }
      });
    }
    loadPost();
    loadComments();
  });

  async function loadPost() {
    error = '';
    loading = true;
    try {
      const snapshot = await getDoc(doc(db, 'posts', postId));
      if (!snapshot.exists()) {
        error = 'Post no encontrado.';
      } else {
        post = { id: snapshot.id, ...snapshot.data() };
      }
    } catch (err) {
      error = err?.message ?? 'No se pudo cargar el post.';
    } finally {
      loading = false;
    }
  }

  async function loadReaction() {
    if (!user) return;
    const reactionId = `${postId}_${user.uid}`;
    const snap = await getDoc(doc(db, 'postReactions', reactionId));
    if (snap.exists()) {
      reaction = snap.data();
    }
  }

  async function toggleReaction(field) {
    if (!user || !post) return;
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

      const nextValue = !reaction[field];
      const delta = nextValue ? 1 : -1;
      reaction = { ...reaction, [field]: nextValue };
      post = {
        ...post,
        saveCount: field === 'saved' ? (post.saveCount ?? 0) + delta : post.saveCount,
        triedCount: field === 'tried' ? (post.triedCount ?? 0) + delta : post.triedCount,
        regularCount: field === 'regular' ? (post.regularCount ?? 0) + delta : post.regularCount
      };
    } catch (err) {
      error = err?.message ?? 'No se pudo guardar la reaccion.';
    }
  }

  async function loadComments() {
    loadingComments = true;
    const q = query(
      collection(db, 'comments'),
      where('postId', '==', postId),
      orderBy('createdAt', 'asc')
    );
    const snapshot = await getDocs(q);
    comments = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    loadingComments = false;
  }

  async function addComment() {
    if (!user || !commentText.trim()) return;
    try {
      await addDoc(collection(db, 'comments'), {
        postId,
        uid: user.uid,
        text: commentText.trim(),
        createdAt: serverTimestamp()
      });
      commentText = '';
      await loadComments();
    } catch (err) {
      error = err?.message ?? 'No se pudo comentar.';
    }
  }

  function toggleReveal(index) {
    revealed = { ...revealed, [index]: !revealed[index] };
  }
</script>

<svelte:head>
  <title>{post?.title ?? 'Post'} · Pajas Sofisticadas</title>
</svelte:head>

<main class="page">
  <a class="back" href="/archivo">← Volver</a>

  {#if !hasFirebaseConfig}
    <div class="warning">Completa `.env` con Firebase.</div>
  {:else if loading}
    <p>Cargando...</p>
  {:else if error}
    <p class="error">{error}</p>
  {:else if post}
    <article>
      <h1>{post.title}</h1>
      <p class="summary">{post.summary}</p>
      {#if post.tags?.length}
        <p class="tags">{post.tags.map((tag) => `#${tag}`).join(' ')}</p>
      {/if}

      {#if user && post.images?.length}
        <div class="gallery">
          {#each post.images as image, index}
            <div class="image" on:click={() => toggleReveal(index)}>
              <img
                src={image.url}
                alt={post.title}
                class:blurred={image.nsfw && !revealed[index]}
              />
              {#if image.nsfw && !revealed[index]}
                <span class="nsfw-label">NSFW</span>
              {/if}
            </div>
          {/each}
        </div>
      {:else if post.images?.length}
        <div class="gallery locked">
          <span>Inicia sesion para ver imagenes</span>
        </div>
      {/if}

      <div class="reactions">
        <button class:active={reaction.saved} on:click={() => toggleReaction('saved')} disabled={!user}>
          Guardar ({post.saveCount ?? 0})
        </button>
        <button class:active={reaction.tried} on:click={() => toggleReaction('tried')} disabled={!user}>
          Lo probe ({post.triedCount ?? 0})
        </button>
        <button class:active={reaction.regular} on:click={() => toggleReaction('regular')} disabled={!user}>
          Lo hago regularmente ({post.regularCount ?? 0})
        </button>
      </div>

      {#if post.tried}
        <section>
          <h2>Que probaste</h2>
          <p>{post.tried}</p>
        </section>
      {/if}
      {#if post.results}
        <section>
          <h2>Resultados</h2>
          <p>{post.results}</p>
        </section>
      {/if}
      {#if post.state}
        <section>
          <h2>Estado mental/emocional</h2>
          <p>{post.state}</p>
        </section>
      {/if}
      {#if post.context}
        <section>
          <h2>Contexto / setup</h2>
          <p>{post.context}</p>
        </section>
      {/if}
      <p class="meta">
        {post.isAnonymous ? 'Anonimo' : (post.displayName || 'Autor')} · {post.createdAt?.toDate?.().toLocaleString?.() ?? ''}
      </p>

      <section class="comments">
        <h2>Comentarios</h2>
        {#if user}
          <div class="comment-form">
            <textarea rows="3" placeholder="Escribe un comentario" bind:value={commentText}></textarea>
            <button on:click={addComment}>Comentar</button>
          </div>
        {:else}
          <div class="warning">Inicia sesion para comentar. <a href="/login">Login</a></div>
        {/if}
        {#if loadingComments}
          <p>Cargando comentarios...</p>
        {:else if comments.length === 0}
          <p>No hay comentarios aun.</p>
        {:else}
          <div class="comment-list">
            {#each comments as comment}
              <div class="comment">
                <p>{comment.text}</p>
                <span>{comment.createdAt?.toDate?.().toLocaleString?.() ?? ''}</span>
              </div>
            {/each}
          </div>
        {/if}
      </section>
    </article>
  {/if}
</main>

<style>
  .page {
    max-width: 760px;
    margin: 0 auto;
    padding: 40px 24px;
  }

  .back {
    display: inline-block;
    margin-bottom: 20px;
    text-decoration: none;
    color: #0c0c15;
    font-weight: 600;
  }

  article {
    background: rgba(255, 255, 255, 0.85);
    padding: 28px;
    border-radius: 18px;
  }

  .summary {
    font-size: 1.1rem;
    margin-bottom: 18px;
  }

  .tags {
    color: #6b7280;
    margin-bottom: 18px;
  }

  section {
    margin-bottom: 16px;
  }

  h2 {
    margin: 0 0 6px;
    font-size: 1rem;
    text-transform: uppercase;
    letter-spacing: 0.08em;
  }

  .meta {
    font-size: 0.85rem;
    color: #4b5563;
  }

  .reactions {
    display: flex;
    gap: 8px;
    flex-wrap: wrap;
    margin: 12px 0 18px;
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

  .gallery {
    display: grid;
    gap: 12px;
    grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
    margin: 12px 0 18px;
  }

  .gallery.locked {
    background: rgba(255, 255, 255, 0.7);
    padding: 20px;
    border-radius: 14px;
    color: #6b7280;
    font-weight: 600;
  }

  .image {
    position: relative;
    border-radius: 14px;
    overflow: hidden;
    background: #f3f4f6;
    cursor: pointer;
  }

  .image img {
    width: 100%;
    height: 180px;
    object-fit: cover;
    display: block;
  }

  .image img.blurred {
    filter: blur(16px);
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

  .comments {
    margin-top: 24px;
  }

  .comment-form {
    display: flex;
    flex-direction: column;
    gap: 8px;
    margin-bottom: 16px;
  }

  .comment-form textarea {
    border: 1px solid rgba(12, 12, 21, 0.2);
    border-radius: 12px;
    padding: 10px 12px;
    font: inherit;
  }

  .comment-form button {
    align-self: flex-start;
    border: none;
    background: #0c0c15;
    color: #fff;
    padding: 8px 16px;
    border-radius: 999px;
  }

  .comment-list {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  .comment {
    background: rgba(255, 255, 255, 0.9);
    border-radius: 12px;
    padding: 12px;
  }

  .comment span {
    font-size: 0.75rem;
    color: #6b7280;
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
</style>
