"use client";

import { use } from "react";
import Image from "next/image";
import Link from "next/link";
import Navigation from "../../../components/Navigation";
import ParticleBackground from "../../../components/ParticleBackground";
import { scholars } from "../../../data/scholars";

export default function ScholarProfilePage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
    const scholar = scholars.find(s => s.id === id);

    if (!scholar) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-4xl font-bold text-white mb-4">Scholar Not Found</h1>
                    <Link href="/research-group" className="text-teal-400 hover:text-teal-300">
                        ← Back to Research Group
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen selection:bg-teal-500/30 selection:text-teal-200">
            <Navigation />
            <ParticleBackground />

            <main className="relative z-10 mx-auto max-w-5xl px-6 pt-32 pb-20">
                {/* Back Button */}
                <Link
                    href="/research-group"
                    className="inline-flex items-center gap-2 text-teal-400 hover:text-teal-300 transition-colors mb-8"
                >
                    <span>←</span> Back to Research Group
                </Link>

                {/* Scholar Header */}
                <div className="glass-strong rounded-3xl p-8 md:p-12 mb-8">
                    <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
                        {/* Photo */}
                        <div className="relative w-48 h-48 rounded-full overflow-hidden border-4 border-teal-500/30 shadow-2xl shadow-teal-500/20 flex-shrink-0">
                            <div className="absolute inset-0 bg-gradient-to-br from-teal-500/20 to-transparent z-10"></div>
                            <Image
                                src={scholar.photo}
                                alt={scholar.name}
                                width={192}
                                height={192}
                                className="object-cover w-full h-full"
                            />
                        </div>

                        {/* Info */}
                        <div className="flex-1 text-center md:text-left">
                            <h1 className="font-display text-4xl font-bold gradient-gold mb-3">{scholar.name}</h1>
                            <p className="text-xl text-teal-400 mb-4">{scholar.currentDesignation}</p>
                            {scholar.institution && (
                                <p className="text-slate-300 mb-4">{scholar.institution}</p>
                            )}

                            {/* Contact Info */}
                            <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                                {scholar.email && (
                                    <a
                                        href={`mailto:${scholar.email}`}
                                        className="flex items-center gap-2 px-4 py-2 rounded-lg bg-teal-600/20 border border-teal-500/30 text-teal-300 hover:bg-teal-600/30 transition-colors"
                                    >
                                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                        </svg>
                                        <span className="text-sm">{scholar.email}</span>
                                    </a>
                                )}
                                {scholar.phone && (
                                    <a
                                        href={`tel:${scholar.phone}`}
                                        className="flex items-center gap-2 px-4 py-2 rounded-lg bg-indigo-600/20 border border-indigo-500/30 text-indigo-300 hover:bg-indigo-600/30 transition-colors"
                                    >
                                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                        </svg>
                                        <span className="text-sm">{scholar.phone}</span>
                                    </a>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Stats Cards */}
                <div className="grid md:grid-cols-3 gap-6 mb-8">
                    <div className="glass rounded-2xl p-6 text-center hover-lift">
                        <div className="text-4xl font-bold gradient-gold mb-2">{scholar.publications}</div>
                        <div className="text-sm text-slate-400 uppercase tracking-widest">Publications</div>
                    </div>
                    <div className="glass rounded-2xl p-6 text-center hover-lift">
                        <div className="text-4xl font-bold text-indigo-400 mb-2">{scholar.bookChapters}</div>
                        <div className="text-sm text-slate-400 uppercase tracking-widest">Book Chapters</div>
                    </div>
                    <div className="glass rounded-2xl p-6 text-center hover-lift">
                        <div className="text-4xl font-bold text-teal-400 mb-2">{scholar.status === 'current' ? 'Current' : 'Alumni'}</div>
                        <div className="text-sm text-slate-400 uppercase tracking-widest">Status</div>
                    </div>
                </div>

                {/* Ph.D. Details */}
                <div className="glass-strong rounded-3xl p-8 space-y-6">
                    <h2 className="text-2xl font-bold gradient-text mb-6">Ph.D. Details</h2>

                    {/* Thesis Title */}
                    <div>
                        <h3 className="text-sm font-semibold text-teal-400 uppercase tracking-wider mb-2">Thesis Title</h3>
                        <p className="text-lg text-slate-200 leading-relaxed">{scholar.thesisTitle}</p>
                    </div>

                    {/* Supervisors */}
                    {scholar.supervisors && scholar.supervisors.length > 0 && (
                        <div>
                            <h3 className="text-sm font-semibold text-teal-400 uppercase tracking-wider mb-2">Supervisors</h3>
                            <ul className="space-y-2">
                                {scholar.supervisors.map((supervisor, index) => (
                                    <li key={index} className="flex items-start gap-2 text-slate-300">
                                        <span className="text-gold mt-1">•</span>
                                        <span>{supervisor}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {/* Dates */}
                    {(scholar.thesisSubmissionDate || scholar.vivaDate) && (
                        <div className="grid md:grid-cols-2 gap-6 pt-4 border-t border-white/5">
                            {scholar.thesisSubmissionDate && (
                                <div>
                                    <h3 className="text-sm font-semibold text-teal-400 uppercase tracking-wider mb-2">Thesis Submission</h3>
                                    <p className="text-slate-300">{scholar.thesisSubmissionDate}</p>
                                </div>
                            )}
                            {scholar.vivaDate && (
                                <div>
                                    <h3 className="text-sm font-semibold text-teal-400 uppercase tracking-wider mb-2">Ph.D. Viva</h3>
                                    <p className="text-slate-300">{scholar.vivaDate}</p>
                                </div>
                            )}
                        </div>
                    )}

                    {/* Awards & Recognition */}
                    {scholar.awards && scholar.awards.length > 0 && (
                        <div className="pt-4 border-t border-white/5">
                            <h3 className="text-sm font-semibold text-teal-400 uppercase tracking-wider mb-3">Awards & Recognition</h3>
                            <ul className="space-y-2">
                                {scholar.awards.map((award, index) => (
                                    <li key={index} className="flex items-start gap-2 text-slate-300">
                                        <span className="text-gold mt-1">🏆</span>
                                        <span>{award}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            </main>

            {/* Background */}
            <div className="fixed inset-0 top-0 left-0 -z-10 pointer-events-none overflow-hidden mix-blend-screen">
                <div className="absolute -top-[20%] -left-[10%] h-[60%] w-[60%] rounded-full bg-teal-900/30 blur-[150px] animate-pulse-glow" />
                <div className="absolute top-[40%] -right-[10%] h-[50%] w-[50%] rounded-full bg-indigo-900/30 blur-[150px] animate-pulse-glow" style={{ animationDelay: '1s' }} />
            </div>
        </div>
    );
}
