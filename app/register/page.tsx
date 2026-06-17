"use client";

import { useState } from "react";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [level, setLevel] = useState("Level 1");

  const handleRegister = () => {
    const existingStudents = JSON.parse(
      localStorage.getItem("students") || "[]"
    );

    const newStudent = {
      id: existingStudents.length + 1,
      name,
      email,
      phone,
      level,
      status: "Pending",
      matricule: "",
    };

    const updatedStudents = [
      ...existingStudents,
      newStudent,
    ];

    localStorage.setItem(
      "students",
      JSON.stringify(updatedStudents)
    );

    alert("Student registered successfully!");

    setName("");
    setEmail("");
    setPhone("");
    setLevel("Level 1");
  };

  return (
    <main className="min-h-screen bg-red-50 flex items-center justify-center p-6">
      <div className="bg-white shadow-xl rounded-3xl p-10 w-full max-w-lg">
        <h1 className="text-3xl font-bold text-red-800 text-center">
          Student Registration
        </h1>

        <p className="text-center text-gray-600 mt-2 text-black">
          Brightened Mind Corporation Academy
        </p>

        <div className="mt-8 space-y-5">
          <div>
            <label className="block font-medium text-gray-700">
              Full Name
            </label>

            <input
              type="text"
              placeholder="Enter full name"
              value={name}
              onChange={(e) =>
                setName(e.target.value)
              }
              className="w-full border rounded-xl p-3 mt-2 text-black"
            />
          </div>

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
              Phone Number
            </label>

            <input
              type="tel"
              placeholder="Enter phone number"
              value={phone}
              onChange={(e) =>
                setPhone(e.target.value)
              }
              className="w-full border rounded-xl p-3 mt-2 text-black"
            />
          </div>

          <div>
            <label className="block font-medium text-gray-700">
              Choose Level
            </label>

            <select
              value={level}
              onChange={(e) =>
                setLevel(e.target.value)
              }
              className="w-full border rounded-xl p-3 mt-2 text-black"
            >
              <option>Level 1</option>
              <option>Level 2</option>
              <option>Level 3</option>
            </select>
          </div>

          <button
            onClick={handleRegister}
            className="w-full bg-red-700 text-white py-3 rounded-xl font-semibold text-lg"
          >
            Register Student
          </button>
        </div>
      </div>
    </main>
  );
}