import { Program, Session, ExerciseLibraryItem } from "./types";

// ─── Jorge's Real PPL Program ────────────────────────────────────────────────

export const MOCK_PROGRAM: Program = {
  id: "jorge-ppl",
  name: "Push / Traction / Legs",
  totalWeeks: 8,
  currentWeek: 3,
  workouts: [
    // ── PUSH ──────────────────────────────────────────────────────────────
    {
      id: "push",
      name: "Push",
      tag: "PUSH",
      exercises: [
        {
          id: "incline-db-press",
          name: "Incline DB Press (Neutral)",
          targetSets: 3,
          targetReps: 10,
          targetWeight: 24,
          lastWeight: 22,
          lastReps: 10,
          notes: "30% incline · neutral grip · superset with Plank",
          supersetWith: "plank-shoulder-touch",
          muscleGroup: "chest",
        },
        {
          id: "plank-shoulder-touch",
          name: "Plank Shoulder Touch",
          targetSets: 3,
          targetReps: 20,
          targetWeight: 0,
          lastWeight: 0,
          lastReps: 20,
          notes: "Superset with Incline DB Press · bodyweight",
          supersetWith: "incline-db-press",
          muscleGroup: "core",
        },
        {
          id: "db-military-press",
          name: "DB Military Press (Neutral)",
          targetSets: 3,
          targetReps: 10,
          targetWeight: 20,
          lastWeight: 18,
          lastReps: 10,
          notes: "Seated · neutral grip",
          muscleGroup: "shoulders",
        },
        {
          id: "decline-pushup",
          name: "Decline Push-Up",
          targetSets: 3,
          targetReps: 12,
          targetWeight: 0,
          lastWeight: 0,
          lastReps: 12,
          notes: "Feet elevated · bodyweight",
          muscleGroup: "chest",
        },
        {
          id: "db-french-press",
          name: "DB French Press (Neutral)",
          targetSets: 3,
          targetReps: 12,
          targetWeight: 14,
          lastWeight: 12,
          lastReps: 12,
          notes: "Neutral grip · full ROM",
          muscleGroup: "triceps",
        },
        {
          id: "zone2-cardio",
          name: "Zone 2 Cardio",
          targetSets: 1,
          targetReps: 1,
          targetWeight: 0,
          lastWeight: 0,
          lastReps: 1,
          notes: "45 min · treadmill 8% incline walk OR slow bike",
          muscleGroup: "cardio",
          isCardio: true,
        },
      ],
    },

    // ── TRACTION (Pull) ────────────────────────────────────────────────────
    {
      id: "traction",
      name: "Traction",
      tag: "PULL",
      exercises: [
        {
          id: "lat-pulldown-prone",
          name: "Lat Pulldown (Pronated)",
          targetSets: 4,
          targetReps: 10,
          targetWeight: 55,
          lastWeight: 52.5,
          lastReps: 10,
          notes: "Pronated / overhand grip · full stretch at top",
          muscleGroup: "back",
        },
        {
          id: "pendlay-row",
          name: "Pendlay Row",
          targetSets: 4,
          targetReps: 8,
          targetWeight: 70,
          lastWeight: 67.5,
          lastReps: 8,
          notes: "Barbell · dead-stop each rep",
          muscleGroup: "back",
        },
        {
          id: "face-pull-high",
          name: "Face Pull (High Pulley)",
          targetSets: 3,
          targetReps: 15,
          targetWeight: 20,
          lastWeight: 20,
          lastReps: 15,
          notes: "High pulley · external rotation at finish",
          muscleGroup: "shoulders",
        },
        {
          id: "1arm-db-row",
          name: "1-Arm Dumbbell Row",
          targetSets: 3,
          targetReps: 10,
          targetWeight: 30,
          lastWeight: 28,
          lastReps: 10,
          notes: "Each side · brace on bench",
          muscleGroup: "back",
        },
        {
          id: "low-pulley-row",
          name: "Low Pulley Row",
          targetSets: 3,
          targetReps: 12,
          targetWeight: 45,
          lastWeight: 45,
          lastReps: 11,
          notes: "Seated · neutral grip handle",
          muscleGroup: "back",
        },
        {
          id: "farmers-walk",
          name: "Farmer's Walk",
          targetSets: 3,
          targetReps: 1,
          targetWeight: 24,
          lastWeight: 22,
          lastReps: 1,
          notes: "40m per set · per hand",
          muscleGroup: "grip",
          isCardio: false,
        },
      ],
    },

    // ── LEGS ──────────────────────────────────────────────────────────────
    {
      id: "legs",
      name: "Legs",
      tag: "LEGS",
      exercises: [
        {
          id: "barbell-squat",
          name: "Barbell Squat",
          targetSets: 4,
          targetReps: 6,
          targetWeight: 90,
          lastWeight: 87.5,
          lastReps: 6,
          notes: "High bar · full depth",
          muscleGroup: "quads",
        },
        {
          id: "romanian-deadlift",
          name: "Romanian Deadlift",
          targetSets: 3,
          targetReps: 10,
          targetWeight: 80,
          lastWeight: 77.5,
          lastReps: 10,
          notes: "Hinge · soft knees · feel the hamstring stretch",
          muscleGroup: "hamstrings",
        },
        {
          id: "bulgarian-split-squat",
          name: "Bulgarian Split Squat",
          targetSets: 3,
          targetReps: 8,
          targetWeight: 20,
          lastWeight: 18,
          lastReps: 8,
          notes: "Each leg · rear foot elevated · DBs",
          muscleGroup: "quads",
        },
        {
          id: "db-step-ups",
          name: "Dumbbell Step-Ups",
          targetSets: 3,
          targetReps: 10,
          targetWeight: 16,
          lastWeight: 14,
          lastReps: 10,
          notes: "Each leg · knee-height box",
          muscleGroup: "quads",
        },
        {
          id: "box-jumps",
          name: "Box Jumps",
          targetSets: 3,
          targetReps: 6,
          targetWeight: 0,
          lastWeight: 0,
          lastReps: 6,
          notes: "Bodyweight · full hip extension at top · step down",
          muscleGroup: "power",
        },
        {
          id: "calf-raises",
          name: "Calf Raises",
          targetSets: 4,
          targetReps: 15,
          targetWeight: 60,
          lastWeight: 60,
          lastReps: 15,
          notes: "Standing · full ROM · pause at top",
          muscleGroup: "calves",
        },
        {
          id: "pallof-press",
          name: "Pallof Press",
          targetSets: 3,
          targetReps: 12,
          targetWeight: 15,
          lastWeight: 15,
          lastReps: 12,
          notes: "Each side · anti-rotation · hold 1s at extension",
          muscleGroup: "core",
        },
      ],
    },
  ],
};

