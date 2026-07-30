import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const linkSchema = z.object({
  label: z.string(),
  url: z.string()
});

const research = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/research" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    keywords: z.array(z.string()).default([]),
    projects: z.array(z.string()).default([]),
    publications: z.array(z.string()).default([]),
    prototypes: z.array(z.string()).default([]),
    members: z.array(z.string()).default([]),
    figure: z
      .enum([
        "signal",
        "cohort",
        "federation",
        "pipeline",
        "calibration",
        "monitoring",
        "attribution"
      ])
      .optional(),
    image: z.string().optional(),
    imageAlt: z.string().optional(),
    featured: z.boolean().default(false),
    order: z.number().default(999)
  })
});

const papers = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/papers" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    authors: z.array(z.string()),
    year: z.number(),
    venue: z.string(),
    publicationType: z.enum([
      "journal",
      "conference",
      "workshop",
      "book-chapter",
      "preprint"
    ]),
    doi: z.string().optional(),
    pdf: z.string().optional(),
    code: z.string().optional(),
    dataset: z.string().optional(),
    bibtex: z.string(),
    topics: z.array(z.string()).default([]),
    keywords: z.array(z.string()).default([]),
    image: z.string().optional(),
    imageAlt: z.string().optional(),
    featured: z.boolean().default(false)
  })
});

const prototypes = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/prototypes" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    category: z.enum([
      "software",
      "research-prototype",
      "dataset",
      "library",
      "demonstrator",
      "open-source"
    ]),
    status: z.enum(["concept", "active", "pilot", "archived"]),
    technologies: z.array(z.string()).default([]),
    members: z.array(z.string()).default([]),
    publications: z.array(z.string()).default([]),
    topics: z.array(z.string()).default([]),
    repository: z.string().optional(),
    demo: z.string().optional(),
    documentation: z.string().optional(),
    license: z.string().optional(),
    figure: z
      .enum([
        "signal",
        "cohort",
        "federation",
        "pipeline",
        "calibration",
        "monitoring",
        "attribution"
      ])
      .optional(),
    image: z.string().optional(),
    imageAlt: z.string().optional(),
    featured: z.boolean().default(false),
    order: z.number().default(999)
  })
});

const members = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/members" }),
  schema: z.object({
    name: z.string(),
    role: z.string(),
    group: z.enum([
      "Lab Director",
      "Faculty Members",
      "Postdoctoral Researchers",
      "PhD Students",
      "Research Fellows",
      "Collaborators",
      "Alumni"
    ]),
    bio: z.string(),
    researchInterests: z.array(z.string()).default([]),
    email: z.string().optional(),
    website: z.string().optional(),
    orcid: z.string().optional(),
    googleScholar: z.string().optional(),
    github: z.string().optional(),
    linkedin: z.string().optional(),
    publications: z.array(z.string()).default([]),
    projects: z.array(z.string()).default([]),
    photo: z.string().optional(),
    photoAlt: z.string().optional(),
    order: z.number().default(999)
  })
});

const events = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/events" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    eventType: z.enum([
      "seminar",
      "workshop",
      "conference",
      "invited-talk",
      "tutorial",
      "doctoral-event",
      "project-meeting"
    ]),
    date: z.coerce.date(),
    endDate: z.coerce.date().optional(),
    location: z.string(),
    online: z.boolean().default(false),
    speakers: z.array(z.string()).default([]),
    programme: z.array(z.string()).default([]),
    registration: z.string().optional(),
    materials: z.array(linkSchema).default([]),
    relatedNews: z.array(z.string()).default([]),
    image: z.string().optional(),
    imageAlt: z.string().optional()
  })
});

const news = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/news" }),
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    date: z.coerce.date(),
    author: z.string(),
    category: z.enum([
      "publication",
      "award",
      "project",
      "event",
      "software-release",
      "open-position",
      "general"
    ]),
    relatedMembers: z.array(z.string()).default([]),
    relatedEvents: z.array(z.string()).default([]),
    relatedPapers: z.array(z.string()).default([]),
    relatedPrototypes: z.array(z.string()).default([]),
    image: z.string().optional(),
    imageAlt: z.string().optional(),
    featured: z.boolean().default(false)
  })
});

export const collections = {
  research,
  papers,
  prototypes,
  members,
  events,
  news
};
