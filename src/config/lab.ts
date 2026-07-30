export const lab = {
  name: "IASO-SAI Lab",
  fullName: "IASO — Smart Artificial Intelligence in Healthcare",
  shortMission:
    "Intelligent, adaptive, and dependable computing methods for healthcare.",
  description:
    "IASO-SAI Lab investigates intelligent, adaptive, and dependable computing methods for healthcare, combining artificial intelligence, medical data analysis, distributed systems, and digital health technologies.",
  affiliation: "University affiliation to confirm",
  address: "Institutional address to confirm",
  email: "iaso-sai@university.example",
  site: "https://iaso-sai-lab.example.org",
  social: {
    github: "https://github.com/example",
    scholar: "https://scholar.google.com/"
  },
  /**
   * The single launch switch. While true, the site declares itself a preview:
   * the masthead banner, the note under every page title, the "confirm before
   * publication" lines in the footer, and the draft-policy warnings all appear.
   *
   * Setting it to false asserts that the sample records, institutional details,
   * contact address, and the privacy and accessibility statements are all real.
   * Nothing else in the templates refers to sample content, so this is the only
   * edit needed at launch.
   */
  showSampleNotice: true as boolean,
  sampleNotice:
    "Preview build — people, publications, events, affiliations, and contact details are sample content.",
  /** Footer rights line once the site is no longer a preview. */
  rightsNote: "All rights reserved."
} as const;

/** The preview note, or undefined once `showSampleNotice` is turned off. */
export const sampleNotice = lab.showSampleNotice ? lab.sampleNotice : undefined;

export const navigation = [
  { href: "/", label: "Home" },
  { href: "/research/", label: "Research" },
  { href: "/papers/", label: "Papers" },
  { href: "/prototypes/", label: "Prototypes" },
  { href: "/members/", label: "Members" },
  { href: "/events/", label: "Events" },
  { href: "/news/", label: "News" }
] as const;
