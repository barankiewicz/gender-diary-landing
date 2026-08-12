<script lang="ts">
  /* The site's ground, not the hero's ornament (ticket 17). Ticket 09 built
     this inside `.hero`, which was `overflow: clip` with a viewport-height
     floor, so the glow ended at a hard horizontal line the moment a reader
     scrolled. It is fixed to the viewport here instead, which is what gives it
     no edge at any scroll position: there is nothing to scroll past.

     The privacy page runs the same layer at `quiet`, so the two pages are one
     place - one set of tokens, one set of blobs, two intensities - and the
     page a person opens while deciding whether to trust the app stays the
     quiet reading column it was. */
  let { strength = 'full' }: { strength?: 'full' | 'quiet' } = $props();
</script>

<div class="aura" class:quiet={strength === 'quiet'} aria-hidden="true">
  <div class="blob blob-a"></div>
  <div class="blob blob-b"></div>
  <div class="blob blob-c"></div>
</div>

<style>
  /* Behind everything, including the scrims that sit under text blocks: those
     are at -1 inside sections that isolate themselves, so the two layers can
     never reorder. `clip` keeps a blob hanging off the edge from widening the
     document, which the 390px overflow tests would otherwise catch. */
  .aura {
    position: fixed;
    inset: 0;
    z-index: -2;
    overflow: clip;
    pointer-events: none;
  }

  .quiet {
    opacity: 0.5;
  }

  .blob {
    position: absolute;
    border-radius: 50%;
    filter: blur(70px);
    will-change: transform;
  }

  /* Both gutters carry colour now that the layer is the whole viewport rather
     than the hero: blue off the top right, pink off the bottom left, and the
     theme's neutral between them. The hero still meets blue first, on the side
     its text does not use. */
  .blob-a {
    width: 55vw;
    height: 55vw;
    right: -12vw;
    top: -18vw;
    background: radial-gradient(circle, var(--blob-blue), transparent 65%);
  }

  .blob-b {
    width: 52vw;
    height: 52vw;
    left: -16vw;
    bottom: -20vw;
    background: radial-gradient(circle, var(--blob-pink), transparent 65%);
  }

  .blob-c {
    width: 30vw;
    height: 30vw;
    right: 10vw;
    top: 30%;
    background: radial-gradient(circle, var(--blob-white), transparent 60%);
  }

  /* Hierarchy: a still gradient reads as a picture someone placed behind the
     words, and a reader starts looking at it. A moving one reads as the
     surface the page is on, which is what keeps it underneath the text rather
     than competing with it. The one thing on the site that loops.

     The keyframes live in base.css behind the same media query, which is the
     gate for everything that moves here. With reduced motion the blobs still
     paint, parked where their drift would start. */
  @media (prefers-reduced-motion: no-preference) {
    .blob-a {
      animation: drift-a 19s ease-in-out infinite;
    }

    .blob-b {
      animation: drift-b 23s ease-in-out infinite;
    }

    .blob-c {
      animation: drift-c 27s ease-in-out infinite;
    }
  }
</style>
