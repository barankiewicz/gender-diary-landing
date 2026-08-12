# Landing copy, English

Source copy for the English site. Written from `.agents/product-marketing.md`, before
any visual design, so the design serves this rather than this being cut to fit a
layout.

Two sections are deliberately not here. The privacy explanation is ticket 04, because
its sentences are gated by the Journal's release state rather than by editorial
judgement. The acquisition section is ticket 06. Page titles and descriptions are
ticket 07.

**What is copy and what is not.** Everything inside a blockquote is the copy itself.
Everything outside one is commentary: gates, rationale and handoffs. Tickets 05 and 08
can take the blockquotes alone and lose nothing they need.

**Gate markers.** Every block below is either live or staged. `Gate: shipped` means a
person can go and see the behaviour today. Anything else names the Journal ticket that
has to land before the block may be published, per the claim table in the marketing
context. Draft now, publish later. Nothing marked with a gate goes on the page until
its ticket does.

**Two register decisions this ticket owed the rest of the site.**

`CONTEXT.md` calls it a gender dimension and notes that screens say "scale" to the
person using the app. This site talks to that person, so it says scale, and it never
says dimension or axis.

`CONTEXT.md` defines Journal as everything the device holds, while both specs also say
"the Journal" for the application. On this site the product is Gender Diary and the
thing it holds is your journal, lowercase. The one exception is the Start journal
button, whose wording is fixed by the spec.

---

## Product overview

### Hero

*Gate: shipped.*

**Headline**

> A transition journal that stays on your device.

Alternatives, if the design wants a different weight. *Write down how it is going.
Keep it to yourself.* is warmer and leads with the habit rather than the storage, but
it drops the one specific claim. *Your transition, tracked on your own terms.* is the
kind of line that could sit on any product, which is why it is here as the one to
beat rather than the one to use.

Going with the first. It carries the claim, and the claim is why anyone stays on the
page.

**Subheadline**

> Write down how a day went, and track whatever it is you want to track. There is no
> account to make and nothing to sync.

**Primary action**

Start journal. Owned by ticket 06.

### What it is

*Gate: shipped.*

> Gender Diary is a diary for tracking gender transition. An entry holds a mood, a
> note, your scales, tags and photos, and it only needs one of those to count. Write
> several in one day if one does not cover it. Backdate one to a day you missed.
>
> Mood trackers have the right shape for a daily habit and nowhere to put the thing
> you most want to track. Gender Diary keeps the shape and adds the scales. It records
> what you tell it and does not try to interpret any of it.

### Where it stands on privacy

*Gate: shipped. The full page is ticket 04 and this is only the handoff to it.*

> Your journal is stored on your device. There is no Gender Diary account, and your
> entries are not sent to a Gender Diary server.
>
> Being exact about what that does and does not protect takes more than a sentence,
> so it has its own page.

---

## Visual tour

### The line that covers the whole tour

*Gate: shipped. Required by the spec: public screenshots use synthetic Journal data.*

> Every screenshot here was made with invented data. Nobody's journal appears on this
> site.

Place it where a person meets the first screenshot, not in a footnote. The captions on
the five screens that show written entries repeat it in short form, because those are
the ones a reader might otherwise take for someone's real diary.

### Captions

*Gate: shipped, all eight.*

**Home**

> The greeting, what is coming up, and the last seven days in whatever colour you
> picked. The mood row logs an entry for right now in one action, so logging something
> stays possible on a day when writing is not. Invented entries.

**An entry**

> Mood, your scales, tags, a note, photos. An entry needs only one of them, so a day
> where all you managed was a mood is still a day you logged. Invented entry.

**The month**

> Coloured by mood, or by any scale you choose. Days you did not log stay neutral,
> because a gap is not a bad day and the colour never says it was.

**One day, twice**

> Gender can shift through a day, so a day holds as many entries as it needs and
> stamps each one with its time. The day's own colour is their average. Invented
> entries.

**Search**

> Searches your notes and your tags as you type. Diacritics do not matter in either
> direction: type lozko and it finds łóżko. Invented entries.

**Six months of one scale**

> Every scale gets its own chart and its own average over the stretch of days you
> pick. Days with more than one entry are averaged, and the list behind the chart says
> which days those were.

**Milestones**

> Dated days that matter, in order. The ones ahead count down. The ones behind come
> back each year.

**Export**

> Export packs everything into one Archive, encrypted with a password you choose,
> before it goes anywhere. Invented journal.

---

## Feature summary

### Writing it down

*Gate: shipped.*

> **Entries.** A mood on five levels, a note, tags, photos, and your scales. Several a
> day, or backdated to a day you missed.
>
> **Scales.** Five come built in, among them Gender feeling, which runs from dysphoria
> at one end to euphoria at the other. Make your own with
> your own two end labels and your own range, and group the ones you use into a preset
> so the entry screen only asks what you actually track.
>
> **Tags.** Grouped and editable. Turn a whole group off when it stops being relevant.
> Hiding a built-in tag takes it out of every picker and leaves every entry that
> already carries it alone.
>
> **Photos.** Kept in the app's own storage. They never go into your phone's gallery,
> so they do not turn up in a camera roll someone else is scrolling.

### Reading it back

*Gate: shipped.*

