import { createFileRoute } from "@tanstack/react-router";
import { archiveIndex } from "../content/projects";

export const Route = createFileRoute("/archive")({
  head: () => ({ meta: [{ title: "Archive | DJL Foundation" }] }),
  component: ArchivePage,
});

function ArchivePage() {
  return (
    <section className="page-section" aria-labelledby="archive-title">
      <header className="page-intro">
        <h1 id="archive-title">Archive index</h1>
        <p>
          These names appear in the DJL history. Their dates, links, and source
          material have not all been checked yet.
        </p>
      </header>
      <ol className="archive-index">
        {archiveIndex.map((name) => (
          <li key={name}>{name}</li>
        ))}
      </ol>
      <p className="archive-note">
        Old projects stay listed even when the record is incomplete. A missing
        page means that the material has not been assembled, not that the work
        did not happen.
      </p>
    </section>
  );
}
