<script>
  // @ts-nocheck
  export let data;
  const { html, title } = data;
</script>

<svelte:head><title>{title} · Laboratorio Sensacional</title></svelte:head>

<main class="page">
  <article class="content">
    {@html html}
  </article>
</main>

<style>
  .page { max-width: 720px; margin: 0 auto; padding: 48px 24px; }
  .content {
    background: var(--surface-solid);
    border: 1px solid var(--line);
    border-radius: 18px;
    padding: 36px 40px;
    line-height: 1.75;
    color: var(--text);
    box-shadow: var(--shadow);
  }
  :global(.content h1) { font-size: 1.9rem; margin: 0 0 24px; letter-spacing: -0.02em; }
  :global(.content h2) { font-size: 1.25rem; margin: 36px 0 12px; }
  :global(.content h3) { font-size: 1.05rem; margin: 28px 0 10px; }
  :global(.content p) { margin: 0 0 16px; }
  :global(.content strong) { color: var(--accent); }
  :global(.content img) {
    display: block;
    max-width: 100%;
    height: auto;
    margin: 20px auto;
    border-radius: 14px;
    border: 1px solid var(--line);
    box-shadow: var(--shadow);
  }
  :global(.content blockquote) {
    border-left: 3px solid var(--line-strong);
    margin: 20px 0;
    padding: 10px 20px;
    color: var(--muted);
    background: var(--surface-soft);
    border-radius: 0 12px 12px 0;
  }
  :global(.content ul, .content ol) { padding-left: 24px; margin: 0 0 16px; }
  :global(.content li) { margin-bottom: 6px; }
  :global(.content hr) { border: none; border-top: 1px solid var(--line); margin: 32px 0; }

  @media (max-width: 640px) {
    .content { padding: 24px 20px; }
  }
</style>
