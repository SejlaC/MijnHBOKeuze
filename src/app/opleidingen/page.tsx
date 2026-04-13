"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState, type ReactNode } from "react";
import catalogData from "@/data.json";

const navItems = [
  { name: "Home", href: "/" },
  { name: "Quiz", href: "/quiz" },
  { name: "Opleidingen", href: "/opleidingen" },
  { name: "Over ons", href: "/about-us" },
];

type SchoolLocation = {
  city?: string;
  address?: string;
};

type SchoolInfo = {
  name?: string;
  image?: string;
  website?: string;
  location?: SchoolLocation;
};

type Program = {
  id?: string | number;
  name: string;
  category?: string;
  description?: string;
  image?: string;
  scoreKeys?: string[];
  duration?: string;
  degree?: string;
  language?: string;
  level?: string;
  school?: SchoolInfo;
};

type RevealProps = {
  children: ReactNode;
  delay?: number;
};

type ProgramCardProps = {
  program: Program;
  onOpen: () => void;
};

function Reveal({ children, delay = 0 }: RevealProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(node);
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(node);

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`transform-gpu transition-all duration-700 ease-out ${
        visible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

function getProgramImage(program: Program) {
  if (program.image) return program.image;
  if (program.school?.image) return program.school.image;

  const key = program.name.toLowerCase().trim();

  const imageMap: Record<string, string> = {
    "hbo-ict": "/images/hbo-ict.jpg",
    "cmd": "/images/cmd.jpg",
    "communication & multimedia design": "/images/cmd.jpg",
    "creative business": "/images/creative-business.jpg",
    "software engineering": "/images/software-engineering.jpg",
  };

  return imageMap[key] ?? null;
}

function getThemeLabels(program: Program) {
  const labelMap: Record<string, string> = {
    ict: "ICT",
    techniek: "Techniek",
    cmd: "Design",
    kunst: "Creativiteit",
    design: "Design",
    zorg: "Zorg",
    sociaal: "Sociaal",
    business: "Business",
    finance: "Finance",
    data: "Data",
  };

  const labels = (program.scoreKeys || [])
    .map((key) => labelMap[key] || key)
    .filter(Boolean);

  if (labels.length > 0) {
    return Array.from(new Set(labels)).slice(0, 4);
  }

  if (program.category) {
    return [program.category];
  }

  return ["Hbo-opleiding"];
}

function getLearningPoints(program: Program) {
  const lower = program.name.toLowerCase();

  if (lower.includes("ict") || lower.includes("software")) {
    return [
      "Je leert werken met software, systemen en digitale oplossingen.",
      "Je ontwikkelt technische en analytische vaardigheden.",
      "Je werkt aan projecten waarin je samen digitale producten bouwt.",
    ];
  }

  if (
    lower.includes("cmd") ||
    lower.includes("design") ||
    lower.includes("multimedia")
  ) {
    return [
      "Je leert digitale producten ontwerpen die goed werken voor gebruikers.",
      "Je combineert creativiteit met conceptontwikkeling en onderzoek.",
      "Je werkt aan interfaces, media en interactieve oplossingen.",
    ];
  }

  if (lower.includes("business") || lower.includes("communicatie")) {
    return [
      "Je leert werken aan communicatie, media en creatieve concepten.",
      "Je verdiept je in doelgroepen, content en strategie.",
      "Je werkt aan projecten waarin presenteren en samenwerken belangrijk zijn.",
    ];
  }

  return [
    "Je ontwikkelt kennis en vaardigheden binnen het vakgebied.",
    "Je werkt aan praktijkgerichte opdrachten en projecten.",
    "Je leert samenwerken, onderzoeken en presenteren op hbo-niveau.",
  ];
}

function getFitPoints(program: Program) {
  const lower = program.name.toLowerCase();

  if (lower.includes("ict") || lower.includes("software")) {
    return [
      "Je houdt van techniek, logica en digitale toepassingen.",
      "Je vindt het leuk om problemen op te lossen.",
      "Je wilt bouwen aan software of systemen.",
    ];
  }

  if (
    lower.includes("cmd") ||
    lower.includes("design") ||
    lower.includes("multimedia")
  ) {
    return [
      "Je bent creatief en visueel ingesteld.",
      "Je vindt gebruiksvriendelijkheid en vormgeving belangrijk.",
      "Je wilt digitale media combineren met ontwerp.",
    ];
  }

  if (lower.includes("business") || lower.includes("communicatie")) {
    return [
      "Je houdt van media, communicatie en creatieve ideeën.",
      "Je bent sociaal en werkt graag met doelgroepen en content.",
      "Je vindt samenwerken en presenteren interessant.",
    ];
  }

  return [
    "Je wilt je verder ontwikkelen op hbo-niveau.",
    "Je vindt het leuk om praktijk en theorie te combineren.",
    "Je zoekt een opleiding die aansluit bij jouw interesses.",
  ];
}

function ProgramCard({ program, onOpen }: ProgramCardProps) {
  const imageSrc = getProgramImage(program);
  const themes = getThemeLabels(program);

  return (
    <article className="group overflow-hidden rounded-[28px] border border-[#D8CBB8] bg-[#F1E6D8] shadow-[0_12px_30px_rgba(47,93,135,0.05)] transition-all duration-300 hover:-translate-y-1 hover:bg-[#EEE2D2]">
      <div className="relative h-56 overflow-hidden border-b border-[#D8CBB8]">
        {imageSrc ? (
          <Image
            src={imageSrc}
            alt={program.school?.name || program.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          />
        ) : (
          <div className="flex h-full items-center justify-center bg-[linear-gradient(135deg,#DCE6F0,#EFE3D2)] px-6 text-center">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#5C7A96]">
                Schoolbeeld
              </p>
              <p className="mt-2 text-xl font-bold text-[#1E3550]">
                {program.school?.name || "Opleiding"}
              </p>
            </div>
          </div>
        )}

        <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(30,53,80,0.72),rgba(30,53,80,0.08))]" />

        <div className="absolute bottom-5 left-5 right-5">
          <p className="text-sm font-medium text-[#F5EBDD]">
            {program.category || "Hbo-opleiding"}
          </p>
          <h3 className="mt-1 text-2xl font-bold text-[#F5EBDD]">
            {program.name}
          </h3>
        </div>
      </div>

      <div className="p-6">
        <p className="text-sm text-[#6E8092]">
          {program.school?.name || "School onbekend"}
          {program.school?.location?.city
            ? ` — ${program.school.location.city}`
            : ""}
        </p>

        <div className="mt-4 flex flex-wrap gap-2">
          {themes.map((theme) => (
            <span
              key={theme}
              className="rounded-full border border-[#CFBEA8] bg-[#EFE3D2] px-3 py-1 text-xs font-semibold text-[#5C7A96]"
            >
              {theme}
            </span>
          ))}
        </div>

        <p className="mt-5 line-clamp-4 leading-8 text-[#607181]">
          {program.description ||
            "Bekijk meer informatie over deze opleiding, de school en wat je binnen deze richting kunt verwachten."}
        </p>

        <button
          type="button"
          onClick={onOpen}
          className="mt-6 inline-flex items-center rounded-2xl bg-[#2F5D87] px-5 py-3 font-semibold text-[#F5EBDD] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#264D71]"
        >
          Bekijk details
        </button>
      </div>
    </article>
  );
}

function ProgramModal({
  programs,
  currentIndex,
  onClose,
  onPrev,
  onNext,
}: {
  programs: Program[];
  currentIndex: number | null;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}) {
  useEffect(() => {
    if (currentIndex === null) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
      if (event.key === "ArrowLeft") onPrev();
      if (event.key === "ArrowRight") onNext();
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [currentIndex, onClose, onPrev, onNext]);

  if (currentIndex === null) return null;

  const program = programs[currentIndex];
  const imageSrc = getProgramImage(program);
  const themes = getThemeLabels(program);
  const learningPoints = getLearningPoints(program);
  const fitPoints = getFitPoints(program);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#1E3550]/30 p-4 backdrop-blur-sm">
      <div
        className="absolute inset-0"
        onClick={onClose}
      />

      <div className="relative z-10 max-h-[92vh] w-full max-w-6xl overflow-hidden rounded-[32px] border border-[#D8CBB8] bg-[#F5EBDD] shadow-[0_20px_60px_rgba(47,93,135,0.18)]">
        <div className="flex items-center justify-between border-b border-[#D8CBB8] bg-[#EFE3D2] px-5 py-4">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onPrev}
              className="flex h-11 w-11 items-center justify-center rounded-2xl border border-[#CFBEA8] bg-[#F5EBDD] text-[#1E3550] transition hover:bg-[#E9DDCC]"
              aria-label="Vorige opleiding"
            >
              ←
            </button>

            <button
              type="button"
              onClick={onNext}
              className="flex h-11 w-11 items-center justify-center rounded-2xl border border-[#CFBEA8] bg-[#F5EBDD] text-[#1E3550] transition hover:bg-[#E9DDCC]"
              aria-label="Volgende opleiding"
            >
              →
            </button>

            <span className="text-sm font-medium text-[#6E8092]">
              {currentIndex + 1} / {programs.length}
            </span>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="flex h-11 w-11 items-center justify-center rounded-2xl border border-[#CFBEA8] bg-[#F5EBDD] text-[#1E3550] transition hover:bg-[#E9DDCC]"
            aria-label="Sluiten"
          >
            ✕
          </button>
        </div>

        <div className="max-h-[calc(92vh-76px)] overflow-y-auto">
          <div className="grid lg:grid-cols-[1.02fr_1fr]">
            <div className="relative min-h-[320px] border-b border-[#D8CBB8] lg:min-h-full lg:border-b-0 lg:border-r">
              {imageSrc ? (
                <Image
                  src={imageSrc}
                  alt={program.school?.name || program.name}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="flex h-full min-h-[320px] items-center justify-center bg-[linear-gradient(135deg,#DCE6F0,#EFE3D2)] px-8 text-center">
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#5C7A96]">
                      Schoolbeeld
                    </p>
                    <p className="mt-3 text-2xl font-bold text-[#1E3550]">
                      {program.school?.name || program.name}
                    </p>
                  </div>
                </div>
              )}

              <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(30,53,80,0.70),rgba(30,53,80,0.08))]" />

              <div className="absolute bottom-6 left-6 right-6">
                <span className="inline-flex rounded-full border border-[#F5EBDD]/20 bg-[#F5EBDD]/15 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-[#F5EBDD]">
                  {program.category || "Hbo-opleiding"}
                </span>

                <h2 className="mt-4 text-3xl font-bold text-[#F5EBDD] md:text-4xl">
                  {program.name}
                </h2>

                <p className="mt-3 text-sm text-[#F1E6D8]">
                  {program.school?.name || "School onbekend"}
                  {program.school?.location?.city
                    ? ` — ${program.school.location.city}`
                    : ""}
                </p>
              </div>
            </div>

            <div className="p-6 md:p-8">
              <div className="flex flex-wrap gap-2">
                {themes.map((theme) => (
                  <span
                    key={theme}
                    className="rounded-full border border-[#CFBEA8] bg-[#EFE3D2] px-3 py-1 text-xs font-semibold text-[#5C7A96]"
                  >
                    {theme}
                  </span>
                ))}
              </div>

              <p className="mt-6 text-base leading-8 text-[#607181]">
                {program.description ||
                  "Deze opleiding helpt je om verder te ontdekken welke richting bij jou past en wat je op hbo-niveau kunt verwachten."}
              </p>

              <div className="mt-8 grid gap-4 md:grid-cols-2">
                <div className="rounded-[24px] border border-[#D8CBB8] bg-[#F1E6D8] p-5">
                  <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#6A88A3]">
                    Opleidingsinformatie
                  </p>
                  <div className="mt-4 space-y-3 text-[#607181]">
                    <p>
                      <span className="font-semibold text-[#1E3550]">
                        Niveau:
                      </span>{" "}
                      {program.level || program.degree || "Hbo bachelor"}
                    </p>
                    <p>
                      <span className="font-semibold text-[#1E3550]">
                        Duur:
                      </span>{" "}
                      {program.duration || "Meestal 4 jaar"}
                    </p>
                    <p>
                      <span className="font-semibold text-[#1E3550]">
                        Taal:
                      </span>{" "}
                      {program.language || "Nederlands"}
                    </p>
                  </div>
                </div>

                <div className="rounded-[24px] border border-[#D8CBB8] bg-[#F1E6D8] p-5">
                  <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#6A88A3]">
                    Schoolinformatie
                  </p>
                  <div className="mt-4 space-y-3 text-[#607181]">
                    <p>
                      <span className="font-semibold text-[#1E3550]">
                        School:
                      </span>{" "}
                      {program.school?.name || "Onbekend"}
                    </p>
                    <p>
                      <span className="font-semibold text-[#1E3550]">
                        Plaats:
                      </span>{" "}
                      {program.school?.location?.city || "Onbekend"}
                    </p>
                    <p>
                      <span className="font-semibold text-[#1E3550]">
                        Adres:
                      </span>{" "}
                      {program.school?.location?.address || "Niet ingevuld"}
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-6 rounded-[24px] border border-[#D8CBB8] bg-[#F1E6D8] p-5">
                <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#6A88A3]">
                  Wat kun je verwachten?
                </p>

                <div className="mt-4 space-y-3">
                  {learningPoints.map((item) => (
                    <div key={item} className="flex gap-3">
                      <span className="mt-2 h-2.5 w-2.5 rounded-full bg-[#2F5D87]" />
                      <p className="leading-7 text-[#607181]">{item}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-6 rounded-[24px] border border-[#D8CBB8] bg-[#F1E6D8] p-5">
                <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#6A88A3]">
                  Past goed bij jou als...
                </p>

                <div className="mt-4 space-y-3">
                  {fitPoints.map((item) => (
                    <div key={item} className="flex gap-3">
                      <span className="mt-2 h-2.5 w-2.5 rounded-full bg-[#6A88A3]" />
                      <p className="leading-7 text-[#607181]">{item}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-8 flex flex-wrap gap-4">
                {program.school?.website && (
                  <a
                    href={program.school.website}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center rounded-2xl bg-[#2F5D87] px-6 py-3 font-semibold text-[#F5EBDD] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#264D71]"
                  >
                    Bezoek schoolwebsite
                  </a>
                )}

                <button
                  type="button"
                  onClick={onPrev}
                  className="inline-flex items-center rounded-2xl border border-[#CFBEA8] bg-[#F1E6D8] px-5 py-3 font-semibold text-[#1E3550] transition-all duration-300 hover:bg-[#E9DDCC]"
                >
                  ← Vorige
                </button>

                <button
                  type="button"
                  onClick={onNext}
                  className="inline-flex items-center rounded-2xl border border-[#CFBEA8] bg-[#F1E6D8] px-5 py-3 font-semibold text-[#1E3550] transition-all duration-300 hover:bg-[#E9DDCC]"
                >
                  Volgende →
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function OpleidingenPage() {
  const pathname = usePathname();
  const programs = (catalogData.programs as Program[]) || [];
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const openModal = (index: number) => setSelectedIndex(index);
  const closeModal = () => setSelectedIndex(null);

  const goPrev = () => {
    setSelectedIndex((prev) => {
      if (prev === null) return 0;
      return prev === 0 ? programs.length - 1 : prev - 1;
    });
  };

  const goNext = () => {
    setSelectedIndex((prev) => {
      if (prev === null) return 0;
      return prev === programs.length - 1 ? 0 : prev + 1;
    });
  };

  return (
    <>
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
              href="/quiz"
              className="rounded-2xl bg-[#2F5D87] px-5 py-2.5 text-sm font-semibold text-[#F5EBDD] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#264D71]"
            >
              Start quiz
            </Link>
          </div>
        </header>

        <section className="relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(47,93,135,0.10),transparent_32%),radial-gradient(circle_at_bottom_right,rgba(127,168,204,0.14),transparent_30%)]" />

          <div className="relative mx-auto max-w-5xl px-6 py-16 text-center md:py-20">
            <Reveal>
              <div className="inline-flex rounded-full border border-[#CFC0AA] bg-[#EFE3D2] px-4 py-2 text-sm font-semibold text-[#5C7A96]">
                Opleidingen ontdekken
              </div>

              <h1 className="mx-auto mt-6 max-w-4xl text-4xl font-bold leading-tight md:text-6xl">
                Bekijk opleidingen die passen bij jouw interesses
              </h1>

              <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-[#5F6F80]">
                Klik op een card om uitgebreidere informatie te bekijken over
                de opleiding, de school, de locatie en wat je binnen die
                richting kunt verwachten.
              </p>
            </Reveal>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-6 pb-16 md:pb-20">
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {programs.map((program, index) => (
              <Reveal
                key={program.id ?? `${program.name}-${index}`}
                delay={index * 90}
              >
                <ProgramCard
                  program={program}
                  onOpen={() => openModal(index)}
                />
              </Reveal>
            ))}
          </div>

          {programs.length === 0 && (
            <div className="mx-auto mt-10 max-w-2xl rounded-[28px] border border-[#D8CBB8] bg-[#F1E6D8] p-8 text-center shadow-[0_12px_30px_rgba(47,93,135,0.05)]">
              <h2 className="text-2xl font-bold text-[#1E3550]">
                Er zijn nog geen opleidingen gevonden
              </h2>
              <p className="mt-4 leading-8 text-[#607181]">
                Controleer of `data.json` een `programs` array bevat met de
                opleidingen die je wilt tonen.
              </p>
            </div>
          )}
        </section>
      </main>

      <ProgramModal
        programs={programs}
        currentIndex={selectedIndex}
        onClose={closeModal}
        onPrev={goPrev}
        onNext={goNext}
      />
    </>
  );
}