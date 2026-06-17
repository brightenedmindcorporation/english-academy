"use client";

import Link from "next/link";
import SpeakingExercise from "@/components/SpeakingExercise";

export default function Lesson1Page() {

  const speakText = (
  text: string
) => {
  window.speechSynthesis.cancel();

  const speech =
    new SpeechSynthesisUtterance(
      text
    );

  speech.lang =
    "en-US";

  speech.rate =
    0.9;

  speech.pitch =
    1;

  speech.volume =
    1;

  window.speechSynthesis.speak(
    speech
  );
};

const stopAudio =
  () => {
    window.speechSynthesis.cancel();
  };
  return (
    <main className="min-h-screen bg-red-50 p-8">
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <div className="bg-red-800 text-white rounded-3xl p-8 shadow-xl">
          <h1 className="text-4xl font-bold">
            Lesson 1: Greetings and Introductions
          </h1>

          <p className="mt-2 text-red-100">
            Learn greetings and how to introduce yourself in English.
          </p>
        </div>

        {/* Lesson */}
        <div className="bg-white rounded-3xl shadow-lg p-8 mt-8">
          <h2 className="text-2xl font-bold text-red-800">
            📘 Lesson
          </h2>

          <div className="text-black mt-4 space-y-3">
            <p>
              Greetings are important when meeting people.
            </p>

            <p>
              Common greetings:
            </p>

            <p>Hello / Hi</p>
            <p>Good morning</p>
            <p>Good afternoon</p>
            <p>Good evening</p>

            <p>INTRODUCING YOURSELF</p>
    
            <p>My name is...</p>
            <p>I am... years old</p>
            <p>I live in...</p>
            <p>I am a student</p>
            <p>Nice to meet you</p>

          </div>
          <div className="mt-6 flex gap-4">

  <button
    onClick={() =>
      speakText(`
Greetings are important when meeting people.

Common greetings:
Hello.
Hi.
Good morning.
Good afternoon.
Good evening.

Introducing yourself.

My name is.
I am years old.
I live in.
I am a student.
Nice to meet you.
      `)
    }
    className="bg-blue-700 text-white px-6 py-3 rounded-xl"
  >
    🔊 Listen Lesson
  </button>

  <button
    onClick={stopAudio}
    className="bg-red-600 text-white px-6 py-3 rounded-xl"
  >
    ⏹ Stop
  </button>

</div>
        </div>

        {/* Video */}
        <div className="bg-white rounded-3xl shadow-lg p-8 mt-8">
          <h2 className="text-2xl font-bold text-red-800">
            ▶ Video
          </h2>

          <p className="text-black mt-3">
            How to Introduce Yourself in English
          </p>
        </div>

        {/* Audio */}
        <div className="bg-white rounded-3xl shadow-lg p-8 mt-8">
          <h2 className="text-2xl font-bold text-red-800">
            🎧 Audio Conversation
          </h2>

          <p className="text-black mt-3">
            Listen and repeat the conversation.
          </p>

          <audio controls className="w-full mt-4">
            <source
              src="/audio/lesson1.mp3"
              type="audio/mpeg"
            />
          </audio>
        </div>

        {/* Reading Text */}
        <div className="bg-white rounded-3xl shadow-lg p-8 mt-8">
          <h2 className="text-2xl font-bold text-red-800">
            📄 Reading Text
          </h2>

          <div className="text-black mt-4">
            <p>
              Hello!
            <p>My name is Sarah. I am a 12 years old. I live in Kolwezi. I am a student</p>
            <p>Every morning, I say “Good morning” to my teachers and friends. I like meeting new people. When I meet someone for the first time, I say: “Hello, my name is Sarah. Nice to meet you.”</p>
            <p>I am friendly and happy to learn English.</p>
            </p>
          </div>
          <div className="mt-6 flex gap-4">

  <button
    onClick={() =>
      speakText(`
Hello.
My name is Sarah.
I am 12 years old. I live in Kolwezi. I am a student.

Every morning, I say good morning to my teachers and friends.

I like meeting new people.

When I meet someone for the first time,
I say: Hello, my name is Sarah. Nice to meet you.

I am friendly and happy to learn English.
      `)
    }
    className="bg-blue-700 text-white px-6 py-3 rounded-xl"
  >
    🔊 Listen Reading
  </button>

  <button
    onClick={stopAudio}
    className="bg-red-600 text-white px-6 py-3 rounded-xl"
  >
    ⏹ Stop
  </button>

</div>
        </div>

        {/* Exercises */}
        <div className="bg-white rounded-3xl shadow-lg p-8 mt-8">
          <h2 className="text-2xl font-bold text-red-800">
            🎤 Exercises
          </h2>
          <div className="text-black mt-4">
          <p>Complete the sentences:</p>
          </div>

          <ul className="list-disc ml-6 text-black mt-4">
            <li>Hello, my name is ...</li>
            <li>I am ... years old</li>
            <li>I live in ...</li>
            <li>I am a ...</li>
          </ul>
        </div>

        {/* Speaking Topic */}
        <div className="bg-white rounded-3xl shadow-lg p-8 mt-8">
          <h2 className="text-2xl font-bold text-red-800">
            🗣 Speaking Topic
          </h2>

          <p className="text-black mt-4">
            First time in the Democratic Republic of the Congo
          </p>
        </div>

        {/* Quiz */}
        <div className="text-center mt-10">
          <Link href="/level1/quiz1">
            <button className="bg-green-600 text-white px-8 py-4 rounded-2xl">
              📝 Take Quiz
            </button>
          </Link>
        </div>

        </div>
    </main>
  );
}