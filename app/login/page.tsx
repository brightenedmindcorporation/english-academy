"use client";

import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "@/lib/firebase";
import { useRouter } from "next/navigation";
import { doc, getDoc } from "firebase/firestore";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleLogin = async () => {
    try {
      setLoading(true);

      const userCred = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      const user = userCred.user;

      const snap = await getDoc(doc(db, "students", user.uid));

      if (!snap.exists()) {
        alert("Student not found");
        return;
      }

      const data = snap.data();

      if (data.status !== "Approved") {
        alert("Not approved yet");
        return;
      }

      // 🔥 IMPORTANT: STORE USER
      localStorage.setItem(
        "loggedStudent",
        JSON.stringify({
          uid: user.uid,
          ...data,
        })
      );

      // 🔥 REDIRECT DIRECT DASHBOARD
      router.replace("/dashboard");

    } catch (error: any) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-red-50">

      <div className="bg-white p-8 shadow-xl rounded-2xl w-full max-w-md">

        <h1 className="text-2xl font-bold text-red-800 text-center mb-6">
          Student Login
        </h1>

        <input
          type="email"
          placeholder="Email"
          className="w-full border p-3 mb-4 text-black"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full border p-3 mb-6 text-black"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleLogin}
          disabled={loading}
          className="w-full bg-red-700 text-white p-3 rounded"
        >
          {loading ? "Loading..." : "Login"}
        </button>

      </div>
    </main>
  );
}