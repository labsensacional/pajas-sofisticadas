<script>
  // @ts-nocheck
  export let data;
  const { docs } = data;
</script>

<svelte:head><title>Teoría · Laboratorio Sensacional</title></svelte:head>

<main class="page">
  <header class="header">
    <h1>Teoría</h1>
    <p>Una brújula simple para leer prácticas, diseñar sesiones y entender mejor qué empuja activación, placer y trance.</p>
  </header>

  {#if docs.length === 0}
    <p class="empty">No hay documentos de teoría todavía.</p>
  {:else}
    <div class="grid">
      {#each docs as doc}
        <a href="/teoria/{doc.slug}" class="card">
          <h2>{doc.title}</h2>
          {#if doc.summary}<p>{doc.summary}</p>{/if}
        </a>
      {/each}
    </div>
  {/if}
</main>

<style>
  .page { max-width: 800px; margin: 0 auto; padding: 52px 24px; }
  .header { margin-bottom: 36px; }
  .header h1 { margin: 0 0 8px; }
  .header p { color: var(--muted); margin: 0; }
  .grid { display: grid; gap: 14px; }
  .card {
    background: var(--surface-solid);
    border: 1px solid var(--line);
    box-shadow: var(--shadow);
    border-radius: 14px;
    padding: 22px 24px;
    text-decoration: none;
    color: inherit;
    transition: transform 120ms, box-shadow 120ms;
  }
  .card:hover { transform: translateY(-1px); box-shadow: 0 12px 28px rgba(0,0,0,0.12); }
  .card h2 { margin: 0 0 6px; font-size: 1.1rem; }
  .card p { margin: 0; color: var(--muted); font-size: 0.9rem; line-height: 1.5; }
  .empty { color: var(--muted-soft); }
</style>
