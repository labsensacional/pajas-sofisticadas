<svelte:head>
  <title>Pajas Sofisticadas</title>
  <meta
    name="description"
    content="Archivo comunitario de exploraciones emocionales, sensoriales y de consciencia."
  />
</svelte:head>

<main class="page">
  <header class="hero">
    <p class="eyebrow">Archivo comunitario</p>
    <h1>Pajas Sofisticadas</h1>
    <p class="lede">
      Un espacio para registrar experiencias, descubrir prácticas y conectar con la exploracion personal
      sin estigma.
    </p>
    <div class="cta-row">
      <a class="primary" href="/archivo">Entrar al archivo</a>
      <a class="ghost" href="/publicar">Publicar una experiencia</a>
    </div>
  </header>

  <section class="grid">
    <article>
      <h2>Explorar en minutos</h2>
      <p>Subi una experiencia completa en menos de dos minutos con un formato sencillo.</p>
    </article>
    <article>
      <h2>Etiquetas vivas</h2>
      <p>Descubri practicas por tags creados por la comunidad.</p>
    </article>
    <article>
      <h2>Anonimato real</h2>
      <p>Decidi en cada post si queres figurar o mantenerte anonimo.</p>
    </article>
  </section>
</main>

<style>
  :global(body) {
    margin: 0;
    font-family: "Space Grotesk", system-ui, sans-serif;
    color: #141414;
    background: radial-gradient(circle at top, #faf4ff 0%, #f1f5ff 55%, #fff7ef 100%);
  }

  .page {
    min-height: 100vh;
    padding: 64px 24px 96px;
    max-width: 960px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    gap: 48px;
  }

  .hero {
    background: rgba(255, 255, 255, 0.72);
    border-radius: 24px;
    padding: 48px;
    box-shadow: 0 24px 60px rgba(27, 0, 71, 0.08);
  }

  .eyebrow {
    text-transform: uppercase;
    letter-spacing: 0.2em;
    font-size: 0.72rem;
    font-weight: 600;
    margin: 0 0 16px;
  }

  h1 {
    margin: 0 0 16px;
    font-size: clamp(2.6rem, 4vw, 4rem);
  }

  .lede {
    font-size: 1.1rem;
    max-width: 560px;
    line-height: 1.6;
  }

  .cta-row {
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
    margin-top: 32px;
  }

  .primary,
  .ghost {
    text-decoration: none;
    text-align: center;
    font-size: 0.95rem;
    padding: 12px 22px;
    border-radius: 999px;
    cursor: pointer;
    display: inline-block;
  }

  .primary {
    background: #0c0c15;
    color: #fff;
  }

  .ghost {
    background: transparent;
    border: 1px solid #0c0c15;
    color: #0c0c15;
  }

  .grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
    gap: 20px;
  }

  article {
    background: rgba(255, 255, 255, 0.75);
    padding: 24px;
    border-radius: 20px;
    box-shadow: 0 16px 40px rgba(12, 12, 21, 0.06);
  }

  h2 {
    margin: 0 0 12px;
  }

  @media (max-width: 640px) {
    .hero {
      padding: 32px;
    }
  }
</style>
