import Link from "next/link";

export default function HomePage() {
  const navItems = [
    { name: "Home", href: "/" },
    { name: "Quiz", href: "/quiz" },
    { name: "Opleidingen", href: "/opleidingen" },
    { name: "Over ons", href: "/over-ons" },
  ];

  return (
    //main container met achtergrond en tekstkleur
    <main className="min-h-screen bg-[#0D0F14] text-[#F5F7FB]">
      <div className="mx-auto flex min-h-screen max-w-7xl">
        <aside className="hidden w-56 flex-col border-r border-[#2A3345] bg-[#11151D] p-6 md:flex">
          <div className="mb-10">
            <h2 className="text-xl font-semibold">Mijn HBO Keuze</h2>
            <p className="mt-1 text-sm text-[#7E8AA3]">Studiekeuzehulp</p>
          </div>

          {/* navigatie-items worden met map functie gegenereerd */}
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

        <section className="flex flex-1 items-center justify-center px-6 py-12">
          <div className="w-full max-w-3xl">
            <div className="mb-6 inline-flex rounded-full border border-[#2A3345] bg-[#141821] px-4 py-2 text-sm text-[#7DD3FC]">
              Studiekeuzehulp
            </div>

            <h1 className="text-4xl font-bold tracking-tight md:text-6xl">
              Mijn HBO Keuze
            </h1>

            <p className="mt-4 max-w-2xl text-lg leading-8 text-[#A8B3C7]">
              Ontdek met een korte quiz welke hbo-opleiding het beste bij jou
              past.
            </p>

            <div className="mt-10 rounded-3xl border border-[#2A3345] bg-[#141821] p-8 shadow-[0_0_40px_rgba(125,211,252,0.08)]">
              <p className="mb-6 text-base text-[#A8B3C7]">
                Beantwoord een paar vragen over jouw interesses, manier van
                leren en toekomst.
              </p>

              <Link
                href="/quiz"
                className="inline-block rounded-2xl bg-[#7DD3FC] px-6 py-3 font-medium text-[#0D0F14] transition hover:bg-[#38BDF8]"
              >
                Start de quiz
              </Link>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}