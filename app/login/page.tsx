"use client";

import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "@/lib/firebase";
import { useRouter } from "next/navigation";
import { doc, getDoc } from "firebase/firestore";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [matricule, setMatricule] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleLogin = async () => {
    try {
      setLoading(true);

      // 🔐 1. Firebase auth
      const userCred = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      const user = userCred.user;

      // 📦 2. Firestore student data
      const snap = await getDoc(doc(db, "students", user.uid));

      if (!snap.exists()) {
        alert("Account not found in database");
        return;
      }

      const data = snap.data();

      // 🚫 3. Not approved check
      if (data.status !== "Approved") {
        alert("Account not approved by admin");
        return;
      }

      // 🔑 4. Matricule check
      if (!matricule) {
        alert("Please enter your matricule");
        return;
      }

      if (data.matricule !== matricule) {
        alert("Invalid matricule");
        return;
      }

      // 🚀 5. Redirect by level
      if (data.level === "Level 1") {
        router.push("/level1");
      } else if (data.level === "Level 2") {
        router.push("/level2");
      } else {
        router.push("/dashboard");
      }

    } catch (error: any) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-red-50 px-4">

      <div className="bg-white p-8 shadow-xl rounded-2xl w-full max-w-md border">

        {/* TITLE */}
        <h1 className="text-2xl font-bold text-red-800 text-center mb-2">
          Student Login
        </h1>

        <p className="text-center text-gray-600 mb-6">
          Brightened Mind Corporation Academy
        </p>

        {/* EMAIL */}
        <label className="block mb-1 font-semibold text-black">
          Email Address
        </label>

        <input
          type="email"
          placeholder="Enter your email"
          className="w-full border p-3 rounded-lg mb-4 text-black bg-white"
          onChange={(e) => setEmail(e.target.value)}
        />

        {/* PASSWORD */}
        <label className="block mb-1 font-semibold text-black">
          Password
        </label>

        <input
          type="password"
          placeholder="Enter your password"
          className="w-full border p-3 rounded-lg mb-4 text-black bg-white"
          onChange={(e) => setPassword(e.target.value)}
        />

        {/* MATRICULE */}
        <label className="block mb-1 font-semibold text-black">
          Matricule
        </label>

        <input
          type="text"
          placeholder="BMCA-2026-001"
          className="w-full border p-3 rounded-lg mb-6 text-black bg-white"
          onChange={(e) => setMatricule(e.target.value)}
        />

        {/* BUTTON */}
        <button
          onClick={handleLogin}
          disabled={loading}
          className="w-full bg-red-700 hover:bg-red-800 text-white p-3 rounded-lg font-semibold"
        >
          {loading ? "Logging in..." : "Login"}
        </button>

      </div>
    </main>
  );
}