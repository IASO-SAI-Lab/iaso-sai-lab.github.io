# Website Brief — IASO-SAI Lab

Develop the institutional website for the research group:

**IASO-SAI Lab**
**IASO – Smart Artificial Intelligence in Healthcare**

The website should clearly present the laboratory’s research activities, members, publications, prototypes, and events.

## Objectives

The website should:

* communicate the identity and main research areas of the group;
* present publications, prototypes, projects, and scientific activities;
* collect news and events;
* be easy to update, including by users with limited web-development experience;
* maintain a professional, minimal, and academic visual style.

## Technology

The website must be developed using **Astro**.

Whenever possible, content should be separated from the application code and stored in **Markdown or MDX files**, using Astro Content Collections.

The following content types should be managed through Markdown:

* research topics;
* news;
* publications;
* prototypes;
* members;
* events.

Each content item should use structured YAML frontmatter containing fields such as title, description, date, image, authors, links, categories, and related content.

The website should be:

* statically generated;
* fast and lightweight;
* responsive;
* accessible;
* search-engine optimized;
* easy to deploy on GitHub Pages, Netlify, or Vercel.

## Website Structure

### 1. Home Page

The home page should immediately introduce the laboratory.

The hero section should include:

* the full name of the group;
* the acronym **IASO-SAI Lab**;
* a short mission statement;
* a representative main image;
* a call-to-action leading to the research areas;
* an optional contact link.

Suggested introductory text:

> IASO-SAI Lab investigates intelligent, adaptive, and dependable computing methods for healthcare, combining artificial intelligence, medical data analysis, distributed systems, and digital health technologies.

The home page should also include:

* an overview of the main research topics;
* the latest news;
* a selection of recent publications;
* a selection of featured prototypes;
* upcoming events;
* links to the corresponding full pages.

### 2. Research

Create a portfolio page dedicated to the laboratory’s research areas.

Each research topic should include:

* title;
* short description;
* representative image or visual element;
* keywords;
* related projects;
* related publications;
* related prototypes;
* involved members.

Research topics should initially be displayed as cards. Each card should link to a dedicated detail page.

Possible initial research areas include:

* Artificial Intelligence in Healthcare;
* Medical Data Analytics;
* Clinical Decision Support;
* Federated and Distributed Learning;
* Self-Adaptive Healthcare Systems;
* Trustworthy and Explainable AI;
* Digital Health and Remote Monitoring.

The final set of research areas must be editable through Markdown files.

### 3. Papers

Create a page listing the group’s scientific publications.

The page should allow users to:

* browse publications by year;
* filter by research topic;
* filter by publication type;
* search by title, author, venue, or keyword.

Publication types may include:

* journal article;
* conference paper;
* workshop paper;
* book chapter;
* preprint.

Each publication should support the following information:

* title;
* authors;
* year;
* venue;
* publication type;
* short abstract;
* DOI;
* PDF link;
* code or dataset link;
* BibTeX entry;
* associated research topics;
* optional image or graphical abstract.

Publications should be stored in separate Markdown files or imported from a bibliographic source while preserving a simple and maintainable structure.

### 4. Prototypes

Create a page dedicated to software, datasets, demonstrations, and research prototypes developed by the group.

Each prototype should include:

* name;
* short description;
* image or screenshot;
* development status;
* technologies used;
* involved members;
* related publications;
* repository link;
* demo link;
* documentation link;
* license information.

Prototype categories may include:

* software;
* research prototype;
* dataset;
* library;
* demonstrator;
* open-source project.

### 5. Members

Create a page presenting the members of the laboratory.

Members should be grouped, where applicable, into the following categories:

* Lab Director;
* Faculty Members;
* Postdoctoral Researchers;
* PhD Students;
* Research Fellows;
* Collaborators;
* Alumni.

Each member profile should include:

* full name;
* role;
* photograph;
* short biography;
* research interests;
* institutional email;
* personal website;
* ORCID;
* Google Scholar;
* GitHub;
* LinkedIn;
* related publications;
* related projects.

Each member should have a dedicated page generated from a Markdown file.

### 6. Events

Create a page for events organized by or involving the laboratory.

Events should be divided into:

* upcoming events;
* past events.

Each event should include:

