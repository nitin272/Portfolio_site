import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type Project = {
  code: string;
  name: string;
  context: string;
  period: string;
  role: string;
  tagline: string;
  description: string;
  problem: string;
  approach: string[];
  stack: string[];
  highlights: { label: string; value: string }[];
  bullets: string[];
  status: "SHIPPED" | "BUILDING" | "PRODUCTION";
  accent: "primary" | "secondary";
  repo?: string;
};

const projects: Project[] = [
  {
    code: "PRJ_01",
    name: "ScaleMart E-commerce",
    context: "Personal Project · Full-stack",
    period: "Apr 2024 — May 2024",
    role: "Full-stack Engineer",
    tagline: "MERN commerce with WebSockets, Redis & RBAC.",
    description:
      "A full-stack MERN e-commerce platform supporting authentication, product workflows, and role-based access. Real-time updates flow over WebSockets; Redis keeps hot reads cheap.",
    problem:
      "E-commerce traffic mixes long-tail browse with sudden spikes (flash drops, cart updates). Naive REST + DB on every read won't survive concurrent load.",
    approach: [
      "JWT with HTTP-only cookies + role-based authorization",
      "WebSocket channels for live cart, inventory & order updates",
      "Redis cache layer to absorb concurrent reads",
      "API design tuned for concurrent request patterns",
    ],
    stack: ["React", "Node.js", "Express", "MongoDB", "Redis", "Socket.io", "JWT"],
    highlights: [
      { label: "auth", value: "JWT + RBAC" },
      { label: "realtime", value: "WebSocket" },
      { label: "cache", value: "Redis" },
    ],
    bullets: [
      "Developed a full-stack MERN platform with auth, product workflows & RBAC",
      "Implemented secure auth using JWT with HTTP-only cookies and role-based authorization",
      "Integrated real-time communication using WebSockets and push notifications",
      "Optimized backend performance using Redis caching and efficient API design",
    ],
    status: "SHIPPED",
    accent: "primary",
    repo: "https://github.com/nitin272",
  },
  {
    code: "PRJ_02",
    name: "BookBuddy",
    context: "Personal Project · Reading tracker",
    period: "Apr 2025 — May 2025",
    role: "Backend Engineer",
    tagline: "Rails + Hotwire reading tracker with full CI/CD.",
    description:
      "A Rails + Hotwire reading tracker — fully Dockerized, GitHub Actions CI/CD, and Brakeman security scanning baked into every push.",
    problem:
      "Local-only Rails apps are brittle to deploy and easy to ship with security regressions. Needed a portable, testable, security-checked pipeline.",
    approach: [
      "Dockerized for portable deploys; GH Actions CI/CD pipeline",
      "Custom auth, session expiry, secure password encryption",
      "Brakeman vulnerability scanning baked into the workflow",
      "Reliable test suite with RSpec + Capybara",
    ],
    stack: ["Ruby on Rails", "PostgreSQL", "Hotwire", "Docker", "GH Actions", "RSpec", "Brakeman"],
    highlights: [
      { label: "ci/cd", value: "GH Actions" },
      { label: "security", value: "Brakeman" },
      { label: "tests", value: "RSpec" },
    ],
    bullets: [
      "Dockerized for portable deploys; GitHub Actions CI/CD pipeline",
      "Custom auth, session expiry, secure password encryption",
      "Brakeman vulnerability scanning baked into the workflow",
      "Reliable test suite with RSpec + Capybara",
    ],
    status: "SHIPPED",
    accent: "primary",
    repo: "https://github.com/nitin272",
  },
];

const decodeChars = "01<>/_$#@*";

