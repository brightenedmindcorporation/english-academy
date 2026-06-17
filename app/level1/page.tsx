"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Level1Page() {
  const router = useRouter();

  const [allowed, setAllowed] =
    useState(false);

  const [
    completedQuizzes,
    setCompletedQuizzes,
  ] = useState<number[]>([]);

  const [
    completedLessons,
    setCompletedLessons,
  ] = useState<number[]>([]);
  const progress =
  Math.round(
    (completedQuizzes.length /
      12) *
      100
  );

  useEffect(() => {
    const savedStudent =
      localStorage.getItem(
        "loggedStudent"
      );

    if (!savedStudent) {
      router.push("/login");
      return;
    }

    const student =
      JSON.parse(savedStudent);

    if (
      student.level !==
      "Level 1"
    ) {
      router.push(
        "/dashboard"
      );
      return;
    }

    setAllowed(true);

    const quizzes: number[] =
      [];

    const lessons: number[] =
      [];

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
        quizzes.push(i);
      }

      const lessonDone =
        localStorage.getItem(
          `lesson${i}Completed`
        );

      if (
        lessonDone ===
        "true"
      ) {
        lessons.push(i);
      }
    }

    setCompletedQuizzes(
      quizzes
    );

    setCompletedLessons(
      lessons
    );
  }, [router]);

  if (!allowed) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <p>
          Checking access...
        </p>
      </main>
    );
  }

  const lessons = [
    {
      id: 1,
      title:
        "Greetings and Introductions",
    },
    {
      id: 2,
      title:
        "The Alphabet and Pronunciation",
    },
    {
      id: 3,
      title:
        "Numbers and Personal Information",
    },
    {
      id: 4,
      title:
        "Family and Relationships",
    },
    {
      id: 5,
      title:
        "Everyday Objects",
    },
    {
      id: 6,
      title:
        "Colors and Descriptions",
    },
    {
      id: 7,
      title:
        "Days, Months, and Dates",
    },
    {
      id: 8,
      title:
        "Daily Routines",
    },
    {
      id: 9,
      title:
        "Food and Drinks",
    },
    {
      id: 10,
      title:
        "Places in Town",
    },
    {
      id: 11,
      title:
        "Hobbies and Interests",
    },
    {
      id: 12,
      title:
        "Final Review and Real-Life Conversation",
    },
  ];

  return (
    <main className="min-h-screen bg-red-50 p-8">
      <div className="max-w-7xl mx-auto">

        <div className="bg-red-800 text-white rounded-3xl p-8">
          <h1 className="text-4xl font-bold">
            Level 1 -
            Beginner English
          </h1>
        </div>
        {/* Course Progress */}
<div className="bg-white rounded-3xl shadow-lg p-8 mt-10 mb-10">

  <h2 className="text-3xl font-bold text-red-800 mb-5">
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

  <p className="mt-4 text-gray-700 font-semibold">
    {completedQuizzes.length}
    /12 quizzes completed
  </p>

</div>

        <div className="mt-10 grid md:grid-cols-2 gap-6">
          {lessons.map(
            (lesson) => {
              const lessonUnlocked =
                lesson.id ===
                  1 ||
                completedQuizzes.includes(
                  lesson.id -
                    1
                );

              const quizUnlocked =
                completedLessons.includes(
                  lesson.id
                );

              return (
                <div
                  key={
                    lesson.id
                  }
                  className="bg-white rounded-3xl p-6 shadow-lg"
                >
                  <h2 className="text-2xl font-bold text-red-700">
                    Lesson{" "}
                    {
                      lesson.id
                    }

                    :{" "}
                    {
                      lesson.title
                    }
                  </h2>

                  <div className="flex gap-3 mt-5 flex-wrap">

                    {/* Lesson */}
                    {lessonUnlocked ? (
                      <Link
                        href={`/level1/lesson${lesson.id}`}
                      >
                        <button className="bg-blue-700 text-white px-5 py-3 rounded-xl">
                          📘 Lesson
                        </button>
                      </Link>
                    ) : (
                      <button
                        disabled
                        className="bg-gray-400 text-white px-5 py-3 rounded-xl"
                      >
                        🔒 Locked
                      </button>
                    )}

                    {/* Quiz */}
                    {quizUnlocked ? (
                      <Link
                        href={`/level1/quiz${lesson.id}`}
                      >
                        <button className="bg-green-700 text-white px-5 py-3 rounded-xl">
                          📝 Quiz
                        </button>
                      </Link>
                    ) : (
                      <button
                        disabled
                        className="bg-gray-400 text-white px-5 py-3 rounded-xl"
                      >
                        🔒 Quiz Locked
                      </button>
                    )}

                  </div>
                </div>
              );
            }
          )}
        </div>

        <div className="bg-white rounded-3xl shadow-lg p-8 mt-10">
          <h2 className="text-3xl font-bold text-center text-red-800 mb-6">
            🎓 Level Completion
          </h2>

          <div className="flex flex-col md:flex-row gap-4">

            {progress === 100 ? (
  <Link href="/level1/final-quiz">
    <button className="bg-blue-700 text-white px-8 py-4 rounded-2xl w-full">
      🎓 Final Quiz
    </button>
  </Link>
) : (
  <button
    disabled
    className="bg-gray-400 text-white px-8 py-4 rounded-2xl w-full cursor-not-allowed"
  >
    🔒 Complete 100% Course First
  </button>
)}

           {localStorage.getItem(
  "level1FinalPassed"
) === "true" ? (
  <Link href="/level1/request-certificate">
    <button className="bg-yellow-600 text-white px-8 py-4 rounded-2xl w-full">
      🏆 Request Certificate
    </button>
  </Link>
) : (
  <button
    disabled
    className="bg-gray-400 text-white px-8 py-4 rounded-2xl w-full cursor-not-allowed"
  >
    🔒 Pass Final Quiz First
  </button>
)}

          </div>
        </div>

      </div>
    </main>
  );
}