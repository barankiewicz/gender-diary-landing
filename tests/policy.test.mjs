/* Ticket 11. The production content policy travels inside the page, because
   lh.pl is managed hosting and a response header there is a request rather
   than a promise. That makes the policy testable here, before any deploy, and
   these tests are what stops it from being a policy the site cannot live
   under.

   The failure they exist for: a policy that forbids inline script is exactly
   right until somebody adds an inline script, and then the build still
   succeeds, the page still serves, and one thing on it quietly stops
   happening. A blocked theme stamp is a wrong-theme flash. A blocked gateway
   redirect is a page that stops sending anyone anywhere. Neither says a word
   unless something is watching the console.

   What is not testable here is whether the live origin sends the headers
   static/.htaccess asks for. That needs the site to exist and a curl against
   it - the ticket says so, and says why.

   Run with `npm test`, which builds first. */
import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { readdir, readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import config from '../svelte.config.js';
import { createReporter, launchChromium, serveBuild } from './browser-harness.mjs';

const buildDirectory = fileURLToPath(new URL('../build', import.meta.url));
const { server, base } = await serveBuild(buildDirectory);
const browser = await launchChromium();
const { ok, fail, finish } = createReporter();

const tests = [];
const test = (name, run) => tests.push({ name, run });

/** Every page the built site has, read off the built files rather than listed,
    so a page added later is covered here without anyone remembering to add it.
    Derived a second time rather than imported from scripts/crawl-policy.mjs,
    for the reason the same derivation is repeated in tests/site.test.mjs: a
    test that shares its subject's code stops being able to disagree with it. */
const pages = (await readdir(buildDirectory, { recursive: true }))
  .filter((entry) => entry.split('/').pop() === 'index.html')
  .filter((entry) => !entry.split('/').includes('_app'))
  .map((entry) => '/' + entry.slice(0, -'index.html'.length))
  .sort();

/** Opens a page and reports what the policy refused to load while it was
    there. `securitypolicyviolation` fires once per blocked resource and names
    the directive that blocked it, which is the whole signal: a console error
    would also catch every 404 the site has, and a browser asking for a
    favicon nobody made is not this test's business. */
async function violationsOn(path) {
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.addInitScript(() => {
    window.__violations = [];
    document.addEventListener('securitypolicyviolation', (event) => {
      window.__violations.push(`${event.violatedDirective} blocked ${event.blockedURI}`);
    });
  });

  await page.goto(`${base}${path}`);
  /* The gateway leaves for a language as soon as its script runs, and a
     violation raised on the way out is still a violation. Reading after the
     navigation settles is what makes this deterministic. */
  await page.waitForLoadState('networkidle');
  const violations = await page.evaluate(() => window.__violations);
  await context.close();
  return violations;
}

for (const path of pages) {
  test(`${path} runs under its own policy without anything being blocked`, async () => {
    const violations = await violationsOn(path);
    assert.deepEqual(violations, [], `the policy blocked something the page needs on ${path}`);
  });
}

test('every page carries the content policy and the referrer policy', async () => {
  for (const path of pages) {
    const html = await readFile(`${buildDirectory}${path}index.html`, 'utf8');
    const csp = html.match(/<meta http-equiv="content-security-policy" content="([^"]*)"/i)?.[1];
    assert.ok(csp, `${path} shipped without a content security policy`);

    /* The shape of the policy rather than its exact text, which changes with
       every inline script's hash. `default-src 'none'` is the assertion that
       matters: it is what makes every other directive an allowance rather
       than a suggestion, and it is what a third-party resource would have to
       get past. */
    assert.match(csp, /default-src 'none'/, `${path} left a default other than none`);
    assert.doesNotMatch(
      csp,
      /script-src[^;]*'unsafe-inline'/,
      `${path} allows any inline script, which is the policy not being one`,
    );
    assert.match(
      html,
      /<meta name="referrer" content="no-referrer"/,
      `${path} shipped without a referrer policy`,
    );
  }
});

test('only the two known things are parsed before the policy arrives', async () => {
  /* A policy in a meta element governs what follows it and nothing before it,
     and the policy arrives with %sveltekit.head%. Two things in src/app.html
     are deliberately above it: the theme stamp, which cannot move below the
     stylesheet without waiting on it, and the font preload beside it. Both are
     written in a source file rather than acquired at run time.

     What this test refuses is a third. The region above the policy is the one
     place on the site where a resource can be added and no policy will have an
     opinion, and it is invisible: a page with something new up there looks
     exactly like a page without it. */
  for (const path of pages) {
    const html = await readFile(`${buildDirectory}${path}index.html`, 'utf8');
    const unpoliced = html.slice(0, html.indexOf('http-equiv="content-security-policy"'));

    const scripts = unpoliced.match(/<script/g) ?? [];
    assert.equal(scripts.length, 1, `${path} has an ungoverned script beyond the theme stamp`);
    assert.match(unpoliced, /gd-landing-theme/, `${path}: the ungoverned script is not that one`);

    const links = unpoliced.match(/<link/g) ?? [];
    assert.equal(links.length, 1, `${path} loads something ungoverned beyond the font`);
    assert.match(unpoliced, /dm-sans/, `${path}: the ungoverned load is not the font`);
  }
});

test('the policy permits the pre-paint theme bootstrap', async () => {
  /* Vite sends the CSP as a response header in development, so the bootstrap
     is governed there even though the static host receives it before the
     policy meta element. Hash the source rather than copying a digest: a
     whitespace-only edit changes what the browser authorises. */
  const source = await readFile(fileURLToPath(new URL('../src/app.html', import.meta.url)), 'utf8');
  const bootstrap = source.match(/<script>([\s\S]*?)<\/script>/)?.[1];
  assert.ok(bootstrap, 'app.html has no pre-paint theme bootstrap');

  const hash = `sha256-${createHash('sha256').update(bootstrap).digest('base64')}`;
  assert.ok(
    config.kit.csp.directives['script-src'].includes(hash),
    'the configured response policy does not permit the theme bootstrap',
  );
  for (const path of pages) {
    const html = await readFile(`${buildDirectory}${path}index.html`, 'utf8');
    const csp = html.match(/<meta http-equiv="content-security-policy" content="([^"]*)"/i)?.[1];
    assert.ok(csp?.includes(`'${hash}'`), `${path} CSP does not permit the theme bootstrap`);
  }
});

test('the header file the host is asked to read is in the build', async () => {
  /* A dotfile in static/ is easy to lose: a build tool that skips them, or a
     deploy that excludes them, drops the headers without failing anything. */
  const htaccess = await readFile(`${buildDirectory}/.htaccess`, 'utf8');
  assert.match(htaccess, /Referrer-Policy/, 'the .htaccess stopped asking for a referrer policy');
  assert.match(htaccess, /frame-ancestors/, 'the .htaccess stopped refusing to be framed');
});

for (const { name, run } of tests) {
  try {
    await run();
    ok(name);
  } catch (error) {
    fail(name, error);
    if (process.env.VERBOSE) console.error(error);
  }
}

await browser.close();
server.close();
process.exit(finish('All landing-site policy tests passed'));