const Projects = () => {
  const root = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".proj-head", {
        opacity: 0,
        y: 20,
        duration: 0.9,
        ease: "expo.out",
        scrollTrigger: { trigger: root.current, start: "top 75%" },
      });

      gsap.from(".proj-tab", {
        opacity: 0,
        x: -20,
        duration: 0.6,
        stagger: 0.07,
        ease: "expo.out",
        scrollTrigger: { trigger: ".proj-tabs", start: "top 80%" },
      });
    }, root);
    return () => ctx.revert();
  }, []);

  const panelRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!panelRef.current) return;
    const ctx = gsap.context(() => {
      const nameEl = panelRef.current!.querySelector<HTMLElement>(".proj-name");
      if (nameEl) {
        const final = nameEl.dataset.text || "";
        const obj = { p: 0 };
        gsap.to(obj, {
          p: 1,
          duration: 0.8,
          ease: "none",
          onUpdate: () => {
            const reveal = Math.floor(obj.p * final.length);
            let out = final.slice(0, reveal);
            for (let i = reveal; i < final.length; i++) {
              out += final[i] === " " ? " " : decodeChars[Math.floor(Math.random() * decodeChars.length)];
            }
            nameEl.textContent = out;
          },
          onComplete: () => {
            nameEl.textContent = final;
          },
        });
      }

      gsap.from(".proj-fade", {
        opacity: 0,
        y: 14,
        duration: 0.55,
        stagger: 0.05,
        ease: "expo.out",
      });

      gsap.from(".proj-bar", {
        scaleX: 0,
        transformOrigin: "left center",
        duration: 0.9,
        stagger: 0.07,
        ease: "expo.out",
        delay: 0.2,
      });

      gsap.from(".proj-metric", {
        opacity: 0,
        y: 10,
        duration: 0.5,
        stagger: 0.08,
        ease: "expo.out",
        delay: 0.15,
      });
    }, panelRef);
    return () => ctx.revert();
  }, [active]);

  const p = projects[active];
  const accentBorder = p.accent === "primary" ? "border-primary/40" : "border-secondary/40";
  const accentText = p.accent === "primary" ? "text-primary" : "text-secondary";
  const accentBg = p.accent === "primary" ? "bg-primary" : "bg-secondary";
  const accentGlow = p.accent === "primary" ? "bg-primary" : "bg-secondary";

  return (
    <section ref={root} id="projects" className="relative py-20 sm:py-28 lg:py-40">
      <div className="container mx-auto px-5 sm:px-6 lg:px-12">
        <div className="proj-head section-label mb-6">CASE_STUDIES / 04</div>
        <div className="flex flex-wrap items-end justify-between gap-6 mb-10 sm:mb-14">
          <h2 className="proj-head font-display text-3xl sm:text-4xl md:text-6xl font-semibold tracking-tight max-w-3xl">
            Builds that survive{" "}
            <span className="bg-gradient-accent bg-clip-text text-transparent">
              real traffic.
            </span>
          </h2>
          <div className="proj-head font-mono text-[10px] sm:text-xs uppercase tracking-widest text-muted-foreground">
            {projects.length.toString().padStart(2, "0")} case studies · select to inspect
          </div>
        </div>

        <div className="grid lg:grid-cols-12 gap-5 sm:gap-6 lg:gap-8">
          {/* Tab list */}
          <div className="proj-tabs lg:col-span-4 flex lg:flex-col gap-3 overflow-x-auto lg:overflow-visible pb-2 lg:pb-0 -mx-5 px-5 sm:mx-0 sm:px-0">
            {projects.map((proj, i) => {
              const isActive = i === active;
              return (
                <button
                  key={proj.code}
                  onClick={() => setActive(i)}
                  data-cursor
                  className={`proj-tab group relative shrink-0 lg:w-full text-left rounded-lg border transition-all duration-300 overflow-hidden ${
                    isActive
                      ? `${accentBorder} bg-card shadow-card`
                      : "border-border bg-card/40 hover:bg-card/70 hover:border-border"
                  }`}
                >
                  {isActive && (
                    <span
                      className={`absolute left-0 top-0 bottom-0 w-[3px] ${accentBg}`}
                      aria-hidden
                    />
                  )}
                  <div className="p-4 sm:p-5 min-w-[240px] lg:min-w-0">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
                        {proj.code}
                      </span>
                      <span
                        className={`font-mono text-[9px] uppercase tracking-widest px-1.5 py-0.5 rounded border ${
                          proj.status === "BUILDING"
                            ? "border-warning/40 bg-warning/10 text-warning"
                            : proj.status === "PRODUCTION"
                            ? "border-secondary/30 bg-secondary/5 text-secondary"
                            : "border-primary/30 bg-primary/5 text-primary"
                        }`}
                      >
                        {proj.status === "BUILDING" && (
                          <span className="inline-block w-1 h-1 rounded-full bg-warning mr-1 animate-pulse" />
                        )}
                        {proj.status}
                      </span>
                    </div>
                    <div
                      className={`font-display text-base sm:text-lg font-semibold mb-1 transition-colors ${
                        isActive ? accentText : "text-foreground"
                      }`}
                    >
                      {proj.name}
                    </div>
                    <div className="font-mono text-[10px] text-muted-foreground/80 mb-1.5 truncate">
                      {proj.context}
                    </div>
                    <div className="text-xs text-muted-foreground line-clamp-2">
                      {proj.tagline}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Active panel */}
          <div
            ref={panelRef}
            key={active}
            className="lg:col-span-8 relative rounded-lg border border-border bg-card overflow-hidden"
          >
            <div className="absolute inset-0 bg-grid-fine opacity-[0.18] pointer-events-none" aria-hidden />
            <div
              className={`absolute -top-32 -right-32 w-64 h-64 rounded-full blur-3xl opacity-30 pointer-events-none ${accentGlow}`}
              aria-hidden
            />

            <div className="relative p-6 sm:p-8 md:p-10">
              <div className="proj-fade flex flex-wrap items-center gap-x-3 gap-y-1 mb-3">
                <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
                  {p.code}
                </span>
                <span className="text-border">·</span>
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                  {p.period}
                </span>
                <span className="text-border">·</span>
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                  {p.role}
                </span>
              </div>

              <h3
                className={`proj-name font-display text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight mb-2 ${accentText}`}
                data-text={p.name}
              >
                {p.name}
              </h3>
              <div className="proj-fade font-mono text-xs text-muted-foreground mb-5">
                {p.context}
              </div>

              <p className="proj-fade text-base sm:text-lg text-foreground/90 leading-relaxed mb-6 max-w-2xl">
                {p.description}
              </p>

              {/* Problem / Approach blocks */}
              <div className="grid sm:grid-cols-2 gap-3 sm:gap-4 mb-6">
                <div className="proj-fade rounded-md border border-border bg-background/40 p-4">
                  <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-warning mb-2">
                    // problem
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">{p.problem}</p>
                </div>
                <div className="proj-fade rounded-md border border-border bg-background/40 p-4">
                  <div className={`font-mono text-[10px] uppercase tracking-[0.2em] mb-2 ${accentText}`}>
                    // approach
                  </div>
                  <ul className="space-y-1.5">
                    {p.approach.map((a) => (
                      <li key={a} className="text-sm text-muted-foreground leading-relaxed flex gap-2">
                        <span className={`${accentText} mt-1.5 text-[8px]`}>▸</span>
                        <span>{a}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Metric strip */}
              <div className="grid grid-cols-3 gap-px bg-border rounded-lg overflow-hidden border border-border mb-6">
                {p.highlights.map((h) => (
                  <div key={h.label} className="proj-metric bg-card/80 backdrop-blur-sm p-3 sm:p-4">
                    <div className="font-mono text-[9px] sm:text-[10px] uppercase tracking-[0.2em] text-muted-foreground mb-1">
                      {h.label}
                    </div>
                    <div className={`font-display text-base sm:text-xl font-semibold ${accentText} truncate`}>
                      {h.value}
                    </div>
                  </div>
                ))}
              </div>

              {/* Bullets */}
              <ul className="space-y-3 mb-6">
                {p.bullets.map((b) => (
                  <li key={b} className="proj-fade flex gap-3 items-start">
                    <span className="relative mt-2 h-px w-6 sm:w-8 shrink-0 overflow-hidden">
                      <span className="absolute inset-0 bg-border" />
                      <span className={`proj-bar absolute inset-0 ${accentBg}`} />
                    </span>
                    <span className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                      {b}
                    </span>
                  </li>
                ))}
              </ul>

              {/* Stack chips */}
              <div className="proj-fade flex flex-wrap gap-1.5 sm:gap-2 pt-5 border-t border-border">
                {p.stack.map((s) => (
                  <span
                    key={s}
                    className="font-mono text-[10px] sm:text-xs px-2 sm:px-2.5 py-1 rounded border border-border bg-background/40 text-muted-foreground hover:border-primary/40 hover:text-primary transition-colors"
                  >
                    {s}
                  </span>
                ))}
              </div>

              {p.repo && (
                <a
                  href={p.repo}
                  target="_blank"
                  rel="noreferrer"
                  data-cursor
                  className="proj-fade mt-6 inline-flex items-center gap-3 font-mono text-sm text-primary hover:gap-4 transition-all w-fit"
                >
                  View on GitHub
                  <span>→</span>
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;
