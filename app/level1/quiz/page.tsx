"use client";

import { useState } from "react";

export default function QuizPage() {
  const [answers, setAnswers] =
    useState<any>({});

  const [score, setScore] =
    useState<number | null>(null);

  const questions = [
    {
      id: 1,
      question:
        "What is 'Good Morning' in French?",
      options: [
        "Bonsoir",
        "Bonjour",
        "Bonne nuit",
      ],
      correct: "Bonjour",
    },
    {
      id: 2,
      question:
        "How do you say 'Thank you' in English?",
      options: [
        "Hello",
        "Please",
        "Thank you",
      ],
      correct: "Thank you",
    },
    {
      id: 3,
      question:
        "Choose the correct greeting:",
      options: [
        "Good Morning",
        "Table",
        "Chair",
      ],
      correct: "Good Morning",
    },
  ];

  const handleSubmit = () => {
    let total = 0;

    questions.forEach((q) => {
      if (
        answers[q.id] === q.correct
      ) {
        total++;
      }
    });

    setScore(total);

    if (total >= 2) {
      localStorage.setItem(
        "level1Completed",
        "true"
      );
    }
  };

  return (
    <main className="min-h-screen bg-red-50 p-8">
      <div className="bg-white rounded-3xl shadow-xl p-8 max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold text-red-800 text-center">
          Level 1 Quiz
        </h1>

        <p className="text-center text-gray-600 mt-2">
          Answer the questions below
        </p>

        <div className="mt-8 space-y-8">
          {questions.map((q) => (
            <div
              key={q.id}
              className="border rounded-2xl p-6"
            >
              <h2 className="text-xl font-bold text-black">
                {q.question}
              </h2>

              <div className="mt-4 space-y-3">
                {q.options.map(
                  (option) => (
                    <label
                      key={option}
                      className="flex items-center gap-3 text-black"
                    >
                      <input
                        type="radio"
                        name={`question-${q.id}`}
                        value={option}
                        onChange={() =>
                          setAnswers({
                            ...answers,
                            [q.id]:
                              option,
                          })
                        }
                      />

                      {option}
                    </label>
                  )
                )}
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={handleSubmit}
          className="w-full bg-red-700 text-white py-4 rounded-2xl mt-8 font-semibold text-lg"
        >
          Submit Quiz
        </button>

        {score !== null && (
          <div className="mt-8 text-center">
            <h2 className="text-3xl font-bold text-green-600">
              Score: {score}/3
            </h2>

            {score >= 2 ? (
              <p className="text-green-700 font-semibold mt-3">
                Congratulations! You completed Level 1.
              </p>
            ) : (
              <p className="text-red-600 font-semibold mt-3">
                You did not pass. Try again.
              </p>
            )}
          </div>
        )}
      </div>
    </main>
  );
}