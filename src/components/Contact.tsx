import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".contact-reveal", {
        opacity: 0, y: 30, duration: 1, ease: "expo.out", stagger: 0.08,
        scrollTrigger: { trigger: root.current, start: "top 75%" },
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} id="contact" className="relative py-24 sm:py-32 lg:py-44 overflow-hidden">
      <div className="absolute inset-0 bg-grid opacity-[0.25]" aria-hidden />
      <div className="absolute inset-0 bg-gradient-hero" aria-hidden />

      <div className="relative container mx-auto px-5 sm:px-6 lg:px-12 text-center max-w-4xl">
        <div className="contact-reveal section-label justify-center mb-6 sm:mb-8 inline-flex">
          OPEN_CHANNEL / 07
        </div>
        <h2 className="contact-reveal font-display text-4xl sm:text-5xl md:text-7xl font-semibold tracking-tight leading-[1.05]">
          Let&apos;s build{" "}
          <span className="bg-gradient-accent bg-clip-text text-transparent">scalable systems</span>{" "}
          together.
        </h2>
        <p className="contact-reveal mt-5 sm:mt-6 text-base sm:text-lg text-muted-foreground max-w-xl mx-auto">
          Open to backend & systems engineering roles. If you&apos;re shipping
          something where latency, throughput, or reliability matter — let&apos;s talk.
        </p>

        <div className="contact-reveal mt-10 sm:mt-12 flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 sm:gap-4">
          <a
            href="mailto:nitinsoni9509290112@gmail.com"
            data-cursor-text="EMAIL"
            className="group inline-flex items-center justify-center gap-3 rounded-md bg-primary px-5 sm:px-7 py-4 font-mono text-xs sm:text-sm font-medium text-primary-foreground transition-all hover:shadow-glow-primary break-all"
          >
            <span className="truncate">nitinsoni9509290112@gmail.com</span>
            <span className="transition-transform group-hover:translate-x-1 shrink-0">↗</span>
          </a>
          <a
            href="/Nitin-Soni-Resume.pdf"
            download
            data-cursor-text="DOWNLOAD"
            data-resume-link
            className="inline-flex items-center justify-center gap-3 rounded-md border border-primary/40 bg-primary/5 backdrop-blur px-5 sm:px-7 py-4 font-mono text-xs sm:text-sm font-medium text-primary transition-all hover:border-primary hover:shadow-glow-primary"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
            Download CV
          </a>
        </div>

        <div className="contact-reveal mt-16 flex items-center justify-center gap-6 font-mono text-xs uppercase tracking-widest text-muted-foreground">
          <a href="#" className="hover:text-primary transition-colors">LinkedIn</a>
          <span className="opacity-30">·</span>
          <a href="#" className="hover:text-primary transition-colors">GitHub</a>
          <span className="opacity-30">·</span>
          <a href="#" className="hover:text-primary transition-colors">Portfolio</a>
        </div>

        <footer className="mt-24 pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4 font-mono text-xs text-muted-foreground">
          <div className="flex items-center gap-2">
            <span className="status-dot" />
            <span>system online · {new Date().getFullYear()}</span>
          </div>
          <div>Nitin Soni · Backend & Systems Engineer</div>
        </footer>
      </div>
    </section>
  );
};

export default Contact;
