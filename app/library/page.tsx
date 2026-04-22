"use client";

import { useRouter } from "next/navigation";
import { useState, useMemo } from "react";
import { EXERCISE_LIBRARY } from "@/lib/mockData";
import { ExerciseLibraryItem, MuscleGroup } from "@/lib/types";

// ─── Muscle group colors ──────────────────────────────────────────────────────
const groupColor: Record<string, string> = {
  chest:      "text-rose-400 bg-rose-400/10 border-rose-400/25",
  shoulders:  "text-amber-400 bg-amber-400/10 border-amber-400/25",
  triceps:    "text-orange-400 bg-orange-400/10 border-orange-400/25",
  back:       "text-blue-400 bg-blue-400/10 border-blue-400/25",
  biceps:     "text-cyan-400 bg-cyan-400/10 border-cyan-400/25",
  grip:       "text-teal-400 bg-teal-400/10 border-teal-400/25",
  quads:      "text-gym-accent bg-gym-accent/10 border-gym-accent/25",
  hamstrings: "text-lime-400 bg-lime-400/10 border-lime-400/25",
  calves:     "text-green-400 bg-green-400/10 border-green-400/25",
  glutes:     "text-emerald-400 bg-emerald-400/10 border-emerald-400/25",
  core:       "text-purple-400 bg-purple-400/10 border-purple-400/25",
  power:      "text-pink-400 bg-pink-400/10 border-pink-400/25",
  cardio:     "text-indigo-400 bg-indigo-400/10 border-indigo-400/25",
};

const equipmentIcon: Record<string, string> = {
  barbell: "🏋️", dumbbell: "💪", cable: "⚡", machine: "🔧",
  bodyweight: "🤸", cardio: "🏃", other: "•",
};

const GROUPS: MuscleGroup[] = [
  "chest","shoulders","triceps","back","biceps","grip",
  "quads","hamstrings","calves","core","power","cardio",
];

