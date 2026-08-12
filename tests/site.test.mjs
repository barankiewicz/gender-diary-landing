/* Black-box tests for ticket 02, driven against the built site served as
   plain files. They assert what a visitor gets - the URL they land on, the
   language of the document, the theme the page is painted in, what survives a
   reload - and never reach into component internals or class names.

   Run with `npm test`, which builds first. */
import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { readdir } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { createReporter, launchChromium, serveBuild } from './browser-harness.mjs';
import { copyBlocks, sentences } from './copy-source.mjs';

/* The origin the built pages name in their canonical and alternate links. It
   is provisional (spec, further notes), and changing it should be a deliberate
   edit here as well as in src/lib/site.ts. */
const SITE_ORIGIN = 'https://genderdiary.barankiewicz.dev';

/* The production Journal, on the origin it has to itself. Provisional in the
   same way, and decided by the Journal repository's ticket 01. The exact
   string is the assertion, for the reason given on JOURNAL_URL in
   src/lib/site.ts, and changing it there means changing it here. */
const JOURNAL_URL = 'https://app.genderdiary.barankiewicz.dev/';

/** The four Android channels, in the order the page lists them. The order is
    the opinion: the three that do not report an install to Google come first,
    alphabetically among themselves because nothing separates them, and Google
    Play comes last. The copy says so out loud rather than leaving the position
    to carry it. */
const CHANNELS = ['Aurora', 'F-Droid', 'Obtainium', 'Google Play'];

/** What a reader sees of the acquisition section, per language. */
const ACQUISITION = {
  en: {
    heading: 'How to get it',
    action: 'Start journal',
    status: 'Not available yet.',
    noAndroid: 'There is no Android app yet.',
  },
  pl: {
    heading: 'Skąd je wziąć',
    action: 'Otwórz dziennik',
    status: 'Jeszcze niedostępne.',
    noAndroid: 'Aplikacji na Androida jeszcze nie ma.',
  },
};

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

  /* Records the theme the document was painted in at its first frame. A theme
     applied after hydration would be recorded here as the wrong one, which is
     the flash a person would have seen. */
  await context.addInitScript(() => {
    requestAnimationFrame(() => {
      Object.assign(window, {
        firstFrameTheme: getComputedStyle(document.documentElement)
          .getPropertyValue('--theme')
          .trim(),
      });
    });
  });

  const page = await context.newPage();
  const requests = [];
  page.on('request', (request) => requests.push(request.url()));
  return { context, page, requests };
}

/** What the visitor is looking at: the theme the cascade settled on, whichever
    of the media query or a stored choice decided it. */
const themeNow = (page) =>
  page.evaluate(() =>
    getComputedStyle(document.documentElement).getPropertyValue('--theme').trim(),
  );

/** The theme at the first frame. The wait matters: `load` can fire before the
    first frame has been produced. */
async function firstFrameTheme(page) {
  await page.waitForFunction(() => window.firstFrameTheme !== undefined);
  return page.evaluate(() => window.firstFrameTheme);
}

const documentLanguage = (page) => page.evaluate(() => document.documentElement.lang);

/** The acquisition section, found by the heading a reader sees rather than by
    its position among the sections or by a class name. */
