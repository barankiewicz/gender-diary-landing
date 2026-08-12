import en from '../../messages/en.json';
import pl from '../../messages/pl.json';

/** Placeholder until launch configuration is approved (spec, further notes). */
export const SITE_ORIGIN = 'https://genderdiary.barankiewicz.dev';

export const LOCALES = ['en', 'pl'] as const;
export type Locale = (typeof LOCALES)[number];

/** The locale a visitor gets when their browser asks for neither of ours. */
export const FALLBACK_LOCALE: Locale = 'en';

/** Where the language choice is remembered. This origin only: nothing here is
    readable from the Journal, and nothing here reads Journal state. */
export const LANGUAGE_KEY = 'gd-landing-language';

export const messages: Record<Locale, typeof en> = { en, pl: pl as typeof en };

export function isLocale(value: unknown): value is Locale {
  return LOCALES.includes(value as Locale);
}

/** Trailing slash so lh.pl serves `<locale>/index.html` and the URL a person
    copies is the one the alternates and the canonical name. */
export function pathFor(locale: Locale): string {
  return `/${locale}/`;
}

/** First supported locale among the visitor's preferences, matching on the
    language subtag so `pl-PL` and `en-GB` count. */
export function pickLocale(preferences: readonly string[]): Locale {
  for (const preference of preferences) {
    const subtag = preference.toLowerCase().split('-')[0];
    if (isLocale(subtag)) return subtag;
  }
  return FALLBACK_LOCALE;
}
