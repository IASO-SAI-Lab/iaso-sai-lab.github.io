/**
 * Smoke test against the built site. Starts `astro preview`, drives it with
 * Playwright, and tears the server down again.
 *
 * For each route it asserts a 200, a rendered <h1>, and a clean console. The
 * search page additionally has to load and report its static JSON index, since
 * that is the one feature on the site that depends on client-side scripting.
 *
 * Usage: BASE_PATH=/repo node scripts/smoke.mjs
 */

import { spawn } from "node:child_process";
import { chromium } from "playwright";

const port = Number(process.env.PORT ?? 4321);
const origin = `http://127.0.0.1:${port}`;
const subpath = (process.env.BASE_PATH ?? "").replace(/^\/+|\/+$/g, "");
const base = subpath === "" ? "/" : `/${subpath}/`;

/** One route per template, so a broken layout cannot slip through. */
const routes = [
  "",
  "research/",
  "research/federated-distributed-learning/",
  "papers/",
  "papers/calibrated-assistance-under-shift/",
  "prototypes/",
  "prototypes/cohort-lens/",
  "members/",
  "members/elena-marin/",
  "events/",
  "news/",
  "search/",
  "privacy/",
  "accessibility/"
];

const url = (route) => `${origin}${base}${route}`;

/** Server output, replayed only if the server never becomes reachable. */
const serverLog = [];

function startPreview() {
  // detached puts the server in its own process group so the whole group can be
  // signalled on teardown; a preview server left holding the port would hang CI.
  const child = spawn(
    "npx",
    ["astro", "preview", "--port", String(port), "--host", "127.0.0.1"],
    { stdio: ["ignore", "pipe", "pipe"], detached: true }
  );
  for (const stream of [child.stdout, child.stderr]) {
    stream.on("data", (chunk) => serverLog.push(String(chunk)));
  }
  return child;
}

function stopPreview(child) {
  if (child.exitCode !== null || child.signalCode !== null) return;
  try {
    process.kill(-child.pid, "SIGTERM");
  } catch {
    child.kill("SIGTERM");
  }
}

async function waitForServer(timeoutMs = 30_000) {
  const deadline = Date.now() + timeoutMs;
  while (Date.now() < deadline) {
    try {
      const response = await fetch(url(""));
      if (response.ok) return;
    } catch {
      // Server is not accepting connections yet.
    }
    await new Promise((done) => setTimeout(done, 300));
  }
  console.error(serverLog.join(""));
  throw new Error(`Preview server did not answer on ${origin} within ${timeoutMs}ms.`);
}

const failures = [];
const server = startPreview();
let browser;

// If this process is cancelled, take the server down with it.
for (const signal of ["SIGINT", "SIGTERM"]) {
  process.on(signal, () => {
    stopPreview(server);
    process.exit(1);
  });
}

try {
  await waitForServer();
  browser = await chromium.launch();
  const context = await browser.newContext();

  for (const route of routes) {
    const target = url(route);
    const page = await context.newPage();
    const noise = [];
    page.on("console", (message) => {
      if (message.type() === "error") noise.push(message.text());
    });
    page.on("pageerror", (error) => noise.push(String(error)));

    try {
      const response = await page.goto(target, { waitUntil: "load" });
      const status = response?.status();
      if (status !== 200) {
        failures.push(`${target} — expected 200, got ${status}`);
      }

      const heading = await page.locator("h1").first().textContent({ timeout: 5_000 });
      if (!heading || heading.trim() === "") {
        failures.push(`${target} — no <h1> text`);
      }

      if (route === "search/") {
        await page
          .locator("#search-status")
          .filter({ hasText: /ready to search/ })
          .waitFor({ timeout: 10_000 });
      }

      if (noise.length > 0) {
        failures.push(`${target} — console errors: ${noise.join(" | ")}`);
      }

      console.log(`  ok  ${base}${route}`);
    } catch (error) {
      failures.push(`${target} — ${error.message.split("\n")[0]}`);
      console.log(`  FAIL  ${base}${route}`);
    } finally {
      await page.close();
    }
  }

  // A missing page must serve the 404 template, not an empty body.
  const page = await context.newPage();
  const response = await page.goto(url("no-such-page/"), { waitUntil: "load" });
  if (response?.status() !== 404) {
    failures.push(`${url("no-such-page/")} — expected 404, got ${response?.status()}`);
  } else if (!(await page.locator("h1").first().textContent({ timeout: 5_000 }))) {
    failures.push("404 page renders no <h1>");
  } else {
    console.log(`  ok  404 template`);
  }
  await page.close();
} finally {
  await browser?.close();
  stopPreview(server);
}

if (failures.length > 0) {
  console.error(`\n${failures.length} smoke failure(s):\n`);
  for (const failure of failures) console.error(`  ${failure}`);
  process.exit(1);
}

console.log(`\nAll ${routes.length + 1} smoke check(s) passed.`);