const acquisitionSection = (page, locale) =>
  page.locator('section').filter({
    has: page.getByRole('heading', { name: ACQUISITION[locale].heading }),
  });

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
  /* Scripting off, so the gateway can be read rather than redirecting out from
     under the assertions. These are static tags either way. */
  const { context, page } = await visitor({ javaScriptEnabled: false });
  try {
    for (const [path, canonical] of [
      ['/en/', `${SITE_ORIGIN}/en/`],
      ['/pl/', `${SITE_ORIGIN}/pl/`],
      ['/', `${SITE_ORIGIN}/`],
    ]) {
      await page.goto(base + path);
      const alternates = await page.evaluate(() =>
        Object.fromEntries(
          [...document.querySelectorAll('link[rel=alternate][hreflang]')].map((link) => [
            link.getAttribute('hreflang'),
            link.getAttribute('href'),
          ]),
        ),
      );
      assert.deepEqual(alternates, {
        en: `${SITE_ORIGIN}/en/`,
        pl: `${SITE_ORIGIN}/pl/`,
        'x-default': `${SITE_ORIGIN}/`,
      });
      assert.equal(await page.getAttribute('link[rel=canonical]', 'href'), canonical);
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

test('reading a link to the other language is not a choice to switch', async () => {
  const { context, page } = await visitor({ locale: 'en-US' });
  try {
    await page.goto(`${base}/en/`);
    await page.getByRole('link', { name: 'Polski' }).click();
    await page.waitForURL(`${base}/pl/`);

    // Somebody sends this person an English link. Reading it must not throw
    // away the Polish they chose.
    await page.goto(`${base}/en/`);
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
      assert.equal(await firstFrameTheme(page), scheme);
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
    assert.equal(
      await page.getByRole('button', { name: 'Dark' }).getAttribute('aria-pressed'),
      'true',
      'the control showed a different choice than the page was using',
    );

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
    assert.equal(await firstFrameTheme(page), 'dark', 'the first frame after a reload was light');
    assert.equal(await themeNow(page), 'dark', 'the theme changed after the page painted');
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
    assert.equal(await firstFrameTheme(page), 'dark', 'the stored choice outlived its removal');
  } finally {
    await context.close();
  }
});

// Acquisition: one action, and honest status for everything else

for (const locale of ['en', 'pl']) {
  test(`${locale}: the actions on the page, and where each one goes`, async () => {
    const { context, page } = await visitor({});
    try {
      await page.goto(`${base}/${locale}/`);

      /* This list was [privacy, Journal] until ticket 09. The splash now
         shows the four channel badges as buttons pointing at this page, on
         Alicja's direction (2026-08-12): design the page as if the product
         were finished. Each badge gets its real destination when its channel
         has an artifact (Journal ticket 18). Start journal appears twice, at
         the top for someone arriving convinced and in the acquisition
         section for someone who has just read their way to a decision, and
         both carry the bare URL and nothing else. */
      const links = await page.locator('main a').evaluateAll((found) => found.map((a) => a.href));
      assert.deepEqual(
        links,
        [
          JOURNAL_URL,
          ...CHANNELS.map(() => `${base}/${locale}/`),
          `${base}/${locale}/privacy/`,
          JOURNAL_URL,
        ],
        'main offered something besides the splash actions, the privacy page and Start journal',
      );

      const actions = page.getByRole('link', { name: ACQUISITION[locale].action });
      assert.equal(await actions.count(), 2, 'Start journal is the splash action and the closing one');
      for (const action of await actions.all()) {
        assert.equal(
          await action.getAttribute('href'),
          JOURNAL_URL,
          'the Journal link carries something it should not, or points somewhere else',
        );
        assert.equal(await action.getAttribute('target'), null, 'the action opened a second tab');
      }
    } finally {
      await context.close();
    }
  });

  test(`${locale}: a channel that is not live is status text, never a link`, async () => {
    const { context, page } = await visitor({});
    try {
      await page.goto(`${base}/${locale}/`);
      const section = acquisitionSection(page, locale);

      /* The sentence the whole section stands on. Four Android channels
         listed without it would read as an Android app somebody can have,
         and Journal ticket 11 says there is no Android project at all. It is
         asserted here because every other assertion below still passes with
         it deleted. */
      assert.ok(
        (await section.innerText()).includes(ACQUISITION[locale].noAndroid),
        'the page listed Android channels without saying there is no Android app',
      );

      const entries = section.getByRole('listitem');
      assert.equal(await entries.count(), CHANNELS.length, 'the channel list changed length');

      /* No channel is live: Journal ticket 18 is what produces the artifacts.
         When one of them goes live, this loop grows its other branch, and that
         branch asserts the rendered href resolves to the application ID
         `dev.barankiewicz.genderdiary` rather than to some other package. */
      for (const [index, name] of CHANNELS.entries()) {
        const entry = entries.nth(index);
        const text = await entry.innerText();
        assert.ok(text.startsWith(name), `channel ${index + 1} was not ${name}`);
        assert.ok(
          text.includes(ACQUISITION[locale].status),
          `${name} did not say whether it works yet`,
        );
        assert.equal(
          await entry.getByRole('link').count(),
          0,
          `${name} rendered as a link while there is nothing behind it`,
        );
      }
    } finally {
      await context.close();
    }
  });

  test(`${locale}: Aurora names the Play build and Obtainium names its source`, async () => {
    const { context, page } = await visitor({});
    try {
      await page.goto(`${base}/${locale}/`);
      const entries = acquisitionSection(page, locale).getByRole('listitem');

      const aurora = await entries.nth(CHANNELS.indexOf('Aurora')).innerText();
      assert.ok(
        aurora.includes('Google Play'),
        'Aurora was described without saying which build it installs',
      );

      /* The source, and only the source. Obtainium's artifact-name matching is
         deliberately not on the page: how to point a package manager at a
         repository is that package manager's documentation, and this section
         is about the product. */
      const obtainium = await entries.nth(CHANNELS.indexOf('Obtainium')).innerText();
      assert.ok(obtainium.includes('GitHub'), 'Obtainium was described without naming its source');
    } finally {
      await context.close();
    }
  });

  test(`${locale}: Google Play is listed last, and the page says why`, async () => {
    const { context, page } = await visitor({});
    try {
      await page.goto(`${base}/${locale}/`);
      const section = acquisitionSection(page, locale);

      /* The opinion is the point of the ordering, so a silent reorder back to
         alphabetical has to fail here rather than pass quietly. */
      const entries = section.getByRole('listitem');
      const last = await entries.nth(CHANNELS.length - 1).innerText();
      assert.ok(last.startsWith('Google Play'), 'Google Play was not the last channel listed');

      const play = await entries.nth(CHANNELS.indexOf('Google Play')).innerText();
      assert.ok(
        play.includes('Google'),
        'the Play entry did not say what installing from Play tells Google',
      );
    } finally {
      await context.close();
    }
  });
}

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

    /* Both instances of the one outbound link (the splash action and the
       acquisition section's, since ticket 09), and this is the list of them.
       A language or theme choice reaching the Journal would have to ride on
       an outbound link, so anyone adding another has to come here and say
       what it carries. This person chose dark and then English, and neither
       choice appears in what either link asks for. */
    const outbound = await page.evaluate(() =>
      [...document.querySelectorAll('a[href]')]
        .map((link) => link.href)
        .filter((href) => new URL(href).origin !== location.origin),
    );
    assert.deepEqual(outbound, [JOURNAL_URL, JOURNAL_URL]);

    assert.equal(await page.evaluate(() => document.cookie), '', 'the site set a cookie');
    assert.equal((await context.cookies()).length, 0);

    const keys = await page.evaluate(() => Object.keys(localStorage).sort());
    assert.deepEqual(keys, ['gd-landing-language', 'gd-landing-theme']);
  } finally {
    await context.close();
  }
});

