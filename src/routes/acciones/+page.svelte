<script>
  // @ts-nocheck
  import { onMount } from 'svelte';
  import { page } from '$app/stores';
  import { goto } from '$app/navigation';
  import { db, hasFirebaseConfig } from '$lib/firebase/client.js';
  import { auth } from '$lib/firebase/client.js';
  import { onAuthStateChanged } from 'firebase/auth';
  import { collection, getDocs, orderBy, query } from 'firebase/firestore';
  import { ACTIONS } from '$lib/actions.js';
  import { isMod } from '$lib/moderator.js';

  /** @type {any} */
  let user = null;
  /** @type {any[]} */
  let newAcciones = [];
  let search = '';
  let sortBy = 'pleasure';
  let showUnreviewed = false;
  let loading = false;  // static content available immediately
  let loadingFirestore = false;

  // Merge: static catalog + Firestore. Firestore overrides static when same ID.
  $: firestoreIds = new Set(newAcciones.map(a => a.id));
  $: allAcciones = [...ACTIONS.filter(a => !firestoreIds.has(a.id)), ...newAcciones];

  $: tagCounts = allAcciones.reduce((acc, a) => {
    const tags = typeof a.tags === 'string' ? a.tags.split(' ') : (a.tags ?? []);
    tags.filter(Boolean).forEach(t => { acc[t] = (acc[t] ?? 0) + 1; });
    return acc;
  }, {});

  $: sortedTags = Object.entries(tagCounts).sort((a, b) => b[1] - a[1]).map(([tag, count]) => ({ tag, count }));

  const normalize = s => s?.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase() ?? '';

  let selectedTag = '';
  let showMoreTags = false;

  const TOP_TAGS = 5;

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

  function openMoreTags() { showMoreTags = true; }
  function closeMoreTags() { showMoreTags = false; }
  function onMoreTagsKeydown(e) { if (e.key === 'Escape') closeMoreTags(); }

  $: selectedTag = $page.url.searchParams.get('tag') ?? '';

  $: filtered = allAcciones.filter(a => {
    if (showUnreviewed) return a._static !== true && !a.reviewed;
    const tagList = typeof a.tags === 'string' ? a.tags.split(' ') : (a.tags ?? []);
    const matchTag = !selectedTag || tagList.includes(selectedTag);
    const q = normalize(search.trim());
    const matchSearch = !q || normalize([a.name, a.description, a.tags].join(' ')).includes(q);
    return matchTag && matchSearch;
  }).sort((a, b) => Math.abs(b[sortBy] ?? 0) - Math.abs(a[sortBy] ?? 0));

  onMount(() => {
    if (auth) onAuthStateChanged(auth, v => { user = v; });
    loadNew();
  });

  async function loadNew() {
    if (!hasFirebaseConfig || !db) return;
    loadingFirestore = true;
    try {
      const snap = await getDocs(query(collection(db, 'acciones'), orderBy('createdAt', 'desc')));
      newAcciones = snap.docs.map(d => ({ id: d.id, ...d.data() }));
    } catch (e) { console.error(e); }
    loadingFirestore = false;
  }

  const AXES = [
    { key: 'arousal', label: 'AR', color: '#FF8C42' },
    { key: 'trance',  label: 'TR', color: '#7B68EE' },
    { key: 'pleasure',label: 'PL', color: '#FF6B9D' },
    { key: 'dopamine',label: 'DO', color: '#FFD166' },
    { key: 'endorphins',label:'EN', color: '#06D6A0' },
    { key: 'oxytocin',label: 'OX', color: '#74B0FF' },
    { key: 'energy',  label: 'EG', color: '#aaa' },
  ];
</script>

<svelte:head><title>Acciones · Laboratorio Sensacional</title></svelte:head>

