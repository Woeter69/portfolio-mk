"use client";

import Navigation from "../../components/Navigation";
import ParticleBackground from "../../components/ParticleBackground";

export default function AdministrativePage() {
    return (
        <div className="min-h-screen selection:bg-teal-500/30 selection:text-teal-200">
            <Navigation />
            <ParticleBackground />

            <main className="relative z-10 mx-auto max-w-7xl px-6 pt-32 pb-20">
                <section className="text-center mb-16">
                    <h1 className="font-display text-5xl font-bold gradient-text mb-4">Administrative Responsibilities</h1>
                    <p className="text-slate-400 text-lg max-w-2xl mx-auto">
                        Service to the university and academic community.
                    </p>
                </section>

                <div className="glass rounded-3xl p-8 md:p-12">
                     <div className="text-center py-20">
                        <p className="text-slate-300 text-xl">Administrative details coming soon...</p>
                    </div>
                </div>
            </main>

            <div className="fixed inset-0 top-0 left-0 -z-10 pointer-events-none overflow-hidden mix-blend-screen">
                <div className="absolute top-[10%] left-[30%] h-[40%] w-[40%] rounded-full bg-cyan-900/20 blur-[120px] animate-pulse-glow" style={{ animationDelay: '0.5s' }} />
                <div className="absolute bottom-[10%] right-[30%] h-[40%] w-[40%] rounded-full bg-teal-900/20 blur-[120px] animate-pulse-glow" style={{ animationDelay: '2.5s' }} />
            </div>
        </div>
    );
}
