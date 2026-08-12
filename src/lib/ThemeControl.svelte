<script lang="ts">
  import { onMount } from 'svelte';
  import { messages, type Locale } from '$lib/site';
  import { THEME_CHOICES, applyThemeChoice, readThemeChoice, type ThemeChoice } from '$lib/theme';

  let { locale }: { locale: Locale } = $props();

  const labels = { system: 'themeSystem', light: 'themeLight', dark: 'themeDark' } as const;
  const m = $derived(messages[locale]);

  /* Prerendered markup cannot know the stored choice, so the buttons render
     unpressed and correct themselves on load. The theme itself is already
     right by then - app.html stamped it before first paint. */
  let choice = $state<ThemeChoice>('system');
  onMount(() => {
    choice = readThemeChoice();
  });

  function select(next: ThemeChoice) {
    choice = next;
    applyThemeChoice(next);
  }
</script>

<div class="control theme-control">
  <span class="control-label" id="theme-label">{m.themeLabel}</span>
  <div role="group" aria-labelledby="theme-label">
    {#each THEME_CHOICES as option (option)}
      <button
        type="button"
        aria-pressed={choice === option}
        onclick={() => select(option)}
      >
        {m[labels[option]]}
      </button>
    {/each}
  </div>
</div>
