"use client";

import { Exercise, Set } from "@/lib/types";
import SetRow from "./SetRow";
import { calcNextWeight } from "@/lib/progression";

interface ExerciseCardProps {
  exercise: Exercise;
  sets: Set[];
  exIndex: number;
  totalExercises: number;
  onWeightChange: (setIdx: number, val: number) => void;
  onRepsChange: (setIdx: number, val: number) => void;
  onToggleComplete: (setIdx: number) => void;
  onAdjustWeight: (delta: number) => void;
  onAdjustReps: (setIdx: number, delta: number) => void;
  onDuplicate: () => void;
  onRemoveSet: () => void;
  completedCount: number;
}

// Muscle group accent colors
const muscleColors: Record<string, string> = {
  chest: "text-rose-400",
  shoulders: "text-amber-400",
  triceps: "text-orange-400",
  back: "text-blue-400",
  biceps: "text-cyan-400",
  grip: "text-teal-400",
  quads: "text-gym-accent",
  hamstrings: "text-lime-400",
  calves: "text-green-400",
  core: "text-purple-400",
  power: "text-pink-400",
  cardio: "text-indigo-400",
};

export default function ExerciseCard({
  exercise,
  sets,
  exIndex,
  totalExercises,
  onWeightChange,
  onRepsChange,
  onToggleComplete,
  onAdjustWeight,
  onDuplicate,
  onRemoveSet,
  completedCount,
}: ExerciseCardProps) {
  const lastSets = sets.map(() => ({
    weight: exercise.lastWeight ?? exercise.targetWeight,
    reps: exercise.lastReps ?? exercise.targetReps,
    completed: true,
  }));
  const progression = calcNextWeight(exercise, lastSets);
  const allDone = completedCount === sets.length && sets.length > 0;
  const isCardio = exercise.isCardio;
  const accentColor = muscleColors[exercise.muscleGroup ?? ""] ?? "text-gym-accent";

  return (
    <div className="animate-slide-up">
      {/* ── Header ─────────────────────────────────────────────────── */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-[10px] text-gym-sub uppercase tracking-widest font-body">
            Exercise {exIndex + 1} / {totalExercises}
          </span>
          <div className="flex items-center gap-2">
            {exercise.muscleGroup && (
              <span className={`font-body text-[10px] uppercase tracking-widest font-semibold ${accentColor}`}>
                {exercise.muscleGroup}
              </span>
            )}
            {allDone && (
              <span className="text-xs text-gym-success font-body font-medium bg-gym-success/10 px-2 py-0.5 rounded-full">
                ✓ Done
              </span>
            )}
          </div>
        </div>

        {/* Name */}
        <h2 className="font-display font-semibold text-4xl text-gym-text uppercase leading-none tracking-tight">
          {exercise.name}
        </h2>

        {/* Superset badge */}
        {exercise.supersetWith && (
          <div className="mt-1.5 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-purple-400/10 border border-purple-400/25">
            <span className="text-purple-400 text-[10px]">⚡</span>
            <span className="font-body text-[10px] text-purple-400 uppercase tracking-widest">Superset</span>
          </div>
        )}

        {/* Notes / cues */}
        {exercise.notes && (
          <p className="font-body text-xs text-gym-sub mt-1.5 italic">{exercise.notes}</p>
        )}

        {/* Last + progression */}
        <div className="mt-2 flex items-center gap-3 flex-wrap">
          {exercise.lastWeight !== undefined && (
            <span className="font-mono text-sm text-gym-sub">
              Last:{" "}
              <span className="text-gym-text font-semibold">
                {exercise.lastWeight === 0 ? "BW" : `${exercise.lastWeight}kg`}
                {" "}×{" "}{exercise.lastReps}
              </span>
            </span>
          )}
          {progression.shouldIncrease && !isCardio && (
            <span className="text-xs font-body text-gym-accent bg-gym-accent/10 px-2 py-0.5 rounded-full border border-gym-accent/20">
              ↑ +2.5kg today
            </span>
          )}
        </div>

        {/* Target */}
        <p className="font-body text-xs text-gym-sub mt-1">
          Target: {exercise.targetSets}×{isCardio ? `${exercise.targetReps}min` : `${exercise.targetReps} reps`}
          {exercise.targetWeight > 0 && !isCardio && ` @ ${exercise.targetWeight}kg`}
        </p>
      </div>

      {/* ── Quick-adjust (hidden for cardio/bodyweight) ─────────────── */}
      {!isCardio && (
        <div className="flex gap-2 mb-4">
          {[
            { label: "+2.5kg", delta: 2.5, pos: true },
            { label: "+5kg", delta: 5, pos: true },
            { label: "-2.5kg", delta: -2.5, pos: false },
          ].map(({ label, delta, pos }) => (
            <button
              key={label}
              onClick={() => onAdjustWeight(delta)}
              className={`
                flex-1 py-3 rounded-xl font-display font-semibold text-sm uppercase tracking-wide
                border transition-all active:scale-95
                ${pos
                  ? "bg-gym-accent/10 border-gym-accent/30 text-gym-accent"
                  : "bg-gym-danger/10 border-gym-danger/30 text-gym-danger"}
              `}
            >
              {label}
            </button>
          ))}
          <button
            onClick={onDuplicate}
            className="flex-1 py-3 rounded-xl font-display font-semibold text-sm uppercase tracking-wide border border-gym-border bg-gym-surface text-gym-sub transition-all active:scale-95"
          >
            +Set
          </button>
          <button
            onClick={() => {
              if (sets.length === 0) return;
              // Confirm only if the last set was already completed
              const lastSet = sets[sets.length - 1];
              if (lastSet.completed) {
                if (!window.confirm("Remove completed set?")) return;
              }
              onRemoveSet();
            }}
            disabled={sets.length === 0}
            className="flex-1 py-3 rounded-xl font-display font-semibold text-sm uppercase tracking-wide border transition-all active:scale-95 disabled:opacity-30 disabled:cursor-not-allowed border-gym-danger/40 bg-gym-danger/10 text-gym-danger"
          >
            −Set
          </button>
        </div>
      )}

      {/* ── Sets list ───────────────────────────────────────────────── */}
      <div className="flex flex-col gap-2 mb-4">
        {sets.map((set, idx) => (
          <SetRow
            key={set.id}
            setNum={idx + 1}
            set={set}
            isCardio={isCardio}
            onWeightChange={(val) => onWeightChange(idx, val)}
            onRepsChange={(val) => onRepsChange(idx, val)}
            onToggleComplete={() => onToggleComplete(idx)}
          />
        ))}
      </div>

      {/* ── Progress bar ─────────────────────────────────────────────── */}
      <div className="flex gap-1 mb-1">
        {sets.map((s, i) => (
          <div
            key={i}
            className={`h-1 flex-1 rounded-full transition-colors duration-300 ${s.completed ? "bg-gym-accent" : "bg-gym-border"}`}
          />
        ))}
      </div>
      <p className="text-[10px] text-gym-sub font-body">
        {completedCount}/{sets.length} sets complete
      </p>
    </div>
  );
}
