# Play listing, English (en-US)

Source copy for the Google Play listing, English locale. Written from
`.agents/product-marketing.md` and the claims settled in `content/en/landing.md` and
`content/en/privacy.md`. The listing describes the Android app at the release it ships
with, so its baseline is later than the site's: see the gate note below.

**What is copy and what is not.** Everything inside a blockquote is the copy itself.
Everything outside one is commentary: gates, rationale and handoffs. The Journal's
release ticket takes the blockquotes alone and loses nothing it needs. `README.md` in
this directory says how to assemble them.

**Gate markers.** Same convention as the rest of `content/`, with one shift. This
listing cannot exist at all before Journal tickets 11 and 18, and the entry copy
claims photos, which on Android are ticket 12. So `Gate: baseline` here means "true
once there is an Android release to list, with photos working": Journal tickets 11,
12 and 18 together. Blocks needing more than that name their Journal ticket. At
upload, a block whose ticket has not shipped is left out, whole.

**Several sentences are verbatim from `content/en/landing.md`**, on purpose: the
sentence was already right, and a paraphrase would only drift. The cost is that an
edit to the landing copy has a second home to reach. Anyone editing the landing
sentences about entries, photos, the month gap or the mood-tracker shape should grep
this directory before finishing.

**Length limits.** Play counts characters, not bytes, so Polish diacritics cost one
each. Title 30, short description 80, full description 4,000. Counts for this file are
recorded next to each field and checked by counting the assembled text, newlines
included. Leaving gated blocks out only shortens the text, so the recorded count is the
worst case. The listing is a subset of the site's feature summary for the same reason:
the full assembly has to fit with every gate passed.

---

## Title

*Gate: baseline. Limit 30 characters. This field is Play's strongest ranking signal.
Play prohibits "best", "free", "#1", calls to action, emoji and all-caps here.*

> Gender Diary: mood journal

26 of 30 characters. The brand already carries two search terms, gender and diary. The
suffix buys the two the brand does not: mood and journal. The marketing context is
explicit that most of this audience searches in the mood-tracker aisle and finds
nothing with a place for gender, so the title meets them there and the description
explains the difference. "transition journal" was the first choice and does not fit:
with the brand and a separator it needs 32. The rejected alternatives and the reasoning
are in `keywords.md`.

## Short description

*Gate: baseline. Limit 80 characters. Indexed, and visible without expanding.*

> A transition journal that stays on your device. No account, nothing to sync.

76 of 80 characters. The site's hero claim, because it is the claim, and it puts
"transition" in indexed text two lines from the top since the title could not hold it.

## Full description

*Gate: per block, below. Limit 4,000 characters. Play indexes all of it. Assembled by
joining the published blocks in this order with a blank line between blocks; headers
are plain lines, since this text ships without markup. Full assembly, every gate
passed: 3,839 characters.*

*Gate: baseline.*

> Gender Diary is a diary for tracking gender transition. An entry holds a mood, a
> note, your scales, tags and photos, and it only needs one of those to count. Write
> several in one day, or backdate one to a day you missed.
>
> Mood trackers are the right shape for a daily habit, and they have nowhere to put
> gender. Gender Diary keeps the shape and adds scales you name yourself. It records
> what you tell it and does not interpret any of it.

The first sentences are the ones Play shows before "read more", so the opening is the
product definition, not a greeting.

*Gate: baseline.*

> Your journal, your device
>
> Your journal is stored on your device. There is no Gender Diary account, no server
> with a copy of it, and nothing syncing in the background.

"Makes no network requests" does not appear, per the claim table: fetching updates is
a network request, and the sentence is banned unqualified.

*Gate: Journal tickets 09, 10 and 13. At-rest encryption, and the Android Keystore
half of it. The exclusion list is required wherever the claim is made, by ADR-0018 in
the Journal repository, which is why this block is long for a store listing. There is
deliberately no passphrase sentence here: on Android the key sits in the Keystore, so
the passphrase and its non-recovery are web sentences that would be wrong on this
surface.*

> Your journal is encrypted where it is stored: entries, photos and thumbnails, and
> the working files beside them, under a random key held for you by Android's
> Keystore. A few settings stay outside so the app can start and let you unlock it:
> the wrapped key and the settings that derive it, your theme, palette and language,
> the on-off state of lock on leave and disguise, and the timestamps that slow wrong
> PIN attempts. None of it is anything you wrote.

*Gate: baseline.*

> Writing it down
>
> A mood on five levels, a note, tags, photos, and your scales. Five scales come built
> in, among them Gender feeling, which runs from dysphoria at one end to euphoria at
> the other. Make your own, with whatever end labels and range you want, and group
> them into a preset so the entry screen only asks about what you actually track.

*Gate: baseline, whose definition above includes ticket 12's Android photo storage
exactly because of sentences like this one and the entry copy.*

> Photos are kept in the app's own storage. They never go into your phone's gallery,
> so they do not turn up in a camera roll someone else is scrolling.

*Gate: baseline.*

