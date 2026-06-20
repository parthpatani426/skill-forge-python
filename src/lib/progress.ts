import { useEffect, useState, useCallback } from "react";
import { curriculum } from "./curriculum";

const KEY = "kernel:progress:v1";

function readSet(): Set<string> {
  if (typeof window === "undefined") return new Set();
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return new Set();
    return new Set(JSON.parse(raw) as string[]);
  } catch {
    return new Set();
  }
}

function writeSet(s: Set<string>) {
  localStorage.setItem(KEY, JSON.stringify([...s]));
  window.dispatchEvent(new Event("kernel:progress"));
}

export function lessonKey(moduleId: string, slug: string) {
  return `${moduleId}/${slug}`;
}

export function totalLessonCount() {
  return curriculum.reduce((n, m) => n + m.lessons.length, 0);
}

export function useProgress() {
  const [done, setDone] = useState<Set<string>>(() => readSet());

  useEffect(() => {
    const sync = () => setDone(readSet());
    window.addEventListener("kernel:progress", sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener("kernel:progress", sync);
      window.removeEventListener("storage", sync);
    };
  }, []);

  const toggle = useCallback((key: string) => {
    const s = readSet();
    if (s.has(key)) s.delete(key);
    else s.add(key);
    writeSet(s);
    setDone(new Set(s));
  }, []);

  const isDone = useCallback((key: string) => done.has(key), [done]);
  const total = totalLessonCount();
  const percent = total === 0 ? 0 : Math.round((done.size / total) * 100);

  return { done, toggle, isDone, percent, completedCount: done.size, total };
}
