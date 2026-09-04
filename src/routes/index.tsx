import { Link, createFileRoute } from "@tanstack/react-router";
import { ProjectEntry } from "../components/site/project-card";
import { projectHistory } from "../content/projects";

export const Route = createFileRoute("/")({
  head: () => ({ meta: [{ title: "DJL Foundation" }] }),
  component: Home,
});

function Home() {
  return (
    <>
      <section className="home-intro" aria-labelledby="home-title">
        <div className="home-mark" aria-hidden="true">
          <img src="/logo.png" alt="" width="180" height="180" />
        </div>
        <div>
          <h1 id="home-title">DJL Foundation</h1>
          <p className="lead">
            DJL Foundation is Jack Ruder's project umbrella for work in software,
            robotics, technical youth education, and civic projects.
          </p>
          <p>
            It began around 2023 through local work with Hack Club and technical
            education. Over time, teams, websites, games, events, and organisation
            ideas used the name. Some continued. Some stopped. Some became separate projects.
          </p>
          <p className="quiet-disclaimer">
            DJL Foundation is not a formally incorporated foundation or registered association.
          </p>
        </div>
      </section>

      <section className="history-section" aria-labelledby="history-title">
        <header className="section-header">
          <h2 id="history-title">Project history</h2>
          <p>
            This is the DJL record. Projects are ordered by their documented period.
          </p>
        </header>
        <div className="project-history">
          {projectHistory.map((project) => (
            <ProjectEntry key={project.slug} project={project} />
          ))}
        </div>
        <Link className="plain-link" to="/archive">
          Open the archive index
        </Link>
      </section>
    </>
  );
}
