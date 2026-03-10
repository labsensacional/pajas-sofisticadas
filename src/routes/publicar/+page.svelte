<svelte:head>
  <title>Publicar · Pajas Sofisticadas</title>
</svelte:head>

<script>
  import { onMount } from 'svelte';
  import { auth, db, hasFirebaseConfig, storage } from '$lib/firebase/client.js';
  import { collection, doc, getDoc, serverTimestamp, setDoc } from 'firebase/firestore';
  import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
  import { onAuthStateChanged } from 'firebase/auth';

  let user = null;
  let title = '';
  let summary = '';
  let tried = '';
  let results = '';
  let state = '';
  let context = '';
  let isAnonymous = false;
  let isSubmitting = false;
  let submitted = false;
  let message = '';
  let error = '';
  let tagsInput = '';
  let images = [];
  let uploading = false;

  onMount(() => {
    if (!auth) return;
    return onAuthStateChanged(auth, (value) => {
      user = value;
    });
  });

  async function handleSubmit() {
    message = '';
    error = '';

    if (!hasFirebaseConfig) {
      error = 'Firebase no esta configurado.';
      return;
    }

    if (!user) {
      error = 'Necesitas iniciar sesion para publicar.';
      return;
    }

    if (!title.trim() || !summary.trim()) {
      error = 'Titulo y resumen son obligatorios.';
      return;
    }

    isSubmitting = true;

    try {
      const postRef = doc(collection(db, 'posts'));
      const postId = postRef.id;

      uploading = images.length > 0;
      const uploadedImages = [];

      for (const image of images) {
        const safeName = image.file.name.replace(/\s+/g, '-');
        const randomId = globalThis.crypto?.randomUUID?.() ?? `${Date.now()}-${Math.random()}`;
        const path = `images/${postId}/${randomId}-${safeName}`;
        const storageRef = ref(storage, path);
        await uploadBytes(storageRef, image.file, {
          contentType: image.file.type
        });
        const url = await getDownloadURL(storageRef);
        uploadedImages.push({
          url,
          path,
          nsfw: image.nsfw
        });
      }

      const tags = tagsInput
        .split(',')
        .map((tag) => tag.trim().toLowerCase())
        .filter(Boolean);

      let displayName = '';
      try {
        const profile = await getDoc(doc(db, 'users', user.uid));
        displayName = profile.exists() ? profile.data().displayName ?? '' : '';
      } catch (err) {
        displayName = '';
      }

      const payload = {
        title: title.trim(),
        summary: summary.trim(),
        tried: tried.trim(),
        results: results.trim(),
        state: state.trim(),
        context: context.trim(),
        tags,
        images: uploadedImages,
        saveCount: 0,
        triedCount: 0,
        regularCount: 0,
        isAnonymous,
        displayName: isAnonymous ? '' : displayName,
        createdAt: serverTimestamp()
      };

      if (!isAnonymous) {
        payload.authorUid = user.uid;
      } else {
        payload.displayName = '';
      }

      await setDoc(postRef, payload);

      message = 'Post guardado. Gracias por sumar.';
      submitted = true;
      title = '';
      summary = '';
      tried = '';
      results = '';
      state = '';
      context = '';
      tagsInput = '';
      images = [];
      isAnonymous = false;
    } catch (err) {
      error = err?.message ?? 'Error al guardar.';
    } finally {
      isSubmitting = false;
      uploading = false;
    }
  }

  function resetForm() {
    submitted = false;
    message = '';
    error = '';
  }
  function handleFiles(event) {
    const files = Array.from(event.target.files ?? []);
    images = files.map((file) => ({ file, nsfw: false }));
  }

  function toggleImageNsfw(index) {
    images = images.map((image, i) => (i === index ? { ...image, nsfw: !image.nsfw } : image));
  }
</script>

