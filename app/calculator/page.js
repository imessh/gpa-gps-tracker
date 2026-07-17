"use client";

import { useCallback, useEffect, useState } from "react";
import { collection, query, orderBy, limit, getDocs, where } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { db, auth } from "@/firebase/config";
import GPAForm from "@/components/GPAForm";

export default function CalculatorPage() {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);

  const loadHistory = useCallback(async () => {
    if (!auth.currentUser) { setHistory([]); setLoading(false); return; }
    setLoading(true); setLoadError(false);
    try{
      const q = query(collection(db, "gpaRecords"), where("userId","==", auth.currentUser.uid), orderBy("createdAt","desc"), limit(10));
      const snap = await getDocs(q);
      setHistory(snap.docs.map(doc => ({ id:doc.id, ...doc.data() })));
    }catch(err){ console.log('History loading error',err); setLoadError(true);} finally{ setLoading(false); }
  }, []);

  useEffect(()=>{
    const unsub = onAuthStateChanged(auth, (user)=>{ if (user) loadHistory(); else { setHistory([]); setLoading(false); } });
    return () => unsub();
  },[loadHistory]);

  return (
    <div className="container py-14">
      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <div className="card">
            <div className="kicker">Calculator</div>
            <h1 className="h2 mt-2">GPA Calculator</h1>
            <p className="small mt-2">Weighted by credit, on a standard 4.0 scale. Add modules and save results to your history.</p>

            <div className="mt-6">
              <GPAForm onSaved={loadHistory} />
            </div>
          </div>
        </div>

        <aside>
          <div className="card">
            <h3 className="font-semibold">Saved history</h3>
            <div className="mt-4">
              {loading && <div className="small">Loading history…</div>}
              {!loading && loadError && <div className="small">Couldn\'t load history. Check Firestore.</div>}
              {!loading && !loadError && history.length === 0 && <div className="small">No saved calculations yet.</div>}
              {!loading && history.length > 0 && (
                <div className="space-y-3">
                  {history.map(record => (
                    <div key={record.id} className="p-3 border rounded">
                      <div className="flex items-center justify-between">
                        <div className="small">{record.modules?.length ?? 0} modules · {record.totalCredits} credits</div>
                        <div style={{color:'var(--accent)'}} className="font-semibold">{record.gpa?.toFixed(2)}</div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
