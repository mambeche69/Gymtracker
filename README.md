# 💪 GymTracker

A minimal, mobile-first workout tracker built for **speed in the gym**.  
No fluff. Just reps, weight, and progression.

---

## Stack

| Layer       | Tech                        |
|-------------|-----------------------------|
| Framework   | Next.js 14 (App Router)     |
| Styling     | Tailwind CSS                |
| Database    | Firebase Firestore (optional) |
| PWA         | next-pwa + manifest.json    |
| Language    | TypeScript                  |

---

## Design Philosophy

- **One exercise at a time** — no cognitive overhead
- **Big tap targets** — usable with sweaty hands
- **Almost no typing** — quick-adjust buttons for weight/reps
- **Instant feedback** — set progress, rest timer, progression hints

---

## Quick Start

### 1. Clone and install

```bash
git clone <your-repo>
cd gymtracker
npm install
```

### 2. Configure Firebase (optional)

Without Firebase, the app runs on local state with mock data — fully functional for development and personal use.

To enable Firestore persistence:

```bash
cp .env.example .env.local
```

Fill in `.env.local` with your Firebase project credentials:
- Go to [Firebase Console](https://console.firebase.google.com)
- Create a project → Add Web App → copy SDK config

```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789
NEXT_PUBLIC_FIREBASE_APP_ID=1:123:web:abc
```

### 3. Add PWA icons

Generate PNG icons from the SVG at `public/icons/icon.svg`:

```bash
# Option A: Use an online converter
# → https://svgtopng.com
# Export: 192×192 → public/icons/icon-192.png
# Export: 512×512 → public/icons/icon-512.png

# Option B: Run the helper script
node scripts/generate-icons.js
# Then convert the output SVG online
```

### 4. Run locally

```bash
npm run dev
# → http://localhost:3000
```

### 5. Test PWA on iPhone

```bash
npm run build
npm start
```

Then open in Safari on your iPhone and tap **Share → Add to Home Screen**.

---

## Project Structure

```
gymtracker/
├── app/
│   ├── layout.tsx          # Root layout, fonts, PWA meta
│   ├── globals.css         # Tailwind base + custom utilities
│   ├── page.tsx            # Home screen (today's workout)
│   └── workout/
│       ├── layout.tsx      # Suspense wrapper
│       └── page.tsx        # Active workout screen
│
├── components/
│   ├── ExerciseCard.tsx    # Main exercise display + set controls
│   ├── SetRow.tsx          # Individual set row (weight, reps, done)
│   ├── Timer.tsx           # Rest countdown timer
│   └── WorkoutSummaryCard.tsx  # Home screen workout preview
│
├── lib/
│   ├── types.ts            # All TypeScript interfaces
│   ├── firebase.ts         # Firebase init + path helpers
│   ├── mockData.ts         # Push/Pull/Legs mock program
│   ├── progression.ts      # Next-weight logic + formatters
│   └── useWorkoutSession.ts # React hook for live set state
│
├── public/
│   ├── manifest.json       # PWA manifest
│   └── icons/
│       ├── icon.svg        # Source icon (barbell)
│       ├── icon-192.png    # PWA icon (generate this)
│       └── icon-512.png    # PWA icon (generate this)
│
├── scripts/
│   └── generate-icons.js   # Icon generation helper
│
├── .env.example            # Firebase config template
├── next.config.js          # Next.js + PWA config
├── tailwind.config.js      # Theme: dark + electric lime
└── tsconfig.json
```

---

## Firestore Data Structure

```
users/
  {userId}/
    programs/
      {programId}         ← Program metadata + week number
    workouts/
      {workoutId}         ← Workout definition + exercises
    sessions/
      {sessionId}         ← Completed session with all sets
```

---

## Progression Logic

```
Last session: 77.5kg × 8 reps (target: 8)
All sets completed target reps?
  YES → Suggest 77.5 + 2.5 = 80kg next session
  NO  → Hold at 77.5kg
```

Simple linear progression. Extend `lib/progression.ts` for RPE-based or wave loading schemes.

---

## Roadmap

- [ ] Firebase Auth (Google Sign-In)
- [ ] Save sessions to Firestore
- [ ] Historical session browser
- [ ] Multiple programs
- [ ] Plate calculator
- [ ] Export to CSV

---

## Color Theme

| Token            | Value     | Use                   |
|------------------|-----------|-----------------------|
| `gym-bg`         | `#0C0C0C` | App background        |
| `gym-surface`    | `#161616` | Cards, inputs         |
| `gym-accent`     | `#C8FF00` | CTAs, active state    |
| `gym-success`    | `#00E87A` | Completed sets        |
| `gym-warn`       | `#FFB800` | Warnings, deload      |
| `gym-danger`     | `#FF4444` | Remove, reduce        |

---

Built for real gym use. Keep it fast, keep it simple.
# Gymtracker
