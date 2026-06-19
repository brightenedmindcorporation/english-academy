"use client";

import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "@/lib/firebase";
import { doc, setDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleRegister = async () => {
    try {
      setLoading(true);

      console.log("➡️ Creating user...");

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

      console.log("🔥 WRITTEN TO FIRESTORE");

      alert("Account created!");

      router.push("/dashboard");
    } catch (error: any) {
      console.error("❌ REGISTER ERROR:", error);
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-red-50">
      <div className="bg-white p-6 rounded-xl shadow w-96">

        <h1 className="text-xl font-bold mb-4 text-black">
          Student Register
        </h1>

        <input
          placeholder="Full name"
          className="w-full border p-2 mb-2 text-black"
          onChange={(e) => setName(e.target.value)}
        />

        <input
          placeholder="Email"
          className="w-full border p-2 mb-2 text-black"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full border p-2 mb-2 text-black"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleRegister}
          className="bg-red-600 text-white w-full p-2"
          disabled={loading}
        >
          {loading ? "Creating..." : "Register"}
        </button>

      </div>
    </main>
  );
}