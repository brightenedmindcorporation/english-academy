"use client";

import { useEffect, useState } from "react";
import { db } from "@/lib/firebase";
export const dynamic = "force-dynamic";
import {
  collection,
  getDocs,
  updateDoc,
  doc,
} from "firebase/firestore";

export default function AdminPage() {
  const [students, setStudents] = useState<any[]>([]);

  const fetchStudents = async () => {
    const snapshot = await getDocs(collection(db, "students"));

    setStudents(
      snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }))
    );
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  // 🔥 generate matricule
  const generateMatricule = (index: number) => {
  const year = new Date().getFullYear();
  const number = String(index).padStart(3, "0");

  return `BMCA-${year}-${number}`;
};

  // 📧 send email
  const sendEmail = async (email: string, name: string, matricule: string) => {
    await fetch("/api/send-email", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email,
        name,
        matricule,
      }),
    });
  };

  // ✅ APPROVE
  const approveStudent = async (student: any, index: number) => {
  try {
    const matricule = generateMatricule(index + 1);

    await updateDoc(doc(db, "students", student.id), {
      status: "Approved",
      matricule,
    });

    await sendEmail(student.email, student.name, matricule);

    alert("Approved + Email sent!");
    fetchStudents();
  } catch (error) {
    console.error(error);
    alert("Error approving student");
  }
};

  // ❌ REJECT
  const rejectStudent = async (student: any) => {
    try {
      await updateDoc(doc(db, "students", student.id), {
        status: "Rejected",
      });

      alert("Rejected!");
      fetchStudents();
    } catch (error) {
      console.error(error);
      alert("Error rejecting student");
    }
  };

  return (
    <main className="p-10 bg-gray-100 min-h-screen text-black">

      <h1 className="text-3xl font-bold mb-6">
        Admin Panel
      </h1>

      {students.map((s) => (
        <div key={s.id} className="bg-white p-5 mb-4 rounded-xl shadow">

          <p><b>Name:</b> {s.name}</p>
          <p><b>Email:</b> {s.email}</p>
          <p><b>Status:</b> {s.status}</p>
          <p><b>Matricule:</b> {s.matricule || "-"}</p>

          <div className="flex gap-3 mt-4">

            <button
  onClick={() => approveStudent(s, students.indexOf(s))}
  className="bg-green-600 text-white px-4 py-2 rounded"
>
  Approve
</button>

            <button
              onClick={() => rejectStudent(s)}
              className="bg-red-600 text-white px-4 py-2 rounded"
            >
              Reject
            </button>

          </div>

        </div>
      ))}

    </main>
  );
}