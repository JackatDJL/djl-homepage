export type ProjectStatus = "active" | "archived" | "experiment";

export type ProjectLink = {
  label: string;
  url: string;
};

export type Project = {
  slug: string;
  year: string;
  name: string;
  description: string;
  status: ProjectStatus;
  links: ProjectLink[];
  artifact?: {
    src: string;
    alt: string;
    caption: string;
  };
};

export const projectHistory: Project[] = [
  {
    slug: "noplus",
    year: "2023",
    name: "NoPlus / Robot-City",
    description:
      "A game project. Its public repository is archived and its README identifies the project as Robot-City.",
    status: "archived",
    links: [{ label: "GitHub repository", url: "https://github.com/DJL-Foundation/NoPlus" }],
  },
  {
    slug: "a-cubes-journey",
    year: "2025",
    name: "A Cube's Journey",
    description: "A game made by Jack and Ole for Hack Club Juice. The project is archived.",
    status: "archived",
    links: [
      {
        label: "GitHub repository",
        url: "https://github.com/DJL-Foundation/A-Cube-s-Journey",
      },
    ],
  },
  {
    slug: "projektwoche",
    year: "2025",
    name: "Projektwoche",
    description:
      "A Hackclub Stade project week at Gymnasium Athenaeum Stade about sustainable web development. Students made personal sites and sustainability projects.",
    status: "active",
    links: [
      { label: "Project site", url: "https://prowo.hackclub-stade.de" },
      {
        label: "GitHub repository",
        url: "https://github.com/DJL-Foundation/projektwoche",
      },
    ],
    artifact: {
      src: "https://raw.githubusercontent.com/DJL-Foundation/projektwoche/main/apps/web/public/logo.png",
      alt: "Projektwoche logo",
      caption: "Projektwoche logo from the public project repository",
    },
  },
  {
    slug: "djl-theme",
    year: "2025",
    name: "DJL Jekyll theme",
    description: "A Jekyll theme and branding repository published under the DJL Foundation organisation.",
    status: "active",
    links: [
      { label: "Theme site", url: "https://jekyll.design.djl.foundation" },
      {
        label: "GitHub repository",
        url: "https://github.com/DJL-Foundation/jekyll-theme",
      },
    ],
  },
  {
    slug: "confidential-project",
    year: "Today",
    name: "Confidential project currently in development",
    description: "Current work is not documented here until it can be published with the right context.",
    status: "active",
    links: [],
  },
];

export const archiveIndex = [
  "Hackclub Stade",
  "AtheBlues",
  "The Presentation Foundation",
  "The Wahlen Foundation",
  "Scrapyard Hamburg",
];
