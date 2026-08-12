# Keyboard, screen reader and no-JavaScript walkthrough

Date: 2026-08-12
Built static site in Chromium, desktop and 390px viewports.

This is the record the accessibility pass leaves behind. Where a check became a
test it says so, because a test keeps checking and a note in a file does not.

## Keyboard

Pages walked: `/en/`, `/pl/`, `/en/privacy/`, `/pl/privacy/`.

- Tab reaches the language links and the three theme buttons in both languages,
  from the top of the document.
- The focused control paints a visible outline. `:focus-visible` in `base.css`
  gives it 2px, offset by 3.
- Space on the dark theme button applies the dark theme.
- Enter on the other language link lands on the same page in that language.
- Focus does not stick inside the header controls; Tab leaves them for the page
  and Shift+Tab walks back out.

The first four are asserted in `tests/site.test.mjs`. The control is reached by
pressing Tab rather than by calling `focus()`, so what the test proves is that a
person arriving by keyboard alone can get there.

## Screen reader

**Not done. This is the one acceptance box still open.**

No screen reader was run against the site. What the tests pin down is the
structure a screen reader reads from, asked for by role and by name rather than
by tag or class:

- The banner and main landmarks.
- A navigation region that announces itself as Language, or Język.
- A level-one heading.
- Links named English and Polski, each in its own language.
- A group named Theme, or Motyw, holding buttons named System, Light and Dark,
  or Systemowy, Jasny and Ciemny.

Asking by role is deliberate: a `<header>` that drifted inside a `<section>`
would stop being a banner while still being a `<header>`, and a test that
queried the tag would go on passing.

Structure being right is not the same as the page being usable by ear. Closing
the box needs somebody to run NVDA, VoiceOver or Orca over both languages and
add what they actually heard here.

## Reduced motion

With `prefers-reduced-motion: reduce`, the hero entrance and the aurora drift
resolve to `animation-name: none`, and neither the action nor the channel
badges keep `transform` in their transitions. Motion is removed rather than
shortened. With motion allowed again, all three animations come back, which is
asserted too so that the reduced-motion result cannot pass by everything simply
being switched off.

## Contrast

Contrast comes out of the palette, so enlarging text cannot move it; the two are
checked as separate things rather than as a grid of four.

In both light and dark, against the surfaces they sit on: `--ink` on `--page`,
`--muted` on `--page`, `--ink` on `--surface`, and `--ink-on-accent` against
both endpoints of the action's gradient all clear 4.5:1.

The two headings painted through the gradient itself answer to `--grad-a` and
`--grad-b`, which in light sit at 4.16:1 and 4.32:1 on `--page`. That is below
4.5 and deliberately so: both are display sized, `h1` at 20px bold and the
headline at 76px, which puts them under the 3:1 bar WCAG applies to large text.
The test asserts the size before the ratio, so a heading shrunk back under the
large-text threshold fails rather than quietly keeping the looser bar.

## Text size, and a bug it found

At 200% text on a 390px screen the landing page scrolled sideways by 250px.
Three things caused it, all now fixed:

- `.cards` and `.channels` set `minmax(17rem, 1fr)` and `minmax(19rem, 1fr)` as
  grid track floors. At 200% those are 544px and 608px, wider than the phone,
  and the grid holds a floor it cannot honour. Both now wrap the floor in
  `min(..., 100%)`.
- `.control` in `base.css` laid the header controls on one unbreakable line.
  It wraps now, as `.controls` around it already did.

Both pages in both languages now sit at zero horizontal overflow at 200% on a
390px screen, and that is asserted. The check runs at 390px on purpose: at a
desktop width the page survives 400% and the check would be passing on slack
rather than on merit.

## Without JavaScript

Content reads, the language links still switch language, the gateway at `/`
becomes a page offering both languages, and the action keeps its real href. The
theme control is hidden rather than shown broken, because it cannot work without
the script: `base.css` only reveals it once `app.html` has set `data-js`.
