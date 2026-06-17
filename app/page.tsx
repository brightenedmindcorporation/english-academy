import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-red-50">
      {/* Header */}
      <header className="bg-red-800 text-white p-5 shadow-md">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">
            Brightened Mind Corporation Academy
          </h1>

          <div className="flex gap-4">
            <Link href="/login">
              <button className="bg-white text-red-800 px-5 py-2 rounded-xl font-semibold cursor-pointer">
                Student Login
              </button>
            </Link>

            <Link href="/register">
              <button className="bg-red-600 border border-white px-5 py-2 rounded-xl font-semibold cursor-pointer">
                Register
              </button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-6xl mx-auto text-center py-24 px-6">
        <h2 className="text-5xl font-bold text-red-900">
          Learn English Professionally
        </h2>

        <p className="text-gray-700 text-xl mt-6">
          Professional English training for individuals and companies.
          Access your courses using your student matricule.
        </p>

        <Link href="/register">
          <button className="mt-8 bg-red-700 text-white px-8 py-4 rounded-2xl text-lg font-semibold hover:scale-105 transition cursor-pointer">
            Start Learning
          </button>
        </Link>
      </section>

      {/* Levels */}
      <section className="max-w-6xl mx-auto py-10 px-6">
        <h3 className="text-3xl font-bold text-center text-red-900 mb-10">
          Our English Levels
        </h3>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white rounded-3xl shadow-lg p-8">
            <h4 className="text-2xl font-bold text-red-800">
              Level 1
            </h4>
            <p className="text-gray-600 mt-4">
              Beginner English: greetings, grammar,
              pronunciation and basic communication.
            </p>
          </div>

          <div className="bg-white rounded-3xl shadow-lg p-8">
            <h4 className="text-2xl font-bold text-red-800">
              Level 2
            </h4>
            <p className="text-gray-600 mt-4">
              Intermediate English: conversations,
              listening, grammar and fluency.
            </p>
          </div>

          <div className="bg-white rounded-3xl shadow-lg p-8">
            <h4 className="text-2xl font-bold text-red-800">
              Level 3
            </h4>
            <p className="text-gray-600 mt-4">
              Advanced & Business English
              for companies and professionals.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}