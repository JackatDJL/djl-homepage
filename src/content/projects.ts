export type ProjectStatus = "active" | "paused" | "archived" | "experiment";

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
    slug: "atheblues",
    year: "2020 to 2024",
    name: "AtheBlues",
    description:
      "A RoboCup OnStage team from the Athenaeum Stade robotics group. Jack was team lead during the 2024 phase. The team won the Hamburg qualification, placed second at the German Championship in Kassel, and qualified for the European Championship.",
    status: "archived",
    links: [{ label: "Team website", url: "https://github.com/JackatDJL/AtheBlues" }],
  },
  {
    slug: "hackclub-stade",
    year: "Before 2024 to January 2025",
    name: "Hackclub Stade",
    description:
      "A local Hack Club at Gymnasium Athenaeum Stade. Jack founded and led the club, which offered free, self-organised technical education for young people. It has been paused since 31 January 2025.",
    status: "paused",
    links: [],
  },
  {
    slug: "scrapyard-hamburg",
    year: "2024 to March 2025",
    name: "Scrapyard Hamburg",
    description:
      "A Hack Club hackathon planned for Hamburg on 15 and 16 March 2025. Jack initiated and led the attempt. The event was cancelled.",
    status: "archived",
    links: [],
  },
  {
    slug: "presentation-foundation-prism",
    year: "2024 to 2026",
    name: "The Presentation Foundation / Prism",
    description:
      "A project for sharing presentations, handouts, Kahoot links, and other materials through short URLs. It was renamed Prism. A 2026 rebuild began but has not progressed far.",
    status: "paused",
    links: [{ label: "GitHub repository", url: "https://github.com/DJL-Foundation/prism" }],
  },
  {
    slug: "sv-digitisation",
    year: "2024 to 2026",
    name: "SV digitisation and Schließfachmanager",
    description:
      "Several attempts to modernise student council work at the Athenaeum Stade. The work covered a website, a mobile approach, and digitising locker administration.",
    status: "experiment",
    links: [
      {
        label: "Schließfachmanager repository",
        url: "https://github.com/DJL-Foundation/schlie-fach-manager",
      },
    ],
  },
  {
    slug: "djl-ui",
    year: "March 2025",
    name: "DJL UI",
    description:
      "An experiment in a reusable UI and design system for DJL projects.",
    status: "archived",
    links: [{ label: "GitHub repository", url: "https://github.com/JackatDJL/djl-ui" }],
  },
  {
    slug: "foundation-drive",
    year: "2025",
    name: "Foundation Drive",
    description:
      "An attempt to build a Google Drive-like service. It stopped because the project did not have suitable durable object storage.",
    status: "archived",
    links: [
      {
        label: "GitHub repository",
        url: "https://github.com/DJL-Foundation/foundation-drive",
      },
    ],
  },
  {
    slug: "wahlen-foundation",
    year: "2025",
    name: "Wahlen Foundation",
    description:
      "An unfinished attempt to build an affordable, secure web-based voting system, initially in part for student council use.",
    status: "archived",
    links: [
      {
        label: "GitHub repository",
        url: "https://github.com/JackatDJL/wahlen-foundation",
      },
    ],
  },
  {
    slug: "projektwoche",
    year: "2025",
    name: "Projektwoche",
    description:
      "Technical infrastructure and web projects for a school project week. Jack was lead developer. Hackclub Stade took part in organising and delivering the work.",
    status: "archived",
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
      caption: "Logo from the public Projektwoche repository",
    },
  },
  {
    slug: "djl-id",
    year: "2026",
    name: "DJL ID",
    description:
      "An experiment in a shared identity layer for DJL services, including BetterAuth.",
    status: "experiment",
    links: [{ label: "GitHub repository", url: "https://github.com/DJL-Foundation/id" }],
  },
  {
    slug: "djl-custom-domains",
    year: "2026",
    name: "DJL Custom Domains",
    description:
      "An unfinished idea for routing custom domains through shared infrastructure.",
    status: "archived",
    links: [],
  },
];

export const archiveProjects: Project[] = [
  {
    slug: "noplus",
    year: "2023",
    name: "NoPlus",
    description:
      "An unfinished FPS project with a friend. Jack built a scene and open-world loader that loaded areas based on player position.",
    status: "archived",
    links: [{ label: "GitHub repository", url: "https://github.com/DJL-Foundation/NoPlus" }],
  },
  {
    slug: "a-cubes-journey",
    year: "2025",
    name: "A Cube's Journey",
    description:
      "A story game idea about a cube, started as a game jam and Unity experiment. It was not finished.",
    status: "archived",
    links: [
      {
        label: "GitHub repository",
        url: "https://github.com/DJL-Foundation/A-Cube-s-Journey",
      },
    ],
  },
];
