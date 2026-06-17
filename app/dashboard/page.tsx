"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const router = useRouter();

  const [student, setStudent] =
    useState<any>(null);

  const [progress, setProgress] =
    useState(0);

  const [completed, setCompleted] =
    useState(0);

  const [certificateReady, setCertificateReady] =
    useState(false);

  useEffect(() => {
    const savedStudent =
      localStorage.getItem(
        "loggedStudent"
      );

    if (!savedStudent) {
      router.push("/login");
      return;
    }

    const parsedStudent =
      JSON.parse(savedStudent);

    setStudent(parsedStudent);

    let passedQuizzes = 0;

    for (
      let i = 1;
      i <= 12;
      i++
    ) {
      const passed =
        localStorage.getItem(
          `quiz${i}Passed`
        );

      if (
        passed ===
        "true"
      ) {
        passedQuizzes++;
      }
    }

    setCompleted(
      passedQuizzes
    );

    setProgress(
      Math.round(
        (passedQuizzes /
          12) *
          100
      )
    );

    const finalPassed =
      localStorage.getItem(
        "level1FinalPassed"
      );

    setCertificateReady(
      finalPassed ===
        "true"
    );
  }, [router]);

  if (!student) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <p>
          Loading...
        </p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-red-50 p-8">

      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="bg-red-800 text-white rounded-3xl p-8 shadow-xl">

          <h1 className="text-4xl font-bold">
            Welcome,
            {" "}
            {student.name}
            👋
          </h1>

          <p className="mt-2 text-red-100">
            Brightened Mind
            Corporation Academy
          </p>

        </div>

        {/* Profile */}
        <div className="grid md:grid-cols-3 gap-6 mt-8">

          <div className="bg-white rounded-3xl shadow-lg p-6">

            <h2 className="text-xl font-bold text-red-700 mb-4">
              👤 Student Profile
            </h2>

            <p className="text-black">
  <strong>
    Name:
  </strong>{" "}
  {student.name}
</p>

<p className="text-black">
  <strong>
    Level:
  </strong>{" "}
  {student.level}
</p>

<p className="text-black">
  <strong>
    Status:
  </strong>{" "}
  Active Student
</p>

          </div>

          {/* Progress */}
          <div className="bg-white rounded-3xl shadow-lg p-6">

            <h2 className="text-xl font-bold text-red-700 mb-4">
              📈 Course Progress
            </h2>

            <div className="w-full bg-gray-300 rounded-full h-8 overflow-hidden">
              <div
                className="bg-green-600 h-8 flex items-center justify-center text-white font-bold transition-all duration-500"
                style={{
                  width: `${progress}%`,
                }}
              >
                {progress}%
              </div>
            </div>

            <p className="mt-4 text-black font-semibold">
  {completed}/12
  quizzes completed
</p>

          </div>

          {/* Certificate */}
          <div className="bg-white rounded-3xl shadow-lg p-6">

            <h2 className="text-xl font-bold text-red-700 mb-4">
              🏆 Certificate
            </h2>

            {certificateReady ? (
              <>
                <p className="text-green-700 font-bold mb-4">
                  ✅ Available
                </p>

                <Link href="/level1/request-certificate">
                  <button className="bg-yellow-600 text-white px-5 py-3 rounded-xl w-full">
                    Download Certificate
                  </button>
                </Link>
              </>
            ) : (
              <>
                <p className="text-red-600 font-bold">
                  🔒 Locked
                </p>

                <p className="text-sm text-gray-600 mt-2">
                  Pass the Final Quiz first.
                </p>
              </>
            )}

          </div>

        </div>
        {/* Achievements */}
<div className="bg-white rounded-3xl shadow-lg p-8 mt-8">

  <h2 className="text-2xl font-bold text-red-700 mb-5">
    🏅 Achievements
  </h2>

  <div className="grid md:grid-cols-4 gap-4">

    <div
      className={`p-5 rounded-2xl text-center ${
        progress >= 25
          ? "bg-yellow-100 border-2 border-yellow-500"
          : "bg-gray-100"
      }`}
    >
      <h3 className="text-3xl">
        🥉
      </h3>

      <p className="font-bold text-black mt-2">
        Beginner Explorer
      </p>

      <p className="text-sm text-black">
        Reach 25%
      </p>
    </div>

    <div
      className={`p-5 rounded-2xl text-center ${
        progress >= 50
          ? "bg-gray-200 border-2 border-gray-500"
          : "bg-gray-100"
      }`}
    >
      <h3 className="text-3xl">
        🥈
      </h3>

      <p className="font-bold text-black mt-2">
        Serious Learner
      </p>

      <p className="text-sm text-black">
        Reach 50%
      </p>
    </div>

    <div
      className={`p-5 rounded-2xl text-center ${
        progress >= 75
          ? "bg-yellow-50 border-2 border-yellow-700"
          : "bg-gray-100"
      }`}
    >
      <h3 className="text-3xl">
        🥇
      </h3>

      <p className="font-bold text-black mt-2">
        English Warrior
      </p>

      <p className="text-sm text-black">
        Reach 75%
      </p>
    </div>

    <div
      className={`p-5 rounded-2xl text-center ${
        progress === 100
          ? "bg-green-100 border-2 border-green-700"
          : "bg-gray-100"
      }`}
    >
      <h3 className="text-3xl">
        🏆
      </h3>

      <p className="font-bold text-black mt-2">
        Level 1 Master
      </p>

      <p className="text-sm text-black">
        Complete 100%
      </p>
    </div>

  </div>
</div>

        {/* Quick Access */}
        <div className="bg-white rounded-3xl shadow-lg p-8 mt-8">

          <h2 className="text-2xl font-bold text-red-700 mb-5">
            🚀 Continue Learning
          </h2>

          <div className="flex flex-wrap gap-4">

            <Link href="/level1">
              <button className="bg-blue-700 text-white px-6 py-3 rounded-xl">
                📘 Go to Level 1
              </button>
            </Link>

            {progress === 100 ? (
  <Link href="/level1/final-quiz">
    <button className="bg-green-700 text-white px-6 py-3 rounded-xl">
      🎓 Final Quiz
    </button>
  </Link>
) : (
  <button
    disabled
    className="bg-gray-400 text-white px-6 py-3 rounded-xl cursor-not-allowed"
  >
    🔒 Final Quiz Locked
  </button>
)}

          </div>

        </div>

      </div>
    </main>
  );
}