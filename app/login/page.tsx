"use client";

import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useRouter } from "next/navigation";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push("/dashboard");
    } catch (error: any) {
      alert(error.message);
    }
  };

  return (
    <main className="min-h-screen bg-red-50 flex justify-center items-center p-6">
      <div className="bg-white p-8 shadow-xl rounded-3xl w-full max-w-md">

        <h1 className="text-3xl font-bold text-red-800 text-center mb-2">
          Student Login
        </h1>

        <p className="text-center text-gray-700 mb-6">
          Brightened Mind Corporation Academy
        </p>

        <label className="block mb-2 font-medium text-black">
          Email Address
        </label>

        <input
          type="email"
          placeholder="Enter your email"
          className="w-full border rounded-xl p-3 text-black bg-white placeholder-gray-500 mb-4"
          onChange={(e) => setEmail(e.target.value)}
        />

        <label className="block mb-2 font-medium text-black">
          Password
        </label>

        <input
          type="password"
          placeholder="Enter your password"
          className="w-full border rounded-xl p-3 text-black bg-white placeholder-gray-500 mb-6"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleLogin}
          className="bg-red-700 hover:bg-red-800 text-white w-full p-3 rounded-xl font-semibold"
        >
          Login
        </button>

      </div>
    </main>
  );
}