import type { Handle } from '@sveltejs/kit';
import { FALLBACK_LOCALE, isLocale } from '$lib/site';

/* Runs while prerendering, not in production - the built site is files on a
   static host. It writes the page's language into the `<html lang>` of the
   file being generated, so the prerendered markup carries it and no script is
   needed to correct it afterwards. */
export const handle: Handle = ({ event, resolve }) => {
  const subtag = event.url.pathname.split('/')[1];
  const lang = isLocale(subtag) ? subtag : FALLBACK_LOCALE;

  return resolve(event, {
    transformPageChunk: ({ html }) => html.replace('%lang%', lang),
  });
};
