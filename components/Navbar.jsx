"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { auth } from "@/firebase/config";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useRouter } from "next/navigation";


export default function Navbar() {


  const [user, setUser] = useState(null);

  const router = useRouter();



  useEffect(() => {


    const unsubscribe = onAuthStateChanged(
      auth,
      (currentUser) => {

        setUser(currentUser);

      }
    );


    return () => unsubscribe();


  }, []);





  async function logout(){


    try {

      await signOut(auth);

      router.push("/login");

    } catch(error){

      console.log(error);

    }


  }




  return (

    <nav className="w-full bg-white/6 backdrop-blur-md border-b border-white/6 px-6 py-3 shadow-sm">


      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#7c3aed] to-[#06b6d4] flex items-center justify-center text-white font-bold">G</div>
            <div className="hidden sm:block">
              <div className="text-sm font-semibold">GPA · Tracker</div>
              <div className="text-xs small">Modern GPA & History</div>
            </div>
          </Link>

          <div className="hidden md:flex gap-4 items-center">
            <Link href="/calculator" className="text-sm small hover:underline">Calculator</Link>
            <Link href="/gps" className="text-sm small hover:underline">GPS Interest</Link>
          </div>
        </div>





      <div className="flex items-center gap-3">
          {/* Theme toggle — simple and non-blocking */}
          <button
            onClick={() => {
              const root = document.documentElement;
              const isLight = root.classList.contains('light');
              if (isLight) root.classList.remove('light'); else root.classList.add('light');
            }}
            aria-label="Toggle theme"
            className="btn btn-ghost"
            title="Toggle light / dark"
          >
            <span aria-hidden>🌓</span>
          </button>

          {user ? (
            <>
              <span className="text-sm small px-2 py-1 rounded-md bg-white/4">{user.email}</span>
              <button onClick={logout} className="btn btn-outline">Logout</button>
            </>
          ) : (
            <>
              <Link href="/login" className="btn btn-ghost">Login</Link>
              <Link href="/register" className="btn btn-primary">Signup</Link>
            </>
          )}
        </div>
      </div>
    </nav>

  );

}


  

