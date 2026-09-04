import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/about")({
  head: () => ({ meta: [{ title: "About | DJL Foundation" }] }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <article className="prose page-section" aria-labelledby="about-title">
      <header className="page-intro">
        <p className="eyebrow">ABOUT</p>
        <h1 id="about-title">A historical name for a changing set of projects.</h1>
      </header>
      <div className="prose-body">
        <p>
          Jack Ruder started DJL Foundation as a youth-led umbrella idea around
          technology, education, and experimentation. It was a way to make room for
          projects before they had a fixed shape.
        </p>
        <p>
          Experiences with Hack Club mattered here. They made a simple point feel
          practical: young people can organise technical work, teach one another, and
          make things in public without waiting for a large institution to grant permission.
        </p>
        <p>
          Over time, teams, civic ideas, events, and project names lived under or around
          the umbrella. Some became active projects. Some paused. Some never became formal
          organisations. Some moved on and became their own thing.
        </p>
        <p>
          DJL is a historical project name. It is not expanded here and does not describe
          a legal entity. Today, the site keeps an honest record of that work and leaves
          room for what comes next.
        </p>
      </div>
      <aside className="legal-note">
        <strong>Legal status.</strong> DJL Foundation is an independent project umbrella
        and archive. It is not currently a formally incorporated foundation or registered
        association.
      </aside>
    </article>
  );
}
