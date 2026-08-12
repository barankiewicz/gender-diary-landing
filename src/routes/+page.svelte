<script lang="ts">
  import { GATEWAY_REDIRECT } from '$lib/gateway-redirect';
  import { LOCALES, SITE_ORIGIN, messages, pathFor } from '$lib/site';

  /* The redirect reaches the page through `{@html}`, which is safe here and
     only here: src/lib/gateway-redirect.ts is a literal with nothing
     interpolated into it, and the production policy allows it by its hash.
     Without scripting this stays a page with one link per language, which is
     why those links are ordinary markup rather than a noscript block. */
  const redirect = `<script>${GATEWAY_REDIRECT}<\/script>`;
</script>

<svelte:head>
  <title>Gender Diary</title>
  <link rel="canonical" href={`${SITE_ORIGIN}/`} />
  {#each LOCALES as locale (locale)}
    <link rel="alternate" hreflang={locale} href={SITE_ORIGIN + pathFor(locale)} />
  {/each}
  <link rel="alternate" hreflang="x-default" href={`${SITE_ORIGIN}/`} />
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
