"use client";

import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "@/lib/firebase";
import { doc, setDoc } from "firebase/firestore";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
  try {
    setLoading(true);

    console.log("STEP 1 START");

    const userCred = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    console.log("STEP 2 USER CREATED", userCred.user.uid);

    alert("SUCCESS");

  } catch (error: any) {
    console.error("FIREBASE ERROR:", error.code, error.message);
    alert(error.code);
  } finally {
    setLoading(false);
  }
};
  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-6 rounded-xl shadow w-96">

        <h1 className="text-2xl font-bold mb-4 text-black text-center">
         Student Register
        </h1>

        <input
          placeholder="Full name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border p-3 mb-3 rounded text-black"
        />

        <input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border p-3 mb-3 rounded text-black"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border p-3 mb-3 rounded text-black"
        />

        <button
          onClick={handleRegister}
          disabled={loading}
          className="w-full bg-red-600 text-white p-3 rounded font-bold"
        >
          {loading ? "Creating account..." : "Register"}
        </button>

      </div>
    </main>
  );
}