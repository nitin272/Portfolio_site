import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const concepts = [
  {
    code: "01",
    title: "Low-latency pipelines",
    body: "Tight loops, zero-copy paths, and lock-free queues where they matter. Latency is a budget — not an afterthought.",
    metric: "p99 < 1ms",
  },
  {
    code: "02",
    title: "UDP vs TCP",
    body: "Reach for UDP + multicast when you need speed and one-to-many fan-out. Lean on TCP when delivery & ordering are non-negotiable.",
    metric: "fan-out 1:N",
  },
  {
    code: "03",
    title: "Caching strategy",
    body: "Redis as a hot read layer, write-through where consistency matters, TTLs sized to traffic shape, with cache-stampede protection.",
    metric: "hit ratio 95%+",
  },
  {
    code: "04",
    title: "Event-driven design",
    body: "Producers, brokers, consumers — decoupled. Async by default, with back-pressure that protects downstream systems.",
    metric: "async by default",
  },
];

const SystemFocus = () => {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".sf-head", {
        opacity: 0, y: 20, duration: 0.9, ease: "expo.out",
        scrollTrigger: { trigger: root.current, start: "top 75%" },
      });

      // Animate UDP vs TCP diagram
      const udpDots = gsap.utils.toArray<SVGCircleElement>(".udp-dot");
      const tcpDots = gsap.utils.toArray<SVGCircleElement>(".tcp-dot");

      ScrollTrigger.create({
        trigger: ".vs-svg",
        start: "top 70%",
        onEnter: () => {
          udpDots.forEach((d, i) => {
            gsap.fromTo(d,
              { cx: 30, opacity: 0 },
              {
                cx: 270, opacity: 1, duration: 1.2, delay: i * 0.15,
                repeat: -1, repeatDelay: 1.2, ease: "power1.in",
              }
            );
          });
          tcpDots.forEach((d, i) => {
            gsap.fromTo(d,
              { cx: 30, opacity: 0 },
              {
                cx: 270, opacity: 1, duration: 2, delay: i * 0.5,
                repeat: -1, repeatDelay: 0.5, ease: "power1.inOut",
              }
            );
          });
        },
      });

      gsap.utils.toArray<HTMLElement>(".concept-card").forEach((card) => {
        gsap.from(card, {
          opacity: 0, y: 30, duration: 0.8, ease: "expo.out",
          scrollTrigger: { trigger: card, start: "top 88%" },
        });
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} id="systems" className="relative py-20 sm:py-28 lg:py-40">
      <div className="container mx-auto px-5 sm:px-6 lg:px-12">
        <div className="sf-head section-label mb-6">SYS_FOCUS / 06</div>
        <h2 className="sf-head font-display text-3xl sm:text-4xl md:text-6xl font-semibold tracking-tight max-w-3xl mb-12 sm:mb-16">
          The principles I{" "}
          <span className="bg-gradient-accent bg-clip-text text-transparent">build by.</span>
        </h2>

        {/* UDP vs TCP visual */}
        <div className="rounded-lg border border-border bg-card p-5 sm:p-6 md:p-10 mb-12 sm:mb-16 overflow-hidden">
          <div className="grid md:grid-cols-2 gap-8 md:gap-10">
            <div>
              <div className="flex items-baseline justify-between mb-3">
                <h3 className="font-mono text-sm text-primary uppercase tracking-widest">UDP / Multicast</h3>
                <span className="font-mono text-xs text-muted-foreground">fire & forget · low latency</span>
              </div>
              <svg viewBox="0 0 300 80" className="vs-svg w-full">
                <line x1="30" y1="40" x2="270" y2="40" stroke="hsl(var(--border))" strokeWidth="1" strokeDasharray="3 3" />
                <circle cx="30" cy="40" r="6" fill="hsl(var(--primary))" />
                <circle cx="270" cy="40" r="6" fill="hsl(var(--primary))" />
                <circle className="udp-dot" cy="40" r="4" fill="hsl(195 100% 70%)" />
                <circle className="udp-dot" cy="40" r="4" fill="hsl(195 100% 70%)" />
                <circle className="udp-dot" cy="40" r="4" fill="hsl(195 100% 70%)" />
                <circle className="udp-dot" cy="40" r="4" fill="hsl(195 100% 70%)" />
                <text x="30" y="68" fontSize="9" fontFamily="JetBrains Mono" fill="hsl(var(--muted-foreground))">producer</text>
                <text x="240" y="68" fontSize="9" fontFamily="JetBrains Mono" fill="hsl(var(--muted-foreground))">consumer</text>
              </svg>
            </div>
            <div>
              <div className="flex items-baseline justify-between mb-3">
                <h3 className="font-mono text-sm text-secondary uppercase tracking-widest">TCP</h3>
                <span className="font-mono text-xs text-muted-foreground">ordered · reliable · ack&apos;d</span>
              </div>
              <svg viewBox="0 0 300 80" className="vs-svg w-full">
                <line x1="30" y1="40" x2="270" y2="40" stroke="hsl(var(--border))" strokeWidth="1" strokeDasharray="3 3" />
                <circle cx="30" cy="40" r="6" fill="hsl(var(--secondary))" />
                <circle cx="270" cy="40" r="6" fill="hsl(var(--secondary))" />
                <circle className="tcp-dot" cy="40" r="4" fill="hsl(265 90% 75%)" />
                <circle className="tcp-dot" cy="40" r="4" fill="hsl(265 90% 75%)" />
                <text x="30" y="68" fontSize="9" fontFamily="JetBrains Mono" fill="hsl(var(--muted-foreground))">producer</text>
                <text x="240" y="68" fontSize="9" fontFamily="JetBrains Mono" fill="hsl(var(--muted-foreground))">consumer</text>
              </svg>
            </div>
          </div>
        </div>

        {/* Concept cards */}
        <div className="grid md:grid-cols-2 gap-px bg-border rounded-lg overflow-hidden border border-border">
          {concepts.map((c) => (
            <div key={c.code} className="concept-card bg-card p-6 sm:p-8 md:p-10 group hover:bg-muted/30 transition-colors">
              <div className="flex items-baseline justify-between mb-4 sm:mb-6">
                <span className="font-mono text-4xl sm:text-5xl font-semibold text-muted-foreground/30 group-hover:text-primary/40 transition-colors">
                  {c.code}
                </span>
                <span className="font-mono text-[10px] sm:text-xs uppercase tracking-widest text-primary border border-primary/30 bg-primary/5 px-2 py-1 rounded">
                  {c.metric}
                </span>
              </div>
              <h3 className="font-display text-xl sm:text-2xl font-semibold mb-2 sm:mb-3">{c.title}</h3>
              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">{c.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SystemFocus;