* title;
* event type;
* date and time;
* location or online format;
* description;
* speakers;
* programme;
* image;
* registration link;
* slides or materials;
* related news.

Possible event types include:

* seminar;
* workshop;
* conference;
* invited talk;
* tutorial;
* doctoral event;
* project meeting.

### 7. News

Recent news should appear on the home page, but a complete news archive must also be available.

Each news item should include:

* title;
* date;
* summary;
* full content;
* image;
* author;
* category;
* links to related members, events, papers, or prototypes.

Possible news categories include:

* publication;
* award;
* project;
* event;
* software release;
* open position;
* general update.

## Navigation

The main navigation should include:

* Home;
* Research;
* Papers;
* Prototypes;
* Members;
* Events;
* News.

The navigation should always remain easy to access and should include a responsive mobile menu.

The footer should include:

* laboratory name;
* university affiliation;
* address;
* contact email;
* scientific and social links;
* institutional logos, where required;
* copyright information;
* privacy statement;
* accessibility statement.

## Content Structure

Use a project structure similar to the following:

```text
src/
├── components/
├── layouts/
├── pages/
│   ├── index.astro
│   ├── research/
│   ├── papers/
│   ├── prototypes/
│   ├── members/
│   ├── events/
│   └── news/
├── content/
│   ├── research/
│   ├── papers/
│   ├── prototypes/
│   ├── members/
│   ├── events/
│   └── news/
└── styles/
```

Example frontmatter for a member:

```yaml
---
name: "Name Surname"
role: "Assistant Professor"
photo: "/images/members/name-surname.jpg"
researchInterests:
  - Artificial Intelligence in Healthcare
  - Federated Learning
email: "name.surname@university.example"
orcid: ""
googleScholar: ""
github: ""
order: 1
---
```

Example frontmatter for a publication:

```yaml
---
title: "Publication title"
authors:
  - "Name Surname"
year: 2026
venue: "Conference or Journal"
publicationType: "conference"
doi: ""
pdf: ""
code: ""
topics:
  - "Artificial Intelligence in Healthcare"
featured: true
---
```

## Visual Style

The visual style should be:

* minimal;
* classic;
* academic;
* authoritative;
* clean;
* based on generous use of whitespace.

Avoid:

* intrusive animations;
* strong gradients;
* three-dimensional effects;
* excessively rounded cards;
* highly saturated colours;
* a commercial startup appearance;
* excessive amounts of text on the home page.

Use:

* readable and elegant typography;
* a predominantly neutral colour palette;
* one primary accent colour;
* thin lines and subtle separators;
* high-quality scientific images and photographs;
* simple and consistent icons.

The visual identity may include abstract references to:

* healthcare;
* artificial intelligence;
* distributed systems and networks;
* clinical data;
* interdisciplinary collaboration.

The reference to **Iaso**, the Greek figure associated with recovery and healing, should remain subtle and contemporary. Avoid overly literal medical symbolism.

## Responsive Design

The website must work correctly on:

* desktop;
* tablet;
* smartphone.

Layouts for publications, prototypes, research topics, and members should automatically adapt to the available screen width.

## Accessibility

The website should include:

* semantic HTML;
* keyboard navigation;
* sufficient colour contrast;
* alternative text for all images;
* clearly visible focus states;
* a correct heading hierarchy;
* support for `prefers-reduced-motion`.

## SEO and Metadata

Each page should include:

* page title;
* meta description;
* Open Graph metadata;
* canonical URL;
* preview image;
* structured data where appropriate.

Schema.org structured data may be used for:

* people;
* publications;
* events;
* research organizations.

## Additional Features

Include the following features without making the website unnecessarily complex:

* internal search;
* filters for publications and prototypes;
* RSS feed for news;
* automatically generated sitemap;
* links between related content;
* a button to copy BibTeX entries;
* optional dark mode;
* centralized configuration for laboratory information.

## Language

The website should be written entirely in English.

## Expected Result

The final result should be a complete Astro website ready for deployment, including:

* reusable components;
* example content;
* configured Astro Content Collections;
* consistent page layouts;
* dynamic pages generated from Markdown files;
* a README explaining how to add members, publications, research topics, news, events, and prototypes;
* no dependency on an external CMS for ordinary content updates.
