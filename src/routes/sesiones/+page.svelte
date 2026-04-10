<script>
  // @ts-nocheck
  import { onMount } from 'svelte';
  import { page } from '$app/stores';
  import { goto } from '$app/navigation';
  import { db, auth, hasFirebaseConfig } from '$lib/firebase/client.js';
  import { onAuthStateChanged } from 'firebase/auth';
  import { collection, getDocs, orderBy, query } from 'firebase/firestore';
  import { isMod } from '$lib/moderator.js';
  import { findStatic } from '$lib/actions.js';

  function accionName(id) { return findStatic(id)?.name ?? id; }

  /** @type {any} */
  let user = null;
  /** @type {any[]} */
  let sesiones = [];
  let search = '';
  let selectedTag = '';
  let selectedAccion = '';
  let sortBy = 'newest';
  let showUnreviewed = false;
  let loading = true;

  function updateTag(tag) {
    const params = new URLSearchParams($page.url.searchParams);
    if (tag) params.set('tag', tag);
    else params.delete('tag');
    goto(`${$page.url.pathname}${params.size ? `?${params}` : ''}`, {
      keepFocus: true,
      noScroll: true,
      replaceState: true
    });
  }

  onMount(() => {
    if (auth) onAuthStateChanged(auth, v => { user = v; });
    load();
  });

  $: selectedTag = $page.url.searchParams.get('tag') ?? '';

  async function load() {
    loading = true;
    if (!hasFirebaseConfig || !db) { loading = false; return; }
    try {
      const snap = await getDocs(query(collection(db, 'sesiones'), orderBy('createdAt', 'desc')));
      sesiones = snap.docs.map(d => ({ id: d.id, ...d.data() }));
    } catch (e) { console.error(e); }
    loading = false;
  }

  $: allTags = [...new Set(sesiones.flatMap(s => s.tags ?? []))].sort();
  $: allAccionTags = [...new Set(sesiones.flatMap(s => s.accionTags ?? []))].sort();

  $: filtered = sesiones.filter(s => {
    if (showUnreviewed) return !s.reviewed;
    const matchTag = !selectedTag || (s.tags ?? []).includes(selectedTag);
    const matchAccion = !selectedAccion || (s.accionTags ?? []).includes(selectedAccion);
    const q = search.trim().toLowerCase();
    const matchSearch = !q || (s.title + ' ' + (s.body ?? '')).toLowerCase().includes(q);
    return matchTag && matchAccion && matchSearch;
  }).sort((a, b) => {
    if (sortBy === 'saves') return (b.saves ?? 0) - (a.saves ?? 0);
    return (b.createdAt?.seconds ?? 0) - (a.createdAt?.seconds ?? 0);
  });
</script>

<svelte:head><title>Sesiones · Laboratorio Sensacional</title></svelte:head>

