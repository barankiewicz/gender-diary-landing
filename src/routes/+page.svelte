<script lang="ts">
  import { LOCALES, SITE_ORIGIN, messages, pathFor } from '$lib/site';

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

<div class="layout">
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
</div>
