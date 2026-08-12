/** The gateway's redirect, as the text that goes inside its script element.

    It sends a visitor to the language they last read here, otherwise to the
    one their browser asks for, otherwise to English. It runs in the head of a
    prerendered file, before anything paints, so nobody watches `/` briefly
    appear on their way through it.

    A literal, with nothing interpolated into it, which is what makes it safe
    to hand to `{@html}` and what makes its hash worth computing. The cost is
    that the storage key and the locale list are written out a second time
    below; src/lib/site.ts owns both, and they have to change together.

    A module of its own rather than a string inside the page, because the
    production policy allows this script by its hash (ticket 11, and
    svelte.config.js computes it). Page and policy read the same characters, so
    editing the script cannot leave the gateway blocked by its own policy -
    which would look like a page that simply stops redirecting. */
export const GATEWAY_REDIRECT = `
    try {
      var stored = localStorage.getItem('gd-landing-language');
      var wanted = stored === 'en' || stored === 'pl' ? stored : '';
      var asked = navigator.languages && navigator.languages.length
        ? navigator.languages
        : [navigator.language || ''];
      for (var i = 0; i < asked.length && !wanted; i++) {
        var subtag = String(asked[i]).toLowerCase().split('-')[0];
        if (subtag === 'en' || subtag === 'pl') wanted = subtag;
      }
      location.replace('/' + (wanted || 'en') + '/');
    } catch (e) {
      location.replace('/en/');
    }
  `;
