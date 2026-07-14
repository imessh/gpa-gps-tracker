# Transcript Ledger — GPA Calculator + GPS Interest Tracker

Next.js (App Router) + Tailwind CSS frontend, Firebase (Firestore) backend.
Built as a static site so it deploys straight to Firebase Hosting — free tier,
no server to manage.

```
gpa-gps-tracker
│
├── app
│   ├── page.js              (home)
│   ├── calculator/page.js   (GPA calculator)
│   └── gps/page.js          (GPS interest tracker)
│
├── components
│   ├── GPAForm.jsx
│   └── Navbar.jsx
│
├── firebase
│   └── config.js
│
├── firestore.rules
├── firebase.json
└── package.json
```

## How the GPA is calculated

Standard weighted 4.0-scale method (the default most universities use):

```
GPA = Σ(grade points × credits) / Σ(credits)
```

Grade → point mapping lives in `components/GPAForm.jsx` (`GRADE_POINTS`) —
edit it there if your institution uses a different scale.

---

## Step 1 — Firebase project (you've likely already done this)

1. Go to the [Firebase Console](https://console.firebase.google.com/)
2. **Create a project** → name it `gpa-gps-tracker` → disable Google
   Analytics → **Create project**
3. Inside the project: **Build → Firestore Database → Create database**
   → start in **test mode** (or use `firestore.rules` from this repo)
4. **Build → Firestore Database** will create two collections
   automatically the first time you save data from the app:
   `gpaRecords` and `gpsInterests` — you don't need to create them by hand.
5. Register a web app: Project settings (gear icon) → **Your apps** →
   **Web** (`</>`) → give it a nickname → copy the `firebaseConfig` values,
   you'll need them in Step 3.

## Step 2 — Install tools & dependencies

```bash
node -v
npm -v
```

From inside this folder:

```bash
npm install
```

## Step 3 — Connect Firebase

```bash
cp .env.local.example .env.local
```

Open `.env.local` and paste in the values from your Firebase web app config:

```
NEXT_PUBLIC_FIREBASE_API_KEY=...
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=...
NEXT_PUBLIC_FIREBASE_PROJECT_ID=...
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=...
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=...
NEXT_PUBLIC_FIREBASE_APP_ID=...
```

`firebase/config.js` reads these automatically — nothing else to wire up.

## Step 4 — Run it locally

```bash
npm run dev
```

Visit `http://localhost:3000`. Add a couple of modules on the Calculator
page, hit **Save to history**, and confirm the entry shows up both on the
page and in the Firebase Console under **Firestore Database → gpaRecords**.

## Step 5 — Build the production version

```bash
npm run build
```

This produces a static export in the `out/` folder (configured via
`output: "export"` in `next.config.mjs`), which is what Firebase Hosting
serves.

## Step 6 — Deploy to Firebase Hosting

```bash
npm install -g firebase-tools   # one-time
firebase login
firebase init hosting           # choose the existing project, public dir = out
firebase deploy
```

(This repo already includes a `firebase.json` pointing at `out`, so
`firebase init hosting` will mostly just confirm your project selection.)

## Step 7 — Get your live URL

The CLI prints a **Hosting URL** at the end of `firebase deploy`, e.g.
`https://gpa-gps-tracker.web.app` — that's your live site.

---

## Optional — Firebase Authentication

`firebase/config.js` already exports `auth`, unused for now. To restrict
who can write data:

1. Firebase Console → **Build → Authentication → Get started** → enable a
   sign-in method (e.g. Email/Password or Google).
2. Wrap the app with a sign-in check and pass the user's UID into your
   Firestore writes.
3. Update `firestore.rules` to require `request.auth != null` on `create`.

## Notes

- Tailwind theme (`tailwind.config.js`) uses a small "transcript ledger"
  token set — paper, ink, gold, rule — instead of default Tailwind colors;
  adjust there if you want a different look.
- `firestore.rules` ships open (anyone can create/read, nobody can
  update/delete) so the demo works with zero auth setup. Tighten before
  using this for anything beyond a class project.
