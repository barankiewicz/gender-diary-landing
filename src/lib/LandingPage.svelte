<script lang="ts">
  import PageShell from '$lib/PageShell.svelte';
  import Prose from '$lib/Prose.svelte';
  import { JOURNAL_URL, messages, pathFor, type Locale } from '$lib/site';

  let { locale }: { locale: Locale } = $props();

  const m = $derived(messages[locale]);
</script>

<PageShell {locale} page="landing" title={m.pageTitle}>
  <!-- The splash. Alicja's direction for ticket 09: design the page as if the
       product were finished, so the channel badges render as buttons here and
       point at this page until each channel has an artifact (Journal ticket
       18). The acquisition section below keeps the honest wording: nothing on
       Android exists yet. -->
  <div class="hero">
    <div class="hero-inner scrim">
      <h1 class="enter shimmer" style:--enter={0}>{m.pageTitle}</h1>
      <p class="headline enter" style:--enter={1}>{m.hero.headline}</p>
      <p class="subheadline enter" style:--enter={2}>{m.hero.subheadline}</p>

      <div class="hero-actions enter" style:--enter={3}>
        <a class="cta" href={JOURNAL_URL}>{m.startJournal}</a>
        <ul class="badges">
          {#each m.channels as channel (channel.name)}
            <li><a class="badge" href={pathFor(locale)}>{channel.name}</a></li>
          {/each}
        </ul>
      </div>
    </div>
  </div>

  <section class="overview reveal scrim">
    <h2>{m.sectionOverview}</h2>
    <div class="overview-columns">
      <Prose paragraphs={m.overview} />
    </div>
  </section>

  <section class="privacy-handoff reveal scrim">
    <h2>{m.sectionPrivacy}</h2>
    <div class="panel">
      <Prose paragraphs={m.privacyHandoff} />
      <!-- The link is the privacy page's own title, so the reader knows what
           they are opening before they open it. -->
      <p class="more-line"><a class="more" href={pathFor(locale, 'privacy')}>{m.privacyPage.title}</a></p>
    </div>
  </section>

  <section class="tour reveal scrim">
    <h2>{m.sectionTour}</h2>
    <p class="tour-intro">{m.tourIntro}</p>

    <!-- Captions without their screenshots. Each card reserves the frame the
         screenshot will occupy (ticket 15 captures them from invented data);
         until then the frame holds only this section's colours, and the page
         describes no picture that is not there. -->
    <ol class="tour-strip">
      {#each m.tour as screen, index (screen.screen)}
        <li>
          <div class="slot" aria-hidden="true" data-tint={index % 2 ? 'pink' : 'blue'}></div>
          <h3>{screen.screen}</h3>
          <p>{screen.caption}</p>
        </li>
      {/each}
    </ol>
  </section>

  <section class="features scrim">
    <h2 class="reveal">{m.sectionFeatures}</h2>
    {#each m.features as group (group.group)}
      <!-- The groups are headed rather than run together because one of them
           opens by saying that everything in it is off until you turn it on,
           and that sentence is only true of its own group. -->
      <div class="group reveal">
        <h3>{group.group}</h3>
        <div class="cards">
          <!-- Rendered here rather than through Prose because the card grid
               needs to know which paragraph is a group's plain intro, and
               Prose deliberately does not distinguish. The rendering of each
               paragraph is Prose's, character for character: `rest` carries
               its own separator. -->
          {#each group.paragraphs as paragraph, index (index)}
            {#if typeof paragraph === 'string'}
              <p class="plain">{paragraph}</p>
            {:else}
              <p><strong>{paragraph.lead}</strong>{paragraph.rest}</p>
            {/if}
          {/each}
        </div>
      </div>
    {/each}
  </section>

  <section class="acquisition reveal scrim">
    <h2>{m.sectionAcquisition}</h2>
    <p class="acquisition-intro">{m.acquisitionIntro}</p>

    <!-- The primary action, again at the moment a reader has just finished
         deciding: a plain link, in this tab, to the URL and nothing appended
         to it. What may not ride along with it is on JOURNAL_URL in
         $lib/site. -->
    <p class="acquisition-action"><a class="cta" href={JOURNAL_URL}>{m.startJournal}</a></p>

    <p class="android">{m.acquisitionAndroid}</p>

    <!-- The three that do not report an install to Google first, alphabetical
         among themselves, and Google Play last. Unlike the splash's badges,
         these carry the notes and the honest status, and a channel here
         becomes a link only when it has an artifact behind it (Journal
         ticket 18). -->
    <ul class="channels">
      {#each m.channels as channel (channel.name)}
        <li>
          <strong>{channel.name}</strong>
          <span class="status">{m.channelStatus}</span>
          <p>{channel.note}</p>
        </li>
      {/each}
    </ul>
  </section>

  <section class="support reveal scrim">
    <h2>{m.sectionSupport}</h2>
    <Prose paragraphs={m.support} />
  </section>
</PageShell>

<style>
  section {
    max-width: 68rem;
    margin: 0 auto;
    padding: clamp(3rem, 8vh, 5.5rem) clamp(1rem, 4vw, 2.5rem) 0;
  }

  section:last-of-type {
    padding-bottom: clamp(4rem, 10vh, 7rem);
  }

  h2 {
    font-size: clamp(1.7rem, 3.5vw, 2.5rem);
    font-weight: 600;
    margin: 0 0 1.5rem;
  }

  /* ---- Hero ------------------------------------------------------------ */

  /* 56px is the sticky header's one-row height. On viewports narrow enough
     for the controls to wrap, the sum overshoots the viewport by a row and
     the page simply scrolls; the mobile override below steps in before that
     looks wrong.

     No `overflow: clip` any more. It was here to hold the aurora inside the
     hero, and holding the aurora inside the hero is exactly what put a hard
     horizontal line across the page at the first scroll (ticket 17). The
     layer is fixed to the viewport in Aura.svelte now and clips itself. */
  .hero {
    position: relative;
    display: grid;
    align-items: center;
    min-height: calc(100dvh - 56px);
  }

  /* min-width: 0 because this is a grid item, and a grid track's automatic
     minimum is its content's min-content size. At 200% text the longest word
     in the headline is wider than a phone, so the track grew to fit it and
     took the document sideways with it. The clip that used to be on .hero hid
     that by cutting the word off instead, which is not better. */
  .hero-inner {
    position: relative;
    width: 100%;
    min-width: 0;
    max-width: 68rem;
    margin: 0 auto;
    padding: 2rem clamp(1rem, 4vw, 2.5rem) 4rem;
  }

  /* No text-transform here: the tests read the site name off this element,
     and innerText reports the transformed casing. */
  h1 {
    font-size: 1.25rem;
    font-weight: 700;
    letter-spacing: 0.04em;
    margin: 0 0 2.5rem;
    background: linear-gradient(92deg, var(--grad-a), var(--grad-b));
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
    width: fit-content;
  }

  /* Ink for most of its length, and the flag's two colours at the end of the
     last line. The endpoints are the theme's text-safe pair, so the gradient
     never trades contrast for the effect. */
  /* min() around the clamp's floor, for the reason the .cards grid uses one:
     a floor written in rem is a promise about the smallest this may be, and at
     200% text 2.4rem is 76.8px, which sets "transition" wider than the phone
     holding it. The min() lets the floor fall back to what the viewport can
     actually carry and leaves the 2.4rem intent untouched everywhere it
     fits, which is every case except a doubled text size on a phone. */
  .headline {
    font-size: clamp(min(2.4rem, 12vw), 7vw, 4.75rem);
    font-weight: 600;
    line-height: 1.05;
    letter-spacing: -0.03em;
    text-wrap: balance;
    margin: 0 0 1.25rem;
    max-width: 17ch;
    background: linear-gradient(105deg, var(--ink) 45%, var(--grad-a) 78%, var(--grad-b) 96%);
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
  }

  .subheadline {
    font-size: clamp(1.1rem, 2vw, 1.35rem);
    font-weight: 400;
    color: var(--muted);
    max-width: 44ch;
    margin: 0 0 2.75rem;
  }

  .hero-actions {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 1.25rem 2rem;
  }

  .badges {
    display: flex;
    flex-wrap: wrap;
    gap: 0.6rem;
    list-style: none;
    margin: 0;
    padding: 0;
  }

  /* Store-badge-shaped, glass over the aurora. */
  .badge {
    position: relative;
    display: inline-block;
    padding: 0.55rem 1.1rem;
    border-radius: 999px;
    border: 1px solid var(--line);
    background: var(--panel);
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    font-size: 0.9375rem;
    font-weight: 500;
    text-decoration: none;
    overflow: clip;
    transition: border-color 0.25s;
  }

  .badge:hover {
    border-color: var(--blue);
  }

  /* The badge's moving feedback, behind the gate its recolouring is not. */
  @media (prefers-reduced-motion: no-preference) {
    .badge {
      transition:
        border-color 0.25s,
        transform 0.2s;
    }

    .badge:hover {
      transform: translateY(-2px);
    }

    .badge:active {
      transform: scale(0.97);
    }
  }

  /* ---- Overview ---------------------------------------------------------- */

  .overview-columns {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 2.5rem;
    align-items: start;
  }

  .overview-columns :global(p) {
    margin: 0;
  }

  .overview-columns :global(p:first-child) {
    font-size: clamp(1.15rem, 2vw, 1.4rem);
    line-height: 1.5;
  }

  /* ---- Privacy hand-off --------------------------------------------------- */

  .panel {
    border-radius: 1.25rem;
    padding: clamp(1.5rem, 4vw, 3rem);
    border: 1px solid transparent;
    background:
      linear-gradient(var(--surface), var(--surface)) padding-box,
      linear-gradient(120deg, var(--blue), var(--pink)) border-box;
  }

  .panel :global(p) {
    max-width: 60ch;
  }

  .panel .more-line {
    margin: 1.5rem 0 0;
  }

  .more {
    display: inline-block;
    font-weight: 600;
    text-decoration: none;
    border-bottom: 2px solid var(--pink);
    padding-bottom: 0.15rem;
    transition: border-color 0.25s;
  }

  .more:hover {
    border-color: var(--blue);
  }

  .more::after {
    content: ' \2192';
  }

  /* ---- Tour ---------------------------------------------------------------- */

  .tour-intro {
    color: var(--muted);
    max-width: 55ch;
    margin-bottom: 2rem;
  }

  .tour-strip {
    display: flex;
    gap: 1.25rem;
    list-style: none;
    margin: 0;
    padding: 0.25rem 0.25rem 1.25rem;
    overflow-x: auto;
    scroll-snap-type: x proximity;
    scrollbar-width: thin;
  }

  .tour-strip li {
    flex: 0 0 min(19rem, 78vw);
    scroll-snap-align: start;
  }

  .slot {
    aspect-ratio: 9 / 16;
    border-radius: 1.25rem;
    border: 1px solid var(--line);
    margin-bottom: 1rem;
  }

  .slot[data-tint='blue'] {
    background:
      radial-gradient(120% 90% at 20% 10%, var(--blob-blue), transparent 60%),
      var(--surface);
  }

  .slot[data-tint='pink'] {
    background:
      radial-gradient(120% 90% at 80% 90%, var(--blob-pink), transparent 60%),
      var(--surface);
  }

  .tour-strip h3 {
    font-size: 1.125rem;
    margin: 0 0 0.4rem;
  }

  .tour-strip p {
    color: var(--muted);
    font-size: 0.9375rem;
    margin: 0;
  }

  /* ---- Features -------------------------------------------------------------- */

  .group {
    margin-bottom: 3rem;
  }

  .group:last-child {
    margin-bottom: 0;
  }

  .group h3 {
    font-size: clamp(1.2rem, 2.2vw, 1.5rem);
    margin: 0 0 1.25rem;
  }

  /* min() around the track floor, because a bare minmax(17rem, 1fr) is a
     promise the grid keeps even when it cannot: at 200% text 17rem is 544px,
     wider than the phone holding it, and the row answers by pushing the whole
     document sideways. The min() lets the column fall back to the width
     actually available while leaving the 17rem intent untouched everywhere
     it fits. */
  .cards {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(min(17rem, 100%), 1fr));
    gap: 1rem;
  }

  .cards p {
    margin: 0;
    padding: 1.25rem 1.4rem;
    border-radius: 1rem;
    border: 1px solid var(--line);
    background: var(--surface);
    font-size: 0.9375rem;
    color: var(--muted);
  }

  /* The lead stays inline: `rest` opens with its own separator, sometimes a
     comma, and a block lead would put a line break where the sentence needs
     none (the copy tests read the paragraph back as one line). The emphasis
     is weight and ink against the card's muted body. */
  .cards p strong {
    color: var(--ink);
    font-weight: 600;
  }

  /* Two tinted cards per grid, so the grids are not a wall of one surface. */
  .cards p:nth-child(4n + 1) {
    background:
      radial-gradient(140% 120% at 0% 0%, var(--tint-blue), transparent 55%),
      var(--surface);
  }

  .cards p:nth-child(4n + 3) {
    background:
      radial-gradient(140% 120% at 100% 100%, var(--tint-pink), transparent 55%),
      var(--surface);
  }

  /* A group's intro speaks for the group, not from a card. */
  .cards p.plain {
    grid-column: 1 / -1;
    border: none;
    background: none;
    padding: 0;
    max-width: 60ch;
    font-size: 1.0625rem;
  }

  /* ---- Acquisition ------------------------------------------------------------- */

  .acquisition-intro {
    font-size: clamp(1.1rem, 2vw, 1.3rem);
    max-width: 44ch;
    margin-bottom: 2rem;
  }

  .acquisition-action {
    margin-bottom: 3rem;
  }

  .android {
    color: var(--muted);
    max-width: 60ch;
  }

  /* Same floor problem as .cards above, one size up. */
  .channels {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(min(19rem, 100%), 1fr));
    gap: 1rem;
    list-style: none;
    margin: 1.5rem 0 0;
    padding: 0;
  }

  .channels li {
    padding: 1.25rem 1.4rem;
    border-radius: 1rem;
    border: 1px solid var(--line);
    background: var(--surface);
  }

  .channels strong {
    font-size: 1.0625rem;
    margin-right: 0.6rem;
  }

  .channels p {
    color: var(--muted);
    font-size: 0.9375rem;
    margin: 0.5rem 0 0;
  }

  /* ---- Support ----------------------------------------------------------------- */

  .support :global(p) {
    max-width: 60ch;
  }

  /* The warning is the one thing on the page a reader must not scroll past
     thinking it was decoration. */
  .support :global(p:last-child) {
    border-left: 3px solid var(--pink);
    padding: 0.75rem 0 0.75rem 1.25rem;
    margin-top: 1.5rem;
  }

  /* ---- Mobile ------------------------------------------------------------------ */

  @media (max-width: 48rem) {
    .overview-columns {
      grid-template-columns: 1fr;
      gap: 1rem;
    }

    .hero {
      min-height: 92dvh;
    }
  }
</style>
