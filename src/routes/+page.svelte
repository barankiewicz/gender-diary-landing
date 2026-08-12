<script lang="ts">
  import { FALLBACK_LOCALE, LOCALES, SITE_ORIGIN, messages, pathFor, socialTags } from '$lib/site';

  /* Sends a visitor to the language they last read here, otherwise to the one
     their browser asks for, otherwise to English. It runs in the head of a
     prerendered file, before anything paints, so nobody watches this page
     briefly appear on their way through it.

     Dependency-free and inline for that reason, which means the storage key
     and the locale list are written out a second time here. src/lib/site.ts
     owns both; they have to change together. It reaches the page through
     `{@html}`, which is safe here and only here: the string below is a
     literal with nothing interpolated into it. Without scripting this stays a
     page with one link per language, which is why those links are ordinary
     markup rather than a noscript block. */
  const redirect = `<script>
    try {
      var stored = localStorage.getItem('gd-landing-language');
      var wanted = stored === 'en' || stored === 'pl' ? stored : '';
      var asked = navigator.languages && navigator.languages.length
        ? navigator.languages
        : [navigator.language || ''];
      for (var i = 0; i < asked.length && !wanted; i++) {
        var subtag = String(asked[i]).toLowerCase().split('-')[0];
        if (subtag === 'en' || subtag === 'pl') wanted = subtag;
      }
      location.replace('/' + (wanted || 'en') + '/');
    } catch (e) {
      location.replace('/en/');
    }
  <\/script>`;

  /* This page has no language of its own: it reads the visitor's and leaves
     again. What it does have is the URL people copy, because it is the only
     one without a language in it, so it is the URL most likely to be pasted
     into a chat and the one whose preview gets looked at. The card is the
     fallback locale's, which is also the page a visitor asking for neither
     language is about to be sent to. No structured data: this page shows a
     name and two language links, and there is nothing here to describe. */
  const gateway = socialTags({
    locale: FALLBACK_LOCALE,
    url: `${SITE_ORIGIN}/`,
    title: messages[FALLBACK_LOCALE].pageTitle,
    description: messages[FALLBACK_LOCALE].meta.landing.description,
  });
</script>

<svelte:head>
  <title>Gender Diary</title>
  <meta name="description" content={gateway['og:description']} />
  <link rel="canonical" href={`${SITE_ORIGIN}/`} />
  {#each LOCALES as locale (locale)}
    <link rel="alternate" hreflang={locale} href={SITE_ORIGIN + pathFor(locale)} />
  {/each}
  <link rel="alternate" hreflang="x-default" href={`${SITE_ORIGIN}/`} />
  {#each Object.entries(gateway) as [property, content] (property)}
    <meta {property} {content} />
  {/each}
  <meta name="twitter:card" content="summary_large_image" />
  {@html redirect}
</svelte:head>

<main id="content">
  <h1>Gender Diary</h1>
  <!-- No label on the nav: the only words on this page are a name and the
       two language names, each tagged with its own lang, so there is nothing
       here for a person to read in the wrong language. -->
  <nav>
    <ul>
      {#each LOCALES as locale (locale)}
        <li>
          <a href={pathFor(locale)} hreflang={locale} lang={locale}>
            {messages[locale].languageName}
          </a>
        </li>
      {/each}
    </ul>
  </nav>
</main>

<style>
  /* The landing page's direction in miniature, for the one audience that
     reads this page instead of passing through it: visitors without
     scripting. Static on purpose - a page normally seen for zero frames has
     nothing to animate. */
  main {
    display: grid;
    place-content: center;
    justify-items: center;
    gap: 2rem;
    min-height: 100dvh;
    padding: 2rem;
    text-align: center;
  }

  h1 {
    margin: 0;
    font-size: clamp(2rem, 6vw, 3.5rem);
    font-weight: 600;
    background: linear-gradient(92deg, var(--grad-a), var(--grad-b));
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
  }

  ul {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 0.75rem;
    list-style: none;
    margin: 0;
    padding: 0;
  }

  a {
    display: inline-block;
    padding: 0.6rem 1.5rem;
    border-radius: 999px;
    border: 1px solid var(--line);
    background: var(--surface);
    font-weight: 500;
    text-decoration: none;
    transition: border-color 0.25s;
  }

  a:hover {
    border-color: var(--blue);
  }
</style>
