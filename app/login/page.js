"use client";

import {useState} from "react";
import {signInWithEmailAndPassword} from "firebase/auth";
import {auth} from "@/firebase/config";
import {useRouter} from "next/navigation";


export default function Login(){


const [email,setEmail]=useState("");
const [password,setPassword]=useState("");

const router=useRouter();



async function login(){

try{

await signInWithEmailAndPassword(
auth,
email,
password
);


alert("Login successful");


router.push("/calculator");


}catch(error){

alert(error.message);

}

}



return(

<div>

<h1>Login</h1>


<input
placeholder="Email"
onChange={(e)=>setEmail(e.target.value)}
/>


<input
type="password"
placeholder="Password"
onChange={(e)=>setPassword(e.target.value)}
/>


<button onClick={login}>
Login
</button>


</div>

)


}