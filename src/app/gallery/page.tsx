"use client";

import Navigation from "../../components/Navigation";
import ParticleBackground from "../../components/ParticleBackground";

export default function GalleryPage() {
    return (
        <div className="min-h-screen selection:bg-teal-500/30 selection:text-teal-200">
            <Navigation />
            <ParticleBackground />

            <main className="relative z-10 mx-auto max-w-7xl px-6 pt-32 pb-20">
                <section className="text-center mb-16">
                    <h1 className="font-display text-5xl font-bold gradient-text mb-4">Gallery</h1>
                    <p className="text-slate-400 text-lg max-w-2xl mx-auto">
                        Photos from our lab, conferences, and events.
                    </p>
                </section>

                <div className="glass rounded-3xl p-8 md:p-12">
                    <div className="text-center py-20">
                        <div className="inline-block p-4 rounded-full bg-slate-800/50 mb-6">
                            <svg className="w-12 h-12 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                        </div>
                        <p className="text-slate-300 text-xl">Photo gallery coming soon...</p>
                    </div>
                </div>
            </main>

            <div className="fixed inset-0 top-0 left-0 -z-10 pointer-events-none overflow-hidden mix-blend-screen">
                <div className="absolute -top-[20%] right-[20%] h-[60%] w-[60%] rounded-full bg-teal-900/30 blur-[150px] animate-pulse-glow" />
                 <div className="absolute bottom-[20%] left-[10%] h-[50%] w-[50%] rounded-full bg-indigo-900/30 blur-[150px] animate-pulse-glow" style={{ animationDelay: '1.5s' }} />
            </div>
        </div>
    );
}
