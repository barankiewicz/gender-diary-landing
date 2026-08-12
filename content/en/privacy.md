# Landing copy, English: the privacy page

Source copy for the privacy page. Ticket 03 wrote a two-sentence version on the home
page and handed the rest here, because being exact about what is and is not protected
takes more than a sentence.

**What is copy and what is not.** Everything inside a blockquote is the copy itself.
Everything outside one is commentary: gates, rationale and handoffs. Ticket 05 can take
the blockquotes alone and lose nothing it needs. Nothing outside a blockquote is ever
rendered, so a placeholder never sits inside one.

**Gate markers.** Same rule as `landing.md`. `Gate: shipped` means a person can go and
check the behaviour today. Anything else names the Journal ticket that has to land
before the block may be published. The working assumption is that all of Phase 2 ships
before this site goes live, so the page below is written for the finished product. The
markers exist so that if it publishes earlier, the wrong sentences are visibly the
wrong sentences rather than quietly false ones. The fallback section at the end carries
the pre-gate wording for that case.

**Four things this page refuses to blur.** Where the journal is stored, what app lock
does, what encryption at rest covers, and what an Archive password protects. They are
four different mechanisms with four different failure modes, and collapsing them into
the word "encrypted" is the single most likely way this page could mislead somebody who
is relying on it.

---

## The page

### Title and opening

*Gate: shipped.*

> **What Gender Diary protects, and what it does not**
>
> This page is the long answer. It is longer than a privacy page usually is, because
> the short version would have to leave out the parts that matter to somebody deciding
> whether this is safe to use.

### Where your journal is

*Gate: shipped.*

> Your journal is a database on your device. There is no Gender Diary account, no copy
> on a server of ours, and nothing syncing anywhere in the background. An entry you
> write goes into storage on the machine you wrote it on and stays there until you
> export it or delete it.
>
> There is no server, so there is no server to be breached, subpoenaed or sold. What
> you are trusting instead is your own device and whoever else can reach it.

### App lock

*Gate: shipped. The counterweight sentence is required by ADR-0014 and by the spec
wherever app lock is mentioned. It is not optional wording and does not get softened.*

> App lock is off until you turn it on, like everything else on this page that hides
> things. Keeping a journal about your own life is an ordinary thing to do. Some
> people's circumstances make it dangerous anyway, and only you know whether that is
> yours.
>
> **What it does.** App lock puts a PIN in front of the app, so somebody who picks up
> your unlocked phone cannot read your journal by opening it.
>
> **What it is not.** It is not encryption of what is stored. It is a gate in the
> interface, and the interface is not the only way to reach a file. Four digits will
> stop a glance over your shoulder. It will not stop somebody with your device, time
> and a reason.
>
> **If you forget the PIN**, there is one way back in: an action on the lock screen
> that wipes the local journal and starts you over. There is no recovery that keeps
> your entries, because a PIN that could be recovered would not be protecting anything.
> Wrong attempts wait longer and longer before the next one is accepted, and nothing
> wipes your journal automatically after a set number of tries. A counter like that is
> one bored kid or one argument away from destroying a diary nobody decided to destroy.

### Encryption at rest

*Gate: Journal tickets 09 and 10, and the claim gate itself: a closed-app copy of the
persistent files reveals no protected text, numbers, Reminder titles, photos or
thumbnails without the unlock secret. Until that test passes this whole block is
unpublishable and the fallback at the end replaces it.*

> **What is covered.** The journal database, the files the database writes beside
> itself, the copy taken before an upgrade changes anything, your photos and their
> thumbnails, an import that is still in progress, and the settings that have to be
> read before you unlock. If a piece of it is left outside, this page names it rather
> than rounding up.
>
> Photos are files rather than rows in a database, so encrypting the database never
> reaches them. Each one is encrypted on its own, under the same key.
>
> **On the web**, you choose a passphrase. It does not encrypt the journal directly. It
> unlocks a random key that does, which is what lets you change the passphrase later
> without re-encrypting years of entries. After the browser session ends, the
> passphrase is needed again. No usable key is left sitting next to the data it would
> open.
>
> **On Android**, the same random key is held by the Android Keystore rather than by a
> passphrase you type.
>
> **The passphrase cannot be recovered.** Not by you and not by us. There is no reset
> that keeps your entries, no recovery email and no support request that can help,
> because anything that could let us back in would mean the encryption was never doing
> what this page says it does. Put it in a password manager before you write anything
> you would be upset to lose. The app says the same thing at setup, but you are reading
> this first, which is the point of saying it here.

### Archives

*Gate: shipped, ADR-0007.*

> Export packs your journal into a single Archive file, encrypted with a password you
> choose, before the file goes anywhere. That password is not your PIN and not your
> Journal passphrase. It protects that one file.
>
> **What an Archive gives away.** The first six bytes of the file spell GDIARY in
> plain text, followed by the format version and the settings used to turn your
> password into a key. That part has to be readable without the password, so that a
> file from a newer version can say so instead of decrypting into nonsense. Everything
> from your journal is behind the password. Somebody who finds the file learns that you
> have a Gender Diary Archive, and nothing about what is in it.
>
> **If you lose an Archive password**, that file is not readable again. Other Archives
> made with other passwords are unaffected.

### What the web host can see

*Gate: shipped. Required by the spec: hosted web copy separates app-shell and update
traffic from journal-data traffic, and "the app makes no network requests" never
appears here unqualified.*

