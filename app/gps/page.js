"use client";

import { useCallback, useEffect, useState } from "react";
import {
  collection,
  query,
  orderBy,
  limit,
  getDocs,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "@/firebase/config";

export default function GpsInterestPage() {
  const [interest, setInterest] = useState("");
  const [location, setLocation] = useState("");
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState(null);

  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);

  const loadEntries = useCallback(async () => {
    setLoading(true);
    setLoadError(false);
    try {
      const q = query(
        collection(db, "gpsInterests"),
        orderBy("createdAt", "desc"),
        limit(20)
      );
      const snap = await getDocs(q);
      setEntries(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
    } catch (err) {
      setLoadError(true);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadEntries();
  }, [loadEntries]);

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus(null);

    if (!interest.trim()) {
      setStatus({ type: "error", message: "Describe your interest before submitting." });
      return;
    }

    setSaving(true);
    try {
      await addDoc(collection(db, "gpsInterests"), {
        interest: interest.trim(),
        location: location.trim() || null,
        createdAt: serverTimestamp(),
      });
      setInterest("");
      setLocation("");
      setStatus({ type: "success", message: "Recorded — thanks for logging it." });
      loadEntries();
    } catch (err) {
      setStatus({
        type: "error",
        message: "Couldn't save right now — check your Firebase setup and try again.",
      });
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="max-w-3xl mx-auto px-6 py-14">
      <p className="font-mono text-xs uppercase tracking-[0.25em] text-gold mb-2">
        02 — Explore
      </p>
      <h1 className="font-display text-3xl md:text-4xl font-semibold text-ink mb-2">
        GPS Interest Tracker
      </h1>
      <p className="text-ink-soft text-sm mb-8 max-w-xl">
        Note a GPS or IoT project idea, or a location you'd like to work
        with. Each entry is stored so you can look back at it later.
      </p>

      <form onSubmit={handleSubmit} className="transcript-card rounded-sm p-6">
        <label className="block mb-4">
          <span className="font-mono text-[11px] uppercase tracking-wider text-ink-soft">
            Interest
          </span>
          <textarea
            value={interest}
            onChange={(e) => setInterest(e.target.value)}
            rows={3}
            placeholder="e.g. Interested in GPS/IoT campus navigation projects"
            className="mt-1 w-full bg-transparent border border-rule focus:border-gold outline-none text-sm text-ink placeholder:text-ink-soft/50 rounded-sm p-2 resize-none"
          />
        </label>

        <label className="block mb-5">
          <span className="font-mono text-[11px] uppercase tracking-wider text-ink-soft">
            Location (optional)
          </span>
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="e.g. Colombo, Sri Lanka"
            className="mt-1 w-full bg-transparent border border-rule focus:border-gold outline-none text-sm text-ink placeholder:text-ink-soft/50 rounded-sm p-2"
          />
        </label>

        <button
          type="submit"
          disabled={saving}
          className="px-5 py-2.5 bg-ink text-paper font-body text-sm rounded-sm hover:bg-ink-soft transition-colors disabled:opacity-50"
        >
          {saving ? "Submitting…" : "Submit interest"}
        </button>

        {status && (
          <p
            className={`mt-3 text-sm font-body ${
              status.type === "success" ? "text-good" : "text-alert"
            }`}
          >
            {status.message}
          </p>
        )}
      </form>

      <section className="mt-14">
        <h2 className="font-display text-xl font-semibold text-ink mb-4">
          Past submissions
        </h2>

        {loading && (
          <p className="text-sm text-ink-soft font-mono">Loading entries…</p>
        )}

        {!loading && loadError && (
          <p className="text-sm text-alert font-mono">
            Couldn't load entries. Confirm Firestore is set up and your
            .env.local Firebase keys are filled in.
          </p>
        )}

        {!loading && !loadError && entries.length === 0 && (
          <p className="text-sm text-ink-soft">
            Nothing logged yet — submit one above and it'll show up here.
          </p>
        )}

        {!loading && !loadError && entries.length > 0 && (
          <div className="transcript-card rounded-sm divide-y divide-rule/60">
            {entries.map((entry) => (
              <div key={entry.id} className="p-4">
                <p className="text-sm text-ink font-body">{entry.interest}</p>
                {entry.location && (
                  <p className="text-xs text-gold font-mono mt-1">
                    {entry.location}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
