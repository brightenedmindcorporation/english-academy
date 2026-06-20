"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";

export default function Dashboard() {
  const [student, setStudent] = useState<any | null>(null);
  const router = useRouter();

  useEffect(() => {
    const data = localStorage.getItem("loggedStudent");

    if (!data) {
      router.replace("/login");
      return;
    }

    setStudent(JSON.parse(data));
  }, [router]);

  const logout = async () => {
    await signOut(auth);

    localStorage.removeItem("loggedStudent");

    // 🔥 IMPORTANT : vider state AVANT redirect
    setStudent(null);

    router.replace("/login");
  };

  // 🔥 SI PAS DE STUDENT → ON N'AFFICHE RIEN DU TOUT
  if (!student) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        Redirecting...
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-red-50 p-8 text-black">

      <div className="max-w-3xl mx-auto bg-white p-8 rounded-2xl shadow">

        <h1 className="text-3xl font-bold text-red-700 mb-6">
          Welcome {student.name}
        </h1>

        <p><b>Email:</b> {student.email}</p>
        <p><b>Matricule:</b> {student.matricule}</p>
        <p><b>Level:</b> {student.level}</p>
        <p><b>Status:</b> {student.status}</p>

        <div className="mt-6 flex gap-4">

          <button
            onClick={() => {
              if (student.level === "Level 1") router.push("/level1");
              if (student.level === "Level 2") router.push("/level2");
              if (student.level === "Level 3") router.push("/level3");
            }}
            className="bg-green-600 text-white px-4 py-2 rounded"
          >
            Start Lessons
          </button>

          <button
            onClick={logout}
            className="bg-red-600 text-white px-4 py-2 rounded"
          >
            Logout
          </button>

        </div>

      </div>
    </main>
  );
}