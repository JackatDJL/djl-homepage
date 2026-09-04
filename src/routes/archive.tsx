import { createFileRoute } from "@tanstack/react-router";
import { ProjectEntry } from "../components/site/project-card";
import { archiveProjects } from "../content/projects";

export const Route = createFileRoute("/archive")({
  head: () => ({ meta: [{ title: "Archive | DJL Foundation" }] }),
  component: ArchivePage,
});

function ArchivePage() {
  return (
    <section className="page-section" aria-labelledby="archive-title">
      <header className="page-intro">
        <h1 id="archive-title">Archive</h1>
        <p>
          Experiments that were connected to DJL Foundation but were not completed.
        </p>
      </header>
      <div className="project-history">
        {archiveProjects.map((project) => (
          <ProjectEntry key={project.slug} project={project} />
        ))}
      </div>
      <p className="archive-note">
        These projects remain here because unfinished work is part of the history.
      </p>
    </section>
  );
}
