<script>
  export let target = null;
  let open = false;

  const EMOJIS = [
    '😊','😍','🔥','💕','✨','🙈','😈','💫','🌹','💦',
    '🎯','👀','😏','💋','🥰','😻','💪','🌶️','🍑','🌊',
    '✌️','🤤','😮','💭','👋','😘','🫦','💯','❤️','🫶',
    '😂','😅','🤩','😇','🥵','🤫','🫠','💀','🙃','😤',
  ];

  function insertEmoji(emoji) {
    if (!target) return;
    const start = target.selectionStart ?? target.value.length;
    const end = target.selectionEnd ?? start;
    target.value = target.value.slice(0, start) + emoji + target.value.slice(end);
    target.dispatchEvent(new Event('input', { bubbles: true }));
    const newPos = start + [...emoji].length;
    requestAnimationFrame(() => {
      target.selectionStart = target.selectionEnd = newPos;
      target.focus();
    });
    open = false;
  }
</script>

<div class="wrap">
  <button
    type="button"
    class="trigger"
    title="Agregar emoji"
    on:click|stopPropagation={() => open = !open}
  >😊</button>
  {#if open}
    <div class="backdrop" on:click={() => open = false} on:keydown={() => {}}></div>
    <!-- svelte-ignore a11y-no-static-element-interactions -->
    <div class="panel" on:mousedown|preventDefault>
      {#each EMOJIS as emoji}
        <button type="button" class="emoji" on:click={() => insertEmoji(emoji)}>{emoji}</button>
      {/each}
    </div>
  {/if}
</div>

<style>
  .wrap { position: relative; display: inline-flex; }
  .trigger {
    background: var(--surface-solid);
    border: 1px solid var(--line);
    border-radius: 8px;
    padding: 4px 8px;
    cursor: pointer;
    font-size: 1rem;
    line-height: 1;
  }
  .trigger:hover { background: var(--surface-soft); }
  .backdrop { position: fixed; inset: 0; z-index: 100; }
  .panel {
    position: absolute;
    bottom: calc(100% + 6px);
    left: 0;
    z-index: 101;
    background: var(--surface-solid);
    border: 1px solid var(--line);
    border-radius: 12px;
    padding: 8px;
    display: grid;
    grid-template-columns: repeat(8, 1fr);
    gap: 2px;
    box-shadow: 0 4px 24px rgba(0,0,0,0.18);
  }
  .emoji {
    background: none;
    border: none;
    cursor: pointer;
    font-size: 1.2rem;
    padding: 4px;
    border-radius: 6px;
    line-height: 1;
  }
  .emoji:hover { background: var(--surface-soft); }
  @media (max-width: 639px) { .wrap { display: none; } }
</style>
