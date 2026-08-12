<script lang="ts">
  import { animate } from 'motion';
  import { onMount } from 'svelte';
  import PageShell from '$lib/PageShell.svelte';
  import Prose from '$lib/Prose.svelte';
  import { JOURNAL_URL, messages, pathFor, type Locale } from '$lib/site';

  let { locale }: { locale: Locale } = $props();

  let flagStroke: SVGSVGElement | null = null;
  let flagPath: SVGPathElement | null = null;

  const m = $derived(messages[locale]);

  onMount(() => {
    if (!flagStroke || !flagPath) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    flagStroke.dataset.motion = 'on';
    flagPath.style.strokeDasharray = '1';
    flagPath.style.strokeDashoffset = '1';

    let disposed = false;
    let breatheControls: { stop: () => void } | null = null;

    const drawThenBreathe = async () => {
      await animate(flagPath, { strokeDashoffset: [1, 0] }, { duration: 1.2, ease: [0.16, 1, 0.3, 1] })
        .finished;
      if (disposed) return;
      breatheControls = animate(
        flagPath,
        {
          strokeWidth: [3, 3.35, 3],
          opacity: [1, 0.92, 1],
        },
        { duration: 6.5, ease: 'easeInOut', repeat: Infinity },
      );
    };

    void drawThenBreathe();

    return () => {
      disposed = true;
      breatheControls?.stop();
    };
  });
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
      <!-- Shrink-wrapped around the headline so the stroke below is exactly
           as wide as the words it sits under, whatever the balancer does with
           the line breaks. -->
      <div class="headline-block enter" style:--enter={1}>
        <p class="headline">{m.hero.headline}</p>

        <!-- The flag as a line rather than as stripes: one straight rule
             stroked blue to white to pink, drawing itself once the headline has
             landed. Alicja asked for this in Rive (2026-08-12); it is SVG
             because Rive would be 150-200kb of runtime and WASM against a
             ticket that argues 40kb is already too much, would need
             wasm-unsafe-eval in a policy that has no eval anywhere in it, and
             would leave a visitor without scripting looking at an empty canvas.
             This is markup, so they get the line too.

             pathLength normalises the curve to 1 unit, which is what lets the
             dash in base.css be written as a fraction rather than as a length
             somebody has to measure again after every edit to the `d`. -->
        <svg
          class="flag-stroke"
          data-motion="off"
          viewBox="0 0 400 14"
          preserveAspectRatio="none"
          aria-hidden="true"
          focusable="false"
          bind:this={flagStroke}
        >
          <defs>
            <!-- userSpaceOnUse, and that is load-bearing rather than a
               preference. A linearGradient defaults to objectBoundingBox
               units, and the bounding box of a perfectly horizontal line has
               zero height, which makes the gradient unresolvable: the path is
               then not painted at all. The line simply was not there. In user
               space the coordinates are the viewBox's own, so 0 to 400 is the
               full width. -->
          <linearGradient
            id="flag-stroke-gradient"
            gradientUnits="userSpaceOnUse"
            x1="0"
            y1="0"
            x2="400"
            y2="0"
          >
              <stop class="stop-start" offset="0%" />
              <stop class="stop-mid" offset="50%" />
              <stop class="stop-end" offset="100%" />
            </linearGradient>
          </defs>
          <g class="flag-ink">
            <path
              class="flag-base"
              d="M2 7 L 398 7"
              fill="none"
              stroke="url(#flag-stroke-gradient)"
              stroke-width="3"
              stroke-linecap="round"
            />
            <path
              class="flag-trace"
              pathLength="1"
              d="M2 7 L 398 7"
              fill="none"
              stroke="url(#flag-stroke-gradient)"
              stroke-width="3"
              stroke-linecap="round"
              bind:this={flagPath}
            />
          </g>
        </svg>
      </div>

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

  <section class="opening scrim">
    <div class="opening-title reveal">
      <h2>{m.sectionOverview}</h2>
      <span class="section-mark" aria-hidden="true"></span>
    </div>
    <div class="opening-copy">
      <div class="opening-lede"><Prose paragraphs={m.overview.slice(0, 1)} reveal /></div>
      <Prose paragraphs={m.overview.slice(1)} reveal />
    </div>
  </section>

  <section class="privacy-note scrim">
    <div class="privacy-title reveal">
      <h2>{m.sectionPrivacy}</h2>
      <div class="standfirst"><Prose paragraphs={m.privacyHandoff.slice(0, 1)} reveal /></div>
    </div>
    <div class="privacy-answer reveal">
      <Prose paragraphs={m.privacyHandoff.slice(1)} />
      <p class="more-line"><a class="more" href={pathFor(locale, 'privacy')}>{m.privacyPage.title}</a></p>
    </div>
  </section>

  <section class="tour">
    <div class="tour-head scrim">
      <h2>{m.sectionTour}</h2>
      <p class="tour-intro">{m.tourIntro}</p>
    </div>

    <!-- Captions without their screenshots. Each frame declares the aspect
         ratio its screenshot will have, so ticket 16 drops the pictures in
         and moves no layout; until then the frame holds only this section's
         colours, and the page describes no picture that is not there. -->
    <div class="tour-pin" style:--tour-cards={m.tour.length}>
      <div class="tour-stage">
        <ol class="tour-strip">
          {#each m.tour as screen, index (screen.screen)}
            <li>
              <div class="slot" aria-hidden="true" data-tint={index % 2 ? 'pink' : 'blue'}></div>
              <h3>{screen.screen}</h3>
              <p>{screen.caption}</p>
            </li>
          {/each}
        </ol>
      </div>
    </div>
  </section>

  <section class="features scrim">
    <div class="features-head">
      <h2>{m.sectionFeatures}</h2>
      <span class="section-mark" aria-hidden="true"></span>
    </div>
    <div class="feature-groups">
      {#each m.features as group (group.group)}
        <!-- The groups are headed rather than run together because one of them
             opens by saying that everything in it is off until you turn it on,
             and that sentence is only true of its own group. -->
        <article class="group reveal">
          <h3>{group.group}</h3>
          <div class="entries">
            <!-- Rendered here rather than through Prose because this layout
                 needs to know which paragraph is a group's plain intro, and
                 Prose deliberately does not distinguish. The rendering of each
                 paragraph is Prose's, character for character: `rest` carries
                 its own separator. -->
            {#each group.paragraphs as paragraph, index (index)}
              {#if typeof paragraph === 'string'}
                <p class="plain reveal" style:--reveal-index={index}>{paragraph}</p>
              {:else}
                <p class="reveal" style:--reveal-index={index}><strong>{paragraph.lead}</strong>{paragraph.rest}</p>
              {/if}
            {/each}
          </div>
        </article>
      {/each}
    </div>
  </section>

  <section class="acquisition-wrap scrim">
    <div class="acquisition">
      <div class="acquisition-head reveal">
        <h2>{m.sectionAcquisition}</h2>
        <p>{m.acquisitionIntro}</p>
      </div>
      <!-- The primary action, again at the moment a reader has just finished
           deciding: a plain link, in this tab, to the URL and nothing appended
           to it. What may not ride along with it is on JOURNAL_URL in
           $lib/site. -->
      <p class="acquisition-action"><a class="cta" href={JOURNAL_URL}>{m.startJournal}</a></p>

      <p class="android reveal">{m.acquisitionAndroid}</p>

      <!-- The three that do not report an install to Google first, alphabetical
           among themselves, and Google Play last. Unlike the splash's badges,
           these carry the notes and the honest status, and a channel here
           becomes a link only when it has an artifact behind it (Journal
           ticket 18). -->
      <ul class="channels">
        {#each m.channels as channel, index (channel.name)}
          <li class="reveal" style:--reveal-index={index}>
            <strong>{channel.name}</strong>
            <span class="status">{m.channelStatus}</span>
            <p>{channel.note}</p>
          </li>
        {/each}
      </ul>
    </div>
  </section>

  <section class="support-section scrim">
    <div class="support-title reveal">
      <h2>{m.sectionSupport}</h2>
    </div>
    <div class="support reveal">
      <Prose paragraphs={m.support} reveal />
    </div>
  </section>
</PageShell>

<style>
  section:last-of-type {
    padding-bottom: clamp(4rem, 10vh, 7rem);
  }

  h2 {
    font-size: clamp(1.5rem, 2.6vw, 2.1rem);
    font-weight: 600;
    margin: 0;
    text-wrap: balance;
  }

  /* Existing copy moved, never written: the standfirst is the section's own
     first paragraph, which ticket 17 relocates rather than replaces. Sections
     whose copy has no such paragraph get a rail with only a heading in it,
     because inventing one here would be a copy change. */
  .standfirst {
    margin-top: 1rem;
    color: var(--muted);
    font-size: 0.9375rem;
  }

  .standfirst :global(p:last-child) {
    margin-bottom: 0;
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
     never trades contrast for the effect.

     min() around the clamp's floor, for the reason the .channels grid uses
     one: a floor written in rem is a promise about the smallest this may be,
     and at 200% text 2.4rem is 76.8px, which sets "transition" wider than the
     phone holding it. The min() lets the floor fall back to what the viewport
     can carry and leaves the 2.4rem intent untouched everywhere it fits. */
  /* Shrink-wrapped so that .flag-stroke below can be exactly as wide as the
     longest line of the headline, whatever text-wrap: balance decides that
     is, in either language. */
  .headline-block {
    width: fit-content;
    max-width: 100%;
    margin: 0 0 1.5rem;
  }

  /* The stop colours are CSS rather than stop-color attributes on the stops
     themselves. A var() inside an SVG presentation attribute resolves in
     Chromium and has a history of not resolving elsewhere, and the way it
     fails is the stop falling back to black: the one part of this that could
     quietly stop being the flag. As the stop-color property it is ordinary
     CSS everywhere. */
  .stop-start {
    stop-color: var(--grad-a);
  }

  .stop-mid {
    stop-color: var(--stroke-mid);
  }

  .stop-end {
    stop-color: var(--grad-b);
  }

  .flag-stroke {
    display: block;
    width: 100%;
    height: 0.85rem;
    margin-top: 0.35rem;
    overflow: visible;
  }

  .flag-ink {
    transform-box: fill-box;
    transform-origin: 50% 50%;
    will-change: transform;
  }

  .flag-base {
    opacity: 0.58;
  }

  .headline {
    font-size: clamp(min(2.4rem, 12vw), 7vw, 4.75rem);
    font-weight: 600;
    line-height: 1.05;
    letter-spacing: -0.03em;
    text-wrap: balance;
    margin: 0;
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

  /* Store-badge-shaped, glass over the aura. */
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
    transform: rotate(var(--tilt, 0deg));
    transition: border-color 0.25s;
  }

  .badges li:nth-child(odd) .badge {
    --tilt: -0.7deg;
  }

  .badges li:nth-child(3n) .badge {
    --tilt: 0.6deg;
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
      transform: rotate(var(--tilt, 0deg)) translateY(-2px);
    }

    .badge:active {
      transform: rotate(var(--tilt, 0deg)) scale(0.97);
    }
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

  /* The deliberate exception. It keeps no rail and no 68rem container: the
     strip runs the full width of the window, so the aura is at full strength
     around it rather than behind a scrim. */
  .tour {
    padding: clamp(3rem, 8vh, 5.5rem) 0 0;
  }

  .tour-head {
    max-width: 68rem;
    margin: 0 auto 2rem;
    padding: 0 clamp(1rem, 4vw, 2.5rem);
  }

  .tour-intro {
    color: var(--muted);
    max-width: 55ch;
    margin: 1rem 0 0;
  }

  /* The strip a reader gets when nothing pins it: their own scroll container,
     wider than the window and scrolling inside itself so it never takes the
     document sideways. This is the finished section for a browser without
     scroll-driven animations and for anybody who asked for reduced motion,
     and the pinned pan below is written on top of it rather than instead of
     it. */
  .tour-stage {
    overflow-x: auto;
    scroll-snap-type: x proximity;
    scrollbar-width: thin;
  }

  @media (prefers-reduced-motion: no-preference) {
    @supports (animation-timeline: view()) {
      /* The scroll distance the pan is spent over. The stage sticks for the
         height of this box less its own, so 320vh of page buys roughly 220vh
         of pinned pan. */
      /* The scroll the pan is spent over, which is the strip's own overflow
         and not a fixed guess. At 320vh flat, a 2560px window - where eight
         19rem frames barely exceed the viewport and there is almost nothing
         left to pan - still pinned the page for two windowfuls of dead
         scroll. Derived like this the pan runs at 1:1 with the scrollbar, and
         on a window wide enough to hold the whole strip the pin is one screen
         and effectively stands down.

         --tour-cards is stamped by the component, so the count comes from the
         message catalogue rather than from a number written down twice. */
      .tour-pin {
        --strip: calc(
          var(--tour-cards) * min(19rem, 78vw) + (var(--tour-cards) - 1) * 1.25rem + 2 *
            clamp(1rem, 4vw, 2.5rem)
        );
        height: calc(100dvh - 56px + max(0px, var(--strip) - 100vw));
        view-timeline: --tour block;
      }

      .tour-stage {
        position: sticky;
        top: 56px;
        height: calc(100dvh - 56px);
        display: flex;
        /* `safe` matters here. Plain `center` on a card taller than the stage
           spills it off both ends equally, and the half above the start edge
           is unreachable however the overflow is handled: scrollHeight does
           not extend backwards. `safe` puts the whole overflow at the end,
           where scrolling can reach it. */
        align-items: safe center;
        /* Sideways is clipped, because the strip is driven rather than
           dragged now and the clip is also what stops a strip several windows
           wide from widening the document.

           Downwards is not, and that is not symmetry for its own sake. At
           200% text on a 390px screen a caption runs about fifteen lines, and
           a card is then 1250px tall against a stage of 788: clipping both
           axes cut 463px of English and 415px of Polish off the bottom of
           every card, silently, at exactly the text size somebody chooses
           because they need it. Nothing is lost this way. At ordinary text
           sizes the card fits and no scrollbar appears at all. */
        overflow-x: clip;
        overflow-y: auto;
        scroll-snap-type: none;
      }

      /* `contain` is the phase where the pin box covers the whole viewport,
         which is exactly the stretch over which the stage is stuck. The
         keyframe is in base.css with the rest of them, and it carries the
         reason this pan exists. */
      .tour-strip {
        animation: pan linear both;
        animation-timeline: --tour;
        animation-range: contain 0% contain 100%;
      }
    }
  }

  .tour-strip {
    display: flex;
    gap: 1.25rem;
    list-style: none;
    margin: 0;
    padding: 0.25rem clamp(1rem, 4vw, 2.5rem) 1.25rem;
    width: max-content;
  }

  .tour-strip li {
    flex: 0 0 min(19rem, 78vw);
    scroll-snap-align: start;
  }

  @media (min-width: 60rem) {
    .tour-strip li:nth-child(odd) {
      margin-top: clamp(0.45rem, 1.3vw, 1rem);
    }

    .tour-strip li:nth-child(3n) {
      margin-top: clamp(-0.4rem, -0.9vw, -0.2rem);
    }
  }

  /* The aspect ratio is declared now and the picture arrives later, so
     ticket 16 changes no layout when it lands. */
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

  /* Ink rather than muted, and the size carries the hierarchy instead of the
     colour. These captions are the one run of text on the page with no scrim
     under them: the strip is full-bleed so that the aura is at full strength
     around the frames, which is the whole point of the exception, and muted
     text measured 4.18 against the blue blob at some points of its drift.
     Scrimming the strip would give back the flat band this section exists to
     break. */
  .tour-strip p {
    color: var(--ink);
    font-size: 0.9375rem;
    margin: 0;
  }

  /* ---- Features -------------------------------------------------------------- */

  /* No cards here, deliberately. Ticket 09 gave features and acquisition the
     same auto-fill grid of bordered tinted boxes, and two near-identical
     grids four sections apart is most of why the page read as a template.
     Acquisition keeps the cards, because a channel is a discrete thing a
     person picks between; a feature is a sentence, and sentences do not need
     boxes drawn round them. */
  .group {
    margin-bottom: 2.75rem;
  }

  .group:last-child {
    margin-bottom: 0;
  }

  /* No text-transform, for the reason the h1 carries the same note: innerText
     reports the transformed casing, and a group name that is also a line of
     shipped copy would come back from the copy tests reworded. It is also
     not set as a small-caps label, because five of those stacked down one
     section is the templated rhythm this ticket is undoing. */
  .group h3 {
    font-size: 1.0625rem;
    font-weight: 600;
    color: var(--ink);
    margin: 0 0 1rem;
  }

  /* Two columns of unequal width, against acquisition's equal auto-fill
     cards. Losing the boxes was most of separating these two sections, but
     both were still laying out on the same even two-up track, back to back,
     in the same body column. An asymmetric pair reads as a column of prose
     with notes beside it rather than as another grid. */
  .entries {
    display: grid;
    grid-template-columns: minmax(0, 1.45fr) minmax(0, 1fr);
    gap: 1.1rem 2.5rem;
  }

  .entries p {
    margin: 0;
    font-size: 0.9375rem;
    color: var(--muted);
    max-width: 42ch;
  }

  /* The lead stays inline: `rest` opens with its own separator, sometimes a
     comma, and a block lead would put a line break where the sentence needs
     none (the copy tests read the paragraph back as one line). With the boxes
     gone, weight and ink are the whole of the emphasis. */
  .entries p strong {
    color: var(--ink);
    font-weight: 600;
  }

  /* A group's intro speaks for the group, not from beside it. */
  .entries p.plain {
    grid-column: 1 / -1;
    max-width: 60ch;
    font-size: 1.0625rem;
    color: var(--ink);
    margin-bottom: 0.4rem;
  }

  /* ---- Acquisition ------------------------------------------------------------- */

  .acquisition-action {
    margin: 0 0 2.5rem;
  }

  .android {
    color: var(--muted);
    max-width: 60ch;
  }

  /* min() around the track floor, because a bare minmax(19rem, 1fr) is a
     promise the grid keeps even when it cannot: at 200% text 19rem is 608px,
     wider than the phone holding it, and the row answers by pushing the whole
     document sideways. The min() lets the column fall back to the width
     actually available while leaving the 19rem intent untouched everywhere
     it fits. */
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

  /* Two tinted cards per grid, so the row is not a wall of one surface. The
     tint tokens are the text-safe pair rather than the aura's: --blob-pink
     under --muted measured 3.34 in dark (ticket 17). */
  .channels li:nth-child(4n + 1) {
    background:
      radial-gradient(140% 120% at 0% 0%, var(--tint-blue), transparent 55%),
      var(--surface);
  }

  .channels li:nth-child(4n + 3) {
    background:
      radial-gradient(140% 120% at 100% 100%, var(--tint-pink), transparent 55%),
      var(--surface);
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

  @media (max-width: 60rem) {
    .standfirst {
      max-width: 60ch;
    }

    .entries {
      grid-template-columns: minmax(0, 1fr);
    }
  }

  @media (max-width: 48rem) {
    .hero {
      min-height: 92dvh;
    }
  }

  /* ---- Ticket 18: warmer editorial composition ------------------------- */

  .hero-inner {
    display: grid;
    grid-template-columns: repeat(12, minmax(0, 1fr));
    align-items: end;
    padding-top: clamp(2.5rem, 9vh, 6rem);
    padding-bottom: clamp(3rem, 9vh, 6rem);
  }

  .hero-inner::after {
    content: '';
    grid-column: 11 / 13;
    grid-row: 1 / 5;
    align-self: stretch;
    width: 1px;
    justify-self: end;
    background: linear-gradient(transparent, var(--pink), var(--blue), transparent);
    opacity: 0.55;
  }

  .hero h1,
  .headline-block,
  .subheadline,
  .hero-actions {
    grid-column: 1 / 11;
  }

  .hero h1 {
    margin-bottom: clamp(2rem, 6vh, 4.5rem);
  }

  .headline-block {
    margin-bottom: clamp(1.5rem, 4vh, 2.5rem);
  }

  .headline {
    max-width: 14ch;
    font-size: clamp(min(2.75rem, 12vw), 7.7vw, 5.6rem);
    font-weight: 580;
    line-height: 0.98;
    letter-spacing: -0.055em;
  }

  .flag-stroke {
    height: 1rem;
    margin-top: 0.6rem;
  }

  .subheadline {
    max-width: 36ch;
    margin-left: min(9vw, 7rem);
    font-size: clamp(1.1rem, 1.8vw, 1.35rem);
  }

  .hero-actions {
    margin-left: min(9vw, 7rem);
  }

  .badge {
    border-radius: 1rem;
    padding: 0.55rem 1rem;
    box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.16);
  }

  .opening,
  .privacy-note,
  .features,
  .acquisition-wrap,
  .support-section {
    width: min(100%, 74rem);
    margin-inline: auto;
    padding-inline: clamp(1rem, 5vw, 4rem);
  }

  .opening {
    display: grid;
    grid-template-columns: minmax(0, 0.8fr) minmax(0, 1.35fr);
    gap: clamp(2rem, 9vw, 8rem);
    align-items: start;
    padding-top: clamp(6rem, 16vh, 11rem);
    padding-bottom: clamp(5rem, 14vh, 9rem);
  }

  .opening-title {
    display: flex;
    align-items: flex-end;
    gap: 1.25rem;
    min-width: 0;
  }

  .opening-title h2 {
    min-width: 0;
    overflow-wrap: anywhere;
  }

  .opening h2,
  .privacy-note h2,
  .features h2,
  .acquisition h2,
  .support-section h2 {
    font-size: clamp(2rem, 4.8vw, 4.25rem);
    font-weight: 560;
    line-height: 0.98;
    letter-spacing: -0.045em;
  }

  .section-mark {
    flex: 1;
    min-width: 1rem;
    height: 0.35rem;
    margin-bottom: 0.35rem;
    border-radius: 999px;
    background: linear-gradient(90deg, var(--pink), var(--blue));
  }

  .opening-copy {
    padding-top: clamp(1rem, 5vw, 4rem);
  }

  .opening-copy :global(p) {
    max-width: 49ch;
  }

  .opening-lede :global(p) {
    color: var(--ink);
    font-size: clamp(1.2rem, 2.2vw, 1.7rem);
    line-height: 1.45;
    letter-spacing: -0.018em;
    margin-bottom: 2rem;
  }

  .privacy-note {
    display: grid;
    grid-template-columns: minmax(0, 1.25fr) minmax(15rem, 0.75fr);
    gap: clamp(2rem, 8vw, 7rem);
    align-items: end;
    padding-top: clamp(4rem, 10vh, 7rem);
    padding-bottom: clamp(6rem, 16vh, 11rem);
  }

  .privacy-title {
    padding: clamp(2rem, 6vw, 5rem);
    border-radius: 2rem 2rem 2rem 0.35rem;
    background:
      radial-gradient(90% 120% at 100% 0%, var(--tint-pink), transparent 65%),
      var(--surface);
    border: 1px solid var(--line);
    box-shadow: 0 2rem 6rem color-mix(in srgb, var(--glow) 55%, transparent);
  }

  .privacy-title .standfirst {
    max-width: 46ch;
    margin-top: 2rem;
    color: var(--ink);
  }

  .privacy-answer {
    padding-bottom: 1.5rem;
  }

  .privacy-answer :global(p) {
    color: var(--muted);
  }

  .privacy-answer .more-line {
    margin-top: 1.75rem;
  }

  .more {
    border-bottom-color: var(--pink);
  }

  .tour {
    padding-top: clamp(5rem, 14vh, 10rem);
  }

  .tour-head {
    max-width: 74rem;
    margin-bottom: clamp(2.5rem, 7vh, 5rem);
    padding-inline: clamp(1rem, 5vw, 4rem);
  }

  .tour-head h2 {
    max-width: 10ch;
    font-size: clamp(2.5rem, 7vw, 6rem);
    font-weight: 560;
    line-height: 0.94;
    letter-spacing: -0.055em;
  }

  .tour-intro {
    margin-top: 1.5rem;
    margin-left: min(16vw, 12rem);
  }

  .tour-strip {
    gap: clamp(1rem, 2vw, 2rem);
    padding-inline: clamp(1rem, 5vw, 4rem);
  }

  .tour-strip li {
    flex-basis: min(22rem, 82vw);
  }

  .slot {
    border-radius: 2rem 2rem 0.6rem 2rem;
    border-color: color-mix(in srgb, var(--line) 65%, var(--pink));
    box-shadow: 0 1.4rem 4rem color-mix(in srgb, var(--glow) 45%, transparent);
  }

  .tour-strip li:nth-child(even) .slot {
    border-radius: 2rem 2rem 2rem 0.6rem;
  }

  .features {
    display: grid;
    grid-template-columns: minmax(12rem, 0.65fr) minmax(0, 1.35fr);
    gap: clamp(2rem, 8vw, 7rem);
    align-items: start;
    padding-top: clamp(7rem, 18vh, 13rem);
    padding-bottom: clamp(7rem, 18vh, 13rem);
  }

  .features-head {
    position: sticky;
    top: calc(56px + 2rem);
  }

  .features-head .section-mark {
    display: block;
    width: min(9rem, 70%);
    margin-top: 1.5rem;
  }

  .feature-groups {
    display: grid;
    gap: clamp(3rem, 9vh, 6rem);
  }

  .group {
    margin: 0;
    padding-top: 1.5rem;
    border-top: 1px solid var(--line);
  }

  .group:nth-child(even) {
    margin-left: clamp(0rem, 7vw, 5rem);
  }

  .group h3 {
    max-width: 18ch;
    margin-bottom: 1.75rem;
    font-size: clamp(1.35rem, 2.5vw, 2rem);
    font-weight: 560;
    letter-spacing: -0.025em;
  }

  .entries {
    grid-template-columns: minmax(0, 1fr) minmax(0, 0.82fr);
    gap: 1.4rem clamp(1.5rem, 4vw, 3.5rem);
  }

  .entries p {
    max-width: 44ch;
    font-size: 0.96rem;
  }

  .entries p.plain {
    max-width: 56ch;
    padding: 1.25rem 1.5rem;
    border-radius: 1rem 1rem 1rem 0.25rem;
    background: var(--tint-pink);
  }

  .acquisition-wrap {
    padding-top: clamp(5rem, 13vh, 9rem);
    padding-bottom: clamp(5rem, 13vh, 9rem);
  }

  .acquisition {
    display: grid;
    grid-template-columns: repeat(12, minmax(0, 1fr));
    gap: 1.5rem;
    padding: clamp(2rem, 6vw, 5rem);
    border-radius: 2.5rem 2.5rem 0.75rem 2.5rem;
    background:
      radial-gradient(90% 120% at 0% 0%, var(--tint-pink), transparent 58%),
      radial-gradient(75% 90% at 100% 100%, var(--tint-blue), transparent 58%),
      var(--surface);
    border: 1px solid var(--line);
  }

  .acquisition-head {
    grid-column: 1 / 8;
  }

  .acquisition-head p {
    max-width: 40ch;
    margin-top: 1.5rem;
  }

  .acquisition-action {
    grid-column: 9 / 13;
    align-self: start;
    justify-self: end;
  }

  .android,
  .channels {
    grid-column: 1 / -1;
  }

  .android {
    margin-top: clamp(2rem, 6vh, 4rem);
  }

  .channels {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 0;
    border-top: 1px solid var(--line);
  }

  .channels li,
  .channels li:nth-child(4n + 1),
  .channels li:nth-child(4n + 3) {
    min-height: 10rem;
    padding: 1.5rem;
    border: 0;
    border-bottom: 1px solid var(--line);
    border-radius: 0;
    background: transparent;
  }

  .channels li:nth-child(odd) {
    border-right: 1px solid var(--line);
  }

  .support-section {
    display: grid;
    grid-template-columns: minmax(0, 0.65fr) minmax(0, 1.35fr);
    gap: clamp(2rem, 8vw, 7rem);
    padding-top: clamp(6rem, 16vh, 11rem);
    padding-bottom: clamp(7rem, 18vh, 13rem);
  }

  .support-title h2 {
    color: var(--grad-b);
  }

  .support :global(p) {
    max-width: 48ch;
    font-size: clamp(1.1rem, 1.8vw, 1.35rem);
  }

  .support :global(p:last-child) {
    margin-top: 2.5rem;
    padding: 1.5rem 0 1.5rem 2rem;
    border-left-width: 0.45rem;
    border-image: linear-gradient(var(--pink), var(--blue)) 1;
  }

  @media (max-width: 60rem) {
    .opening,
    .privacy-note,
    .features,
    .support-section {
      grid-template-columns: minmax(0, 1fr);
    }

    .opening-copy,
    .privacy-answer {
      padding-top: 0;
    }

    .features-head {
      position: static;
    }

    .group:nth-child(even) {
      margin-left: 0;
    }

    .acquisition-head {
      grid-column: 1 / 10;
    }

    .acquisition-action {
      grid-column: 10 / 13;
    }
  }

  @media (max-width: 48rem) {
    .hero-inner::after {
      grid-column: 12;
    }

    .hero h1,
    .headline-block,
    .subheadline,
    .hero-actions {
      grid-column: 1 / 12;
    }

    .subheadline,
    .hero-actions,
    .tour-intro {
      margin-left: 0;
    }

    .opening {
      padding-top: 5rem;
      padding-bottom: 4rem;
    }

    .privacy-note,
    .features,
    .support-section {
      padding-top: 4rem;
      padding-bottom: 5rem;
    }

    .privacy-title,
    .acquisition {
      border-radius: 1.5rem 1.5rem 0.4rem 1.5rem;
    }

    .entries,
    .channels {
      grid-template-columns: minmax(0, 1fr);
    }

    .channels li:nth-child(odd) {
      border-right: 0;
    }

    .acquisition {
      display: block;
    }

    .acquisition-action {
      margin: 1.5rem 0 0;
    }

    .android {
      margin-top: 3rem;
    }
  }
</style>
