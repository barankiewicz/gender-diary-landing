# Product Marketing Context

**Document version:** v9
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

**Where it runs:** in a browser today. An Android app from the same code is planned,
and until Journal ticket 11 lands there is no Android project at all, so no page may
say the app runs on Android. This is the one place in the overview where the
finished-product frame is easiest to publish by accident.

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
- The free-software installation routes are the ones the site recommends. Google Play
  is listed last and the page says why: a Play install tells Google there is a trans
  app on that phone, tied to that account, and nothing in the app changes it. Aurora,
  F-Droid and Obtainium rank equally above it, since nothing separates the three.
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
address the loss, and GPLv3 plus an open Archive format address abandonment. Two of
those are not available yet: scheduled backup needs Journal tickets 11 and 16, and
the daily check-in named under the jobs above needs 11 and 14. Check the table before
using either.

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
- "We", "us", "our". One person. See the voice section below.
- "Journey" as a load-bearing word. Onboarding uses it once as a button, which is
  fine; a landing page that leans on it sounds like every other wellness product.

**Glossary:** the Journal repository's `CONTEXT.md` is the source, and it is the only
source. Read the definition there before using any of these words in copy. This table
deliberately carries no definitions, because a second copy of one drifts from the
first and the drift is invisible until a page is already wrong. What it carries is
the wrong word each term attracts, taken from that file's own `_Avoid_` lines:

| Term | Do not write |
|---|---|
| Journal | store, database |
| Entry | log, record, check-in |
| Reminder | any use for the daily prompt, which is a Check-in |
| Gender dimension | axis, metric. Screens say "scale" to the person, so copy picks one register and stays in it |
| Archive | backup, dump, export file |
| Backup | sync, replica |
| App lock | database password, encryption password |
| Journal passphrase | master password, account password, PIN |
| Data key | master key, database key |
| Milestone | event, occasion |
| Hidden | archived, disabled, deleted, soft-deleted |
| Metric | colour metric, measure, dimension |
| Range | scale, bounds |

One term the glossary does not settle, and copy will hit it on the primary action:
`CONTEXT.md` defines **Journal** as what the device holds, while both specs also say
"the Journal" for the application and its repository, as in "the production Journal
origin" and the Start journal button. Copy needs one of these senses per page, and
ticket 03 should decide which and say so, rather than letting a reader meet both.

## Brand Voice

**Tone:** plain, exact, unhurried. Warm without being chirpy. It should read as
written by someone who has thought carefully about the stakes and is not performing
that fact.

**Who is speaking: one person, in the first person singular.** This is one person's
project, and "we" for a one-person project is the single clearest tell that turns a
page into a company with a support desk. Write "I will never ask for any of it", not
"we will not ask". Every "we", "us" and "our" on this site is an error.

The site does not name or identify that person, and does not state that they are trans.
Both are deliberate. The copy shows who wrote it by knowing things that only somebody
inside would know, which is more convincing than the claim and costs the author less.
So: no byline, no "made by a trans person for trans people", and no about-me section.
The recognition lives in sentences like "a day where all you managed was a mood is
still a day you logged".

Polish has a complication English does not: the first person singular is gendered in
the past tense and in adjectives, exactly as the second person is. `content/pl/landing.md`
carries the rule. Present and future only.

**Style:** second person for the reader, first person singular for the project. Short
sentences. Concrete nouns. State the mechanism rather than the adjective, and put the
limit in the same breath as the claim, because a conceded limit is what makes the rest
believable to this audience.

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
- No treating the app as a thing to hide. App lock, disguise, lock on leave and quick
  exit all default to off in the Journal's preference catalogue, and copy presents them
  as available rather than expected. Keeping a journal about your own life is an
  ordinary thing to do, and a page that leads with concealment says the opposite. This
  audience is told to be discreet often enough without a landing page joining in. Name
  the controls, say they stay off until someone turns them on, and leave the judgement
  to the person whose situation it actually is.
- No emoji, no em dashes, no rule-of-three lists that were not three things to begin
  with.
- No claim without shipped evidence, per the table below.
- **No talking about the copy on the copy.** "This site will not imply that", "those are
  different sentences a reader deserves to have kept apart", "this page is longer than a
  privacy page usually is" - all of it is the page congratulating itself on its own
  carefulness, which is a sales move wearing honesty as a costume. Being careful is the
  job. Announcing it is the tell. State the thing plainly and let the reader notice.
