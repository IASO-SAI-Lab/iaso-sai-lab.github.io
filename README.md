# IASO-SAI Lab website

A static Astro website for the IASO-SAI Lab institutional presence. The current repository is a complete preview build with deliberately fictional people, publications, prototypes, events, links, affiliations, and contact details.

Do not publish the preview unchanged. Search for `sample`, `fictional`, `illustrative`, `.example`, and `to confirm` before launch.

## Run locally

Requirements:

- Node.js 22.12 or newer
- npm 9.6.5 or newer

```sh
npm install
npm run dev
```

The production check and static build are:

```sh
npm run build
```

The generated site is written to `dist/`.

## Central laboratory settings

Edit `src/config/lab.ts` to update:

- laboratory name and full name;
- mission and summary;
- university affiliation;
- address and contact email;
- canonical production URL;
- GitHub and Scholar links;
- the preview-content notice.

Also update the `site` value in `astro.config.mjs` before deployment. This value drives canonical URLs and the sitemap.

### The launch flag

`src/config/lab.ts` carries one switch that takes the site out of preview:

```ts
showSampleNotice: true as boolean,
```

While it is `true` the site declares itself a preview. Turning it to `false` removes, in one edit:

- the banner across the masthead;
- the note under every page title;
- "Sample institutional information must be confirmed before publication" in the footer;
- "Content rights to be confirmed", replaced by `rightsNote` (default: "All rights reserved.");
- the draft-policy warnings and "this address is sample data" lines on the privacy and accessibility pages;
- the known-preview-limitations section of the accessibility statement.

No template refers to sample content outside this flag — headings say "Programmes", counts say "18 publications". Setting it to `false` is therefore an assertion that the records, institutional details, contact address, and the two policy statements are all real. What remains after the flip is your own Markdown and the placeholder values in `lab.ts` (`affiliation`, `address`, `email`), which you edit directly.

To check before deploying, build and search the output:

```sh
npm run build
grep -rniE "sample|preview|to be confirmed" dist --include="*.html"
```

Any remaining hits come from content files you still need to replace, not from the templates.

## Content collections

All ordinary content is stored as one Markdown or MDX file per entry:

- `src/content/research/`
- `src/content/papers/`
- `src/content/prototypes/`
- `src/content/members/`
- `src/content/events/`
- `src/content/news/`

The schemas live in `src/content.config.ts`. Astro validates frontmatter during the build, so a missing or invalid field is reported before deployment.

### Add a research area

Copy a file in `src/content/research/`, change the filename to the desired URL slug, and update:

- `title`, `description`, `keywords`;
- related `projects`, paper IDs, prototype IDs, and member IDs;
- `featured` and `order`;
- the Markdown body.

### Add a paper

Copy a file in `src/content/papers/` and provide:

- title, abstract description, authors, year, venue, and publication type;
- DOI, PDF, code, or dataset links when available;
- BibTeX;
- related topic names and keywords;
- the Markdown abstract or full record.

The Papers page automatically derives its year, type, and topic filters from these files.

### Add a prototype

Copy a file in `src/content/prototypes/` and provide its category, development status, technologies, people, related paper IDs, topic names, links, and licence.

### Add a member

Copy a file in `src/content/members/`. The `group` value must match one of the groups in the schema. Add only verified public identifiers and publish a portrait only after confirming consent and image rights.

### Add an event

Copy a file in `src/content/events/`. Dates use ISO 8601 with a time-zone offset, for example:

```yaml
date: 2026-10-08T15:00:00+02:00
```

Upcoming and past sections are computed automatically at build time.

### Add news

Copy a file in `src/content/news/`. The news archive, homepage rail, search index, and RSS feed update automatically.

## Concept figures

Entries without a photograph are drawn with a hand-built schematic instead. Each one diagrams a method the lab works on, so the figure carries meaning rather than filling space. Seven are available:

| `figure` | Shows |
| --- | --- |
| `signal` | a physiological trace with one observation window highlighted |
| `cohort` | a patient-by-interval matrix whose later intervals go missing |
| `federation` | sites exchanging model updates around a shared centre |
| `pipeline` | a three-stage pipeline with an adaptation loop feeding back |
| `calibration` | a reliability curve against the line of perfect calibration |
| `monitoring` | a monitored stream crossing an alerting threshold |
| `attribution` | ranked feature attributions, largest highlighted |

Choose one per entry in `src/content/research/` or `src/content/prototypes/`:

```yaml
figure: "federation"
```

Omit it and the page falls back to a sensible default for that collection. The figures are drawn entirely from design tokens, so they follow the light and dark palettes automatically, and each carries a spoken description in its `aria-label`. They deliberately avoid literal medical iconography.

To add an eighth, extend the `Figure` type and the `described` map in `src/components/VisualPlaceholder.astro`, add the drawing, and add the name to the `figure` enum in `src/content.config.ts`.

## Images

A real photograph always wins over a concept figure: add an image to a Markdown file and it replaces the drawing automatically, with no code change. The preview ships no stock photography, so nothing invented is presented as final content.

Put the file in `public/images/…`, then reference it from frontmatter:

```yaml
# research, papers, prototypes, events, news
image: "/images/research/federated-learning.jpg"
imageAlt: "Hospital sites exchanging model updates without sharing patient records"
```

```yaml
# members
photo: "/images/members/name-surname.jpg"
photoAlt: "Portrait of Name Surname"
```

Notes:

