/* Writes the crawl policy beside the built pages, as the last step of
   `npm run build`: robots.txt always, sitemap.xml when the build is
   production, and a robots noindex in every page when it is not.

   SITE_ENV decides which build this is, and unset means preview, so a build
   is excluded from indexing unless the deploy making it says
   SITE_ENV=production out loud. Forgetting the variable on a new deploy path
   therefore yields an unindexed preview, never an indexed one.

   The exclusion is a meta noindex per page rather than a robots.txt
   Disallow, because a disallowed page is never crawled, its noindex is never
   read, and the bare URL can still end up indexed. Crawling stays open in
   both flavours; the sitemap generated from the built pages, and the pages
   themselves, are what differ.

   Everything is derived from the build directory and SITE_ORIGIN, so running
   the script again in the other flavour rewrites cleanly. The tests flip a
   single build both ways and rely on that. */
import { readdir, readFile, rm, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { SITE_ORIGIN } from '../src/lib/site.ts';

const production = process.env.SITE_ENV === 'production';
const buildDirectory = fileURLToPath(new URL('../build', import.meta.url));

const NOINDEX = '<meta name="robots" content="noindex">';

/** Every page the built site actually has, as origin-relative paths: the
    directories adapter-static gave an index.html, which is every prerendered
    page and nothing else. `_app` holds assets, not pages. */
const pages = (await readdir(buildDirectory, { recursive: true }))
  .filter((entry) => entry.split('/').pop() === 'index.html')
  .filter((entry) => !entry.split('/').includes('_app'))
  .map((entry) => '/' + entry.slice(0, -'index.html'.length))
  .sort();

for (const path of pages) {
  const file = `${buildDirectory}${path}index.html`;
  const html = await readFile(file, 'utf8');
  const flavoured = production
    ? html.replace(`<head>${NOINDEX}`, '<head>')
    : html.includes(NOINDEX)
      ? html
      : html.replace('<head>', `<head>${NOINDEX}`);
  if (flavoured !== html) await writeFile(file, flavoured);
}

const robots = production
  ? `User-agent: *\nDisallow:\n\nSitemap: ${SITE_ORIGIN}/sitemap.xml\n`
  : [
      '# Preview build. Every page carries a robots noindex, and crawling stays',
      '# open so it can be read. Production builds set SITE_ENV=production.',
      'User-agent: *',
      'Disallow:',
      '',
    ].join('\n');
await writeFile(`${buildDirectory}/robots.txt`, robots);

if (production) {
  const sitemap = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...pages.map((path) => `  <url><loc>${SITE_ORIGIN}${path}</loc></url>`),
    '</urlset>',
    '',
  ].join('\n');
  await writeFile(`${buildDirectory}/sitemap.xml`, sitemap);
} else {
  await rm(`${buildDirectory}/sitemap.xml`, { force: true });
}

console.log(
  production
    ? `crawl policy: production, ${pages.length} pages in the sitemap`
    : `crawl policy: preview, noindex on ${pages.length} pages, no sitemap`,
);
