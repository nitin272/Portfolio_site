import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type Skill = { name: string; level: number; note?: string };
type Layer = {
  id: string;
  name: string;
  caption: string;
  signal: string;
  items: Skill[];
};

// Sourced directly from CV — every skill mapped to a layer.
const layers: Layer[] = [
  {
    id: "L6",
    name: "Languages",
    caption: "Daily drivers across systems & web.",
    signal: "C++ · Python · TypeScript",
    items: [
      { name: "C++", level: 82, note: "systems · low-latency" },
      { name: "Python", level: 88, note: "scripting · pipelines" },
      { name: "TypeScript", level: 92, note: "web · APIs" },
    ],
  },
  {
    id: "L5",
    name: "Frontend",
    caption: "Interfaces tuned for clarity and motion.",
    signal: "React + Tailwind",
    items: [
      { name: "React.js", level: 95 },
      { name: "Tailwind CSS", level: 92 },
      { name: "HTML", level: 96 },
      { name: "CSS", level: 92 },
      { name: "JavaScript", level: 95 },
    ],
  },
  {
    id: "L4",
    name: "Backend",
    caption: "API design, real-time systems, microservices.",
    signal: "Node · Express · Rails",
    items: [
      { name: "Node.js", level: 92, note: "REST · WebSocket" },
      { name: "Express.js", level: 90, note: "middleware · auth" },
      { name: "Ruby on Rails", level: 80, note: "Hotwire" },
    ],
  },
  {
    id: "L3",
    name: "Databases",
    caption: "Relational, document & in-memory stores.",
    signal: "Mongo · Postgres · Redis",
    items: [
      { name: "MongoDB", level: 90, note: "aggregations · indexing" },
      { name: "PostgreSQL", level: 85, note: "relational" },
      { name: "MySQL", level: 80 },
      { name: "Redis", level: 88, note: "cache · pub/sub" },
    ],
  },
  {
    id: "L2",
    name: "DevOps",
    caption: "Ship, observe, repeat.",
    signal: "Docker · CI/CD · Vercel",
    items: [
      { name: "Docker", level: 86, note: "portable deploys" },
      { name: "CI/CD", level: 88, note: "GitHub Actions" },
      { name: "Vercel", level: 90 },
    ],
  },
  {
    id: "L1",
    name: "Auth & Security",
    caption: "Hardened auth & session handling.",
    signal: "JWT · OAuth · Passport",
    items: [
      { name: "JWT", level: 92, note: "HTTP-only cookies" },
      { name: "OAuth 2.0", level: 82 },
      { name: "Passport.js", level: 80 },
    ],
  },
  {
    id: "L0",
    name: "Systems & Core",
    caption: "The fundamentals that make the rest work.",
    signal: "UDP · Multicast · DSA · System Design",
    items: [
      { name: "UDP", level: 85, note: "5paisa exchange sim" },
      { name: "Multicast", level: 82, note: "fan-out pipelines" },
      { name: "Low-latency Systems", level: 84 },
      { name: "System Design", level: 86 },
      { name: "DSA", level: 90 },
      { name: "OOP", level: 92 },
      { name: "SOLID", level: 88 },
    ],
  },
];

