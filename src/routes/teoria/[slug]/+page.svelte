<script>
  // @ts-nocheck
  export let data;
  const { html, title } = data;
</script>

<svelte:head><title>{title} · Teoría · Laboratorio Sensacional</title></svelte:head>

<main class="page">
  <a href="/teoria" class="back">← Teoría</a>
  <article class="content">
    {@html html}
  </article>
</main>

<style>
  .page { max-width: 720px; margin: 0 auto; padding: 48px 24px; }
  .back {
    display: inline-block;
    margin-bottom: 24px;
    text-decoration: none;
    color: #6b7280;
    font-weight: 600;
    font-size: 0.9rem;
  }
  .back:hover { color: #0c0c15; }
  .content {
    background: #fff;
    border-radius: 18px;
    padding: 36px 40px;
    line-height: 1.75;
    color: #1f2937;
  }
  :global(.content h1) { font-size: 1.9rem; margin: 0 0 24px; letter-spacing: -0.02em; }
  :global(.content h2) { font-size: 1.25rem; margin: 36px 0 12px; }
  :global(.content h3) { font-size: 1.05rem; margin: 28px 0 10px; }
  :global(.content p) { margin: 0 0 16px; }
  :global(.content strong) { color: #0c0c15; }
  :global(.content blockquote) {
    border-left: 3px solid rgba(12,12,21,0.12);
    margin: 20px 0;
    padding: 10px 20px;
    color: #4b5563;
  }
  :global(.content ul, .content ol) { padding-left: 24px; margin: 0 0 16px; }
  :global(.content li) { margin-bottom: 6px; }
  :global(.content hr) { border: none; border-top: 1px solid rgba(12,12,21,0.08); margin: 32px 0; }

  @media (max-width: 640px) {
    .content { padding: 24px 20px; }
  }
</style>
