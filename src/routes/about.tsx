import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/about")({
  head: () => ({ meta: [{ title: "About | DJL Foundation" }] }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <article className="prose page-section" aria-labelledby="about-title">
      <header className="page-intro">
        <h1 id="about-title">About DJL Foundation</h1>
      </header>
      <div className="prose-body">
        <p>
          Jack Ruder started DJL Foundation as a name for technical education
          work and projects made with other young people. Hack Club was an
          important influence. It showed that students can organise, learn, and
          publish technical work without waiting for a formal institution.
        </p>
        <p>
          The name later covered software, robotics, games, project weeks, and
          civic experiments. It was useful because projects could start small.
          Not all of them needed to become organisations.
        </p>
        <p>
          Today, DJL Foundation documents that work. The archive includes finished
          projects, stopped projects, and names that need more research.
        </p>
        <p>
          DJL is a historical project name. It is not expanded here and does not
          describe a legal entity.
        </p>
      </div>
      <p className="quiet-disclaimer">
        DJL Foundation is not a formally incorporated foundation or registered association.
      </p>
    </article>
  );
}
