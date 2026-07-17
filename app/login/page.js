"use client";

import {useState} from "react";
import {signInWithEmailAndPassword} from "firebase/auth";
import {auth} from "@/firebase/config";
import {useRouter} from "next/navigation";


export default function Login(){
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");
  const [loading,setLoading]=useState(false);
  const router=useRouter();

  async function login(){
    setLoading(true);
    try{
      await signInWithEmailAndPassword(auth, email, password);
      setLoading(false);
      alert("Login successful");
      router.push("/calculator");
    }catch(error){
      setLoading(false);
      alert(error.message);
    }
  }

  return (
    <div className="container py-20">
      <div className="max-w-md mx-auto">
        <div className="card">
          <h1 className="h2">Welcome back</h1>
          <p className="small mt-2">Sign in to access saved GPA history and manage calculations.</p>
          <div className="mt-4 space-y-3">
            <label className="block">
              <div className="small mb-1">Email</div>
              <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="you@school.edu" />
            </label>
            <label className="block">
              <div className="small mb-1">Password</div>
              <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} placeholder="Your password" />
            </label>
            <div className="flex items-center gap-3">
              <button onClick={login} className="btn btn-primary">{loading? 'Signing in…' : 'Sign in'}</button>
              <a href="/register" className="text-sm small text-gray-600">Create an account</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}