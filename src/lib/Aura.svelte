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

    const pointerEvent = 'gd-hero-pointer';
    const pointer = { x: 0, y: 0, targetX: 0, targetY: 0 };
    const blobs = [
      {
        x: 0.8,
        y: 0.18,
        r: 0.38,
        colorToken: '--blob-pink',
        swayX: 0.022,
        swayY: 0.018,
      },
      {
        x: 0.18,
        y: 0.84,
        r: 0.36,
        colorToken: '--blob-blue',
        swayX: 0.018,
        swayY: 0.021,
      },
      {
        x: 0.62,
        y: 0.46,
        r: 0.24,
        colorToken: '--blob-white',
        swayX: 0.016,
        swayY: 0.014,
      },
    ];

    let cssWidth = 1;
    let cssHeight = 1;
    let raf = 0;
    let t = 0;
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

    const onPointer = (event: Event) => {
      const detail = (event as CustomEvent<{ x: number; y: number; active: boolean }>).detail;
      pointer.targetX = detail?.active ? detail.x : 0;
      pointer.targetY = detail?.active ? detail.y : 0;
    };

    const drawBlob = (
      blob: (typeof blobs)[number],
      phase: number,
      shiftX: number,
      shiftY: number,
      palette: CSSStyleDeclaration,
    ) => {
      const cx = (blob.x + Math.sin(phase * 0.8) * blob.swayX + shiftX) * cssWidth;
      const cy = (blob.y + Math.cos(phase * 0.75) * blob.swayY + shiftY) * cssHeight;
      const radius = blob.r * Math.min(cssWidth, cssHeight);
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

    const frame = () => {
      raf = requestAnimationFrame(frame);
      t += 0.0042;
      pointer.x += (pointer.targetX - pointer.x) * 0.055;
      pointer.y += (pointer.targetY - pointer.y) * 0.055;

      context.clearRect(0, 0, cssWidth, cssHeight);
      drawBlob(blobs[0], t, pointer.x * 0.03, pointer.y * 0.02, palette);
      drawBlob(blobs[1], t + 1.8, pointer.x * 0.018, pointer.y * 0.028, palette);
      drawBlob(blobs[2], t + 3.4, pointer.x * 0.014, pointer.y * 0.016, palette);
    };

    const themeObserver = new MutationObserver(refreshPalette);
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme'],
    });

    refreshPalette();
    resize();
    window.addEventListener('resize', resize, { passive: true });
    window.addEventListener(pointerEvent, onPointer as EventListener);
    canvasActive = true;
    frame();

    return () => {
      canvasActive = false;
      cancelAnimationFrame(raf);
      themeObserver.disconnect();
      window.removeEventListener('resize', resize);
      window.removeEventListener(pointerEvent, onPointer as EventListener);
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

  /* Both gutters carry colour now that the layer is the whole viewport rather
     than the hero: blue off the top right, pink off the bottom left, and the
     theme's neutral between them. The hero still meets blue first, on the side
     its text does not use. */
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
