import { useEffect, useState } from "react";

/**
 * Subtle UX delights:
 *  1. Toast confirmation when CV is downloaded (with animated checkmark).
 *  2. Console signature for curious devs (recruiters who DevTools = chef's kiss).
 *  3. Tab-title swap when user leaves the tab ("come back!").
 */
const UXDelight = () => {
  const [toast, setToast] = useState<{ visible: boolean; key: number }>({
    visible: false,
    key: 0,
  });

  // 1. CV download toast
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      const link = t.closest<HTMLAnchorElement>('a[data-resume-link], a[href$="/Nitin-Soni-Resume.pdf"]');
      if (!link) return;
      setToast((s) => ({ visible: true, key: s.key + 1 }));
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  // Auto-hide toast
  useEffect(() => {
    if (!toast.visible) return;
    const id = window.setTimeout(() => setToast((s) => ({ ...s, visible: false })), 3500);
    return () => window.clearTimeout(id);
  }, [toast.key, toast.visible]);

  // 2. Console signature
  useEffect(() => {
    const styles = [
      "color: hsl(195 100% 65%)",
      "font-family: monospace",
      "font-size: 12px",
      "font-weight: 600",
      "text-shadow: 0 0 12px hsla(195, 100%, 60%, 0.5)",
    ].join(";");
    // eslint-disable-next-line no-console
    console.log(
      "%c> hey, recruiter. you opened devtools — i like you already.\n> reach me: nitinsoni9509290112@gmail.com",
      styles
    );
  }, []);

  // 3. Tab title swap on blur
  useEffect(() => {
    const original = document.title;
    const onBlur = () => { document.title = "← come back, the build is live"; };
    const onFocus = () => { document.title = original; };
    window.addEventListener("blur", onBlur);
    window.addEventListener("focus", onFocus);
    return () => {
      window.removeEventListener("blur", onBlur);
      window.removeEventListener("focus", onFocus);
      document.title = original;
    };
  }, []);

  return (
    <div
      role="status"
      aria-live="polite"
      className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-[80] transition-all duration-500 ease-out ${
        toast.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
      }`}
    >
      <div className="flex items-center gap-3 rounded-md border border-primary/40 bg-card/95 backdrop-blur-xl px-5 py-3 shadow-glow-primary">
        <span className="relative flex h-6 w-6 items-center justify-center rounded-full bg-primary/15">
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="hsl(var(--primary))"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </span>
        <div className="flex flex-col">
          <span className="font-mono text-xs uppercase tracking-widest text-primary">
            cv.pdf · downloaded
          </span>
          <span className="font-mono text-[10px] text-muted-foreground">
            thanks for the read — let's talk.
          </span>
        </div>
      </div>
    </div>
  );
};

export default UXDelight;
