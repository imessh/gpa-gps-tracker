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
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => setUser(currentUser));
    return () => unsubscribe();
  }, []);

  async function logout(){
    try{
      await signOut(auth);
      router.push('/login');
    }catch(e){ console.log(e); }
  }

  return (
    <header className="header">
      <div className="container flex items-center justify-between py-4">
        <Link href="/" className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-md bg-gradient-to-br from-teal-500 to-indigo-500 flex items-center justify-center text-white font-bold">S</div>
          <div>
            <div className="font-semibold">Student Tracker</div>
            <div className="text-xs small">GPA & location ledger</div>
          </div>
        </Link>

        <nav className="hidden md:flex gap-6 items-center">
          <Link href="/" className="text-sm small text-gray-700 hover:text-teal-600">Home</Link>
          <Link href="/calculator" className="text-sm small text-gray-700 hover:text-teal-600">Calculator</Link>
        </nav>

        <div className="flex items-center gap-3">
          {user ? (
            <>
              <span className="text-sm small px-3 py-1 rounded-md bg-gray-100">{user.email}</span>
              <button onClick={logout} className="btn btn-ghost">Logout</button>
            </>
          ) : (
            <>
              <Link href="/login" className="btn btn-ghost">Login</Link>
              <Link href="/register" className="btn btn-primary">Signup</Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
