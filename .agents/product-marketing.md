# Product Marketing Context

**Document version:** v1
**Last updated:** 2026-08-12

Read this before writing any copy for this site. It settles who the copy is for,
what it may claim, and how it sounds. It does not settle page structure or visual
design, which come later.

Three rules override anything below.

Product vocabulary belongs to the Journal repository's `CONTEXT.md`. This document
points at terms rather than redefining them, and no page invents product language of
its own.

A claim goes live only when the released Journal demonstrates it. The claim table at
the end of this document records the evidence behind each sentence and the ticket
that unlocks the ones not yet available.

The working assumption is that every ticket in the Journal's Phase 2 and in this
site's spec will ship. Positioning here describes the finished product, so copy can
be drafted once and staged, rather than written narrowly now and rewritten later.
What the table gates is publication, not drafting.

## Product Overview

**What it is:** a journal for tracking gender transition day by day. Entries carry a
mood, values on gender dimensions the person defines, tags, a note and photos. Over
time it gives back search, per-dimension charts, tag insights, photo comparison and
monthly recaps.

**Where it runs:** in a browser, and as an Android app built from the same code.

**Product category:** people arrive looking for a mood tracker, an HRT tracker or a
private diary app. "Transition tracker" is a thin shelf, so most of the audience is
searching in the mood-tracker aisle and finding nothing that has a place for the
thing they actually want to record. Copy should meet them in the language they
searched with and then explain the difference.

**Business model:** free software under GPLv3. No account, no subscription, no
advertising and no telemetry in the released app. The project earns nothing from a
person installing it, which is worth saying once because it explains why the app is
built the way it is.

**Distribution:** the web Journal, plus Google Play, F-Droid, Aurora and Obtainium
for Android once each channel's artifact and update path exist.

## Target Audience

Not a business product. There is no buying committee, no procurement and no seat
count, so the persona table in the standard template does not apply.

**Primary reader:** a person going through transition, at any stage including
questioning and pre-anything, who wants a private record of how they feel over time.
No assumption about identity, medical pathway, being out, or how far along they are.
Presets and dimensions are configurable precisely because that assumption would be
wrong.

**Also reading the page:**

- Someone vetting the app before recommending it to a friend or a support group.
- A privacy-minded reader who will open the source before installing anything.
- Someone already keeping a Daylio habit who wants to know whether moving is worth it.

**Jobs to be done:**

1. Show me whether anything is actually changing. Day to day the answer is noise;
   over months there is a shape, and only a record makes it legible.
2. Give me somewhere to put this that nobody else can read. Some of what goes in a
   transition journal is not safe to say out loud yet.
3. Keep the ritual cheap on bad days. The days worth logging are the days with the
   least energy for logging, which is what quick log exists for.
4. Let me take it with me. History from another app comes in, and everything here
   goes out in a format that is not owned by this project.

**Use cases:** the daily check-in ritual; looking back at a specific week and finding
what was written then; watching a dimension move across six months of HRT; keeping
dated photos that never touch the phone gallery; recording lab numbers without
anyone grading them; counting down to a surgery date or marking an anniversary.

## Problems and Pain Points

**Core problem:** the tools shaped like the ritual do not track gender, and the tools
shaped around gender are built for a clinic rather than for the person. Neither
category was designed for data where a leak is a safety event.

**Why the alternatives fall short:**

- A general mood tracker collapses gender into one number, or has no place for it.
- Account-based and ad-supported apps put a copy of the diary on someone else's
  server by default, which is the wrong default for this content.
- A notes app or paper notebook is private and costs nothing, but gives nothing back:
  no retrieval, no trend, no way to answer "when did I first feel this".
- Clinical tools interpret. A reference range next to a number turns a diary into a
  report card.

**What it costs:** months spent unable to answer whether anything moved, or a
notebook nobody writes in because it lives somewhere findable.

**Emotional tension:** the worry is not abstract. It is one specific person reading
one specific sentence. Copy that treats privacy as a feature bullet misses what is
actually being asked.

## Competitive Landscape

**Direct: Daylio and general mood trackers.** They own the ritual and the habit, and
the app deliberately borrows their shape. What they do not have is gender on named
dimensions, and several of them require an account. This is where the audience is
coming from, so name the shape honestly rather than disparaging it.

**Adjacent: transition and HRT tracking apps.** Positioning against these is done
from our own side, by stating what this app refuses to do (no reference ranges, no
interpretation, no account, public source), not by asserting things about products
we have not audited.

