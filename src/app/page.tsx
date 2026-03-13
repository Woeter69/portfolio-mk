"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import Navigation from "../components/Navigation";
import {
  profile,
  researchAreas,
  achievements,
} from "../data/portfolio";
import YouTubeSection from "../components/YouTubeSection";
import { Award, BookOpen, Mail, ArrowRight, TrendingUp, Users } from "lucide-react";

export default function Home() {
  const [scholarData, setScholarData] = useState<any>(null);

  useEffect(() => {
    fetch('/api/scholar')
      .then(res => res.json())
      .then(data => setScholarData(data))
      .catch(err => console.error('Failed to load scholar data', err));
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main className="max-w-7xl mx-auto px-6 pt-32 pb-20">
        
        {/* Hero Section - Professional Academic */}
        <section className="grid lg:grid-cols-12 gap-12 items-center mb-32 pt-10">
          <div className="lg:col-span-7 animate-fadeIn">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent-teal/10 text-accent-teal text-xs font-bold uppercase tracking-widest mb-6 border border-accent-teal/20">
              Professor & Researcher
            </div>
            <h1 className="text-6xl md:text-8xl font-bold mb-8 text-foreground tracking-tight leading-[0.9]">
              Mahima <br />
              <span className="text-accent-teal">Kaushik</span>
            </h1>
            <p className="text-xl text-slate-500 mb-10 leading-relaxed max-w-2xl font-sans">
              Professor at the Cluster Innovation Centre, University of Delhi. 
              Dedicated to <span className="text-foreground font-semibold">Nano-biotechnology</span> and 
              the biophysical study of polymorphic DNA structure for drug delivery.
            </p>
            
            <div className="flex flex-wrap gap-4">
              <Link 
                href="/publications" 
                className="px-8 py-4 bg-foreground text-background rounded-xl font-bold transition-all hover:opacity-90 flex items-center gap-2 group"
              >
                Explore Publications
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link 
                href="/research-group" 
                className="px-8 py-4 border-academic rounded-xl font-bold text-foreground hover:bg-muted transition-all"
              >
                Research Group
              </Link>
            </div>
          </div>

          <div className="lg:col-span-5 relative animate-fadeIn" style={{ animationDelay: '0.2s' }}>
            <div className="relative rounded-[2.5rem] overflow-hidden aspect-[4/5] border-academic shadow-2xl grayscale hover:grayscale-0 transition-all duration-700">
              <Image
                src="/photo.jpg"
                alt="Prof. Mahima Kaushik"
                fill
                className="object-cover transition-transform duration-1000 hover:scale-110"
                priority
              />
            </div>
            {/* Minimalist Stat Overlay */}
            <div className="absolute -bottom-6 -left-6 p-6 bg-background border-academic rounded-2xl shadow-xl hidden md:block">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-accent-teal/10 rounded-xl text-accent-teal">
                  <Award className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-2xl font-bold leading-none">20+</div>
                  <div className="text-[10px] uppercase tracking-widest text-slate-500 font-bold mt-1">Years Research</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Core Impact Section */}
        <section className="mb-32 grid md:grid-cols-3 gap-1px bg-border-subtle border-academic rounded-[2.5rem] overflow-hidden shadow-sm">
          <div className="bg-background p-10 flex flex-col justify-between group hover:bg-muted transition-colors">
            <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
              <BookOpen className="w-6 h-6 text-accent-teal" />
              Academic
            </h3>
            <p className="text-slate-500 leading-relaxed mb-8">
              Guided over {scholarData?.stats?.i10_index.all || 30}+ research projects and mentored numerous PhD scholars in biophysical chemistry.
            </p>
            <Link href="/teaching" className="text-sm font-bold text-accent-teal flex items-center gap-2 group-hover:gap-3 transition-all">
              Mentorship Details <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="bg-background p-10 flex flex-col justify-between group hover:bg-muted transition-colors">
            <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
              <TrendingUp className="w-6 h-6 text-indigo-500" />
              Impact
            </h3>
            <p className="text-slate-500 leading-relaxed mb-8">
              Ranked among top researchers with {scholarData?.stats?.citations.all.toLocaleString() || "1000+"} citations across global scientific journals.
            </p>
            <Link href="/publications" className="text-sm font-bold text-indigo-500 flex items-center gap-2 group-hover:gap-3 transition-all">
              Discovery Profile <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="bg-background p-10 flex flex-col justify-between group hover:bg-muted transition-colors">
            <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
              <Users className="w-6 h-6 text-pink-500" />
              Leadership
            </h3>
            <p className="text-slate-500 leading-relaxed mb-8">
              Holding key administrative roles including Provost and Coordinator for Design Innovation at Delhi University.
            </p>
            <Link href="/administrative" className="text-sm font-bold text-pink-500 flex items-center gap-2 group-hover:gap-3 transition-all">
              Administration <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>

        {/* Research Areas - Simple Vertical List */}
        <section className="mb-32 grid lg:grid-cols-12 gap-16">
          <div className="lg:col-span-4">
            <h2 className="text-4xl font-bold mb-6 leading-tight">Current <br /><span className="text-accent-teal italic font-serif">Research</span> Focus</h2>
            <p className="text-slate-500 leading-relaxed">
              Our lab focuses on the intersection of chemistry and biology, developing new methodologies for gene delivery and environmental safety.
            </p>
          </div>
          <div className="lg:col-span-8 grid gap-4">
            {researchAreas.map((area, index) => (
              <div key={index} className="p-8 rounded-2xl border-academic hover:border-accent-teal/50 transition-all flex items-start gap-6 group">
                <div className="text-4xl font-serif text-slate-200 group-hover:text-accent-teal/20 transition-colors">0{index + 1}</div>
                <div>
                  <h3 className="text-xl font-bold mb-2">{area.title}</h3>
                  <p className="text-slate-500 leading-relaxed text-sm">
                    {area.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* YouTube Section - Integrates into flow */}
        <div className="mb-32">
           <YouTubeSection />
        </div>

        {/* Contact Footer Card */}
        <section id="contact" className="p-12 md:p-20 bg-foreground text-background rounded-[3rem] text-center relative overflow-hidden">
          {/* Subtle pattern */}
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:20px_20px]"></div>
          
          <div className="relative z-10">
            <h2 className="text-4xl md:text-6xl font-bold mb-8">Work Together</h2>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto mb-12">
              Seeking collaboration or research guidance? Let's connect and discuss scientific advancements.
            </p>
            <div className="flex flex-wrap justify-center gap-6">
              <a href={`mailto:${profile.email[0]}`} className="px-10 py-5 bg-background text-foreground rounded-2xl font-bold hover:scale-105 transition-transform flex items-center gap-3 shadow-2xl">
                <Mail className="w-5 h-5 text-accent-teal" />
                {profile.email[0]}
              </a>
              <div className="hidden md:flex items-center text-slate-700 font-serif italic text-2xl px-4">or</div>
              <a href={`mailto:${profile.email[1]}`} className="px-10 py-5 border border-white/10 rounded-2xl font-bold hover:bg-white/5 transition-all text-white">
                {profile.email[1]}
              </a>
            </div>
            <div className="mt-20 pt-10 border-t border-white/5 text-slate-500 text-xs tracking-[0.3em] uppercase">
              © {new Date().getFullYear()} Professor Mahima Kaushik
            </div>
          </div>
        </section>

      </main>
    </div>
  );
}
