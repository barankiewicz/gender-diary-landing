/* Chromium, a static file server and PASS/FAIL reporting for the browser
   tests. The Journal repository has a harness of the same shape; this one is
   deliberately its own copy, because the two repositories share no runtime
   code and this site has nothing to drive but files. */
import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { join, normalize, extname } from 'node:path';
import { chromium } from 'playwright-core';

const DEFAULT_CHROMIUM_PATH = '/usr/bin/chromium-browser';

/** Launches headless Chromium. Set CHROMIUM_PATH to point at a different
    binary instead of editing source. */
export function launchChromium(options = {}) {
  return chromium.launch({
    executablePath: process.env.CHROMIUM_PATH ?? DEFAULT_CHROMIUM_PATH,
    headless: true,
    ...options,
  });
}

const CONTENT_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.svg': 'image/svg+xml',
  '.woff2': 'font/woff2',
};

/* Serves the built directory the way the managed host will: a directory URL
   gets its index.html, a directory without the trailing slash is redirected to
   one, and anything missing is a 404. No dev server, no middleware, nothing
   that could make a test pass on machinery production does not have. */
export async function serveBuild(root) {
  const server = createServer((request, response) => {
    void (async () => {
      const pathname = decodeURIComponent(new URL(request.url, 'http://localhost').pathname);
      let file = join(root, normalize(pathname));

      if (!file.startsWith(root)) {
        response.writeHead(403).end();
        return;
      }

      const directory = await stat(file).then(
        (entry) => entry.isDirectory(),
        () => false,
      );
      if (directory && !pathname.endsWith('/')) {
        response.writeHead(301, { location: `${pathname}/` }).end();
        return;
      }
      if (directory) file = join(file, 'index.html');

      try {
        const body = await readFile(file);
        response.writeHead(200, {
          'content-type': CONTENT_TYPES[extname(file)] ?? 'application/octet-stream',
        });
        response.end(body);
      } catch {
        response.writeHead(404, { 'content-type': 'text/plain' }).end('not found');
      }
    })();
  });

  await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve));
  return { server, base: `http://127.0.0.1:${server.address().port}` };
}

/** Collects PASS/FAIL lines and the closing summary. */
export function createReporter() {
  let failures = 0;
  const ok = (name) => console.log('PASS', name);
  const fail = (name, detail) => {
    failures++;
    const message =
      detail instanceof Error ? (detail.message ?? String(detail)).split('\n')[0] : detail;
    console.log('FAIL', name, '-', message);
  };
  const finish = (passMessage) => {
    console.log(failures ? `\n${failures} FAILURE(S)` : `\n${passMessage}`);
    return failures;
  };
  return { ok, fail, finish };
}