<main class="page">
  <header class="header">
    <div>
      <h1>Acciones</h1>
      <p>{allAcciones.length} técnicas y prácticas</p>
    </div>
    {#if user}
      <a href="/acciones/nueva" class="btn-new">+ Nueva acción</a>
    {/if}
  </header>

  <div class="controls">
    <input class="search" type="text" placeholder="Buscar por nombre, descripción o tags…" bind:value={search} />
    <select bind:value={sortBy}>
      <option value="pleasure">↑ Placer</option>
      <option value="arousal">↑ Activación</option>
      <option value="trance">↑ Trance</option>
      <option value="dopamine">↑ Dopamina</option>
      <option value="endorphins">↑ Endorfinas</option>
      <option value="oxytocin">↑ Oxitocina</option>
    </select>
  </div>

  <div class="cats">
    <button class="chip {selectedTag === '' ? 'active' : ''}" on:click={() => { updateTag(''); showUnreviewed = false; }}>Todas</button>
    {#each sortedTags.slice(0, TOP_TAGS) as { tag, count }}
      <button class="chip {selectedTag === tag ? 'active' : ''}" on:click={() => { updateTag(selectedTag === tag ? '' : tag); showUnreviewed = false; }}>
        {tag} <span class="chip-count">({count})</span>
      </button>
    {/each}
    {#if sortedTags.length > TOP_TAGS}
      <div class="more-wrap">
        <button class="chip {showMoreTags ? 'active' : ''}" on:click={openMoreTags}>…</button>
        {#if showMoreTags}
          <!-- svelte-ignore a11y-no-static-element-interactions -->
          <div class="more-backdrop" on:click={closeMoreTags} on:keydown={onMoreTagsKeydown}></div>
          <div class="more-dropdown">
            {#each sortedTags.slice(TOP_TAGS) as { tag, count }}
              <button class="chip {selectedTag === tag ? 'active' : ''}" on:click={() => { updateTag(selectedTag === tag ? '' : tag); showUnreviewed = false; closeMoreTags(); }}>
                {tag} <span class="chip-count">({count})</span>
              </button>
            {/each}
          </div>
        {/if}
      </div>
    {/if}
    {#if isMod(user)}
      <button class="chip mod {showUnreviewed ? 'active' : ''}" on:click={() => { showUnreviewed = !showUnreviewed; selectedTag = ''; }}>
        Sin revisar {#if showUnreviewed}({filtered.length}){/if}
      </button>
    {/if}
  </div>

  {#if filtered.length === 0}
    <p class="empty">No se encontraron acciones.</p>
  {:else}
    {#if loadingFirestore}
      <p class="loading-hint">Cargando acciones de la comunidad…</p>
    {/if}
    <div class="grid">
      {#each filtered as a (a.id)}
        <a href="/acciones/{a.id}" class="card">
          {#if !a._static}
            <div class="card-top">
              <span class="badge-new">nuevo</span>
              {#if isMod(user) && !a.reviewed}
                <span class="badge-unreviewed">sin revisar</span>
              {/if}
            </div>
          {/if}
          <h2 class="card-name">{a.name}</h2>
          <p class="card-desc">{a.description?.slice(0, 100)}{a.description?.length > 100 ? '…' : ''}</p>
          <div class="bars">
            {#each AXES.slice(0, 3) as ax}
              {@const v = a[ax.key] ?? 0}
              <div class="bar-row">
                <span class="bar-label">{ax.label}</span>
                <div class="bar-track">
                  <div class="bar-center"></div>
                  <div class="bar-fill" style="left:{v >= 0 ? 50 : 50 + v * 5}%; width:{Math.abs(v) * 5}%; background:{ax.color}"></div>
                </div>
                <span class="bar-val">{v}</span>
              </div>
            {/each}
          </div>
          {#if a.tags}
            <div class="tags">
              {#each (typeof a.tags === 'string' ? a.tags.split(' ') : a.tags).slice(0, 3) as tag}
                <span class="tag">{tag}</span>
              {/each}
            </div>
          {/if}
        </a>
      {/each}
    </div>
  {/if}
</main>

<style>
  .page { max-width: 1100px; margin: 0 auto; padding: 48px 24px; }

  .header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 24px; }
  .header h1 { margin: 0 0 4px; }
  .header p { margin: 0; color: #6b7280; font-size: 0.9rem; }

  .btn-new {
    background: #0c0c15; color: #fff; text-decoration: none;
    padding: 9px 18px; border-radius: 999px; font-weight: 700; font-size: 0.9rem;
    white-space: nowrap;
  }

  .controls { display: flex; gap: 12px; margin-bottom: 14px; flex-wrap: wrap; }

  .search {
    flex: 1; min-width: 200px;
    border: 1px solid rgba(12,12,21,0.15); border-radius: 10px;
    padding: 10px 14px; font: inherit;
  }

  select {
    border: 1px solid rgba(12,12,21,0.15); border-radius: 10px;
    padding: 10px 12px; font: inherit; background: #fff;
  }

  .cats { display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 24px; }

  .chip {
    border: 1px solid rgba(12,12,21,0.15);
    background: transparent;
    padding: 6px 14px;
    border-radius: 999px;
    cursor: pointer;
    font-size: 0.85rem;
    font-weight: 600;
    color: #374151;
    transition: background 100ms, color 100ms, border-color 100ms;
  }

  .chip.active {
    background: var(--c, #0c0c15);
    color: #fff;
    border-color: var(--c, #0c0c15);
  }

  .chip-count { font-weight: 400; opacity: 0.65; font-size: 0.78rem; }
  .chip.mod { color: #7c3aed; border-color: #7c3aed; }

  .more-wrap { position: relative; }
  .more-backdrop { position: fixed; inset: 0; z-index: 10; }
  .more-dropdown {
    position: absolute;
    top: calc(100% + 6px);
    left: 0;
    z-index: 11;
    background: #fff;
    border: 1px solid rgba(12,12,21,0.12);
    border-radius: 14px;
    padding: 10px 12px;
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
    min-width: 220px;
    max-width: 340px;
    box-shadow: 0 8px 24px rgba(0,0,0,0.1);
  }
  .chip.mod.active { background: #7c3aed; color: #fff; }

  .grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 14px;
  }

  .card {
    background: #fff;
    border: 1px solid rgba(12,12,21,0.07);
    border-top: 3px solid #0c0c15;
    border-radius: 14px;
    padding: 18px 20px;
    text-decoration: none;
    color: inherit;
    display: flex;
    flex-direction: column;
    gap: 8px;
    transition: transform 130ms, box-shadow 130ms;
  }
  .card:hover { transform: translateY(-2px); box-shadow: 0 8px 22px rgba(0,0,0,0.09); }

  .card-top { display: flex; align-items: center; gap: 8px; }

  .badge-new {
    margin-left: auto; font-size: 0.7rem; background: #ecfdf5; color: #047857;
    padding: 2px 8px; border-radius: 999px; font-weight: 700;
  }
  .badge-unreviewed {
    font-size: 0.7rem; background: #fef3c7; color: #92400e;
    padding: 2px 8px; border-radius: 999px; font-weight: 700;
  }

  .card-name { margin: 0; font-size: 1rem; font-weight: 700; }
  .card-desc { margin: 0; font-size: 0.85rem; color: #6b7280; line-height: 1.45; flex: 1; }

  .bars { display: flex; flex-direction: column; gap: 4px; }
  .bar-row { display: flex; align-items: center; gap: 6px; }
  .bar-label { font-size: 0.7rem; font-family: monospace; color: #9ca3af; width: 20px; text-align: right; }
  .bar-track { flex: 1; height: 4px; background: #f3f4f6; border-radius: 4px; position: relative; overflow: hidden; }
  .bar-center { position: absolute; left: 50%; width: 1px; height: 100%; background: #d1d5db; }
  .bar-fill { position: absolute; height: 100%; border-radius: 4px; transition: left 0.3s, width 0.3s; }
  .bar-val { font-size: 0.7rem; font-family: monospace; color: #d1d5db; width: 16px; }

  .tags { display: flex; flex-wrap: wrap; gap: 4px; }
  .tag { font-size: 0.72rem; background: #f3f4f6; color: #6b7280; padding: 2px 8px; border-radius: 999px; }

  .empty { color: #9ca3af; text-align: center; padding: 48px 0; }

  .loading-hint { color: #9ca3af; font-size: 0.85rem; margin-bottom: 12px; }
</style>
