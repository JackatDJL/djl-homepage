import type { Project } from "../../content/projects";

export function ProjectEntry({ project }: { project: Project }) {
  return (
    <article className="project-entry">
      <div className="project-year">{project.year}</div>
      <div className="project-record">
        <div className="project-title-row">
          <h2>{project.name}</h2>
          <span className={`project-status project-status-${project.status}`}>
            {project.status}
          </span>
        </div>
        <p>{project.description}</p>
        {project.links.length > 0 && (
          <p className="project-links">
            {project.links.map((link) => (
              <a href={link.url} key={link.url}>
                {link.label}
              </a>
            ))}
          </p>
        )}
      </div>
      {project.artifact && (
        <figure className="project-artifact">
          <img src={project.artifact.src} alt={project.artifact.alt} loading="lazy" />
          <figcaption>{project.artifact.caption}</figcaption>
        </figure>
      )}
    </article>
  );
}
