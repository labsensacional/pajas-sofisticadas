<script>
  import { t } from '$lib/i18n.js';
</script>

<svelte:head><title>Recetario Sensacional</title></svelte:head>

<main class="page">
  <section class="hero">
    <p class="intro">{$t('home.hero.body')}</p>
    <a class="cta" href="/practicas">{$t('home.hero.cta')}</a>
  </section>
</main>

<style>
  .page {
    max-width: 920px;
    margin: 0 auto;
    padding: 72px 24px 96px;
  }

  .hero {
    position: relative;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    gap: 16px;
    padding: 36px 32px;
    border: 1px solid var(--line);
    border-radius: 28px;
    background:
      radial-gradient(circle at top right, rgba(241, 194, 125, 0.22), transparent 32%),
      linear-gradient(180deg, var(--surface-solid), var(--surface));
    box-shadow: var(--shadow);
  }

  .hero::after {
    content: '';
    position: absolute;
    inset: auto -40px -40px auto;
    width: 180px;
    height: 180px;
    border-radius: 999px;
    background: rgba(241, 194, 125, 0.08);
    filter: blur(8px);
    pointer-events: none;
  }

  .intro {
    margin: 0;
    max-width: 46rem;
    font-size: 1.08rem;
    line-height: 1.7;
    color: var(--muted);
  }

  .cta {
    align-self: flex-start;
    margin-top: 6px;
    padding: 12px 20px;
    border-radius: 999px;
    background: var(--accent);
    color: var(--accent-contrast);
    text-decoration: none;
    font-weight: 700;
    letter-spacing: 0.01em;
    box-shadow: 0 10px 24px rgba(0, 0, 0, 0.16);
  }

  @media (max-width: 640px) {
    .page {
      padding: 52px 18px 88px;
    }

    .hero {
      padding: 26px 20px;
      border-radius: 22px;
      gap: 14px;
    }

    .intro {
      font-size: 1rem;
      line-height: 1.65;
    }
  }
</style>
