import { Link, createFileRoute } from "@tanstack/react-router";
import { ProjectCard } from "../components/site/project-card";
import { selectedProjects } from "../content/projects";

export const Route = createFileRoute("/")({
  head: () => ({ meta: [{ title: "DJL Foundation" }] }),
  component: Home,
});

function Home() {
  return (
    <>
      <section className="hero" aria-labelledby="home-title">
        <p className="eyebrow">PROJECT UMBRELLA / EUROPE</p>
        <h1 id="home-title">A home for work that was worth trying.</h1>
        <p className="hero-copy">
          DJL Foundation is an independent project umbrella and archive created by Jack Ruder.
          It holds work around technology, education, and civic experimentation.
        </p>
        <aside className="legal-note">
          <strong>For clarity.</strong> DJL Foundation is not currently a formally incorporated
          foundation or registered association.
        </aside>
        <div className="hero-actions">
          <Link className="button button-primary" to="/projects">Browse projects</Link>
          <Link className="button button-quiet" to="/about">Read the background</Link>
        </div>
      </section>

      <section className="section selected-section" aria-labelledby="selected-title">
        <div className="section-heading">
          <p className="eyebrow">SELECTED WORK</p>
          <h2 id="selected-title">A few points in the record.</h2>
          <Link to="/projects">See every project</Link>
        </div>
        <div className="project-grid">
          {selectedProjects.map((project) => <ProjectCard key={project.slug} project={project} compact />)}
        </div>
      </section>

      <section className="section history-section" aria-labelledby="history-title">
        <div className="section-heading">
          <p className="eyebrow">SHORT HISTORY</p>
          <h2 id="history-title">An umbrella, not a straight line.</h2>
        </div>
        <ol className="timeline">
          <li><span>Early years</span><p>The name began as a place to gather technical and educational ideas.</p></li>
          <li><span>Along the way</span><p>Projects, teams, events, and organisation experiments gathered around it.</p></li>
          <li><span>Today</span><p>The archive keeps the useful record, including work that changed course or stopped.</p></li>
        </ol>
        <Link className="text-link" to="/archive">Visit the archive</Link>
      </section>
    </>
  );
}
