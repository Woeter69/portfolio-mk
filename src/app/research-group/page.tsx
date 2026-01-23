"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Navigation from "../../components/Navigation";
import ParticleBackground from "../../components/ParticleBackground";
import { scholars, currentScholars, pastScholars } from "../../data/scholars";

export default function ResearchGroupPage() {
    const [activeTab, setActiveTab] = useState<'current' | 'past'>('past');

    const displayScholars = activeTab === 'current' ? currentScholars : pastScholars;

    return (
        <div className="min-h-screen selection:bg-teal-500/30 selection:text-teal-200">
            <Navigation />
            <ParticleBackground />

            <main className="relative z-10 mx-auto max-w-7xl px-6 pt-32 pb-20">
                {/* Page Header */}
                <section className="text-center mb-16">
                    <h1 className="font-display text-5xl font-bold gradient-text mb-4">Research Group Members</h1>
                    <p className="text-slate-400 text-lg max-w-2xl mx-auto">
                        Our talented team of researchers working on cutting-edge projects in chemistry and nanotechnology
                    </p>
                </section>

                {/* Tabs */}
                <div className="flex justify-center gap-4 mb-12">
                    <button
                        onClick={() => setActiveTab('current')}
                        className={`px-8 py-3 rounded-full font-semibold transition-all ${activeTab === 'current'
                                ? 'bg-gradient-to-r from-teal-600 to-cyan-600 text-white shadow-lg shadow-teal-500/30'
                                : 'bg-surface/50 text-slate-400 hover:bg-surface hover:text-white'
                            }`}
                    >
                        Current Scholars ({currentScholars.length})
                    </button>
                    <button
                        onClick={() => setActiveTab('past')}
                        className={`px-8 py-3 rounded-full font-semibold transition-all ${activeTab === 'past'
                                ? 'bg-gradient-to-r from-teal-600 to-cyan-600 text-white shadow-lg shadow-teal-500/30'
                                : 'bg-surface/50 text-slate-400 hover:bg-surface hover:text-white'
                            }`}
                    >
                        Past Scholars ({pastScholars.length})
                    </button>
                </div>

                {/* Scholars Grid */}
                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {displayScholars.map((scholar, index) => (
                        <Link
                            key={scholar.id}
                            href={`/research-group/${scholar.id}`}
                            className="group glass hover:glass-strong rounded-2xl p-6 transition-all duration-300 hover-lift hover:border-teal-500/30"
                            style={{ animationDelay: `${index * 0.1}s` }}
                        >
                            {/* Scholar Photo */}
                            <div className="relative w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden border-4 border-teal-500/30 group-hover:border-teal-400/50 transition-all">
                                <div className="absolute inset-0 bg-gradient-to-br from-teal-500/20 to-transparent z-10"></div>
                                <Image
                                    src={scholar.photo}
                                    alt={scholar.name}
                                    width={128}
                                    height={128}
                                    className="object-cover w-full h-full"
                                />
                            </div>

                            {/* Scholar Info */}
                            <div className="text-center">
                                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-teal-400 transition-colors">
                                    {scholar.name}
                                </h3>
                                <p className="text-sm text-teal-400 mb-2">{scholar.currentDesignation}</p>
                                {scholar.institution && (
                                    <p className="text-xs text-slate-400 mb-3 line-clamp-2">{scholar.institution}</p>
                                )}

                                {/* Stats */}
                                <div className="flex justify-center gap-4 mt-4 pt-4 border-t border-white/5">
                                    <div className="text-center">
                                        <div className="text-lg font-bold text-gold">{scholar.publications}</div>
                                        <div className="text-xs text-slate-500">Publications</div>
                                    </div>
                                    {scholar.bookChapters > 0 && (
                                        <div className="text-center">
                                            <div className="text-lg font-bold text-indigo-400">{scholar.bookChapters}</div>
                                            <div className="text-xs text-slate-500">Chapters</div>
                                        </div>
                                    )}
                                </div>

                                {/* View Profile Arrow */}
                                <div className="mt-4 text-sm text-teal-400 group-hover:text-teal-300 transition-colors flex items-center justify-center gap-2">
                                    <span>View Profile</span>
                                    <span className="transition-transform group-hover:translate-x-1">→</span>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>

                {/* Empty State */}
                {displayScholars.length === 0 && (
                    <div className="text-center py-20">
                        <p className="text-slate-400 text-lg">No {activeTab} scholars to display.</p>
                    </div>
                )}
            </main>

            {/* Background */}
            <div className="fixed inset-0 top-0 left-0 -z-10 pointer-events-none overflow-hidden mix-blend-screen">
                <div className="absolute -top-[20%] -left-[10%] h-[60%] w-[60%] rounded-full bg-teal-900/30 blur-[150px] animate-pulse-glow" />
                <div className="absolute top-[40%] -right-[10%] h-[50%] w-[50%] rounded-full bg-indigo-900/30 blur-[150px] animate-pulse-glow" style={{ animationDelay: '1s' }} />
            </div>
        </div>
    );
}
