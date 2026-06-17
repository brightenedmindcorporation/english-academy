"use client";

import { useState, useEffect } from "react";

export default function Quiz1Page() {
  const questions = [
    {
      question:
        "How do you greet someone?",
      options: [
        "Hello",
        "Chair",
        "Water",
      ],
      answer: "Hello",
    },
    {
      question:
        "How do you introduce yourself?",
      options: [
        "My name is John",
        "Good night",
        "Bank",
      ],
      answer:
        "My name is John",
    },
    {
      question:
        "What is the girl’s name?",
      options: [
        "John",
        "Sarah",
        "Joyce",
      ],
      answer: "Sarah",
    },
    {
      question:
        "How old is Sarah?",
      options: [
        "20 years old",
        "13 years old",
        "12 years old",
      ],
      answer:
        "12 years old",
    },
    {
      question:
        "Where does Sarah live?",
      options: [
        "Kolwezi",
        "Kinshasa",
        "Paris",
      ],
      answer:
        "Kolwezi",
    },
    {
      question:
        "Choose an introduction:",
      options: [
        "My name is Sarah",
        "School is big",
        "Blue chair",
      ],
      answer:
        "My name is Sarah",
    },
    {
      question:
        "What does Sarah say in the morning?",
      options: [
        "Bye",
        "Good morning",
        "Hello",
      ],
      answer: "Good morning",
    },
    {
      question:
        "Choose a greeting word:",
      options: [
        "Hello",
        "Chicken",
        "Monday",
      ],
      answer: "Hello",
    },
    {
      question:
        "What does she say when she meets someone new?",
      options: [
        "Nice to meet you",
        "Hello, my name is Sarah. Nice to meet you.",
        "Hello, welcome",
      ],
      answer:
        "Hello, my name is Sarah. Nice to meet you.",
    },
    {
      question:
        "What do we use for introductions?",
      options: [
        "My name is...",
        "Turn left",
        "I eat rice",
      ],
      answer:
        "My name is...",
    },
  ];

  const [
    answers,
    setAnswers,
  ] = useState<string[]>(
    Array(
      questions.length
    ).fill("")
  );

  const [
    submitted,
    setSubmitted,
  ] = useState(false);

  const [
    score,
    setScore,
  ] = useState(0);

  useEffect(() => {
    const alreadyDone =
      localStorage.getItem(
        "quiz1Submitted"
      );

    if (
      alreadyDone === "true"
    ) {
      setSubmitted(true);

      const savedScore =
        localStorage.getItem(
          "quiz1Score"
        );

      if (savedScore) {
        setScore(
          Number(savedScore)
        );
      }
    }
  }, []);

  const handleSelect = (
    questionIndex: number,
    option: string
  ) => {
    if (submitted) return;

    const updated =
      [...answers];

    updated[
      questionIndex
    ] = option;

    setAnswers(updated);
  };

  const submitQuiz =
    () => {
      if (submitted)
        return;

      const finalScore =
        answers.filter(
          (
            answer,
            index
          ) =>
            answer ===
            questions[
              index
            ].answer
        ).length;

      setScore(
        finalScore
      );

      setSubmitted(true);

      const firstAttempt =
  localStorage.getItem(
    "quiz1FirstAttempt"
  );

if (!firstAttempt) {
  localStorage.setItem(
    "quiz1FirstAttempt",
    "true"
  );

  localStorage.setItem(
    "quiz1Score",
    finalScore.toString()
  );

  if (finalScore >= 7) {
    localStorage.setItem(
      "quiz1Passed",
      "true"
    );
  }
}

      if (
        finalScore >= 7
      ) {
        localStorage.setItem(
          "quiz1Passed",
          "true"
        );
      }
    };

  return (
    <main className="min-h-screen bg-red-50 p-8">
      <div className="max-w-5xl mx-auto bg-white rounded-3xl shadow-xl p-8">

        <h1 className="text-4xl font-bold text-red-800 mb-4">
          Quiz 1
        </h1>

        <p className="text-black mb-8">
          Greetings and
          Introductions
        </p>

        {questions.map(
          (q, index) => (
            <div
              key={index}
              className="mb-8 border-b pb-5"
            >
              <h2 className="font-bold text-lg text-black mb-4">
                {index + 1}.{" "}
                {
                  q.question
                }
              </h2>

              <div className="space-y-3">
                {q.options.map(
                  (
                    option
                  ) => {
                    const isCorrect =
                      option ===
                      q.answer;

                    const isSelected =
                      answers[
                        index
                      ] ===
                      option;

                    return (
                      <button
                        key={
                          option
                        }
                        disabled={
                          submitted
                        }
                        onClick={() =>
                          handleSelect(
                            index,
                            option
                          )
                        }
                        className={`w-full text-left px-4 py-3 rounded-xl border
                        ${
                          submitted
                            ? isCorrect
                              ? "bg-green-600 text-white"
                              : isSelected
                              ? "bg-red-600 text-white"
                              : "bg-gray-100 text-black"
                            : isSelected
                            ? "bg-blue-600 text-white"
                            : "bg-gray-100 text-black"
                        }`}
                      >
                        {submitted &&
                        isCorrect
                          ? "✓ "
                          : ""}

                        {submitted &&
                        isSelected &&
                        !isCorrect
                          ? "✗ "
                          : ""}

                        {
                          option
                        }
                      </button>
                    );
                  }
                )}
              </div>
            </div>
          )
        )}

        {!submitted ? (
          <button
            onClick={
              submitQuiz
            }
            className="bg-green-600 text-white px-8 py-4 rounded-2xl"
          >
            Submit Quiz
          </button>
        ) : (
          <div className="mt-8">
            <h2 className="text-3xl font-bold text-green-700">
              Score:{" "}
              {score}/10
            </h2>

            <p className="text-black mt-2">
              {score >= 7
                ? "✅ Passed"
                : "❌ Failed"}
            </p>

           <div className="mt-4 flex gap-4">

  <button
    onClick={() => {
      setAnswers(
        Array(
          questions.length
        ).fill("")
      );

      setSubmitted(false);
    }}
    className="bg-blue-700 text-white px-6 py-3 rounded-xl"
  >
    🔄 Restart Quiz
  </button>

  <p className="text-red-700 font-bold mt-3">
    Only the first attempt is recorded.
  </p>

</div>
          </div>
        )}
      </div>
    </main>
  );
}