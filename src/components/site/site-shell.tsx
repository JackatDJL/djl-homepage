import { Link, Outlet } from "@tanstack/react-router";

const navigation = [
  ["/projects", "Projects"],
  ["/archive", "Archive"],
  ["/about", "About"],
  ["/contact", "Contact"],
] as const;

export function SiteShell() {
  return (
    <div className="site-frame">
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <header className="site-header">
        <Link className="brand" to="/" aria-label="DJL Foundation home">
          <img src="/favicon.ico" alt="" width="44" height="44" />
          <span>DJL Foundation</span>
        </Link>
        <nav aria-label="Main navigation">
          <ul className="nav-list">
            {navigation.map(([to, label]) => (
              <li key={to}>
                <Link to={to} activeProps={{ className: "active" }}>
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </header>
      <main id="main-content">
        <Outlet />
      </main>
      <footer className="site-footer">
        <p>DJL Foundation is an independent project umbrella and archive created by Jack Ruder.</p>
        <p>Not a formally incorporated foundation or registered association.</p>
        <div>
          <a href="mailto:contact@djl.foundation">contact@djl.foundation</a>
          <a href="https://github.com/djl-foundation">GitHub</a>
        </div>
      </footer>
    </div>
  );
}
