"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import WorkoutSummaryCard from "@/components/WorkoutSummaryCard";
import { MOCK_PROGRAM } from "@/lib/mockData";
import { isFirebaseConfigured } from "@/lib/firebase";
import { loadSessions } from "@/lib/sessionStore";

export default function HomePage() {
  const router = useRouter();
  const program = MOCK_PROGRAM;

  // ─── Determine today's workout by cycling through recent sessions ──────────
  const [todayIdx, setTodayIdx] = useState(0);

  useEffect(() => {
    const sessions = loadSessions();
    if (sessions.length === 0) { setTodayIdx(0); return; }
    const last = [...sessions].sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    )[0];
    const lastIdx = program.workouts.findIndex((w) => w.id === last.workoutId);
    const nextIdx = lastIdx >= 0 ? (lastIdx + 1) % program.workouts.length : 0;
    setTodayIdx(nextIdx);
  }, []);

  const todayWorkout = program.workouts[todayIdx];

  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long", month: "long", day: "numeric",
  });

  const tagColors: Record<string, string> = {
    PUSH: "text-gym-accent bg-gym-accent/10 border-gym-accent/30",
    PULL: "text-blue-400 bg-blue-400/10 border-blue-400/30",
    LEGS: "text-orange-400 bg-orange-400/10 border-orange-400/30",
  };

  return (
    <main className="px-4 pt-safe pb-safe flex flex-col min-h-screen">
      {/* Header */}
      <header className="pt-4 pb-5 flex items-start justify-between">
        <div>
          <h1 className="font-display font-semibold text-5xl text-gym-text uppercase tracking-tight leading-none">
            Gym<span className="text-gym-accent">.</span>
          </h1>
          <p className="font-body text-xs text-gym-sub mt-1">{today}</p>
        </div>
        <div className="flex items-center gap-1.5 mt-1">
          <div className={`w-2 h-2 rounded-full ${isFirebaseConfigured ? "bg-gym-success" : "bg-gym-warn"}`} />
          <span className="font-body text-[10px] text-gym-sub uppercase tracking-wider">
            {isFirebaseConfigured ? "Firebase" : "Local"}
          </span>
        </div>
      </header>

      {/* Nav tabs */}
      <nav className="flex gap-2 mb-6">
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
              ${href === "/"
                ? "bg-gym-accent text-gym-bg border-transparent"
                : "bg-gym-surface border-gym-border text-gym-sub"}
            `}
          >
            {label}
          </button>
        ))}
      </nav>

      {/* Program info */}
      <div className="mb-4 px-1 flex items-center justify-between">
        <div>
          <p className="font-body text-[10px] text-gym-sub uppercase tracking-widest">Active Program</p>
          <p className="font-display text-xl text-gym-text font-semibold uppercase tracking-wide">{program.name}</p>
        </div>
        {todayWorkout.tag && (
          <span className={`font-display font-semibold text-sm uppercase tracking-widest px-3 py-1 rounded-lg border ${tagColors[todayWorkout.tag] ?? ""}`}>
            {todayWorkout.tag}
          </span>
        )}
      </div>

      {/* Main card */}
      <div className="flex-1">
        <WorkoutSummaryCard
          workout={todayWorkout}
          week={program.currentWeek}
          totalWeeks={program.totalWeeks}
          onStart={() =>
            router.push(`/workout?id=${todayWorkout.id}&week=${program.currentWeek}`)
          }
        />
      </div>

      {!isFirebaseConfigured && (
        <p className="text-center font-body text-[10px] text-gym-muted mt-4 pb-2">
          Running on local storage — add .env.local to enable Firebase sync
        </p>
      )}
    </main>
  );
}
