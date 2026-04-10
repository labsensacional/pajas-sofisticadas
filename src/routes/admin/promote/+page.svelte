<script>
  // @ts-nocheck
  import { onMount } from 'svelte';
  import { db, auth, hasFirebaseConfig } from '$lib/firebase/client.js';
  import { onAuthStateChanged } from 'firebase/auth';
  import { collection, deleteDoc, doc, getDocs, orderBy, query, updateDoc, where } from 'firebase/firestore';
  import { isMod } from '$lib/moderator.js';
  import { t } from '$lib/i18n.js';

  /** @type {any} */
  let user = null;
  let authed = false;
  /** @type {any[]} */
  let acciones = [];
  /** @type {any[]} */
  let sesiones = [];
  let activeTab = 'acciones';
  let loading = true;
  let notice = '';
  let error = '';
  let exportText = '';

  onMount(() => {
    if (auth) onAuthStateChanged(auth, v => { user = v; authed = true; if (isMod(v)) load(); });
    else { authed = true; }
  });

  async function load() {
    loading = true;
    if (!hasFirebaseConfig || !db) { loading = false; return; }
    try {
      const aSnap = await getDocs(query(collection(db, 'acciones'), where('reviewed', '==', false), orderBy('createdAt', 'asc')));
      acciones = aSnap.docs.map(d => ({ id: d.id, ...d.data() }));

      const sSnap = await getDocs(query(collection(db, 'sesiones'), where('reviewed', '==', false), orderBy('createdAt', 'asc')));
      sesiones = sSnap.docs.map(d => ({ id: d.id, ...d.data() }));
    } catch (e) { error = e?.message ?? 'Error.'; }
    loading = false;
  }

  async function markReviewed(type, id) {
    try {
      await updateDoc(doc(db, type, id), { reviewed: true });
      if (type === 'acciones') acciones = acciones.filter(a => a.id !== id);
      else sesiones = sesiones.filter(s => s.id !== id);
      notice = $t('admin.marked_reviewed');
    } catch (e) { error = e?.message ?? 'Error.'; }
  }

  async function deleteItem(type, id) {
    if (!confirm($t('admin.delete_confirm'))) return;
    try {
      await deleteDoc(doc(db, type, id));
      if (type === 'acciones') acciones = acciones.filter(a => a.id !== id);
      else sesiones = sesiones.filter(s => s.id !== id);
      notice = $t('admin.deleted');
    } catch (e) { error = e?.message ?? 'Error.'; }
  }

  function exportToJS() {
    const snippet = acciones.map(a => {
      const { createdBy, createdAt, reviewed: _, cat: _cat, ...clean } = a;
      return `  ${JSON.stringify({ ...clean, _static: true })}`;
    }).join(',\n');
    exportText = `[\n${snippet}\n]`;
  }

  function copy() {
    navigator.clipboard.writeText(exportText).then(() => notice = $t('admin.copied'));
  }
</script>

<svelte:head><title>Admin · Laboratorio Sensacional</title></svelte:head>

