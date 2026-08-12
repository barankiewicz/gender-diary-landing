<script lang="ts">
  import ThemeControl from '$lib/ThemeControl.svelte';
  import { LANGUAGE_KEY, LOCALES, SITE_ORIGIN, messages, pathFor, type Locale } from '$lib/site';

  let { locale }: { locale: Locale } = $props();

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
  <title>{m.pageTitle}</title>
  <link rel="canonical" href={SITE_ORIGIN + pathFor(locale)} />
  {#each LOCALES as alternate (alternate)}
    <link rel="alternate" hreflang={alternate} href={SITE_ORIGIN + pathFor(alternate)} />
  {/each}
  <link rel="alternate" hreflang="x-default" href={`${SITE_ORIGIN}/`} />
</svelte:head>

<div class="layout">
  <header class="controls">
    <nav class="control" aria-label={m.languageLabel}>
      <span class="control-label">{m.languageLabel}</span>
      {#each LOCALES as option (option)}
        <!-- data-sveltekit-reload because each language is its own document:
             the language of a page is in its `<html lang>`, written when the
             file was generated, and a client-side navigation would swap the
             text while leaving that attribute - and so a screen reader's
             pronunciation - on the language the person just left. -->
        <a
          href={pathFor(option)}
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
    <h1>{m.pageTitle}</h1>

    <section>
      <h2>{m.sectionOverview}</h2>
      <p>{m.copyPending}</p>
    </section>

    <section>
      <h2>{m.sectionPrivacy}</h2>
      <p>{m.copyPending}</p>
    </section>

    <section>
      <h2>{m.sectionAcquisition}</h2>
      <p>{m.copyPending}</p>
    </section>
  </main>
</div>
