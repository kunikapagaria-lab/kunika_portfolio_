import { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import Tape from "./Tape";
import { site } from "../siteConfig";
import "./Layout.css";

const LINKS = [
  { to: "/", label: "Home" },
  { to: "/skills", label: "Skills" },
  { to: "/projects", label: "Projects" },
  { to: "/contact", label: "Contact Me" },
];

export default function Layout() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <header className="site-header">
        <div className="container header-inner">
          <NavLink to="/" className="logo hand" onClick={() => setOpen(false)}>
            {site.name}
          </NavLink>

          <button
            className="nav-toggle"
            aria-label="Toggle navigation"
            aria-expanded={open}
            onClick={() => setOpen((o) => !o)}
          >
            <span />
            <span />
            <span />
          </button>

          <nav className={`site-nav ${open ? "is-open" : ""}`}>
            {LINKS.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === "/"}
                className={({ isActive }) => `nav-pill ${isActive ? "is-active" : ""}`}
                onClick={() => setOpen(false)}
              >
                {link.label}
              </NavLink>
            ))}
          </nav>
        </div>
      </header>

      <main className="site-main">
        <Outlet />
      </main>

      <footer className="site-footer">
        <div className="container footer-inner">
          <Tape size="sm" rotate={-8} style={{ position: "relative", top: 0, left: 0 }} />
          <p className="hand footer-note">Thanks for stopping by!</p>
          <p className="footer-copy">
            &copy; {new Date().getFullYear()} {site.name}. Made with care.
          </p>
        </div>
      </footer>
    </>
  );
}
