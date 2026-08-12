/* Renders `static/social-card.png`, the picture every link preview of this
   site shows.

   Run by hand, `node scripts/social-card.mjs`, and commit the file it writes.
   The build does not run it: a committed PNG means a deploy needs no browser,
   and it means the picture cannot change without somebody looking at the
   change. Re-run it when the palette, the font or the wordmark move.

   What is on the card is the wordmark and the aurora behind it, and nothing
   else. The reasoning is on SOCIAL_CARD in src/lib/site.ts. The colours and
   the type are the dark theme's, read off src/lib/styles/base.css by hand
   because this is a picture rather than a page and nothing here goes through
   the cascade; a token that moves there has to be copied here, which is the
   cost of the file being static.

   The font arrives as a data URI so the page renders from a string with no
   server and no network. Chromium comes from the same launcher the browser
   tests use, so CHROMIUM_PATH works here too. */
import { readFile, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { launchChromium } from '../tests/browser-harness.mjs';

const WIDTH = 1200;
const HEIGHT = 630;

const root = new URL('../', import.meta.url);
const font = await readFile(new URL('static/fonts/space-grotesk.woff2', root));

const card = `<!doctype html>
<html>
  <head>
    <meta charset="utf-8" />
    <style>
      @font-face {
        font-family: 'Space Grotesk';
        src: url(data:font/woff2;base64,${font.toString('base64')}) format('woff2');
        font-weight: 300 700;
      }

      html,
      body {
        margin: 0;
        width: ${WIDTH}px;
        height: ${HEIGHT}px;
      }

      body {
        position: relative;
        overflow: hidden;
        background: #0c0f16;
        font-family: 'Space Grotesk';
        display: grid;
        align-content: center;
        padding-left: 96px;
      }

      /* The hero's three blobs, parked where their drift would start. */
      .blob {
        position: absolute;
        border-radius: 50%;
        filter: blur(70px);
      }

      .blob-a {
        width: 660px;
        height: 660px;
        right: -144px;
        top: -216px;
        background: radial-gradient(circle, rgba(91, 206, 250, 0.42), transparent 65%);
      }

      .blob-b {
        width: 576px;
        height: 576px;
        right: 48px;
        bottom: -192px;
        background: radial-gradient(circle, rgba(245, 169, 184, 0.42), transparent 65%);
      }

      .blob-c {
        width: 360px;
        height: 360px;
        right: 144px;
        top: 176px;
        background: radial-gradient(circle, rgba(242, 243, 247, 0.2), transparent 60%);
      }

      /* The site's own wordmark, at the size a card can afford: the same
         weight, tracking and gradient as the h1 on every page. */
      .wordmark {
        position: relative;
        margin: 0;
        font-size: 104px;
        font-weight: 700;
        letter-spacing: 0.04em;
        background: linear-gradient(92deg, #5bcefa, #f5a9b8);
        background-clip: text;
        color: transparent;
        width: fit-content;
      }
    </style>
  </head>
  <body>
    <div class="blob blob-a"></div>
    <div class="blob blob-b"></div>
    <div class="blob blob-c"></div>
    <p class="wordmark">Gender Diary</p>
  </body>
</html>`;

const browser = await launchChromium();
const page = await browser.newPage({ viewport: { width: WIDTH, height: HEIGHT } });
await page.setContent(card, { waitUntil: 'load' });
await page.evaluate(() => document.fonts.ready);
const png = await page.screenshot({ type: 'png' });
await browser.close();

const file = fileURLToPath(new URL('static/social-card.png', root));
await writeFile(file, png);
console.log(`social card: ${WIDTH}x${HEIGHT}, ${(png.length / 1024).toFixed(1)} kB, ${file}`);
