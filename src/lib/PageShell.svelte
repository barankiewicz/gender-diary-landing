<script lang="ts">
  import type { Snippet } from 'svelte';
  import ThemeControl from '$lib/ThemeControl.svelte';
  import {
    LANGUAGE_KEY,
    LOCALES,
    SITE_ORIGIN,
    defaultPathFor,
    messages,
    pathFor,
    type Locale,
    type Page,
  } from '$lib/site';

  let {
    locale,
    page,
    title,
    children,
  }: { locale: Locale; page: Page; title: string; children: Snippet } = $props();

  const m = $derived(messages[locale]);

  /* Only a person choosing a language is remembered, which is why this is on
     the click and not on the page. Opening somebody else's link to /en/ is not
     a decision to stop reading Polish, and it must not overwrite one. Without
     scripting the link still switches language; only the memory is lost. */
  function remember(chosen: Locale) {
    try {
      localStorage.setItem(LANGUAGE_KEY, chosen);
    } catch {
      /* storage unavailable, this choice simply is not remembered */
    }
  }
</script>

<svelte:head>
  <title>{title}</title>
  <link rel="canonical" href={SITE_ORIGIN + pathFor(locale, page)} />
  {#each LOCALES as alternate (alternate)}
    <link rel="alternate" hreflang={alternate} href={SITE_ORIGIN + pathFor(alternate, page)} />
  {/each}
  <link rel="alternate" hreflang="x-default" href={SITE_ORIGIN + defaultPathFor(page)} />
</svelte:head>

<div class="layout">
  <header class="controls">
    {#if page !== 'landing'}
      <!-- The way back, on every page that is not the one it points at. It is
           the site's name rather than a word like "back", so it says where it
           goes and needs no translation of its own. -->
      <a href={pathFor(locale)}>{m.pageTitle}</a>
    {/if}

    <nav class="control" aria-label={m.languageLabel}>
      <span class="control-label">{m.languageLabel}</span>
      {#each LOCALES as option (option)}
        <!-- The other language of this page, not of the site: somebody halfway
             down the privacy page who switches language wants the privacy page.

             data-sveltekit-reload because each language is its own document:
             the language of a page is in its `<html lang>`, written when the
             file was generated, and a client-side navigation would swap the
             text while leaving that attribute - and so a screen reader's
             pronunciation - on the language the person just left. -->
        <a
          href={pathFor(option, page)}
          hreflang={option}
          lang={option}
          data-sveltekit-reload
          aria-current={option === locale ? 'page' : undefined}
          onclick={() => remember(option)}
        >
          {messages[option].languageName}
        </a>
      {/each}
    </nav>

    <ThemeControl {locale} />
  </header>

  <main id="content">
    {@render children()}
  </main>
</div>