<main class="page">
  <h1>{$t('admin.title')}</h1>

  {#if !authed}
    <p>{$t('admin.loading')}</p>
  {:else if !isMod(user)}
    <p class="no-access">{$t('admin.no_access')}</p>
  {:else}
    {#if notice}<div class="notice">{notice}</div>{/if}
    {#if error}<div class="error">{error}</div>{/if}

    <div class="tabs">
      <button class="tab {activeTab === 'acciones' ? 'active' : ''}" on:click={() => activeTab = 'acciones'}>
        {$t('admin.tab.acciones')} ({acciones.length})
      </button>
      <button class="tab {activeTab === 'sesiones' ? 'active' : ''}" on:click={() => activeTab = 'sesiones'}>
        {$t('admin.tab.sesiones')} ({sesiones.length})
      </button>
      <button class="tab {activeTab === 'promote' ? 'active' : ''}" on:click={() => { activeTab = 'promote'; exportToJS(); }}>
        {$t('admin.tab.export')}
      </button>
    </div>

    {#if loading}
      <p>{$t('admin.loading')}</p>
    {:else if activeTab === 'acciones'}
      {#if acciones.length === 0}
        <p class="empty">{$t('admin.acciones.empty')}</p>
      {:else}
        <div class="list">
          {#each acciones as a}
            <div class="item">
              <div class="item-main">
                <h2>{a.name}</h2>
                <p class="desc">{a.description}</p>
                {#if a.warning}<p class="warn-text">⚠ {a.warning}</p>{/if}
                <div class="scores">
                  AR:{a.arousal} TR:{a.trance} PL:{a.pleasure}
                </div>
                <p class="meta-info">{$t('admin.tags')}: {(a.tags ?? []).join(', ')} · {$t('admin.published')}: {a.createdAt?.toDate?.().toLocaleDateString?.() ?? 'N/A'}</p>
              </div>
              <div class="item-actions">
                <a href="/acciones/{a.id}" target="_blank" class="btn view">{$t('admin.view')}</a>
                <button class="btn review" on:click={() => markReviewed('acciones', a.id)}>{$t('admin.mark_reviewed')}</button>
                <button class="btn delete" on:click={() => deleteItem('acciones', a.id)}>{$t('admin.delete')}</button>
              </div>
            </div>
          {/each}
        </div>
      {/if}

    {:else if activeTab === 'sesiones'}
      {#if sesiones.length === 0}
        <p class="empty">{$t('admin.sesiones.empty')}</p>
      {:else}
        <div class="list">
          {#each sesiones as s}
            <div class="item">
              <div class="item-main">
                <h2>{s.title}</h2>
                {#if s.body}<p class="desc">{s.body.slice(0, 200)}…</p>{/if}
                <p class="meta-info">{s.authorName} · {s.createdAt?.toDate?.().toLocaleDateString?.() ?? ''}</p>
                {#if s.photos?.length}<p class="meta-info">{s.photos.length} {$t('admin.photos')}</p>{/if}
              </div>
              <div class="item-actions">
                <a href="/sesiones/{s.id}" target="_blank" class="btn view">{$t('admin.view')}</a>
                <button class="btn review" on:click={() => markReviewed('sesiones', s.id)}>{$t('admin.mark_reviewed')}</button>
                <button class="btn delete" on:click={() => deleteItem('sesiones', s.id)}>{$t('admin.delete')}</button>
              </div>
            </div>
          {/each}
        </div>
      {/if}

    {:else if activeTab === 'promote'}
      <p class="promote-hint">{$t('admin.export.hint')}</p>
      {#if exportText}
        <div class="export-box">
          <textarea class="export-textarea" rows="20" readonly value={exportText}></textarea>
          <button class="btn view" on:click={copy}>{$t('admin.copy')}</button>
        </div>
      {:else}
        <p class="empty">{$t('admin.export.empty')}</p>
      {/if}
    {/if}
  {/if}
</main>

<style>
  .page { max-width: 900px; margin: 0 auto; padding: 48px 24px; }
  h1 { margin: 0 0 28px; }
  .no-access { color: #b91c1c; }

  .notice { background: #ecfdf5; color: #047857; padding: 10px 16px; border-radius: 10px; margin-bottom: 16px; }
  .error { background: #fee2e2; color: #b91c1c; padding: 10px 16px; border-radius: 10px; margin-bottom: 16px; }

  .tabs { display: flex; gap: 4px; margin-bottom: 24px; border-bottom: 1px solid rgba(12,12,21,0.08); }
  .tab { background: none; border: none; padding: 10px 18px; cursor: pointer; font-weight: 600; font-size: 0.9rem; color: #6b7280; border-bottom: 2px solid transparent; transition: color 120ms, border-color 120ms; }
  .tab.active { color: #0c0c15; border-bottom-color: #0c0c15; }

  .list { display: flex; flex-direction: column; gap: 14px; }
  .item { background: #fff; border-radius: 14px; padding: 20px 22px; display: flex; gap: 16px; align-items: flex-start; }
  .item-main { flex: 1; }
  .item-main h2 { margin: 0 0 6px; font-size: 1rem; display: flex; align-items: center; gap: 8px; }
  .desc { margin: 0 0 6px; font-size: 0.88rem; color: #6b7280; line-height: 1.4; }
  .warn-text { margin: 0 0 6px; font-size: 0.85rem; color: #92400e; }
  .scores { font-family: monospace; font-size: 0.82rem; color: #374151; margin-bottom: 4px; }
  .meta-info { margin: 0; font-size: 0.78rem; color: #9ca3af; }

  .item-actions { display: flex; flex-direction: column; gap: 6px; min-width: 140px; }
  .btn { display: block; padding: 7px 14px; border-radius: 999px; text-align: center; font-weight: 600; font-size: 0.85rem; cursor: pointer; border: none; text-decoration: none; }
  .btn.view { background: #f3f4f6; color: #374151; }
  .btn.review { background: #ecfdf5; color: #047857; }
  .btn.delete { background: #fee2e2; color: #b91c1c; }

  .empty { color: #9ca3af; padding: 32px 0; }

  .promote-hint { color: #4b5563; font-size: 0.9rem; margin-bottom: 16px; line-height: 1.6; }
  .promote-hint code { background: #f3f4f6; padding: 2px 6px; border-radius: 4px; font-size: 0.85rem; }

  .export-box { display: flex; flex-direction: column; gap: 10px; }
  .export-textarea { font-family: monospace; font-size: 0.8rem; border: 1px solid rgba(12,12,21,0.12); border-radius: 10px; padding: 14px; resize: vertical; }
  .export-box .btn { align-self: flex-start; }
</style>