- **No epigram at the end of every paragraph.** One good closing turn of phrase is
  writing. Twelve in a row is a writer showing their work, and it reads as polished in
  exactly the way this audience distrusts. If a sentence exists to land well rather than
  to tell somebody something, cut it.
- **No coyness about the noun.** "Nowhere to put the thing you most want to track"
  withholds the word gender to create interest, which is a copywriting reflex. Say
  gender. Non-presumption is about not telling readers what their experience is, not
  about declining to name the subject of the app.
- **No neutrality the reader has no use for.** Being even-handed between a channel that
  reports an install to Google and three that do not was a policy dressed as fairness.
  Have the opinion, say it in one line, give the reason once, and get back to the
  product. This replaces the earlier rule that presented the four channels as equals.
- **No tutorials.** The site says what a thing is and what it costs you, not how to
  operate it. How to point Obtainium at a repository is Obtainium's documentation.
  Anything that reads as setup instructions is the acquisition section eating the page
  the product should be on.

## Voice in Polish

Ticket 05 writes the Polish site. Everything above is the English voice, and none of
it transfers by translation. Polish copy is written as Polish from the claims the
English settles, with `humanizer-pl` in mind from the first sentence rather than as a
cleanup pass afterwards.

**Grammatical gender is the hard problem, and it is not a style question.** Polish
inflects the second person for gender in the past tense and in adjectives, so an
ordinary sentence addressed to the reader picks a gender for them. On a site about
gender transition that is the worst available mistake, and it is one the English
never has to solve.

The app already gets this wrong. Its Polish note placeholder reads "Co się
wydarzyło? Jak się z tym czułaś?" against an English original of "What happened? How
did it feel?" The Polish assumes a woman is writing. That belongs in the Journal's
translation audit, Phase 2 ticket 19, and the site must not copy the pattern.

Techniques that avoid the problem, in the order worth reaching for them:

- Present tense, which is not gendered in the second person. "Jak się z tym czujesz"
  costs nothing and picks nobody's gender.
- Impersonal and infinitive constructions: "można", "wystarczy", "da się", verbal
  nouns like "zapisywanie" instead of a past-tense verb with a subject.
- Rewriting around the sentence entirely. If a past-tense address is unavoidable, the
  sentence is usually the problem.
- Never a slash form. "Zapisałeś/aś" is ugly, it still offers exactly two options, and
  it makes the reader do the work of noticing they were nearly misgendered.

**Form of address:** informal second person. Pan and Pani are formal and force a
gender in the first word of the sentence, which rules them out here regardless of
register.

**Nouns for the reader:** "użytkownik" is both masculine and the Polish equivalent of
"users", so it fails two rules at once. Address the reader directly instead.

**Terminology:** the app ships Polish already, so the site matches it rather than
coining alternatives. Read `messages/pl.json` in the Journal repository. Wpis is an
Entry, Blokada aplikacji is App lock, Kamuflaż i szybkie wyjście is disguise and quick
exit, Kamienie milowe are Milestones. Where the app has no Polish word for something
the site needs, ticket 05 decides it and the decision goes back into this file.

**Terms ticket 05 decided.** Almost all of these are Phase 2 vocabulary, which is why
the shipped catalogue has no Polish for them. This is the only copy of the table; the
Polish content files point here rather than repeating it, because a second copy drifts.

| English | Polish | Why not the obvious alternative |
|---|---|---|
| Archive, the file | archiwum | „Kopia zapasowa” is Backup, the habit, which the glossary keeps separate from the file. The app does ship „kopia zapasowa” on the stale-backup banner, so this is the one term where the site deviates from shipped Polish. It follows `content/en/landing.md`, which already writes "Archive" where the app's own banner says "backup" |
| Journal passphrase | hasło do dziennika | „Hasło główne” is master password, on the glossary's avoid list |
| Archive password | hasło do archiwum | Parallel to the above, so the two read as two secrets |
| Encryption at rest | szyfrowanie zapisanych danych | „Szyfrowanie w spoczynku” is a calque nobody says |
| Data key | klucz do danych | „Klucz główny” is master key, also on the avoid list |
| Lock on leave | blokada przy wyjściu | Sits next to „szybkie wyjście”, which the app already ships |
| Check-in, the daily prompt | codzienne pytanie | „Przypomnienie” is Reminder, which the glossary says this is not |
| Web host | serwer WWW | „Nasz serwer” is the one that does not exist, so the one that serves the app needs a different name, or the privacy page denies having a server and then describes one |
| Start journal, the button | Otwórz dziennik | „Zacznij dziennik” says start a new one, which is wrong for anyone returning to theirs, and „Start” is not a Polish verb. Decided by ticket 06. The imperative keeps the reader ungendered, and lowercase „dziennik” follows the register `content/en/landing.md` settled |

