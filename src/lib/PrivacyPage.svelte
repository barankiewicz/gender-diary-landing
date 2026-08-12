<script lang="ts">
  import PageShell from '$lib/PageShell.svelte';
  import Prose from '$lib/Prose.svelte';
  import { messages, type Locale } from '$lib/site';

  let { locale }: { locale: Locale } = $props();

  const privacy = $derived(messages[locale].privacyPage);
</script>

<!-- What is missing from this page is the point of it. The encryption-at-rest
     block in `content/*/privacy.md` is gated on Journal ticket 09 and its
     claim-gate test, so the section below carries the fallback wording those
     files wrote for exactly this case: the journal is not encrypted where it
     is stored, yet. Swapping the two is a copy ticket's job once the gate
     passes, and tests/site.test.mjs fails if the gated block turns up here
     first. -->
<PageShell {locale} page="privacy" title={privacy.title}>
  <article class="scrim">
    <h1>{privacy.title}</h1>
    <p class="intro">{privacy.intro}</p>

    <!-- Per paragraph rather than per section (ticket 17). A section here can
         be 600px tall, and 600px of page sliding 24px as it goes by is motion
         nobody can see; the paragraphs arriving one after another is the same
         idea at a size that reads. -->
    {#each privacy.sections as section (section.heading)}
      <section>
        <h2 class="reveal">{section.heading}</h2>
        <Prose paragraphs={section.paragraphs} reveal />
      </section>
    {/each}
  </article>
</PageShell>

<style>
  /* The page a reader opens while deciding whether to trust the app with
     their journal. It stays a quiet reading column: the direction's colour
     shows up only as the rule a heading hangs from. */
  article {
    max-width: 44rem;
    margin: 0 auto;
    padding: clamp(2.5rem, 7vh, 5rem) clamp(1rem, 4vw, 2.5rem) clamp(4rem, 10vh, 7rem);
  }

  h1 {
    font-size: clamp(1.9rem, 4.5vw, 3rem);
    font-weight: 600;
    margin: 0 0 1.5rem;
  }

  .intro {
    font-size: clamp(1.1rem, 2vw, 1.3rem);
    color: var(--muted);
    margin-bottom: 3rem;
  }

  section {
    margin-bottom: 3rem;
  }

  section:last-child {
    margin-bottom: 0;
  }

  h2 {
    font-size: clamp(1.3rem, 2.5vw, 1.7rem);
    font-weight: 600;
    border-left: 3px solid var(--pink);
    padding-left: 1rem;
    margin: 0 0 1.25rem;
  }

  section:nth-child(even) h2 {
    border-color: var(--blue);
  }
</style>
