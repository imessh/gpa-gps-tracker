"use client";

import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/firebase/config";
import { useRouter } from "next/navigation";


export default function Register(){

const [email,setEmail]=useState("");
const [password,setPassword]=useState("");
const [loading,setLoading]=useState(false);

const router = useRouter();


async function register(){
  setLoading(true);
try{
await createUserWithEmailAndPassword(auth, email, password);
setLoading(false);
alert("Account created");
router.push("/login");

}catch(error){
setLoading(false);
alert(error.message);
}
}

return(
  <div className="container py-20">
    <div className="max-w-md mx-auto">
      <div className="card">
        <h1 className="h2">Create account</h1>
        <p className="small mt-2">Create an account to save GPA calculations to your personal history.</p>
        <div className="mt-4 space-y-3">
          <label className="block">
            <div className="small mb-1">Email</div>
            <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="you@school.edu" />
          </label>

          <label className="block">
            <div className="small mb-1">Password</div>
            <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} placeholder="Choose a secure password" />
          </label>

          <div className="flex items-center gap-3">
            <button onClick={register} className="btn btn-primary">{loading? 'Creating…' : 'Create account'}</button>
            <a href="/login" className="text-sm small text-gray-600">Already have an account? Log in</a>
          </div>
        </div>
      </div>
    </div>
  </div>
)

}