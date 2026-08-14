import en from '../../messages/en.json' with { type: 'json' };
import pl from '../../messages/pl.json' with { type: 'json' };

/** Where the site is served from. Alicja created this subdomain on the lh.pl
    account on 2026-08-12 and it is what ticket 11 deploys to, so it is a real
    address rather than the placeholder it started as - but still a working
    identity, not a launch decision. Ticket 12 is where a chosen name lands,
    and it weighs what a domain says about its reader in a browser history.

    The canonical link, both alternates, `x-default`, the sitemap and the
    robots policy are all derived from this, so it changes here once. The copy
    in tests/site.test.mjs is deliberate and changes with it. */
export const SITE_ORIGIN = 'https://gender-diary.barankiewicz.dev';

/** The production Journal, which has an origin of its own and shares nothing
    with this one (ADR-0019 in the Journal repository). Provisional in the same
    way as the origin above, and settled by that repository's ticket 01.

    The trailing slash is deliberate and the whole URL is the point: Start
    journal is a plain link to this and nothing else. No campaign parameter, no
    referral identifier, and none of this site's language or theme state. The
    browser tests assert it character for character, so changing it is a
    deliberate edit here as well as in tests/site.test.mjs. */
  export const JOURNAL_URL = 'https://app.gender-diary.barankiewicz.dev/';

export const LOCALES = ['en', 'pl'] as const;
export type Locale = (typeof LOCALES)[number];

/** The locale a visitor gets when their browser asks for neither of ours. */
export const FALLBACK_LOCALE: Locale = 'en';

/** Where a language choice is remembered. This origin only: nothing here is
    readable from the Journal, and nothing here reads Journal state. */
export const LANGUAGE_KEY = 'gd-landing-language';

/* Not annotated, so that the two files having different keys is a type error
   rather than a missing string on the Polish page. */
export const messages = { en, pl };

export function isLocale(value: unknown): value is Locale {
  return LOCALES.includes(value as Locale);
}

/** The pages that exist in both languages. Each one is a location a person can
    be sent to and a search engine can index, which is why the language control
    switches page-for-page rather than dropping a reader who is halfway through
    the privacy page back onto the landing page in their other language.

    A union rather than a `LOCALES`-style array, because nothing iterates the
    pages: routes are files on disk and the sitemap is generated from the built
    directory. */
export type Page = 'landing' | 'privacy';

/** Trailing slash, so the managed host serves `<locale>/index.html` and the URL
    a person copies is the one the alternates and the canonical link name.

    Root-relative rather than run through `resolve()` from `$app/paths`: that
    exists to prefix a configured base path, and this site is served from the
    root of an origin it has to itself. */
export function pathFor(locale: Locale, page: Page = 'landing'): string {
  return page === 'landing' ? `/${locale}/` : `/${locale}/${page}/`;
}

/** What `x-default` names for a page.

    The landing page has `/`, which asks the browser what it reads and sends it
    on. No other page has an equivalent, and building one would mean a second
    copy of that redirect for every page the site grows. `x-default` is the
    version served when none of the alternates match, so for those pages it is
    the fallback locale's, which is what a visitor asking for neither language
    would get anyway. */
export function defaultPathFor(page: Page): string {
  return page === 'landing' ? '/' : pathFor(FALLBACK_LOCALE, page);
}

/** The picture a link preview shows, one file for every page and both
    languages, served from this origin like every other asset here.

    It carries the wordmark over the site's own aurora, and no words beyond
    the name. A preview is the one surface somebody did not choose to look at:
    it turns up in a group chat, on a timeline, next to a message in a
    notification, and a card that spelled out what the app is for would say it
    to whoever is looking at that screen (spec story 37). What the app is goes
    in `og:description`, which is the part a person who shares the link is
    choosing to send. That is spec story 31 partly traded for story 37, and it
    is written up on the ticket rather than settled quietly here.

    `scripts/social-card.mjs` renders the file and the PNG is committed, so a
    build needs no browser and the picture cannot change without somebody
    looking at it. The dimensions below are the ones the file actually has,
    and a test reads them back out of it. */
