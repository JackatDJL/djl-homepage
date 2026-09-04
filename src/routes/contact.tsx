import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/contact")({
  head: () => ({ meta: [{ title: "Contact | DJL Foundation" }] }),
  component: ContactPage,
});

function ContactPage() {
  return (
    <section className="page-section contact-page" aria-labelledby="contact-title">
      <header className="page-intro">
        <p className="eyebrow">CONTACT</p>
        <h1 id="contact-title">For archive corrections, project notes, or a conversation.</h1>
        <p>
          If you have a detail, link, photograph, or correction for an archive entry,
          send it through. The record improves when the people who were there help with it.
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
