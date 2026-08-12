import { createHash } from 'node:crypto';
import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import { GATEWAY_REDIRECT } from './src/lib/gateway-redirect.ts';

/* The gateway's language redirect: an inline script this repository writes,
   which the policy has to allow by name or the site stops sending anyone
   anywhere. SvelteKit hashes the scripts it injects itself, and those differ
   per page. The theme stamp is not here because it is not governed - it sits
   above the policy in src/app.html, for the reason given there.

   Hashed from the source the page ships rather than pasted in as a constant.
   A stale hash does not fail a build; it produces a gateway whose own script
   is blocked, which looks like a page that quietly stopped redirecting. */
const inlineScriptHashes = [GATEWAY_REDIRECT].map(
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
       stylesheet, its own font, its own scripts, and its own social card
       (ticket 07). Every one of them is `self` and there is no second origin
       in the whole policy, which is the shape the spec asks for: the site
       loads no third-party resource until a person follows a link out of it.

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
        'img-src': ['self'],
        'font-src': ['self'],
        'connect-src': ['self'],
        'base-uri': ['none'],
        'form-action': ['none'],
      },
    },
  },
};

export default config;
