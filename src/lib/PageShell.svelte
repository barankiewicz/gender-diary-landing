<script lang="ts">
  import { onMount, type Snippet } from 'svelte';
  import Aura from '$lib/Aura.svelte';
  import ThemeControl from '$lib/ThemeControl.svelte';
  import { startReveals } from '$lib/reveal';
  import {
    LANGUAGE_KEY,
    LOCALES,
    SITE_ORIGIN,
    defaultPathFor,
    messages,
    pathFor,
    socialTags,
    structuredDataScript,
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
  const canonical = $derived(SITE_ORIGIN + pathFor(locale, page));
  const description = $derived(m.meta[page].description);

  /* The scroll reveals for browsers that cannot scrub them in CSS. It decides
     for itself whether there is anything to do, and returns the teardown.
     onMount rather than $effect because it reads the laid-out page once and
     has nothing to re-run for. */
  onMount(startReveals);

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
  <!-- The title is the page's own name and stays that short deliberately.
       It is the one piece of metadata a reader cannot avoid: it goes into a
       browser history entry, a tab, a bookmark and the top line of a
       preview, none of which they chose. So it says the product's name, or
       on the privacy page that page's own heading, and it does not say what
       kind of app this is. An SEO pass would want "a transition journal that
       stays on your device" up here, where the words a person searches with
       carry the most weight; that is the cost, and it is paid on purpose
       (spec story 37). The description below carries those words instead,
       because no browser ever puts a description in a history entry. -->
  <title>{title}</title>
  <meta name="description" content={description} />

  <link rel="canonical" href={canonical} />
  {#each LOCALES as alternate (alternate)}
    <link rel="alternate" hreflang={alternate} href={SITE_ORIGIN + pathFor(alternate, page)} />
  {/each}
  <!-- `defaultPathFor` explains why this is the English page rather than a
       language gateway for every page: `/` asks a browser what it reads and
       sends it on, and what it detects is a language, not a page. Ticket 07
       revisited that and kept it. A per-page gateway would be a second
       redirect for every page the site grows, and pointing a reader who
       asked for the privacy page at `/` would answer them with the landing
       page in a language they never picked. -->
  <link rel="alternate" hreflang="x-default" href={SITE_ORIGIN + defaultPathFor(page)} />

  {#each Object.entries(socialTags({ locale, url: canonical, title, description })) as [property, content] (property)}
    <meta {property} {content} />
  {/each}
  <!-- The one tag outside the Open Graph vocabulary, and it asks for a
       layout rather than naming anybody: Twitter reads the og: tags above
       for the words and the picture, and this says which of its two card
       shapes to build. There is no site or creator handle here, because the
       project has no account anywhere to name. -->
  <meta name="twitter:card" content="summary_large_image" />

  <!-- Structured data goes where the page describes the app, and only there.
       The privacy page describes what the app does not do, which is not a
       software listing; a breadcrumb would be markup for a trail this site
       does not show a visitor. `structuredDataScript` carries the rest of the
       reasoning, including what the vocabulary offers that this page will
       not claim. -->
  {#if page === 'landing'}
    {@html structuredDataScript(locale)}
  {/if}
</svelte:head>

<!-- The site's ground, under both pages and under the header. The landing page
     leads with it and the privacy page runs it at half, which is the whole of
     the difference between them: one layer, one set of tokens, two
     intensities (ticket 17). -->
<Aura strength={page === 'landing' ? 'full' : 'quiet'} />

<header class="controls">
  {#if page !== 'landing'}
    <!-- The way back, on every page that is not the one it points at. It is
         the site's name rather than a word like "back", so it says where it
         goes and needs no translation of its own. -->
    <a class="brand" href={pathFor(locale)}>{m.pageTitle}</a>
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
