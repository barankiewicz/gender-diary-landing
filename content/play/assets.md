# Play visual assets: briefs, not artwork

What the screenshots and the feature graphic must show and must not show. The artwork
itself is made in the Journal repository once the Android app exists, since only a
real build can be screenshotted honestly. Specs are Play's, current as of 2026-08.

## The rule over all of it

Every image is made from synthetic Journal data, invented for this purpose. No real
journal, no real entry, no real photo, no real date that belongs to a person. The
spec requires it and the listing copy states it, so an image that breaks this rule
also falsifies a published sentence.

Play's own constraints: no calls to action in imagery, no time-sensitive text, no
ranking or endorsement claims, and images must show the app as it actually works.
The project's constraints on top: no emoji, no invented social proof, and no text
overlay that says "private" or "secure" as a bare adjective.

## One synthetic journal for everything

Build one invented journal and shoot every asset from it, so the images agree with
each other: a few months of entries at a believable rhythm of 3 to 5 per week with
gaps left in, moods across the whole range, the built-in scales plus one custom scale
with its own end labels to show that they are nameable, a handful of tags, short
notes in the locale being shot, one or two entries with photos (stock-free, generic
subjects: a window, a coffee, a street), a few Milestones ahead and behind, and a few
lab results without commentary. Polish notes for the pl-PL set, English for en-US,
dates formatted per locale. Nothing in any note that reads like a real person's
crisis; ordinary days are the point.

## Phone screenshots

1080 x 1920 portrait, PNG or JPEG, at least four and at most eight per locale. Play
shows roughly the first three before scrolling, so the order is the argument:

1. **Home.** The greeting, the last seven days coloured, the mood row. This is the
   daily ritual the audience already knows from the mood-tracker aisle.
2. **An entry.** Mood, scales with visible custom end labels, tags, a short note, a
   photo. The one screen that shows gender on named scales, which no competitor
   screenshot can show.
3. **The month.** The one-colour heat map with visible gaps staying neutral.
4. **Six months of one scale.** The chart for Gender feeling, long enough that a
   shape is visible.
5. **Search.** A query mid-type with matches. The pl-PL set uses the diacritics
   example the site uses, "lozko" finding "łóżko"; the en-US set shows an ordinary
   word matching notes and a tag.
6. **Milestones.** A countdown ahead, an anniversary behind.
7. **Export.** The Archive screen at the point where a password is being chosen,
   because the claim "encrypted before it leaves the app" is visible there.
8. **Settings, palettes.** The palette list open, one non-default palette applied,
   in dark theme so the set shows both themes exist.

Screens 1 to 7 in light theme with one palette applied consistently; screen 8 carries
dark. Both locale sets show the app in that locale's language.

Caption overlays are optional on Play and not indexed. If the design pass adds them,
the text comes from the site's visual tour captions in `content/en/landing.md` and
`content/pl/landing.md`, shortened, never invented fresh, and the synthetic-data
short form ("Invented entries" / "Wpisy zmyślone") appears on any screen showing
written entries.

Screens gated in the listing copy are gated here the same way: no screenshot of
Reminders or scheduled backup ships before Journal tickets 14 and 16, and none of the
eight above depends on them, which is deliberate.

## Feature graphic

1024 x 500 exactly, PNG without alpha or JPEG. It sits at the top of the listing and
behind any featuring, often cropped, so nothing essential near the edges.

Content: the app name and the one-line claim, on brand colours, one version per
locale. English: "A transition journal that stays on your device." Polish: "Dziennik
tranzycji, który zostaje na twoim urządzeniu." Nothing else: no device mockup with
readable entries (the same reasoning as the spec's social-card rule: this image gets
shared and cropped out of context), no badge artwork, no stars, no download figures,
no emoji. Legible at thumbnail size, which in practice means the claim in one line
and generous margins.

## What is deliberately not briefed

- **Preview video.** Play videos do not autoplay and few people tap them; there is
  nothing a video shows that screenshot 2 does not. Revisit only if a real need
  appears.
- **Tablet and Chromebook screenshots.** Required only if those form factors are
  targeted, which is Journal ticket 18's call, not this file's.
- **The app icon.** It exists and belongs to the Journal repository. Play wants
  512 x 512 PNG; that is a format note, not a redesign brief.
- **Badge artwork.** Play's badge rules need a live listing, and the site already
  decided to use no channel badges before launch.