// ─── Today's workout (cycles Push→Traction→Legs) ─────────────────────────────
export const TODAY_WORKOUT_INDEX = 0; // 0=Push, 1=Traction, 2=Legs

// ─── Exercise Library ────────────────────────────────────────────────────────
// Full library of all exercises, categorized — used by the Library editor page.

export const EXERCISE_LIBRARY: ExerciseLibraryItem[] = [
  // CHEST
  { id: "incline-db-press", name: "Incline DB Press (Neutral)", muscleGroup: "chest", equipment: "dumbbell", notes: "30% incline · neutral grip" },
  { id: "decline-pushup", name: "Decline Push-Up", muscleGroup: "chest", equipment: "bodyweight", notes: "Feet elevated" },
  { id: "db-flye", name: "Dumbbell Flye", muscleGroup: "chest", equipment: "dumbbell", notes: "Flat or incline" },
  { id: "cable-crossover", name: "Cable Crossover", muscleGroup: "chest", equipment: "cable", notes: "High or low pulley" },

  // SHOULDERS
  { id: "db-military-press", name: "DB Military Press (Neutral)", muscleGroup: "shoulders", equipment: "dumbbell", notes: "Seated · neutral grip" },
  { id: "lateral-raise", name: "Lateral Raise", muscleGroup: "shoulders", equipment: "dumbbell", notes: "Slight forward lean" },
  { id: "face-pull-high", name: "Face Pull (High Pulley)", muscleGroup: "shoulders", equipment: "cable", notes: "External rotation finish" },
  { id: "rear-delt-flye", name: "Rear Delt Flye", muscleGroup: "shoulders", equipment: "dumbbell", notes: "Bent over" },

  // TRICEPS
  { id: "db-french-press", name: "DB French Press (Neutral)", muscleGroup: "triceps", equipment: "dumbbell", notes: "Neutral grip · full ROM" },
  { id: "tricep-pushdown", name: "Tricep Pushdown", muscleGroup: "triceps", equipment: "cable", notes: "Rope or bar" },
  { id: "overhead-tricep-ext", name: "Overhead Tricep Extension", muscleGroup: "triceps", equipment: "cable", notes: "Single arm or both" },
  { id: "close-grip-bench", name: "Close-Grip Bench Press", muscleGroup: "triceps", equipment: "barbell", notes: "" },

  // BACK
  { id: "lat-pulldown-prone", name: "Lat Pulldown (Pronated)", muscleGroup: "back", equipment: "cable", notes: "Overhand · full stretch" },
  { id: "pendlay-row", name: "Pendlay Row", muscleGroup: "back", equipment: "barbell", notes: "Dead-stop each rep" },
  { id: "1arm-db-row", name: "1-Arm Dumbbell Row", muscleGroup: "back", equipment: "dumbbell", notes: "Brace on bench" },
  { id: "low-pulley-row", name: "Low Pulley Row", muscleGroup: "back", equipment: "cable", notes: "Seated · neutral handle" },
  { id: "pullup", name: "Pull-Up", muscleGroup: "back", equipment: "bodyweight", notes: "Pronated" },
  { id: "chinup", name: "Chin-Up", muscleGroup: "back", equipment: "bodyweight", notes: "Supinated" },
  { id: "tbar-row", name: "T-Bar Row", muscleGroup: "back", equipment: "barbell", notes: "" },
  { id: "deadlift", name: "Conventional Deadlift", muscleGroup: "back", equipment: "barbell", notes: "Hip hinge · neutral spine" },

  // BICEPS / GRIP
  { id: "ez-curl", name: "EZ Bar Curl", muscleGroup: "biceps", equipment: "barbell", notes: "" },
  { id: "hammer-curl", name: "Hammer Curl", muscleGroup: "biceps", equipment: "dumbbell", notes: "Neutral grip" },
  { id: "farmers-walk", name: "Farmer's Walk", muscleGroup: "grip", equipment: "dumbbell", notes: "40m per set · per hand" },

  // QUADS / LEGS
  { id: "barbell-squat", name: "Barbell Squat", muscleGroup: "quads", equipment: "barbell", notes: "High bar · full depth" },
  { id: "bulgarian-split-squat", name: "Bulgarian Split Squat", muscleGroup: "quads", equipment: "dumbbell", notes: "Rear foot elevated" },
  { id: "db-step-ups", name: "Dumbbell Step-Ups", muscleGroup: "quads", equipment: "dumbbell", notes: "Each leg" },
  { id: "leg-press", name: "Leg Press", muscleGroup: "quads", equipment: "machine", notes: "" },
  { id: "leg-extension", name: "Leg Extension", muscleGroup: "quads", equipment: "machine", notes: "" },

  // HAMSTRINGS
  { id: "romanian-deadlift", name: "Romanian Deadlift", muscleGroup: "hamstrings", equipment: "barbell", notes: "Soft knees · hip hinge" },
  { id: "leg-curl", name: "Lying Leg Curl", muscleGroup: "hamstrings", equipment: "machine", notes: "" },
  { id: "nordic-curl", name: "Nordic Curl", muscleGroup: "hamstrings", equipment: "bodyweight", notes: "" },

  // POWER / PLYOMETRICS
  { id: "box-jumps", name: "Box Jumps", muscleGroup: "power", equipment: "bodyweight", notes: "Step down · full hip extension" },
  { id: "broad-jump", name: "Broad Jump", muscleGroup: "power", equipment: "bodyweight", notes: "" },

  // CALVES
  { id: "calf-raises", name: "Calf Raises", muscleGroup: "calves", equipment: "machine", notes: "Standing · full ROM" },
  { id: "seated-calf-raise", name: "Seated Calf Raise", muscleGroup: "calves", equipment: "machine", notes: "" },

  // CORE
  { id: "plank-shoulder-touch", name: "Plank Shoulder Touch", muscleGroup: "core", equipment: "bodyweight", notes: "Superset with Incline DB Press" },
  { id: "pallof-press", name: "Pallof Press", muscleGroup: "core", equipment: "cable", notes: "Anti-rotation · hold 1s" },
  { id: "ab-wheel", name: "Ab Wheel Rollout", muscleGroup: "core", equipment: "bodyweight", notes: "" },
  { id: "hanging-leg-raise", name: "Hanging Leg Raise", muscleGroup: "core", equipment: "bodyweight", notes: "" },

  // CARDIO
  { id: "zone2-cardio", name: "Zone 2 Cardio", muscleGroup: "cardio", equipment: "cardio", notes: "45 min · treadmill 8% OR slow bike", isCardio: true },
  { id: "hiit-bike", name: "HIIT Bike", muscleGroup: "cardio", equipment: "cardio", notes: "Intervals", isCardio: true },
];