**Secondary: a notes app, or paper.** Concede the point. Paper is genuinely more
private than any app. What it does not do is search five years back or draw the line.

**Indirect: not tracking at all.** Often the real competitor, and usually the reason
is that no option felt safe enough to start.

A note on tactics: do not build copy on another product's privacy failures, even
well-publicised ones. It needs a citation the page will not carry, it invites a
correction, and it is a worse argument than showing our own source code.

## Differentiation

- Gender is logged on dimensions the person names and bounds, with their own endpoint
  labels, not folded into a single mood value.
- There is no account to create, so there is no server-side copy to leak, sell or
  hand over.
- The source is public under GPLv3, which makes the privacy claims checkable instead
  of promised.
- It declines to interpret. Lab results get a chart and no reference range, no colour
  judgement and no advice.
- Data leaves only when the person exports it, and the Archive is encrypted under a
  password they choose before it goes anywhere.
- The free-software installation routes are presented as equals. F-Droid and
  Obtainium are not a lesser tier below Play.
- It is built for the bad days: one action logs a mood, and details can come later or
  not at all.

**Why that combination is hard to copy:** an account-based competitor cannot adopt
the second point without dismantling its business, and a closed-source one cannot
adopt the third at all.

## Objections

| Objection | Honest answer |
|---|---|
| Why should I trust a journal app with this? | Don't trust it, check it. The source is public under GPLv3, there is no account to create and no server to send to, and the site says plainly what the web host can see. What you are trusting is your own device and its operating system. If the phone is already unlocked in someone else's hands, no app fixes that, and this one does not claim to. |
| What happens if I lose my passphrase? | It depends which secret, and the site should answer all three rather than blur them. An Archive password cannot be recovered: that file stays unreadable, though other Archives with other passwords are unaffected. The Journal passphrase, once at-rest encryption ships, has no data-preserving recovery either. The app-lock PIN has one way back, a reset that destroys the local Journal. The underlying trade is worth stating plainly: recovery and encryption pull in opposite directions, and this project chose encryption. Setup should recommend a password manager before anyone commits. |
| Is my data really not going anywhere? | Entries are not. Loading the web app is a request to a web host, which sees an IP address and that the app was loaded. Installing from Play means Google knows you installed it. Say this on the page rather than letting a reader discover it. |
| Isn't a four-digit PIN weak? | Yes, and it is not doing the job you might assume. App lock stops a glance over your shoulder. It is not encryption of what is stored, and the page has to say so in the same breath. |
| I already have a year of history in Daylio. | It imports from a Daylio CSV, always as a merge and never a replace, with a preview of the counts and the mood mapping before anything is written. Photos are not in Daylio's CSV, so they do not come across. |
| Is this a medical app? | No. No dosages, no reference ranges, no interpretation of a lab number, no clinical advice anywhere. |
| What if the project stops? | The source is GPLv3 and public, the Archive is a documented versioned format, and plain CSV and JSON export exist behind a warning. Nothing here is a lock-in. |
| Do I have to be out, or on HRT, or sure? | No. There is no required stage, no assumed identity and no gate. Which dimensions appear is a preset you pick and can change, and you can define your own. |
| Isn't this a lot of work to keep up? | Quick log is one action. A day with only a mood on it is a real entry. |

**Anti-persona.** Someone who wants sync across devices, a clinician-facing report,
a social feed or a community, or who needs guaranteed recovery of a forgotten secret
more than they need encryption. For that last one, the right answer is that this app
is a bad fit, and saying so on the page is better than a support ticket after the
data is already gone.

## Switching Dynamics

**Push:** the current tracker has no place for the thing they most want to record.
Ads, or an account they did not want. A growing unease about where a year of diary
entries is being stored.

**Pull:** dimensions they define themselves. No account. Source they can read. Free,
with nothing to upsell.

**Habit:** a long streak and a year of history in the old app. The old app's shape is
in their fingers.

**Anxiety:** losing everything with no cloud backup to fall back on. Forgetting a
passphrase. Betting on a niche app that gets abandoned in a year.

Copy should answer the anxieties where they arise rather than in a block: Daylio
import preserves the history, the backup notice and scheduled encrypted backup
address the loss, and GPLv3 plus an open Archive format address abandonment.

## Customer Language

