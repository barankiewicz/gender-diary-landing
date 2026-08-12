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

## Re-verified after ticket 17

Date: 2026-08-12
Same browser, same two viewports.

Ticket 17 rebuilt the composition, so the evidence above was about a page that
no longer exists. What follows is what was re-run against the new one. The
screen reader box is untouched and still open: nothing above changed that, and
no screen reader has been run against this site yet.

**The automated checks in `tests/site.test.mjs` all pass unchanged in intent.**
The one edit was the selector that finds section headings, from
`main section > h2` to `main section h2`, because the heading now sits inside
the sticky rail. It is still the only `h2` a section has.

**Text size, redone by hand.** At 200% on a 390px screen both pages in both
languages still sit at zero horizontal overflow, and the run found one real
regression on the way. Removing `overflow: clip` from the hero, which the aura
no longer needs, exposed a break the clip had been hiding: the headline's
`clamp()` floor of `2.4rem` is 76.8px at 200%, which sets the word "transition"
wider than a 390px phone, and the hero's grid track grew to min-content to fit
it. Before this ticket the word was cut off instead of scrolling, which is not
better. The floor now falls back through `min(2.4rem, 12vw)`, the action's side
padding through `min(2.1rem, 8vw)`, and `.hero-inner` takes `min-width: 0`.

**Contrast, redone by hand and then automated.** The palette ratios above are
unchanged. What changed is that they stopped being the whole story: the aura is
a page-wide fixed layer now, so a paragraph sits on `--page` plus whatever has
drifted behind it, and a test that reads tokens cannot see that.

So the checking is done in pixels. `tests/site.test.mjs` paints every string
transparent, photographs the viewport at four points of the aura's drift as it
walks down each page, decodes the screenshot and measures the real background
behind every word against the colour that word is painted in. It runs over both
pages, in both themes, at 100 and 200 percent, and holds each element to the
bar its own size earns: 4.5:1, or 3:1 once it is large.

That found two failures that no palette check could have:

- `--muted` on the dark feature cards measured 3.34:1, and had done since
  ticket 09 shipped that grid. The decorative `--blob-*` pair is now separate
  from a `--tint-*` pair meant for a surface that carries text, at 0.16 rather
  than 0.42 in dark, which puts the same text at 5.7:1.
- The tour captions measured 4.18:1 against the blue blob at some points of its
  drift. The tour is deliberately full-bleed with no scrim, so the captions are
  set in `--ink` instead and the size carries the hierarchy the colour used to.

**Reduced motion, re-run against everything ticket 17 added.** With
`prefers-reduced-motion: reduce` the tour does not pin and does not pan, and
falls back to a strip that scrolls horizontally, so the section is still
readable rather than merely still. The hero's drawn stroke resolves to
`animation-name: none` with no dash on it, which means it is finished rather
than frozen part way. Every revealed item sits at `opacity: 1`. The aura drift
and the hero entrance behave as they did. All of this is asserted.

**Without JavaScript, re-run.** Everything in the section above still holds,
and the motion now does too: with scripting switched off in Chromium the tour
still pins and pans, the per-item reveals still run and the stroke still draws,
because all three are CSS. That is asserted. Browsers without scroll-driven
animations get `src/lib/reveal.ts`, an IntersectionObserver of about 40 lines,
which stands down entirely where the CSS works. Both branches are tested.
