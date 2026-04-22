"use client";

import { useState, useCallback } from "react";
import { Exercise, Set } from "@/lib/types";
import { roundWeight } from "@/lib/progression";

// ─── Live Set State During a Session ────────────────────────────────────────

function makeId(): string {
  return Math.random().toString(36).slice(2, 8);
}

function defaultSets(exercise: Exercise): Set[] {
  // Pre-populate sets with the suggested weight from last session or target
  const weight = exercise.lastWeight ?? exercise.targetWeight;
  return Array.from({ length: exercise.targetSets }, () => ({
    id: makeId(),
    weight,
    reps: exercise.targetReps,
    completed: false,
  }));
}

export function useWorkoutSession(exercises: Exercise[]) {
  // sets[exerciseIndex] = Set[]
  const [allSets, setAllSets] = useState<Set[][]>(
    exercises.map(defaultSets)
  );

  // ─── Set Mutations ─────────────────────────────────────────────────────

  const updateSet = useCallback(
    (exIdx: number, setIdx: number, patch: Partial<Set>) => {
      setAllSets((prev) => {
        const next = prev.map((ex) => [...ex]);
        next[exIdx] = next[exIdx].map((s, i) =>
          i === setIdx ? { ...s, ...patch } : s
        );
        return next;
      });
    },
    []
  );

  const toggleComplete = useCallback(
    (exIdx: number, setIdx: number) => {
      setAllSets((prev) => {
        const next = prev.map((ex) => [...ex]);
        next[exIdx][setIdx] = {
          ...next[exIdx][setIdx],
          completed: !next[exIdx][setIdx].completed,
        };
        return next;
      });
    },
    []
  );

  const removeLastSet = useCallback((exIdx: number) => {
    setAllSets((prev) => {
      const next = prev.map((ex) => [...ex]);
      if (next[exIdx].length === 0) return next;
      next[exIdx] = next[exIdx].slice(0, -1);
      return next;
    });
  }, []);

  const duplicateLastSet = useCallback((exIdx: number) => {
    setAllSets((prev) => {
      const next = prev.map((ex) => [...ex]);
      const sets = next[exIdx];
      if (sets.length === 0) return next;
      const last = sets[sets.length - 1];
      next[exIdx] = [
        ...sets,
        { ...last, id: makeId(), completed: false },
      ];
      return next;
    });
  }, []);

  // ─── Quick-adjust all incomplete sets for an exercise ─────────────────

  const adjustWeight = useCallback(
    (exIdx: number, deltaKg: number) => {
      setAllSets((prev) => {
        const next = prev.map((ex) => [...ex]);
        next[exIdx] = next[exIdx].map((s) =>
          s.completed
            ? s
            : { ...s, weight: roundWeight(Math.max(0, s.weight + deltaKg)) }
        );
        return next;
      });
    },
    []
  );

  const adjustReps = useCallback((exIdx: number, setIdx: number, delta: number) => {
    setAllSets((prev) => {
      const next = prev.map((ex) => [...ex]);
      next[exIdx][setIdx] = {
        ...next[exIdx][setIdx],
        reps: Math.max(1, next[exIdx][setIdx].reps + delta),
      };
      return next;
    });
  }, []);

  // ─── Helpers ───────────────────────────────────────────────────────────

  const completedCount = (exIdx: number) =>
    allSets[exIdx]?.filter((s) => s.completed).length ?? 0;

  const totalSets = (exIdx: number) => allSets[exIdx]?.length ?? 0;

  return {
    allSets,
    updateSet,
    toggleComplete,
    duplicateLastSet,
    removeLastSet,
    adjustWeight,
    adjustReps,
    completedCount,
    totalSets,
  };
}