> **The month.** A heat map in one colour, driven by mood or by a scale you pick.
>
> **Search.** Your notes and tag labels, matched as you type, ignoring diacritics.
>
> **Charts.** One per scale, over 7 to 365 days, with your streak. Open one for the
> dated list of values behind it, so the line is something you can check rather than
> take on trust.
>
> **Tag insights.** For a given scale, how days with a tag compare to days without it.
> An observation, not a verdict. Tags with fewer than three entries in that stretch
> are left out, because at that size the difference is noise.
>
> **Recap.** When a month ends, what it held. A finished year gets the same.
>
> **Milestones and the timeline.** Countdowns ahead, anniversaries behind.
>
> **Lab results.** Keep your own numbers and watch them over time. The app does not
> interpret them.

### Keeping it

*Gate: shipped.*

> **Archives.** Export packs your journal into one file, encrypted with a password you
> choose, before it leaves the app. Import puts it back, either merged into what is
> here or replacing it.
>
> **Coming from Daylio.** Import a Daylio CSV. It shows you the counts and how the
> moods will map before it writes anything, and it only ever merges.
>
> **Plain export.** CSV or JSON, for a spreadsheet or for keeping your own copy. It is
> not encrypted, and the app says so and makes you confirm before it writes the file.
>
> **When it has been a while.** If your last Archive is more than 30 days old, the
> home screen says so once. You can dismiss it.

### If you need to be careful

*Gate: shipped, including disguise and quick exit, which Journal ticket 15 records as
implemented for the web today. App lock, disguise, lock on leave and quick exit all
default to off in the Journal's preference catalogue, so "off until you turn it on" is
a checkable statement and not a reassurance. Every sentence here keeps the app-lock
counterweight attached, per the marketing context. Ticket 04 owns the longer
treatment.*

> Everything in this section is off until you turn it on. Keeping a journal about your
> own life is not something to be ashamed of, and the app does not behave as though it
> is. These exist because some people's circumstances are genuinely unsafe, and only
> you know whether that is yours.
>
> **App lock.** A PIN in front of the app. It stops someone picking up your unlocked
> phone and reading it. It is not encryption of what is stored, and this site will not
> imply that it is.
>
> **Disguise.** The browser tab says Notes instead of Gender Diary.
>
> **Quick exit.** A two-finger swipe down blanks the tab, and locks it if you have app
> lock switched on.

### How it looks

*Gate: shipped.*

> **Eight palettes**, including trans, nonbinary, genderfluid, bisexual, lesbian,
> pansexual, agender and rainbow. Each one recolours the whole app, charts and
> calendar included, and each one works in light and dark.
>
> **Colour never judges.** No red for a bad day and no green for a good one. The heat
> map is one colour at different strengths, and an empty day stays empty.
>
> **Two languages.** English and Polish, switchable in settings, with dates following
> whichever you pick.

### Staged, not published

None of the blocks below may appear on the page yet. They are written so the copy is
ready when the ticket lands, and each names what has to ship first.

*Gate: Journal ticket 11. There is no Android project in the repository, so no
sentence on this site may say the app runs on Android.*

> **On Android.** The same journal, the same data, as an app.

*Gate: Journal tickets 11 and 14.*

> **Reminders.** Medication, injections, appointments. One-off or repeating, as
> notifications on your phone.
>
> **The daily check-in.** One prompt a day, at a time you choose, skipped on days you
> have already written something.

*Gate: Journal tickets 11 and 16.*

> **Scheduled backup.** An encrypted Archive written to a folder you pick, weekly or
> monthly, without you remembering to.

*Gate: Journal ticket 03, on its evidence rather than on its status line. The ticket
reads `Status: done`, but every one of its acceptance boxes is unchecked and the
repository has no service worker, no manifest and no PWA plugin. Neither sentence below
may be published until those exist. The stale status is worth raising over there.*

> **Install it.** Add it to your home screen and open it without a browser in the way.
>
> **Works offline.** Once it is installed it does not need the network to open.

*Gate: Journal ticket 09 and its evidence gate. Ticket 04 owns this wording, not this
file. Listed here only so the feature summary does not look complete without it.*

> At-rest encryption of the journal itself.

---

## Source, licence and support

### Source

*Gate: shipped as far as the licence goes. The "read it" phrasing additionally needs
the Journal repository to actually be public, which is a deliberate step it has not
taken yet.*

> **You can read it.** Gender Diary is free software under the GPLv3. The source is
> public, which is the only reason you should believe anything on this site about what
> it does with your journal. Go and look, or get someone you trust to look.
>
> The licence also means you can run it, change it and pass it on. If this project
> ever stops, someone else is free to pick the code up, and your Archives are a
> documented format rather than something only this app can open.

### Support

*Gate: shipped. The prohibition on asking for sensitive material is required by the
spec and is not optional wording.*

> **If something is broken**, say what you did, what you expected and what happened
> instead. That is almost always enough.
>
> **Please do not send us your journal.** Not an Archive, not a screenshot with your
> entries in it, not a log from a session where you were writing. We will not ask for
> any of it, and if a request ever seems to be asking, it is not coming from us.

### Privacy policy and security contact

*Gate: Journal ticket 21, which writes the policy and fixes the security contact. This
site presents them and may not run ahead of them.*

> Placeholder. The links exist once ticket 21 lands.

---

## Notes for later tickets

Ticket 04 takes the four things that get blurred together and separates them: where
the journal is stored, what app lock does, what at-rest encryption will do when it
ships, and what an Archive password protects. This file deliberately says the least it
can on all four.

Ticket 05 writes the Polish. Not from this file sentence by sentence. Take the claims,
then write Polish, and read the grammatical-gender section of the marketing context
first, because several sentences here address the reader in a way Polish cannot copy
without picking a gender for them.

Ticket 06 owns Start journal and the channel list. The hero above leaves the button to
it.

Ticket 07 owns titles, descriptions and structured data. The only claims available to
mark up are the ones marked shipped here.
