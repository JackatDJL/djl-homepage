import { createFileRoute } from "@tanstack/react-router";
import { ProjectCard } from "../components/site/project-card";
import { archiveProjects } from "../content/projects";

export const Route = createFileRoute("/archive")({
  head: () => ({ meta: [{ title: "Archive | DJL Foundation" }] }),
  component: ArchivePage,
});

function ArchivePage() {
  return (
    <section className="page-section" aria-labelledby="archive-title">
      <header className="page-intro">
        <p className="eyebrow">THE ARCHIVE</p>
        <h1 id="archive-title">The work did not have to last forever to matter.</h1>
        <p>
          Some entries are complete. Some are partial. Some became something else.
          This is a record of attempts, not a victory lap.
        </p>
      </header>
      <div className="archive-intro">
        <p>
          Archive entries stay visible on purpose. They show what was tried, where the
          thread stopped, and where documentation still needs work.
        </p>
      </div>
      <div className="project-grid catalogue-grid">
        {archiveProjects.map((project) => <ProjectCard key={project.slug} project={project} />)}
      </div>
    </section>
  );
}
