# Google Play listing, ready to lift

The Play listing is marketing copy, so it is written in this repository, where the
voice and the claim gates live. It is published from the Journal repository, which
owns the artifact, the application ID and the store credentials. This directory is
the handover: the Journal's release ticket (Phase 2 ticket 18, or whichever ticket
opens the Play console) takes it as is.

## What is here

- `en.md`, `pl.md`: title, short description and full description per locale, as
  blockquotes with gate markers, with character counts recorded.
- `keywords.md`: which search terms the listing targets, where each sits, and what
  was rejected, so a later ASO audit can tell deliberate from accidental.
- `assets.md`: screenshot and feature-graphic briefs. The artwork is made in the
  Journal repository from a real build, on synthetic data only.

## How to assemble a field

Blockquotes are the copy; everything else is commentary and never ships. The title
and short description are one blockquote each. The full description is the
blockquotes under "Full description" in file order, joined with one blank line, after
dropping every block whose gate has not passed. Unwrap the source lines into
paragraphs; a blank line inside a blockquote is a paragraph break. No other editing:
if a sentence needs rewording, it changes here first.

Gates: `Gate: baseline` means true as soon as there is an Android release to list,
which is Journal tickets 11 and 18, the floor under the listing itself. Every other
block names its Journal ticket, and evidence beats the status line: the gate is the
shipped behaviour, not the `done` marker. Locales move together; a block published in
one is published in both.

## Limits, and how the counts were made

Play counts characters, newlines included, not bytes. Title 30, short description 80,
full description 4,000. Recorded counts are the worst case with every gate passed
(dropping blocks only shortens): title 26 and 23, short description 76 and 76, full
description 3,935 and 3,940 for English and Polish. Counted with Python `len()` over
the assembled text, exactly as the assembly rule above produces it. Recount after any
edit; the margin on the full descriptions is around 60 characters, which survives
small fixes and not a new paragraph.

The full description ships as plain text. Play accepts a small HTML subset there;
declining it keeps the copy reading as written and removes one transformation between
these files and the console.

## Console fields this handover does not cover

These belong to the Journal repository, with the release:

- **Application ID and developer name.** Ticket 18 owns both.
- **Category.** Suggestion, with reasoning: Lifestyle, where Daylio sits and where
  the mood-aisle audience browses. Health & Fitness invites the clinical register
  the app refuses everywhere else.
- **Privacy policy URL.** Play requires one at submission. That policy is Journal
  ticket 21, so ticket 21 blocks the Play submission in practice, and finding that
  out at the console is the wrong time. Same for the support email.
- **Data safety form.** Filled from the shipped app's actual behaviour. For this app
  the honest answers, no data collected and no data shared, are also the strongest
  conversion asset on the whole listing, so fill it precisely rather than
  defensively.
- **Content rating questionnaire.**

## Two checks at upload time

1. The disguise and quick exit sentences in both full descriptions assume a launcher
   alias and a one-gesture exit. Check them against what Journal ticket 15 actually
   shipped before pasting.
2. The synthetic-data sentence in the copy claims every screenshot uses invented
   data. Make sure the uploaded screenshots keep it true, per `assets.md`.

## F-Droid

F-Droid metadata is a separate format with its own rules and its own store culture.
This listing may inform it; nothing here uploads to it, and the ticket that does
should not paste Play text into an F-Droid summary unread.
