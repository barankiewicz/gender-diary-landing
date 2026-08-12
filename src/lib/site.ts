import en from '../../messages/en.json';
import pl from '../../messages/pl.json';

/** Placeholder until launch configuration is approved (spec, further notes). */
export const SITE_ORIGIN = 'https://genderdiary.barankiewicz.dev';

/** The production Journal, which has an origin of its own and shares nothing
    with this one (ADR-0019 in the Journal repository). Provisional in the same
    way as the origin above, and settled by that repository's ticket 01.

    The trailing slash is deliberate and the whole URL is the point: Start
    journal is a plain link to this and nothing else. No campaign parameter, no
    referral identifier, and none of this site's language or theme state. */
export const JOURNAL_URL = 'https://app.genderdiary.barankiewicz.dev/';

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

/** Trailing slash, so the managed host serves `<locale>/index.html` and the URL
    a person copies is the one the alternates and the canonical link name.

    Root-relative rather than run through `resolve()` from `$app/paths`: that
    exists to prefix a configured base path, and this site is served from the
    root of an origin it has to itself. */
export function pathFor(locale: Locale): string {
  return `/${locale}/`;
}