<main class="page">
  <header class="header">
    <h1>Publicar una experiencia</h1>
    <p>Formulario MVP (Firestore).</p>
  </header>

  {#if !hasFirebaseConfig}
    <div class="warning">Completa `.env` con las variables de Firebase.</div>
  {:else if !user}
    <div class="warning">Inicia sesion para publicar. <a href="/login">Ir a login</a></div>
  {/if}

  {#if submitted}
    <div class="success">
      <p>{message}</p>
      <div class="actions">
        <a class="primary" href="/archivo">Ver archivo</a>
        <button class="ghost" type="button" on:click={resetForm}>Crear otra</button>
      </div>
    </div>
  {:else}
    <form class="form" on:submit|preventDefault={handleSubmit}>
      <p class="hint">Campos opcionales salvo titulo y resumen.</p>
      <label>
        Titulo
        <input type="text" placeholder="Titulo libre" bind:value={title} />
      </label>
      <label>
        Resumen
        <textarea rows="4" placeholder="Resumen corto" bind:value={summary}></textarea>
      </label>
      <label>
        Que probaste (opcional)
        <textarea rows="3" placeholder="Tecnica, practica, etc." bind:value={tried}></textarea>
      </label>
      <label>
        Resultados (opcional)
        <textarea rows="3" placeholder="Que paso" bind:value={results}></textarea>
      </label>
      <label>
        Estado mental/emocional (opcional)
        <textarea rows="3" placeholder="Antes/durante/despues" bind:value={state}></textarea>
      </label>
      <label>
        Contexto / setup (opcional)
        <textarea rows="3" placeholder="Lugar, tiempo, materiales" bind:value={context}></textarea>
      </label>
      <label>
        Tags (opcional)
        <input type="text" placeholder="ej: tantra, respiracion, hipnosis" bind:value={tagsInput} />
      </label>
      <label>
        Fotos (opcional)
        <input type="file" multiple accept="image/*" on:change={handleFiles} />
      </label>
      {#if images.length}
        <div class="images">
          {#each images as image, index}
            <div class="image-card">
              <img src={URL.createObjectURL(image.file)} alt={image.file.name} />
              <label class="checkbox">
                <input type="checkbox" checked={image.nsfw} on:change={() => toggleImageNsfw(index)} />
                Marcar NSFW
              </label>
            </div>
          {/each}
        </div>
      {/if}
      <label class="checkbox">
        <input type="checkbox" bind:checked={isAnonymous} />
        Publicar de forma anonima
      </label>
      <button type="submit" disabled={isSubmitting || !user}>
        {isSubmitting ? (uploading ? 'Subiendo imagenes...' : 'Guardando...') : 'Guardar post'}
      </button>
      {#if error}
        <p class="error">{error}</p>
      {/if}
    </form>
  {/if}
</main>

<style>
  .page {
    max-width: 720px;
    margin: 0 auto;
    padding: 48px 24px;
  }

  .header {
    margin-bottom: 24px;
  }

  .form {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  label {
    display: flex;
    flex-direction: column;
    gap: 6px;
    font-weight: 600;
  }

  input,
  textarea {
    border: 1px solid rgba(12, 12, 21, 0.2);
    border-radius: 12px;
    padding: 10px 12px;
    font: inherit;
  }

  .checkbox {
    flex-direction: row;
    align-items: center;
    font-weight: 500;
  }

  button {
    align-self: flex-start;
    padding: 10px 18px;
    border-radius: 999px;
    border: none;
    background: #0c0c15;
    color: #fff;
  }

  .message {
    color: #0b6b3a;
  }

  .error {
    color: #b91c1c;
  }

  .warning {
    background: #fff3d4;
    padding: 12px;
    border-radius: 12px;
    margin-bottom: 16px;
  }

  .hint {
    margin: 0;
    font-size: 0.9rem;
    color: #4b5563;
  }

  .success {
    background: rgba(255, 255, 255, 0.85);
    padding: 24px;
    border-radius: 16px;
  }

  .actions {
    display: flex;
    gap: 12px;
    margin-top: 16px;
    flex-wrap: wrap;
  }

  .primary {
    display: inline-block;
    padding: 10px 18px;
    border-radius: 999px;
    background: #0c0c15;
    color: #fff;
    text-decoration: none;
  }

  .ghost {
    background: transparent;
    border: 1px solid #0c0c15;
    color: #0c0c15;
    padding: 10px 18px;
    border-radius: 999px;
  }

  .images {
    display: grid;
    gap: 12px;
    grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
  }

  .image-card {
    background: rgba(255, 255, 255, 0.8);
    border-radius: 12px;
    padding: 10px;
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .image-card img {
    width: 100%;
    border-radius: 10px;
    object-fit: cover;
    max-height: 140px;
  }
</style>
