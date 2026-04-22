"use client";

import { Set } from "@/lib/types";

interface SetRowProps {
  setNum: number;
  set: Set;
  isCardio?: boolean;
  onWeightChange: (val: number) => void;
  onRepsChange: (val: number) => void;
  onToggleComplete: () => void;
}

export default function SetRow({
  setNum,
  set,
  isCardio = false,
  onWeightChange,
  onRepsChange,
  onToggleComplete,
}: SetRowProps) {
  return (
    <div
      className={`
        flex items-center gap-3 px-4 py-3 rounded-xl border transition-all duration-200
        ${set.completed
          ? "bg-gym-accent/10 border-gym-accent/40"
          : "bg-gym-surface border-gym-border"
        }
      `}
    >
      {/* Set number */}
      <span className="font-display text-gym-sub text-lg w-5 text-center shrink-0">
        {setNum}
      </span>

      {/* Weight — hidden for cardio/bodyweight */}
      {!isCardio && (
        <div className="flex flex-col items-center flex-1">
          <label className="text-[10px] text-gym-sub uppercase tracking-widest mb-1">kg</label>
          <input
            type="number"
            inputMode="decimal"
            value={set.weight}
            onChange={(e) => onWeightChange(parseFloat(e.target.value) || 0)}
            className={`
              w-full text-center font-mono font-bold text-xl bg-gym-bg border rounded-lg py-2
              focus:outline-none focus:border-gym-accent transition-colors
              ${set.completed ? "text-gym-accent border-gym-accent/30" : "text-gym-text border-gym-border"}
            `}
          />
        </div>
      )}

      {/* Reps / minutes */}
      <div className="flex flex-col items-center flex-1">
        <label className="text-[10px] text-gym-sub uppercase tracking-widest mb-1">
          {isCardio ? "min" : "reps"}
        </label>
        <input
          type="number"
          inputMode="numeric"
          value={set.reps}
          onChange={(e) => onRepsChange(parseInt(e.target.value) || 0)}
          className={`
            w-full text-center font-mono font-bold text-xl bg-gym-bg border rounded-lg py-2
            focus:outline-none focus:border-gym-accent transition-colors
            ${set.completed ? "text-gym-accent border-gym-accent/30" : "text-gym-text border-gym-border"}
          `}
        />
      </div>

      {/* Done checkbox */}
      <button
        onClick={onToggleComplete}
        className={`
          w-12 h-12 rounded-xl border-2 flex items-center justify-center
          transition-all duration-150 active:scale-90 shrink-0
          ${set.completed
            ? "bg-gym-accent border-gym-accent text-gym-bg"
            : "border-gym-muted text-gym-muted hover:border-gym-accent/50"
          }
        `}
        aria-label={set.completed ? "Mark incomplete" : "Mark complete"}
      >
        {set.completed ? (
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        ) : (
          <svg className="w-5 h-5 opacity-40" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        )}
      </button>
    </div>
  );
}
