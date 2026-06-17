"use client";

import { useEffect, useState } from "react";

export default function AdminPage() {
  const [students, setStudents] =
  useState<any[]>([]);

useEffect(() => {
  const savedStudents =
    JSON.parse(
      localStorage.getItem("students") || "[]"
    );

  setStudents(savedStudents);
}, []);

  const generateMatricule = (id: number) => {
    return `BMCA-2026-${String(id).padStart(3, "0")}`;
  };

 const updateStatus = (
  id: number,
  newStatus: string
) => {
  const updatedStudents = students.map(
    (student) => {
      if (student.id === id) {
        return {
          ...student,
          status: newStatus,
          matricule:
            newStatus === "Approved"
              ? generateMatricule(id)
              : student.matricule,
        };
      }

      return student;
    }
  );

  setStudents(updatedStudents);

  localStorage.setItem(
    "students",
    JSON.stringify(updatedStudents)
  );
};

  return (
    <main className="min-h-screen bg-red-50 p-8">
      <div className="bg-red-800 text-white rounded-3xl p-8 shadow-xl">
        <h1 className="text-4xl font-bold">
          Admin Dashboard
        </h1>

        <p className="mt-2 text-red-100">
          Brightened Mind Corporation Academy
        </p>
      </div>

      <div className="bg-white rounded-3xl shadow-xl p-8 mt-10">
        <h2 className="text-3xl font-bold text-red-800 mb-6">
          Students List
        </h2>

        <div className="space-y-5">
          {students.map((student) => (
            <div
              key={student.id}
              className="border rounded-2xl p-5 flex flex-col md:flex-row md:items-center md:justify-between gap-4"
            >
              <div>
                <h3 className="text-xl font-bold text-gray-800">
                  {student.name}
                </h3>

                <p className="text-gray-600">
                  {student.level}
                </p>

                <p className="text-gray-600">
                  {student.email}
                </p>

                <p className="text-gray-600">
                  {student.phone}
                </p>

                <p className="font-medium text-gray-700">
                  Matricule:
                  {" "}
                  {student.matricule ||
                    "Not assigned"}
                </p>

                <p
                  className={`font-semibold ${
                    student.status ===
                    "Approved"
                      ? "text-green-600"
                      : student.status ===
                        "Rejected"
                      ? "text-red-600"
                      : "text-orange-500"
                  }`}
                >
                  {student.status}
                </p>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() =>
                    updateStatus(
                      student.id,
                      "Approved"
                    )
                  }
                  className="bg-green-600 text-white px-5 py-2 rounded-xl font-semibold"
                >
                  Approve
                </button>

                <button
                  onClick={() =>
                    updateStatus(
                      student.id,
                      "Rejected"
                    )
                  }
                  className="bg-red-700 text-white px-5 py-2 rounded-xl font-semibold"
                >
                  Reject
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}