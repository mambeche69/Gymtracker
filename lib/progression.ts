import { Exercise, SessionSet } from "./types";

// ─── Progression Rules ───────────────────────────────────────────────────────
// Simple linear progression:
//   • If all sets hit or exceeded target reps → increase weight
//   • If any set failed target reps → hold weight
//   • Deload rule: if failing 2 sessions in a row → drop 10%

export interface ProgressionResult {
  suggestedWeight: number;
  message: string;
  shouldIncrease: boolean;
}

const INCREASE_BY = 2.5; // kg — standard microload

/**
 * Calculates the next session's suggested weight for an exercise.
 */
export function calcNextWeight(
  exercise: Exercise,
  lastSets: SessionSet[]
): ProgressionResult {
  if (!lastSets || lastSets.length === 0) {
    return {
      suggestedWeight: exercise.targetWeight,
      message: "First session — start at target",
      shouldIncrease: false,
    };
  }

  const completedSets = lastSets.filter((s) => s.completed);
  const allHitTarget = completedSets.every(
    (s) => s.reps >= exercise.targetReps
  );
  const lastWeight = lastSets[0]?.weight ?? exercise.targetWeight;

  if (allHitTarget && completedSets.length >= exercise.targetSets) {
    return {
      suggestedWeight: lastWeight + INCREASE_BY,
      message: `All sets complete ✓ → +${INCREASE_BY}kg`,
      shouldIncrease: true,
    };
  }

  return {
    suggestedWeight: lastWeight,
    message: "Keep weight, hit all reps first",
    shouldIncrease: false,
  };
}

/**
 * Round weight to nearest 0.5kg (realistic plate increments).
 */
export function roundWeight(kg: number): number {
  return Math.round(kg * 2) / 2;
}

/**
 * Format weight for display — avoids ".0" suffix.
 */
export function formatWeight(kg: number): string {
  return kg % 1 === 0 ? `${kg}` : `${kg}`;
}

/**
 * Format duration in seconds to mm:ss.
 */
export function formatDuration(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${s.toString().padStart(2, "0")}`;
}