Two terms are decided against `humanizer-pl` rather than with it. "Kamienie milowe" is
on its list of AI signatures, and it stays, because it is the app's own Polish label for
Milestones and a reader looking for that screen has to find the same words. The disguise
sentence quotes `Notes`, the literal untranslated string the Journal writes into the tab
title, rather than the Polish the reader might expect.

**Start journal is „Otwórz dziennik” in Polish.** Ticket 06 decided it, and the row in
the table above carries the reasoning.

**Section headings ticket 13 wrote.** The copy files organise themselves with English
headings on both the English and the Polish page, which makes those headings commentary
rather than copy: `content/pl/landing.md` says the copy is what sits in a blockquote and
that everything outside one is in English on purpose. So the pages needed headings that
nobody had written, in a language neither file supplies. Ticket 02 had already put three
of them in `messages/*.json` and this follows that, written as Polish rather than as a
translation of the English column.

The two pages needed different amounts of writing, and the difference is worth stating
because it looks inconsistent otherwise. The privacy page's document headings are its
section names, and ticket 05 wrote a Polish name for nearly all of them in that file's
parity table, so both languages were already settled and this ticket wrote nothing. The
landing page's document headings are organisation ("Product overview", "Visual tour",
"Feature summary"), the register a spec uses rather than the one a page speaks in, and
ticket 02 had already replaced the first of them with a page heading of its own. So the
landing page is where headings had to be written, in both languages.

**Landing page.** Five of the English headings are the copy file's own `###` text,
unchanged: Writing it down, Reading it back, Keeping it, If you need to be careful, How
it looks. Three are new English: The screens, What it does, Support. All eight Polish
ones are new. None of the eight went through `copywriting` or `copy-editing`, which is a
gap the content workflow would normally close, so they are flagged for that pass along
with the Polish review below.

| Section | English | Polish | Why not the obvious alternative |
|---|---|---|---|
| The visual tour | The screens | Ekrany | The document heading is "Visual tour", which is how a spec talks about a section rather than how a page introduces one. The section is eight screens, and „Ekrany” sits next to the app's own „Ekran główny” |
| The feature summary | What it does | Co potrafi | Pairs with „Czym jest Gender Diary” above it. „Funkcje” is the word every product page uses and says nothing |
| Source and support | Support | Pomoc | Narrower than the copy file's "Source, licence and support" on purpose: the source block is held, see below. „Wsparcie” reads as backing a project rather than getting help with it |
| Writing an entry | Writing it down | Zapisywanie | Verbal noun, so it stays out of the gendering the second person would bring |
| Reading it back | Reading it back | Przeglądanie | Same reason. „Odczytywanie” is what a machine does to a file |
| Archives and export | Keeping it | Archiwa i eksport | Concrete, and both words are already the site's. An abstract heading here would be the one place the page stopped naming the mechanism |
| The careful controls | If you need to be careful | Jeśli musisz uważać | Present tense, so it picks nobody's gender. It is a condition, not a category, and the heading keeps it one |
| Palettes and colour | How it looks | Wygląd | Polish headings are nominal where English ones are clausal, and „Jak to wygląda” is the English shape borrowed |

None of the eight is product vocabulary, so none goes in the term table above. The
Polish-speaking review that ticket 05 still owes covers these too: they were written by
the ticket that rendered the pages, not by the ticket that wrote the Polish.

**Privacy page.** Nothing was written here. The English is the copy file's own `###`
text and every Polish heading already existed, which is worth recording so that the next
person can check the provenance rather than take it on trust.

| English | Polish | Where the Polish came from |
|---|---|---|
| Where your journal is | Gdzie jest twój dziennik | The parity table in `content/pl/privacy.md`, ticket 05 |
| App lock | Blokada aplikacji | The shipped app's own Polish, and the term table above |
| Encryption at rest | Szyfrowanie zapisanych danych | The term table above, ticket 05. The section keeps the heading while it carries the fallback: the block is about encryption at rest and says there is none yet |
| Archives | Archiwa | `content/pl/landing.md`, the feature label |
| What the web host can see | Co widzi serwer WWW | The parity table, ticket 05, built on „serwer WWW” from the term table |
| What none of this protects against | Czego to nie chroni | The parity table, ticket 05 |

