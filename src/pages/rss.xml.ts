import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
import { lab } from "../config/lab";

export async function GET(context: { site?: URL }) {
  const entries = (await getCollection("news")).sort(
    (a, b) => b.data.date.getTime() - a.data.date.getTime()
  );

  return rss({
    title: `${lab.name} news`,
    description: lab.description,
    site: context.site ?? new URL(lab.site),
    items: entries.map((entry) => ({
      title: entry.data.title,
      description: entry.data.summary,
      pubDate: entry.data.date,
      link: `/news/${entry.id}/`,
      categories: [entry.data.category]
    })),
    customData: "<language>en</language>"
  });
}