const Skills = () => {
  const root = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);

  // Section-level intro
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".skills-head", {
        opacity: 0,
        y: 20,
        duration: 0.9,
        ease: "expo.out",
        scrollTrigger: { trigger: root.current, start: "top 75%" },
      });

      gsap.from(".layer-pill", {
        opacity: 0,
        y: 14,
        duration: 0.5,
        stagger: 0.05,
        ease: "expo.out",
        scrollTrigger: { trigger: ".layer-pills", start: "top 85%" },
      });

      // Animate the layer-stack visualizer (left rail)
      gsap.from(".stack-block", {
        opacity: 0,
        x: -20,
        duration: 0.6,
        stagger: 0.07,
        ease: "expo.out",
        scrollTrigger: { trigger: ".stack-visual", start: "top 80%" },
      });

      // Pulse line that travels through the stack
      gsap.fromTo(
        ".stack-pulse",
        { y: -8, opacity: 0 },
        {
          y: 280,
          opacity: 1,
          duration: 2.4,
          repeat: -1,
          ease: "power2.inOut",
          scrollTrigger: { trigger: ".stack-visual", start: "top 80%" },
        }
      );
    }, root);
    return () => ctx.revert();
  }, []);

  // Per-layer panel animation
  const panelRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!panelRef.current) return;
    const ctx = gsap.context(() => {
      gsap.from(".skill-row", {
        opacity: 0,
        x: -16,
        duration: 0.5,
        stagger: 0.06,
        ease: "expo.out",
      });
      gsap.fromTo(
        ".skill-bar-fill",
        { width: "0%" },
        {
          width: (_, el) => `${(el as HTMLElement).dataset.level}%`,
          duration: 1.1,
          stagger: 0.06,
          ease: "expo.out",
          delay: 0.15,
        }
      );
      gsap.from(".skill-num", {
        textContent: 0,
        duration: 1.1,
        stagger: 0.06,
        ease: "expo.out",
        delay: 0.15,
        snap: { textContent: 1 },
      } as gsap.TweenVars);

      gsap.from(".panel-header", {
        opacity: 0,
        y: 10,
        duration: 0.6,
        ease: "expo.out",
      });
    }, panelRef);
    return () => ctx.revert();
  }, [active]);

  const layer = layers[active];

  return (
    <section ref={root} id="skills" className="relative py-20 sm:py-28 lg:py-40 bg-card/20">
      <div className="container mx-auto px-5 sm:px-6 lg:px-12">
        <div className="skills-head section-label mb-6">STACK_LAYERS / 05</div>
        <div className="flex flex-wrap items-end justify-between gap-6 mb-10 sm:mb-14">
          <h2 className="skills-head font-display text-3xl sm:text-4xl md:text-6xl font-semibold tracking-tight max-w-3xl">
            The stack,{" "}
            <span className="text-muted-foreground">layer by layer.</span>
          </h2>
          <div className="skills-head font-mono text-[10px] sm:text-xs uppercase tracking-widest text-muted-foreground">
            {layers.length} layers · L0 closest to the metal
          </div>
        </div>

        {/* Layer pills (wrap on mobile — no horizontal scroll) */}
        <div className="layer-pills flex flex-wrap gap-2 sm:gap-2.5 mb-6 sm:mb-8">
          {layers.map((l, i) => {
            const isActive = i === active;
            return (
              <button
                key={l.id}
                onClick={() => setActive(i)}
                data-cursor
                className={`layer-pill group flex items-center gap-2 px-3 py-2 rounded-md border transition-all duration-300 ${
                  isActive
                    ? "border-primary/50 bg-primary/10 text-primary shadow-glow-primary"
                    : "border-border bg-card/60 text-muted-foreground hover:border-primary/30 hover:text-foreground"
                }`}
              >
                <span
                  className={`font-mono text-[9px] sm:text-[10px] px-1.5 py-0.5 rounded border ${
                    isActive
                      ? "border-primary/40 bg-primary/10"
                      : "border-border bg-background/40"
                  }`}
                >
                  {l.id}
                </span>
                <span className="font-display text-sm sm:text-base font-medium">
                  {l.name}
                </span>
              </button>
            );
          })}
        </div>

        <div className="grid lg:grid-cols-12 gap-5 sm:gap-6 lg:gap-8">
          {/* Stack visualizer (left rail, hidden on small) */}
          <aside className="stack-visual hidden lg:flex lg:col-span-3 relative flex-col gap-2 rounded-lg border border-border bg-card/50 p-5 overflow-hidden">
            <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground mb-2">
              stack.dump
            </div>
            <div className="relative">
              {/* Pulse traveling down the stack */}
              <div className="absolute left-1/2 -translate-x-1/2 top-0 w-px h-full bg-border" aria-hidden />
              <div
                className="stack-pulse absolute left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-primary shadow-glow-primary pointer-events-none"
                aria-hidden
              />
              <div className="relative flex flex-col gap-1.5">
                {layers.map((l, i) => {
                  const isActive = i === active;
                  return (
                    <button
                      key={l.id}
                      onClick={() => setActive(i)}
                      data-cursor
                      className={`stack-block group relative flex items-center justify-between gap-3 rounded-md border px-3 py-2.5 text-left transition-all duration-300 ${
                        isActive
                          ? "border-primary/50 bg-primary/10"
                          : "border-border bg-background/40 hover:border-primary/30"
                      }`}
                    >
                      <div className="flex items-center gap-2 min-w-0">
                        <span
                          className={`font-mono text-[9px] px-1.5 py-0.5 rounded border ${
                            isActive
                              ? "border-primary/40 bg-primary/10 text-primary"
                              : "border-border bg-background/40 text-muted-foreground"
                          }`}
                        >
                          {l.id}
                        </span>
                        <span
                          className={`font-display text-xs font-medium truncate ${
                            isActive ? "text-primary" : "text-foreground"
                          }`}
                        >
                          {l.name}
                        </span>
                      </div>
                      <span className="font-mono text-[9px] text-muted-foreground shrink-0">
                        {l.items.length}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
            <div className="mt-3 pt-3 border-t border-border font-mono text-[10px] text-muted-foreground">
              // tap a layer to inspect
            </div>
          </aside>

          {/* Active layer panel */}
          <div
            ref={panelRef}
            key={active}
            className="lg:col-span-9 relative rounded-lg border border-border bg-card overflow-hidden"
          >
            <div className="absolute inset-0 bg-grid-fine opacity-[0.15] pointer-events-none" aria-hidden />
            <div className="absolute -top-24 -left-24 w-56 h-56 rounded-full bg-primary/20 blur-3xl pointer-events-none" aria-hidden />

            <div className="relative p-5 sm:p-7 md:p-10">
              <div className="panel-header flex flex-wrap items-baseline gap-x-3 gap-y-2 mb-2">
                <span className="font-mono text-xs text-primary border border-primary/30 bg-primary/5 px-2 py-1 rounded">
                  {layer.id}
                </span>
                <h3 className="font-display text-2xl sm:text-3xl md:text-4xl font-semibold">
                  {layer.name}
                </h3>
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                  · {layer.signal}
                </span>
              </div>
              <p className="panel-header text-sm sm:text-base text-muted-foreground mb-6 sm:mb-8">
                {layer.caption}
              </p>

              <div className="grid sm:grid-cols-2 gap-x-8 gap-y-4 sm:gap-y-5">
                {layer.items.map((item) => (
                  <div key={item.name} className="skill-row">
                    <div className="flex items-baseline justify-between gap-3 mb-1.5">
                      <div className="min-w-0 flex items-baseline gap-2 flex-wrap">
                        <span className="font-display text-sm sm:text-base text-foreground">
                          {item.name}
                        </span>
                        {item.note && (
                          <span className="font-mono text-[10px] text-muted-foreground/80 truncate">
                            // {item.note}
                          </span>
                        )}
                      </div>
                      <span className="font-mono text-[10px] sm:text-xs text-muted-foreground shrink-0">
                        <span className="skill-num">{item.level}</span>
                        <span className="text-muted-foreground/60">/100</span>
                      </span>
                    </div>
                    <div className="relative h-1 rounded-full bg-muted overflow-hidden">
                      <div
                        className="skill-bar-fill absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-primary to-secondary"
                        data-level={item.level}
                        style={{ width: 0 }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <p className="mt-6 font-mono text-xs text-muted-foreground">
          // Core: DSA · OOP · SOLID · System Design · UDP · Multicast · Low-latency systems
        </p>
      </div>
    </section>
  );
};

export default Skills;
