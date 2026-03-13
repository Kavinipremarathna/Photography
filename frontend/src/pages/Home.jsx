import { Link } from "react-router-dom";
import { useEffect, useRef } from "react";

export default function Home() {
  const cursorRef = useRef(null);
  const ringRef = useRef(null);
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
      el.style.transition = "opacity 0.7s ease, transform 0.7s ease";
      observer.observe(el);
    });

    return () => {
      document.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(animId);
      observer.disconnect();
    };
  }, []);

  const features = [
    {
      num: "01",
      icon: "⬡",
      title: "Beautiful Album Grid",
      desc: "A clean, breathable layout to browse albums with intuitive filters and lightning-fast search.",
    },
    {
      num: "02",
      icon: "◈",
      title: "Secure Admin Panel",
      desc: "Add, edit, and delete albums. Upload cover images with role-based access control.",
    },
    {
      num: "03",
      icon: "◎",
      title: "Cloud Image Hosting",
      desc: "All cover images stored and served via Cloudinary — fast, optimized, and reliable.",
    },
    {
      num: "04",
      icon: "◇",
      title: "Deploy Anywhere",
      desc: "Works seamlessly with MongoDB Atlas + Vercel or Render for production deployment.",
    },
  ];

  const albums = [
    {
      img: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80",
      tag: "Landscape",
      title: "Alpine Silence",
      count: "48 photos",
    },
    {
      img: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=600&q=80",
      tag: "Urban",
      title: "City Pulse",
      count: "62 photos",
    },
    {
      img: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=600&q=80",
      tag: "Portrait",
      title: "Human Stories",
      count: "34 photos",
    },
    {
      img: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=600&q=80",
      tag: "Nature",
      title: "Forest Light",
      count: "57 photos",
    },
    {
      img: "https://images.unsplash.com/photo-1518895949257-7621c3c786d7?w=600&q=80",
      tag: "Abstract",
      title: "Color & Form",
      count: "29 photos",
    },
  ];

  return (
    <>
      {/* ── Inline global styles ───────────────────────── */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900;1,400&family=DM+Sans:wght@300;400;500&display=swap');

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
        .hero { min-height: 100vh; display: grid; grid-template-columns: 1fr 1fr; position: relative; overflow: hidden; }
        .hero-eyebrow { animation: fadeUp 0.8s ease 0.2s both; }
        .hero-title { animation: fadeUp 0.9s ease 0.35s both; }
        .hero-desc { animation: fadeUp 0.9s ease 0.5s both; }
        .hero-actions { animation: fadeUp 0.9s ease 0.65s both; }
        .hero-stats { animation: fadeUp 0.9s ease 0.8s both; }
        .mosaic-wrap { animation: fadeIn 1.2s ease 0.4s both; }
        .scroll-hint { animation: fadeIn 1s ease 1.2s both; }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(30px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; } to { opacity: 1; }
        }

        /* Buttons */
        .btn-primary { position: relative; overflow: hidden; display: inline-block; }
        .btn-primary::after {
          content: ''; position: absolute; inset: 0;
          background: var(--gold); transform: scaleX(0);
          transform-origin: left; transition: transform 0.4s ease;
        }
        .btn-primary:hover::after { transform: scaleX(1); }
        .btn-primary:hover { transform: translateY(-2px); }
        .btn-primary span { position: relative; z-index: 1; }

        .btn-text { transition: color 0.3s, gap 0.3s; }
        .btn-text:hover { color: var(--charcoal) !important; }

        /* Mosaic */
        .mosaic { display: grid; grid-template-columns: 1fr 1fr; grid-template-rows: 1fr 1fr 1fr; gap: 4px; height: 100%; padding: 80px 40px 40px 0; }
        .mosaic-item:nth-child(1) { grid-row: span 2; }
        .mosaic-item:nth-child(4) { grid-column: span 2; }
        .mosaic-item img { transition: transform 0.8s ease; }
        .mosaic-item:hover img { transform: scale(1.06); }
        .hero-right::after {
          content: ''; position: absolute; inset: 0;
          background: linear-gradient(to right, var(--warm-white) 0%, transparent 15%);
          z-index: 2; pointer-events: none;
        }

        /* Feature cards */
        .feature-card { position: relative; overflow: hidden; transition: background 0.4s; }
        .feature-card::before {
          content: ''; position: absolute; bottom: 0; left: 0; right: 0;
          height: 2px; background: var(--gold);
          transform: scaleX(0); transform-origin: left; transition: transform 0.4s ease;
        }
        .feature-card:hover::before { transform: scaleX(1); }
        .feature-card:hover { background: white !important; }

        /* Albums strip */
        .album-strip { display: flex; gap: 2px; overflow-x: auto; scrollbar-width: none; -webkit-overflow-scrolling: touch; }
        .album-strip::-webkit-scrollbar { display: none; }
        .album-card { flex: 0 0 300px; height: 400px; position: relative; overflow: hidden; cursor: pointer; }
        .album-card img { width: 100%; height: 100%; object-fit: cover; filter: brightness(0.7) sepia(20%); transition: transform 0.7s ease, filter 0.5s; }
        .album-card:hover img { transform: scale(1.08); filter: brightness(0.85) sepia(5%); }
        .album-overlay { position: absolute; bottom: 0; left: 0; right: 0; padding: 32px 28px 28px; background: linear-gradient(to top, rgba(26,23,20,0.95), transparent); transform: translateY(20px); opacity: 0; transition: transform 0.4s ease, opacity 0.4s; }
        .album-card:hover .album-overlay { transform: translateY(0); opacity: 1; }

        /* CTA links */
        .cta-link { transition: color 0.3s, padding-left 0.3s; }
        .cta-link:hover { color: var(--gold) !important; padding-left: 8px; }

        /* Footer links */
        .footer-link { transition: color 0.3s; }
        .footer-link:hover { color: var(--gold) !important; }

        /* Features ghost text */
        .features-section { position: relative; }
        .features-section::before {
          content: 'FEATURES'; position: absolute;
          top: 60px; right: 60px;
          font-family: 'Playfair Display', serif;
          font-size: 120px; font-weight: 900;
          color: transparent; -webkit-text-stroke: 1px rgba(58,43,31,0.06);
          letter-spacing: -4px; user-select: none; pointer-events: none;
        }

        /* Scroll line */
        .scroll-line { animation: scrollLine 2s ease-in-out infinite; }
        @keyframes scrollLine {
          0%, 100% { transform: scaleY(1); opacity: 1; }
          50%       { transform: scaleY(0.5); opacity: 0.4; }
        }

        /* Nav */
        .nav-link { transition: color 0.3s; }
        .nav-link:hover { color: var(--charcoal) !important; }
        .nav-cta { transition: background 0.3s, color 0.3s; }
        .nav-cta:hover { background: var(--gold) !important; color: white !important; }
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
            "linear-gradient(to bottom, rgba(250,248,244,0.96), transparent)",
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
                color: "var(--muted)",
              }}
            >
              {label}
            </Link>
          ))}
        </div>
      </nav>

      {/* ── HERO ────────────────────────────────────── */}
      <section className="hero">
        {/* Left */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            padding: "140px 60px 80px",
            position: "relative",
            zIndex: 2,
          }}
        >
          <div
            className="hero-eyebrow"
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
            <span
              style={{
                display: "block",
                width: 40,
                height: 1,
                background: "var(--gold)",
              }}
            />
            Premium Photography Platform
          </div>

          <h1
            className="hero-title"
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(52px, 5.5vw, 82px)",
              fontWeight: 900,
              lineHeight: 1.0,
              letterSpacing: -2,
              color: "var(--charcoal)",
              marginBottom: 32,
            }}
          >
            Showcase
            <br />
            Albums with
            <br />
            <em style={{ fontStyle: "italic", color: "var(--gold)" }}>
              Elegance
            </em>
          </h1>

          <p
            className="hero-desc"
            style={{
              fontSize: 15,
              lineHeight: 1.75,
              color: "var(--muted)",
              maxWidth: 380,
              marginBottom: 52,
              fontWeight: 300,
            }}
          >
            AlbumHub is a refined photography platform with secure admin
            controls, cloud image hosting, and a layout built to let your work
            breathe.
          </p>

          <div
            className="hero-actions"
            style={{ display: "flex", alignItems: "center", gap: 24 }}
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
                background: "var(--charcoal)",
                padding: "16px 36px",
                transition: "transform 0.3s",
              }}
            >
              <span>Explore Albums</span>
            </Link>
            <Link
              to="/contact"
              className="btn-text"
              style={{
                fontSize: 12,
                fontWeight: 500,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                textDecoration: "none",
                color: "var(--muted)",
                display: "flex",
                alignItems: "center",
                gap: 8,
              }}
            >
              Get in Touch <span>→</span>
            </Link>
          </div>

          <div
            className="hero-stats"
            style={{
              display: "flex",
              gap: 44,
              marginTop: 64,
              paddingTop: 44,
              borderTop: "1px solid var(--line)",
            }}
          >
            {[
              ["2.4k", "Albums"],
              ["98k", "Photos"],
              ["12k", "Visitors"],
            ].map(([num, label]) => (
              <div key={label}>
                <div
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: 32,
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
                    letterSpacing: "0.12em",
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

        {/* Right — mosaic */}
        <div
          className="hero-right"
          style={{ position: "relative", overflow: "hidden" }}
        >
          <div
            className="mosaic mosaic-wrap"
            style={{ position: "absolute", inset: 0 }}
          >
            {[
              "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80",
              "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=400&q=80",
              "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=400&q=80",
              "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&q=80",
            ].map((src, i) => (
              <div
                key={i}
                className="mosaic-item"
                style={{
                  position: "relative",
                  overflow: "hidden",
                  background: "var(--cream)",
                }}
              >
                <img
                  src={src}
                  alt=""
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    filter: "sepia(15%) contrast(1.05)",
                  }}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Scroll hint */}
        <div
          className="scroll-hint"
          style={{
            position: "absolute",
            bottom: 40,
            left: 60,
            display: "flex",
            alignItems: "center",
            gap: 12,
          }}
        >
          <div
            className="scroll-line"
            style={{
              width: 1,
              height: 60,
              background:
                "linear-gradient(to bottom, var(--gold), transparent)",
            }}
          />
          <div
            style={{
              fontSize: 10,
              letterSpacing: "0.3em",
              textTransform: "uppercase",
              color: "var(--muted)",
              writingMode: "vertical-rl",
            }}
          >
            Scroll
          </div>
        </div>
      </section>

      {/* ── FEATURES ────────────────────────────────── */}
      <section
        className="features-section reveal"
        style={{ background: "var(--cream)", padding: "120px 60px" }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-between",
            marginBottom: 72,
          }}
        >
          <div>
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
              <span
                style={{
                  display: "block",
                  width: 30,
                  height: 1,
                  background: "var(--gold)",
                }}
              />
              What We Offer
            </div>
            <h2
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "clamp(36px,3.5vw,52px)",
                fontWeight: 700,
                lineHeight: 1.1,
                letterSpacing: -1.5,
                color: "var(--charcoal)",
              }}
            >
              Built for
              <br />
              <em style={{ fontStyle: "italic", color: "var(--gold)" }}>
                Photographers
              </em>
            </h2>
          </div>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4,1fr)",
            gap: 2,
          }}
        >
          {features.map((f) => (
            <div
              key={f.num}
              className="feature-card reveal"
              style={{ background: "var(--warm-white)", padding: "48px 36px" }}
            >
              <div
                style={{
                  fontSize: 11,
                  fontWeight: 700,
                  color: "var(--gold)",
                  letterSpacing: "0.2em",
                  marginBottom: 36,
                }}
              >
                {f.num}
              </div>
              <span
                style={{ fontSize: 28, marginBottom: 24, display: "block" }}
              >
                {f.icon}
              </span>
              <div
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: 20,
                  fontWeight: 700,
                  color: "var(--charcoal)",
                  marginBottom: 12,
                  lineHeight: 1.2,
                }}
              >
                {f.title}
              </div>
              <div
                style={{
                  fontSize: 13.5,
                  lineHeight: 1.7,
                  color: "var(--muted)",
                  fontWeight: 300,
                }}
              >
                {f.desc}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── ALBUM SHOWCASE ──────────────────────────── */}
      <section
        style={{
          padding: "120px 0",
          background: "var(--charcoal)",
          overflow: "hidden",
        }}
      >
        <div className="reveal" style={{ padding: "0 60px", marginBottom: 64 }}>
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
            <span
              style={{
                display: "block",
                width: 30,
                height: 1,
                background: "var(--gold)",
              }}
            />
            Selected Work
          </div>
          <h2
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(36px,3.5vw,52px)",
              fontWeight: 700,
              lineHeight: 1.1,
              letterSpacing: -1.5,
              color: "var(--cream)",
            }}
          >
            Featured{" "}
            <em style={{ fontStyle: "italic", color: "var(--gold)" }}>
              Albums
            </em>
          </h2>
        </div>

        <div className="album-strip reveal" style={{ padding: "0 60px" }}>
          {albums.map((a) => (
            <div
              key={a.title}
              className="album-card"
              style={{ background: "#2a2320" }}
            >
              <img src={a.img} alt={a.title} />
              <div
                style={{
                  position: "absolute",
                  top: 20,
                  left: 20,
                  fontSize: 10,
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  color: "white",
                  background: "rgba(201,169,110,0.85)",
                  padding: "5px 10px",
                  backdropFilter: "blur(4px)",
                }}
              >
                {a.tag}
              </div>
              <div className="album-overlay">
                <div
                  style={{
                    fontSize: 10,
                    letterSpacing: "0.3em",
                    textTransform: "uppercase",
                    color: "var(--gold)",
                    marginBottom: 6,
                  }}
                >
                  {a.tag}
                </div>
                <div
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: 20,
                    fontWeight: 700,
                    color: "white",
                    lineHeight: 1.2,
                  }}
                >
                  {a.title}
                </div>
                <div
                  style={{
                    fontSize: 12,
                    color: "rgba(255,255,255,0.5)",
                    marginTop: 4,
                  }}
                >
                  {a.count}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA ─────────────────────────────────────── */}
      <section
        className="reveal"
        style={{
          padding: "140px 60px",
          background: "var(--cream)",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 100,
          alignItems: "center",
        }}
      >
        <h2
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "clamp(40px,4vw,64px)",
            fontWeight: 900,
            lineHeight: 1.0,
            letterSpacing: -2,
            color: "var(--charcoal)",
          }}
        >
          Ready to{" "}
          <em style={{ fontStyle: "italic", color: "var(--gold)" }}>Elevate</em>{" "}
          Your Gallery?
        </h2>
        <div style={{ display: "flex", flexDirection: "column", gap: 36 }}>
          <p
            style={{
              fontSize: 16,
              lineHeight: 1.75,
              color: "var(--muted)",
              fontWeight: 300,
            }}
          >
            Start curating your photography with a platform that's as refined as
            the work you create. No compromises on design or performance.
          </p>
          <div style={{ borderTop: "1px solid var(--line)" }}>
            {[
              ["Explore all albums", "/albums"],
              ["Get in touch", "/contact"],
            ].map(([label, path]) => (
              <Link
                key={label}
                to={path}
                className="cta-link"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "20px 0",
                  borderBottom: "1px solid var(--line)",
                  textDecoration: "none",
                  color: "var(--charcoal)",
                  fontSize: 14,
                  fontWeight: 500,
                  letterSpacing: "0.02em",
                }}
              >
                <span>{label}</span>
                <span style={{ color: "var(--gold)", fontSize: 18 }}>→</span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
