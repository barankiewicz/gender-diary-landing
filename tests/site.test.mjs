/* Black-box tests for ticket 02, driven against the built site served as
   plain files. They assert what a visitor gets - the URL they land on, the
   language of the document, the theme at the first frame, what survives a
   reload - and never reach into component internals or class names.

   Run with `npm test`, which builds first. */
import assert from 'node:assert/strict';
import { fileURLToPath } from 'node:url';
import { createReporter, launchChromium, serveBuild } from './browser-harness.mjs';

const buildDirectory = fileURLToPath(new URL('../build', import.meta.url));
const { server, base } = await serveBuild(buildDirectory);
const browser = await launchChromium();
const { ok, fail, finish } = createReporter();

const tests = [];
const test = (name, run) => tests.push({ name, run });

/** One visitor: their browser language, their system colour scheme, and
    whether scripting works for them at all. */
async function visitor({ locale = 'en-US', colorScheme = 'light', javaScriptEnabled = true }) {
  const context = await browser.newContext({ locale, colorScheme, javaScriptEnabled });

  /* Watches the theme in every document from before its first script runs:
     what it was at the first frame, and every change to it. A theme applied
     after hydration shows up here as the wrong value at the first frame and as
     a change recorded after it - which together are the flash a person would
     have seen. The observer is attached to `document` rather than to
     `documentElement`, which the parser may not have created yet. */
  await context.addInitScript(() => {
    Object.assign(window, { themeChanges: [], changesBeforeFirstFrame: -1 });
    new MutationObserver((records) => {
      for (const _ of records) window.themeChanges.push(document.documentElement.dataset.theme);
    }).observe(document, { subtree: true, attributes: true, attributeFilter: ['data-theme'] });

    requestAnimationFrame(() => {
      window.changesBeforeFirstFrame = window.themeChanges.length;
      window.firstFrameTheme = document.documentElement.dataset.theme;
    });
  });

  const page = await context.newPage();
  const requests = [];
  page.on('request', (request) => requests.push(request.url()));
  return { context, page, requests };
}

const themeNow = (page) => page.evaluate(() => document.documentElement.dataset.theme);
const documentLanguage = (page) => page.evaluate(() => document.documentElement.lang);

/** The theme at the first frame, and whether the theme changed after it. The
    wait matters: `load` can fire before the first frame has been produced. */
async function firstPaint(page) {
  await page.waitForFunction(() => window.changesBeforeFirstFrame >= 0);
  return page.evaluate(() => ({
    theme: window.firstFrameTheme,
    changedAfterFirstFrame: window.themeChanges.slice(window.changesBeforeFirstFrame),
  }));
}

// Language: where a first visit lands

for (const [locale, expected] of [
  ['en-US', 'en'],
  ['pl-PL', 'pl'],
  ['de-DE', 'en'],
]) {
  test(`a first visit from ${locale} lands on /${expected}/`, async () => {
    const { context, page } = await visitor({ locale });
    try {
      await page.goto(`${base}/`);
      await page.waitForURL(`${base}/${expected}/`);
      assert.equal(await documentLanguage(page), expected);
    } finally {
      await context.close();
    }
  });
}

test('each language is a stable location that serves itself', async () => {
  const { context, page } = await visitor({ locale: 'de-DE' });
  try {
    for (const locale of ['en', 'pl']) {
      const response = await page.goto(`${base}/${locale}/`);
      assert.equal(response.status(), 200);
      assert.equal(page.url(), `${base}/${locale}/`, 'a direct visit is not redirected away');
      assert.equal(await documentLanguage(page), locale);
      assert.equal(await page.locator('main h1').innerText(), 'Gender Diary');
    }
  } finally {
    await context.close();
  }
});

test('each language points at the other one and at the gateway', async () => {
  const { context, page } = await visitor({});
  try {
    for (const locale of ['en', 'pl']) {
      await page.goto(`${base}/${locale}/`);
      const alternates = await page.evaluate(() =>
        Object.fromEntries(
          [...document.querySelectorAll('link[rel=alternate][hreflang]')].map((link) => [
            link.getAttribute('hreflang'),
            link.getAttribute('href'),
          ]),
        ),
      );
      assert.deepEqual(Object.keys(alternates).sort(), ['en', 'pl', 'x-default']);
      assert.match(alternates.en, /\/en\/$/);
      assert.match(alternates.pl, /\/pl\/$/);
      assert.match(alternates['x-default'], /\/$/);

      const canonical = await page.getAttribute('link[rel=canonical]', 'href');
      assert.match(canonical, new RegExp(`/${locale}/$`));
    }
  } finally {
    await context.close();
  }
});

