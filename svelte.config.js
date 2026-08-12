import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  preprocess: vitePreprocess(),
  kit: {
    // Every page is prerendered to a file, so the site is readable before any
    // script runs and lh.pl only ever serves static files (ticket 02).
    adapter: adapter(),
  },
};

export default config;
