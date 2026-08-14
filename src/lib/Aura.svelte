<script lang="ts">
  import { onMount } from 'svelte';

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

  let canvas = $state<HTMLCanvasElement | null>(null);
  let canvasActive = $state(false);

  onMount(() => {
    if (strength !== 'full' || !canvas) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const context = canvas.getContext('2d');
    if (!context) return;

    const blobs = [
      {
        x: 0.8,
        y: 0.18,
        r: 0.38,
        colorToken: '--blob-pink',
        swayX: 0.07,
        swayY: 0.045,
        speed: 0.8,
        phaseOffset: 0,
      },
      {
        x: 0.18,
        y: 0.84,
        r: 0.36,
        colorToken: '--blob-blue',
        swayX: 0.055,
        swayY: 0.065,
        speed: 0.65,
        phaseOffset: 7,
      },
      {
        x: 0.62,
        y: 0.46,
        r: 0.24,
        colorToken: '--blob-white',
        swayX: 0.045,
        swayY: 0.04,
        speed: 0.55,
        phaseOffset: 13,
      },
    ];

    let cssWidth = 1;
    let cssHeight = 1;
    let raf = 0;
    let palette = getComputedStyle(document.documentElement);

    const refreshPalette = () => {
      palette = getComputedStyle(document.documentElement);
    };

    const resize = () => {
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      cssWidth = Math.max(1, rect.width);
      cssHeight = Math.max(1, rect.height);
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.max(1, Math.round(cssWidth * dpr));
      canvas.height = Math.max(1, Math.round(cssHeight * dpr));
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
      context.filter = 'blur(30px)';
      context.globalCompositeOperation = 'screen';
    };

    const drawBlob = (
      blob: (typeof blobs)[number],
      phase: number,
      palette: CSSStyleDeclaration,
    ) => {
      const cx = (blob.x + Math.sin(phase * blob.speed) * blob.swayX) * cssWidth;
      const cy = (blob.y + Math.cos(phase * blob.speed * 0.73) * blob.swayY) * cssHeight;
      const pulse = 1 + Math.sin(phase * blob.speed * 0.61) * 0.055;
      const radius = blob.r * pulse * Math.min(cssWidth, cssHeight);
      const gradient = context.createRadialGradient(cx, cy, radius * 0.16, cx, cy, radius);
      const color =
        palette.getPropertyValue(blob.colorToken).trim() || 'rgba(255, 255, 255, 0.2)';

      gradient.addColorStop(0, color);
      gradient.addColorStop(1, 'transparent');

      context.beginPath();
      context.fillStyle = gradient;
      context.arc(cx, cy, radius, 0, Math.PI * 2);
      context.fill();
    };

    const frame = (now: number) => {
      const phase = now / 1000;
      context.clearRect(0, 0, cssWidth, cssHeight);
      for (const blob of blobs) drawBlob(blob, phase + blob.phaseOffset, palette);
      raf = requestAnimationFrame(frame);
    };

    const themeObserver = new MutationObserver(refreshPalette);
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme'],
    });

    refreshPalette();
    resize();
    window.addEventListener('resize', resize, { passive: true });
    canvasActive = true;
    raf = requestAnimationFrame(frame);

    return () => {
      canvasActive = false;
      cancelAnimationFrame(raf);
      themeObserver.disconnect();
      window.removeEventListener('resize', resize);
    };
  });
</script>

<div class="aura" class:quiet={strength === 'quiet'} class:full-canvas={canvasActive} aria-hidden="true">
  {#if strength === 'full'}
    <canvas class="aura-canvas" width="1600" height="900" bind:this={canvas}></canvas>
  {/if}
  <div class="blob blob-a"></div>
  <div class="blob blob-b"></div>
  <div class="blob blob-c"></div>
</div>

<style>
  /* Behind everything, including the scrims that sit under text blocks: those
     are at -1 inside sections that isolate themselves, so the two layers can
     never reorder. This layer has to be its own paint containment as well as
     clipped: some Chromium builds still count a fixed child's blurred overflow
     in document scroll metrics otherwise, which is how the 390px overflow
     check saw the parked blobs rather than the page. */
  .aura {
    position: fixed;
    inset: 0;
    z-index: -2;
    overflow: clip;
    clip-path: inset(0);
    contain: paint;
    pointer-events: none;
  }

  .quiet {
    opacity: 0.5;
  }

  .aura-canvas {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
  }

  .full-canvas .blob {
    opacity: 0;
  }

  .blob {
    position: absolute;
    border-radius: 50%;
    filter: blur(70px);
    will-change: transform;
  }

  /* Hierarchy: a still gradient reads as a picture someone placed behind the
     words, and a reader starts looking at it. A moving one reads as the
     surface the page is on, which is what keeps it underneath the text rather
     than competing with it. The one thing on the site that loops.

     The keyframes live in base.css behind the same media query, which is the
     gate for everything that moves here. With reduced motion the blobs still
     paint, parked where their drift would start. */
  
  /* Both gutters carry colour now that the layer is the whole viewport rather
     than the hero: pink leads at the top right, blue trails at the bottom
     left, and the theme's neutral sits between them. */
  .blob-a {
    width: 55vw;
    height: 55vw;
    right: -12vw;
    top: -18vw;
    background: radial-gradient(circle, var(--blob-pink), transparent 65%);
  }

  .blob-b {
    width: 52vw;
    height: 52vw;
    left: -16vw;
    bottom: -20vw;
    background: radial-gradient(circle, var(--blob-blue), transparent 65%);
  }

  .blob-c {
    width: 30vw;
    height: 30vw;
    right: 10vw;
    top: 30%;
    background: radial-gradient(circle, var(--blob-white), transparent 60%);
  }

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