> Opening the app in a browser means asking a web host for it, and that host can see an
> IP address, roughly when the request happened, and that the app was fetched. Checking
> for a new version is the same kind of request. This is true of every website you
> open, and it is true of this one.
>
> What the host does not receive is your journal. Entries, photos, notes and lab values
> are not sent to it, because there is nowhere for them to be sent.
>
> This is why you will not read "Gender Diary makes no network requests" on this site.
> Fetching the app is a network request. Your journal moving somewhere is not, and
> those are different sentences that a reader deserves to have kept apart.
>
> Installing from Google Play means Google records that your account installed this
> app. That is Google's, not ours, and no setting inside Gender Diary changes it.

### What none of this protects against

*Gate: shipped. Spec, at-rest encryption: the guarantee excludes memory inspection, a
compromised operating system and an already unlocked app.*

> If somebody already controls your device, none of this is what stands between them
> and your journal. An unlocked phone in somebody else's hands, an operating system
> that has been compromised, or the app sitting open in front of them are all outside
> what encryption at rest can do. Gender Diary does not claim otherwise, and you should
> be suspicious of anything that does.

### The policy itself

*Gate: Journal ticket 21, which writes the privacy policy and fixes the security
contact. This site presents them and may not run ahead of them. No copy here yet: this
paragraph is the handoff, not the text.*

---

## Claim annotations

Acceptance requires every claim on this page to be annotated with the behaviour it
rests on, so a later edit can tell what is still true. Evidence lives in the Journal
repository unless stated otherwise. This table is not gate authority; the Phase 2 spec,
under *Privacy and public claims*, is.

| Claim on the page | Rests on |
|---|---|
| The journal is a database on your device, with no account and no server copy | No backend exists. `adapter-static`, no networked feature, no registration path in onboarding |
| App lock puts a PIN in front of the app | Phase 1 ticket 17 |
| App lock is not encryption of what is stored | ADR-0014, which requires the lock screen never to imply at-rest encryption. Required counterweight, per the marketing context |
| A forgotten PIN has one way back, and it wipes the local journal | ADR-0014 |
| Wrong PIN attempts get a growing delay, with no automatic wipe on a counter | ADR-0014, including the reasoning about an accidental second way to lose everything |
| Everything on this page that hides things is off until you turn it on | The Journal's preference catalogue, where app lock, disguise, lock on leave and quick exit all default to false |
| The journal is encrypted at rest under a random key | ADR-0018, ADR-0020. Gated on Journal ticket 09 and its claim-gate test |
| Coverage includes side files, pre-migration copies, photos, thumbnails, temporary imports and sensitive boot data | Phase 2 spec, at-rest encryption. Photos specifically: per-file AES-256-GCM under the same data key, since whole-database encryption cannot reach files |
| A passphrase wraps the key rather than encrypting the journal, so it can be changed without re-encrypting | ADR-0018. Rewrap rather than re-encrypt is in the spec and in ticket 09's acceptance |
| The passphrase is required again after the browser session ends | Phase 2 spec, at-rest encryption |
| Android holds the key in the Keystore | Phase 2 spec. Gated on Journal tickets 11 and 13 |
| The Journal passphrase cannot be recovered | Phase 2 spec: no data-preserving recovery. Ticket 09 requires setup to say so; this page says it earlier |
| An Archive is encrypted under a password you choose before it leaves the app | ADR-0007. AES-256-GCM in chunks, Argon2id |
| An Archive password is a separate secret from the passphrase and the PIN | ADR-0013, which tunes Argon2id per consumer |
| An Archive's header is readable without the password, and identifies the format | ADR-0007: plaintext header carrying magic bytes, version, parameters and salt. The magic bytes are `47 44 49 41 52 59`, ASCII GDIARY |
| A lost Archive password makes that file unreadable, and affects no other Archive | ADR-0007. Each Archive derives its key from its own password and salt |
| The web host sees an IP address and that the app was fetched | How hosted web applications work. Required by the spec to be stated |
| Entries are not sent to a Gender Diary server | No server exists |
| "Makes no network requests" is never used unqualified | Phase 2 spec, privacy and public claims. The Journal's own About screen currently uses it, which is that repository's ticket 21 to fix and not a licence to repeat it here |
| Installing from Play means Google knows | Marketing context, objections |
| Memory inspection, a compromised operating system and an already unlocked app are out of scope | Phase 2 spec, at-rest encryption, final bullet |

## Fallback wording, if this page publishes before the encryption gate

The assumption is that Phase 2 lands first and this section is never used. It exists
because the alternative to a written fallback is somebody editing the live privacy page
in a hurry.

If the site goes live while Journal ticket 09 is unfinished, the *Encryption at rest*
block above does not appear at all, and this replaces it. The rest of the page stands
unchanged.

*Gate: shipped, and correct only while at-rest encryption has not passed its gate.*

> **The journal is not encrypted where it is stored, yet.** App lock limits access
> through the app. It is not encryption of the database, and somebody who can copy the
> files off your device can read what is in them. Encrypting the stored journal is
> being built, and this page will say so, name what it covers and name what it does
> not, once a test can show a copy of the closed files giving nothing up.

Two things to check when swapping this out: the *App lock* block above already says it
is not encryption, and must keep saying it in both states. And the sentence about a
passphrase that cannot be recovered belongs only to the encrypted state, since before
that gate there is no Journal passphrase to lose.

## Notes for later tickets

Ticket 05 writes the Polish. Not sentence by sentence from here. The security wording
is the part where a translation that is merely grammatical is not good enough: "nie
można odzyskać" has to be as final in Polish as "cannot be recovered" is in English,
and the difference between a gate in the interface and encryption of a file has to
survive. The marketing context's grammatical-gender section applies throughout, and
several sentences here address the reader in a way Polish cannot copy without picking a
gender for them.

Ticket 07 owns this page's title, description and canonical URL. The only claims
available to mark up are the ones marked shipped here, which excludes encryption at
rest until its gate passes.
