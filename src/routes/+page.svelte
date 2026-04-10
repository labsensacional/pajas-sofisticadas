<script>
  import { t } from '$lib/i18n.js';
</script>

<svelte:head><title>Laboratorio Sensacional</title></svelte:head>

<main class="home">
  <section class="hero">
    <h1>Laboratorio Sensacional</h1>
    <p>{$t('home.tagline')}</p>
    <div class="links">
      <a href="/teoria" class="btn primary">{$t('home.cta.teoria')}</a>
      <a href="/acciones" class="btn ghost">{$t('home.cta.acciones')}</a>
      <a href="/sesiones" class="btn ghost">{$t('home.cta.sesiones')}</a>
    </div>
  </section>

  <section class="sections">
    <a href="/teoria" class="section-card">
      <span class="icon">📖</span>
      <h2>{$t('home.card.teoria.title')}</h2>
      <p>{$t('home.card.teoria.desc')}</p>
    </a>
    <a href="/acciones" class="section-card">
      <span class="icon">◎</span>
      <h2>{$t('home.card.acciones.title')}</h2>
      <p>{$t('home.card.acciones.desc')}</p>
    </a>
    <a href="/sesiones" class="section-card">
      <span class="icon">◇</span>
      <h2>{$t('home.card.sesiones.title')}</h2>
      <p>{$t('home.card.sesiones.desc')}</p>
    </a>
  </section>
</main>

<style>
  .home {
    max-width: 900px;
    margin: 0 auto;
    padding: 64px 24px;
  }

  .hero {
    text-align: center;
    margin-bottom: 64px;
  }

  .hero h1 {
    font-size: clamp(2rem, 5vw, 3.2rem);
    font-weight: 800;
    margin: 0 0 16px;
    letter-spacing: -0.02em;
  }

  .hero p {
    font-size: 1.15rem;
    color: var(--muted);
    max-width: 520px;
    margin: 0 auto 32px;
    line-height: 1.65;
  }

  .links { display: flex; gap: 12px; justify-content: center; flex-wrap: wrap; }

  .btn {
    padding: 12px 24px;
    border-radius: 999px;
    text-decoration: none;
    font-weight: 700;
    font-size: 0.95rem;
    transition: transform 120ms, box-shadow 120ms;
  }

  .btn:hover { transform: translateY(-1px); box-shadow: 0 6px 16px rgba(0,0,0,0.12); }

  .btn.primary { background: var(--accent); color: var(--accent-contrast); }

  .btn.ghost { border: 2px solid var(--line-strong); color: var(--pill-text); background: var(--pill-bg); }

  .sections {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
    gap: 20px;
  }

  .section-card {
    background: var(--surface-solid);
    border: 1px solid var(--line);
    box-shadow: var(--shadow);
    border-radius: 18px;
    padding: 28px 24px;
    text-decoration: none;
    color: inherit;
    transition: transform 140ms, box-shadow 140ms;
  }

  .section-card:hover { transform: translateY(-2px); box-shadow: 0 14px 30px rgba(0,0,0,0.14); }

  .icon { font-size: 1.8rem; display: block; margin-bottom: 12px; }

  .section-card h2 { margin: 0 0 8px; font-size: 1.2rem; }

  .section-card p { margin: 0; color: var(--muted); font-size: 0.92rem; line-height: 1.5; }
</style>
