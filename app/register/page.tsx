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

      console.log("🚀 START REGISTER");

      if (!name || !email || !password) {
        alert("Please fill all fields");
        setLoading(false);
        return;
      }

      const userCred = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      const user = userCred.user;

      console.log("✅ USER CREATED:", user.uid);

      await setDoc(doc(db, "students", user.uid), {
        uid: user.uid,
        name,
        email,
        level: "Level 1",
        status: "Pending",
        matricule: "",
        createdAt: new Date(),
      });

      alert("Account created successfully!");

      setName("");
      setEmail("");
      setPassword("");

    } catch (error: any) {
      console.error("❌ REGISTER ERROR:", error);
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-6 rounded-xl shadow w-96">

        <h1 className="text-xl font-bold mb-4 text-center">
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