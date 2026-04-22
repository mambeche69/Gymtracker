import { Suspense } from "react";
import WorkoutPage from "./page";

export default function WorkoutLayout() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-gym-bg">
          <div className="flex flex-col items-center gap-3">
            <div className="w-8 h-8 border-2 border-gym-accent border-t-transparent rounded-full animate-spin" />
            <p className="font-body text-gym-sub text-sm">Loading workout…</p>
          </div>
        </div>
      }
    >
      <WorkoutPage />
    </Suspense>
  );
}
