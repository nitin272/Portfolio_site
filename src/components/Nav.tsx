import { useEffect, useRef, useState } from "react";

const Nav = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll when mobile menu open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  // Close on Escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const links = [
    { href: "#about", label: "Profile" },
    { href: "#experience", label: "Experience" },
    { href: "#projects", label: "Projects" },
    { href: "#skills", label: "Stack" },
    { href: "#systems", label: "Systems" },
  ];

  return (
    <>
      <header
        ref={ref}
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
          scrolled || open ? "bg-background/80 backdrop-blur-xl border-b border-border" : "bg-transparent"
        }`}
      >
        <div className="container mx-auto px-5 sm:px-6 lg:px-12 flex items-center justify-between h-14 sm:h-16">
          <a href="#home" onClick={() => setOpen(false)} className="flex items-center gap-2 font-mono text-sm font-medium">
            <span className="inline-block w-2 h-2 rounded-sm bg-primary shadow-glow-primary" />
            <span className="text-foreground">nitin</span>
            <span className="text-muted-foreground">.sys</span>
          </a>

          <nav className="hidden md:flex items-center gap-8">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="font-mono text-xs uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors"
              >
                {l.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <a
              href="/Nitin-Soni-Resume.pdf"
              download
              data-cursor-text="DOWNLOAD"
              className="hidden sm:inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors px-3 py-2 rounded-md"
            >
              <span>Resume</span>
              <span className="text-primary">↓</span>
            </a>
            <a
              href="#contact"
              onClick={() => setOpen(false)}
              data-cursor-text="HELLO"
              className="hidden sm:inline-flex font-mono text-xs uppercase tracking-widest text-foreground border border-border hover:border-primary/60 hover:text-primary transition-colors px-4 py-2 rounded-md"
            >
              Contact
            </a>

            {/* Mobile hamburger */}
            <button
              type="button"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
              className="md:hidden relative h-10 w-10 inline-flex items-center justify-center rounded-md border border-border bg-card/40 text-foreground hover:border-primary/60 transition-colors"
            >
              <span className="sr-only">Menu</span>
              <span
                className={`absolute h-px w-5 bg-current transition-transform duration-300 ${
                  open ? "rotate-45" : "-translate-y-1.5"
                }`}
              />
              <span
                className={`absolute h-px w-5 bg-current transition-opacity duration-200 ${
                  open ? "opacity-0" : "opacity-100"
                }`}
              />
              <span
                className={`absolute h-px w-5 bg-current transition-transform duration-300 ${
                  open ? "-rotate-45" : "translate-y-1.5"
                }`}
              />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile fullscreen drawer */}
      <div
        className={`md:hidden fixed inset-0 z-40 bg-background/95 backdrop-blur-xl transition-all duration-500 ${
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="absolute inset-0 bg-grid opacity-[0.25]" aria-hidden />
        <div className="relative h-full flex flex-col pt-20 pb-10 px-6">
          <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground mb-8 flex items-center gap-2">
            <span className="status-dot" /> nav.menu
          </div>
          <nav className="flex flex-col gap-1">
            {links.map((l, i) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                style={{
                  transitionDelay: open ? `${100 + i * 60}ms` : "0ms",
                }}
                className={`group flex items-baseline justify-between border-b border-border py-5 font-display text-3xl font-semibold transition-all duration-500 ${
                  open ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                }`}
              >
                <span className="flex items-baseline gap-3">
                  <span className="font-mono text-xs text-primary">0{i + 1}</span>
                  <span className="group-hover:text-primary transition-colors">{l.label}</span>
                </span>
                <span className="text-primary font-mono text-base">→</span>
              </a>
            ))}
          </nav>

          <div className="mt-auto space-y-3">
            <a
              href="/Nitin-Soni-Resume.pdf"
              download
              onClick={() => setOpen(false)}
              className="flex items-center justify-center gap-3 rounded-md border border-primary/40 bg-primary/5 px-6 py-4 font-mono text-sm text-primary"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
              Download CV
            </a>
            <a
              href="#contact"
              onClick={() => setOpen(false)}
              className="flex items-center justify-center gap-3 rounded-md bg-primary px-6 py-4 font-mono text-sm text-primary-foreground"
            >
              Open channel →
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default Nav;
