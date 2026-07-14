"use client";

import { useCallback, useEffect, useState } from "react";
import {
  collection,
  query,
  orderBy,
  limit,
  getDocs,
  where,
} from "firebase/firestore";

import { onAuthStateChanged } from "firebase/auth";

import { db, auth } from "@/firebase/config";

import GPAForm from "@/components/GPAForm";


export default function CalculatorPage() {


  const [history, setHistory] = useState([]);

  const [loading, setLoading] = useState(true);

  const [loadError, setLoadError] = useState(false);



  const loadHistory = useCallback(async () => {


    if (!auth.currentUser) {

      setHistory([]);

      setLoading(false);

      return;

    }



    setLoading(true);

    setLoadError(false);



    try {


      const q = query(

        collection(db, "gpaRecords"),


        where(
          "userId",
          "==",
          auth.currentUser.uid
        ),


        orderBy(
          "createdAt",
          "desc"
        ),


        limit(10)

      );



      const snap = await getDocs(q);



      setHistory(

        snap.docs.map((doc) => ({

          id: doc.id,

          ...doc.data(),

        }))

      );



    } catch (err) {


      console.log(
        "History loading error:",
        err
      );


      setLoadError(true);



    } finally {


      setLoading(false);


    }


  }, []);



  useEffect(() => {


    const unsubscribe = onAuthStateChanged(

      auth,

      (user) => {

        onAuthStateChanged(
  auth,
  (user) => {

    console.log("CURRENT USER:", user);

    if (user) {
      console.log("UID:", user.uid);
      console.log("EMAIL:", user.email);

      loadHistory();
    } else {
      console.log("No user logged in");
      setHistory([]);
      setLoading(false);
    }

  }
);

        if (user) {

          loadHistory();

        } else {

          setHistory([]);

          setLoading(false);

        }


      }

    );



    return () => unsubscribe();



  }, [loadHistory]);





  return (

    <div className="max-w-3xl mx-auto px-6 py-14">


      <p className="font-mono text-xs uppercase tracking-[0.25em] text-gold mb-2">

        01 — Calculate

      </p>



      <h1 className="font-display text-3xl md:text-4xl font-semibold text-ink mb-2">

        GPA Calculator

      </h1>



      <p className="text-ink-soft text-sm mb-8 max-w-xl">

        Weighted by credit, on the standard 4.0 scale. Add every module for
        the term, pick each grade, and the total updates as you go.

      </p>




      <GPAForm onSaved={loadHistory} />





      <section className="mt-14">


        <h2 className="font-display text-xl font-semibold text-ink mb-4">

          Saved history

        </h2>





        {loading && (

          <p className="text-sm text-ink-soft font-mono">

            Loading history…

          </p>

        )}






        {!loading && loadError && (

          <p className="text-sm text-alert font-mono">

            Couldn't load history. Check Firestore rules and indexes.

          </p>

        )}






        {!loading && !loadError && history.length === 0 && (

          <p className="text-sm text-ink-soft">

            No saved calculations yet — save one above and it'll show up
            here.

          </p>

        )}







        {!loading && !loadError && history.length > 0 && (


          <div className="transcript-card rounded-sm divide-y divide-rule/60">


            {history.map((record) => (


              <div

                key={record.id}

                className="p-4 flex items-center justify-between gap-4"

              >


                <div>


                  <p className="text-sm text-ink font-body">

                    {record.modules?.length ?? 0} module
                    {record.modules?.length === 1 ? "" : "s"} ·{" "}
                    {record.totalCredits} credits

                  </p>



                  <p className="text-xs text-ink-soft font-mono mt-1">

                    {record.modules
                      ?.map((m) => m.grade)
                      .join(", ")}

                  </p>



                </div>





                <span className="font-display text-2xl font-semibold text-gold shrink-0">

                  {record.gpa?.toFixed(2)}

                </span>



              </div>


            ))}



          </div>


        )}



      </section>




    </div>

  );

}