**Descriptions and the social card, ticket 07.** Four sentences of new copy, one
description per page per language, plus the card's alt text. Nothing under `content/`
supplied them: a description is written for a search result and a link preview, and no
blockquote in the copy files is that. Like the headings above, they have not been
through `copywriting` or `copy-editing`, and the Polish joins the review ticket 05 owes.
Every clause is built on a claim from the tables at the end of this document, and the
Polish was written as Polish from those claims: „konta nie zakładasz" and „które
nazywasz po swojemu" come from the shipped Polish catalogue rather than from the English
column.

| Page | English | Polish |
|---|---|---|
| Landing | A diary for tracking gender transition. An entry holds a mood, a note, photos and scales you name yourself. It stays on your device, and there is no account. | Dziennik tranzycji. We wpisie mieści się nastrój, notatka, tagi, zdjęcia i skale, które nazywasz po swojemu. Zostaje na twoim urządzeniu, konta nie zakładasz. |
| Privacy | Where your journal is, what app lock does and does not do, what is not encrypted yet, and what a web host can see. | Gdzie jest twój dziennik, co daje blokada aplikacji i czego nie daje, czego aplikacja jeszcze nie szyfruje i co widzi serwer WWW. |
| Card alt | The words Gender Diary on a dark background. | Napis Gender Diary na ciemnym tle. |

App lock appears in the privacy description with its counterweight in the same clause,
because the claim table requires that everywhere it is named. The landing description
says nothing about Android, offline use or encryption at rest.

**Titles stay short, and that is what pays for spec story 37.** A description is read in
a search result and in a preview somebody chose to send. A title is read in a browser
history, a tab, a bookmark and the first line of that preview, none of which the reader
asked for. So the title is the product's name, on the privacy page that page's own
heading, and nothing about what kind of app this is; the words a person searches with go
in the description. The cost is real: "a transition journal that stays on your device"
in a title is what an SEO pass would ask for, and it is not there. What the site cannot
soften is its own name and its URL, so the claim is not that a title hides anything, only
that it adds nothing the name already gives away. A test reads every title and fails on a
list of words that would.

**The card is the wordmark and nothing else,** for the same reason. It is a local PNG,
rendered by `scripts/social-card.mjs` and committed, and it shows no journal, invented or
otherwise. What the app is goes in `og:description` next to it.

**The source block cannot be published, and its gate half-says so.** `content/*/landing.md`
marks it *Gate: shipped as far as the licence goes*, then names a condition that has not
been met: the phrasing needs the Journal repository to be public, and it is private. The
block is two paragraphs built around "the source is public. Go and look", so there is no
part of it that publishes without editing the copy, which is not ticket 13's to do. The
site therefore states no licence at all today. Splitting it into a licence block that
ships and a "read it" block that waits is ticket 03's, and until it happens the claim
table row above is the only place the GPLv3 appears.

**What does not carry across:** the English "words to avoid" list is a list of English
words. Polish has its own marketing tells, its own calques from English, and its own
way of sounding machine-translated, and `humanizer-pl` is the authority on them.

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
it rests on. Ticket 04 owns that page-level annotation; this table is the input it
starts from, extended to cover the rest of the site. Neither is gate authority. That is
the Journal repository's Phase 2 spec, under *Privacy and public claims*.

**Evidence beats the status line, and this is not hypothetical.** Phase 2 ticket 03
reads `Status: done` while every one of its acceptance boxes is unchecked and the
repository has no service worker, no manifest and no PWA plugin. Anyone gating on the
status line alone would have published "works offline" and "installs from the browser"
on the strength of a ticket nobody finished ticking. The spec already settles it: "No
marketing claim becomes true because it appears in this document. Claims go live only
after their corresponding release gate has executable evidence." So a `done` status is
a prompt to go and look, never the proof itself. Go and find the artifact.

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
| Disguise mode and quick exit, on the web | Journal ticket 15: "They are implemented for the web today." The tab title and icon go neutral and quick exit blanks the tab. Claimable for the web only, and never phrased so it reads as covering Android |
| English and Polish | Shipped message catalogues. See the Polish note above: the shipped Polish is not uniformly gender-neutral, so "available in Polish" is safe and "written for you" is not |
| Free software under GPLv3 | `LICENSE` in the Journal repository. The "you can read the source" phrasing additionally needs that repository to actually be public |

