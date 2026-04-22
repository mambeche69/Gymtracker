"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { formatDuration } from "@/lib/progression";

interface TimerProps {
  defaultSeconds?: number;
}

export default function Timer({ defaultSeconds = 90 }: TimerProps) {
  const [timeLeft, setTimeLeft] = useState(defaultSeconds);
  const [running, setRunning] = useState(false);
  const [finished, setFinished] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // ─── Tick ────────────────────────────────────────────────────────────────
  useEffect(() => {
    if (running && timeLeft > 0) {
      intervalRef.current = setInterval(() => {
        setTimeLeft((t) => {
          if (t <= 1) {
            setRunning(false);
            setFinished(true);
            return 0;
          }
          return t - 1;
        });
      }, 1000);
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [running, timeLeft]);

  // ─── Vibrate on finish (mobile) ──────────────────────────────────────────
  useEffect(() => {
    if (finished && navigator.vibrate) {
      navigator.vibrate([200, 100, 200]);
    }
  }, [finished]);

  const toggle = useCallback(() => {
    if (finished) {
      // Reset
      setTimeLeft(defaultSeconds);
      setFinished(false);
      setRunning(true);
    } else {
      setRunning((r) => !r);
    }
  }, [finished, defaultSeconds]);

  const reset = useCallback(() => {
    setRunning(false);
    setFinished(false);
    setTimeLeft(defaultSeconds);
  }, [defaultSeconds]);

  // Quick-set presets
  const presets = [60, 90, 120, 180];

  const progress = timeLeft / defaultSeconds;
  const circumference = 2 * Math.PI * 28; // r=28

  return (
    <div className="bg-gym-surface border border-gym-border rounded-2xl p-4">
      <p className="text-[10px] text-gym-sub uppercase tracking-widest mb-3">
        Rest Timer
      </p>

      <div className="flex items-center gap-4">
        {/* Circular progress ring */}
        <div className="relative w-20 h-20 shrink-0">
          <svg className="w-20 h-20 -rotate-90" viewBox="0 0 64 64">
            {/* Track */}
            <circle
              cx="32" cy="32" r="28"
              fill="none"
              stroke="#2A2A2A"
              strokeWidth="4"
            />
            {/* Progress */}
            <circle
              cx="32" cy="32" r="28"
              fill="none"
              stroke={finished ? "#00E87A" : running ? "#C8FF00" : "#3D3D3D"}
              strokeWidth="4"
              strokeDasharray={circumference}
              strokeDashoffset={circumference * (1 - progress)}
              strokeLinecap="round"
              className="transition-all duration-1000 ease-linear"
            />
          </svg>
          {/* Time display */}
          <div className="absolute inset-0 flex items-center justify-center">
            <span
              className={`font-mono font-bold text-sm ${
                finished
                  ? "text-gym-success"
                  : running
                  ? "text-gym-accent"
                  : "text-gym-text"
              }`}
            >
              {formatDuration(timeLeft)}
            </span>
          </div>
        </div>

        {/* Controls */}
        <div className="flex-1 flex flex-col gap-2">
          {/* Start / Pause / Reset */}
          <div className="flex gap-2">
            <button
              onClick={toggle}
              className={`
                flex-1 py-2.5 rounded-xl font-display font-semibold text-sm uppercase tracking-wide
                transition-all active:scale-95
                ${finished
                  ? "bg-gym-success text-gym-bg"
                  : running
                  ? "bg-gym-warn/20 text-gym-warn border border-gym-warn/40"
                  : "bg-gym-accent text-gym-bg"
                }
              `}
            >
              {finished ? "Done! Restart" : running ? "Pause" : "Start"}
            </button>
            <button
              onClick={reset}
              className="px-4 py-2.5 rounded-xl bg-gym-bg border border-gym-border text-gym-sub text-sm active:scale-95"
            >
              ↺
            </button>
          </div>

          {/* Presets */}
          <div className="flex gap-1.5">
            {presets.map((sec) => (
              <button
                key={sec}
                onClick={() => {
                  setTimeLeft(sec);
                  setFinished(false);
                  setRunning(false);
                }}
                className={`
                  flex-1 py-1.5 rounded-lg text-xs font-mono border transition-colors active:scale-95
                  ${timeLeft === sec && !running && !finished
                    ? "bg-gym-accent/20 border-gym-accent/50 text-gym-accent"
                    : "bg-gym-bg border-gym-border text-gym-sub"
                  }
                `}
              >
                {sec < 60 ? `${sec}s` : `${sec / 60}m`}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
