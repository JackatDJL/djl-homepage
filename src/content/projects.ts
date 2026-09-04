export type ProjectStatus = "active" | "paused" | "archived" | "experiment";

export type Project = {
  slug: string;
  name: string;
  description: string;
  status: ProjectStatus;
  period: string;
  topics: string[];
  relationship: "under the umbrella" | "around the umbrella";
  url?: string;
  githubUrl?: string;
  note?: string;
};

export const statusLabels: Record<ProjectStatus, string> = {
  active: "Active",
  paused: "Paused",
  archived: "Archived",
  experiment: "Experiment",
};

export const projects: Project[] = [
  {
    slug: "hackclub-stade",
    name: "Hackclub Stade",
    description:
      "A local youth-led effort around making, programming, and learning together.",
    status: "archived",
    period: "Dates being documented",
    topics: ["youth education", "technology", "community"],
    relationship: "around the umbrella",
    note: "An early part of the story. Public documentation is being collected.",
  },
  {
    slug: "atheblues",
    name: "AtheBlues",
    description:
      "A robotics and performance project made with a school team.",
    status: "archived",
    period: "2024",
    topics: ["robotics", "creative technology", "teamwork"],
    relationship: "around the umbrella",
  },
  {
    slug: "presentation-foundation",
    name: "The Presentation Foundation",
    description:
      "An experiment in giving ideas, talks, and public work a clearer form.",
    status: "experiment",
    period: "Dates being documented",
    topics: ["communication", "education", "experimentation"],
    relationship: "under the umbrella",
    note: "A project name from the archive. Its record is still being assembled.",
  },
  {
    slug: "wahlen-foundation",
    name: "The Wahlen Foundation",
    description:
      "A civic project explored through the DJL orbit.",
    status: "experiment",
    period: "Dates being documented",
    topics: ["civic work", "public interest", "experimentation"],
    relationship: "around the umbrella",
    note: "This entry describes a project history, not a registered organisation.",
  },
  {
    slug: "scrapyard-hamburg",
    name: "Scrapyard Hamburg",
    description:
      "A local gathering and build event shaped by the wider youth-technology community.",
    status: "archived",
    period: "Dates being documented",
    topics: ["events", "making", "youth technology"],
    relationship: "around the umbrella",
    note: "Archive entry. Links and a fuller account will follow when checked.",
  },
  {
    slug: "confidential-project",
    name: "Confidential project currently in development",
    description:
      "Current work is kept private until it can be shared on its own terms.",
    status: "active",
    period: "Current",
    topics: ["technology"],
    relationship: "under the umbrella",
  },
];

export const selectedProjects = projects.filter((project) =>
  ["hackclub-stade", "atheblues", "confidential-project"].includes(project.slug),
);

export const archiveProjects = projects.filter(
  (project) => project.status === "archived" || project.status === "experiment",
);
