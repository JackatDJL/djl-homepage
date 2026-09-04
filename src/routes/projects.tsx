import { createFileRoute } from "@tanstack/react-router";
import { ProjectCard } from "../components/site/project-card";
import { projects } from "../content/projects";

export const Route = createFileRoute("/projects")({
  head: () => ({ meta: [{ title: "Projects | DJL Foundation" }] }),
  component: ProjectsPage,
});

function ProjectsPage() {
  return (
    <section className="page-section" aria-labelledby="projects-title">
      <header className="page-intro">
        <p className="eyebrow">PROJECT CATALOGUE</p>
        <h1 id="projects-title">Projects, groups, events, and experiments.</h1>
        <p>
          This catalogue records work that lived under or around DJL Foundation.
          A shared name does not mean a shared legal identity, ownership, or current status.
        </p>
      </header>
      <div className="catalogue-key" aria-label="Project status key">
        <span className="status status-active">Active</span>
        <span className="status status-paused">Paused</span>
        <span className="status status-archived">Archived</span>
        <span className="status status-experiment">Experiment</span>
      </div>
      <div className="project-grid catalogue-grid">
        {projects.map((project) => <ProjectCard key={project.slug} project={project} />)}
      </div>
    </section>
  );
}
