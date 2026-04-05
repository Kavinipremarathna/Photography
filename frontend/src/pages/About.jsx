import { Link } from "react-router-dom";
import { useEffect, useRef } from "react";
import { useSiteSettings } from "../context/SiteSettingsContext";

export default function About() {
  const cursorRef = useRef(null);
  const ringRef = useRef(null);
  const { settings } = useSiteSettings();
  let mx = 0,
    my = 0,
    rx = 0,
    ry = 0;

  useEffect(() => {
    const cursor = cursorRef.current;
    const ring = ringRef.current;

    const onMove = (e) => {
      mx = e.clientX;
      my = e.clientY;
      if (cursor) {
        cursor.style.left = mx - 5 + "px";
        cursor.style.top = my - 5 + "px";
      }
    };
    document.addEventListener("mousemove", onMove);

    let animId;
    const animateRing = () => {
      rx += (mx - rx - 18) * 0.12;
      ry += (my - ry - 18) * 0.12;
      if (ring) {
        ring.style.left = rx + "px";
        ring.style.top = ry + "px";
      }
      animId = requestAnimationFrame(animateRing);
    };
    animateRing();

    // Scroll reveal
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.style.opacity = "1";
            e.target.style.transform = "translateY(0)";
            observer.unobserve(e.target);
          }
        });
      },
      { threshold: 0.1 },
    );

    document.querySelectorAll(".reveal").forEach((el) => {
      el.style.opacity = "0";
      el.style.transform = "translateY(28px)";
      el.style.transition = "opacity 0.8s ease, transform 0.8s ease";
      observer.observe(el);
    });

    return () => {
      document.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(animId);
      observer.disconnect();
    };
  }, []);

  const team = [
    {
      name: "Aria Lennox",
      role: "Founder & Creative Director",
      img: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=500&q=80",
      quote: "Photography is memory made tangible.",
    },
    {
      name: "Marcus Osei",
      role: "Lead Engineer",
      img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&q=80",
      quote: "Great code is invisible — only the art remains.",
    },
    {
      name: "Yuna Takahashi",
      role: "UI/UX Designer",
      img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=500&q=80",
      quote: "Every pixel has a purpose.",
    },
  ];

  const values = [
    {
      num: "01",
      title: "Craft Over Speed",
      desc: "We take time to get things right. Every layout decision, every hover state, every loading animation is considered.",
    },
    {
      num: "02",
      title: "Photography First",
      desc: "The platform exists to serve the work — not the other way around. Our UI steps back so your images can step forward.",
    },
    {
      num: "03",
      title: "Open & Honest",
      desc: "No dark patterns, no bloated features. Just a clean, transparent tool that does exactly what it promises.",
    },
    {
      num: "04",
      title: "Always Evolving",
      desc: "We ship thoughtfully, listen to photographers, and iterate. The best version of AlbumHub is always being built.",
    },
  ];

  const milestones = [
    {
      year: "2021",
      event:
        "AlbumHub founded in a Colombo apartment with a single album upload feature.",
    },
    {
      year: "2022",
      event:
        "Launched cloud image hosting via Cloudinary. First 500 photographers onboard.",
    },
    {
      year: "2023",
      event: "Introduced the secure admin panel and role-based access system.",
    },
    {
      year: "2024",
      event: "Reached 12,000 monthly visitors and 2,400 published albums.",
    },
    {
      year: "2025",
      event: "Full redesign. Faster, more refined, and built for scale.",
    },
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400&family=DM+Sans:wght@300;400;500&display=swap');

        :root {
          --cream: #f5f0e8;
          --warm-white: #faf8f4;
          --charcoal: #1a1714;
          --gold: #c9a96e;
          --muted: #8a7d72;
          --line: rgba(201,169,110,0.25);
        }

        body { cursor: none !important; background: var(--warm-white); }
        * { font-family: 'DM Sans', sans-serif; }

        .cursor {
          position: fixed; width: 10px; height: 10px;
          background: var(--gold); border-radius: 50%;
          pointer-events: none; z-index: 9999;
          transition: transform 0.15s ease;
          mix-blend-mode: multiply;
        }
        .cursor-ring {
          position: fixed; width: 36px; height: 36px;
          border: 1px solid var(--gold); border-radius: 50%;
          pointer-events: none; z-index: 9998;
          transition: opacity 0.3s; opacity: 0.6;
        }
        .grain {
          position: fixed; inset: 0; pointer-events: none;
          z-index: 1000; opacity: 0.025;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
          background-size: 200px;
        }

        /* Hero */
        .about-hero {
          min-height: 75vh;
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          position: relative;
          overflow: hidden;
          padding: 140px 60px 80px;
          background: var(--charcoal);
        }
        .about-hero-bg {
          position: absolute; inset: 0;
          background-image: url('https://images.unsplash.com/photo-1452587925148-ce544e77e70d?w=1600&q=80');
          background-size: cover;
          background-position: center;
          opacity: 0.18;
          filter: sepia(30%);
        }
        .about-hero-overlay {
          position: absolute; inset: 0;
          background: linear-gradient(to top, var(--charcoal) 40%, transparent);
        }

        .hero-label { animation: fadeUp 0.8s ease 0.2s both; }
        .hero-heading { animation: fadeUp 0.9s ease 0.35s both; }
        .hero-sub { animation: fadeUp 0.9s ease 0.5s both; }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(30px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; } to { opacity: 1; }
        }

        /* Nav */
        .nav-link { transition: color 0.3s; }
        .nav-link:hover { color: var(--charcoal) !important; }
        .nav-cta { transition: background 0.3s, color 0.3s; }
        .nav-cta:hover { background: var(--gold) !important; color: white !important; }

        /* Divider line */
        .gold-line { width: 40px; height: 1px; background: var(--gold); display: inline-block; }

        /* Story split */
        .story-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          min-height: 80vh;
        }
        .story-img-wrap {
          position: relative; overflow: hidden;
        }
        .story-img-wrap img {
          width: 100%; height: 100%;
          object-fit: cover;
          filter: sepia(10%) contrast(1.05);
          transition: transform 10s ease;
        }
        .story-img-wrap:hover img { transform: scale(1.04); }
        .story-img-tag {
          position: absolute; bottom: 32px; left: 32px;
          font-family: 'Playfair Display', serif;
          font-size: 13px; font-style: italic;
          color: rgba(255,255,255,0.75);
          letter-spacing: 0.05em;
        }

        /* Values */
        .value-card {
          padding: 52px 40px;
          border-bottom: 1px solid var(--line);
          border-right: 1px solid var(--line);
          transition: background 0.4s;
          position: relative;
          overflow: hidden;
        }
        .value-card::after {
          content: '';
          position: absolute; left: 0; top: 0; bottom: 0;
          width: 2px; background: var(--gold);
          transform: scaleY(0); transform-origin: bottom;
          transition: transform 0.4s ease;
        }
        .value-card:hover::after { transform: scaleY(1); }
        .value-card:hover { background: var(--cream); }

        /* Team cards */
        .team-card {
          position: relative; overflow: hidden;
          background: var(--charcoal);
        }
        .team-card img {
          width: 100%; height: 420px;
          object-fit: cover;
          object-position: top;
          filter: grayscale(30%) sepia(10%);
          transition: transform 0.7s ease, filter 0.5s;
          display: block;
        }
        .team-card:hover img { transform: scale(1.05); filter: grayscale(0%) sepia(5%); }
        .team-info {
          padding: 28px 28px 32px;
          background: var(--charcoal);
          position: relative;
        }
        .team-info::before {
          content: '';
          position: absolute; top: 0; left: 28px; right: 28px;
          height: 1px; background: var(--line);
        }

        /* Timeline */
        .timeline-item {
          display: grid;
          grid-template-columns: 100px 1fr;
          gap: 40px;
          padding: 36px 0;
          border-bottom: 1px solid var(--line);
          align-items: start;
          transition: padding-left 0.3s;
        }
        .timeline-item:hover { padding-left: 12px; }
        .timeline-item:first-child { border-top: 1px solid var(--line); }

        /* CTA */
        .btn-primary { position: relative; overflow: hidden; display: inline-block; transition: transform 0.3s; }
        .btn-primary::after { content: ''; position: absolute; inset: 0; background: var(--gold); transform: scaleX(0); transform-origin: left; transition: transform 0.4s ease; }
        .btn-primary:hover::after { transform: scaleX(1); }
        .btn-primary:hover { transform: translateY(-2px); }
        .btn-primary span { position: relative; z-index: 1; }

        /* Footer */
        .footer-link { transition: color 0.3s; }
        .footer-link:hover { color: var(--gold) !important; }

        /* Ghost text watermark */
        .section-watermark {
          position: absolute; pointer-events: none; user-select: none;
          font-family: 'Playfair Display', serif;
          font-weight: 900; color: transparent;
          -webkit-text-stroke: 1px rgba(201,169,110,0.08);
          letter-spacing: -4px; line-height: 1;
        }
      `}</style>

      {/* Decorative overlays */}
      <div className="grain" />
      <div className="cursor" ref={cursorRef} />
      <div className="cursor-ring" ref={ringRef} />

      {/* ── NAV ─────────────────────────────────────── */}
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
          background:
            "linear-gradient(to bottom, rgba(26,23,20,0.92), transparent)",
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
            src={settings.logoUrl || "/logo.jpeg"}
            alt={settings.siteName || "AlbumHub"}
            style={{ height: 36, objectFit: "contain" }}
          />
        </Link>
        <div style={{ display: "flex", alignItems: "center", gap: 40 }}>
          {[
            ["Home", "/"],
            ["Albums", "/albums"],
            ["About", "/about"],
            ["Contact", "/contact"],
          ].map(([label, path]) => (
            <Link
              key={label}
              to={path}
              className="nav-link"
              style={{
                fontSize: 13,
                fontWeight: 400,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                textDecoration: "none",
                color:
                  label === "About" ? "var(--gold)" : "rgba(255,255,255,0.5)",
              }}
            >
              {label}
            </Link>
          ))}
        </div>
      </nav>

      {/* ── HERO ────────────────────────────────────── */}
      <section className="about-hero">
        <div className="about-hero-bg" />
        <div className="about-hero-overlay" />

        <div style={{ position: "relative", zIndex: 2, maxWidth: 780 }}>
          <div
            className="hero-label"
            style={{
              fontSize: 11,
              letterSpacing: "0.3em",
              textTransform: "uppercase",
              color: "var(--gold)",
              marginBottom: 28,
              display: "flex",
              alignItems: "center",
              gap: 12,
            }}
          >
            <span className="gold-line" />
            {settings.about?.eyebrow || "Our Story"}
          </div>

          <h1
            className="hero-heading"
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(56px, 6vw, 96px)",
              fontWeight: 900,
              lineHeight: 0.95,
              letterSpacing: -3,
              color: "var(--cream)",
              marginBottom: 36,
            }}
          >
            {settings.about?.title || "Built by People Who Love Photography"}
          </h1>

          <p
            className="hero-sub"
            style={{
              fontSize: 17,
              lineHeight: 1.8,
              color: "rgba(245,240,232,0.6)",
              maxWidth: 560,
              fontWeight: 300,
            }}
          >
            {settings.about?.subtitle ||
              "AlbumHub started as a personal project - a frustration with platforms that made beautiful photography look ordinary. We built the tool we always wished existed."}
          </p>
        </div>

        {/* Floating stat chips */}
        <div
          style={{
            position: "absolute",
            right: 60,
            bottom: 80,
            zIndex: 2,
            display: "flex",
            flexDirection: "column",
            gap: 16,
            animation: "fadeIn 1.2s ease 0.6s both",
          }}
        >
          {[
            ["2021", "Founded"],
            ["3", "Core Team"],
            ["12k+", "Visitors/mo"],
          ].map(([num, label]) => (
            <div
              key={label}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 16,
                background: "rgba(245,240,232,0.06)",
                border: "1px solid var(--line)",
                backdropFilter: "blur(12px)",
                padding: "14px 24px",
              }}
            >
              <span
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: 22,
                  fontWeight: 700,
                  color: "var(--gold)",
                }}
              >
                {num}
              </span>
              <span
                style={{
                  fontSize: 11,
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  color: "rgba(245,240,232,0.5)",
                }}
              >
                {label}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* ── STORY SPLIT ─────────────────────────────── */}
      <div className="story-grid">
        <div className="story-img-wrap reveal">
          <img
            src="https://images.unsplash.com/photo-1542038784456-1ea8e935640e?w=900&q=80"
            alt="Photography studio"
          />
          <div className="story-img-tag">"Let the image breathe."</div>
        </div>

        <div
          className="reveal"
          style={{
            background: "var(--warm-white)",
            padding: "80px 72px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              fontSize: 11,
              letterSpacing: "0.3em",
              textTransform: "uppercase",
              color: "var(--gold)",
              marginBottom: 24,
              display: "flex",
              alignItems: "center",
              gap: 12,
            }}
          >
            <span className="gold-line" />
            The Origin
          </div>

          <h2
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(32px, 3vw, 48px)",
              fontWeight: 700,
              lineHeight: 1.1,
              letterSpacing: -1.5,
              color: "var(--charcoal)",
              marginBottom: 32,
            }}
          >
            A Platform Born
            <br />
            From{" "}
            <em style={{ fontStyle: "italic", color: "var(--gold)" }}>
              Frustration
            </em>
          </h2>

          <p
            style={{
              fontSize: 15,
              lineHeight: 1.85,
              color: "var(--muted)",
              fontWeight: 300,
              marginBottom: 24,
            }}
          >
            We were tired of photography platforms that prioritized clicks over
            craft. Busy interfaces, inconsistent image quality, and admin panels
            that felt like tax forms.
          </p>
          <p
            style={{
              fontSize: 15,
              lineHeight: 1.85,
              color: "var(--muted)",
              fontWeight: 300,
              marginBottom: 48,
            }}
          >
            So we started over. AlbumHub is the result — a platform where the
            work comes first, the interface disappears, and photographers stay
            in complete control.
          </p>

          <div
            style={{
              display: "flex",
              gap: 48,
              paddingTop: 40,
              borderTop: "1px solid var(--line)",
            }}
          >
            {[
              ["2,400+", "Albums Published"],
              ["98k+", "Photos Hosted"],
              ["4.9★", "User Rating"],
            ].map(([num, label]) => (
              <div key={label}>
                <div
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: 28,
                    fontWeight: 700,
                    color: "var(--charcoal)",
                    lineHeight: 1,
                  }}
                >
                  {num}
                </div>
                <div
                  style={{
                    fontSize: 11,
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    color: "var(--muted)",
                    marginTop: 6,
                  }}
                >
                  {label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── VALUES ──────────────────────────────────── */}
      <section
        style={{
          background: "var(--cream)",
          padding: "120px 60px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          className="section-watermark"
          style={{ fontSize: 160, top: 20, right: -20, position: "absolute" }}
        >
          VALUES
        </div>

        <div className="reveal" style={{ marginBottom: 72 }}>
          <div
            style={{
              fontSize: 11,
              letterSpacing: "0.3em",
              textTransform: "uppercase",
              color: "var(--gold)",
              marginBottom: 16,
              display: "flex",
              alignItems: "center",
              gap: 12,
            }}
          >
            <span className="gold-line" />
            What We Stand For
          </div>
          <h2
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(36px, 3.5vw, 52px)",
              fontWeight: 700,
              lineHeight: 1.1,
              letterSpacing: -1.5,
              color: "var(--charcoal)",
            }}
          >
            Our{" "}
            <em style={{ fontStyle: "italic", color: "var(--gold)" }}>
              Principles
            </em>
          </h2>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: 0,
            border: "1px solid var(--line)",
          }}
        >
          {values.map((v, i) => (
            <div
              key={v.num}
              className="value-card reveal"
              style={{ transitionDelay: `${i * 0.1}s` }}
            >
              <div
                style={{
                  fontSize: 11,
                  fontWeight: 700,
                  color: "var(--gold)",
                  letterSpacing: "0.2em",
                  marginBottom: 28,
                }}
              >
                {v.num}
              </div>
              <h3
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: 24,
                  fontWeight: 700,
                  color: "var(--charcoal)",
                  marginBottom: 16,
                  lineHeight: 1.2,
                }}
              >
                {v.title}
              </h3>
              <p
                style={{
                  fontSize: 14,
                  lineHeight: 1.75,
                  color: "var(--muted)",
                  fontWeight: 300,
                }}
              >
                {v.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── TEAM ────────────────────────────────────── */}
      <section style={{ padding: "120px 60px", background: "var(--charcoal)" }}>
        <div className="reveal" style={{ marginBottom: 72 }}>
          <div
            style={{
              fontSize: 11,
              letterSpacing: "0.3em",
              textTransform: "uppercase",
              color: "var(--gold)",
              marginBottom: 16,
              display: "flex",
              alignItems: "center",
              gap: 12,
            }}
          >
            <span className="gold-line" />
            The People
          </div>
          <h2
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(36px, 3.5vw, 52px)",
              fontWeight: 700,
              lineHeight: 1.1,
              letterSpacing: -1.5,
              color: "var(--cream)",
            }}
          >
            Meet the{" "}
            <em style={{ fontStyle: "italic", color: "var(--gold)" }}>Team</em>
          </h2>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 2,
          }}
        >
          {team.map((member, i) => (
            <div
              key={member.name}
              className="team-card reveal"
              style={{ transitionDelay: `${i * 0.15}s` }}
            >
              <img src={member.img} alt={member.name} />
              <div className="team-info">
                <p
                  style={{
                    fontSize: 12,
                    fontStyle: "italic",
                    color: "var(--gold)",
                    marginBottom: 16,
                    lineHeight: 1.6,
                    fontFamily: "'Playfair Display', serif",
                  }}
                >
                  "{member.quote}"
                </p>
                <div
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: 20,
                    fontWeight: 700,
                    color: "var(--cream)",
                    marginBottom: 4,
                  }}
                >
                  {member.name}
                </div>
                <div
                  style={{
                    fontSize: 11,
                    letterSpacing: "0.15em",
                    textTransform: "uppercase",
                    color: "var(--muted)",
                  }}
                >
                  {member.role}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── TIMELINE ────────────────────────────────── */}
      <section
        style={{ padding: "120px 60px", background: "var(--warm-white)" }}
      >
        <div
          className="reveal"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 100,
            alignItems: "start",
          }}
        >
          <div style={{ position: "sticky", top: 120 }}>
            <div
              style={{
                fontSize: 11,
                letterSpacing: "0.3em",
                textTransform: "uppercase",
                color: "var(--gold)",
                marginBottom: 16,
                display: "flex",
                alignItems: "center",
                gap: 12,
              }}
            >
              <span className="gold-line" />
              How We Got Here
            </div>
            <h2
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "clamp(36px, 3.5vw, 52px)",
                fontWeight: 700,
                lineHeight: 1.1,
                letterSpacing: -1.5,
                color: "var(--charcoal)",
                marginBottom: 28,
              }}
            >
              Our{" "}
              <em style={{ fontStyle: "italic", color: "var(--gold)" }}>
                Journey
              </em>
            </h2>
            <p
              style={{
                fontSize: 15,
                lineHeight: 1.8,
                color: "var(--muted)",
                fontWeight: 300,
                maxWidth: 380,
              }}
            >
              Every great product is a series of honest decisions. Here's how
              AlbumHub grew from a side project into a platform photographers
              trust.
            </p>
          </div>

          <div>
            {milestones.map((m, i) => (
              <div
                key={m.year}
                className="timeline-item reveal"
                style={{ transitionDelay: `${i * 0.1}s` }}
              >
                <div
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: 22,
                    fontWeight: 700,
                    color: "var(--gold)",
                    paddingTop: 4,
                  }}
                >
                  {m.year}
                </div>
                <p
                  style={{
                    fontSize: 15,
                    lineHeight: 1.75,
                    color: "var(--muted)",
                    fontWeight: 300,
                  }}
                >
                  {m.event}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── BOTTOM CTA ──────────────────────────────── */}
      <section
        className="reveal"
        style={{
          background: "var(--charcoal)",
          padding: "120px 60px",
          textAlign: "center",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          className="section-watermark"
          style={{
            fontSize: 200,
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            whiteSpace: "nowrap",
          }}
        >
          JOIN US
        </div>

        <div style={{ position: "relative", zIndex: 2 }}>
          <div
            style={{
              fontSize: 11,
              letterSpacing: "0.3em",
              textTransform: "uppercase",
              color: "var(--gold)",
              marginBottom: 24,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 12,
            }}
          >
            <span className="gold-line" />
            Start Today
            <span className="gold-line" />
          </div>

          <h2
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(40px, 5vw, 72px)",
              fontWeight: 900,
              lineHeight: 1.0,
              letterSpacing: -2.5,
              color: "var(--cream)",
              marginBottom: 28,
            }}
          >
            Your Albums Deserve
            <br />
            <em style={{ fontStyle: "italic", color: "var(--gold)" }}>
              Better
            </em>
          </h2>

          <p
            style={{
              fontSize: 16,
              lineHeight: 1.75,
              color: "rgba(245,240,232,0.5)",
              maxWidth: 480,
              margin: "0 auto 52px",
              fontWeight: 300,
            }}
          >
            Join thousands of photographers who've made AlbumHub their home.
          </p>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 24,
            }}
          >
            <Link
              to="/albums"
              className="btn-primary"
              style={{
                fontSize: 12,
                fontWeight: 500,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                textDecoration: "none",
                color: "white",
                background: "var(--gold)",
                padding: "18px 44px",
              }}
            >
              <span>Explore Albums</span>
            </Link>
            <Link
              to="/contact"
              style={{
                fontSize: 12,
                fontWeight: 500,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                textDecoration: "none",
                color: "rgba(245,240,232,0.5)",
                display: "flex",
                alignItems: "center",
                gap: 8,
                transition: "color 0.3s",
              }}
            >
              Get in Touch <span>→</span>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
