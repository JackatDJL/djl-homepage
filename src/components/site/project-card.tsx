import type { Project } from "../../content/projects";
import { statusLabels } from "../../content/projects";

type ProjectCardProps = {
  project: Project;
  compact?: boolean;
};

export function ProjectCard({ project, compact = false }: ProjectCardProps) {
  return (
    <article className={compact ? "project-card project-card-compact" : "project-card"}>
      <div className="project-card-top">
        <p className="metadata">{project.period}</p>
        <span className={`status status-${project.status}`}>
          {statusLabels[project.status]}
        </span>
      </div>
      <h3>{project.name}</h3>
      <p className="project-description">{project.description}</p>
      <ul className="topic-list" aria-label={`Topics for ${project.name}`}>
        {project.topics.map((topic) => (
          <li key={topic}>{topic}</li>
        ))}
      </ul>
      {!compact && (
        <p className="project-relationship">{project.relationship}</p>
      )}
      {project.note && <p className="project-note">{project.note}</p>}
      {(project.url || project.githubUrl) && (
        <p className="project-links">
          {project.url && <a href={project.url}>Project site</a>}
          {project.githubUrl && <a href={project.githubUrl}>GitHub</a>}
        </p>
      )}
    </article>
  );
}
