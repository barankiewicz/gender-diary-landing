/* Reads the copy files under `content/` the way the gate markers ask to be
   read, so the tests take their expectations from what the copy tickets wrote
   rather than from a list somebody has to remember to update.

   The rule the files state, and this is the whole of it: everything inside a
   blockquote is copy, everything outside one is commentary, and the italic
   marker above a blockquote says whether it may be published. See
   docs/adr/0001. */
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const contentDirectory = fileURLToPath(new URL('../content/', import.meta.url));

/** A marker publishes its blocks when it opens `Gate: shipped` and stops
    there. `Gate: shipped, ADR-0007.` and `Gate: shipped, all eight.` are the
    same mark with a note after it. `Gate: shipped as far as the licence goes.`
    is not: it carries on qualifying the word, and what follows it names a
    condition that has not been met. Holding that block is the point of reading
    the character after `shipped` rather than the word alone. */
const publishes = (marker) => /^Gate: shipped[.,]/.test(marker);

const isHeading = (line) => line.startsWith('#');

/** A gate marker is a paragraph in italics from its first character to its
    last. `*Back to Journal tickets 09 and 10.*` is one of these and does not
    open with the word Gate, which is why this matches the shape rather than
    the wording. A paragraph with italics somewhere inside it is prose. */
function asMarker(paragraph) {
  const text = paragraph.join(' ');
  const italic = text.startsWith('*') && !text.startsWith('**') && text.endsWith('*');
  return italic ? text.slice(1, -1) : null;
}

/** Copy as a reader meets it: bold markers gone, wrapped lines joined, runs of
    whitespace flattened, so that comparing it against what a browser renders
    compares the words and nothing else. */
const flatten = (text) => text.replaceAll('**', '').replace(/\s+/g, ' ').trim();

/** Splits a paragraph into the sentences the gate test looks for one at a
    time. A block that lost half its sentences to an edit is still a block that
    published the other half. */
export function sentences(paragraph) {
  return paragraph
    .split(/(?<=[.!?])\s+/)
    .map((sentence) => sentence.trim())
    .filter(Boolean);
}

/**
 * Every blockquote in one copy file, in the order it appears, each carrying
 * the gate that governs it.
 *
 * @param {'en' | 'pl'} locale
 * @param {'landing' | 'privacy'} page
 * @returns {{ marker: string, publishes: boolean, paragraphs: string[] }[]}
 */
export function copyBlocks(locale, page) {
  const lines = readFileSync(`${contentDirectory}${locale}/${page}.md`, 'utf8').split('\n');
  const blocks = [];

  let marker = null;
  let paragraph = [];

  /* A heading clears the gate rather than letting the next section inherit
     one. Every section of every copy file states its own, so an inherited gate
     would mean somebody has added a block without saying whether it may be
     published, and the throw below is how they find out. */
  const close = () => {
    if (paragraph.length === 0) return;

    const found = asMarker(paragraph);
    if (found !== null) {
      marker = found;
    } else if (paragraph.every((line) => line.startsWith('>'))) {
      if (marker === null) {
        throw new Error(
          `content/${locale}/${page}.md: a blockquote sits under no gate marker: ${paragraph[0]}`,
        );
      }
      blocks.push({
        marker,
        publishes: publishes(marker),
        paragraphs: paragraph
          .map((line) => line.replace(/^>\s?/, ''))
          .join('\n')
          .split(/\n\s*\n/)
          .map(flatten)
          .filter(Boolean),
      });
    }

    paragraph = [];
  };

  for (const line of lines) {
    if (line.trim() === '') {
      close();
    } else if (isHeading(line)) {
      close();
      marker = null;
    } else {
      paragraph.push(line.trim());
    }
  }
  close();

  return blocks;
}
