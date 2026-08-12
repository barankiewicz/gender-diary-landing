# Play listing keywords, and why each one

The record ticket 08 owes a later audit: which terms the listing targets, where each
one sits, and what was rejected. Play has no hidden keyword field; everything indexed
is visible text, the title weighs most, then the short description, then the full
description, and Play's own guidance is natural language over density. No search
volume data went into this: there is no paid ASO tooling on this project, so volume
claims below are reasoning from the marketing context, not measurements. An audit
with real Play Console search data should revisit exactly these decisions.

## The strategy in one paragraph

The marketing context settles it: "transition tracker" is a thin shelf, and most of
this audience searches in the mood-tracker aisle and finds nothing with a place for
gender. So the listing spends the title, the strongest field, on the mood aisle where
the volume is, and covers the niche transition terms in the short description and
throughout the full description, where a low-competition term does not need title
weight to rank. The brand name itself already carries "gender" and "diary" into the
title for free, in English at least.

## English (en-US)

| Term | Where it sits | Why |
|---|---|---|
| gender | Title (brand), full description throughout | The category-defining word, free with the brand |
| diary | Title (brand), full description | Half the aisle searches "diary" rather than "tracker" |
| mood journal / mood | Title suffix, full description | The aisle the audience actually searches, per the marketing context |
| transition journal / transition | Short description lead, full description opening | The exact-fit term. First choice for the title suffix; does not fit in 30 with the brand |
| dysphoria, euphoria | Full description, scales sentence | High-intent, and already how the shipped app names the ends of Gender feeling |
| private / on your device / no account | Short and full description | The deciding concern for this audience. Stated as mechanism, never as a bare "private" adjective, per the voice rules |
| encrypted | Full description, Archive and at-rest blocks | Real term people search; every use names what is encrypted |
| Daylio | Full description, import sentence | Switchers search their old app's name; the import is real and merge-only |
| mood tracker | Full description, "Mood trackers are the right shape" | The aisle named in its own words, in a sentence that is honestly about the competition's shape |

## Polish (pl-PL)

Play indexes per locale, and the brand's English words do nothing for Polish queries,
so the Polish fields have to buy their own terms.

| Term | Where it sits | Why |
|---|---|---|
| tranzycja | Title suffix, short description, full description | The highest-intent Polish term this app honestly meets, and the one the brand covers least |
| dziennik | Short description, full description throughout | The Polish for both diary and journal, so it works twice as hard as either English token |
| nastrój / nastroju | Short description, full description | The Polish mood aisle. "dziennik nastroju" as a title suffix needs 31 of 30 characters, so the pair lands in the short description instead |
| dysforia, euforia | Full description, scales sentence | Same reasoning as English, same shipped labels |
| bez konta | Short and full description | The no-account claim in the words a Polish reader would type |
| zaszyfrowane / szyfrowanie | Full description | Same rule as English: only next to what it covers |
| Daylio | Full description | Brand-name searches are language-independent |

## Rejected, and the reasoning

| Candidate | Verdict |
|---|---|
| "transition journal" in the EN title | Does not fit: brand plus separator plus term is 32 of 30 characters. Went to the short description lead instead, which is also indexed |
| "trans journal" in the EN title | Fits at 27, and was runner-up. Rejected because the site's own register is "transition journal", and the marketing context bars presuming the reader's identity; a questioning reader is exactly who "trans" might tell this is not for them. "trans" still appears in indexed text as a palette name, which is honest and costs nothing |
| "dziennik nastroju" in the PL title | 31 of 30 with the brand. Moved to the short description |
| "dziennik trans" in the PL title | Fits, but "trans" as a bare Polish noun reads as trance before it reads as trans, and the identity-presumption point above applies |
| HRT / HTZ | Real search volume with exactly this audience, and rejected: the site's published copy never says HRT, and the listing may not claim or imply more than the site. If the site ever adds it, the listing should follow, not lead |
| offline, works offline | Gated. Journal ticket 03's acceptance boxes are unchecked and there is no service worker, so the claim is false today and stays out until the evidence exists |
| free, no ads, best | "free" and performance claims are prohibited by Play in titles and short descriptions. In the full description the facts appear as facts: free software under the GPLv3, no advertising, no telemetry |
| tracker (self-description) | The app calls itself a diary and a journal; "mood tracker" appears once, describing the aisle. Self-describing as a tracker would trade the register the whole site keeps for one more token |
| lgbt, lgbtq | Generic reach terms. The listing is not a community app and does not tag itself into a shelf it does not serve; the palette names already carry the specific words that are true |
| journal intime style calques in Polish | The Polish is written as Polish; no term went in because the English had one |

## Density note

Play's NLP penalises stuffing. The check applied here was reading the assembled text
aloud, not counting occurrences: every keyword above sits in a sentence that would
survive with the keyword swapped out, which is what "natural" means in practice. No
term was repeated for ranking's sake; "tranzycja" appears in the PL title and short
description because the two fields are read separately, and that is the only
deliberate repetition.
