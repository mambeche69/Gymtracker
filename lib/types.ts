// ─── Core Data Types ───────────────────────────────────────────────────────

export type MuscleGroup =
  | "chest" | "shoulders" | "triceps"
  | "back" | "biceps" | "grip"
  | "quads" | "hamstrings" | "calves" | "glutes"
  | "core" | "power" | "cardio";

export type Equipment =
  | "barbell" | "dumbbell" | "cable" | "machine"
  | "bodyweight" | "cardio" | "other";

export interface Set {
  id: string;
  weight: number;     // kg
  reps: number;
  completed: boolean;
}

export interface Exercise {
  id: string;
  name: string;
  targetSets: number;
  targetReps: number;
  targetWeight: number;
  lastWeight?: number;
  lastReps?: number;
  notes?: string;
  muscleGroup?: MuscleGroup;
  supersetWith?: string;    // id of paired exercise
  isCardio?: boolean;       // cardio exercises show "min" instead of reps
}

export interface Workout {
  id: string;
  name: string;
  tag?: string;             // "PUSH" | "PULL" | "LEGS"
  exercises: Exercise[];
}

export interface Program {
  id: string;
  name: string;
  totalWeeks: number;
  currentWeek: number;
  workouts: Workout[];
}

// ─── Session (completed workout log) ────────────────────────────────────────

export interface SessionSet {
  weight: number;
  reps: number;
  completed: boolean;
}

export interface SessionExercise {
  exerciseId: string;
  exerciseName: string;
  sets: SessionSet[];
}

export interface Session {
  id: string;
  workoutId: string;
  workoutName: string;
  workoutTag?: string;
  programId: string;
  date: string;
  week: number;
  exercises: SessionExercise[];
  durationSeconds?: number;
  completed: boolean;
}

// ─── Exercise Library ────────────────────────────────────────────────────────

export interface ExerciseLibraryItem {
  id: string;
  name: string;
  muscleGroup: MuscleGroup;
  equipment: Equipment;
  notes?: string;
  isCardio?: boolean;
}

// ─── Firestore paths ────────────────────────────────────────────────────────
// users/{userId}/programs/{programId}
// users/{userId}/workouts/{workoutId}
// users/{userId}/sessions/{sessionId}
