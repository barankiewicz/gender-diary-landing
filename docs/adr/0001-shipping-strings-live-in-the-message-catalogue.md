# A shipping string lives in the message catalogue, and the copy files stay the record

Every string a visitor reads is in `messages/en.json` and `messages/pl.json`. Nothing
under `content/` is read at build time or at run time. The copy files stay where the
copy tickets wrote it: they are the record of what the site claims, the authority on
which blocks may be published, and the only place a staged sentence exists.

A test binds the two, so the copy existing in two files is a checked duplication rather
than a quiet one. For every block in `content/<locale>/<page>.md`, the test reads the
gate marker above it and asserts the rendered page accordingly: a block marked
`Gate: shipped` has to appear on the page, and a block gated on anything else has to be
absent from both pages in that language.

## Why

Ticket 06 put the acquisition section's strings in the message catalogue and left the
gates and the reasoning in `content/*/landing.md`, then deferred the general question.
This settles it the same way, for every section of both pages, so there is nothing to
migrate.

The alternative was to render the markdown: parse `content/<locale>/<page>.md` at build
time, lift the blockquotes under a shipped gate, and have one copy of every sentence.
It was rejected on three counts.

The copy files are documents, not data. Their headings are commentary in English on both
the English and the Polish page, their gate markers are prose, and the hero carries two
rejected headline alternatives in the same section as the one that won. A build step
that told those apart would be inferring intent from formatting, and a copy ticket
adding a paragraph would move the page.

The page needs strings the copy files never carried. Section headings, the language and
theme labels, the channel names and the availability status have no blockquote anywhere,
and three of them already ship out of the catalogue. Markdown rendering would leave the
page reading from two places instead of one.

The catalogue is checked and the markdown would not be. `messages` is imported without a
type annotation on purpose, so a key present in English and missing in Polish is a
compile error. Strings lifted from prose are strings, and the Polish page would go
missing a paragraph at run time instead.

Rendering the markdown would also make the gate a property of a parser. The failure this
site has to prevent is a staged claim reaching a reader, and a test that reads the gates
from the copy files and looks for their text on a built page fails whatever the reason:
a bad edit to the catalogue, a bad edit to the copy, or a renderer that grew a bug. That
is a stronger guard than the one it replaces.

## Consequences

A copy change is two edits, in the copy file and in the catalogue, and the test fails
until both are made. That is the cost this decision accepts, and it is the reason the
test exists rather than a convention nobody enforces.

A gate marker has to be machine-readable, which it now is: a block publishes when its
marker opens `Gate: shipped` and the next character is a full stop or a comma. Anything
else, including a marker that qualifies the word ("shipped as far as the licence goes"),
holds the block back. Every blockquote in a copy file must sit under a marker; the parser
throws if one does not, rather than guessing.

`content/en/privacy.md` carries the claim annotations and `content/pl/privacy.md` the
parity table. Both keep working, because both refer to blocks by name and the blocks stay
where they are.
