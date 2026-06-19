"use client";

import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "@/lib/firebase";
import { doc, setDoc } from "firebase/firestore";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    try {
      setLoading(true);

      const userCred = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      const user = userCred.user;

      await setDoc(doc(db, "students", user.uid), {
        uid: user.uid,
        name,
        email,
        level: "Level 1",
        matricule: "",
        createdAt: new Date(),
      });

      alert("Account created!");
    } catch (error: any) {
      alert(error.message);
    }

    setLoading(false);
  };

  return (
    <main className="min-h-screen flex items-center justify-center">
      <div className="bg-white p-6 rounded-xl shadow w-96">

        <h1 className="text-xl font-bold mb-4">
          Student Register
        </h1>

        <input
          placeholder="Full name"
          className="border p-2 w-full mb-2"
          onChange={(e) => setName(e.target.value)}
        />

        <input
          placeholder="Email"
          className="border p-2 w-full mb-2"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="border p-2 w-full mb-2"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleRegister}
          className="bg-red-600 text-white w-full p-2"
        >
          {loading ? "Loading..." : "Register"}
        </button>

      </div>
    </main>
  );
}