import { Zap, Github, Twitter } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer
      style={{
        backgroundColor: "var(--color-surface)",
        borderTop: "1px solid var(--color-border)",
        marginTop: "auto",
      }}
    >
      <div
        className="page-container"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "16px",
          paddingTop: "20px",
          paddingBottom: "20px",
          flexWrap: "wrap",
        }}
      >
        {/* Brand */}
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <div
            style={{
              width: "22px",
              height: "22px",
              borderRadius: "var(--radius-sm)",
              backgroundColor: "var(--color-brand)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            <Zap size={12} color="white" fill="white" />
          </div>
          <span
            style={{
              fontSize: "0.875rem",
              fontWeight: 600,
              color: "var(--color-text-secondary)",
              fontFamily: "var(--font-sans)",
            }}
          >
            Resume<span style={{ color: "var(--color-brand)" }}>Ranker</span>
          </span>
          <span
            style={{
              fontSize: "0.8125rem",
              color: "var(--color-text-muted)",
              marginLeft: "8px",
            }}
          >
            © {new Date().getFullYear()} All rights reserved
          </span>
        </div>

        {/* Links + Socials */}
        <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
          <nav style={{ display: "flex", gap: "16px" }}>
            {[
              { to: "/", label: "Home" },
              { to: "/about", label: "About" },
              { to: "/upload", label: "Analyzer" },
            ].map(({ to, label }) => (
              <Link
                key={to}
                to={to}
                style={{
                  fontSize: "0.8125rem",
                  color: "var(--color-text-muted)",
                  textDecoration: "none",
                  transition: "color 0.15s ease",
                }}
                onMouseEnter={e => e.currentTarget.style.color = "var(--color-text-secondary)"}
                onMouseLeave={e => e.currentTarget.style.color = "var(--color-text-muted)"}
              >
                {label}
              </Link>
            ))}
          </nav>

          <div style={{ display: "flex", gap: "12px" }}>
            <a
              href="#"
              aria-label="GitHub"
              style={{
                color: "var(--color-text-muted)",
                transition: "color 0.15s ease",
                display: "flex",
                alignItems: "center",
              }}
              onMouseEnter={e => e.currentTarget.style.color = "var(--color-text-secondary)"}
              onMouseLeave={e => e.currentTarget.style.color = "var(--color-text-muted)"}
            >
              <Github size={17} />
            </a>
            <a
              href="#"
              aria-label="Twitter / X"
              style={{
                color: "var(--color-text-muted)",
                transition: "color 0.15s ease",
                display: "flex",
                alignItems: "center",
              }}
              onMouseEnter={e => e.currentTarget.style.color = "var(--color-text-secondary)"}
              onMouseLeave={e => e.currentTarget.style.color = "var(--color-text-muted)"}
            >
              <Twitter size={17} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