// ─── Exercise detail modal ────────────────────────────────────────────────────
function ExerciseModal({
  ex,
  onClose,
  onSave,
}: {
  ex: ExerciseLibraryItem;
  onClose: () => void;
  onSave: (updated: ExerciseLibraryItem) => void;
}) {
  const [form, setForm] = useState({ ...ex });

  return (
    <div className="fixed inset-0 z-50 flex items-end" onClick={onClose}>
      <div
        className="w-full max-w-md mx-auto bg-gym-surface border border-gym-border rounded-t-3xl p-5 pb-8 animate-slide-up"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="w-10 h-1 bg-gym-border rounded-full mx-auto mb-5" />
        <p className="font-body text-[10px] text-gym-sub uppercase tracking-widest mb-1">Exercise Details</p>
        <h3 className="font-display font-semibold text-3xl text-gym-text uppercase tracking-tight mb-5">{form.name}</h3>

        {/* Name */}
        <label className="block mb-3">
          <span className="font-body text-[10px] text-gym-sub uppercase tracking-widest block mb-1">Name</span>
          <input
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="w-full bg-gym-bg border border-gym-border rounded-xl px-3 py-2.5 text-gym-text font-body text-sm focus:outline-none focus:border-gym-accent"
          />
        </label>

        {/* Muscle group */}
        <label className="block mb-3">
          <span className="font-body text-[10px] text-gym-sub uppercase tracking-widest block mb-1">Muscle Group</span>
          <select
            value={form.muscleGroup}
            onChange={(e) => setForm({ ...form, muscleGroup: e.target.value as MuscleGroup })}
            className="w-full bg-gym-bg border border-gym-border rounded-xl px-3 py-2.5 text-gym-text font-body text-sm focus:outline-none focus:border-gym-accent"
          >
            {GROUPS.map((g) => (
              <option key={g} value={g}>{g.charAt(0).toUpperCase() + g.slice(1)}</option>
            ))}
          </select>
        </label>

        {/* Notes */}
        <label className="block mb-5">
          <span className="font-body text-[10px] text-gym-sub uppercase tracking-widest block mb-1">Notes / Cues</span>
          <textarea
            value={form.notes ?? ""}
            onChange={(e) => setForm({ ...form, notes: e.target.value })}
            rows={2}
            className="w-full bg-gym-bg border border-gym-border rounded-xl px-3 py-2.5 text-gym-text font-body text-sm focus:outline-none focus:border-gym-accent resize-none"
            placeholder="Coaching cues, grip, tempo…"
          />
        </label>

        {/* Actions */}
        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 py-3.5 rounded-xl border border-gym-border text-gym-sub font-display font-semibold text-sm uppercase tracking-wide active:scale-95 transition-all"
          >
            Cancel
          </button>
          <button
            onClick={() => { onSave(form); onClose(); }}
            className="flex-1 py-3.5 rounded-xl bg-gym-accent text-gym-bg font-display font-semibold text-sm uppercase tracking-wide active:scale-95 transition-all"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Library page ─────────────────────────────────────────────────────────────
export default function LibraryPage() {
  const router = useRouter();
  const [library, setLibrary] = useState<ExerciseLibraryItem[]>(EXERCISE_LIBRARY);
  const [search, setSearch] = useState("");
  const [activeGroup, setActiveGroup] = useState<string>("all");
  const [selected, setSelected] = useState<ExerciseLibraryItem | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newEx, setNewEx] = useState<Partial<ExerciseLibraryItem>>({
    muscleGroup: "chest", equipment: "barbell",
  });

  // Filter exercises
  const filtered = useMemo(() => {
    return library.filter((ex) => {
      const matchGroup = activeGroup === "all" || ex.muscleGroup === activeGroup;
      const matchSearch = ex.name.toLowerCase().includes(search.toLowerCase());
      return matchGroup && matchSearch;
    });
  }, [library, search, activeGroup]);

  // Group by muscle group for display
  const grouped = useMemo(() => {
    const map: Record<string, ExerciseLibraryItem[]> = {};
    filtered.forEach((ex) => {
      if (!map[ex.muscleGroup]) map[ex.muscleGroup] = [];
      map[ex.muscleGroup].push(ex);
    });
    return map;
  }, [filtered]);

  const handleSave = (updated: ExerciseLibraryItem) => {
    setLibrary((prev) => prev.map((e) => (e.id === updated.id ? updated : e)));
  };

  const handleAdd = () => {
    if (!newEx.name?.trim()) return;
    const item: ExerciseLibraryItem = {
      id: `custom-${Date.now()}`,
      name: newEx.name.trim(),
      muscleGroup: (newEx.muscleGroup as MuscleGroup) ?? "chest",
      equipment: (newEx.equipment as any) ?? "dumbbell",
      notes: newEx.notes ?? "",
    };
    setLibrary((prev) => [...prev, item]);
    setShowAddModal(false);
    setNewEx({ muscleGroup: "chest", equipment: "barbell" });
  };

  return (
    <main className="px-4 pt-safe pb-safe min-h-screen flex flex-col">
      {/* Header */}
      <header className="pt-4 pb-4 flex items-center justify-between">
        <div>
          <h1 className="font-display font-semibold text-5xl text-gym-text uppercase tracking-tight leading-none">
            Lib<span className="text-gym-accent">.</span>
          </h1>
          <p className="font-body text-xs text-gym-sub mt-1">{library.length} exercises</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="px-4 py-2.5 rounded-xl bg-gym-accent text-gym-bg font-display font-semibold text-sm uppercase tracking-widest active:scale-95 transition-all"
        >
          + Add
        </button>
      </header>

      {/* Nav */}
      <nav className="flex gap-2 mb-4">
        {[
          { label: "Today", href: "/" },
          { label: "History", href: "/history" },
          { label: "Library", href: "/library" },
        ].map(({ label, href }) => (
          <button
            key={label}
            onClick={() => router.push(href)}
            className={`
              flex-1 py-2.5 rounded-xl font-display font-semibold text-sm uppercase tracking-wide
              border transition-all active:scale-95
              ${href === "/library"
                ? "bg-gym-accent text-gym-bg border-transparent"
                : "bg-gym-surface border-gym-border text-gym-sub"}
            `}
          >
            {label}
          </button>
        ))}
      </nav>

      {/* Search */}
      <div className="relative mb-4">
        <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gym-sub text-sm">🔍</span>
        <input
          type="text"
          placeholder="Search exercises…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full bg-gym-surface border border-gym-border rounded-xl pl-9 pr-4 py-3 text-gym-text font-body text-sm placeholder-gym-muted focus:outline-none focus:border-gym-accent transition-colors"
        />
      </div>

      {/* Group filter scroll */}
      <div className="flex gap-2 overflow-x-auto pb-2 mb-4 scrollbar-none">
        {["all", ...GROUPS].map((g) => (
          <button
            key={g}
            onClick={() => setActiveGroup(g)}
            className={`
              shrink-0 px-3 py-1.5 rounded-xl font-body text-xs font-medium capitalize
              border transition-all active:scale-95 whitespace-nowrap
              ${activeGroup === g
                ? "bg-gym-accent/20 border-gym-accent/50 text-gym-accent"
                : "bg-gym-surface border-gym-border text-gym-sub"}
            `}
          >
            {g === "all" ? "All" : g}
          </button>
        ))}
      </div>

      {/* Exercise list grouped */}
      <div className="flex flex-col gap-5 flex-1 overflow-y-auto">
        {Object.keys(grouped).length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center py-16 text-center gap-2">
            <p className="text-3xl">🔍</p>
            <p className="font-display text-xl text-gym-sub uppercase">No results</p>
          </div>
        ) : (
          Object.entries(grouped).map(([group, exs]) => (
            <div key={group}>
              {/* Group label */}
              <div className="flex items-center gap-2 mb-2">
                <span className={`font-body text-[10px] uppercase tracking-widest font-semibold px-2 py-0.5 rounded border ${groupColor[group] ?? "text-gym-sub bg-gym-border/30 border-gym-border"}`}>
                  {group}
                </span>
                <div className="flex-1 h-px bg-gym-border" />
                <span className="font-mono text-[10px] text-gym-muted">{exs.length}</span>
              </div>

              {/* Exercises in group */}
              <div className="flex flex-col gap-2">
                {exs.map((ex) => (
                  <button
                    key={ex.id}
                    onClick={() => setSelected(ex)}
                    className="w-full text-left bg-gym-surface border border-gym-border rounded-xl px-4 py-3 flex items-center justify-between gap-3 active:bg-gym-border/20 transition-colors"
                  >
                    <div className="flex-1 min-w-0">
                      <p className="font-body text-sm font-medium text-gym-text truncate">{ex.name}</p>
                      {ex.notes && (
                        <p className="font-body text-[11px] text-gym-sub truncate mt-0.5">{ex.notes}</p>
                      )}
                    </div>
                    <span className="text-lg shrink-0">{equipmentIcon[ex.equipment] ?? "•"}</span>
                  </button>
                ))}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Edit modal */}
      {selected && (
        <ExerciseModal
          ex={selected}
          onClose={() => setSelected(null)}
          onSave={handleSave}
        />
      )}

      {/* Add exercise modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-end" onClick={() => setShowAddModal(false)}>
          <div
            className="w-full max-w-md mx-auto bg-gym-surface border border-gym-border rounded-t-3xl p-5 pb-8 animate-slide-up"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-10 h-1 bg-gym-border rounded-full mx-auto mb-5" />
            <p className="font-display font-semibold text-2xl text-gym-text uppercase tracking-tight mb-5">
              New Exercise
            </p>

            <label className="block mb-3">
              <span className="font-body text-[10px] text-gym-sub uppercase tracking-widest block mb-1">Name *</span>
              <input
                autoFocus
                value={newEx.name ?? ""}
                onChange={(e) => setNewEx({ ...newEx, name: e.target.value })}
                placeholder="Exercise name"
                className="w-full bg-gym-bg border border-gym-border rounded-xl px-3 py-2.5 text-gym-text font-body text-sm focus:outline-none focus:border-gym-accent"
              />
            </label>

            <div className="grid grid-cols-2 gap-3 mb-3">
              <label className="block">
                <span className="font-body text-[10px] text-gym-sub uppercase tracking-widest block mb-1">Muscle Group</span>
                <select
                  value={newEx.muscleGroup}
                  onChange={(e) => setNewEx({ ...newEx, muscleGroup: e.target.value as MuscleGroup })}
                  className="w-full bg-gym-bg border border-gym-border rounded-xl px-3 py-2.5 text-gym-text font-body text-sm focus:outline-none focus:border-gym-accent"
                >
                  {GROUPS.map((g) => <option key={g} value={g}>{g}</option>)}
                </select>
              </label>
              <label className="block">
                <span className="font-body text-[10px] text-gym-sub uppercase tracking-widest block mb-1">Equipment</span>
                <select
                  value={newEx.equipment}
                  onChange={(e) => setNewEx({ ...newEx, equipment: e.target.value as any })}
                  className="w-full bg-gym-bg border border-gym-border rounded-xl px-3 py-2.5 text-gym-text font-body text-sm focus:outline-none focus:border-gym-accent"
                >
                  {["barbell","dumbbell","cable","machine","bodyweight","cardio","other"].map((e) => (
                    <option key={e} value={e}>{e}</option>
                  ))}
                </select>
              </label>
            </div>

            <label className="block mb-5">
              <span className="font-body text-[10px] text-gym-sub uppercase tracking-widest block mb-1">Notes</span>
              <input
                value={newEx.notes ?? ""}
                onChange={(e) => setNewEx({ ...newEx, notes: e.target.value })}
                placeholder="Grip, cues, tempo…"
                className="w-full bg-gym-bg border border-gym-border rounded-xl px-3 py-2.5 text-gym-text font-body text-sm focus:outline-none focus:border-gym-accent"
              />
            </label>

            <div className="flex gap-3">
              <button
                onClick={() => setShowAddModal(false)}
                className="flex-1 py-3.5 rounded-xl border border-gym-border text-gym-sub font-display font-semibold text-sm uppercase tracking-wide active:scale-95 transition-all"
              >
                Cancel
              </button>
              <button
                onClick={handleAdd}
                disabled={!newEx.name?.trim()}
                className="flex-1 py-3.5 rounded-xl bg-gym-accent text-gym-bg font-display font-semibold text-sm uppercase tracking-wide active:scale-95 transition-all disabled:opacity-40"
              >
                Add
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
