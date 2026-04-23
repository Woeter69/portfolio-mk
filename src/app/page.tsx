"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import Navigation from "../components/Navigation";
import FadeIn from "../components/FadeIn";
import {
  profile,
  researchAreas,
  achievements,
} from "../data/portfolio";
import YouTubeSection from "../components/YouTubeSection";

export default function Home() {
  const [scholarData, setScholarData] = useState<any>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
    fetch('/api/scholar')
      .then(res => res.json())
      .then(data => setScholarData(data))
      .catch(err => console.error('Failed to load scholar data', err));
  }, []);

  return (
    <div className={`min-h-screen bg-[#0B0F19] transition-opacity duration-400 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
      <Navigation />

      <main className="mx-auto max-w-5xl px-6 pt-32 pb-24 overflow-hidden">
        
        {/* Hero Section */}
        <section className="py-24">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-12 items-center">
            <div className="md:col-span-3 flex flex-col items-start text-left order-2 md:order-1">
              <FadeIn delay={0.1}>
                <h1 className="font-display text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
                  {profile.name}
                </h1>
              </FadeIn>
              <FadeIn delay={0.2}>
                <p className="font-body text-xl text-slate-400 max-w-2xl leading-relaxed">
                  <span className="text-[#E8C547] font-medium">More than 20 years</span> of research experience in the field of <span className="text-[#E8C547]">biophysical chemistry</span>, <span className="text-[#E8C547]">structural biology</span> and <span className="text-[#E8C547]">nano-biotechnology</span> for its application in gene/drug delivery and environmental remediation.
                </p>
              </FadeIn>
              <FadeIn delay={0.3}>
                <div className="w-16 h-px bg-[#E8C547] my-8"></div>
              </FadeIn>
              
              <FadeIn delay={0.4}>
                <div className="flex flex-wrap gap-6 mt-2">
                  <Link href="/publications" className="border border-[#1E2A3A] bg-[#0F1520] px-6 py-3 text-[#94A3B8] hover:border-[#E8C547] hover:text-white transition-colors duration-200 uppercase tracking-widest text-sm font-medium">
                    View Publications
                  </Link>
                  <Link href="/research-group" className="border border-[#1E2A3A] bg-[#0F1520] px-6 py-3 text-[#94A3B8] hover:border-[#E8C547] hover:text-white transition-colors duration-200 uppercase tracking-widest text-sm font-medium">
                    Research Group
                  </Link>
                </div>
              </FadeIn>
            </div>
            
            <div className="md:col-span-2 flex justify-center md:justify-end order-1 md:order-2">
              <FadeIn delay={0.2}>
                <div className="relative w-64 h-64 md:w-80 md:h-80 border border-[#1E2A3A] p-2 bg-[#0F1520] rounded-full overflow-hidden">
                  <div className="relative w-full h-full bg-[#0B0F19] rounded-full overflow-hidden">
                    <Image
                      src="/photo.jpg"
                      alt={profile.name}
                      fill
                      className="object-cover"
                      priority
                    />
                  </div>
                </div>
              </FadeIn>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        {scholarData && scholarData.stats && (
          <section className="py-24">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <FadeIn delay={0.1}>
                <div className="bg-[#0F1520] border border-[#1E2A3A] p-8 hover:border-[#E8C547] transition-colors duration-300 h-full">
                  <div className="font-display text-5xl text-[#E8C547] mb-3">{scholarData.stats.citations.all}</div>
                  <div className="font-body text-sm text-[#94A3B8] uppercase tracking-widest">Citations</div>
                </div>
              </FadeIn>
              <FadeIn delay={0.2}>
                <div className="bg-[#0F1520] border border-[#1E2A3A] p-8 hover:border-[#E8C547] transition-colors duration-300 h-full">
                  <div className="font-display text-5xl text-[#E8C547] mb-3">{scholarData.stats.h_index.all}</div>
                  <div className="font-body text-sm text-[#94A3B8] uppercase tracking-widest">h-index</div>
                </div>
              </FadeIn>
              <FadeIn delay={0.3}>
                <div className="bg-[#0F1520] border border-[#1E2A3A] p-8 hover:border-[#E8C547] transition-colors duration-300 h-full">
                  <div className="font-display text-5xl text-[#E8C547] mb-3">{scholarData.stats.i10_index.all}</div>
                  <div className="font-body text-sm text-[#94A3B8] uppercase tracking-widest">i10-index</div>
                </div>
              </FadeIn>
            </div>
          </section>
        )}

        {/* About & Fellowships - Asymmetric 2-column */}
        <section className="py-24">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="md:col-span-2">
              <FadeIn>
                <h2 className="font-display text-3xl text-white border-l-[3px] border-[#E8C547] pl-4 mb-10">
                  About
                </h2>
                <p className="font-body text-base text-[#94A3B8] leading-loose">
                  {profile.about}
                </p>
              </FadeIn>
            </div>
            <div className="md:col-span-1">
              <FadeIn delay={0.2}>
                <h3 className="font-display text-xl text-white mb-6">Fellowships & Awards</h3>
                <ul className="flex flex-col gap-5">
                  {achievements.slice(0, 5).map((item, i) => (
                    <li key={i} className="font-body text-sm text-[#94A3B8] leading-relaxed border-l-2 border-[#1E2A3A] pl-4">
                      {item}
                    </li>
                  ))}
                </ul>
              </FadeIn>
            </div>
          </div>
        </section>

        {/* Research Areas - 2-column asymmetric list */}
        <section className="py-24">
          <FadeIn>
            <h2 className="font-display text-3xl text-white border-l-[3px] border-[#E8C547] pl-4 mb-12">
              Research Focus
            </h2>
          </FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {researchAreas.map((area, index) => (
              <FadeIn key={area.title} delay={index * 0.1}>
                <div className="bg-[#0F1520] border border-[#1E2A3A] p-8 hover:border-[#E8C547] transition-colors duration-300 h-full">
                  <h3 className="font-display text-xl text-white mb-4">{area.title}</h3>
                  <p className="font-body text-[#94A3B8] text-sm leading-relaxed">{area.description}</p>
                </div>
              </FadeIn>
            ))}
          </div>
          <FadeIn delay={0.3}>
            <div className="mt-10">
              <Link href="/projects" className="font-body text-sm text-[#4A9EBF] hover:text-[#E8C547] transition-colors duration-200 uppercase tracking-widest font-medium">
                View Research Projects →
              </Link>
            </div>
          </FadeIn>
        </section>

        {/* YouTube Section */}
        <div className="py-24">
          <FadeIn>
            <h2 className="font-display text-3xl text-white border-l-[3px] border-[#E8C547] pl-4 mb-12">
              Featured Talk
            </h2>
            <YouTubeSection />
          </FadeIn>
        </div>

        {/* Contact Section */}
        <section id="contact" className="py-24 border-t border-[#1E2A3A]">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <FadeIn>
                <h2 className="font-display text-3xl text-white border-l-[3px] border-[#E8C547] pl-4 mb-6">
                  Get in Touch
                </h2>
                <p className="font-body text-[#94A3B8] text-base leading-relaxed">
                  Open to collaborations, research inquiries, and academic mentorship.
                </p>
              </FadeIn>
            </div>
            <div className="flex flex-col gap-4">
              <FadeIn delay={0.1}>
                <a href={`mailto:${profile.email[0]}`} className="bg-[#0F1520] border border-[#1E2A3A] p-6 text-white hover:border-[#E8C547] transition-colors duration-300 font-body flex items-center gap-4">
                  <span className="text-[#E8C547]">Primary</span>
                  {profile.email[0]}
                </a>
              </FadeIn>
              {profile.email[1] && (
                <FadeIn delay={0.2}>
                  <a href={`mailto:${profile.email[1]}`} className="bg-[#0F1520] border border-[#1E2A3A] p-6 text-white hover:border-[#E8C547] transition-colors duration-300 font-body flex items-center gap-4">
                    <span className="text-[#E8C547]">Secondary</span>
                    {profile.email[1]}
                  </a>
                </FadeIn>
              )}
            </div>
          </div>
        </section>
        
        <footer className="pt-12 border-t border-[#1E2A3A] text-center">
          <FadeIn>
            <p className="font-body text-xs text-[#94A3B8] uppercase tracking-widest">
              © {new Date().getFullYear()} {profile.name}. All rights reserved.
            </p>
          </FadeIn>
        </footer>

      </main>
    </div>
  );
}