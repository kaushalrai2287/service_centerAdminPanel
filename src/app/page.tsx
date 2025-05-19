
"use client";

import { useEffect } from "react";
import { createClient } from "../../utils/supabase/client";
import { useRouter } from "next/navigation";


export default function Home(){



  const router = useRouter();
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("/firebase.sw.js")
        .then((registration) => {
          console.log("Service Worker registered:", registration);
        })
        .catch((error) => {
          console.error("Service Worker registration failed:", error);
        });
    }
  }, []);
  useEffect(() => {
    const checkUser = async () => {
      const supabase = await createClient();
      const {data,error} = await supabase.auth.getUser();

      

      if (error || data?.user){
        router.push("/login")
      }
      else {
        router.push("/booking-management/booking-list")
      }
    }
    checkUser();
  },[router])

  return null;
}