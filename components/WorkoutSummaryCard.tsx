"use client";

import { Workout } from "@/lib/types";

interface WorkoutSummaryCardProps {
  workout: Workout;
  week: number;
  totalWeeks: number;
  onStart: () => void;
}

const muscleColor: Record<string, string> = {
  chest: "text-rose-400", shoulders: "text-amber-400", triceps: "text-orange-400",
  back: "text-blue-400", biceps: "text-cyan-400", grip: "text-teal-400",
  quads: "text-gym-accent", hamstrings: "text-lime-400", calves: "text-green-400",
  core: "text-purple-400", power: "text-pink-400", cardio: "text-indigo-400",
};

export default function WorkoutSummaryCard({
  workout, week, totalWeeks, onStart,
}: WorkoutSummaryCardProps) {
  const weekProgress = (week / totalWeeks) * 100;

  return (
    <div className="flex flex-col gap-5">
      {/* Week progress */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <span className="font-body text-xs text-gym-sub uppercase tracking-widest">Program Progress</span>
          <span className="font-mono text-xs text-gym-accent">Week {week} / {totalWeeks}</span>
        </div>
        <div className="h-2 bg-gym-border rounded-full overflow-hidden">
          <div className="h-full bg-gym-accent rounded-full transition-all duration-700" style={{ width: `${weekProgress}%` }} />
        </div>
        <div className="flex gap-1 mt-2">
          {Array.from({ length: totalWeeks }, (_, i) => (
            <div key={i} className={`flex-1 h-1 rounded-full ${i < week ? "bg-gym-accent/60" : "bg-gym-border"}`} />
          ))}
        </div>
      </div>

      {/* Workout card */}
      <div className="bg-gym-surface border border-gym-border rounded-2xl p-5">
        <p className="text-[10px] text-gym-sub uppercase tracking-widest mb-1 font-body">Today's Session</p>
        <h2 className="font-display font-semibold text-3xl text-gym-text uppercase tracking-tight leading-tight mb-4">
          {workout.name}
        </h2>

        <div className="flex flex-col gap-3">
          {workout.exercises.map((ex) => (
            <div key={ex.id} className="flex items-center justify-between border-b border-gym-border pb-2.5 last:border-0 last:pb-0">
              <div className="flex-1 min-w-0 pr-3">
                <div className="flex items-center gap-2 mb-0.5">
                  <p className="font-body text-sm font-medium text-gym-text truncate">{ex.name}</p>
                  {ex.supersetWith && <span className="text-purple-400 text-[10px] shrink-0">⚡SS</span>}
                </div>
                <div className="flex items-center gap-2">
                  <p className="font-body text-xs text-gym-sub">
                    {ex.targetSets}×{ex.isCardio ? `${ex.targetReps}min` : ex.targetReps}
                  </p>
                  {ex.muscleGroup && (
                    <span className={`font-body text-[9px] uppercase tracking-widest ${muscleColor[ex.muscleGroup] ?? "text-gym-sub"}`}>
                      {ex.muscleGroup}
                    </span>
                  )}
                </div>
              </div>
              {/* Last performance */}
              {ex.lastWeight !== undefined ? (
                <div className="text-right shrink-0">
                  <p className="font-mono text-[10px] text-gym-sub">Last</p>
                  <p className="font-mono text-sm text-gym-text font-semibold">
                    {ex.lastWeight === 0 ? "BW" : `${ex.lastWeight}kg`}
                    {ex.isCardio ? `×${ex.lastReps}m` : `×${ex.lastReps}`}
                  </p>
                </div>
              ) : (
                <span className="font-mono text-xs text-gym-muted shrink-0">New</span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Start button */}
      <button
        onClick={onStart}
        className="w-full py-5 rounded-2xl bg-gym-accent text-gym-bg font-display font-semibold text-2xl uppercase tracking-widest transition-all duration-150 active:scale-[0.98] animate-pulse-accent shadow-[0_0_30px_rgba(200,255,0,0.15)]"
      >
        Start Workout →
      </button>
    </div>
  );
}
