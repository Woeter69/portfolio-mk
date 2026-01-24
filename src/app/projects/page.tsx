"use client";

import Navigation from "../../components/Navigation";
import ParticleBackground from "../../components/ParticleBackground";
import { researchAreas } from "../../data/portfolio";

export default function ProjectsPage() {
    return (
        <div className="min-h-screen selection:bg-teal-500/30 selection:text-teal-200">
            <Navigation />
            <ParticleBackground />

            <main className="relative z-10 mx-auto max-w-7xl px-6 pt-32 pb-20">
                <section className="text-center mb-16">
                    <h1 className="font-display text-5xl font-bold gradient-text mb-4">Research Projects</h1>
                    <p className="text-slate-400 text-lg max-w-2xl mx-auto">
                        Ongoing and completed research initiatives.
                    </p>
                </section>

                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {researchAreas.map((area, index) => (
                         <div key={area.title} className="group glass hover:glass-strong relative overflow-hidden rounded-2xl p-8 transition-all duration-500 md:min-h-[280px] hover-lift hover:border-teal-500/30">
                         <h3 className={`mb-4 text-xl font-bold relative z-10 ${index === 0 ? 'text-teal-400' :
                             index === 1 ? 'text-indigo-400' :
                               'text-pink-400'
                           }`}>{area.title}</h3>
                         <p className="text-slate-400 relative z-10 leading-relaxed">{area.description}</p>
         
                         {/* Hover gradient overlay */}
                         <div className={`absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500 ${index === 0 ? 'bg-gradient-to-br from-teal-500 to-cyan-500' :
                             index === 1 ? 'bg-gradient-to-br from-indigo-500 to-purple-500' :
                               'bg-gradient-to-br from-pink-500 to-rose-500'
                           }`}></div>
                       </div>
                    ))}
                </div>
                
                 <div className="text-center py-12 mt-12 glass rounded-3xl">
                    <p className="text-slate-300 text-xl">More detailed project descriptions coming soon...</p>
                </div>

            </main>

            <div className="fixed inset-0 top-0 left-0 -z-10 pointer-events-none overflow-hidden mix-blend-screen">
                 <div className="absolute top-[40%] -right-[10%] h-[50%] w-[50%] rounded-full bg-indigo-900/30 blur-[150px] animate-pulse-glow" style={{ animationDelay: '1s' }} />
                <div className="absolute bottom-[10%] left-[30%] h-[40%] w-[40%] rounded-full bg-cyan-900/20 blur-[120px] animate-pulse-glow" style={{ animationDelay: '2s' }} />
            </div>
        </div>
    );
}
