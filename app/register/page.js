"use client";

import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/firebase/config";
import { useRouter } from "next/navigation";


export default function Register(){

const [email,setEmail]=useState("");
const [password,setPassword]=useState("");

const router = useRouter();


async function register(){

try{

await createUserWithEmailAndPassword(
auth,
email,
password
);

alert("Account created");

router.push("/login");


}catch(error){

alert(error.message);

}

}


return(
<div>

<h1>Create Account</h1>


<input
placeholder="Email"
onChange={(e)=>setEmail(e.target.value)}
/>


<input
placeholder="Password"
type="password"
onChange={(e)=>setPassword(e.target.value)}
/>


<button onClick={register}>
Register
</button>


</div>
)

}