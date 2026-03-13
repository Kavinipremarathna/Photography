import { Link } from "react-router-dom";
import { useState, useEffect, useRef } from "react";

export default function Contact() {
  const cursorRef = useRef(null);
  const ringRef = useRef(null);
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [focused, setFocused] = useState("");
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

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const contacts = [
    {
      icon: "✦",
      label: "Email",
      value: "hello@albumhub.com",
      sub: "We reply within 24 hours",
    },
    {
      icon: "◎",
      label: "Location",
      value: "Colombo, Sri Lanka",
      sub: "Available globally",
    },
    {
      icon: "◇",
      label: "Working Hours",
      value: "Mon – Fri, 9am – 6pm",
      sub: "IST (UTC+5:30)",
    },
  ];

  const faqs = [
    {
      q: "Is AlbumHub free to use?",
      a: "AlbumHub offers a free tier with core features. Premium plans unlock advanced admin tools, higher storage, and priority support.",
    },
    {
      q: "Can I upload my own cover images?",
      a: "Absolutely. All cover images are uploaded via Cloudinary — fast, optimized delivery with no quality loss.",
    },
    {
      q: "Is my data secure?",
      a: "Yes. We use role-based access control, secure API endpoints, and MongoDB Atlas for all data storage.",
    },
    {
      q: "Can I embed albums on my own website?",
      a: "Embed support is on our roadmap. For now, you can share direct album links with your audience.",
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
        * { font-family: 'DM Sans', sans-serif; box-sizing: border-box; }

        .cursor {
          position: fixed; width: 10px; height: 10px;
          background: var(--gold); border-radius: 50%;
          pointer-events: none; z-index: 9999;
          transition: transform 0.15s ease; mix-blend-mode: multiply;
        }
        .cursor-ring {
          position: fixed; width: 36px; height: 36px;
          border: 1px solid var(--gold); border-radius: 50%;
          pointer-events: none; z-index: 9998; opacity: 0.6;
        }
        .grain {
          position: fixed; inset: 0; pointer-events: none; z-index: 1000; opacity: 0.025;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
          background-size: 200px;
        }

        /* Nav */
        .nav-link { font-size: 13px; font-weight: 400; letter-spacing: 0.08em; text-transform: uppercase; text-decoration: none; transition: color 0.3s; }
        .nav-link:hover { color: var(--gold) !important; }
        .nav-cta { transition: background 0.3s, color 0.3s; }
        .nav-cta:hover { background: var(--gold) !important; color: white !important; }

        /* Hero */
        .contact-hero {
          min-height: 60vh;
          display: flex; flex-direction: column; justify-content: flex-end;
          position: relative; overflow: hidden;
          padding: 140px 60px 80px;
          background: var(--charcoal);
        }
        .hero-bg {
          position: absolute; inset: 0;
          background-image: url('https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=1600&q=80');
          background-size: cover; background-position: center;
          opacity: 0.15; filter: sepia(30%);
        }
        .hero-overlay {
          position: absolute; inset: 0;
          background: linear-gradient(to top, var(--charcoal) 50%, rgba(26,23,20,0.4));
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
        @keyframes scaleIn {
          from { opacity: 0; transform: scale(0.92); }
          to   { opacity: 1; transform: scale(1); }
        }

        /* Form fields */
        .field-wrap { position: relative; margin-bottom: 28px; }
        .field-label {
          display: block; font-size: 10px; font-weight: 500;
          letter-spacing: 0.25em; text-transform: uppercase;
          color: var(--muted); margin-bottom: 10px;
          transition: color 0.3s;
        }
        .field-label.active { color: var(--gold); }
        .field-input {
          width: 100%; background: transparent;
          border: none; border-bottom: 1px solid var(--line);
          padding: 12px 0; font-size: 15px; font-weight: 300;
          color: var(--charcoal); outline: none;
          transition: border-color 0.3s;
          font-family: 'DM Sans', sans-serif;
        }
        .field-input::placeholder { color: transparent; }
        .field-input:focus { border-color: var(--gold); }
        .field-line {
          position: absolute; bottom: 0; left: 0;
          height: 1px; background: var(--gold);
          width: 0; transition: width 0.4s ease;
        }
        .field-input:focus ~ .field-line { width: 100%; }

        textarea.field-input { resize: none; min-height: 120px; }

        /* Submit button */
        .btn-submit {
          position: relative; overflow: hidden;
          font-size: 12px; font-weight: 500;
          letter-spacing: 0.15em; text-transform: uppercase;
          color: white; background: var(--charcoal);
          border: none; padding: 18px 52px;
          cursor: none; transition: transform 0.3s;
          font-family: 'DM Sans', sans-serif;
        }
        .btn-submit::after {
          content: ''; position: absolute; inset: 0;
          background: var(--gold); transform: scaleX(0);
          transform-origin: left; transition: transform 0.4s ease;
        }
        .btn-submit:hover::after { transform: scaleX(1); }
        .btn-submit:hover { transform: translateY(-2px); }
        .btn-submit span { position: relative; z-index: 1; }

        /* Contact info cards */
        .contact-card {
          padding: 40px 36px;
          border: 1px solid var(--line);
          background: var(--warm-white);
          transition: border-color 0.4s, transform 0.3s;
          position: relative; overflow: hidden;
        }
        .contact-card::before {
          content: ''; position: absolute; top: 0; left: 0; right: 0;
          height: 2px; background: var(--gold);
          transform: scaleX(0); transform-origin: left;
          transition: transform 0.4s ease;
        }
        .contact-card:hover::before { transform: scaleX(1); }
        .contact-card:hover { transform: translateY(-4px); border-color: var(--gold); }

        /* FAQ */
        .faq-item {
          border-bottom: 1px solid var(--line);
          overflow: hidden;
        }
        .faq-question {
          width: 100%; background: none; border: none;
          display: flex; align-items: center; justify-content: space-between;
          padding: 28px 0; cursor: none; text-align: left;
          font-family: 'DM Sans', sans-serif;
          transition: color 0.3s;
        }
        .faq-question:hover { color: var(--gold) !important; }
        .faq-answer {
          font-size: 14px; line-height: 1.8;
          color: var(--muted); font-weight: 300;
          max-height: 0; overflow: hidden;
          transition: max-height 0.4s ease, padding 0.4s;
        }
        .faq-answer.open { max-height: 200px; padding-bottom: 28px; }
        .faq-icon { transition: transform 0.4s; color: var(--gold); font-size: 20px; }
        .faq-icon.open { transform: rotate(45deg); }

        /* Success state */
        .success-box { animation: scaleIn 0.6s ease both; }

        .gold-line { width: 40px; height: 1px; background: var(--gold); display: inline-block; }
        .section-watermark {
          position: absolute; pointer-events: none; user-select: none;
          font-family: 'Playfair Display', serif; font-weight: 900;
          color: transparent; -webkit-text-stroke: 1px rgba(201,169,110,0.07);
          letter-spacing: -4px; line-height: 1;
        }
      `}</style>

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
                color:
                  label === "Contact" ? "var(--gold)" : "rgba(255,255,255,0.5)",
              }}
            >
              {label}
            </Link>
          ))}
        </div>
      </nav>

      {/* ── HERO ────────────────────────────────────── */}
      <section className="contact-hero">
        <div className="hero-bg" />
        <div className="hero-overlay" />
        <div style={{ position: "relative", zIndex: 2, maxWidth: 700 }}>
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
            Get In Touch
          </div>
          <h1
            className="hero-heading"
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(52px, 6vw, 88px)",
              fontWeight: 900,
              lineHeight: 0.95,
              letterSpacing: -3,
              color: "var(--cream)",
              marginBottom: 32,
            }}
          >
            Let's Start a<br />
            <em style={{ fontStyle: "italic", color: "var(--gold)" }}>
              Conversation
            </em>
          </h1>
          <p
            className="hero-sub"
            style={{
              fontSize: 16,
              lineHeight: 1.8,
              color: "rgba(245,240,232,0.55)",
              fontWeight: 300,
              maxWidth: 480,
            }}
          >
            Whether you have a question, a collaboration idea, or just want to
            say hello — we'd love to hear from you.
          </p>
        </div>
      </section>

      {/* ── CONTACT CARDS ───────────────────────────── */}
      <section
        className="reveal"
        style={{ background: "var(--cream)", padding: "80px 60px" }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 2,
          }}
        >
          {contacts.map((c, i) => (
            <div
              key={c.label}
              className="contact-card reveal"
              style={{ transitionDelay: `${i * 0.12}s` }}
            >
              <div
                style={{ fontSize: 22, color: "var(--gold)", marginBottom: 24 }}
              >
                {c.icon}
              </div>
              <div
                style={{
                  fontSize: 10,
                  letterSpacing: "0.25em",
                  textTransform: "uppercase",
                  color: "var(--muted)",
                  marginBottom: 10,
                }}
              >
                {c.label}
              </div>
              <div
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: 20,
                  fontWeight: 700,
                  color: "var(--charcoal)",
                  marginBottom: 6,
                }}
              >
                {c.value}
              </div>
              <div
                style={{ fontSize: 12, color: "var(--muted)", fontWeight: 300 }}
              >
                {c.sub}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── FORM + SIDEBAR ──────────────────────────── */}
      <section
        style={{ background: "var(--warm-white)", padding: "120px 60px" }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1.1fr",
            gap: 100,
            alignItems: "start",
          }}
        >
          {/* Left — info */}
          <div className="reveal">
            <div
              style={{
                fontSize: 11,
                letterSpacing: "0.3em",
                textTransform: "uppercase",
                color: "var(--gold)",
                marginBottom: 20,
                display: "flex",
                alignItems: "center",
                gap: 12,
              }}
            >
              <span className="gold-line" />
              Send a Message
            </div>
            <h2
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "clamp(32px, 3vw, 48px)",
                fontWeight: 700,
                lineHeight: 1.1,
                letterSpacing: -1.5,
                color: "var(--charcoal)",
                marginBottom: 28,
              }}
            >
              We Read Every
              <br />
              <em style={{ fontStyle: "italic", color: "var(--gold)" }}>
                Message
              </em>
            </h2>
            <p
              style={{
                fontSize: 15,
                lineHeight: 1.85,
                color: "var(--muted)",
                fontWeight: 300,
                marginBottom: 52,
              }}
            >
              Our team is small, which means your message lands directly with
              someone who cares. No bots, no templated responses — just a real
              reply.
            </p>

            {/* Social links */}
            <div style={{ paddingTop: 44, borderTop: "1px solid var(--line)" }}>
              <div
                style={{
                  fontSize: 10,
                  letterSpacing: "0.25em",
                  textTransform: "uppercase",
                  color: "var(--muted)",
                  marginBottom: 20,
                }}
              >
                Find us online
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
                {[
                  ["Instagram", "@albumhub"],
                  ["Twitter / X", "@albumhub"],
                  ["GitHub", "github.com/albumhub"],
                ].map(([platform, handle]) => (
                  <div
                    key={platform}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      padding: "16px 0",
                      borderBottom: "1px solid var(--line)",
                    }}
                  >
                    <span
                      style={{
                        fontSize: 13,
                        fontWeight: 500,
                        color: "var(--charcoal)",
                      }}
                    >
                      {platform}
                    </span>
                    <span
                      style={{
                        fontSize: 12,
                        color: "var(--muted)",
                        fontWeight: 300,
                      }}
                    >
                      {handle}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right — form */}
          <div className="reveal" style={{ transitionDelay: "0.15s" }}>
            {submitted ? (
              <div
                className="success-box"
                style={{
                  padding: "60px 48px",
                  background: "var(--charcoal)",
                  textAlign: "center",
                }}
              >
                <div
                  style={{
                    fontSize: 36,
                    marginBottom: 24,
                    color: "var(--gold)",
                  }}
                >
                  ✦
                </div>
                <h3
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: 28,
                    fontWeight: 700,
                    color: "var(--cream)",
                    marginBottom: 16,
                  }}
                >
                  Message Received
                </h3>
                <p
                  style={{
                    fontSize: 14,
                    lineHeight: 1.75,
                    color: "rgba(245,240,232,0.5)",
                    marginBottom: 36,
                    fontWeight: 300,
                  }}
                >
                  Thank you for reaching out. We'll be in touch within 24 hours.
                </p>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setForm({ name: "", email: "", subject: "", message: "" });
                  }}
                  style={{
                    fontSize: 11,
                    letterSpacing: "0.2em",
                    textTransform: "uppercase",
                    color: "var(--gold)",
                    background: "none",
                    border: "1px solid var(--line)",
                    padding: "12px 28px",
                    cursor: "none",
                    fontFamily: "inherit",
                  }}
                >
                  Send Another
                </button>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                style={{ padding: "52px 48px", background: "var(--cream)" }}
              >
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: "0 28px",
                  }}
                >
                  {/* Name */}
                  <div className="field-wrap">
                    <label
                      className={`field-label${focused === "name" ? " active" : ""}`}
                    >
                      Full Name
                    </label>
                    <input
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      onFocus={() => setFocused("name")}
                      onBlur={() => setFocused("")}
                      required
                      className="field-input"
                      placeholder="Your name"
                    />
                    <div className="field-line" />
                  </div>

                  {/* Email */}
                  <div className="field-wrap">
                    <label
                      className={`field-label${focused === "email" ? " active" : ""}`}
                    >
                      Email Address
                    </label>
                    <input
                      name="email"
                      type="email"
                      value={form.email}
                      onChange={handleChange}
                      onFocus={() => setFocused("email")}
                      onBlur={() => setFocused("")}
                      required
                      className="field-input"
                      placeholder="you@example.com"
                    />
                    <div className="field-line" />
                  </div>
                </div>

                {/* Subject */}
                <div className="field-wrap">
                  <label
                    className={`field-label${focused === "subject" ? " active" : ""}`}
                  >
                    Subject
                  </label>
                  <input
                    name="subject"
                    value={form.subject}
                    onChange={handleChange}
                    onFocus={() => setFocused("subject")}
                    onBlur={() => setFocused("")}
                    required
                    className="field-input"
                    placeholder="What's this about?"
                  />
                  <div className="field-line" />
                </div>

                {/* Message */}
                <div className="field-wrap">
                  <label
                    className={`field-label${focused === "message" ? " active" : ""}`}
                  >
                    Message
                  </label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    onFocus={() => setFocused("message")}
                    onBlur={() => setFocused("")}
                    required
                    className="field-input"
                    placeholder="Tell us everything..."
                  />
                  <div className="field-line" />
                </div>

                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginTop: 12,
                  }}
                >
                  <button type="submit" className="btn-submit">
                    <span>Send Message →</span>
                  </button>
                  <span
                    style={{
                      fontSize: 11,
                      color: "var(--muted)",
                      letterSpacing: "0.05em",
                    }}
                  >
                    We reply within 24h
                  </span>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* ── FAQ ─────────────────────────────────────── */}
      <FAQ faqs={faqs} />
    </>
  );
}

/* ── FAQ sub-component ──────────────────────────── */
function FAQ({ faqs }) {
  const [open, setOpen] = useState(null);

  return (
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
        style={{ fontSize: 150, top: 10, right: -10, position: "absolute" }}
      >
        FAQ
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1.4fr",
          gap: 100,
          alignItems: "start",
        }}
      >
        <div className="reveal" style={{ position: "sticky", top: 120 }}>
          <div
            style={{
              fontSize: 11,
              letterSpacing: "0.3em",
              textTransform: "uppercase",
              color: "var(--gold)",
              marginBottom: 20,
              display: "flex",
              alignItems: "center",
              gap: 12,
            }}
          >
            <span
              style={{
                width: 40,
                height: 1,
                background: "var(--gold)",
                display: "inline-block",
              }}
            />
            Common Questions
          </div>
          <h2
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(32px, 3vw, 48px)",
              fontWeight: 700,
              lineHeight: 1.1,
              letterSpacing: -1.5,
              color: "var(--charcoal)",
              marginBottom: 24,
            }}
          >
            Frequently
            <br />
            <em style={{ fontStyle: "italic", color: "var(--gold)" }}>Asked</em>
          </h2>
          <p
            style={{
              fontSize: 14,
              lineHeight: 1.8,
              color: "var(--muted)",
              fontWeight: 300,
            }}
          >
            Can't find the answer? Send us a message above and we'll get back to
            you.
          </p>
        </div>

        <div className="reveal" style={{ transitionDelay: "0.1s" }}>
          {faqs.map((faq, i) => (
            <div key={i} className="faq-item">
              <button
                className="faq-question"
                onClick={() => setOpen(open === i ? null : i)}
                style={{
                  color: open === i ? "var(--gold)" : "var(--charcoal)",
                }}
              >
                <span
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: 17,
                    fontWeight: 700,
                    paddingRight: 24,
                  }}
                >
                  {faq.q}
                </span>
                <span className={`faq-icon${open === i ? " open" : ""}`}>
                  +
                </span>
              </button>
              <div className={`faq-answer${open === i ? " open" : ""}`}>
                {faq.a}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