// Without scripting

test('without scripting the page reads, in the system theme', async () => {
  const { context, page } = await visitor({
    locale: 'pl-PL',
    colorScheme: 'dark',
    javaScriptEnabled: false,
  });
  try {
    await page.goto(`${base}/pl/`);
    assert.equal(await documentLanguage(page), 'pl');
    assert.equal(await page.locator('main section').count(), sectionHeadings('pl').length);
    assert.equal(await themeNow(page), 'dark', 'a dark system theme got a light page');
    assert.equal(
      await page.locator('.theme-control').isVisible(),
      false,
      'a theme control that cannot work was left on screen',
    );
    assert.equal(
      await page
        .getByRole('link', { name: ACQUISITION.pl.action })
        .first()
        .getAttribute('href'),
      JOURNAL_URL,
      'the splash action needed scripting to work',
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

// Crawl policy: what sits beside the pages (ticket 14)

/* The page list, derived a second time from the built files. The derivation
   is the same shape the generator uses, so a bug in the shape itself would
   pass both sides; what this catches is a sitemap gone stale, or a generator
   that stopped running or skipped a page. */
async function builtPagePaths() {
  const entries = await readdir(buildDirectory, { recursive: true });
  return entries
    .filter((entry) => entry.split('/').pop() === 'index.html')
    .filter((entry) => !entry.split('/').includes('_app'))
    .map((entry) => '/' + entry.slice(0, -'index.html'.length))
    .sort();
}

/** Rewrites build/ into one flavour or the other, with the same script
    `npm run build` ends on. The script is deterministic, so flipping back
    restores exactly what the build produced. */
const crawlPolicy = (flavour) =>
  execFileSync(process.execPath, ['scripts/crawl-policy.mjs'], {
    cwd: fileURLToPath(new URL('..', import.meta.url)),
    env: { ...process.env, SITE_ENV: flavour },
  });

const NOINDEX = '<meta name="robots" content="noindex">';

const fetchText = async (path) => {
  const response = await fetch(base + path);
  return { status: response.status, body: response.ok ? await response.text() : '' };
};

test('a build not marked production is excluded from indexing', async () => {
  crawlPolicy('preview');

  for (const path of await builtPagePaths()) {
    const { body } = await fetchText(path);
    assert.ok(body.includes(NOINDEX), `${path} was served without a noindex`);
  }

  const robots = await fetchText('/robots.txt');
  assert.equal(robots.status, 200, 'a preview build shipped without a robots policy');
  assert.ok(!robots.body.includes('Sitemap:'), 'a preview build advertised a sitemap');
  assert.ok(
    !/^Disallow: \/$/m.test(robots.body),
    'the preview blocked crawling, which would hide the noindex that does the excluding',
  );

  assert.equal((await fetchText('/sitemap.xml')).status, 404, 'a preview build kept a sitemap');
});

test('a production build is indexable, sitemap and robots in agreement', async () => {
  try {
    crawlPolicy('production');

    // The worse direction of the two: production carrying the exclusion.
    for (const path of await builtPagePaths()) {
      const { body } = await fetchText(path);
      assert.ok(!/noindex/.test(body), `${path} carried a noindex into production`);
    }

    const robots = await fetchText('/robots.txt');
    assert.equal(robots.status, 200, 'production shipped without a robots policy');
    assert.ok(!/^Disallow: \/$/m.test(robots.body), 'production robots.txt blocked crawling');
    assert.ok(
      robots.body.includes(`Sitemap: ${SITE_ORIGIN}/sitemap.xml`),
      'robots.txt does not point at the sitemap',
    );

    const sitemap = await fetchText('/sitemap.xml');
    assert.equal(sitemap.status, 200, 'production build has no sitemap');
    const listed = [...sitemap.body.matchAll(/<loc>([^<]*)<\/loc>/g)].map(([, url]) => url).sort();

    // Exactly the pages the built site has, on the production origin,
    // and never with a language missing.
    assert.deepEqual(
      listed,
      (await builtPagePaths()).map((path) => SITE_ORIGIN + path),
    );
    for (const locale of ['en', 'pl']) {
      assert.ok(listed.includes(`${SITE_ORIGIN}/${locale}/`), `the sitemap lost /${locale}/`);
    }

    // Agreement the way a crawler sees it: everything listed is served.
    for (const url of listed) {
      const { status } = await fetchText(url.slice(SITE_ORIGIN.length));
      assert.equal(status, 200, `${url} is in the sitemap but not in the build`);
    }
  } finally {
    // Leave build/ the way `npm run build` produced it.
    crawlPolicy('preview');
  }
});

// The copy: what publishes, what stays staged, and what it says

/** The landing page's section headings, by what the section is. Named rather
    than positional, the way CHANNELS.indexOf is used above, so that inserting
    a section does not silently retarget the locator that finds another one.
    Acquisition keeps its heading in ACQUISITION, where it already was. */
const HEADINGS = {
  en: {
    overview: 'What Gender Diary is',
    privacy: "What it protects, and what it doesn't",
    tour: 'The screens',
    features: 'What it does',
    acquisition: ACQUISITION.en.heading,
    support: 'Support',
  },
  pl: {
    overview: 'Czym jest Gender Diary',
    privacy: 'Co chroni, a czego nie',
    tour: 'Ekrany',
    features: 'Co potrafi',
    acquisition: ACQUISITION.pl.heading,
    support: 'Pomoc',
  },
};

/** The order a reader meets them in. Written out rather than counted, so that
    a section quietly disappearing fails here and names itself. */
const SECTION_ORDER = ['overview', 'privacy', 'tour', 'features', 'acquisition', 'support'];
const sectionHeadings = (locale) => SECTION_ORDER.map((section) => HEADINGS[locale][section]);

/** The privacy page's own title, which is also the text of the link the
    landing page offers to it. */
const PRIVACY_TITLE = {
  en: 'What Gender Diary protects, and what it does not',
  pl: 'Co Gender Diary chroni, a czego nie chroni',
};

/** The hero headline, which is the one piece of the overview copy that is not
    inside a section and so is not covered by the heading assertions. */
const HEADLINE = {
  en: 'A transition journal that stays on your device.',
  pl: 'Dziennik tranzycji, który zostaje na twoim urządzeniu.',
};

/** The opening of the at-rest encryption block the fallback stands in for.
    Gated on Journal ticket 09 and asserted absent by name as well as by gate,
    because this is the one sentence on the site whose early publication would
    be a lie to somebody deciding what to trust. */
const GATED_AT_REST = { en: 'What is covered.', pl: 'Co obejmuje.' };

/** The wording that publishes in place of the at-rest encryption block, which
    is gated on Journal ticket 09 and its claim-gate test. Naming the sentence
    here rather than deriving it means an edit that swaps the two has to come
    through this file. */
const ENCRYPTION_FALLBACK = {
  en: 'The journal is not encrypted where it is stored, yet.',
  pl: 'Dziennik nie jest jeszcze szyfrowany tam, gdzie jest zapisany.',
};

/** The eight screens of the visual tour, by the name each caption is filed
    under in the copy files. Ticket 09 makes the screenshots. */
const TOUR = {
  en: [
    'Home',
    'An entry',
    'The month',
    'One day, twice',
    'Search',
    'Six months of one scale',
    'Milestones',
    'Export',
  ],
  pl: [
    'Ekran główny',
    'Wpis',
    'Miesiąc',
    'Jeden dzień, dwa wpisy',
    'Wyszukiwanie',
    'Pół roku jednej skali',
    'Kamienie milowe',
    'Eksport',
  ],
};

/* The paths `pathFor` builds in src/lib/site.ts, written out a second time
   here for the same reason SITE_ORIGIN and JOURNAL_URL are: a test that
   imported the thing it is checking would agree with a wrong answer. Adding a
   page means adding it in both places. */
const PAGE_PATHS = { landing: '', privacy: 'privacy/' };

/** Both pages of one language, as the words a visitor can read on them. */
async function readSite(page, locale) {
  const text = {};
  for (const [name, suffix] of Object.entries(PAGE_PATHS)) {
    await page.goto(`${base}/${locale}/${suffix}`);
    text[name] = (await page.locator('body').innerText()).replace(/\s+/g, ' ');
  }
  return text;
}

for (const locale of ['en', 'pl']) {
  test(`${locale}: a staged block never reaches a page`, async () => {
    const { context, page } = await visitor({});
    try {
      const text = await readSite(page, locale);
      const site = `${text.landing} ${text.privacy}`;

      const staged = Object.keys(PAGE_PATHS).flatMap((name) =>
        copyBlocks(locale, name)
          .filter((block) => !block.publishes)
          .map((block) => ({ ...block, name })),
      );
      assert.ok(staged.length > 0, 'no staged blocks were found, so this proved nothing');

      /* Sentence by sentence as well as whole paragraph, because a block that
         published half of itself published half of itself. The floor keeps a
         fragment too short to be distinctive from failing this on a collision
         with unrelated copy, and the count afterwards is what stops the floor
         swallowing a whole paragraph and reporting a pass. */
      for (const block of staged) {
        for (const paragraph of block.paragraphs) {
          let checked = 0;
          for (const sentence of [paragraph, ...sentences(paragraph)]) {
            if (sentence.length < 20) continue;
            checked++;
            assert.ok(
              !site.includes(sentence),
              `${block.name}: a sentence gated on "${block.marker.split('.')[0]}" is on the site: ${sentence}`,
            );
          }
          assert.ok(checked > 0, `${block.name}: nothing was long enough to check in: ${paragraph}`);
        }
      }
    } finally {
      await context.close();
    }
  });

  test(`${locale}: every shipped block is on its page, word for word`, async () => {
    /* Scripting off, so this is also the check that the copy is in the file a
       visitor is served rather than something hydration puts there. */
    const { context, page } = await visitor({ javaScriptEnabled: false });
    try {
      const text = await readSite(page, locale);

      for (const name of Object.keys(PAGE_PATHS)) {
        const shipped = copyBlocks(locale, name).filter((block) => block.publishes);
        assert.ok(shipped.length > 0, `no shipped blocks in content/${locale}/${name}.md`);

        for (const block of shipped) {
          for (const paragraph of block.paragraphs) {
            assert.ok(
              text[name].includes(paragraph),
              `${name}: shipped copy is missing or reworded: ${paragraph.slice(0, 70)}`,
            );
          }
        }
      }
    } finally {
      await context.close();
    }
  });

  test(`${locale}: the landing page renders every section`, async () => {
    const { context, page } = await visitor({});
    try {
      await page.goto(`${base}/${locale}/`);
      const headings = await page
        .locator('main section > h2')
        .evaluateAll((found) => found.map((h) => h.textContent.trim()));
      assert.deepEqual(headings, sectionHeadings(locale));

      assert.equal(await page.locator('main h1').innerText(), 'Gender Diary');
      assert.ok(
        (await page.locator('main').innerText()).includes(HEADLINE[locale]),
        'the hero headline is not on the page',
      );
    } finally {
      await context.close();
    }
  });

  test(`${locale}: the tour is eight captions and no picture`, async () => {
    const { context, page } = await visitor({});
    try {
      await page.goto(`${base}/${locale}/`);
      const tour = page.locator('section').filter({
        has: page.getByRole('heading', { name: HEADINGS[locale].tour }),
      });

      const screens = await tour
        .locator('li > h3')
        .evaluateAll((found) => found.map((h) => h.textContent.trim()));
      assert.deepEqual(screens, TOUR[locale]);

      /* The screenshots do not exist yet: ticket 09 shipped the tour's design
         with each card reserving the frame its screenshot will occupy, and
         ticket 15 captures them from invented data. Until it does, no card
         shows a picture or an alt text claiming one. */
      assert.equal(await tour.locator('img').count(), 0, 'the tour claimed a picture');
    } finally {
      await context.close();
    }
  });

  test(`${locale}: the privacy page is its own indexable location`, async () => {
    /* Scripting off: the second page has to be reachable and readable without
       it, like the first. */
    const { context, page } = await visitor({ javaScriptEnabled: false });
    try {
      await page.goto(`${base}/${locale}/`);
      await page.getByRole('link', { name: PRIVACY_TITLE[locale] }).click();
      await page.waitForURL(`${base}/${locale}/privacy/`);

      assert.equal(await documentLanguage(page), locale);
      assert.equal(await page.locator('main h1').innerText(), PRIVACY_TITLE[locale]);

      const alternates = await page.evaluate(() =>
        Object.fromEntries(
          [...document.querySelectorAll('link[rel=alternate][hreflang]')].map((link) => [
            link.getAttribute('hreflang'),
            link.getAttribute('href'),
          ]),
        ),
      );
      assert.deepEqual(alternates, {
        en: `${SITE_ORIGIN}/en/privacy/`,
        pl: `${SITE_ORIGIN}/pl/privacy/`,
        'x-default': `${SITE_ORIGIN}/en/privacy/`,
      });
      assert.equal(
        await page.getAttribute('link[rel=canonical]', 'href'),
        `${SITE_ORIGIN}/${locale}/privacy/`,
      );
    } finally {
      await context.close();
    }
  });

  test(`${locale}: the privacy page says the journal is not encrypted yet`, async () => {
    const { context, page } = await visitor({});
    try {
      await page.goto(`${base}/${locale}/privacy/`);
      const text = await page.locator('main').innerText();

      assert.ok(
        text.includes(ENCRYPTION_FALLBACK[locale]),
        'the privacy page did not carry the fallback encryption wording',
      );
      /* The claim the fallback stands in for. It is asserted by name as well
         as by gate, because this is the one sentence on the site whose early
         publication would be a lie to somebody deciding what to trust. */
      assert.ok(
        !text.includes(GATED_AT_REST[locale]),
        'the gated at-rest encryption block reached the privacy page',
      );
    } finally {
      await context.close();
    }
  });
}

test('switching language on the privacy page stays on the privacy page', async () => {
  const { context, page } = await visitor({ javaScriptEnabled: false });
  try {
    await page.goto(`${base}/en/privacy/`);
    await page.getByRole('link', { name: 'Polski' }).click();
    await page.waitForURL(`${base}/pl/privacy/`);
    assert.equal(await documentLanguage(page), 'pl');
    assert.equal(await page.locator('main h1').innerText(), PRIVACY_TITLE.pl);

    // And back out to the landing page in the language the reader is now in.
    await page.getByRole('link', { name: 'Gender Diary' }).click();
    await page.waitForURL(`${base}/pl/`);
  } finally {
    await context.close();
  }
});

test('the two languages gate the same blocks in the same order', () => {
  for (const name of Object.keys(PAGE_PATHS)) {
    const gates = (locale) => copyBlocks(locale, name).map((block) => block.publishes);
    assert.deepEqual(
      gates('pl'),
      gates('en'),
      `content/pl/${name}.md and content/en/${name}.md do not match block for block`,
    );
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
