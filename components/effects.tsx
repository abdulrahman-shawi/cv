"use client";

import { useEffect, useRef, useState } from "react";

export function useInView<T extends HTMLElement>(threshold = 0.3) {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          obs.disconnect();
        }
      },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);

  return { ref, inView };
}

export function TypingText({ words, className }: { words: string[]; className?: string }) {
  const [index, setIndex] = useState(0);
  const [sub, setSub] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    setIndex(0);
    setSub(0);
    setDeleting(false);
  }, [words]);

  useEffect(() => {
    const word = words[index % words.length];
    let delay = deleting ? 40 : 90;
    if (!deleting && sub === word.length) delay = 1600;
    if (deleting && sub === 0) delay = 350;

    const timer = setTimeout(() => {
      if (!deleting && sub === word.length) {
        setDeleting(true);
      } else if (deleting && sub === 0) {
        setDeleting(false);
        setIndex((i) => (i + 1) % words.length);
      } else {
        setSub((s) => s + (deleting ? -1 : 1));
      }
    }, delay);
    return () => clearTimeout(timer);
  }, [sub, deleting, index, words]);

  return (
    <span className={className}>
      {words[index % words.length].slice(0, sub)}
      <span className="typing-caret" aria-hidden="true" />
    </span>
  );
}

export function Counter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const { ref, inView } = useInView<HTMLSpanElement>(0.4);
  const [val, setVal] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const duration = 1600;
    const start = performance.now();
    let raf: number;
    const tick = (now: number) => {
      const p = Math.min((now - start) / duration, 1);
      setVal(Math.round(to * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, to]);

  return (
    <span ref={ref}>
      {val}
      {suffix}
    </span>
  );
}

export function SkillBar({ name, percent }: { name: string; percent: number }) {
  const { ref, inView } = useInView<HTMLDivElement>(0.4);

  return (
    <div ref={ref}>
      <div className="mb-2 flex items-center justify-between text-sm">
        <span className="font-medium text-zinc-200">{name}</span>
        <span className="font-semibold text-accent">{percent}%</span>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-white/10">
        <div
          className="h-full rounded-full bg-gradient-to-l from-accent to-accent-soft transition-[width] duration-1000 ease-out"
          style={{ width: inView ? `${percent}%` : "0%" }}
        />
      </div>
    </div>
  );
}