- `imageAlt` / `photoAlt` are optional. Omitted, the alt text falls back to the entry title or the member's name — which is adequate but rarely as good as a written description.
- Aspect ratios are fixed in CSS (`40 / 26` for entry figures, `4 / 3` for portraits) and images are cropped with `object-fit: cover`, so an unmeasured upload cannot shift the layout.
- Research and prototype entries fall back to a concept figure. Papers, events, and news show a figure only when `image` is set.
- Publish a portrait only after confirming consent and image rights.

Before launch:

1. replace the home hero figure in `src/components/ScientificNetwork.astro` if the lab has an approved visual identity;
2. add verified member portraits with consent;
3. add research and prototype imagery with accurate alternative text;
4. update the Open Graph image at `public/og-default.svg` — note that several social platforms do not render SVG previews, so a PNG or JPG is the safer choice;
5. keep uploads close to the target display size; nothing here resizes them.

## Colour modes

The site ships light and dark modes built from the same token set in `tokens.css`.

- With no stored preference the mode follows the reader's `prefers-color-scheme`.
- The masthead toggle overrides it and persists the choice in `localStorage` under `iaso-theme`.
- A small inline script in `src/layouts/BaseLayout.astro` applies a stored override before first paint, so there is no flash of the wrong mode.
- With scripting disabled the toggle is hidden and the system preference still applies.

To change either palette, edit the colour tokens in `tokens.css`. The light values live in `:root`; the dark values are repeated in both the `prefers-color-scheme` block and the `[data-theme="dark"]` block, and must be kept in step.

## Search, RSS, and sitemap

- `/search/` loads a statically generated JSON index from `/search-index.json`.
- `/rss.xml` contains news entries.
- `@astrojs/sitemap` produces the sitemap during the static build.

No external search service or CMS is required.

## Deployment

The site is configured for static output and can be deployed to GitHub Pages, Netlify, Vercel, or any static host. `.github/workflows/deploy.yml` implements the GitHub Pages route.

### The pipeline

The workflow runs on every push to `main`, on every pull request against `main`, and on demand from the Actions tab. Pull requests run the full check set but do not publish; only `main` deploys.

| Step | What fails the run |
| --- | --- |
| `npm run build` | `astro check` type errors in templates, or invalid frontmatter in any content collection |
| `npm run check:links` | An internal link or asset reference that does not resolve to a generated file |
| `npm run check:content` | Sample content remaining after launch — see below |
| `npm run test:smoke` | A key route not returning 200, rendering no `<h1>`, or logging a console error |

`npm run verify` runs the same four steps locally, in the same order.

The smoke test starts and stops `astro preview` itself and drives it with Playwright, covering one route per template plus the search page's client-side index load and the 404 template. Playwright is already a dev dependency; install its browser once with `npx playwright install chromium`.

### Setting up GitHub Pages

1. Push the repository to GitHub.
2. In **Settings → Pages**, set **Source** to **GitHub Actions**. The workflow cannot enable Pages for you.
3. Push to `main`. The deployment URL appears on the workflow run under the `github-pages` environment.

The canonical URL is not hardcoded for the deployment. `actions/configure-pages` resolves this repository's real Pages origin and base path — including a custom domain, if one is configured — and the build reads them from the `SITE` and `BASE_PATH` environment variables. The values committed in `astro.config.mjs` are the local defaults, so canonical URLs and the sitemap are correct wherever the site is served without editing the config per environment.

### Subpath deployments

The templates use root-relative links such as `/research/`. That is correct for a user or organisation site (`<owner>.github.io`) and for a custom domain, where the base path is `/`.

A **project site** serves the site from `/<repo>/` instead, and those links would point at the server root. The link checker detects this: build with `BASE_PATH=/<repo>` and it reports every reference that still needs the base prefix. Making the site base-aware means routing its internal links through Astro's `import.meta.env.BASE_URL` rather than writing them as absolute paths — roughly twenty files, including `navigation` in `src/config/lab.ts`, the `fetch("/search-index.json")` call in `src/pages/search/index.astro`, and the active-link comparison in `src/components/SiteHeader.astro`.

Deploying to a user site, an organisation site, or a custom domain avoids the question entirely.

### The content gate before launch

`npm run check:content` is the pre-launch search described above, wired into CI. Its severity follows `showSampleNotice`:

- while the flag is `true` the site declares itself a preview, so the script reports its hits and passes;
- once the flag is `false` — the assertion that every record and institutional detail is real — any remaining `sample`, `fictional`, `illustrative`, `preview`, `.example`, or `to confirm` string in the build output fails the run.

Flipping the flag therefore also arms the gate. If a legitimate term later trips it, adjust the pattern list in `scripts/check-preview-content.mjs`.

Note that until the flag is flipped, pushing to `main` publishes the preview content — the fictional people, publications, and contact details — at a public URL.

## Design system

- `tokens.css` is the portable token export, carrying both colour modes.
- `src/styles/global.css` contains the Almanac editorial system and component rules.
- `.hallmark/log.json` records the structural Hallmark choices for future design work. The system is locked: new pages should match the existing Ecosystem Index / Almanac / masthead / dense-footer structure rather than introduce a new one.
- The browser-chrome tint is set by two `theme-color` meta tags in `src/layouts/BaseLayout.astro`. They repeat `--color-paper` as sRGB hex because a meta attribute cannot read a CSS custom property; change them whenever that token changes.

The preview loads two Google Fonts. Self-host them for production when required by institutional privacy or availability policy.
