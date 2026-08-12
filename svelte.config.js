import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import { GATEWAY_REDIRECT } from './src/lib/gateway-redirect.ts';

/* The two inline scripts this repository writes: the theme stamp in
   src/app.html and the gateway's language redirect. Both have to run before
   anything paints, so neither can become a file of its own, and a hash is
   what lets the policy stay closed to everything else. SvelteKit hashes the
   scripts it injects itself, which differ per page.

   Hashed from the source each page ships rather than pasted in as constants.
   A stale hash does not fail a build; it produces a page whose own script is
   blocked, which reads as a wrong-theme flash or a gateway that stopped
   redirecting. An inline script written anywhere else has to be listed here
   too, and tests/policy.test.mjs is what says so. */
const appScripts = [
  ...readFileSync(new URL('./src/app.html', import.meta.url), 'utf8').matchAll(
    /<script>([\s\S]*?)<\/script>/g,
  ),
].map(([, body]) => body);

const inlineScriptHashes = [...appScripts, GATEWAY_REDIRECT].map(
  (body) => `sha256-${createHash('sha256').update(body).digest('base64')}`,
);

/** @type {import('@sveltejs/kit').Config} */
const config = {
  preprocess: vitePreprocess(),
  kit: {
    // Every page is prerendered to a file, so the site is readable before any
    // script runs and lh.pl only ever serves static files (ticket 02).
    adapter: adapter(),

    /* Ticket 11. lh.pl is managed hosting: an .htaccess is a request, not a
       guarantee, and a policy that only exists in a config file the platform
       may ignore is no policy. A meta element is carried by the page itself,
       so this half holds on any host that serves the file at all.
       static/.htaccess adds the two things a meta element cannot express.

       `none` by default, then back what the site actually loads: its own
       stylesheet, its own font, its own scripts. There is no img-src because
       there is no image yet; a page that grows one gets a build with no
       picture on it and a console message naming the directive.

       style-src-attr is the exception, and it is not one this site chose:
       ticket 09's staggered entrance carries `--enter` as a style attribute
       on prerendered markup, which style-src alone would drop. An attribute
       cannot execute anything, so the loosening is bounded. */
    csp: {
      mode: 'hash',
      directives: {
        'default-src': ['none'],
        'script-src': ['self', ...inlineScriptHashes],
        'style-src': ['self'],
        'style-src-attr': ['unsafe-inline'],
        'font-src': ['self'],
        'connect-src': ['self'],
        'base-uri': ['none'],
        'form-action': ['none'],
      },
    },
  },
};

export default config;