> Reading it back
>
> The month is a heat map in one colour, driven by mood or by a scale you pick. Days
> you did not log stay neutral, because a gap is not a bad day and the colour never
> says it was.
>
> Search matches your notes and tags as you type, ignoring diacritics. Every scale
> gets a chart over 7 to 365 days. Milestones count down to dates ahead and come back
> each year for the ones behind. Lab results get a chart and nothing else: no
> reference ranges, and nothing telling you a number is good or bad.

*Gate: baseline.*

> Keeping it
>
> Export packs your journal into one Archive, encrypted with a password you choose,
> before it leaves the app. Import puts it back. Coming from Daylio, import its CSV:
> it shows the counts and the mood mapping before writing anything, and it only ever
> merges. Plain CSV and JSON export exist too, behind a warning: those files are not
> encrypted.

*Gate: Journal ticket 16.*

> Scheduled backup writes an encrypted Archive to a folder you pick, weekly or
> monthly, without you remembering to.

*Gate: Journal ticket 14.*

> Reminders
>
> Medication, injections, appointments. One-off or repeating. The daily check-in is
> one prompt a day, at a time you choose, skipped on days you have already written
> something.

*Gate: Journal tickets 13 and 15, the Android halves of app lock, disguise and quick
exit. The app-lock counterweight sentence is required wherever app lock appears and
does not get softened. The disguise and quick exit sentences describe what ticket 15
ships, so the release ticket checks them against the shipped behaviour before upload:
the wording here assumes a launcher alias and a one-gesture exit.*

> If you need to be careful
>
> Everything in this section is off until you turn it on. App lock puts a PIN in
> front of the app: it stops someone picking up your unlocked phone and reading it,
> and it is not encryption of what is stored. Disguise gives the app a plain name and
> icon. Quick exit clears the screen in one gesture, and locks the app if app lock is
> on.

*Gate: baseline.*

> How it looks
>
> Eight palettes: trans, nonbinary, genderfluid, bisexual, lesbian, pansexual, agender
> and rainbow. Each recolours the whole app, charts and calendar included, in light
> and dark. Colour never judges: no red for a bad day, and an empty day stays empty.
>
> Gender Diary is in English and Polish.

*Gate: the Journal repository actually being public, the same caveat as the site's
Source section. By Journal ticket 18 it will be, since F-Droid rebuilds from public
source, but the gate is the repository's visibility and not the licence file.*

> Free software
>
> Gender Diary is free software under the GPLv3. Do not take my word for anything on
> this listing: the source is public. Go and look, or get someone you trust to look.
> If this project ever stops, someone else can pick the code up.

*Gate: baseline. The synthetic-data sentence is required by the spec for every public
screenshot.*

> Every screenshot on this listing was made with invented data. Nobody's journal
> appears here.
>
> Do not send me your journal, not even to report a bug: I will never ask for it. If
> something asks, it is not me.

Bug-reporting instructions live in Play's support fields and on the site, not here.
The journal prohibition stays, because the listing is where a person first learns what
this project will and will not ask of them.

---

## What is deliberately not in this listing

**The Play-tells-Google line.** The site says installing from Play records the install
against your Google account, and lists Play last for that reason. The listing does not
repeat it. A person reading the Play listing has already chosen Play, the argument
belongs where the choice is made, and a listing that argues against its own store is a
stunt. Nothing stronger appears here than on the site; this is the one place the
listing says less.

**At-rest encryption, until its gate passes.** The block above ships only after
Journal tickets 09, 10 and 13. Before that, the app-lock sentence already says it is
not encryption of what is stored, and the listing claims nothing more.

**HRT.** It has search volume with exactly this audience, and the site's published
copy never says it. The listing does not get ahead of the site for a keyword. The
reasoning is recorded in `keywords.md`.

**Ratings, awards, endorsements, counts.** None exist, so none appear. This also rules
out "featured on", "loved by" and any number of installs, whatever the numbers later
say.

**No advertising, no telemetry.** True of the shipped app, in the marketing context's
business-model section, and worth saying to exactly this audience. Cut anyway, because
the site's published copy does not say it yet and the ticket's rule is that nothing
appears in a store listing that the site does not say. The site should say it: the
marketing context calls it worth saying once, and no landing or privacy block carries
it. When a site ticket adds it, this listing takes it back in the same change.

**Several site sentences that did not survive the length limit.** Tag editing, tag
insights, the monthly recap, the 30-day Archive notice and the streak are on the site
and in the app, and the listing omits them so the full assembly fits 4,000 characters
with every gate passed. Omitting is fine; the rule only forbids the listing saying
more than the site.

## Notes

The first-visible text on a Play page is the short description plus roughly the first
250 characters of the full description. Both lead with the same two facts, what it is
and where it stays, which is repetition across fields rather than within one, and is
deliberate.

The description ships as plain text. Play accepts a small HTML subset in the full
description, and this listing declines it: the copy reads as written, and one less
transformation between this file and the console means one less place for the text to
drift.
