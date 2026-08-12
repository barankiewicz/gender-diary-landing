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
    npm run links    # builds, then follows every link the built site offers

The tests need a Chromium binary. They look for `/usr/bin/chromium-browser`;
set `CHROMIUM_PATH` if yours is elsewhere.

`npm run links` is the one command here that talks to the network, which is why
it is not part of `npm test`. It fails while the Journal origin is not
answering, and saying so is its job.

Copy lives in `messages/en.json` and `messages/pl.json`. The Polish is written
as Polish, not translated line by line from the English.

## Deploying

`.github/workflows/deploy.yml` builds with `SITE_ENV=production` and uploads
`build/` to lh.pl over FTPS on every push to `main`. Nothing is built on the
server; the whole payload is prerendered files.

A pull request gets a preview build instead, attached to the run as an artifact.
Preview builds carry a robots noindex on every page and ship no sitemap, so an
unfinished page cannot reach a search result whatever is done with it. Download
it and open it with any static file server.

`scripts/lhpl-setup.sh` walks through the parts only a human can do: the domain
and its directory in the lh.pl panel, the certificate, the DNS record, and the
three FTP secrets plus the target directory in GitHub. Run it once, from the
repository root. The account password comes out of the wallet and is never
written to a file here.

The production content policy travels inside each page as a meta element rather
than only as a response header, because managed hosting can ignore an
`.htaccess` without telling anyone. `static/.htaccess` asks for the two things a
meta element cannot carry: the referrer policy as a real header, and a refusal
to be framed. What the live site actually sends has to be read off it:

    curl -sSI https://genderdiary.barankiewicz.dev/

## License

GPLv3, in [LICENSE](LICENSE). The application in the sibling repository is under
the same licence.
