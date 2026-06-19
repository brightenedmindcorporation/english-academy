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
        status: "Pending",
        createdAt: new Date(),
      });

      alert("Account created successfully!");

      setName("");
      setEmail("");
      setPassword("");
    } catch (error: any) {
      alert(error.message);
    }

    setLoading(false);
  };

  return (
    <main className="min-h-screen bg-red-50 flex items-center justify-center p-6">
      <div className="bg-white p-8 rounded-3xl shadow-xl w-full max-w-md">

        <h1 className="text-3xl font-bold text-red-800 text-center mb-2">
          Student Registration
        </h1>

        <p className="text-center text-gray-700 mb-6">
          Brightened Mind Corporation Academy
        </p>

        <label className="block mb-2 font-medium text-black">
          Full Name
        </label>

        <input
          type="text"
          placeholder="Enter your full name"
          className="w-full border rounded-xl p-3 text-black bg-white placeholder-gray-500 mb-4"
          onChange={(e) => setName(e.target.value)}
          value={name}
        />

        <label className="block mb-2 font-medium text-black">
          Email Address
        </label>

        <input
          type="email"
          placeholder="Enter your email"
          className="w-full border rounded-xl p-3 text-black bg-white placeholder-gray-500 mb-4"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />

        <label className="block mb-2 font-medium text-black">
          Password
        </label>

        <input
          type="password"
          placeholder="Create a password"
          className="w-full border rounded-xl p-3 text-black bg-white placeholder-gray-500 mb-6"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />

        <button
          onClick={handleRegister}
          disabled={loading}
          className="bg-red-700 hover:bg-red-800 text-white w-full p-3 rounded-xl font-semibold"
        >
          {loading ? "Creating Account..." : "Register"}
        </button>

      </div>
    </main>
  );
}