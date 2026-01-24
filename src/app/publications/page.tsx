"use client";

import Navigation from "../../components/Navigation";
import ParticleBackground from "../../components/ParticleBackground";
import { profile } from "../../data/portfolio";

export default function PublicationsPage() {
    return (
        <div className="min-h-screen selection:bg-teal-500/30 selection:text-teal-200">
            <Navigation />
            <ParticleBackground />

            <main className="relative z-10 mx-auto max-w-7xl px-6 pt-32 pb-20">
                <section className="text-center mb-16">
                    <h1 className="font-display text-5xl font-bold gradient-text mb-4">Publications</h1>
                    <p className="text-slate-400 text-lg max-w-2xl mx-auto">
                        A comprehensive list of research papers, articles, and book chapters.
                    </p>
                </section>

                <div className="glass rounded-3xl p-8 md:p-12">
                    <div className="text-center py-12">
                        <p className="text-slate-300 text-xl mb-4">Publication list coming soon...</p>
                        <p className="text-slate-500">
                            For now, please refer to Google Scholar or ResearchGate profiles.
                        </p>
                        <div className="flex justify-center gap-4 mt-8">
                            <a 
                                href={profile.socials.googleScholar} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="px-6 py-2 rounded-full bg-teal-500/10 text-teal-400 border border-teal-500/30 hover:bg-teal-500/20 transition-all"
                            >
                                Google Scholar
                            </a>
                        </div>
                    </div>
                </div>
            </main>

            <div className="fixed inset-0 top-0 left-0 -z-10 pointer-events-none overflow-hidden mix-blend-screen">
                <div className="absolute -top-[20%] -left-[10%] h-[60%] w-[60%] rounded-full bg-teal-900/30 blur-[150px] animate-pulse-glow" />
                <div className="absolute bottom-[10%] right-[10%] h-[40%] w-[40%] rounded-full bg-indigo-900/20 blur-[120px] animate-pulse-glow" style={{ animationDelay: '2s' }} />
            </div>
        </div>
    );
}
