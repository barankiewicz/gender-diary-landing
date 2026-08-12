<script lang="ts">
  import type { Paragraph } from '$lib/site';

  let { paragraphs }: { paragraphs: readonly Paragraph[] } = $props();
</script>

<!-- `rest` starts with its own separator, so nothing goes between the two
     halves here. A space added on this line would show up as "Eight palettes ,
     including" on the page and as a reworded sentence in the copy tests. -->
{#each paragraphs as paragraph, index (index)}
  {#if typeof paragraph === 'string'}
    <p>{paragraph}</p>
  {:else}
    <p><strong>{paragraph.lead}</strong>{paragraph.rest}</p>
  {/if}
{/each}
