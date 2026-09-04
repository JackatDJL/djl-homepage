import { createFileRoute } from "@tanstack/react-router";
import { ProjectEntry } from "../components/site/project-card";
import { projectHistory } from "../content/projects";

export const Route = createFileRoute("/projects")({
  head: () => ({ meta: [{ title: "Projects | DJL Foundation" }] }),
  component: ProjectsPage,
});

function ProjectsPage() {
  return (
    <section className="page-section" aria-labelledby="projects-title">
      <header className="page-intro">
        <h1 id="projects-title">Projects</h1>
        <p>
          A dated record of public work connected to DJL Foundation. Repository
          links point to the original material where it is available.
        </p>
      </header>
      <div className="project-history">
        {projectHistory.map((project) => (
          <ProjectEntry key={project.slug} project={project} />
        ))}
      </div>
    </section>
  );
}
