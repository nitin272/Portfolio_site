import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const experiences = [
  {
    company: "5paisa Capital Limited",
    role: "Backend / Systems Engineering Intern",
    period: "Apr 2025 — Present",
    tag: "BUILDING",
    bullets: [
      "Currently engineering a real-time exchange simulation system processing high-frequency market data streams (in active development).",
      "Designing UDP-based multicast communication pipelines for low-latency distributed data transfer.",
      "Building forwarder services to broadcast real-time data across multiple consumers, improving scalability.",
      "Analyzing backend API traffic with Charles Proxy to identify latency bottlenecks and optimize request flow.",
      "Contributing to event-driven architecture for real-time processing and async system behavior.",
    ],
    stack: ["C++", "UDP", "Multicast", "Event-Driven", "Charles Proxy"],
    wip: true,
  },
  {
    company: "Republic of Subjiwala",
    role: "Freelance Backend Developer",
    period: "Jun 2025 — Oct 2025",
    tag: "SHIPPED",
    bullets: [
      "Designed and developed RESTful APIs using Node.js and Express.js to handle concurrent user requests.",
      "Implemented Redis caching to reduce database load and improve API response latency.",
      "Applied Clean Architecture principles to improve backend scalability and maintainability.",
      "Containerized applications using Docker and automated deployments via CI/CD pipelines.",
    ],
    stack: ["Node.js", "Express", "Redis", "Docker", "CI/CD"],
    wip: false,
  },
];

const Experience = () => {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".exp-head", {
        opacity: 0, y: 20, duration: 0.9, ease: "expo.out",
        scrollTrigger: { trigger: root.current, start: "top 75%" },
      });

      gsap.utils.toArray<HTMLElement>(".exp-card").forEach((card) => {
        gsap.from(card, {
          opacity: 0,
          y: 50,
          duration: 1,
          ease: "expo.out",
          scrollTrigger: { trigger: card, start: "top 85%" },
        });
      });

      // Timeline progress line
      gsap.from(".exp-line", {
        scaleY: 0,
        transformOrigin: "top center",
        ease: "none",
        scrollTrigger: {
          trigger: ".exp-timeline",
          start: "top 70%",
          end: "bottom 70%",
          scrub: 0.5,
        },
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} id="experience" className="relative py-20 sm:py-28 lg:py-40 bg-card/20">
      <div className="container mx-auto px-5 sm:px-6 lg:px-12">
        <div className="exp-head section-label mb-6">EXEC_LOG / 03</div>
        <h2 className="exp-head font-display text-3xl sm:text-4xl md:text-6xl font-semibold tracking-tight max-w-3xl mb-12 sm:mb-20">
          Production runtime,{" "}
          <span className="text-muted-foreground">deployed & observed.</span>
        </h2>

        <div className="exp-timeline relative pl-6 md:pl-10">
          {/* Vertical line */}
          <div className="absolute left-2 md:left-4 top-2 bottom-2 w-px bg-border" aria-hidden />
          <div className="exp-line absolute left-2 md:left-4 top-2 bottom-2 w-px bg-gradient-to-b from-primary via-secondary to-transparent" aria-hidden />

          <div className="space-y-16">
            {experiences.map((e, idx) => (
              <article key={e.company} className="exp-card relative">
                {/* Node */}
                <div className="absolute -left-[1.7rem] md:-left-[2.4rem] top-2 flex items-center justify-center">
                  <span className="w-3 h-3 rounded-full bg-background border-2 border-primary shadow-glow-primary" />
                </div>

                <div className="glow-card rounded-lg border border-border bg-card p-5 sm:p-6 md:p-8">
                  <div className="flex flex-col sm:flex-row sm:flex-wrap sm:items-baseline sm:justify-between gap-3 mb-2">
                    <div>
                      <h3 className="font-display text-xl sm:text-2xl md:text-3xl font-semibold">
                        {e.company}
                      </h3>
                      <p className="font-mono text-xs sm:text-sm text-primary mt-1">{e.role}</p>
                    </div>
                    <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                      <span
                        className={`font-mono text-[10px] sm:text-xs uppercase tracking-widest px-2 py-1 rounded border inline-flex items-center gap-1.5 ${
                          e.wip
                            ? "border-primary/40 bg-primary/10 text-primary"
                            : "border-primary/30 bg-primary/5 text-primary"
                        }`}
                      >
                        {e.wip && <span className="status-dot !w-1.5 !h-1.5" />}
                        {e.tag}
                      </span>
                      <span className="font-mono text-[10px] sm:text-xs text-muted-foreground">
                        {e.period}
                      </span>
                    </div>
                  </div>

                  {e.wip && (
                    <div className="mt-4 inline-flex items-center gap-2 rounded-md border border-primary/20 bg-primary/5 px-3 py-1.5 font-mono text-[10px] sm:text-xs text-primary">
                      <span className="relative flex h-2 w-2">
                        <span className="absolute inset-0 rounded-full bg-primary animate-ping opacity-75" />
                        <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
                      </span>
                      <span className="uppercase tracking-widest">Build in progress · simulation engine</span>
                    </div>
                  )}

                  <ul className="mt-5 sm:mt-6 space-y-2.5 sm:space-y-3 text-sm sm:text-base">
                    {e.bullets.map((b) => (
                      <li key={b} className="flex gap-3 text-muted-foreground leading-relaxed">
                        <span className="text-primary font-mono mt-1.5 text-[10px] sm:text-xs">▸</span>
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-6 flex flex-wrap gap-2">
                    {e.stack.map((s) => (
                      <span
                        key={s}
                        className="font-mono text-xs px-2.5 py-1 rounded-full border border-border bg-muted/30 text-muted-foreground"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
