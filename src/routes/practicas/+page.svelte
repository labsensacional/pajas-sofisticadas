<script>
  // @ts-nocheck
  import { onMount } from 'svelte';
  import { page } from '$app/stores';
  import { goto } from '$app/navigation';
  import { db, hasFirebaseConfig } from '$lib/firebase/client.js';
  import { auth } from '$lib/firebase/client.js';
  import { onAuthStateChanged } from 'firebase/auth';
  import { listPractices } from '$lib/practiceCatalog.js';
  import { splitTextWithLinks } from '$lib/linkify.js';
  import { isMod } from '$lib/moderator.js';
  import { t } from '$lib/i18n.js';

  /** @type {any} */
  let user = null;
  /** @type {any[]} */
  let allAcciones = [];
  let search = '';
  let sortBy = 'pleasure';
  let showUnreviewed = false;
  let loading = false;
  let loadingFirestore = false;

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
  const previewText = (text) => `${text?.slice(0, 100) ?? ''}${text?.length > 100 ? '…' : ''}`;

  function openAccion(id) {
    goto(`/practicas/${id}`);
  }

  function onCardKeydown(event, id) {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      openAccion(id);
    }
  }

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
    loadActions();
  });

  async function loadActions() {
    loading = true;
    loadingFirestore = true;
    try {
      allAcciones = await listPractices({ db: hasFirebaseConfig ? db : null });
    } catch (e) { console.error(e); }
    finally {
      loading = false;
      loadingFirestore = false;
    }
  }

  $: AXES = [
    { key: 'arousal', label: $t('axis.arousal.short'), color: '#FF8C42' },
    { key: 'trance',  label: $t('axis.trance'), color: '#7B68EE' },
    { key: 'pleasure',label: $t('axis.pleasure'), color: '#FF6B9D' },
    { key: 'dopamine',label: $t('axis.dopamine.short'), color: '#FFD166' },
    { key: 'oxytocin',label: $t('axis.oxytocin.short'), color: '#74B0FF' },
    { key: 'energy',  label: $t('axis.energy.short'), color: '#aaa' },
  ];
</script>

<svelte:head><title>{$t('acciones.title')} · Recetario Sensacional</title></svelte:head>

