import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".about-reveal", {
        opacity: 0,
        y: 30,
        duration: 1,
        ease: "expo.out",
        stagger: 0.08,
        scrollTrigger: { trigger: root.current, start: "top 75%" },
      });

      // Type-out terminal lines
      const lines = gsap.utils.toArray<HTMLElement>(".term-line");
      lines.forEach((line, i) => {
        gsap.from(line, {
          width: 0,
          duration: 1.4,
          ease: "steps(40)",
          delay: i * 0.25,
          scrollTrigger: { trigger: root.current, start: "top 60%" },
        });
      });
    }, root);
    return () => ctx.revert();
  }, []);

  const stats = [
    { k: "0.4ms", v: "API latency" },
    { k: "10k+", v: "msgs/sec" },
    { k: "99.99%", v: "uptime target" },
    { k: "3+", v: "production systems" },
  ];

  return (
    <section ref={root} id="about" className="relative py-20 sm:py-28 lg:py-40">
      <div className="container mx-auto px-5 sm:px-6 lg:px-12">
        <div className="about-reveal section-label mb-6">SYS_PROFILE / 02</div>
        <h2 className="about-reveal font-display text-3xl sm:text-4xl md:text-6xl font-semibold tracking-tight max-w-3xl">
          Engineer focused on the layer{" "}
          <span className="text-muted-foreground">where milliseconds matter.</span>
        </h2>

        <div className="grid lg:grid-cols-2 gap-10 sm:gap-12 lg:gap-20 mt-12 sm:mt-16">
          {/* Terminal */}
          <div className="about-reveal terminal">
            <div className="terminal-header">
              <span className="terminal-dot bg-destructive/70" />
              <span className="terminal-dot" style={{ background: 'hsl(var(--warning-amber))' }} />
              <span className="terminal-dot" style={{ background: 'hsl(var(--terminal-green))' }} />
              <span className="ml-3 font-mono text-xs text-muted-foreground truncate">~/profile.sh</span>
            </div>
            <div className="p-4 sm:p-6 font-mono text-xs sm:text-sm leading-relaxed overflow-hidden">
              <div className="term-line overflow-hidden whitespace-nowrap">
                <span className="text-primary">$</span>{" "}
                <span className="text-muted-foreground">whoami</span>
              </div>
              <div className="term-line overflow-hidden whitespace-nowrap mt-2 text-foreground">
                → Nitin Soni · Sys Engineer
              </div>
              <div className="term-line overflow-hidden whitespace-nowrap text-muted-foreground">
                → Jaipur, IN · available
              </div>
              <div className="term-line overflow-hidden whitespace-nowrap mt-4">
                <span className="text-primary">$</span>{" "}
                <span className="text-muted-foreground">cat focus.txt</span>
              </div>
              <div className="term-line overflow-hidden whitespace-nowrap mt-2 text-foreground">
                → Real-time data systems
              </div>
              <div className="term-line overflow-hidden whitespace-nowrap text-foreground">
                → UDP multicast pipelines
              </div>
              <div className="term-line overflow-hidden whitespace-nowrap text-foreground">
                → Distributed perf eng
              </div>
              <div className="mt-4">
                <span className="text-primary">$</span>{" "}
                <span className="cursor-blink text-primary">▌</span>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="space-y-5 sm:space-y-6">
            <p className="about-reveal text-base sm:text-lg text-muted-foreground leading-relaxed">
              Backend & systems engineering intern building production systems that
              process high-frequency data streams. Strong in API design, caching
              strategies, distributed systems fundamentals, and performance
              optimization — with hands-on UDP-based communication and live traffic
              analysis.
            </p>
            <p className="about-reveal text-base sm:text-lg text-muted-foreground leading-relaxed">
              I think in throughput, latency budgets, and back-pressure — not just
              endpoints. I&apos;m at my best when the system needs to stay responsive
              under load.
            </p>

            <div className="about-reveal grid grid-cols-2 gap-px bg-border mt-10 rounded-lg overflow-hidden border border-border">
              {stats.map((s) => (
                <div key={s.v} className="bg-card p-5">
                  <div className="font-display text-3xl font-semibold text-primary">
                    {s.k}
                  </div>
                  <div className="font-mono text-xs uppercase tracking-wider text-muted-foreground mt-1">
                    {s.v}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
