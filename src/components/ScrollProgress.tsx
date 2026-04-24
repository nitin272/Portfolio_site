import { useEffect, useRef, useState } from "react";

/**
 * Top scroll progress bar + right-side section rail.
 * - Progress bar grows with scroll (uses scaleX for cheap GPU transform)
 * - Section dots highlight active section via IntersectionObserver
 */
const sections = [
  { id: "home", label: "Home" },
  { id: "about", label: "Profile" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "skills", label: "Stack" },
  { id: "systems", label: "Systems" },
  { id: "contact", label: "Contact" },
];

const ScrollProgress = () => {
  const barRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState("home");

  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const max = document.documentElement.scrollHeight - window.innerHeight;
        const pct = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
        if (barRef.current) {
          barRef.current.style.transform = `scaleX(${pct})`;
        }
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  useEffect(() => {
    const els = sections
      .map((s) => document.getElementById(s.id))
      .filter(Boolean) as HTMLElement[];
    if (els.length === 0) return;

    const io = new IntersectionObserver(
      (entries) => {
        // Pick the most visible section
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: "-40% 0px -50% 0px", threshold: [0, 0.25, 0.5, 0.75, 1] }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <>
      {/* Top progress bar */}
      <div className="fixed top-0 inset-x-0 z-[60] h-[2px] bg-transparent pointer-events-none">
        <div
          ref={barRef}
          className="h-full origin-left bg-gradient-to-r from-primary via-primary to-secondary"
          style={{ transform: "scaleX(0)", willChange: "transform" }}
        />
      </div>

      {/* Right side rail (desktop only) */}
      <nav
        aria-label="Section navigation"
        className="hidden lg:flex fixed right-5 top-1/2 -translate-y-1/2 z-40 flex-col gap-3 items-end"
      >
        {sections.map((s) => {
          const isActive = active === s.id;
          return (
            <a
              key={s.id}
              href={`#${s.id}`}
              data-cursor
              className="group flex items-center gap-3 py-1"
              aria-label={s.label}
            >
              <span
                className={`font-mono text-[10px] uppercase tracking-widest transition-all duration-300 ${
                  isActive
                    ? "text-primary opacity-100 translate-x-0"
                    : "text-muted-foreground opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0"
                }`}
              >
                {s.label}
              </span>
              <span
                className={`block rounded-full transition-all duration-300 ${
                  isActive
                    ? "h-2 w-2 bg-primary shadow-glow-primary"
                    : "h-1.5 w-1.5 bg-muted-foreground/40 group-hover:bg-primary/70"
                }`}
              />
            </a>
          );
        })}
      </nav>
    </>
  );
};

export default ScrollProgress;
