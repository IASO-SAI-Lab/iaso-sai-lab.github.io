/**
 * The pre-launch content gate described in the README.
 *
 * The severity follows `showSampleNotice` in src/config/lab.ts, which is the
 * site's own launch switch:
 *
 * - while it is `true` the site declares itself a preview, so sample strings
 *   are expected and this script only reports them;
 * - once it is `false` the flip asserts that every record and institutional
 *   detail is real, so any remaining sample string is a launch blocker and
 *   this script exits non-zero.
 *
 * Usage: node scripts/check-preview-content.mjs [dist-dir]
 */

import { readdir, readFile } from "node:fs/promises";
import { join, relative, resolve } from "node:path";

const distDir = resolve(process.argv[2] ?? "dist");
const configPath = resolve("src/config/lab.ts");

/** The strings the README tells you to search for before launch. */
const patterns = [
  /sample/i,
  /fictional/i,
  /illustrative/i,
  /preview/i,
  /\.example\b/i,
  /to confirm/i,
  /to be confirmed/i
];

async function htmlFiles(dir) {
  const found = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) found.push(...(await htmlFiles(path)));
    else if (entry.name.endsWith(".html")) found.push(path);
  }
  return found;
}

/**
 * Reads the launch switch without importing the TypeScript module. A missing
 * or unreadable flag is treated as "launched", so the gate fails closed.
 */
async function isPreviewBuild() {
  const source = await readFile(configPath, "utf8");
  const match = source.match(/showSampleNotice:\s*(true|false)\b/);
  if (!match) {
    console.error(
      `Could not read showSampleNotice from ${relative(process.cwd(), configPath)}.`
    );
    return false;
  }
  return match[1] === "true";
}

const preview = await isPreviewBuild();
const files = await htmlFiles(distDir);
const hits = [];

for (const file of files) {
  const lines = (await readFile(file, "utf8")).split("\n");
  lines.forEach((line, index) => {
    for (const pattern of patterns) {
      const match = line.match(pattern);
      if (!match) continue;
      hits.push({
        file: relative(process.cwd(), file),
        line: index + 1,
        term: match[0],
        context: line.trim().slice(0, 120)
      });
      break;
    }
  });
}

const byFile = new Map();
for (const hit of hits) {
  byFile.set(hit.file, (byFile.get(hit.file) ?? 0) + 1);
}

console.log(`Scanned ${files.length} HTML file(s) in ${relative(process.cwd(), distDir)}.`);

if (hits.length === 0) {
  console.log("No sample or unconfirmed content found.");
  process.exit(0);
}

console.log(`Found ${hits.length} hit(s) across ${byFile.size} file(s):\n`);
for (const [file, count] of [...byFile].sort((a, b) => b[1] - a[1])) {
  console.log(`  ${file} — ${count}`);
}

const terms = [...new Set(hits.map((hit) => hit.term.toLowerCase()))].sort();
console.log(`\nTerms: ${terms.join(", ")}`);

if (preview) {
  console.log(
    "\nshowSampleNotice is true, so this is a declared preview build and the " +
      "hits above are expected. Set it to false in src/config/lab.ts once the " +
      "content is real; this check then becomes a hard failure."
  );
  process.exit(0);
}

console.error(
  "\nshowSampleNotice is false, which asserts the content is real, but sample " +
    "strings remain in the build output. Replace the content above, or relax " +
    "the patterns in this script if a term is legitimate."
);
console.error("\nFirst 20 hits:\n");
for (const hit of hits.slice(0, 20)) {
  console.error(`  ${hit.file}:${hit.line}  [${hit.term}]  ${hit.context}`);
}
process.exit(1);
