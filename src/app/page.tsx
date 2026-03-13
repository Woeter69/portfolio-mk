"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import Navigation from "../components/Navigation";
import ParticleBackground from "../components/ParticleBackground";
import AnimatedCounter from "../components/AnimatedCounter";
import {
  profile,
  researchAreas,
  achievements,
} from "../data/portfolio";
import YouTubeSection from "../components/YouTubeSection";

export default function Home() {
  const [scholarData, setScholarData] = useState<any>(null);

  useEffect(() => {
    fetch('/api/scholar')
      .then(res => res.json())
      .then(data => setScholarData(data))
      .catch(err => console.error('Failed to load scholar data', err));
  }, []);

  return (
    <div className="min-h-screen selection:bg-teal-500/30 selection:text-teal-200">
      <Navigation />
      <ParticleBackground />

      <main className="relative z-10 mx-auto max-w-7xl px-6 pt-32 pb-20">

        {/* Hero Section */}
        <section className="relative flex flex-col items-center justify-center py-20 text-center md:py-32">
          <h1 className="mb-8 font-display text-5xl font-bold tracking-tight gradient-gold md:text-7xl animate-fadeIn">
            {profile.name}
          </h1>

          {/* Floating Profile Photo */}
          <div className="relative mb-8 h-40 w-40 overflow-hidden rounded-full border-4 border-teal-500/30 shadow-2xl shadow-teal-500/20 md:h-56 md:w-56 animate-float hover-lift">
            <div className="absolute inset-0 bg-gradient-to-br from-teal-500/20 to-transparent z-10 pointer-events-none"></div>
            <Image
              src="/photo.jpg"
              alt={profile.name}
              width={224}
              height={224}
              className="object-cover w-full h-full"
              priority
            />
          </div>

          {/* Tagline */}
          <div className="max-w-4xl px-4 animate-slideUp" style={{ animationDelay: '0.2s', opacity: 0 }}>
            <p className="font-display text-2xl font-medium leading-relaxed text-slate-800 md:text-3xl lg:text-4xl">
              <span className="text-teal-600 font-semibold">More than 20 years</span> of research experience in the field of <span className="text-teal-600 font-semibold">biophysical chemistry</span>, <span className="text-teal-600 font-semibold">structural biology</span> and <span className="text-teal-600 font-semibold">nano-biotechnology</span> for its application in gene/drug delivery and environmental remediation.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="mt-10 flex flex-wrap gap-4 justify-center animate-slideUp" style={{ animationDelay: '0.4s', opacity: 0 }}>
            <Link href="/publications" className="group relative overflow-hidden rounded-full bg-gradient-to-r from-teal-600 to-teal-500 px-8 py-3 text-sm font-semibold text-white shadow-lg shadow-teal-500/20 transition-all hover:shadow-xl hover:shadow-teal-500/30 hover:scale-105">
              <span className="relative z-10">View Publications</span>
              <div className="absolute inset-0 bg-gradient-to-r from-teal-500 to-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </Link>
            <Link href="/research-group" className="group rounded-full border-2 border-teal-500/20 bg-teal-500/5 px-8 py-3 text-sm font-semibold text-teal-700 transition-all hover:bg-teal-500/10 hover:border-teal-400/40 hover:scale-105 backdrop-blur-sm">
              Research Group
            </Link>
            <a href="#contact" className="group rounded-full border-2 border-indigo-500/20 bg-indigo-500/5 px-8 py-3 text-sm font-semibold text-indigo-700 transition-all hover:bg-indigo-500/10 hover:border-indigo-400/40 hover:scale-105 backdrop-blur-sm">
              Contact Me
            </a>
          </div>
        </section>

        {/* Stats Section */}
        {scholarData && scholarData.stats && (
          <section className="py-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <div className="group text-center p-8 bg-white border border-amber-500/10 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 hover-lift">
                <div className="text-5xl font-bold gradient-gold mb-3">
                  <AnimatedCounter end={scholarData.stats.citations.all} />
                </div>
                <div className="text-sm text-slate-500 uppercase tracking-widest font-bold">Citations</div>
                <div className="mt-3 h-1 w-16 mx-auto bg-gradient-to-r from-amber-500 to-yellow-500 rounded-full opacity-30 group-hover:opacity-60 transition-opacity"></div>
              </div>
              <div className="group text-center p-8 bg-white border border-teal-500/10 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 hover-lift">
                <div className="text-5xl font-bold text-teal-600 mb-3">
                  <AnimatedCounter end={scholarData.stats.h_index.all} />
                </div>
                <div className="text-sm text-slate-500 uppercase tracking-widest font-bold">h-index</div>
                <div className="mt-3 h-1 w-16 mx-auto bg-gradient-to-r from-teal-500 to-cyan-500 rounded-full opacity-30 group-hover:opacity-60 transition-opacity"></div>
              </div>
              <div className="group text-center p-8 bg-white border border-indigo-500/10 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 hover-lift">
                <div className="text-5xl font-bold text-indigo-600 mb-3">
                  <AnimatedCounter end={scholarData.stats.i10_index.all} />
                </div>
                <div className="text-sm text-slate-500 uppercase tracking-widest font-bold">i10-index</div>
                <div className="mt-3 h-1 w-16 mx-auto bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full opacity-30 group-hover:opacity-60 transition-opacity"></div>
              </div>
            </div>
          </section>
        )}

        {/* About Section */}
        <section className="py-20">
          <div className="grid gap-12 md:grid-cols-2 items-start">
            <div className="space-y-6">
              <h2 className="flex items-center gap-3 font-display text-3xl font-bold gradient-text">
                <span className="h-px w-8 bg-gradient-to-r from-teal-500 to-transparent"></span>
                About
              </h2>
              <p className="text-lg leading-relaxed text-slate-600">
                {profile.about}
              </p>
              <div className="flex gap-4 pt-4">
                <Link href="/publications" className="text-sm font-bold text-teal-600 hover:text-teal-500 transition flex items-center gap-2">
                  View Publications <span>→</span>
                </Link>
              </div>
            </div>
            <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm">
              <h3 className="mb-6 text-xl font-bold text-slate-900">Distinguished Fellowships</h3>
              <ul className="space-y-4">
                {achievements.slice(0, 4).map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-slate-600">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-500"></span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Research Areas */}
        <section className="py-20">
          <h2 className="mb-12 text-center font-display text-4xl gradient-text font-bold">Research Focus</h2>
          <div className="grid gap-6 md:grid-cols-3">
            {researchAreas.map((area, index) => (
              <div key={area.title} className="group bg-white border border-slate-100 relative overflow-hidden rounded-2xl p-8 transition-all duration-500 md:min-h-[280px] hover-lift shadow-sm hover:shadow-xl hover:border-teal-500/20">
                <h3 className={`mb-4 text-xl font-bold relative z-10 ${index === 0 ? 'text-teal-600' :
                  index === 1 ? 'text-indigo-600' :
                    'text-pink-600'
                  }`}>{area.title}</h3>
                <p className="text-slate-500 relative z-10 leading-relaxed font-medium">{area.description}</p>

                {/* Hover gradient overlay */}
                <div className={`absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity duration-500 ${index === 0 ? 'bg-gradient-to-br from-teal-500 to-cyan-500' :
                  index === 1 ? 'bg-gradient-to-br from-indigo-500 to-purple-500' :
                    'bg-gradient-to-br from-pink-500 to-rose-500'
                  }`}></div>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link href="/projects" className="inline-flex items-center gap-2 text-teal-400 hover:text-teal-300 transition">
              View Research Projects <span>→</span>
            </Link>
          </div>
        </section>

        {/* YouTube Section */}
        <YouTubeSection />

        {/* Contact Section */}
        <section id="contact" className="mt-20 rounded-3xl bg-gradient-to-br from-teal-900/20 via-cyan-900/10 to-indigo-900/20 px-6 py-16 text-center ring-1 ring-teal-500/30 relative overflow-hidden">
          {/* Decorative gradient orbs */}
          <div className="absolute top-0 left-1/4 w-64 h-64 bg-teal-500/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl"></div>

          <div className="relative z-10">
            <h2 className="font-display text-4xl gradient-text font-bold">Get in Touch</h2>
            <p className="mx-auto mt-4 max-w-xl text-slate-300 text-lg leading-relaxed">
              Open to collaborations, research inquiries, and academic mentorship.
            </p>
            <div className="mt-8 flex flex-col items-center gap-4 md:flex-row md:justify-center">
              <a href={`mailto:${profile.email[0]}`} className="group flex items-center gap-3 rounded-xl bg-gradient-to-r from-teal-600 to-cyan-600 px-8 py-4 text-white transition-all hover:shadow-xl hover:shadow-teal-500/30 hover:scale-105">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span className="font-medium">{profile.email[0]}</span>
              </a>
              <a href={`mailto:${profile.email[1]}`} className="group flex items-center gap-3 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 px-8 py-4 text-white transition-all hover:shadow-xl hover:shadow-indigo-500/30 hover:scale-105">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span className="font-medium">{profile.email[1]}</span>
              </a>
            </div>
            <p className="mt-12 text-xs text-slate-500">
              © {new Date().getFullYear()} {profile.name}. All rights reserved.
            </p>
          </div>
        </section>

      </main>

      {/* Background */}
      <div className="fixed inset-0 top-0 left-0 -z-10 pointer-events-none overflow-hidden">
        <div className="absolute -top-[20%] -left-[10%] h-[60%] w-[60%] rounded-full bg-teal-100/40 blur-[150px] animate-pulse-glow" />
        <div className="absolute top-[40%] -right-[10%] h-[50%] w-[50%] rounded-full bg-indigo-100/40 blur-[150px] animate-pulse-glow" style={{ animationDelay: '1s' }} />
        <div className="absolute bottom-[10%] left-[30%] h-[40%] w-[40%] rounded-full bg-cyan-100/30 blur-[120px] animate-pulse-glow" style={{ animationDelay: '2s' }} />
      </div>
    </div>
  );
}
