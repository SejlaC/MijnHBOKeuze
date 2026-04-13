import Link from "next/link";

export default function HomePage() {
  const navItems = [
    { name: "Home", href: "/" },
    { name: "Quiz", href: "/quiz" },
    { name: "Opleidingen", href: "/opleidingen" },
    { name: "Over ons", href: "/about-us" },
  ];

  const steps = [
    {
      number: "01",
      title: "Maak de quiz",
      description:
        "Beantwoord een paar korte vragen over jouw interesses, manier van leren en toekomst.",
    },
    {
      number: "02",
      title: "Bekijk passende richtingen",
      description:
        "Ontdek welke hbo-opleidingen goed kunnen aansluiten bij jouw profiel en voorkeuren.",
    },
    {
      number: "03",
      title: "Verdiep je verder",
      description:
        "Lees meer over opleidingen en gebruik die informatie om een betere studiekeuze te maken.",
    },
  ];

  const benefits = [
    {
      title: "Duidelijke studiekeuzehulp",
      description:
        "MijnHBOKeuze helpt mbo-studenten om overzicht te krijgen in de mogelijkheden binnen het hbo.",
    },
    {
      title: "Rustige en overzichtelijke pagina",
      description:
        "De informatie is duidelijk verdeeld, zodat je rustig kunt oriënteren zonder dat de pagina te druk wordt.",
    },
    {
      title: "Gemaakt voor mbo naar hbo",
      description:
        "De inhoud is gericht op studenten die nadenken over hun volgende stap richting een hbo-opleiding.",
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
                  item.href === "/"
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

        <div className="relative mx-auto max-w-5xl px-6 py-20 text-center md:py-28">
          <div className="inline-flex rounded-full border border-[#CFC0AA] bg-[#EFE3D2] px-4 py-2 text-sm font-semibold text-[#5C7A96]">
            Voor mbo-studenten die naar het hbo willen
          </div>

          <h1 className="mx-auto mt-6 max-w-4xl text-4xl font-bold leading-tight md:text-6xl">
            Ontdek welke hbo-opleiding het beste bij jou past.
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-[#5F6F80]">
            MijnHBOKeuze helpt je om op een duidelijke en rustige manier te
            ontdekken welke opleiding aansluit bij jouw interesses, kwaliteiten
            en toekomstplannen.
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/quiz"
              className="inline-flex items-center rounded-2xl bg-[#2F5D87] px-7 py-3.5 font-semibold text-[#F5EBDD] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#264D71]"
            >
              Start de quiz
            </Link>

            <Link
              href="/opleidingen"
              className="inline-flex items-center rounded-2xl border border-[#CFBEA8] bg-[#EFE3D2] px-7 py-3.5 font-semibold text-[#1E3550] transition-all duration-300 hover:bg-[#E7DAC8]"
            >
              Bekijk opleidingen
            </Link>
          </div>

          <div className="mx-auto mt-14 grid max-w-4xl gap-4 md:grid-cols-3">
            <div className="rounded-[24px] border border-[#D8CBB8] bg-[#F1E6D8] p-5 text-left shadow-[0_10px_30px_rgba(47,93,135,0.05)]">
              <p className="text-sm text-[#6E8092]">Stap 1</p>
              <p className="mt-2 text-lg font-semibold text-[#1E3550]">
                Quiz invullen
              </p>
            </div>

            <div className="rounded-[24px] border border-[#D8CBB8] bg-[#F1E6D8] p-5 text-left shadow-[0_10px_30px_rgba(47,93,135,0.05)]">
              <p className="text-sm text-[#6E8092]">Stap 2</p>
              <p className="mt-2 text-lg font-semibold text-[#1E3550]">
                Richtingen ontdekken
              </p>
            </div>

            <div className="rounded-[24px] border border-[#D8CBB8] bg-[#F1E6D8] p-5 text-left shadow-[0_10px_30px_rgba(47,93,135,0.05)]">
              <p className="text-sm text-[#6E8092]">Stap 3</p>
              <p className="mt-2 text-lg font-semibold text-[#1E3550]">
                Verdiepen en kiezen
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-16 md:py-20">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#6A88A3]">
            Hoe werkt het?
          </p>
          <h2 className="mt-3 text-3xl font-bold md:text-4xl">
            In drie duidelijke stappen
          </h2>
          <p className="mt-4 text-lg leading-8 text-[#607181]">
            De homepage is bedoeld om je rustig door te sturen naar de quiz en
            je daarna verder te helpen met informatie over opleidingen.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {steps.map((step) => (
            <article
              key={step.number}
              className="rounded-[28px] border border-[#D8CBB8] bg-[#F1E6D8] p-7 shadow-[0_12px_30px_rgba(47,93,135,0.05)] transition-all duration-300 hover:-translate-y-1 hover:bg-[#EEE2D2]"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#DCE6F0] text-sm font-bold text-[#2F5D87]">
                {step.number}
              </div>

              <h3 className="mt-5 text-xl font-semibold text-[#1E3550]">
                {step.title}
              </h3>
              <p className="mt-3 leading-8 text-[#607181]">
                {step.description}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="border-y border-[#D8CBB8] bg-[#EFE3D2]">
        <div className="mx-auto max-w-6xl px-6 py-16 md:py-20">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#6A88A3]">
              Waarom MijnHBOKeuze?
            </p>
            <h2 className="mt-3 text-3xl font-bold md:text-4xl">
              Een rustige start voor je studiekeuze
            </h2>
            <p className="mt-4 text-lg leading-8 text-[#607181]">
              Deze website is gemaakt om studiekeuze overzichtelijker te maken
              voor studenten die willen doorstromen naar het hbo.
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {benefits.map((benefit) => (
              <article
                key={benefit.title}
                className="rounded-[28px] border border-[#D8CBB8] bg-[#F5EBDD] p-7 shadow-[0_10px_25px_rgba(47,93,135,0.04)]"
              >
                <h3 className="text-xl font-semibold text-[#1E3550]">
                  {benefit.title}
                </h3>
                <p className="mt-3 leading-8 text-[#607181]">
                  {benefit.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-6 py-16 text-center md:py-20">
        <div className="rounded-[32px] border border-[#D8CBB8] bg-[linear-gradient(135deg,rgba(220,230,240,0.9),rgba(239,227,210,0.95))] px-8 py-12 shadow-[0_16px_40px_rgba(47,93,135,0.06)] md:px-12">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#6A88A3]">
            Klaar om te beginnen?
          </p>

          <h2 className="mt-3 text-3xl font-bold md:text-4xl">
            Zet de eerste stap richting jouw hbo-keuze
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-lg leading-8 text-[#607181]">
            Start met de quiz en ontdek welke opleidingen mogelijk goed passen
            bij jouw interesses en toekomst.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/quiz"
              className="inline-flex items-center rounded-2xl bg-[#2F5D87] px-7 py-3.5 font-semibold text-[#F5EBDD] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#264D71]"
            >
              Start de quiz
            </Link>

            <Link
              href="/about-us"
              className="inline-flex items-center rounded-2xl border border-[#CFBEA8] bg-[#F1E6D8] px-7 py-3.5 font-semibold text-[#1E3550] transition-all duration-300 hover:bg-[#E9DDCC]"
            >
              Meer over ons
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}