// ─── Seed sessions for history demo ─────────────────────────────────────────
const daysAgo = (n: number) => new Date(Date.now() - n * 86400000).toISOString();

export const MOCK_SESSIONS: Session[] = [
  {
    id: "s-001",
    workoutId: "push",
    workoutName: "Push",
    workoutTag: "PUSH",
    programId: "jorge-ppl",
    date: daysAgo(6),
    week: 3,
    completed: true,
    durationSeconds: 3960,
    exercises: [
      { exerciseId: "incline-db-press", exerciseName: "Incline DB Press", sets: [
        { weight: 22, reps: 10, completed: true },
        { weight: 22, reps: 10, completed: true },
        { weight: 22, reps: 9, completed: true },
      ]},
      { exerciseId: "plank-shoulder-touch", exerciseName: "Plank Shoulder Touch", sets: [
        { weight: 0, reps: 20, completed: true },
        { weight: 0, reps: 18, completed: true },
        { weight: 0, reps: 16, completed: true },
      ]},
      { exerciseId: "db-military-press", exerciseName: "DB Military Press", sets: [
        { weight: 18, reps: 10, completed: true },
        { weight: 18, reps: 10, completed: true },
        { weight: 18, reps: 9, completed: true },
      ]},
      { exerciseId: "decline-pushup", exerciseName: "Decline Push-Up", sets: [
        { weight: 0, reps: 12, completed: true },
        { weight: 0, reps: 11, completed: true },
        { weight: 0, reps: 10, completed: true },
      ]},
      { exerciseId: "db-french-press", exerciseName: "DB French Press", sets: [
        { weight: 12, reps: 12, completed: true },
        { weight: 12, reps: 12, completed: true },
        { weight: 12, reps: 10, completed: true },
      ]},
      { exerciseId: "zone2-cardio", exerciseName: "Zone 2 Cardio", sets: [
        { weight: 0, reps: 45, completed: true },
      ]},
    ],
  },
  {
    id: "s-002",
    workoutId: "traction",
    workoutName: "Traction",
    workoutTag: "PULL",
    programId: "jorge-ppl",
    date: daysAgo(4),
    week: 3,
    completed: true,
    durationSeconds: 3300,
    exercises: [
      { exerciseId: "lat-pulldown-prone", exerciseName: "Lat Pulldown", sets: [
        { weight: 52.5, reps: 10, completed: true },
        { weight: 52.5, reps: 10, completed: true },
        { weight: 52.5, reps: 9, completed: true },
        { weight: 50, reps: 9, completed: true },
      ]},
      { exerciseId: "pendlay-row", exerciseName: "Pendlay Row", sets: [
        { weight: 67.5, reps: 8, completed: true },
        { weight: 67.5, reps: 8, completed: true },
        { weight: 67.5, reps: 7, completed: true },
        { weight: 65, reps: 7, completed: true },
      ]},
      { exerciseId: "face-pull-high", exerciseName: "Face Pull", sets: [
        { weight: 20, reps: 15, completed: true },
        { weight: 20, reps: 15, completed: true },
        { weight: 20, reps: 14, completed: true },
      ]},
      { exerciseId: "1arm-db-row", exerciseName: "1-Arm DB Row", sets: [
        { weight: 28, reps: 10, completed: true },
        { weight: 28, reps: 10, completed: true },
        { weight: 28, reps: 9, completed: true },
      ]},
      { exerciseId: "low-pulley-row", exerciseName: "Low Pulley Row", sets: [
        { weight: 45, reps: 11, completed: true },
        { weight: 45, reps: 11, completed: true },
        { weight: 45, reps: 10, completed: true },
      ]},
      { exerciseId: "farmers-walk", exerciseName: "Farmer's Walk", sets: [
        { weight: 22, reps: 1, completed: true },
        { weight: 22, reps: 1, completed: true },
        { weight: 22, reps: 1, completed: true },
      ]},
    ],
  },
  {
    id: "s-003",
    workoutId: "legs",
    workoutName: "Legs",
    workoutTag: "LEGS",
    programId: "jorge-ppl",
    date: daysAgo(2),
    week: 3,
    completed: true,
    durationSeconds: 4200,
    exercises: [
      { exerciseId: "barbell-squat", exerciseName: "Barbell Squat", sets: [
        { weight: 87.5, reps: 6, completed: true },
        { weight: 87.5, reps: 6, completed: true },
        { weight: 87.5, reps: 5, completed: true },
        { weight: 85, reps: 5, completed: true },
      ]},
      { exerciseId: "romanian-deadlift", exerciseName: "Romanian Deadlift", sets: [
        { weight: 77.5, reps: 10, completed: true },
        { weight: 77.5, reps: 10, completed: true },
        { weight: 77.5, reps: 9, completed: true },
      ]},
      { exerciseId: "bulgarian-split-squat", exerciseName: "Bulgarian Split Squat", sets: [
        { weight: 18, reps: 8, completed: true },
        { weight: 18, reps: 8, completed: true },
        { weight: 18, reps: 7, completed: true },
      ]},
      { exerciseId: "db-step-ups", exerciseName: "DB Step-Ups", sets: [
        { weight: 14, reps: 10, completed: true },
        { weight: 14, reps: 10, completed: true },
        { weight: 14, reps: 9, completed: true },
      ]},
      { exerciseId: "box-jumps", exerciseName: "Box Jumps", sets: [
        { weight: 0, reps: 6, completed: true },
        { weight: 0, reps: 6, completed: true },
        { weight: 0, reps: 5, completed: true },
      ]},
      { exerciseId: "calf-raises", exerciseName: "Calf Raises", sets: [
        { weight: 60, reps: 15, completed: true },
        { weight: 60, reps: 15, completed: true },
        { weight: 60, reps: 14, completed: true },
        { weight: 60, reps: 13, completed: true },
      ]},
      { exerciseId: "pallof-press", exerciseName: "Pallof Press", sets: [
        { weight: 15, reps: 12, completed: true },
        { weight: 15, reps: 12, completed: true },
        { weight: 15, reps: 11, completed: true },
      ]},
    ],
  },
];
