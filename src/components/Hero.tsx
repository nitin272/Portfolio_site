import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import NetworkBackground from "./NetworkBackground";

const Hero = () => {
  const root = useRef<HTMLElement>(null);

  // Time-based greeting (delight touch)
  const getGreeting = () => {
    const h = new Date().getHours();
    if (h < 5) return "burning the midnight oil";
    if (h < 12) return "good morning, visitor";
    if (h < 17) return "good afternoon, visitor";
    if (h < 21) return "good evening, visitor";
    return "thanks for stopping by late";
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "expo.out" } });
      tl.from(".hero-status", { opacity: 0, y: 10, duration: 0.8 })
        .from(".hero-line > span", {
          yPercent: 110,
          duration: 1.1,
          stagger: 0.08,
        }, "-=0.4")
        .from(".hero-sub", { opacity: 0, y: 14, duration: 0.8 }, "-=0.6")
        .from(".hero-meta > *", { opacity: 0, y: 10, stagger: 0.08, duration: 0.6 }, "-=0.5")
        .from(".hero-cta > *", { opacity: 0, y: 10, stagger: 0.08, duration: 0.6 }, "-=0.4")
        .from(".hero-side", { opacity: 0, x: 20, duration: 0.9 }, "-=0.8")
        .from(".hero-scroll", { opacity: 0, y: -10, duration: 0.6 }, "-=0.3");

      // Live stat tickers
      const tick = (sel: string, end: number, decimals = 0, suffix = "") => {
        const el = document.querySelector<HTMLElement>(sel);
        if (!el) return;
        const obj = { v: 0 };
        gsap.to(obj, {
          v: end,
          duration: 2,
          delay: 0.8,
          ease: "power2.out",
          onUpdate: () => {
            el.textContent = obj.v.toFixed(decimals) + suffix;
          },
        });
      };
      tick(".tick-latency", 0.4, 1, "ms");
      tick(".tick-throughput", 12480, 0, "");
      tick(".tick-uptime", 99.99, 2, "%");

      // Idle latency jitter
      gsap.to(".tick-latency", {
        repeat: -1,
        yoyo: true,
        duration: 1.5,
        delay: 3,
        onRepeat: () => {
          const el = document.querySelector<HTMLElement>(".tick-latency");
          if (el) el.textContent = (0.3 + Math.random() * 0.4).toFixed(1) + "ms";
        },
      });

      // Subtle parallax on mouse — desktop only
      if (window.matchMedia("(pointer: fine)").matches) {
        const onMove = (e: MouseEvent) => {
          const x = (e.clientX / window.innerWidth - 0.5) * 12;
          const y = (e.clientY / window.innerHeight - 0.5) * 12;
          gsap.to(".hero-parallax", { x, y, duration: 1.2, ease: "power2.out" });
        };
        window.addEventListener("mousemove", onMove);
        return () => window.removeEventListener("mousemove", onMove);
      }
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={root}
      className="relative min-h-[100svh] overflow-hidden flex items-center"
      id="home"
    >
      {/* Backgrounds */}
      <div className="absolute inset-0 bg-grid opacity-[0.35]" aria-hidden="true" />
      <div className="absolute inset-0 bg-gradient-hero" aria-hidden="true" />
      <NetworkBackground />
      {/* Vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,hsl(var(--background))_95%)] pointer-events-none" aria-hidden="true" />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-background to-transparent" aria-hidden="true" />

      <div className="relative z-10 container mx-auto px-5 sm:px-6 lg:px-12 pt-28 sm:pt-32 pb-32 sm:pb-28">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left: headline */}
          <div className="hero-parallax lg:col-span-8">
            <div className="hero-status flex flex-wrap items-center gap-x-3 gap-y-2 mb-8 sm:mb-10">
              <span className="status-dot" />
              <span className="font-mono text-[10px] sm:text-xs uppercase tracking-[0.2em] text-muted-foreground">
                System online · {getGreeting()}
              </span>
              <span className="hidden md:inline-block h-3 w-px bg-border mx-1" />
              <span className="hidden md:inline font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
                v1.0 · prod
              </span>
            </div>

            <h1 className="font-display text-[clamp(2rem,8.5vw,5.75rem)] leading-[1.04] font-semibold tracking-tight">
              <div className="hero-line overflow-hidden">
                <span className="block">Building low-latency</span>
              </div>
              <div className="hero-line overflow-hidden">
                <span className="block">
                  systems &{" "}
                  <span className="bg-gradient-accent bg-clip-text text-transparent">scalable</span>
                </span>
              </div>
              <div className="hero-line overflow-hidden">
                <span className="block">backend architectures.</span>
              </div>
            </h1>

            <p className="hero-sub mt-6 sm:mt-8 max-w-2xl text-sm sm:text-base md:text-lg text-muted-foreground leading-relaxed">
              Real-time systems, distributed architecture & API performance optimization —
              engineered for throughput, designed for scale.
            </p>

            <div className="hero-meta mt-8 sm:mt-10 flex flex-wrap gap-x-6 sm:gap-x-8 gap-y-3 font-mono text-[10px] sm:text-xs uppercase tracking-wider text-muted-foreground">
              <span><span className="text-primary">›</span> UDP / Multicast</span>
              <span><span className="text-primary">›</span> Event-driven</span>
              <span><span className="text-primary">›</span> Redis caching</span>
              <span><span className="text-primary">›</span> Distributed systems</span>
            </div>

            <div className="hero-cta mt-10 sm:mt-12 flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4">
              <a
                href="#projects"
                data-cursor-text="VIEW"
                className="group inline-flex items-center justify-center gap-3 rounded-md bg-primary px-6 py-3.5 font-mono text-sm font-medium text-primary-foreground transition-all hover:shadow-glow-primary"
              >
                View case study
                <span className="transition-transform group-hover:translate-x-1">→</span>
              </a>
              <a
                href="/Nitin-Soni-Resume.pdf"
                download
                data-cursor-text="DOWNLOAD"
                data-resume-link
                className="group inline-flex items-center justify-center gap-3 rounded-md border border-primary/40 bg-primary/5 backdrop-blur px-6 py-3.5 font-mono text-sm font-medium text-primary transition-all hover:border-primary hover:bg-primary/10 hover:shadow-glow-primary"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="7 10 12 15 17 10" />
                  <line x1="12" y1="15" x2="12" y2="3" />
                </svg>
                Download CV
                <span className="font-mono text-[10px] text-primary/60">.pdf</span>
              </a>
              <a
                href="#contact"
                data-cursor-text="HELLO"
                className="inline-flex items-center justify-center gap-3 rounded-md border border-border bg-card/40 backdrop-blur px-6 py-3.5 font-mono text-sm font-medium text-foreground transition-all hover:border-primary/50 hover:bg-card"
              >
                Open channel
              </a>
            </div>
          </div>

          {/* Right: live system panel — now visible on mobile too */}
          <aside className="hero-side lg:col-span-4 block">
            <div className="terminal relative">
              {/* Conic ring badge */}
              <div className="absolute -top-3 -right-3 w-16 h-16 rounded-full border border-primary/40 bg-background/70 backdrop-blur flex items-center justify-center">
                <div className="absolute inset-1 rounded-full border-t border-primary spin-slow" />
                <span className="font-mono text-[9px] uppercase tracking-widest text-primary">LIVE</span>
              </div>

              <div className="terminal-header">
                <span className="terminal-dot bg-destructive/70" />
                <span className="terminal-dot" style={{ background: 'hsl(var(--warning-amber))' }} />
                <span className="terminal-dot" style={{ background: 'hsl(var(--terminal-green))' }} />
                <span className="ml-3 font-mono text-xs text-muted-foreground">~/system.metrics</span>
              </div>

              <div className="p-5 space-y-5">
                <div>
                  <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-widest text-muted-foreground mb-1.5">
                    <span>p99 latency</span>
                    <span style={{ color: 'hsl(var(--terminal-green))' }}>● healthy</span>
                  </div>
                  <div className="font-display text-3xl font-semibold text-primary num-glow">
                    <span className="tick-latency">0.0ms</span>
                  </div>
                  <div className="mt-2 h-1.5 rounded-full bg-muted overflow-hidden">
                    <div className="h-full w-[18%] bg-gradient-accent" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 pt-2 border-t border-border">
                  <div>
                    <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground mb-1">
                      throughput
                    </div>
                    <div className="font-display text-xl font-semibold">
                      <span className="tick-throughput">0</span>
                      <span className="text-muted-foreground text-sm font-mono ml-1">/s</span>
                    </div>
                  </div>
                  <div>
                    <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground mb-1">
                      uptime
                    </div>
                    <div className="font-display text-xl font-semibold">
                      <span className="tick-uptime">0%</span>
                    </div>
                  </div>
                </div>

                {/* Mini sparkline */}
                <div className="pt-2 border-t border-border">
                  <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground mb-2">
                    req/sec · last 60s
                  </div>
                  <svg viewBox="0 0 200 40" className="w-full h-10">
                    <defs>
                      <linearGradient id="sparkFill" x1="0" x2="0" y1="0" y2="1">
                        <stop offset="0" stopColor="hsl(195 100% 60%)" stopOpacity="0.4" />
                        <stop offset="1" stopColor="hsl(195 100% 60%)" stopOpacity="0" />
                      </linearGradient>
                    </defs>
                    <path
                      d="M 0 30 L 20 22 L 40 26 L 60 14 L 80 18 L 100 8 L 120 16 L 140 6 L 160 12 L 180 4 L 200 10 L 200 40 L 0 40 Z"
                      fill="url(#sparkFill)"
                    />
                    <path
                      d="M 0 30 L 20 22 L 40 26 L 60 14 L 80 18 L 100 8 L 120 16 L 140 6 L 160 12 L 180 4 L 200 10"
                      fill="none"
                      stroke="hsl(195 100% 65%)"
                      strokeWidth="1.5"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </aside>
        </div>

        {/* Scroll indicator — hidden on small screens to avoid overlap with marquee */}
        <div className="hero-scroll hidden sm:flex absolute left-1/2 -translate-x-1/2 bottom-20 lg:bottom-16 flex-col items-center gap-2">
          <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">scroll</span>
          <div className="scroll-indicator w-px h-8 bg-gradient-to-b from-primary to-transparent" />
        </div>
      </div>

      {/* Tech marquee at bottom */}
      <div className="absolute bottom-0 inset-x-0 z-10 border-y border-border bg-background/60 backdrop-blur-sm overflow-hidden">
        <div className="flex marquee whitespace-nowrap py-2.5 sm:py-3">
          {Array.from({ length: 2 }).map((_, i) => (
            <div key={i} className="flex items-center gap-8 sm:gap-12 pr-8 sm:pr-12 font-mono text-[10px] sm:text-xs uppercase tracking-[0.25em] text-muted-foreground">
              {["C++", "Node.js", "Redis", "PostgreSQL", "Docker", "UDP Multicast", "WebSockets", "Express", "MongoDB", "TypeScript", "CI/CD", "Event-Driven"].map((t) => (
                <span key={t + i} className="flex items-center gap-8 sm:gap-12">
                  <span className="text-primary">◆</span> {t}
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;
