"use client";

import { Session } from "./types";
import { MOCK_SESSIONS } from "./mockData";

const STORAGE_KEY = "gymtracker_sessions";

// ─── Load all sessions (localStorage → seed with mock data on first run) ─────
export function loadSessions(): Session[] {
  if (typeof window === "undefined") return MOCK_SESSIONS;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      // First run: seed with mock sessions so history isn't empty
      saveSessions(MOCK_SESSIONS);
      return MOCK_SESSIONS;
    }
    return JSON.parse(raw) as Session[];
  } catch {
    return MOCK_SESSIONS;
  }
}

// ─── Save sessions array ─────────────────────────────────────────────────────
export function saveSessions(sessions: Session[]): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(sessions));
  } catch (e) {
    console.warn("Failed to save sessions", e);
  }
}

// ─── Append a new completed session ─────────────────────────────────────────
export function appendSession(session: Session): void {
  const all = loadSessions();
  // Replace if same id (re-save), otherwise prepend
  const idx = all.findIndex((s) => s.id === session.id);
  if (idx >= 0) {
    all[idx] = session;
  } else {
    all.unshift(session);
  }
  saveSessions(all);
}

// ─── Get sessions for a specific workout ────────────────────────────────────
export function getSessionsByWorkout(workoutId: string): Session[] {
  return loadSessions()
    .filter((s) => s.workoutId === workoutId)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

// ─── Format date for display ─────────────────────────────────────────────────
export function formatSessionDate(isoDate: string): string {
  const d = new Date(isoDate);
  const now = new Date();
  const diff = Math.floor((now.getTime() - d.getTime()) / 86400000);
  if (diff === 0) return "Today";
  if (diff === 1) return "Yesterday";
  if (diff < 7) return `${diff} days ago`;
  return d.toLocaleDateString("en-CA", { month: "short", day: "numeric" });
}

// ─── Generate a unique session ID ────────────────────────────────────────────
export function newSessionId(): string {
  return `s-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`;
}
