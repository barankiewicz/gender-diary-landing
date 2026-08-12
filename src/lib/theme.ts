/** Theme choice, mirrored by the pre-paint script in src/app.html. That script
    is inline and cannot import from here, so the key and the two stored values
    are written out twice and have to change together. */
const THEME_KEY = 'gd-landing-theme';

/** `system` is the absence of a choice: it stores nothing, stamps nothing, and
    leaves `prefers-color-scheme` in charge through base.css. */
export const THEME_CHOICES = ['system', 'light', 'dark'] as const;
export type ThemeChoice = (typeof THEME_CHOICES)[number];

export function readThemeChoice(): ThemeChoice {
  const stored = localStorage.getItem(THEME_KEY);
  return stored === 'light' || stored === 'dark' ? stored : 'system';
}

export function applyThemeChoice(choice: ThemeChoice): void {
  if (choice === 'system') {
    localStorage.removeItem(THEME_KEY);
    delete document.documentElement.dataset.theme;
  } else {
    localStorage.setItem(THEME_KEY, choice);
    document.documentElement.dataset.theme = choice;
  }
}