**There are no interviews yet, and no verbatim quotes.** This section is deliberately
empty rather than filled with plausible invented phrasing, which would be exactly the
fabricated social proof the voice rules forbid. Treat it as a real gap. If user
research happens, the exact words people use for dysphoria, for the ritual and for
what they are afraid of are worth more to this copy than anything else in this
document.

**Words to use:** journal, entry, on your device, no account, you choose, Archive,
source code, you can check.

**Words to avoid:**

- Promotional filler: seamless, powerful, effortless, revolutionary, beautiful,
  simply, just, unlock, elevate.
- Security theatre: bank-grade, military-grade, unhackable, fully secure, 100 percent
  private, bulletproof. Name the mechanism instead of reaching for an adjective.
- Bare privacy adjectives. "Safe", "secure" and "private" on their own tell a reader
  nothing and cost the page its credibility with the one audience that will check.
- Clinical register: patient, treatment, symptoms, diagnosis, results, progress toward
  a goal.
- Presumption about the reader: "as a trans person, you", or any sentence that tells
  them what their experience is. The app is configurable because the assumption would
  be wrong, and the copy should match.
- Urgency: today only, don't miss, limited, act now, get started before.
- "Users". Write "you", or "people".
- "Journey" as a load-bearing word. Onboarding uses it once as a button, which is
  fine; a landing page that leans on it sounds like every other wellness product.

**Glossary:** the Journal repository's `CONTEXT.md` is the source. Do not restate a
definition here or in copy, and do not coin a synonym for a term it already owns.
These are the ones most likely to be got wrong in marketing prose:

| Term | The trap |
|---|---|
| Journal | Everything the device holds about the person's transition. Not "your data", not "the database". |
| Entry | One logged moment. Not "log", not "record", and specifically not "check-in". |
| Check-in | The daily prompt to write an entry. A preference, not a Reminder, and not an Entry. |
| Reminder | A medication, injection or appointment prompt. Android only, though it travels in an Archive. |
| Gender dimension | The project's word. Screens say "scale" to the person using the app, so copy has to decide which register it is in and stay there. |
| Archive | The encrypted file that export produces. Not "backup file". |
| Backup | The habit of keeping an Archive somewhere else. Not a sync and not a live copy. |
| App lock | The PIN or biometric gate. Never "database password" or "encryption password". |
| Journal passphrase | Unlocks the encrypted Journal on the web. Not a "master password" and not an account password, because there is no account. |
| Data key | The random key the contents are encrypted under. Not a "master key". |
| Milestone | A dated significant day. Not an "event". |
| Hidden | Removed from every picker while history survives. Not "archived", which means something else here, and not "deleted". |

## Brand Voice

**Tone:** plain, exact, unhurried. Warm without being chirpy. It should read as
written by someone who has thought carefully about the stakes and is not performing
that fact.

**Style:** second person. Short sentences. Concrete nouns. State the mechanism rather
than the adjective, and put the limit in the same breath as the claim, because a
conceded limit is what makes the rest believable to this audience.

**Personality:** exact, calm, unsentimental, respectful, self-limiting.

**What this project does not do.** These are not stylistic preferences, they are the
rules:

- No urgency. No countdown, no scarcity, no "get started today". Nothing here expires.
- No promotional adjectives.
- No invented social proof. No testimonials, no download counts, no star ratings, no
  "trusted by", no logos. Not when the numbers are small, and not later when they are
  not. A real quote may appear only if someone actually said it and agreed to it being
  used.
- No clinical framing. The app is not a medical device and never speaks like one.
- No selling through fear. The reader already knows what is at risk, better than the
  copy does. State the threat model once, plainly, and move on. Dwelling on it is both
  manipulative and insulting.
- No emoji, no em dashes, no rule-of-three lists that were not three things to begin
  with.
- No claim without shipped evidence, per the table below.

## Evidence

The standard template asks for metrics, logos and testimonials. This site will carry
none of them by policy, so the section is what can actually be pointed at instead:

- Source code, public and GPLv3, which makes every privacy claim checkable rather than
  asserted.
- An Archive format that is documented and versioned, so the export is not a black box.
- A site that loads no third-party resource, which a reader can verify with the
  network tab before they believe a word of the privacy page.
- The encryption claim gate itself: a test copies closed storage and searches the raw
  bytes for seeded sensitive text, and the claim stays blocked until that search comes
  up empty. Describing the gate is probably more persuasive to this audience than
  describing the encryption, because it shows the project refusing to say something.

## Goals

