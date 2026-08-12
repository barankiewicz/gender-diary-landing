/* Follows every link the built site offers and reports the ones that go
   nowhere. Runs in CI on its own (ticket 11), not as part of `npm test`: the
   browser tests are hermetic and stay that way, and this one is not, because
   half its job is to ask other people's servers whether a link still works.

   The link that matters most is Start journal. It leaves this origin for the
   Journal's, and it is the site's only primary action, so a page that looks
   perfect and sends everyone to a host that is not answering is the failure
   worth catching. Channel links are the same shape of problem and are checked
   the same way: nothing here has a list of channels in it, because a channel
   goes live by becoming an ordinary link on the page, and this reads the page.

   Everything internal is resolved against the built directory rather than
   requested, so the internal half of the check needs no server and no network
   and says the same thing on a laptop as in CI. */
import { readdir, readFile, stat } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { SITE_ORIGIN } from '../src/lib/site.ts';

const buildDirectory = fileURLToPath(new URL('../build', import.meta.url));

/* A browser's, because a store or a code host is entitled to refuse an
   anonymous script and that refusal is not a broken link. */
const USER_AGENT =
  'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0 Safari/537.36';

const files = (await readdir(buildDirectory, { recursive: true })).filter((entry) =>
  entry.endsWith('.html'),
);

/** Every href and src the built pages carry, with the page each one is on.
    Attribute values as written, so a report names what a reader would find in
    the source rather than something normalised past recognition. */
const links = new Map();
for (const file of files) {
  const html = await readFile(`${buildDirectory}/${file}`, 'utf8');
  const from = '/' + file.replace(/index\.html$/, '');
  for (const [, value] of html.matchAll(/(?:href|src)="([^"]+)"/g)) {
    if (value.startsWith('#') || value.startsWith('data:') || value.startsWith('mailto:')) continue;
    if (!links.has(value)) links.set(value, new Set());
    links.get(value).add(from);
  }
}

const problems = [];
const report = (target, detail) =>
  problems.push(`${target}\n    ${detail}\n    on ${[...links.get(target)].sort().join(', ')}`);

/** Whether the built directory answers this path, the way the host will: a
    path ending in a slash is served its index.html, anything else is a file. */
async function servedByTheBuild(pathname) {
  const decoded = decodeURIComponent(pathname);
  const file = decoded.endsWith('/') ? `${decoded}index.html` : decoded;
  return stat(`${buildDirectory}${file}`).then(
    (entry) => entry.isFile(),
    () => false,
  );
}

/** One request, and one retry, because a single timeout is a slow network far
    more often than it is a dead link, and a check nobody trusts gets muted. */
async function answers(url) {
  for (const attempt of [1, 2]) {
    try {
      const response = await fetch(url, {
        redirect: 'follow',
        headers: { 'user-agent': USER_AGENT },
        signal: AbortSignal.timeout(20_000),
      });
      await response.body?.cancel();
      return response.ok ? null : `answered ${response.status}`;
    } catch (error) {
      /* Node wraps a DNS, TLS or connection failure in a fetch error whose own
         message says only that it failed, and the cause is the part that names
         what went wrong. */
      const cause = error.cause?.message ? ` (${error.cause.message})` : '';
      if (attempt === 2) return `did not answer: ${error.message}${cause}`;
    }
  }
}

for (const target of [...links.keys()].sort()) {
  const url = new URL(target, `${SITE_ORIGIN}/`);
  const local = url.origin === SITE_ORIGIN;

  if (local) {
    if (!(await servedByTheBuild(url.pathname))) report(target, 'no such file in the build');
    continue;
  }

  const failure = await answers(url.href);
  if (failure) report(target, failure);
}

const external = [...links.keys()].filter(
  (target) => new URL(target, `${SITE_ORIGIN}/`).origin !== SITE_ORIGIN,
).length;

console.log(
  `links: ${links.size} across ${files.length} pages, ${external} of them off this origin`,
);
if (problems.length) {
  console.log(`\n${problems.length} broken:\n`);
  for (const problem of problems) console.log(`  ${problem}\n`);
  process.exit(1);
}
console.log('every link resolves');
