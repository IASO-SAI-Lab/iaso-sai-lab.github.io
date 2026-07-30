/**
 * Resolves every internal link and asset reference in the build output against
 * the files actually generated, so a renamed page or a missing image fails the
 * build instead of the deployment.
 *
 * External URLs, mailto:, tel:, data:, and bare fragments are skipped. Fragment
 * targets within a page are not verified.
 *
 * Root-relative links are checked against `base`. A subpath deployment
 * therefore reports every hand-written "/research/"-style link that still
 * points at the server root — which is the check the README asks for when
 * setting Astro's `base` option.
 *
 * Usage: BASE_PATH=/repo node scripts/check-links.mjs [dist-dir]
 */

import { readdir, readFile, stat } from "node:fs/promises";
import { join, posix, relative, resolve } from "node:path";

const distDir = resolve(process.argv[2] ?? "dist");
const subpath = (process.env.BASE_PATH ?? "").replace(/^\/+|\/+$/g, "");
const base = subpath === "" ? "/" : `/${subpath}/`;

const skipped = /^(?:[a-z][a-z0-9+.-]*:|\/\/|#)/i;

async function htmlFiles(dir) {
  const found = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) found.push(...(await htmlFiles(path)));
    else if (entry.name.endsWith(".html")) found.push(path);
  }
  return found;
}

/** The URL path a generated file is served at, relative to the site root. */
function servedPath(file) {
  const rel = relative(distDir, file).split(/[\\/]/).join("/");
  return `/${rel}`;
}

async function exists(path) {
  try {
    return (await stat(path)).isFile();
  } catch {
    return false;
  }
}

/**
 * Maps a site-root path onto a file in dist, accepting both "/x/" and "/x"
 * for a directory-format page.
 */
async function resolves(sitePath) {
  const clean = sitePath.replace(/\/+$/, "");
  const candidates = [
    join(distDir, clean),
    join(distDir, clean, "index.html"),
    join(distDir, `${clean}.html`)
  ];
  if (clean === "") candidates.push(join(distDir, "index.html"));
  for (const candidate of candidates) {
    if (await exists(candidate)) return true;
  }
  return false;
}

function references(html) {
  const found = [];
  const attribute = /\s(href|src|poster)\s*=\s*"([^"]*)"/gi;
  let match;
  while ((match = attribute.exec(html)) !== null) {
    found.push(match[2]);
  }
  const srcset = /\ssrcset\s*=\s*"([^"]*)"/gi;
  while ((match = srcset.exec(html)) !== null) {
    for (const part of match[1].split(",")) {
      const url = part.trim().split(/\s+/)[0];
      if (url) found.push(url);
    }
  }
  return found;
}

const files = await htmlFiles(distDir);
const broken = [];
const missedBase = [];
let checked = 0;

for (const file of files) {
  const html = await readFile(file, "utf8");
  const from = servedPath(file);
  const pageDir = posix.dirname(from);

  for (const raw of new Set(references(html))) {
    const url = raw.trim();
    if (url === "" || skipped.test(url)) continue;

    const withoutHash = url.split("#")[0].split("?")[0];
    if (withoutHash === "") continue;

    let sitePath;
    if (withoutHash.startsWith("/")) {
      if (base !== "/" && !withoutHash.startsWith(base)) {
        missedBase.push({ file: relative(process.cwd(), file), url });
        continue;
      }
      sitePath = withoutHash;
    } else {
      sitePath = posix.resolve(pageDir, withoutHash);
    }

    // dist has no base prefix on disk, so strip it before resolving.
    const onDisk =
      base === "/" ? sitePath : `/${sitePath.slice(base.length)}`.replace(/^\/+/, "/");

    checked += 1;
    if (!(await resolves(onDisk))) {
      broken.push({ file: relative(process.cwd(), file), url });
    }
  }
}

console.log(
  `Checked ${checked} internal reference(s) across ${files.length} page(s) with base "${base}".`
);

if (missedBase.length > 0) {
  console.error(
    `\n${missedBase.length} root-relative link(s) do not start with the base "${base}". ` +
      "They will 404 on a subpath deployment:\n"
  );
  for (const item of missedBase.slice(0, 30)) {
    console.error(`  ${item.file}  →  ${item.url}`);
  }
  if (missedBase.length > 30) console.error(`  … and ${missedBase.length - 30} more`);
}

if (broken.length > 0) {
  console.error(`\n${broken.length} reference(s) do not resolve to a generated file:\n`);
  for (const item of broken.slice(0, 30)) {
    console.error(`  ${item.file}  →  ${item.url}`);
  }
  if (broken.length > 30) console.error(`  … and ${broken.length - 30} more`);
}

if (missedBase.length > 0 || broken.length > 0) process.exit(1);

console.log("All internal references resolve.");
