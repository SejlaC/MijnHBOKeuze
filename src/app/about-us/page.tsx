"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState, type ReactNode } from "react";
import {
  Lightbulb,
  Target,
  Users,
  Mail,
  GraduationCap,
  Rocket,
} from "lucide-react";

type InfoCardProps = {
  title: string;
  text: string;
  icon: React.ElementType;
};

type TimelineItem = {
  step: string;
  title: string;
  text: string;
};

type RevealProps = {
  children: ReactNode;
  delay?: number;
  className?: string;
};

function Reveal({ children, delay = 0, className = "" }: RevealProps) {
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
      {
        threshold: 0.15,
      }
    );

    observer.observe(node);

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`${className} transform-gpu transition-all duration-700 ease-out ${
        visible
          ? "translate-y-0 opacity-100 blur-0"
          : "translate-y-8 opacity-0 blur-[2px]"
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

function InfoCard({ title, text, icon: Icon }: InfoCardProps) {
  return (
    <article className="group h-full rounded-[28px] border border-white/10 bg-[#0D1728] p-6 shadow-[0_12px_40px_rgba(0,0,0,0.22)] transition-all duration-300 hover:-translate-y-1 hover:border-[#4F8CFF]/40 hover:bg-[#12213A]">
      <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-[#4F8CFF]/20 to-[#22C55E]/20 text-[#86EFAC] shadow-inner">
        <Icon size={28} strokeWidth={2.1} />
      </div>

      <h3 className="text-xl font-semibold text-white">{title}</h3>
      <p className="mt-3 leading-8 text-[#B7C2D8]">{text}</p>
    </article>
  );
}

function TimelineCard({ step, title, text }: TimelineItem) {
  return (
    <article className="rounded-[24px] border border-white/10 bg-[#0B1526] p-5 transition-all duration-300 hover:border-[#22C55E]/30 hover:bg-[#0F1B31]">
      <div className="flex items-start gap-4">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#4F8CFF]/15 text-sm font-bold text-[#BFD4FF]">
          {step}
        </div>

        <div>
          <h3 className="text-lg font-semibold text-white">{title}</h3>
          <p className="mt-2 leading-7 text-[#B7C2D8]">{text}</p>
        </div>
      </div>
    </article>
  );
}

export default function AboutUsPage() {
  const cards = [
    {
      title: "Waarom hebben wij deze website gemaakt?",
      text:
        "Veel mbo-studenten willen doorstromen naar het hbo, maar weten nog niet altijd welke opleiding bij hen past. Met deze website willen wij dat proces duidelijker, overzichtelijker en toegankelijker maken.",
      icon: Lightbulb,
    },
    {
      title: "Wie zijn wij?",
      text:
        "Wij zijn studenten Software Development die samenwerken aan een onderwijsproject. Samen met andere studenten van ROC Mondriaan bouwen wij aan een platform dat helpt bij studiekeuze en voorbereiding op het hbo.",
      icon: Users,
    },
    {
      title: "Wat willen wij bereiken?",
      text:
        "Wij willen bezoekers op een duidelijke en klantvriendelijke manier helpen met informatie, oriëntatie en richting. De website moet rustig aanvoelen, professioneel ogen en makkelijk te gebruiken zijn.",
      icon: Target,
    },
  ];

  const timeline: TimelineItem[] = [
    {
      step: "01",
      title: "Onderzoek",
      text:
        "We onderzoeken opleidingen, vaardigheden en vragen die belangrijk zijn voor mbo-studenten die naar het hbo willen doorstromen.",
    },
    {
      step: "02",
      title: "Bezoeken aan De Haagse Hogeschool",
      text:
        "Tijdens contactmomenten halen we informatie op, toetsen we onze ideeën en krijgen we feedback op inhoud en uitwerking.",
    },
    {
      step: "03",
      title: "Prototype en ontwikkeling",
      text:
        "We werken ons concept uit in een digitaal product, verwerken feedback en verbeteren vormgeving, usability en techniek.",
    },
    {
      step: "04",
      title: "Testen en opleveren",
      text:
        "Daarna testen we het product en bereiden we de eindpresentatie en oplevering voor, inclusief samenwerking, onderbouwing en reflectie.",
    },
  ];

  const facts = [
    {
      label: "Projecttype",
      value: "Onderwijsproject",
      icon: GraduationCap,
    },
    {
      label: "Doel",
      value: "Studiekeuze en voorbereiding",
      icon: Rocket,
    },
    {
      label: "Contact",
      value: "info@hbokeuze.nl",
      icon: Mail,
    },
  ];

  return (
    <main className="min-h-screen bg-[#081120] text-white">
      <section className="relative overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(79,140,255,0.22),transparent_30%),radial-gradient(circle_at_bottom_right,rgba(34,197,94,0.14),transparent_28%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(8,17,32,0.1),rgba(8,17,32,0.65))]" />

        <div className="relative mx-auto grid max-w-7xl gap-12 px-6 py-20 md:px-8 lg:grid-cols-2 lg:items-center">
          <Reveal>
            <div>
              <span className="inline-flex rounded-full border border-[#22C55E]/20 bg-[#22C55E]/10 px-4 py-1 text-sm font-semibold text-[#86EFAC]">
                Over ons
              </span>

              <h1 className="mt-6 text-4xl font-bold leading-tight text-white md:text-6xl">
                Wij bouwen aan een duidelijke en gebruiksvriendelijke website
                voor mbo-studenten die nadenken over het hbo.
              </h1>

              <p className="mt-6 max-w-2xl text-lg leading-8 text-[#B7C2D8]">
                HBO Keuze is een project waarin onderzoek, samenwerking en
                ontwikkeling samenkomen. Wij werken aan een platform dat
                studenten helpt om beter inzicht te krijgen in opleidingen,
                voorbereiding en vervolgstappen.
              </p>

              <div className="mt-10 flex flex-wrap gap-4">
                <a
                  href="mailto:info@hbokeuze.nl"
                  className="inline-flex items-center rounded-2xl bg-[#4F8CFF] px-6 py-3 font-semibold text-white shadow-[0_10px_30px_rgba(79,140,255,0.25)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#3D7BF0]"
                >
                  Neem contact op
                </a>

                <Link
                  href="/"
                  className="inline-flex items-center rounded-2xl border border-white/10 bg-white/5 px-6 py-3 font-semibold text-white backdrop-blur transition-all duration-300 hover:border-white/20 hover:bg-white/10"
                >
                  Terug naar home
                </Link>
              </div>
            </div>
          </Reveal>

          <Reveal delay={150}>
            <div className="relative">
              <div className="absolute -inset-4 rounded-[32px] bg-gradient-to-tr from-[#4F8CFF]/20 to-[#22C55E]/10 blur-2xl" />
              <div className="relative overflow-hidden rounded-[32px] border border-white/10 bg-[#0D1728] p-3 shadow-[0_22px_70px_rgba(0,0,0,0.28)]">
                <Image
                  src="/images/studenten-aan-tafel.jpg"
                  alt="Studenten aan tafel in overleg"
                  width={1000}
                  height={800}
                  className="h-full w-full rounded-[24px] object-cover transition-transform duration-500 hover:scale-[1.02]"
                  priority
                />
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16 md:px-8 md:py-20">
        <Reveal>
          <div className="mb-10 max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#7FA7FF]">
              Onze missie
            </p>
            <h2 className="mt-3 text-3xl font-bold text-white md:text-4xl">
              Een rustige, professionele en klantvriendelijke ervaring
            </h2>
            <p className="mt-4 text-lg leading-8 text-[#AEBBD2]">
              Deze website is gemaakt om informatie duidelijker te presenteren
              en studiekeuze minder lastig te maken.
            </p>
          </div>
        </Reveal>

        <div className="grid gap-6 lg:grid-cols-3">
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

      <section className="border-y border-white/10 bg-white/[0.03]">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 py-16 md:px-8 md:py-20 lg:grid-cols-[1.05fr_1fr]">
          <Reveal>
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#7FA7FF]">
                Projectaanpak
              </p>
              <h2 className="mt-3 text-3xl font-bold text-white md:text-4xl">
                Hoe wij aan dit project werken
              </h2>
              <p className="mt-5 text-lg leading-8 text-[#AEBBD2]">
                In het project werken studenten samen aan onderzoek, concept,
                prototypes, testfase en oplevering.
              </p>

              <div className="mt-8 rounded-[28px] border border-white/10 bg-[#0D1728] p-7 shadow-[0_12px_40px_rgba(0,0,0,0.16)]">
                <h3 className="text-xl font-semibold text-white">
                  Wat we belangrijk vinden
                </h3>

                <div className="mt-5 space-y-4 text-[#B7C2D8]">
                  <div className="flex gap-3">
                    <span className="mt-2 h-2.5 w-2.5 rounded-full bg-[#4F8CFF]" />
                    <p>Duidelijke informatie en logische opbouw</p>
                  </div>
                  <div className="flex gap-3">
                    <span className="mt-2 h-2.5 w-2.5 rounded-full bg-[#22C55E]" />
                    <p>Gebruiksvriendelijkheid en rustige vormgeving</p>
                  </div>
                  <div className="flex gap-3">
                    <span className="mt-2 h-2.5 w-2.5 rounded-full bg-[#4F8CFF]" />
                    <p>Samenwerking, feedback en doorontwikkeling</p>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>

          <div className="grid gap-5">
            {timeline.map((item, index) => (
              <Reveal key={item.step} delay={index * 100}>
                <TimelineCard
                  step={item.step}
                  title={item.title}
                  text={item.text}
                />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16 md:px-8 md:py-20">
        <div className="grid gap-8 lg:grid-cols-2">
          <Reveal>
            <div className="overflow-hidden rounded-[30px] border border-white/10 bg-[#0D1728] p-3 shadow-[0_16px_50px_rgba(0,0,0,0.22)]">
              <Image
                src="/images/studenten-aan-tafel.jpg"
                alt="Studenten aan tafel in overleg"
                width={1000}
                height={800}
                className="h-full w-full rounded-[22px] object-cover transition-transform duration-500 hover:scale-[1.02]"
              />
            </div>
          </Reveal>

          <Reveal delay={150}>
            <div className="rounded-[30px] border border-white/10 bg-[linear-gradient(135deg,rgba(79,140,255,0.14),rgba(34,197,94,0.08))] p-8 shadow-[0_18px_60px_rgba(0,0,0,0.22)]">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#AFC8FF]">
                Samenwerking
              </p>
              <h2 className="mt-3 text-3xl font-bold text-white md:text-4xl">
                Studenten Software Development en ROC Mondriaan
              </h2>
              <p className="mt-4 text-lg leading-8 text-[#C7D2E3]">
                De opdracht draait om samenwerken, plannen, onderzoek doen,
                informatie verzamelen en een eindproduct presenteren.
              </p>

              <div className="mt-8 grid gap-4 sm:grid-cols-3">
                {facts.map((fact) => {
                  const Icon = fact.icon;

                  return (
                    <div
                      key={fact.label}
                      className="rounded-2xl border border-white/10 bg-[#0A1323]/70 p-5 transition-all duration-300 hover:border-[#4F8CFF]/30"
                    >
                      <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-2xl bg-[#4F8CFF]/12 text-[#BFD4FF]">
                        <Icon size={20} />
                      </div>
                      <p className="text-sm text-[#8FA6CC]">{fact.label}</p>
                      <p className="mt-2 text-lg font-semibold text-white">
                        {fact.value}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-16 md:px-8 md:pb-20">
        <Reveal>
          <div className="rounded-[32px] border border-white/10 bg-[#0B1526] p-8 shadow-[0_20px_60px_rgba(0,0,0,0.18)] md:p-10">
            <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#86EFAC]">
                  Contact
                </p>
                <h2 className="mt-3 text-3xl font-bold text-white md:text-4xl">
                  Heb je een vraag of wil je contact met ons opnemen?
                </h2>
                <p className="mt-4 max-w-2xl text-lg leading-8 text-[#B7C2D8]">
                  Neem gerust contact met ons op via e-mail. Dat kan voor
                  vragen, feedback of opmerkingen over de website en het
                  project.
                </p>

                <div className="mt-8 flex flex-wrap gap-4">
                  <a
                    href="mailto:info@hbokeuze.nl"
                    className="inline-flex items-center rounded-2xl bg-[#22C55E] px-6 py-3 font-semibold text-[#081120] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#1fb255]"
                  >
                    Klik hier om te mailen
                  </a>

                  <Link
                    href="/"
                    className="inline-flex items-center rounded-2xl border border-white/10 bg-white/5 px-6 py-3 font-semibold text-white transition-all duration-300 hover:border-white/20 hover:bg-white/10"
                  >
                    Ga terug naar home
                  </Link>
                </div>
              </div>

              <div className="rounded-[28px] border border-white/10 bg-[#081120] p-7">
                <p className="text-sm font-medium text-[#8FA6CC]">
                  E-mailadres
                </p>
                <p className="mt-2 text-xl font-semibold text-white">
                  info@hbokeuze.nl
                </p>

                <div className="my-6 h-px bg-white/10" />

                <p className="text-sm font-medium text-[#8FA6CC]">
                  Samenwerking
                </p>
                <p className="mt-2 text-lg text-white">
                  ROC Mondriaan en studenten Software Development
                </p>

                <div className="my-6 h-px bg-white/10" />

                <p className="text-sm font-medium text-[#8FA6CC]">Doel</p>
                <p className="mt-2 text-lg text-white">
                  Mbo-studenten helpen bij hun keuze voor het hbo
                </p>
              </div>
            </div>
          </div>
        </Reveal>
      </section>
    </main>
  );
}