**Blocked until the named ticket ships.** Draft the copy, stage the publication.

| Claim | Unblocked by |
|---|---|
| The app runs on Android at all | Journal ticket 11: "there is no Android project in the repository". This blocks every Android sentence on the site, not only the store links, and it is the easiest one to publish by accident because the overview describes the finished product |
| The Journal is encrypted at rest, naming what is covered and any web and Android difference | Journal ticket 09, and its gate: a copy of closed persistent files reveals no protected text, numbers, Reminder titles, photos or thumbnails without the unlock secret |
| A Journal passphrase is required again after the session ends, and cannot be recovered | Journal tickets 09 and 10 |
| Android protects the key through the Keystore | Journal tickets 11 and 13 |
| Works offline, and installs from the browser | Journal ticket 03, on evidence. Its status reads `done`, but its acceptance boxes are unchecked and there is no service worker, manifest or PWA plugin, so neither is true yet |
| Reminders and the daily check-in | Journal tickets 11 and 14. Both are Android-only, so the Android block applies first |
| Disguise mode and quick exit, on Android | Journal tickets 11 and 15. The launcher alias is the Android half; the web half is already available above |
| Scheduled encrypted backup to a folder you pick | Journal tickets 11 and 16. Android only |
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

Two of those rows describe sentences the Journal itself currently uses, which is why
they are worth stating rather than assuming. Its About screen reads "This app makes
no network requests", and its Polish note placeholder assumes a woman is writing.
Both belong to the Journal repository, tickets 21 and 19. Neither is a licence for
this site to repeat them.

## Changelog

*Newest first. One line per revision: what changed and why.*

- v9 (2026-08-12) - Recorded the four page descriptions and the card alt text ticket 07 wrote, flagged like the headings as not having been through copywriting or copy-editing. Wrote down why titles stay short: a title lands in a history entry and a preview's first line, which the reader never asked for, so the searchable words live in the description instead, and spec story 37 is paid for with the title keywords an SEO pass would want.
- v8 (2026-08-12) - Recorded the section headings ticket 13 needed, because the copy files organise themselves with English headings that are commentary rather than copy. Eight had to be written for the landing page and none for the privacy page, where ticket 05's parity table had already settled the Polish; both tables now say which is which and where each string came from. Flagged the eight as not having been through copywriting or copy-editing. Recorded that the source block cannot be published: its gate says shipped as far as the licence goes, and the Journal repository it tells people to go and read is private, so the site currently states no licence.
- v7 (2026-08-12) - The project speaks as one person, in the first person singular, and does not name that person or state that they are trans. Reversed the channel-equality rule: Google Play is listed last and the page says why, because even-handedness between one channel that reports an install to Google and three that do not was a policy the reader had no use for. Added five style rules the old list did not catch, all of them ways this copy sounded institutional rather than promotional: no talking about the copy on the copy, no epigram per paragraph, no coyness about the word gender, no neutrality the reader has no use for, no tutorials.
- v6 (2026-08-12) - Start journal is „Otwórz dziennik” in Polish, decided by ticket 06 and reasoned in the term table. The version line above said v4 while this list was already on v5, so it now says what the list says.
- v5 (2026-08-12) - Recorded the eight Polish terms ticket 05 had to coin, the two places the Polish site deliberately overrides `humanizer-pl`, and the note that Start journal still has no Polish name. „Archiwum” is the one term that deviates from shipped Polish, which the row says out loud.
- v4 (2026-08-12) - Evidence beats the status line. Phase 2 ticket 03 reads done with every acceptance box unchecked and no service worker in the repository, which would have let "works offline" onto the page.
- v3 (2026-08-12) - Added the rule that privacy controls are presented as optional rather than expected. They all default to off, and copy that leads with concealment tells this audience the app is something to be ashamed of.
- v2 (2026-08-12) - Corrected the claim table after review: added the Android row, since no Android project exists and the old table gated only the store links; moved web disguise and quick exit to available, which ticket 15 says are shipped. Replaced the glossary definitions with a traps-only table pointing at CONTEXT.md. Added the Polish voice section that ticket 05 needs.
- v1 (2026-08-12) - Initial context. Audience, jobs, objections, voice and vocabulary for the landing site, plus the claim table that gates every later content ticket.
