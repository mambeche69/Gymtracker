"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import ExerciseCard from "@/components/ExerciseCard";
import Timer from "@/components/Timer";
import { MOCK_PROGRAM, TODAY_WORKOUT_INDEX } from "@/lib/mockData";
import { useWorkoutSession } from "@/lib/useWorkoutSession";
import { formatDuration } from "@/lib/progression";
import { appendSession, newSessionId } from "@/lib/sessionStore";
import { Session } from "@/lib/types";

export default function WorkoutPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const workoutId = searchParams.get("id");
  const week = parseInt(searchParams.get("week") ?? "1");

  const workout =
    MOCK_PROGRAM.workouts.find((w) => w.id === workoutId) ??
    MOCK_PROGRAM.workouts[TODAY_WORKOUT_INDEX];

  const exercises = workout.exercises;

  const [currentExIdx, setCurrentExIdx] = useState(0);
  const [finished, setFinished] = useState(false);
  const currentExercise = exercises[currentExIdx];

  const {
    allSets,
    updateSet,
    toggleComplete,
    duplicateLastSet,
    removeLastSet,
    adjustWeight,
    adjustReps,
    completedCount,
  } = useWorkoutSession(exercises);

  const [elapsed, setElapsed] = useState(0);
  const startTime = useRef(Date.now());

  useEffect(() => {
    if (finished) return;
    const interval = setInterval(() => {
      setElapsed(Math.floor((Date.now() - startTime.current) / 1000));
    }, 1000);
    return () => clearInterval(interval);
  }, [finished]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentExIdx]);

  // ─── Save session to localStorage when finished ──────────────────────────
  const handleFinish = () => {
    const session: Session = {
      id: newSessionId(),
      workoutId: workout.id,
      workoutName: workout.name,
      workoutTag: workout.tag,
      programId: MOCK_PROGRAM.id,
      date: new Date().toISOString(),
      week,
      completed: true,
      durationSeconds: elapsed,
      exercises: exercises.map((ex, idx) => ({
        exerciseId: ex.id,
        exerciseName: ex.name,
        sets: allSets[idx].map((s) => ({
          weight: s.weight,
          reps: s.reps,
          completed: s.completed,
        })),
      })),
    };
    appendSession(session);
    setFinished(true);
  };

  const goNext = () => {
    if (currentExIdx < exercises.length - 1) {
      setCurrentExIdx((i) => i + 1);
    } else {
      handleFinish();
    }
  };

  const goPrev = () => {
    if (currentExIdx > 0) setCurrentExIdx((i) => i - 1);
  };

  const totalCompletedSets = allSets.reduce(
    (acc, sets) => acc + sets.filter((s) => s.completed).length, 0
  );
  const totalAllSets = allSets.reduce((acc, sets) => acc + sets.length, 0);

  const tagColors: Record<string, string> = {
    PUSH: "text-gym-accent",
    PULL: "text-blue-400",
    LEGS: "text-orange-400",
  };

  // ─── Finished screen ─────────────────────────────────────────────────────
  if (finished) {
    return (
      <main className="px-4 pt-safe pb-safe min-h-screen flex flex-col items-center justify-center text-center gap-6">
        <div className="text-6xl animate-fade-in">💪</div>
        <div className="animate-slide-up">
          <h2 className="font-display font-semibold text-5xl text-gym-accent uppercase tracking-tight">Done!</h2>
          <p className="font-body text-gym-sub mt-1 text-sm">{workout.name} · saved to history</p>
        </div>

        <div className="w-full grid grid-cols-3 gap-3 animate-slide-up">
          {[
            { label: "Duration", value: formatDuration(elapsed) },
            { label: "Sets Done", value: `${totalCompletedSets}/${totalAllSets}` },
            { label: "Week", value: `W${week}` },
          ].map(({ label, value }) => (
            <div key={label} className="bg-gym-surface border border-gym-border rounded-2xl p-4">
              <p className="font-mono font-bold text-2xl text-gym-accent">{value}</p>
              <p className="font-body text-[10px] text-gym-sub uppercase tracking-widest mt-1">{label}</p>
            </div>
          ))}
        </div>

        <div className="w-full bg-gym-surface border border-gym-border rounded-2xl p-4 animate-slide-up">
          <p className="text-[10px] text-gym-sub uppercase tracking-widest mb-3 font-body text-left">Session Summary</p>
          <div className="flex flex-col gap-2">
            {exercises.map((ex, idx) => {
              const done = allSets[idx].filter((s) => s.completed).length;
              const total = allSets[idx].length;
              const topWeight = Math.max(...allSets[idx].map((s) => s.weight), 0);
              return (
                <div key={ex.id} className="flex items-center justify-between py-2 border-b border-gym-border last:border-0">
                  <p className="font-body text-sm text-gym-text">{ex.name}</p>
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-xs text-gym-sub">
                      {topWeight === 0 ? "BW" : `${topWeight}kg`}
                    </span>
                    <span className={`font-mono text-xs font-semibold ${done === total ? "text-gym-success" : "text-gym-warn"}`}>
                      {done}/{total}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="w-full flex gap-3">
          <button
            onClick={() => router.push("/history")}
            className="flex-1 py-4 rounded-2xl border border-gym-border bg-gym-surface text-gym-sub font-display font-semibold text-lg uppercase tracking-wide active:scale-95 transition-all"
          >
            History
          </button>
          <button
            onClick={() => router.push("/")}
            className="flex-1 py-4 rounded-2xl bg-gym-accent text-gym-bg font-display font-semibold text-xl uppercase tracking-widest active:scale-[0.98] transition-all"
          >
            Home
          </button>
        </div>
      </main>
    );
  }

  // ─── Active workout ───────────────────────────────────────────────────────
  return (
    <main className="px-4 pt-safe pb-safe min-h-screen flex flex-col">
      {/* Top bar */}
      <div className="pt-4 pb-4 flex items-center justify-between">
        <button onClick={() => router.push("/")} className="font-body text-gym-sub text-sm active:text-gym-text transition-colors px-1">
          ← Exit
        </button>
        <div className="flex items-center gap-2">
          {workout.tag && (
            <span className={`font-display font-semibold text-sm uppercase tracking-widest ${tagColors[workout.tag] ?? "text-gym-sub"}`}>
              {workout.tag}
            </span>
          )}
          <span className="font-mono text-sm text-gym-sub">{formatDuration(elapsed)}</span>
        </div>
        <span className="font-mono text-sm text-gym-accent font-semibold">{totalCompletedSets}/{totalAllSets}</span>
      </div>

      {/* Overall progress bar */}
      <div className="h-0.5 bg-gym-border rounded-full mb-5 overflow-hidden">
        <div
          className="h-full bg-gym-accent rounded-full transition-all duration-500"
          style={{ width: totalAllSets > 0 ? `${(totalCompletedSets / totalAllSets) * 100}%` : "0%" }}
        />
      </div>

      {/* Exercise dot nav */}
      <div className="flex gap-1.5 mb-6 justify-center">
        {exercises.map((ex, idx) => {
          const done = allSets[idx]?.filter((s) => s.completed).length ?? 0;
          const total = allSets[idx]?.length ?? 0;
          const isComplete = done > 0 && done === total;
          const isCurrent = idx === currentExIdx;
          return (
            <button
              key={ex.id}
              onClick={() => setCurrentExIdx(idx)}
              className={`h-2 rounded-full transition-all duration-300 ${isCurrent ? "w-8 bg-gym-accent" : isComplete ? "w-3 bg-gym-success" : "w-3 bg-gym-border"}`}
              aria-label={ex.name}
            />
          );
        })}
      </div>

      {/* Exercise card */}
      <div className="flex-1">
        <ExerciseCard
          key={currentExercise.id}
          exercise={currentExercise}
          sets={allSets[currentExIdx]}
          exIndex={currentExIdx}
          totalExercises={exercises.length}
          onWeightChange={(setIdx, val) => updateSet(currentExIdx, setIdx, { weight: val })}
          onRepsChange={(setIdx, val) => updateSet(currentExIdx, setIdx, { reps: val })}
          onToggleComplete={(setIdx) => toggleComplete(currentExIdx, setIdx)}
          onAdjustWeight={(delta) => adjustWeight(currentExIdx, delta)}
          onAdjustReps={(setIdx, delta) => adjustReps(currentExIdx, setIdx, delta)}
          onDuplicate={() => duplicateLastSet(currentExIdx)}
          onRemoveSet={() => removeLastSet(currentExIdx)}
          completedCount={completedCount(currentExIdx)}
        />

        <div className="mt-5">
          <Timer defaultSeconds={90} />
        </div>
      </div>

      {/* Bottom nav */}
      <div className="pt-5 flex gap-3">
        {currentExIdx > 0 && (
          <button
            onClick={goPrev}
            className="flex-none px-5 py-4 rounded-2xl border border-gym-border bg-gym-surface text-gym-sub font-display font-semibold text-lg uppercase tracking-wide active:scale-95 transition-all"
          >
            ←
          </button>
        )}
        <button
          onClick={goNext}
          className={`
            flex-1 py-4 rounded-2xl font-display font-semibold text-xl uppercase tracking-widest
            transition-all duration-150 active:scale-[0.98]
            ${currentExIdx === exercises.length - 1
              ? "bg-gym-success text-gym-bg shadow-[0_0_20px_rgba(0,232,122,0.2)]"
              : "bg-gym-accent text-gym-bg shadow-[0_0_20px_rgba(200,255,0,0.15)]"}
          `}
        >
          {currentExIdx === exercises.length - 1 ? "Finish Workout ✓" : "Next Exercise →"}
        </button>
      </div>
    </main>
  );
}