**Business goal:** a person who needs this can find it, understand exactly what it
does and does not protect, and decide before installing anything.

**Conversion action:** Start journal, the sole primary action, linking straight to the
production Journal in the same tab with no campaign parameter and no transferred
state. Channel choice is secondary and appears only once a channel is live.

**Non-goals:** signups, email capture, and download counts as a vanity metric.

**Metrics:** none, and there will be none. The site has no analytics by design, so it
will never report a conversion rate and no copy decision here can be settled by an A/B
test. Decisions get made by review against this document, which is the reason this
document has to be specific enough to argue with.

## Claims and Their Evidence

Ticket 04 needs every claim on the privacy page annotated with the shipped behaviour
it rests on. This is that annotation, extended to the rest of the site. Gate authority
is the Journal repository's Phase 2 spec, under *Privacy and public claims*; where this
table and that spec disagree, the spec wins.

**Available now.** Phase 1 is complete in the Journal repository.

| Claim | Rests on |
|---|---|
| The Journal is stored on your device | SQLocal over OPFS, `adapter-static`, no backend and no networked feature |
| There is no Gender Diary account | Onboarding has no registration or sign-in path |
| Entries are not sent to a Gender Diary server | No server exists |
| An Archive is encrypted under a password you choose before it leaves the app | AES-256-GCM with Argon2id, ADR-0007 |
| App lock limits access through the app and is not encryption of what is stored | ADR-0014. Required as a counterweight wherever app lock is mentioned, not optional |
| Forgetting the app-lock PIN means a reset that destroys the local Journal | ADR-0014 |
| Gender is logged on dimensions you define, with your own endpoint labels and range | Shipped custom dimensions and presets |
| Lab results get no reference range and no interpretation | Shipped, and a deliberate design decision |
| Daylio CSV import, merge only, with a preview before anything is written | Shipped |
| Plain CSV and JSON export behind an explicit warning | Shipped |
| English and Polish | Shipped message catalogues |
| Free software under GPLv3 | `LICENSE` in the Journal repository. The "you can read the source" phrasing additionally needs that repository to actually be public |

**Blocked until the named ticket ships.** Draft the copy, stage the publication.

| Claim | Unblocked by |
|---|---|
| The Journal is encrypted at rest, naming what is covered and any web and Android difference | Journal ticket 09, and its gate: a copy of closed persistent files reveals no protected text, numbers, Reminder titles, photos or thumbnails without the unlock secret |
| A Journal passphrase is required again after the session ends, and cannot be recovered | Journal tickets 09 and 10 |
| Android protects the key through the Keystore | Journal ticket 13 |
| Works offline, and installs from the browser | Journal ticket 03. There is no service worker today, so neither is true yet |
| Reminders and the daily check-in | Journal ticket 14 |
| Disguise mode and quick exit | Journal ticket 15. The web tab-title behaviour is already wired, but the feature is not finished and the site should wait for the whole of it |
| Scheduled encrypted backup to a folder you pick | Journal ticket 16 |
| Available on Google Play, F-Droid, Aurora or Obtainium | Journal ticket 18. Until then the site shows availability status and never a link, per this repository's ticket 06 |
| Anything the privacy policy says | Journal ticket 21, which writes the policy. This site presents it and may not run ahead of it |

**Never available, whatever ships.**

| Sentence | Why |
|---|---|
| "The app makes no network requests", unqualified | The web app is fetched over the network, and updates are too. The site must separate app-shell and update traffic from Journal-data traffic every time this comes up. See the note below |
| "Everything is end-to-end encrypted" | Vague, and there is no second end. After the gate passes, name the protected data instead |
| Any protection claim against a compromised or already-unlocked operating system, or against memory inspection | Outside the threat model, and the app does not claim it |
| Any medical claim, reference range, dosage or clinical guidance | Out of scope for the product, not just for the copy |
| Invented ratings, offers, testimonials or counts | Structured data included. Ticket 07 marks up only what the page actually claims |

**Cross-repository note for the Journal.** The shipped app's About screen currently
reads "This app makes no network requests." The Phase 2 spec forbids that sentence
unqualified on this site, and the reasoning applies at least as strongly inside a web
app that was itself just downloaded. Worth raising against Journal ticket 21 rather
than quietly writing around it here.

## Changelog

*Newest first. One line per revision: what changed and why.*

- v1 (2026-08-12) - Initial context. Audience, jobs, objections, voice and vocabulary for the landing site, plus the claim table that gates every later content ticket.
