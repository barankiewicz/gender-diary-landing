# Ticket 10 accessibility and no-JS walkthrough

Date: 2026-08-12
Environment: built static site in Chromium, desktop and mobile viewport checks

## Keyboard walkthrough

Pages checked:
- /en/
- /pl/
- /en/privacy/
- /pl/privacy/

Results:
- Header language links are reachable with Tab in both locales.
- Focus ring is visible on focused controls.
- Enter on the other language link navigates to the same page in the other language.
- Theme buttons are reachable and operable by keyboard in both locales.
- Space on the dark-theme button applies dark theme.
- Focus does not get trapped in control groups.

## Screen-reader walkthrough record

The workspace cannot run a desktop screen reader directly from the agent session.
To capture the same contract in a repeatable artifact, the browser tests now assert:
- Landmark structure: header (banner) and main content region.
- Named navigation controls for language (Language / Język).
- Top-level heading announcement text.
- Reachable, named language links (English / Polski).
- Reachable, named theme buttons in both locales.

This is implemented in tests/site.test.mjs and runs on every test pass.

## Reduced motion

With reduced motion enabled:
- Hero entrance animation is disabled.
- Aurora drift animation is disabled.
- Transform-based hover movement is disabled for CTA and channel badges.

With motion allowed again:
- Hero entrance and aurora drift animations return.

## Contrast and zoom

Contrast comes out of the palette, so enlarging text cannot move it. The two
are checked as two separate things rather than as a grid of four.

Contrast, in both light and dark:
- --ink on --page passes AA.
- --muted on --page passes AA.
- --ink on --surface passes AA.
- --ink-on-accent passes AA against both endpoints of the CTA gradient.

Text size, on both pages in both languages:
- At 200% root font size neither page scrolls sideways.
- The check bites: the same measurement reports overflow at 800%, so a layout
  that stopped reflowing would be caught rather than passing quietly.

## No-JS behavior

With JavaScript disabled:
- Content remains readable.
- Language switching still works.
- Theme control stays hidden (non-operable control is not shown).
- Acquisition instructions and Start journal links remain usable.
