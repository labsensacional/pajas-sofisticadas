<script>
  import { onMount } from 'svelte';
  import { auth, db, hasFirebaseConfig } from '$lib/firebase/client.js';
  import { onAuthStateChanged } from 'firebase/auth';
  import { collection, getDocs, orderBy, query, where } from 'firebase/firestore';

  let user = null;
  let posts = [];
  let loading = true;
  let error = '';

  onMount(() => {
    if (!hasFirebaseConfig) {
      loading = false;
      return;
    }

    if (auth) {
      return onAuthStateChanged(auth, (value) => {
        user = value;
        if (user) {
          loadPosts();
        } else {
          loading = false;
        }
      });
    }
  });

  async function loadPosts() {
    if (!user) return;
    loading = true;
    error = '';

    try {
      const q = query(
        collection(db, 'posts'),
        where('authorUid', '==', user.uid),
        orderBy('createdAt', 'desc')
      );
      const snapshot = await getDocs(q);
      posts = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    } catch (err) {
      error = err?.message ?? 'No se pudo cargar.';
    } finally {
      loading = false;
    }
  }
</script>

<svelte:head>
  <title>Mis posts · Pajas Sofisticadas</title>
</svelte:head>

<main class="page">
  <header class="header">
    <h1>Mis posts</h1>
    <p>Posts no anonimos publicados con tu usuario.</p>
  </header>

  {#if !hasFirebaseConfig}
    <div class="warning">Completa `.env` con Firebase.</div>
  {:else if !user}
    <div class="warning">Inicia sesion para ver tus posts. <a href="/login">Login</a></div>
  {:else if loading}
    <p>Cargando...</p>
  {:else if error}
    <p class="error">{error}</p>
  {:else if posts.length === 0}
    <p>No hay posts publicados aun.</p>
  {:else}
    <div class="list">
      {#each posts as post}
        <article>
          <h2><a href={`/archivo/${post.id}`}>{post.title}</a></h2>
          <p>{post.summary}</p>
        </article>
      {/each}
    </div>
  {/if}
</main>

<style>
  .page {
    max-width: 760px;
    margin: 0 auto;
    padding: 40px 24px;
  }

  .header {
    margin-bottom: 20px;
  }

  .list {
    display: grid;
    gap: 12px;
  }

  article {
    background: rgba(255, 255, 255, 0.85);
    padding: 16px;
    border-radius: 14px;
  }

  h2 a {
    color: #0c0c15;
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
</style>
