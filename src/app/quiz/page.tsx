"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useQuizStore } from "@/src/lib/quiz-store";
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
        if (typeof value === "number") {
          maxInQuestion[key] = Math.max(maxInQuestion[key] || 0, value);
        }
      });
    });

    Object.entries(maxInQuestion).forEach(([key, value]) => {
      maxPerKey[key] = (maxPerKey[key] || 0) + value;
    });
  });

  return maxPerKey;
}

function normalizeScores(
  scores: Record<string, number | undefined>
): Record<string, number> {
  return Object.fromEntries(
    Object.entries(scores).filter(([, value]) => typeof value === "number")
  ) as Record<string, number>;
}

export default function QuizPage() {
  const pathname = usePathname();

  const { step, currentQuestion, scores, startQuiz, answer, reset } =
    useQuizStore();

  const totalQuestions = quizData.questions.length;
  const isDone = currentQuestion >= totalQuestions;
  const question = !isDone ? quizData.questions[currentQuestion] : null;
  const progress =
    totalQuestions > 0 ? (currentQuestion / totalQuestions) * 100 : 0;

  const getResults = () => {
    const maxPerKey = getMaxScoresPerKey();
    const keyPercentages: Record<string, number> = {};

    Object.entries(scores).forEach(([key, achieved]) => {
      const max = maxPerKey[key] || 0;
      keyPercentages[key] = max > 0 ? (achieved / max) * 100 : 0;
    });

    return (catalogData.programs as any[])
      .map((program: any) => {
        const keys = program.scoreKeys || [];

        if (keys.length === 0) {
          return { ...program, matchPercent: 0, matchReason: "" };
        }

        const avgPercent =
          keys.reduce(
            (sum: number, key: string) => sum + (keyPercentages[key] || 0),
            0
          ) / keys.length;

        const keyScores = keys
          .map((key: string) => ({
            key,
            percent: keyPercentages[key] || 0,
          }))
          .sort(
            (a: { percent: number }, b: { percent: number }) =>
              b.percent - a.percent
          );

        const topKeys = keyScores.slice(0, 2).map((item) => item.key);

        const reason =
          topKeys.length > 0
            ? `Past goed bij jouw interesse in ${topKeys.join(" en ")}.`
            : "Deze opleiding sluit goed aan bij jouw profiel.";

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
    <main className="min-h-screen bg-[#F5EBDD] text-[#1E3550]">
      <header className="border-b border-[#D8CBB8] bg-[#F5EBDD]/95 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#5C7A96]">
              MijnHBOKeuze
            </p>
            <p className="mt-1 text-sm text-[#6F7F8F]">Studiekeuzehulp</p>
          </div>

          <nav className="hidden items-center gap-2 md:flex">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`rounded-2xl px-4 py-2.5 text-sm font-medium transition-all duration-300 ${
                  pathname === item.href
                    ? "bg-[#DCE6F0] text-[#1E3550]"
                    : "text-[#5E6F80] hover:bg-[#EADFD0] hover:text-[#1E3550]"
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          <Link
            href="/opleidingen"
            className="rounded-2xl bg-[#2F5D87] px-5 py-2.5 text-sm font-semibold text-[#F5EBDD] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#264D71]"
          >
            Opleidingen
          </Link>
        </div>
      </header>

      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(47,93,135,0.10),transparent_32%),radial-gradient(circle_at_bottom_right,rgba(127,168,204,0.14),transparent_30%)]" />

        <div className="relative mx-auto max-w-4xl px-6 py-16 md:py-20">
          {step === "start" && (
            <div className="text-center">
              <div className="inline-flex rounded-full border border-[#CFC0AA] bg-[#EFE3D2] px-4 py-2 text-sm font-semibold text-[#5C7A96]">
                Persoonlijke studiekeuzequiz
              </div>

              <h1 className="mx-auto mt-6 max-w-3xl text-4xl font-bold leading-tight md:text-6xl">
                Ontdek jouw richting binnen het hbo
              </h1>

              <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-[#5F6F80]">
                Beantwoord {totalQuestions} korte vragen en ontdek welke
                opleidingen goed aansluiten bij jouw interesses, manier van
                leren en toekomstplannen.
              </p>

              <div className="mx-auto mt-12 grid max-w-3xl gap-4 md:grid-cols-3">
                <div className="rounded-[24px] border border-[#D8CBB8] bg-[#F1E6D8] p-5 text-left shadow-[0_10px_30px_rgba(47,93,135,0.05)]">
                  <p className="text-sm text-[#6E8092]">Aantal vragen</p>
                  <p className="mt-2 text-lg font-semibold text-[#1E3550]">
                    {totalQuestions} vragen
                  </p>
                </div>

                <div className="rounded-[24px] border border-[#D8CBB8] bg-[#F1E6D8] p-5 text-left shadow-[0_10px_30px_rgba(47,93,135,0.05)]">
                  <p className="text-sm text-[#6E8092]">Doel</p>
                  <p className="mt-2 text-lg font-semibold text-[#1E3550]">
                    Passende richtingen
                  </p>
                </div>

                <div className="rounded-[24px] border border-[#D8CBB8] bg-[#F1E6D8] p-5 text-left shadow-[0_10px_30px_rgba(47,93,135,0.05)]">
                  <p className="text-sm text-[#6E8092]">Resultaat</p>
                  <p className="mt-2 text-lg font-semibold text-[#1E3550]">
                    Jouw top matches
                  </p>
                </div>
              </div>

              <div className="mx-auto mt-12 max-w-2xl rounded-[32px] border border-[#D8CBB8] bg-[linear-gradient(135deg,rgba(220,230,240,0.9),rgba(239,227,210,0.95))] p-8 shadow-[0_16px_40px_rgba(47,93,135,0.06)] md:p-10">
                <p className="text-base leading-8 text-[#607181]">
                  De quiz helpt je om snel te ontdekken welke opleidingen goed
                  kunnen passen. Daarna kun je verder kijken naar opleidingen en
                  extra informatie.
                </p>

                <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
                  <button
                    onClick={startQuiz}
                    className="inline-flex items-center rounded-2xl bg-[#2F5D87] px-7 py-3.5 font-semibold text-[#F5EBDD] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#264D71]"
                  >
                    Start de quiz
                  </button>

                  <Link
                    href="/opleidingen"
                    className="inline-flex items-center rounded-2xl border border-[#CFBEA8] bg-[#F1E6D8] px-7 py-3.5 font-semibold text-[#1E3550] transition-all duration-300 hover:bg-[#E9DDCC]"
                  >
                    Bekijk opleidingen
                  </Link>
                </div>
              </div>
            </div>
          )}

          {step === "quiz" && !isDone && question && (
            <div className="mx-auto max-w-3xl">
              <div className="mb-8 rounded-[24px] border border-[#D8CBB8] bg-[#F1E6D8] p-5 shadow-[0_10px_25px_rgba(47,93,135,0.04)]">
                <div className="mb-3 flex items-center justify-between text-sm text-[#6E8092]">
                  <span>
                    Vraag {currentQuestion + 1} van {totalQuestions}
                  </span>
                  <span>{Math.round(progress)}%</span>
                </div>

                <div className="h-2 w-full rounded-full bg-[#E3D6C5]">
                  <div
                    className="h-2 rounded-full bg-[#2F5D87] transition-all duration-300"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>

              <div
                key={currentQuestion}
                className="rounded-[32px] border border-[#D8CBB8] bg-[#F5EBDD] p-8 shadow-[0_16px_40px_rgba(47,93,135,0.06)] md:p-10"
              >
                <span className="mb-4 block text-5xl">{question.emoji}</span>

                <h2 className="text-2xl font-bold leading-snug md:text-3xl">
                  {question.question}
                </h2>

                <p className="mt-3 text-base leading-8 text-[#607181]">
                  Kies het antwoord dat het beste bij jou past.
                </p>

                <div className="mt-8 flex flex-col gap-4">
                  {question.options.map((option, index) => (
                    <button
                      key={index}
                      onClick={() =>
                        answer(
                          normalizeScores(
                            option.scores as Record<string, number | undefined>
                          )
                        )
                      }
                      className="group flex items-center gap-4 rounded-[24px] border border-[#D8CBB8] bg-[#F1E6D8] px-5 py-5 text-left shadow-[0_8px_20px_rgba(47,93,135,0.03)] transition-all duration-300 hover:-translate-y-0.5 hover:border-[#A9BED4] hover:bg-[#EEE2D2]"
                    >
                      <span className="text-3xl transition-transform duration-300 group-hover:scale-110">
                        {option.emoji}
                      </span>

                      <div>
                        <div className="font-semibold text-[#1E3550]">
                          {option.label}
                        </div>
                        <div className="mt-1 text-sm text-[#6E8092]">
                          {option.sub}
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {isDone && (
            <div className="mx-auto max-w-4xl">
              <div className="text-center">
                <div className="inline-flex rounded-full border border-[#CFC0AA] bg-[#EFE3D2] px-4 py-2 text-sm font-semibold text-[#5C7A96]">
                  Jouw resultaten
                </div>

                <h2 className="mt-6 text-4xl font-bold md:text-5xl">
                  Dit zijn jouw beste matches
                </h2>

                <p className="mx-auto mt-4 max-w-2xl text-lg leading-8 text-[#607181]">
                  Op basis van jouw antwoorden passen deze opleidingen het beste
                  bij jouw profiel en interesses.
                </p>
              </div>

              <div className="mt-10 flex flex-col gap-5">
                {getResults().map((res: any, index: number) => {
                  const medals = ["🥇", "🥈", "🥉"];

                  return (
                    <div
                      key={res.id}
                      className="rounded-[30px] border border-[#D8CBB8] bg-[#F1E6D8] p-6 shadow-[0_12px_30px_rgba(47,93,135,0.05)]"
                    >
                      <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
                        <div className="flex-1">
                          <span className="text-xs font-semibold uppercase tracking-[0.18em] text-[#5C7A96]">
                            {res.category}
                          </span>

                          <h3 className="mt-2 text-2xl font-bold text-[#1E3550]">
                            {medals[index]} {res.name}
                          </h3>

                          <p className="mt-2 text-sm text-[#6E8092]">
                            {res.school.name} — {res.school.location.city}
                          </p>

                          <p className="mt-4 leading-8 text-[#607181]">
                            {res.description}
                          </p>

                          <p className="mt-3 font-medium italic text-[#2F5D87]">
                            {res.matchReason}
                          </p>
                        </div>

                        <div className="flex min-w-[96px] flex-col items-center justify-center rounded-[24px] border border-[#CFC0AA] bg-[#EFE3D2] px-5 py-4">
                          <span className="text-3xl font-bold text-[#2F5D87]">
                            {res.matchPercent}%
                          </span>
                          <span className="mt-1 text-xs uppercase tracking-[0.15em] text-[#6E8092]">
                            match
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
                <button
                  onClick={reset}
                  className="inline-flex items-center rounded-2xl bg-[#2F5D87] px-7 py-3.5 font-semibold text-[#F5EBDD] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#264D71]"
                >
                  Opnieuw proberen
                </button>

                <Link
                  href="/opleidingen"
                  className="inline-flex items-center rounded-2xl border border-[#CFBEA8] bg-[#F1E6D8] px-7 py-3.5 font-semibold text-[#1E3550] transition-all duration-300 hover:bg-[#E9DDCC]"
                >
                  Bekijk opleidingen
                </Link>
              </div>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}