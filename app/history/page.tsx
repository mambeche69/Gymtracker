"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Session } from "@/lib/types";
import { loadSessions, formatSessionDate } from "@/lib/sessionStore";
import { formatDuration } from "@/lib/progression";

// ─── Tag color map ────────────────────────────────────────────────────────────
const tagBg: Record<string, string> = {
  PUSH: "bg-gym-accent/10 text-gym-accent border-gym-accent/30",
  PULL: "bg-blue-400/10 text-blue-400 border-blue-400/30",
  LEGS: "bg-orange-400/10 text-orange-400 border-orange-400/30",
};

// ─── Single session card ──────────────────────────────────────────────────────
function SessionCard({ session }: { session: Session }) {
  const [expanded, setExpanded] = useState(false);

  const totalSets = session.exercises.reduce((a, e) => a + e.sets.length, 0);
  const doneSets = session.exercises.reduce(
    (a, e) => a + e.sets.filter((s) => s.completed).length, 0
  );

  // Volume = sum of weight × reps for all completed sets (skip BW exercises)
  const volume = session.exercises.reduce((acc, ex) =>
    acc + ex.sets
      .filter((s) => s.completed && s.weight > 0)
      .reduce((a, s) => a + s.weight * s.reps, 0)
  , 0);

  return (
    <div className="bg-gym-surface border border-gym-border rounded-2xl overflow-hidden">
      {/* ── Card header (always visible) ─────────────────────────────── */}
      <button
        className="w-full text-left px-4 py-4 flex items-start justify-between gap-3 active:bg-gym-border/20 transition-colors"
        onClick={() => setExpanded((e) => !e)}
      >
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            {session.workoutTag && (
              <span className={`font-display font-semibold text-xs uppercase tracking-widest px-2 py-0.5 rounded border ${tagBg[session.workoutTag] ?? ""}`}>
                {session.workoutTag}
              </span>
            )}
            <span className="font-body text-xs text-gym-sub">
              {formatSessionDate(session.date)}
            </span>
          </div>
          <h3 className="font-display font-semibold text-2xl text-gym-text uppercase tracking-tight leading-none">
            {session.workoutName}
          </h3>

          {/* Quick stats */}
          <div className="flex gap-4 mt-2">
            {[
              { v: `${doneSets}/${totalSets}`, l: "sets" },
              { v: session.durationSeconds ? formatDuration(session.durationSeconds) : "—", l: "time" },
              { v: volume > 0 ? `${Math.round(volume / 1000 * 10) / 10}t` : "BW", l: "vol" },
            ].map(({ v, l }) => (
              <div key={l}>
                <span className="font-mono text-sm font-semibold text-gym-text">{v}</span>
                <span className="font-body text-[10px] text-gym-sub uppercase tracking-widest ml-1">{l}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Chevron */}
        <span className={`text-gym-sub text-lg transition-transform duration-200 ${expanded ? "rotate-180" : ""}`}>
          ⌄
        </span>
      </button>

      {/* ── Expanded detail ───────────────────────────────────────────── */}
      {expanded && (
        <div className="border-t border-gym-border px-4 py-4 animate-fade-in">
          {session.exercises.map((ex) => {
            const topWeight = Math.max(...ex.sets.map((s) => s.weight), 0);
            const topReps = ex.sets.filter((s) => s.completed && s.weight === topWeight)?.[0]?.reps ?? 0;

            return (
              <div key={ex.exerciseId} className="mb-4 last:mb-0">
                <div className="flex items-center justify-between mb-2">
                  <p className="font-body text-sm font-semibold text-gym-text">{ex.exerciseName}</p>
                  <p className="font-mono text-xs text-gym-sub">
                    {topWeight === 0 ? "BW" : `${topWeight}kg`} × {topReps}
                  </p>
                </div>
                {/* Set rows */}
                <div className="flex flex-wrap gap-1.5">
                  {ex.sets.map((s, i) => (
                    <div
                      key={i}
                      className={`px-2.5 py-1.5 rounded-lg border font-mono text-xs ${
                        s.completed
                          ? "bg-gym-success/10 border-gym-success/30 text-gym-success"
                          : "bg-gym-border/30 border-gym-border text-gym-sub line-through"
                      }`}
                    >
                      {s.weight === 0 ? "BW" : `${s.weight}kg`}×{s.reps}
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

// ─── History page ─────────────────────────────────────────────────────────────
export default function HistoryPage() {
  const router = useRouter();
  const [sessions, setSessions] = useState<Session[]>([]);
  const [filter, setFilter] = useState<string>("ALL");

  useEffect(() => {
    const all = loadSessions().sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );
    setSessions(all);
  }, []);

  const filters = ["ALL", "PUSH", "PULL", "LEGS"];
  const filtered = filter === "ALL" ? sessions : sessions.filter((s) => s.workoutTag === filter);

  // Streak: count consecutive days with at least one session
  const streak = (() => {
    if (!sessions.length) return 0;
    const days = new Set(sessions.map((s) => s.date.slice(0, 10)));
    let count = 0;
    let d = new Date();
    while (true) {
      const key = d.toISOString().slice(0, 10);
      if (days.has(key)) { count++; d.setDate(d.getDate() - 1); }
      else break;
    }
    return count;
  })();

  return (
    <main className="px-4 pt-safe pb-safe min-h-screen flex flex-col">
      {/* Header */}
      <header className="pt-4 pb-5 flex items-center justify-between">
        <div>
          <h1 className="font-display font-semibold text-5xl text-gym-text uppercase tracking-tight leading-none">
            Log<span className="text-gym-accent">.</span>
          </h1>
          <p className="font-body text-xs text-gym-sub mt-1">{sessions.length} sessions recorded</p>
        </div>
        {streak > 0 && (
          <div className="text-right">
            <p className="font-mono font-bold text-2xl text-gym-accent">{streak}🔥</p>
            <p className="font-body text-[10px] text-gym-sub uppercase tracking-widest">day streak</p>
          </div>
        )}
      </header>

      {/* Nav */}
      <nav className="flex gap-2 mb-5">
        {[
          { label: "Today", href: "/" },
          { label: "History", href: "/history" },
          { label: "Library", href: "/library" },
        ].map(({ label, href }) => (
          <button
            key={label}
            onClick={() => router.push(href)}
            className={`
              flex-1 py-2.5 rounded-xl font-display font-semibold text-sm uppercase tracking-wide
              border transition-all active:scale-95
              ${href === "/history"
                ? "bg-gym-accent text-gym-bg border-transparent"
                : "bg-gym-surface border-gym-border text-gym-sub"}
            `}
          >
            {label}
          </button>
        ))}
      </nav>

      {/* Summary stats */}
      <div className="grid grid-cols-3 gap-2 mb-5">
        {[
          { label: "Total", value: sessions.length },
          { label: "Push", value: sessions.filter((s) => s.workoutTag === "PUSH").length },
          { label: "Pull", value: sessions.filter((s) => s.workoutTag === "PULL").length },
        ].map(({ label, value }) => (
          <div key={label} className="bg-gym-surface border border-gym-border rounded-xl px-3 py-3 text-center">
            <p className="font-mono font-bold text-xl text-gym-text">{value}</p>
            <p className="font-body text-[10px] text-gym-sub uppercase tracking-widest">{label}</p>
          </div>
        ))}
      </div>

      {/* Filter pills */}
      <div className="flex gap-2 mb-4">
        {filters.map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`
              flex-1 py-2 rounded-xl font-display font-semibold text-xs uppercase tracking-widest
              border transition-all active:scale-95
              ${filter === f
                ? "bg-gym-accent/20 border-gym-accent/50 text-gym-accent"
                : "bg-gym-surface border-gym-border text-gym-sub"}
            `}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Session list */}
      <div className="flex flex-col gap-3 flex-1">
        {filtered.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center text-center gap-3 py-16">
            <p className="text-4xl">📋</p>
            <p className="font-display text-xl text-gym-sub uppercase tracking-wide">No sessions yet</p>
            <p className="font-body text-sm text-gym-muted">Complete a workout to see it here</p>
            <button
              onClick={() => router.push("/")}
              className="mt-2 px-6 py-3 rounded-xl bg-gym-accent text-gym-bg font-display font-semibold text-sm uppercase tracking-widest active:scale-95 transition-all"
            >
              Start Workout
            </button>
          </div>
        ) : (
          filtered.map((session) => (
            <SessionCard key={session.id} session={session} />
          ))
        )}
      </div>
    </main>
  );
}