// Language: the visible control, and what it leaves behind

test('the language control switches language and is remembered', async () => {
  const { context, page } = await visitor({ locale: 'en-US' });
  try {
    await page.goto(`${base}/en/`);
    await page.getByRole('link', { name: 'Polski' }).click();
    await page.waitForURL(`${base}/pl/`);
    assert.equal(await documentLanguage(page), 'pl');

    // The browser still asks for English; the choice made here outranks it.
    await page.goto(`${base}/`);
    await page.waitForURL(`${base}/pl/`);
  } finally {
    await context.close();
  }
});

// Theme: where a first visit starts, and the control that overrides it

for (const scheme of ['dark', 'light']) {
  test(`a first visit with a ${scheme} system theme starts ${scheme}`, async () => {
    const { context, page } = await visitor({ colorScheme: scheme });
    try {
      await page.goto(`${base}/en/`);
      assert.equal((await firstPaint(page)).theme, scheme);
      assert.equal(await themeNow(page), scheme);
    } finally {
      await context.close();
    }
  });
}

test('the theme control overrides the system theme and is remembered', async () => {
  const { context, page } = await visitor({ colorScheme: 'light' });
  try {
    await page.goto(`${base}/en/`);
    await page.getByRole('button', { name: 'Dark' }).click();
    assert.equal(await themeNow(page), 'dark');

    await page.reload();
    assert.equal(await themeNow(page), 'dark');

    // And it travels with the person to the other language, same origin.
    await page.goto(`${base}/pl/`);
    assert.equal(await themeNow(page), 'dark');
  } finally {
    await context.close();
  }
});

test('a reload with a stored dark choice never paints light', async () => {
  const { context, page } = await visitor({ colorScheme: 'light' });
  try {
    await page.goto(`${base}/en/`);
    await page.getByRole('button', { name: 'Dark' }).click();

    await page.reload();
    const { theme, changedAfterFirstFrame } = await firstPaint(page);
    assert.equal(theme, 'dark', 'the first frame after a reload was not dark');
    assert.deepEqual(changedAfterFirstFrame, [], 'the theme was corrected after the page painted');
    assert.equal(await themeNow(page), 'dark');
  } finally {
    await context.close();
  }
});

test('choosing system hands the theme back to the system', async () => {
  const { context, page } = await visitor({ colorScheme: 'dark' });
  try {
    await page.goto(`${base}/en/`);
    await page.getByRole('button', { name: 'Light' }).click();
    assert.equal(await themeNow(page), 'light');

    await page.getByRole('button', { name: 'System' }).click();
    assert.equal(await themeNow(page), 'dark');

    await page.reload();
    assert.equal((await firstPaint(page)).theme, 'dark', 'the stored choice outlived its removal');
  } finally {
    await context.close();
  }
});

// Isolation: what the site writes, and what it talks to

test('the site keeps to its own origin and its own storage', async () => {
  const { context, page, requests } = await visitor({ locale: 'pl-PL' });
  try {
    await page.goto(`${base}/`);
    await page.waitForURL(`${base}/pl/`);
    await page.getByRole('button', { name: 'Ciemny' }).click();
    await page.getByRole('link', { name: 'English' }).click();
    await page.waitForURL(`${base}/en/`);

    const foreign = requests.filter((url) => !url.startsWith(base));
    assert.deepEqual(foreign, [], 'the page requested something off this origin');

    assert.equal(await page.evaluate(() => document.cookie), '', 'the site set a cookie');
    assert.deepEqual((await context.cookies()).length, 0);

    const keys = await page.evaluate(() => Object.keys(localStorage).sort());
    assert.deepEqual(keys, ['gd-landing-language', 'gd-landing-theme']);
  } finally {
    await context.close();
  }
});

// Without scripting

test('without scripting the page reads and the language links still work', async () => {
  const { context, page } = await visitor({ locale: 'pl-PL', javaScriptEnabled: false });
  try {
    await page.goto(`${base}/pl/`);
    assert.equal(await documentLanguage(page), 'pl');
    assert.equal(await page.locator('main section').count(), 3);
    assert.equal(
      await page.locator('.theme-control').isVisible(),
      false,
      'a theme control that cannot work was left on screen',
    );

    await page.getByRole('link', { name: 'English' }).click();
    await page.waitForURL(`${base}/en/`);
    assert.equal(await documentLanguage(page), 'en');

    // The gateway is a page with two links when nothing can redirect from it.
    await page.goto(`${base}/`);
    assert.equal(await page.getByRole('link', { name: 'Polski' }).count(), 1);
  } finally {
    await context.close();
  }
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
process.exit(finish('All landing-site browser tests passed'));
