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

    <nav className="flex items-center justify-between px-6 py-4 border-b">


      <div className="flex gap-5">


        <Link href="/">
          Home
        </Link>


        <Link href="/calculator">
          GPA Calculator
        </Link>


        <Link href="/gps">
          GPS Interest
        </Link>


      </div>





      <div className="flex items-center gap-4">


        {user ? (

          <>


            <span className="text-sm">

              {user.email}

            </span>


            <button

              onClick={logout}

              className="px-3 py-1 border rounded"

            >

              Logout

            </button>


          </>


        ) : (


          <>


            <Link
              href="/login"
              className="px-3 py-1 border rounded"
            >

              Login

            </Link>



            <Link
              href="/register"
              className="px-3 py-1 bg-black text-white rounded"
            >

              Signup

            </Link>


          </>


        )}



      </div>



    </nav>

  );

}