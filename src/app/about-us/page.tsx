"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  useEffect,
  useRef,
  useState,
  type ElementType,
  type ReactNode,
} from "react";
import {
  GraduationCap,
  Lightbulb,
  Mail,
  Target,
  Users,
} from "lucide-react";

const navItems = [
  { name: "Home", href: "/" },
  { name: "Quiz", href: "/quiz" },
  { name: "Opleidingen", href: "/opleidingen" },
  { name: "Over ons", href: "/about-us" },
];

type RevealProps = {
  children: ReactNode;
  delay?: number;
};

type InfoCardProps = {
  title: string;
  text: string;
  icon: ElementType;
};

type StepItem = {
  number: string;
  title: string;
  text: string;
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

function InfoCard({ title, text, icon: Icon }: InfoCardProps) {
  return (
    <article className="rounded-[28px] border border-[#D8CBB8] bg-[#F1E6D8] p-7 shadow-[0_12px_30px_rgba(47,93,135,0.05)] transition-all duration-300 hover:-translate-y-1 hover:bg-[#EEE2D2]">
      <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#DCE6F0] text-[#2F5D87]">
        <Icon size={24} />
      </div>

      <h3 className="text-xl font-semibold text-[#1E3550]">{title}</h3>
      <p className="mt-3 leading-8 text-[#607181]">{text}</p>
    </article>
  );
}

export default function AboutUsPage() {
  const pathname = usePathname();

  const cards = [
    {
      title: "Waarom deze website?",
      text:
        "Veel mbo-studenten willen doorstromen naar het hbo, maar weten nog niet precies welke opleiding bij hen past. Met deze website maken wij die oriëntatie duidelijker.",
      icon: Lightbulb,
    },
    {
      title: "Wie zijn wij?",
      text:
        "Wij zijn studenten Software Development die samenwerken aan een onderwijsproject. Samen bouwen wij aan een platform dat helpt bij studiekeuze en voorbereiding.",
      icon: Users,
    },
    {
      title: "Wat is ons doel?",
      text:
        "Wij willen bezoekers op een rustige en gebruiksvriendelijke manier helpen met informatie, richting en overzicht bij de stap van mbo naar hbo.",
      icon: Target,
    },
  ];

  const steps: StepItem[] = [
    {
      number: "01",
      title: "Onderzoek",
      text:
        "We verzamelen informatie over opleidingen, vaardigheden en vragen die belangrijk zijn voor studenten die naar het hbo willen.",
    },
    {
      number: "02",
      title: "Ontwikkeling",
      text:
        "Daarna vertalen we die informatie naar een digitale omgeving die duidelijk, overzichtelijk en prettig te gebruiken is.",
    },
    {
      number: "03",
      title: "Verbeteren",
      text:
        "Door feedback, testen en samenwerking blijven we de website verbeteren en beter laten aansluiten op de gebruiker.",
    },
  ];

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
            href="/quiz"
            className="rounded-2xl bg-[#2F5D87] px-5 py-2.5 text-sm font-semibold text-[#F5EBDD] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#264D71]"
          >
            Start quiz
          </Link>
        </div>
      </header>

      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(47,93,135,0.10),transparent_32%),radial-gradient(circle_at_bottom_right,rgba(127,168,204,0.14),transparent_30%)]" />

        <div className="relative mx-auto grid max-w-6xl gap-10 px-6 py-16 md:py-20 lg:grid-cols-[1fr_0.9fr] lg:items-center">
          <Reveal>
            <div>
              <div className="inline-flex rounded-full border border-[#CFC0AA] bg-[#EFE3D2] px-4 py-2 text-sm font-semibold text-[#5C7A96]">
                Over ons
              </div>

              <h1 className="mt-6 max-w-3xl text-4xl font-bold leading-tight md:text-6xl">
                Wij bouwen aan een duidelijke website voor mbo-studenten die
                nadenken over het hbo.
              </h1>

              <p className="mt-6 max-w-2xl text-lg leading-8 text-[#5F6F80]">
                MijnHBOKeuze is een project waarin onderzoek, samenwerking en
                ontwikkeling samenkomen. We willen studiekeuze overzichtelijker
                en toegankelijker maken.
              </p>

              <div className="mt-10 flex flex-wrap gap-4">
                <a
                  href="mailto:info@hbokeuze.nl"
                  className="inline-flex items-center rounded-2xl bg-[#2F5D87] px-6 py-3.5 font-semibold text-[#F5EBDD] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#264D71]"
                >
                  Neem contact op
                </a>

                <Link
                  href="/"
                  className="inline-flex items-center rounded-2xl border border-[#CFBEA8] bg-[#F1E6D8] px-6 py-3.5 font-semibold text-[#1E3550] transition-all duration-300 hover:bg-[#E9DDCC]"
                >
                  Terug naar home
                </Link>
              </div>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <div className="overflow-hidden rounded-[32px] border border-[#D8CBB8] bg-[#F1E6D8] p-3 shadow-[0_16px_40px_rgba(47,93,135,0.06)]">
              <Image
                src="/public/images/studenten-aan-tafel.jpg"
                alt="Studenten aan tafel in overleg"
                width={1000}
                height={800}
                className="h-full w-full rounded-[26px] object-cover"
                priority
              />
            </div>
          </Reveal>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-16 md:py-20">
        <Reveal>
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#6A88A3]">
              Onze missie
            </p>
            <h2 className="mt-3 text-3xl font-bold md:text-4xl">
              Rustig, duidelijk en gebruiksvriendelijk
            </h2>
            <p className="mt-4 text-lg leading-8 text-[#607181]">
              Deze website is gemaakt om informatie duidelijker te presenteren
              en studenten te helpen bij het maken van een passende keuze.
            </p>
          </div>
        </Reveal>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {cards.map((card, index) => (
            <Reveal key={card.title} delay={index * 120}>
              <InfoCard
                title={card.title}
                text={card.text}
                icon={card.icon}
              />
            </Reveal>
          ))}
        </div>
      </section>

      <section className="border-y border-[#D8CBB8] bg-[#EFE3D2]">
        <div className="mx-auto max-w-6xl px-6 py-16 md:py-20">
          <div className="grid gap-10 lg:grid-cols-[1fr_1fr] lg:items-start">
            <Reveal>
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#6A88A3]">
                  Projectaanpak
                </p>
                <h2 className="mt-3 text-3xl font-bold md:text-4xl">
                  Hoe wij aan dit project werken
                </h2>
                <p className="mt-4 text-lg leading-8 text-[#607181]">
                  Binnen het project draait het om onderzoek, ontwikkeling en
                  samenwerken. We bouwen stap voor stap aan een platform dat
                  beter aansluit op de gebruiker.
                </p>

                <div className="mt-8 rounded-[28px] border border-[#D8CBB8] bg-[#F5EBDD] p-7 shadow-[0_10px_25px_rgba(47,93,135,0.04)]">
                  <h3 className="text-xl font-semibold text-[#1E3550]">
                    Wat wij belangrijk vinden
                  </h3>

                  <div className="mt-5 space-y-4 text-[#607181]">
                    <div className="flex gap-3">
                      <span className="mt-2 h-2.5 w-2.5 rounded-full bg-[#2F5D87]" />
                      <p>Duidelijke informatie en logische opbouw</p>
                    </div>
                    <div className="flex gap-3">
                      <span className="mt-2 h-2.5 w-2.5 rounded-full bg-[#6A88A3]" />
                      <p>Rustige vormgeving en gebruiksgemak</p>
                    </div>
                    <div className="flex gap-3">
                      <span className="mt-2 h-2.5 w-2.5 rounded-full bg-[#2F5D87]" />
                      <p>Samenwerking, feedback en verbetering</p>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>

            <div className="grid gap-5">
              {steps.map((step, index) => (
                <Reveal key={step.number} delay={index * 100}>
                  <article className="rounded-[28px] border border-[#D8CBB8] bg-[#F5EBDD] p-6 shadow-[0_10px_25px_rgba(47,93,135,0.04)]">
                    <div className="flex items-start gap-4">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#DCE6F0] text-sm font-bold text-[#2F5D87]">
                        {step.number}
                      </div>

                      <div>
                        <h3 className="text-xl font-semibold text-[#1E3550]">
                          {step.title}
                        </h3>
                        <p className="mt-3 leading-8 text-[#607181]">
                          {step.text}
                        </p>
                      </div>
                    </div>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-6 py-16 md:py-20">
        <Reveal>
          <div className="rounded-[32px] border border-[#D8CBB8] bg-[linear-gradient(135deg,rgba(220,230,240,0.9),rgba(239,227,210,0.95))] px-8 py-12 shadow-[0_16px_40px_rgba(47,93,135,0.06)] md:px-12">
            <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#6A88A3]">
                  Contact
                </p>
                <h2 className="mt-3 text-3xl font-bold md:text-4xl">
                  Heb je een vraag of wil je contact opnemen?
                </h2>
                <p className="mt-4 max-w-2xl text-lg leading-8 text-[#607181]">
                  Neem gerust contact met ons op via e-mail voor vragen,
                  feedback of opmerkingen over het project en de website.
                </p>

                <div className="mt-8 flex flex-wrap gap-4">
                  <a
                    href="mailto:info@hbokeuze.nl"
                    className="inline-flex items-center rounded-2xl bg-[#2F5D87] px-6 py-3.5 font-semibold text-[#F5EBDD] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#264D71]"
                  >
                    Klik hier om te mailen
                  </a>

                  <Link
                    href="/"
                    className="inline-flex items-center rounded-2xl border border-[#CFBEA8] bg-[#F1E6D8] px-6 py-3.5 font-semibold text-[#1E3550] transition-all duration-300 hover:bg-[#E9DDCC]"
                  >
                    Ga terug naar home
                  </Link>
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-1">
                <div className="rounded-[24px] border border-[#D8CBB8] bg-[#F5EBDD] p-5">
                  <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-2xl bg-[#DCE6F0] text-[#2F5D87]">
                    <GraduationCap size={20} />
                  </div>
                  <p className="text-sm text-[#6E8092]">Projecttype</p>
                  <p className="mt-2 text-lg font-semibold text-[#1E3550]">
                    Onderwijsproject
                  </p>
                </div>

                <div className="rounded-[24px] border border-[#D8CBB8] bg-[#F5EBDD] p-5">
                  <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-2xl bg-[#DCE6F0] text-[#2F5D87]">
                    <Users size={20} />
                  </div>
                  <p className="text-sm text-[#6E8092]">Samenwerking</p>
                  <p className="mt-2 text-lg font-semibold text-[#1E3550]">
                    ROC Mondriaan en studenten Software Development
                  </p>
                </div>

                <div className="rounded-[24px] border border-[#D8CBB8] bg-[#F5EBDD] p-5">
                  <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-2xl bg-[#DCE6F0] text-[#2F5D87]">
                    <Mail size={20} />
                  </div>
                  <p className="text-sm text-[#6E8092]">E-mailadres</p>
                  <p className="mt-2 text-lg font-semibold text-[#1E3550]">
                    info@hbokeuze.nl
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </section>
    </main>
  );
}