<main class="page">
  <header class="header">
    <div>
      <h1>Sesiones</h1>
      <p>Relatos de sesiones compartidos por la comunidad</p>
    </div>
    {#if user}
      <a href="/sesiones/nueva" class="btn-new">+ Nueva sesión</a>
    {/if}
  </header>

  <div class="controls">
    <input class="search" type="text" placeholder="Buscar en título y contenido…" bind:value={search} />
    <select bind:value={sortBy}>
      <option value="newest">Más recientes</option>
      <option value="saves">Más guardadas</option>
    </select>
  </div>

  {#if allTags.length}
    <div class="filter-group">
      <span class="filter-label">Tags</span>
      <div class="chips">
        <button class="chip {selectedTag === '' ? 'active' : ''}" on:click={() => updateTag('')}>Todos</button>
        {#each allTags as tag}
          <button class="chip {selectedTag === tag ? 'active' : ''}" on:click={() => updateTag(selectedTag === tag ? '' : tag)}>
            {tag}
          </button>
        {/each}
      </div>
    </div>
  {/if}

  {#if allAccionTags.length}
    <div class="filter-group">
      <span class="filter-label">Acciones</span>
      <div class="chips">
        <button class="chip {selectedAccion === '' ? 'active' : ''}" on:click={() => selectedAccion = ''}>Todas</button>
        {#each allAccionTags as a}
          <button class="chip accion {selectedAccion === a ? 'active' : ''}" on:click={() => selectedAccion = selectedAccion === a ? '' : a}>
            {accionName(a)}
          </button>
        {/each}
      </div>
    </div>
  {/if}

  {#if isMod(user)}
    <div class="mod-bar">
      <button class="chip mod {showUnreviewed ? 'active' : ''}" on:click={() => { showUnreviewed = !showUnreviewed; selectedTag = ''; selectedAccion = ''; }}>
        Sin revisar {#if showUnreviewed}({filtered.length}){/if}
      </button>
    </div>
  {/if}

  {#if loading}
    <div class="skeletons">{#each Array(4) as _}<div class="skeleton"></div>{/each}</div>
  {:else if filtered.length === 0}
    <p class="empty">{showUnreviewed ? 'Todo revisado.' : 'No hay sesiones todavía.'}</p>
  {:else}
    <div class="grid">
      {#each filtered as s}
        <a href="/sesiones/{s.id}" class="card {s.photos?.length ? 'has-photo' : ''}">
          <div class="card-body">
            <h2>{s.title}</h2>
            {#if s.body}
              <p class="snippet">{s.body.slice(0, 140)}{s.body.length > 140 ? '…' : ''}</p>
            {/if}
            <div class="meta-row">
              <span class="meta-author">{s.authorName || 'Anónimo'}</span>
              <span class="meta-date">{s.createdAt?.toDate?.().toLocaleDateString?.() ?? ''}</span>
              {#if (s.saves ?? 0) > 0}<span class="meta-saves">★ {s.saves}</span>{/if}
              {#if s.photos?.length}<span class="meta-photos">📷 {s.photos.length}</span>{/if}
            </div>
            {#if s.accionTags?.length}
              <div class="action-chips">
                {#each s.accionTags.slice(0, 4) as at}
                  <span class="action-chip">{accionName(at)}</span>
                {/each}
              </div>
            {/if}
            {#if s.tags?.length}
              <div class="tag-chips">
                {#each s.tags.slice(0, 4) as t}
                  <span class="tag-chip">#{t}</span>
                {/each}
              </div>
            {/if}
            {#if isMod(user) && !s.reviewed}
              <span class="badge-unreviewed">sin revisar</span>
            {/if}
          </div>
        </a>
      {/each}
    </div>
  {/if}
</main>

<style>
  .page { max-width: 1000px; margin: 0 auto; padding: 48px 24px; }

  .header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 24px; }
  .header h1 { margin: 0 0 4px; }
  .header p { margin: 0; color: #6b7280; font-size: 0.9rem; }

  .btn-new { background: var(--accent); color: var(--accent-contrast); text-decoration: none; padding: 9px 18px; border-radius: 999px; font-weight: 700; font-size: 0.9rem; white-space: nowrap; }

  .controls { display: flex; gap: 12px; margin-bottom: 14px; flex-wrap: wrap; }
  .search { flex: 1; min-width: 200px; border: 1px solid rgba(12,12,21,0.15); border-radius: 10px; padding: 10px 14px; font: inherit; }
  select { border: 1px solid rgba(12,12,21,0.15); border-radius: 10px; padding: 10px 12px; font: inherit; background: #fff; }

  .filter-group { margin-bottom: 10px; }
  .filter-label { font-size: 0.75rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.08em; color: #9ca3af; display: block; margin-bottom: 6px; }
  .chips { display: flex; flex-wrap: wrap; gap: 6px; }

  .chip { border: 1px solid var(--line-strong); background: var(--pill-bg); padding: 5px 12px; border-radius: 999px; cursor: pointer; font-size: 0.82rem; font-weight: 600; color: var(--pill-text); }
  .chip.active { background: var(--pill-active-bg); color: var(--pill-active-text); border-color: var(--pill-active-bg); }
  .chip.accion.active { background: #7c3aed; border-color: #7c3aed; }
  .chip.mod { color: #7c3aed; border-color: #7c3aed; }
  .chip.mod.active { background: #7c3aed; color: #fff; }

  .mod-bar { margin: 10px 0 20px; }

  .grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 14px; margin-top: 20px; }

  .card {
    background: var(--surface-solid); border: 1px solid var(--line); border-radius: 14px;
    overflow: hidden; text-decoration: none; color: inherit;
    display: flex; flex-direction: column;
    transition: transform 130ms, box-shadow 130ms;
    box-shadow: var(--shadow);
  }
  .card:hover { transform: translateY(-2px); box-shadow: 0 8px 22px rgba(0,0,0,0.08); }

  .card-body { padding: 16px 18px; display: flex; flex-direction: column; gap: 8px; flex: 1; }
  .card-body h2 { margin: 0; font-size: 1rem; font-weight: 700; line-height: 1.3; }
  .snippet { margin: 0; font-size: 0.85rem; color: var(--muted); line-height: 1.45; }

  .meta-row { display: flex; gap: 8px; align-items: center; font-size: 0.78rem; color: var(--muted-soft); margin-top: auto; }
  .meta-saves { color: #f59e0b; font-weight: 700; }
  .meta-photos { color: var(--muted-soft); font-size: 0.75rem; }

  .action-chips, .tag-chips { display: flex; flex-wrap: wrap; gap: 4px; }
  .action-chip { font-size: 0.72rem; background: rgba(124, 58, 237, 0.14); color: #7c3aed; padding: 2px 8px; border-radius: 999px; font-weight: 600; }
  .tag-chip { font-size: 0.72rem; background: var(--pill-bg); color: var(--pill-text); padding: 2px 8px; border-radius: 999px; }

  .badge-unreviewed { align-self: flex-start; font-size: 0.7rem; background: #fef3c7; color: #92400e; padding: 2px 8px; border-radius: 999px; font-weight: 700; }

  .empty { color: var(--muted-soft); text-align: center; padding: 48px 0; }

  .skeletons { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 14px; margin-top: 20px; }
  .skeleton { height: 240px; border-radius: 14px; background: linear-gradient(90deg, var(--surface-soft) 0%, var(--surface) 50%, var(--surface-soft) 100%); background-size: 200% 100%; animation: shimmer 1.4s ease-in-out infinite; }
  @keyframes shimmer { 0% { background-position: 200% 0; } 100% { background-position: -200% 0; } }
</style>
