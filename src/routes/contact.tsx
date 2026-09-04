import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/contact")({
  head: () => ({ meta: [{ title: "Contact | DJL Foundation" }] }),
  component: ContactPage,
});

function ContactPage() {
  return (
    <section className="page-section contact-page" aria-labelledby="contact-title">
      <header className="page-intro">
        <h1 id="contact-title">Contact</h1>
        <p>
          Send corrections, links, photographs, or other source material for the archive.
        </p>
      </header>
      <dl className="contact-list">
        <div>
          <dt>Email</dt>
          <dd><a href="mailto:contact@djl.foundation">contact@djl.foundation</a></dd>
        </div>
        <div>
          <dt>GitHub</dt>
          <dd><a href="https://github.com/djl-foundation">github.com/djl-foundation</a></dd>
        </div>
      </dl>
    </section>
  );
}
