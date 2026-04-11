"use client";

import Link from "next/link";
import { useQuizStore } from "@/src/lib/quiz-store";
import { motion, AnimatePresence } from "framer-motion";
import quizData from "@/src/data/quiz.json";
import catalogData from "@/data.json";

const navItems = [
  { name: "Home", href: "/" },
  { name: "Quiz", href: "/quiz" },
  { name: "Opleidingen", href: "/opleidingen" },
  { name: "Over ons", href: "/about-us" },
];

function getMaxScoresPerKey() {
  const maxPerKey: Record<string, number> = {};

  quizData.questions.forEach((question) => {
    const maxInQuestion: Record<string, number> = {};
    question.options.forEach((option) => {
      Object.entries(option.scores).forEach(([key, value]) => {
        maxInQuestion[key] = Math.max(maxInQuestion[key] || 0, value);
      });
    });
    Object.entries(maxInQuestion).forEach(([key, value]) => {
      maxPerKey[key] = (maxPerKey[key] || 0) + value;
    });
  });

  return maxPerKey;
}

export default function QuizPage() {
  const { step, currentQuestion, scores, startQuiz, answer, reset } = useQuizStore();

  const totalQuestions = quizData.questions.length;
  const question = quizData.questions[currentQuestion];
  const progress = (currentQuestion / totalQuestions) * 100;
  const isDone = currentQuestion >= totalQuestions;

  const getResults = () => {
    const maxPerKey = getMaxScoresPerKey();

    const keyPercentages: Record<string, number> = {};
    Object.entries(scores).forEach(([key, achieved]) => {
      const max = maxPerKey[key] || 0;
      keyPercentages[key] = max > 0 ? (achieved / max) * 100 : 0;
    });

    return catalogData.programs
      .map((program: any) => {
        const keys = program.scoreKeys || [];
        if (keys.length === 0) {
          return { ...program, matchPercent: 0, matchReason: "" };
        }

        const avgPercent =
          keys.reduce((sum, key) => sum + (keyPercentages[key] || 0), 0) / keys.length;

        const keyScores = keys
          .map((key) => ({ key, percent: keyPercentages[key] || 0 }))
          .sort((a, b) => b.percent - a.percent);
        const topKeys = keyScores.slice(0, 2).map((k) => k.key);
        const reason =
          topKeys.length > 0
            ? `Past goed bij jouw interesse in ${topKeys.join(" en ")}.`
            : "Deze opleiding sluit aan bij jouw profiel.";

        return {
          ...program,
          matchPercent: Math.round(avgPercent),
          matchReason: reason,
        };
      })
      .sort((a: any, b: any) => b.matchPercent - a.matchPercent)
      .slice(0, 3);
  };

  return (
    <main className="min-h-screen bg-[#0D0F14] text-[#F5F7FB]">
      <div className="flex min-h-screen w-full">
        {/* Sidebar */}
        <aside className="hidden w-56 flex-col border-r border-[#2A3345] bg-[#11151D] p-6 md:flex">
          <div className="mb-10">
            <h2 className="text-xl font-semibold">Mijn HBO Keuze</h2>
            <p className="mt-1 text-sm text-[#7E8AA3]">Studiekeuzehulp</p>
          </div>
          <nav className="space-y-2">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="block w-full rounded-xl px-4 py-3 text-left text-sm text-[#A8B3C7] transition hover:bg-[#1B2230] hover:text-[#7DD3FC]"
              >
                {item.name}
              </Link>
            ))}
          </nav>
        </aside>

        {/* Content - gecentreerd */}
        <section className="flex flex-1 items-center justify-center px-6 py-12">
          <div className="w-full max-w-2xl">
            {/* ── START ── */}
            {step === "start" && (
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
              >
                <div className="mb-6 inline-flex rounded-full border border-[#2A3345] bg-[#141821] px-4 py-2 text-sm text-[#7DD3FC]">
                  Studiekeuzehulp
                </div>
                <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
                  Welke HBO-opleiding past bij jou?
                </h1>
                <p className="mt-4 text-lg leading-8 text-[#A8B3C7]">
                  Beantwoord {totalQuestions} korte vragen en ontdek jouw perfecte match.
                </p>
                <div className="mt-10 rounded-3xl border border-[#2A3345] bg-[#141821] p-8 shadow-[0_0_40px_rgba(125,211,252,0.08)]">
                  <p className="mb-6 text-base text-[#A8B3C7]">
                    Beantwoord een paar vragen over jouw interesses, manier van leren en toekomst.
                  </p>
                  <button
                    onClick={startQuiz}
                    className="inline-block rounded-2xl bg-[#7DD3FC] px-6 py-3 font-medium text-[#0D0F14] transition hover:bg-[#38BDF8] active:scale-95"
                  >
                    Start de quiz 🚀
                  </button>
                </div>
              </motion.div>
            )}

            {/* ── QUIZ ── */}
            {step === "quiz" && !isDone && (
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="mb-8">
                  <div className="flex justify-between text-sm text-[#7E8AA3] mb-2">
                    <span>Vraag {currentQuestion + 1} van {totalQuestions}</span>
                    <span>{Math.round(progress)}%</span>
                  </div>
                  <div className="w-full bg-[#1B2230] rounded-full h-1.5">
                    <motion.div
                      className="bg-[#7DD3FC] h-1.5 rounded-full"
                      animate={{ width: `${progress}%` }}
                      transition={{ duration: 0.4 }}
                    />
                  </div>
                </div>

                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentQuestion}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -16 }}
                    transition={{ duration: 0.25 }}
                  >
                    <span className="text-5xl mb-4 block">{question.emoji}</span>
                    <h2 className="text-2xl font-bold tracking-tight mb-6 leading-snug">
                      {question.question}
                    </h2>

                    <div className="flex flex-col gap-3">
                      {question.options.map((option, i) => (
                        <button
                          key={i}
                          onClick={() => answer(option.scores)}
                          className="group flex items-center gap-4 rounded-2xl border border-[#2A3345] bg-[#141821] px-5 py-4 text-left transition hover:border-[#7DD3FC] hover:bg-[#1B2230] hover:shadow-[0_0_20px_rgba(125,211,252,0.06)] active:scale-[0.99]"
                        >
                          <span className="text-3xl group-hover:scale-110 transition-transform">
                            {option.emoji}
                          </span>
                          <div>
                            <div className="font-medium text-[#F5F7FB]">{option.label}</div>
                            <div className="text-sm text-[#7E8AA3]">{option.sub}</div>
                          </div>
                        </button>
                      ))}
                    </div>
                  </motion.div>
                </AnimatePresence>
              </motion.div>
            )}

            {/* ── RESULTATEN ── */}
            {isDone && (
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
              >
                <div className="mb-6 inline-flex rounded-full border border-[#2A3345] bg-[#141821] px-4 py-2 text-sm text-[#7DD3FC]">
                  Jouw resultaten
                </div>
                <h2 className="text-4xl font-bold tracking-tight mb-2">
                  Jouw matches ✨
                </h2>
                <p className="text-[#A8B3C7] mb-8">
                  Op basis van jouw antwoorden passen deze opleidingen het beste bij jou.
                </p>

                <div className="flex flex-col gap-4">
                  {getResults().map((res: any, i: number) => {
                    const medals = ["🥇", "🥈", "🥉"];
                    return (
                      <motion.div
                        key={res.id}
                        initial={{ opacity: 0, x: -16 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.12 }}
                        className="rounded-3xl border border-[#2A3345] bg-[#141821] p-6 shadow-[0_0_40px_rgba(125,211,252,0.05)] hover:border-[#7DD3FC] transition-colors"
                      >
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1">
                            <span className="text-xs text-[#7DD3FC] font-medium uppercase tracking-widest">
                              {res.category}
                            </span>
                            <h3 className="text-xl font-bold mt-1">
                              {medals[i]} {res.name}
                            </h3>
                            <p className="text-sm text-[#7E8AA3] mt-1">
                              {res.school.name} — {res.school.location.city}
                            </p>
                            <p className="text-sm text-[#A8B3C7] mt-3 leading-relaxed">
                              {res.description}
                            </p>
                            <p className="text-sm text-[#7DD3FC] mt-2 italic">
                              {res.matchReason}
                            </p>
                          </div>
                          <div className="flex flex-col items-center justify-center rounded-2xl border border-[#2A3345] bg-[#0D0F14] px-4 py-3 min-w-[72px]">
                            <span className="text-2xl font-bold text-[#7DD3FC]">
                              {res.matchPercent}%
                            </span>
                            <span className="text-xs text-[#7E8AA3] mt-0.5">match</span>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>

                <button
                  onClick={reset}
                  className="mt-8 w-full rounded-2xl border border-[#2A3345] bg-[#141821] px-6 py-3 text-sm text-[#A8B3C7] transition hover:border-[#7DD3FC] hover:text-[#7DD3FC]"
                >
                  Opnieuw proberen 🔄
                </button>
              </motion.div>
            )}
          </div>
        </section>
      </div>
    </main>
  );
}