import { getCollection } from "astro:content";

export const prerender = true;

export async function GET() {
  const [research, papers, prototypes, members, events, news] = await Promise.all([
    getCollection("research"),
    getCollection("papers"),
    getCollection("prototypes"),
    getCollection("members"),
    getCollection("events"),
    getCollection("news")
  ]);

  const entries = [
    ...research.map((entry) => ({
      title: entry.data.title,
      description: entry.data.description,
      type: "Research",
      url: `/research/${entry.id}/`,
      terms: entry.data.keywords.join(" ")
    })),
    ...papers.map((entry) => ({
      title: entry.data.title,
      description: `${entry.data.authors.join(", ")}. ${entry.data.venue}, ${entry.data.year}.`,
      type: "Paper",
      url: `/papers/${entry.id}/`,
      terms: [...entry.data.keywords, ...entry.data.topics, ...entry.data.authors].join(" ")
    })),
    ...prototypes.map((entry) => ({
      title: entry.data.title,
      description: entry.data.description,
      type: "Prototype",
      url: `/prototypes/${entry.id}/`,
      terms: [...entry.data.technologies, ...entry.data.topics].join(" ")
    })),
    ...members.map((entry) => ({
      title: entry.data.name,
      description: `${entry.data.role}. ${entry.data.bio}`,
      type: "Member",
      url: `/members/${entry.id}/`,
      terms: entry.data.researchInterests.join(" ")
    })),
    ...events.map((entry) => ({
      title: entry.data.title,
      description: entry.data.description,
      type: "Event",
      url: `/events/${entry.id}/`,
      terms: [entry.data.eventType, entry.data.location, ...entry.data.speakers].join(" ")
    })),
    ...news.map((entry) => ({
      title: entry.data.title,
      description: entry.data.summary,
      type: "News",
      url: `/news/${entry.id}/`,
      terms: entry.data.category
    }))
  ];

  return new Response(JSON.stringify(entries), {
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "public, max-age=3600"
    }
  });
}
