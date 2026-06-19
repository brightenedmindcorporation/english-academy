"use client";

import { useEffect, useState } from "react";
import { auth, db } from "@/lib/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

export default function Dashboard() {
  const [user, setUser] = useState<any>(null);
  const [profile, setProfile] = useState<any>(null);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (u) => {
      if (u) {
        setUser(u);

        const docRef = doc(db, "students", u.uid);
        const snap = await getDoc(docRef);

        setProfile(snap.data());
      } else {
        setUser(null);
      }
    });

    return () => unsub();
  }, []);

  if (!user) return <p>Please login...</p>;

  return (
    <main className="p-10">

      <h1 className="text-2xl font-bold">
        Welcome {profile?.name}
      </h1>

      <p>Email: {profile?.email}</p>
      <p>Level: {profile?.level}</p>
      <p>Matricule: {profile?.matricule || "Not assigned yet"}</p>

    </main>
  );
}