export const SOCIAL_CARD = { path: '/social-card.png', width: 1200, height: 630 } as const;

/** `og:locale` wants a language and a region, unlike `hreflang`, which is
    happy with a language. British English, because that is what the copy is
    written in ("colour", "Coloured by mood"). */
const OG_LOCALES: Record<Locale, string> = { en: 'en_GB', pl: 'pl_PL' };

/** The other language, for `og:locale:alternate`. A map rather than a search
    through `LOCALES`, which would need a fallback for a case two languages
    cannot produce. A third language is then a type error here, which is the
    right place to notice that the tag can carry more than one value. */
const OTHER_LOCALE: Record<Locale, Locale> = { en: 'pl', pl: 'en' };

/** The Open Graph tags a page's head carries, as property and content in the
    order they are written.

    The URL is passed in rather than derived, because the language gateway at
    `/` needs a card too and it is not one of the pages `pathFor` knows: it is
    the URL somebody copies out of the address bar before they have picked a
    language, so it is the one most likely to be pasted somewhere. */
export function socialTags(preview: {
  locale: Locale;
  url: string;
  title: string;
  description: string;
}): Record<string, string> {
  return {
    'og:type': 'website',
    'og:site_name': messages[preview.locale].pageTitle,
    'og:title': preview.title,
    'og:description': preview.description,
    'og:url': preview.url,
    'og:locale': OG_LOCALES[preview.locale],
    'og:locale:alternate': OG_LOCALES[OTHER_LOCALE[preview.locale]],
    'og:image': SITE_ORIGIN + SOCIAL_CARD.path,
    'og:image:width': String(SOCIAL_CARD.width),
    'og:image:height': String(SOCIAL_CARD.height),
    'og:image:alt': messages[preview.locale].meta.cardAlt,
  };
}

/** What the landing page says about the app, as the JSON-LD block that page's
    head carries.

    Every property is a claim the page makes in words a visitor can read,
    which is the whole rule for this block. There are five of them, and what
    is missing is the point. The vocabulary offers a rating, an offer, a
    review count and an aggregate of the three, and this project has none of
    them, so a listing that showed stars would be an invention in the format
    most likely to be believed. Refusing the offer costs the
    software-application rich result, which needs a price.

    `WebApplication` rather than the wider `SoftwareApplication`, because the
    page says the app runs in a browser and says there is no Android app yet.
    For the same reason there is no `operatingSystem`: "any" would be a claim
    about a platform the site is careful not to mention. There is no
    `applicationCategory` either, recommended though it is, because the page
    never puts the app in a category and this block says only what the page
    says. `url` is the Journal, since that is where the application is; this
    page is where it is described. Nobody is named as an author or a
    publisher, which is the site's rule about its own author rather than an
    oversight. No screenshot, until ticket 15 captures the tour from invented
    data.

    It reaches the page through `{@html}` because Svelte compiles a `<script>`
    written in markup as the component's own script, which is why the language
    gateway builds its redirect as a string too. The escape is what makes that
    safe: nothing here comes from a visitor, but a `<` reaching the document
    as itself is how a string ends a script block early, so none does. The
    indentation stays, because this site's argument is that a reader can check
    it, and somebody checking reads this in view-source. */
export function structuredDataScript(locale: Locale): string {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: messages[locale].pageTitle,
    url: JOURNAL_URL,
    description: messages[locale].meta.landing.description,
    inLanguage: [...LOCALES],
  };
  const json = JSON.stringify(data, null, 2).replace(/</g, '\\u003c');
  return `<script type="application/ld+json">${json}</script>`;
}

/** A paragraph as the catalogue stores it. A plain string is a paragraph with
    nothing marked in it. The pair is a paragraph that opens with a bold lead,
    and `rest` carries its own separator verbatim: a space after `Entries.`, a
    comma after `If you forget the PIN`, a colon after `Osiem palet`. Splitting
    the separator out instead would put the renderer in charge of punctuation
    the copy already decided. */
export type Paragraph = string | { lead: string; rest: string };
