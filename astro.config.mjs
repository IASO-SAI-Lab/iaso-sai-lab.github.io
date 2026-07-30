import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";

/**
 * The canonical origin and subpath. The committed values are the local
 * defaults; CI overrides both from the live GitHub Pages deployment so that
 * canonical URLs, the sitemap, and asset paths match wherever the site is
 * actually served. `base` must start and end with a slash for Astro.
 */
const site = process.env.SITE ?? "https://iaso-sai-lab.example.org";
const subpath = (process.env.BASE_PATH ?? "").replace(/^\/+|\/+$/g, "");
const base = subpath === "" ? "/" : `/${subpath}/`;

export default defineConfig({
  site,
  base,
  output: "static",
  integrations: [sitemap()],
  markdown: {
    shikiConfig: {
      theme: "github-light"
    }
  }
});
