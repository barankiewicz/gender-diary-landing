# Gender Diary landing site

The public site that explains Gender Diary and points people at the Journal.

Gender Diary is a local-first journal for tracking gender transition. It lives in a
separate repository and on a separate origin, and this site never shares storage,
a service worker or runtime code with it.

## Status

The structure is up and the copy is not written yet: every page reads "copy
pending" where its text will go. The specification and its tickets live in
`.scratch/`, which is not committed. Nothing here is deployed yet.

## Stack

SvelteKit with `adapter-static`, so the whole site is prerendered files and the
host serves nothing else. English at `/en/` and Polish at `/pl/`, each its own
document, with `/` sending a visitor to whichever of the two they last read or
their browser asks for. Light and dark follow `prefers-color-scheme` until
someone says otherwise; the stored choice is applied before the page paints.
Both preferences live in this origin's `localStorage` under `gd-landing-` keys
and are invisible to the Journal.

Deployment target is lh.pl managed hosting. No analytics, no cookies, no remote
fonts, no third-party scripts.

## Working on it

    npm run dev      # development server
    npm run check    # svelte-check
    npm test         # builds, then drives Chromium against the built files

The tests need a Chromium binary. They look for `/usr/bin/chromium-browser`;
set `CHROMIUM_PATH` if yours is elsewhere.

Copy lives in `messages/en.json` and `messages/pl.json`. The Polish is written
as Polish, not translated line by line from the English.

## License

To be added before the repository goes public. The application is GPLv3.
