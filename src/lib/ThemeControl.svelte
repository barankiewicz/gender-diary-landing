<script lang="ts">
  import { onMount } from 'svelte';
  import { messages, type Locale } from '$lib/site';
  import { applyThemeChoice, readThemeChoice, type ThemeChoice } from '$lib/theme';

  let { locale }: { locale: Locale } = $props();

  const m = $derived(messages[locale]);

  const stampedChoice: ThemeChoice =
    typeof document === 'undefined'
      ? 'system'
      : document.documentElement.dataset.theme === 'light' ||
          document.documentElement.dataset.theme === 'dark'
        ? document.documentElement.dataset.theme
        : 'system';

  const stampedTheme =
    stampedChoice === 'dark'
      ? 'dark'
      : stampedChoice === 'light'
        ? 'light'
        : typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches
          ? 'dark'
          : 'light';

    /* Prerendered markup cannot know the stored choice, so the switch may start
      on the system side and correct itself on load. The theme itself is already
     right by then - app.html stamped it before first paint. */
  let theme = $state<'light' | 'dark'>(stampedTheme);
  onMount(() => {
    const stored = readThemeChoice();
    if (stored === 'light' || stored === 'dark') {
      theme = stored;
      return;
    }
    theme =
      document.documentElement.dataset.theme === 'dark' ||
      window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark'
        : 'light';
  });

  function toggleTheme() {
    theme = theme === 'dark' ? 'light' : 'dark';
    applyThemeChoice(theme);
  }
</script>

<div class="control theme-control">
  <span class="control-label" id="theme-label">{m.themeLabel}: {theme === 'dark' ? m.themeDark : m.themeLight}</span>
  <button
    type="button"
    class="switch"
    role="switch"
    aria-labelledby="theme-label"
    aria-checked={theme === 'dark'}
    aria-label={theme === 'dark' ? m.themeDark : m.themeLight}
    onclick={toggleTheme}
  >
    <span class="switch-option">{m.themeLight}</span>
    <span class="switch-option">{m.themeDark}</span>
    <span class="switch-thumb" aria-hidden="true"></span>
  </button>
</div>
