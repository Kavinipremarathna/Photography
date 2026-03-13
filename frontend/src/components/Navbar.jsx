import { Link, NavLink, useLocation } from "react-router-dom";

export default function Navbar() {
  const { pathname } = useLocation();
  // Hide navbar on pages that render their own custom navbar
  if (pathname.startsWith("/admin") || pathname === "/contact") {
    return null;
  }
  const isDark = pathname === "/" || pathname === "/about";
  const textColor = isDark ? "rgba(255,255,255,0.5)" : "var(--muted)";
  const bg = isDark
    ? "linear-gradient(to bottom, rgba(26,23,20,0.92), transparent)"
    : "linear-gradient(to bottom, rgba(250,248,244,0.96), transparent)";

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=DM+Sans:wght@400;500&display=swap');
        :root {
          --cream: #f5f0e8;
          --charcoal: #1a1714;
          --gold: #c9a96e;
          --muted: #8a7d72;
        }
        .nav-link {
          font-size: 13px;
          font-weight: 400;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          text-decoration: none;
          transition: color 0.3s;
          font-family: 'DM Sans', sans-serif;
        }
        .nav-link:hover { color: var(--gold) !important; }
        .nav-link.active { color: var(--gold) !important; }
        .nav-cta {
          font-size: 12px;
          font-weight: 500;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          text-decoration: none;
          border: 1px solid var(--gold);
          padding: 10px 22px;
          transition: background 0.3s, color 0.3s;
          font-family: 'DM Sans', sans-serif;
        }
        .nav-cta:hover { background: var(--gold) !important; color: white !important; }
      `}</style>

      <nav
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "24px 60px",
          background: bg,
        }}
      >
        <Link
          to="/"
          style={{
            textDecoration: "none",
            display: "flex",
            alignItems: "center",
          }}
        >
          <img
            src="/logo.jpeg"
            alt="AlbumHub"
            style={{
              height: 40,
              objectFit: "contain",
            }}
          />
        </Link>

        <div style={{ display: "flex", alignItems: "center", gap: 40 }}>
          {[
            ["Home", "/"],
            ["Albums", "/albums"],
            ["About", "/about"],
            ["Contact", "/contact"],
          ].map(([label, path]) => (
            <NavLink
              key={label}
              to={path}
              end={path === "/"}
              className={({ isActive }) =>
                `nav-link${isActive ? " active" : ""}`
              }
              style={{ color: textColor }}
            >
              {label}
            </NavLink>
          ))}
        </div>
      </nav>
    </>
  );
}
