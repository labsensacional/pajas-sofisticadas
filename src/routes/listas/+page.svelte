<script>
  import { onMount } from 'svelte';
  import { auth, db, hasFirebaseConfig } from '$lib/firebase/client.js';
  import { onAuthStateChanged } from 'firebase/auth';
  import { collection, getDocs, query, where, documentId } from 'firebase/firestore';

  let user = null;
  let tab = 'saved';
  let posts = [];
  let loading = true;
  let error = '';

  const labels = {
    saved: 'Guardados',
    tried: 'Lo probe',
    regular: 'Lo hago regularmente'
  };

  onMount(() => {
    if (!hasFirebaseConfig) {
      loading = false;
      return;
    }

    if (auth) {
      return onAuthStateChanged(auth, (value) => {
        user = value;
        if (user) {
          loadList();
        } else {
          loading = false;
        }
      });
    }
  });

  async function loadList() {
    if (!user) return;
    loading = true;
    error = '';

    try {
      const q = query(
        collection(db, 'postReactions'),
        where('uid', '==', user.uid),
        where(tab, '==', true)
      );
      const snapshot = await getDocs(q);
      const postIds = snapshot.docs.map((doc) => doc.data().postId);

      if (postIds.length === 0) {
        posts = [];
        loading = false;
        return;
      }

      const batches = [];
      for (let i = 0; i < postIds.length; i += 10) {
        batches.push(postIds.slice(i, i + 10));
      }

      const results = [];
      for (const batch of batches) {
        const pq = query(
          collection(db, 'posts'),
          where(documentId(), 'in', batch)
        );
        const postSnap = await getDocs(pq);
        postSnap.forEach((doc) => results.push({ id: doc.id, ...doc.data() }));
      }

      posts = results;
    } catch (err) {
      error = err?.message ?? 'No se pudo cargar la lista.';
    } finally {
      loading = false;
    }
  }

  function changeTab(next) {
    tab = next;
    loadList();
  }
</script>

<svelte:head>
  <title>Mis listas · Pajas Sofisticadas</title>
</svelte:head>

<main class="page">
  <header class="header">
    <h1>Mis listas</h1>
    <p>Tu archivo personal de guardados y practicas.</p>
  </header>

  {#if !hasFirebaseConfig}
    <div class="warning">Completa `.env` con Firebase.</div>
  {:else if !user}
    <div class="warning">Inicia sesion para ver tus listas. <a href="/login">Login</a></div>
  {:else}
    <div class="tabs">
      {#each Object.keys(labels) as key}
        <button class:selected={tab === key} on:click={() => changeTab(key)}>{labels[key]}</button>
      {/each}
    </div>

    {#if loading}
      <p>Cargando...</p>
    {:else if error}
      <p class="error">{error}</p>
    {:else if posts.length === 0}
      <p>No hay posts en esta lista.</p>
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

  .tabs {
    display: flex;
    gap: 10px;
    flex-wrap: wrap;
    margin-bottom: 16px;
  }

  .tabs button {
    border: 1px solid rgba(12, 12, 21, 0.2);
    background: transparent;
    padding: 6px 12px;
    border-radius: 999px;
    cursor: pointer;
  }

  .tabs .selected {
    background: #0c0c15;
    color: #fff;
    border-color: #0c0c15;
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
