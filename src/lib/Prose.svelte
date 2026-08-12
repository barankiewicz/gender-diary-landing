<script lang="ts">
  import type { Paragraph } from '$lib/site';

  /* `reveal` opts the paragraphs into ticket 17's per-item scroll reveal and
     stamps each one with its position, which is what staggers them. It is a
     prop rather than a rule in a stylesheet because the reveal has to be a
     class the IntersectionObserver fallback in $lib/reveal.ts can find. */
  let { paragraphs, reveal = false }: { paragraphs: readonly Paragraph[]; reveal?: boolean } =
    $props();
</script>

<!-- `rest` starts with its own separator, so nothing goes between the two
     halves here. A space added on this line would show up as "Eight palettes ,
     including" on the page and as a reworded sentence in the copy tests. -->
{#each paragraphs as paragraph, index (index)}
  {#if typeof paragraph === 'string'}
    <p class:reveal style:--reveal={index}>{paragraph}</p>
  {:else}
    <p class:reveal style:--reveal={index}><strong>{paragraph.lead}</strong>{paragraph.rest}</p>
  {/if}
{/each}
