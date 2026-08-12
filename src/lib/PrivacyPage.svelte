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
  <h1>{privacy.title}</h1>
  <p>{privacy.intro}</p>

  {#each privacy.sections as section (section.heading)}
    <section>
      <h2>{section.heading}</h2>
      <Prose paragraphs={section.paragraphs} />
    </section>
  {/each}
</PageShell>