<main class="page">
  <header class="header">
    <div>
      <h1>{$t('acciones.title')}</h1>
      <p>{$t('acciones.subtitle')}</p>
    </div>
    {#if user}
      <a href="/practicas/nueva" class="btn-new">{$t('acciones.new')}</a>
    {/if}
  </header>

  <div class="controls">
    <input class="search" type="text" placeholder={$t('acciones.search.placeholder')} bind:value={search} />
    <select bind:value={sortBy}>
      <option value="pleasure">{$t('acciones.sort.pleasure')}</option>
      <option value="arousal">{$t('acciones.sort.arousal')}</option>
      <option value="trance">{$t('acciones.sort.trance')}</option>
      <option value="dopamine">{$t('acciones.sort.dopamine')}</option>
      <option value="oxytocin">{$t('acciones.sort.oxytocin')}</option>
    </select>
  </div>

  <div class="cats">
    <button class="chip {selectedTag === '' ? 'active' : ''}" on:click={() => { updateTag(''); showUnreviewed = false; }}>{$t('acciones.filter.all')}</button>
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
        {$t('acciones.filter.unreviewed')} {#if showUnreviewed}({filtered.length}){/if}
      </button>
    {/if}
  </div>

  {#if filtered.length === 0}
    <p class="empty">{$t('acciones.empty')}</p>
  {:else}
    {#if loadingFirestore}
      <p class="loading-hint">{$t('acciones.loading_community')}</p>
    {/if}
    <div class="grid">
      {#each filtered as a (a.id)}
        <div
          class="card"
          role="link"
          tabindex="0"
          on:click={() => openAccion(a.id)}
          on:keydown={(event) => onCardKeydown(event, a.id)}
        >
          {#if !a._static}
            <div class="card-top">
              <span class="badge-new">{$t('acciones.badge.new')}</span>
              {#if isMod(user) && !a.reviewed}
                <span class="badge-unreviewed">{$t('acciones.badge.unreviewed')}</span>
              {/if}
            </div>
          {/if}
          <div class="card-summary">
            <h2 class="card-name">{a.name}</h2>
            <p class="card-desc">
              {#each splitTextWithLinks(previewText(a.description)) as part}
                {#if part.type === 'link'}
                  <a href={part.value} target="_blank" rel="noopener noreferrer" class="inline-link" on:click|stopPropagation>
                    {part.value}
                  </a>
                {:else}
                  {part.value}
                {/if}
              {/each}
            </p>
          </div>
          <div class="card-section bars">
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
            <div class="card-section tags">
              {#each (typeof a.tags === 'string' ? a.tags.split(' ') : a.tags).slice(0, 3) as tag}
                <span class="tag">{tag}</span>
              {/each}
            </div>
          {/if}
        </div>
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
    background: var(--accent); color: var(--accent-contrast); text-decoration: none;
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
    border: 1px solid var(--line-strong);
    background: var(--pill-bg);
    padding: 6px 14px;
    border-radius: 999px;
    cursor: pointer;
    font-size: 0.85rem;
    font-weight: 600;
    color: var(--pill-text);
    transition: background 100ms, color 100ms, border-color 100ms;
  }

  .chip.active {
    background: var(--pill-active-bg);
    color: var(--pill-active-text);
    border-color: var(--pill-active-bg);
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
    background: var(--surface-solid);
    border: 1px solid var(--line);
    border-radius: 14px;
    padding: 10px 12px;
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
    min-width: 220px;
    max-width: min(340px, calc(100vw - 32px));
    box-shadow: 0 8px 24px rgba(0,0,0,0.1);
  }

  @media (max-width: 500px) {
    .more-dropdown {
      position: fixed;
      left: 16px;
      right: 16px;
      bottom: 24px;
      top: auto;
      max-width: none;
      max-height: 60vh;
      overflow-y: auto;
      border-radius: 16px;
    }
  }
  .chip.mod.active { background: #7c3aed; color: #fff; }

  .grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 14px;
  }

  .card {
    background: var(--surface-solid);
    border: 1px solid var(--line);
    border-top: 3px solid var(--accent);
    border-radius: 14px;
    padding: 18px 20px;
    text-decoration: none;
    color: inherit;
    display: flex;
    flex-direction: column;
    gap: 8px;
    cursor: pointer;
    transition: transform 130ms, box-shadow 130ms;
  }
  .card :global(*) { cursor: inherit; }
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

  .card-summary {
    display: flex;
    flex-direction: column;
    gap: 6px;
    min-height: 112px;
  }
  .card-name { margin: 0; font-size: 1.14rem; font-weight: 800; line-height: 1.2; }
  .card-desc { margin: 0; font-size: 0.8rem; color: #6b7280; line-height: 1.5; flex: 1; }
  .card-section {
    border-top: 1px solid var(--line);
    padding-top: 10px;
  }
  .inline-link {
    color: var(--accent);
    cursor: pointer;
    text-decoration: underline;
    text-decoration-thickness: 1.5px;
    text-underline-offset: 0.16em;
    overflow-wrap: anywhere;
    word-break: break-word;
  }

  .bars { display: flex; flex-direction: column; gap: 5px; }
  .bar-row { display: flex; align-items: center; gap: 6px; }
  .bar-label { font-size: 0.62rem; color: #9ca3af; width: 62px; text-align: left; line-height: 1.1; text-transform: uppercase; letter-spacing: 0.06em; }
  .bar-track { flex: 1; height: 4px; background: var(--surface-soft); border-radius: 999px; position: relative; overflow: hidden; }
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
  .bar-fill { position: absolute; height: 100%; border-radius: 999px; transition: left 0.3s, width 0.3s; }
  .bar-val { font-size: 0.62rem; font-family: monospace; color: var(--muted-soft); width: 16px; }

  .tags { display: flex; flex-wrap: wrap; gap: 4px; }
  .tag { font-size: 0.68rem; background: var(--pill-bg); color: var(--pill-text); padding: 2px 8px; border-radius: 999px; }

  .empty { color: #9ca3af; text-align: center; padding: 48px 0; }

  .loading-hint { color: #9ca3af; font-size: 0.85rem; margin-bottom: 12px; }
</style>
