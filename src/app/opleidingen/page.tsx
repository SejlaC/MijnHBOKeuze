'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import data from '@/data.json'

export default function StudyPage() {
    const [viewMode, setViewMode] = useState<'programs' | 'locations'>('programs')

    const programs = useMemo(() => data.programs, [])
    const schools = useMemo(() => data.schools, [])

    const navItems = [
        { name: "Home", href: "/" },
        { name: "Quiz", href: "/quiz" },
        { name: "Opleidingen", href: "/opleidingen" },
        { name: "Over ons", href: "/about-us" },
    ]

    return (
        <main className="min-h-screen bg-[#0D0F14] text-[#F5F7FB]">
            <div className="flex min-h-screen w-full">
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

                <section className="flex flex-1 flex-col px-6 py-12">
                    <div className="w-full">
                        <h1 className="mb-8 text-4xl font-bold tracking-tight md:text-5xl">Opleidingen</h1>

                        {/* View Toggle Buttons */}
                        <div className="mb-8 flex gap-4">
                            <button
                                onClick={() => setViewMode('programs')}
                                className={`rounded-2xl px-6 py-3 font-medium transition ${
                                    viewMode === 'programs'
                                        ? 'bg-[#7DD3FC] text-[#0D0F14] hover:bg-[#38BDF8]'
                                        : 'border border-[#2A3345] bg-[#141821] text-[#A8B3C7] hover:bg-[#1B2230]'
                                }`}
                            >
                                Alle Programma's
                            </button>
                            <button
                                onClick={() => setViewMode('locations')}
                                className={`rounded-2xl px-6 py-3 font-medium transition ${
                                    viewMode === 'locations'
                                        ? 'bg-[#7DD3FC] text-[#0D0F14] hover:bg-[#38BDF8]'
                                        : 'border border-[#2A3345] bg-[#141821] text-[#A8B3C7] hover:bg-[#1B2230]'
                                }`}
                            >
                                Alle Locaties
                            </button>
                        </div>

                        {/* Programs View */}
                        {viewMode === 'programs' && (
                            <div>
                                <h2 className="mb-6 text-2xl font-semibold">{programs.length} Programma's</h2>
                                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                                    {programs.map((program) => (
                                        <div
                                            key={program.id}
                                            className="rounded-2xl border border-[#2A3345] bg-[#141821] p-6 shadow-[0_0_40px_rgba(125,211,252,0.08)] transition hover:shadow-[0_0_60px_rgba(125,211,252,0.12)]"
                                        >
                                            <h3 className="text-lg font-semibold text-[#F5F7FB]">{program.name}</h3>
                                            <p className="mt-1 text-sm text-[#7DD3FC]">{program.school.name}</p>
                                            <p className="mt-4 text-sm leading-6 text-[#A8B3C7]">{program.description}</p>
                                            
                                            <div className="mt-6 space-y-2">
                                                <div className="text-sm">
                                                    <span className="font-semibold text-[#F5F7FB]">Categorie:</span>
                                                    <span className="ml-2 text-[#A8B3C7]">{program.category}</span>
                                                </div>
                                                <div className="text-sm">
                                                    <span className="font-semibold text-[#F5F7FB]">Type:</span>
                                                    <span className="ml-2 text-[#A8B3C7]">{program.type}</span>
                                                </div>
                                                <div className="text-sm">
                                                    <span className="font-semibold text-[#F5F7FB]">Locatie:</span>
                                                    <span className="ml-2 text-[#A8B3C7]">{program.school.location.city}</span>
                                                </div>
                                            </div>

                                            <div className="mt-4">
                                                <span className="text-sm font-semibold text-[#F5F7FB]">Vaardigheden:</span>
                                                <div className="mt-2 flex flex-wrap gap-2">
                                                    {program.characteristics.skills.map((skill) => (
                                                        <span
                                                            key={skill}
                                                            className="rounded-full border border-[#2A3345] bg-[#1B2230] px-3 py-1 text-xs text-[#7DD3FC]"
                                                        >
                                                            {skill}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>

                                            <a
                                                href={program.school.website}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="mt-6 block rounded-xl border border-[#2A3345] bg-[#1B2230] px-4 py-2 text-center text-sm font-medium text-[#7DD3FC] transition hover:bg-[#252D3D]"
                                            >
                                                Website bezoeken
                                            </a>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Locations View */}
                        {viewMode === 'locations' && (
                            <div>
                                <h2 className="mb-6 text-2xl font-semibold">{schools.length} Locaties</h2>
                                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                                    {schools.map((school) => (
                                        <div
                                            key={school.id}
                                            className="rounded-2xl border border-[#2A3345] bg-[#141821] p-6 shadow-[0_0_40px_rgba(125,211,252,0.08)] transition hover:shadow-[0_0_60px_rgba(125,211,252,0.12)]"
                                        >
                                            <h3 className="text-lg font-semibold text-[#F5F7FB]">{school.name}</h3>
                                            <p className="mt-2 text-sm text-[#7DD3FC]">{school.abbreviation}</p>
                                            <p className="mt-4 text-sm leading-6 text-[#A8B3C7]">{school.description}</p>
                                            
                                            <div className="mt-6 space-y-2">
                                                <div className="text-sm">
                                                    <span className="font-semibold text-[#F5F7FB]">Stad:</span>
                                                    <span className="ml-2 text-[#A8B3C7]">{school.city}</span>
                                                </div>
                                                <div className="text-sm">
                                                    <span className="font-semibold text-[#F5F7FB]">Studenten:</span>
                                                    <span className="ml-2 text-[#A8B3C7]">{school.student_count.toLocaleString()}</span>
                                                </div>
                                            </div>

                                            <a
                                                href={school.website}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="mt-6 block rounded-xl border border-[#2A3345] bg-[#1B2230] px-4 py-2 text-center text-sm font-medium text-[#7DD3FC] transition hover:bg-[#252D3D]"
                                            >
                                                Website bezoeken
                                            </a>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </section>
            </div>
        </main>
    )
}