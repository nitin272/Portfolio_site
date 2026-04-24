import { useEffect, useRef } from "react";
import { gsap } from "gsap";

/**
 * Magnetic-style custom cursor.
 * - Small dot follows pointer instantly.
 * - Soft ring trails with easing.
 * - Ring scales up over interactive elements (a, button, [data-cursor]).
 * - Hidden on touch devices.
 */
const CustomCursor = () => {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    // Skip on touch / coarse pointers
    if (typeof window === "undefined") return;
    const isCoarse = window.matchMedia("(pointer: coarse)").matches;
    if (isCoarse) return;

    const dot = dotRef.current!;
    const ring = ringRef.current!;
    const label = labelRef.current!;

    document.documentElement.classList.add("has-custom-cursor");

    const pos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const ringPos = { ...pos };

    gsap.set([dot, ring], { xPercent: -50, yPercent: -50, x: pos.x, y: pos.y, opacity: 0 });
    gsap.to([dot, ring], { opacity: 1, duration: 0.4, delay: 0.2 });

    let raf = 0;
    const tick = () => {
      // Lerp ring toward pointer
      ringPos.x += (pos.x - ringPos.x) * 0.18;
      ringPos.y += (pos.y - ringPos.y) * 0.18;
      gsap.set(dot, { x: pos.x, y: pos.y });
      gsap.set(ring, { x: ringPos.x, y: ringPos.y });
      raf = requestAnimationFrame(tick);
    };
    tick();

    const onMove = (e: MouseEvent) => {
      pos.x = e.clientX;
      pos.y = e.clientY;
    };

    const setHover = (active: boolean, text?: string) => {
      gsap.to(ring, {
        scale: active ? 2.2 : 1,
        backgroundColor: active ? "hsla(195, 100%, 60%, 0.12)" : "hsla(195, 100%, 60%, 0)",
        borderColor: active ? "hsl(195 100% 65%)" : "hsl(220 15% 35%)",
        duration: 0.35,
        ease: "power3.out",
      });
      gsap.to(dot, { scale: active ? 0 : 1, duration: 0.25, ease: "power3.out" });
      if (text) {
        label.textContent = text;
        gsap.to(label, { opacity: 1, scale: 1, duration: 0.25, ease: "power3.out" });
      } else {
        gsap.to(label, { opacity: 0, scale: 0.8, duration: 0.2 });
      }
    };

    const onOver = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      const interactive = t.closest("a, button, [data-cursor]") as HTMLElement | null;
      if (interactive) {
        const cursorText = interactive.getAttribute("data-cursor-text") || undefined;
        setHover(true, cursorText);
      } else {
        setHover(false);
      }
    };

    const onDown = () => gsap.to(ring, { scale: 0.7, duration: 0.15, ease: "power3.out" });
    const onUp = () => gsap.to(ring, { scale: 1, duration: 0.25, ease: "power3.out" });

    const onLeave = () => {
      gsap.to([dot, ring], { opacity: 0, duration: 0.2 });
    };
    const onEnter = () => {
      gsap.to([dot, ring], { opacity: 1, duration: 0.2 });
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mouseover", onOver, { passive: true });
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("mouseenter", onEnter);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mouseenter", onEnter);
      document.documentElement.classList.remove("has-custom-cursor");
    };
  }, []);

  return (
    <>
      <div
        ref={ringRef}
        aria-hidden
        className="custom-cursor-ring pointer-events-none fixed left-0 top-0 z-[200] h-9 w-9 rounded-full border border-border backdrop-blur-[1px] mix-blend-difference will-change-transform"
      >
        <span
          ref={labelRef}
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap font-mono text-[10px] uppercase tracking-widest text-primary opacity-0"
        />
      </div>
      <div
        ref={dotRef}
        aria-hidden
        className="custom-cursor-dot pointer-events-none fixed left-0 top-0 z-[201] h-1.5 w-1.5 rounded-full bg-primary will-change-transform"
      />
    </>
  );
};

export default CustomCursor;
