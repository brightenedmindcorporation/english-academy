"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { loginStudent } from "../../lib/auth";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [matricule, setMatricule] =
    useState("");
  const [error, setError] = useState("");

  const handleLogin = () => {
    const student = loginStudent(
      email,
      matricule
    );

    if (!student) {
      setError(
        "Invalid credentials or account not approved."
      );
      return;
    }

    localStorage.setItem(
      "loggedStudent",
      JSON.stringify(student)
    );

    router.push("/dashboard");
  };

  return (
    <main className="min-h-screen bg-red-50 flex items-center justify-center p-6">
      <div className="bg-white shadow-xl rounded-3xl p-10 w-full max-w-lg">
        <h1 className="text-3xl font-bold text-red-800 text-center">
          Student Login
        </h1>

        <p className="text-center text-gray-600 mt-2 text-black">
          Brightened Mind Corporation Academy
        </p>

        <div className="mt-8 space-y-5">
          <div>
            <label className="block font-medium text-gray-700">
              Email Address
            </label>

            <input
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
              className="w-full border rounded-xl p-3 mt-2 text-black"
            />
          </div>

          <div>
            <label className="block font-medium text-gray-700">
              Matricule
            </label>

            <input
              type="text"
              placeholder="Enter matricule"
              value={matricule}
              onChange={(e) =>
                setMatricule(
                  e.target.value
                )
              }
              className="w-full border rounded-xl p-3 mt-2 text-black"
            />
          </div>

          {error && (
            <p className="text-red-600 text-center">
              {error}
            </p>
          )}

          <button
            onClick={handleLogin}
            className="w-full bg-red-700 text-white py-3 rounded-xl font-semibold text-lg"
          >
            Login
          </button>
        </div>
      </div>
    </main>
  );
}