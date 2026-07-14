"use client";

import { useMemo, useState } from "react";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db, auth } from "@/firebase/config";

// Default 4.0-scale grade points
export const GRADE_POINTS = {
  "A+": 4.0,
  A: 4.0,
  "A-": 3.7,
  "B+": 3.3,
  B: 3.0,
  "B-": 2.7,
  "C+": 2.3,
  C: 2.0,
  "C-": 1.7,
  "D+": 1.3,
  D: 1.0,
  "D-": 0.7,
  F: 0.0,
};

const GRADES = Object.keys(GRADE_POINTS);

let nextId = 1;

function emptyModule() {
  return {
    id: nextId++,
    name: "",
    credits: "",
    grade: "A",
  };
}


export function calculateGPA(modules) {

  let totalPoints = 0;
  let totalCredits = 0;


  for (const m of modules) {

    const credits = parseFloat(m.credits);

    if (!credits || credits <= 0) continue;


    const points = GRADE_POINTS[m.grade];

    if (points === undefined) continue;


    totalPoints += points * credits;
    totalCredits += credits;

  }


  if (totalCredits === 0) {
    return {
      gpa: 0,
      totalCredits: 0
    };
  }


  return {
    gpa: totalPoints / totalCredits,
    totalCredits
  };

}



export default function GPAForm({ onSaved }) {


  const [modules, setModules] = useState([
    emptyModule(),
    emptyModule()
  ]);


  const [saving, setSaving] = useState(false);


  const [status, setStatus] = useState(null);



  const {
    gpa,
    totalCredits

  } = useMemo(
    () => calculateGPA(modules),
    [modules]
  );



  function updateModule(id, field, value) {

    setModules((prev) =>
      prev.map((m) =>
        m.id === id
          ? {
              ...m,
              [field]: value
            }
          : m
      )
    );

  }



  function addModule() {

    setModules((prev) => [
      ...prev,
      emptyModule()
    ]);

  }



  function removeModule(id) {

    setModules((prev) =>
      prev.length > 1
        ? prev.filter((m) => m.id !== id)
        : prev
    );

  }



  async function handleSave() {


    setStatus(null);



    if (!auth.currentUser) {

      setStatus({
        type: "error",
        message: "Please login before saving GPA history."
      });

      return;

    }



    const validModules = modules.filter(
      (m) =>
        m.name.trim() &&
        parseFloat(m.credits) > 0
    );



    if (validModules.length === 0) {

      setStatus({
        type: "error",
        message:
          "Add at least one module with name and credits."
      });

      return;

    }



    setSaving(true);



    try {


      await addDoc(
        collection(db, "gpaRecords"),
        {

          userId: auth.currentUser.uid,

          email: auth.currentUser.email,


          modules: validModules.map((m) => ({

            name: m.name.trim(),

            credits: parseFloat(m.credits),

            grade: m.grade

          })),


          gpa: Number(gpa.toFixed(2)),


          totalCredits,


          createdAt: serverTimestamp()

        }

      );



      setStatus({

        type: "success",

        message:
          "Saved to your GPA history."

      });



      onSaved?.();



    } catch (error) {


      console.log(error);


      setStatus({

        type: "error",

        message:
          "Error saving GPA."

      });


    } finally {


      setSaving(false);


    }


  }




  return (

    <div className="card animated-in">

      <div className="flex items-start justify-between mb-4">
        <div>
          <h2 className="h2">Modules</h2>
          <div className="kicker">Add modules, credits and select grades</div>
        </div>
        <div className="small">GPA: <strong>{gpa.toFixed(2)}</strong></div>
      </div>

      <div className="space-y-3">
        {modules.map((m, idx) => (
                  <div key={m.id} className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
                    <div className="md:col-span-6 col-span-1">
                      <input
                        type="text"
                        placeholder={`Module ${idx + 1}`}
                        value={m.name}
                        onChange={(e) => updateModule(m.id, "name", e.target.value)}
                      />
                    </div>

                    <div className="md:col-span-2 col-span-1">
                      <input
                        type="number"
                        placeholder="Credits"
                        value={m.credits}
                        onChange={(e) => updateModule(m.id, "credits", e.target.value)}
                      />
                    </div>

                    <div className="md:col-span-3 col-span-1">
                      <select value={m.grade} onChange={(e) => updateModule(m.id, "grade", e.target.value)}>
                        {GRADES.map((g) => (
                          <option key={g} value={g}>{g}</option>
                        ))}
                      </select>
                    </div>

                    <div className="md:col-span-1 col-span-1 text-right">
                      <button onClick={() => removeModule(m.id)} className="btn btn-ghost w-full md:w-auto" aria-label="Remove module">Remove</button>
                    </div>
                  </div>
                ))}
      </div>

      <div className="mt-4 flex gap-3">
        <button onClick={addModule} className="btn btn-outline">+ Add Module</button>
        <div className="ml-auto small">Total credits: <strong>{totalCredits}</strong></div>
      </div>

      <div className="mt-5 flex gap-3">
        <button onClick={handleSave} disabled={saving} className="btn btn-primary">
          {saving ? "Saving..." : "Save to history"}
        </button>
        <button onClick={() => { setModules([emptyModule(), emptyModule()]); }} className="btn btn-ghost">Reset</button>
      </div>

      {status && (
        <p className="mt-4 small">{status.message}</p>
      )}

    </div>

  );


}