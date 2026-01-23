"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import Modal from "../components/Modal";
import YouTubeSection from "../components/YouTubeSection";
import AnimatedCounter from "../components/AnimatedCounter";
import ParticleBackground from "../components/ParticleBackground";
import { useScrollAnimation } from "../lib/useScrollAnimation";
import {
  profile,
  researchAreas,
  education,
  experience,
  achievements,
  publications,
  projects
} from "../data/portfolio";

const navLinks = [
  { href: "#about", label: "About" },
  { href: "#research", label: "Research" },

  { href: "#publications", label: "Publications" },
  { href: "#teaching", label: "Teaching" },
  { href: "#youtube", label: "Content" },
  { href: "#contact", label: "Contact" },
] as const;

export default function Home() {
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [scholarData, setScholarData] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedYear, setSelectedYear] = useState<string>("All");
  const [sortBy, setSortBy] = useState<string>("year-desc");

  const publicationsSource = (scholarData && scholarData.publications) ? scholarData.publications : publications;

  // Get unique years for filter dropdown
  const uniqueYears = Array.from(new Set(publicationsSource.map((p: any) => p.year.toString()))).sort().reverse();

  const filteredPublications = publicationsSource.filter((pub: any) => {
    const matchesSearch =
      pub.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      pub.authors.toLowerCase().includes(searchQuery.toLowerCase()) ||
      pub.journal.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesYear = selectedYear === "All" || pub.year.toString() === selectedYear;

    return matchesSearch && matchesYear;
  }).sort((a: any, b: any) => {
    if (sortBy === 'year-desc') return parseInt(b.year) - parseInt(a.year);
    if (sortBy === 'year-asc') return parseInt(a.year) - parseInt(b.year);
    if (sortBy === 'citations-desc') return (b.citations || 0) - (a.citations || 0);
    if (sortBy === 'citations-asc') return (a.citations || 0) - (b.citations || 0);
    return 0;
  });

  useEffect(() => {
    fetch('/api/scholar')
      .then(res => res.json())
      .then(data => setScholarData(data))
      .catch(err => console.error('Failed to load scholar data', err));
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const closeModal = () => setActiveModal(null);

  return (
    <div className="min-h-screen selection:bg-teal-500/30 selection:text-teal-200">
      {/* Floating Header */}
      <header
        className={`fixed left-0 right-0 z-50 flex justify-center px-4 transition-all duration-500 ease-in-out ${isScrolled ? 'top-6' : 'top-0'
          }`}
      >
        <nav className={`flex items-center gap-6 px-6 py-3 transition-all duration-500 ${isScrolled
            ? 'glass rounded-full shadow-2xl ring-1 ring-white/10'
            : 'bg-transparent rounded-none shadow-none'
          }`}>
          <Link href="#" className="font-display text-lg font-bold tracking-wide gradient-gold">
            {profile.name}
          </Link>
          <div className="hidden h-4 w-px bg-white/10 md:block" />
          <div className="hidden items-center gap-6 md:flex">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-slate-400 transition-colors hover:text-teal-300"
              >
                {link.label}
              </a>
            ))}
          </div>
        </nav>
      </header>

      <main className="relative z-10 mx-auto max-w-7xl px-6 pt-32 pb-20">

        {/* Hero Section */}
        <section className="relative flex flex-col items-center justify-center py-20 text-center md:py-32">

          {/* Big Name Text - Gradient Gold with Animation */}
          <h1
            className="mb-8 font-display text-5xl font-bold tracking-tight gradient-gold md:text-7xl animate-fadeIn"
          >
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

          {/* Tagline with staggered animation */}
          <div className="max-w-4xl px-4 animate-slideUp" style={{ animationDelay: '0.2s', opacity: 0 }}>
            <p className="font-display text-2xl font-medium leading-relaxed text-slate-200 md:text-3xl lg:text-4xl">
              <span className="text-teal-400 font-semibold">More than 20 years</span> of research experience in the field of <span className="text-teal-400 font-semibold">biophysical chemistry</span>, <span className="text-teal-400 font-semibold">structural biology</span> and <span className="text-teal-400 font-semibold">nano-biotechnology</span> for its application in gene/drug delivery and environmental remediation.
            </p>
          </div>

          {/* CTA Buttons with enhanced styling */}
          <div className="mt-10 flex gap-4 animate-slideUp" style={{ animationDelay: '0.4s', opacity: 0 }}>
            <a href="#about" className="group relative overflow-hidden rounded-full bg-gradient-to-r from-teal-600 to-teal-500 px-8 py-3 text-sm font-semibold text-white shadow-lg shadow-teal-500/30 transition-all hover:shadow-xl hover:shadow-teal-500/40 hover:scale-105">
              <span className="relative z-10">Explore Work</span>
              <div className="absolute inset-0 bg-gradient-to-r from-teal-500 to-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </a>
            <a href="#contact" className="group rounded-full border-2 border-teal-500/30 bg-teal-500/5 px-8 py-3 text-sm font-semibold text-white transition-all hover:bg-teal-500/10 hover:border-teal-400/50 hover:scale-105 backdrop-blur-sm">
              Contact Me
            </a>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-20">
          <div className="grid gap-12 md:grid-cols-2 items-start">
            <div className="space-y-6">
              <h2 className="flex items-center gap-3 font-display text-3xl text-white">
                <span className="h-px w-8 bg-gold"></span>
                About the Professor
              </h2>
              <p className="text-lg leading-relaxed text-slate-400">
                {profile.about}
              </p>

              {/* Scholar Stats Section */}
              {scholarData && scholarData.stats && (
                <div className="grid grid-cols-3 gap-4 py-6">
                  <div className="group text-center p-6 bg-gradient-to-br from-amber-900/20 to-yellow-900/10 rounded-2xl ring-1 ring-amber-500/20 hover:ring-amber-500/40 transition-all duration-300 hover-lift">
                    <div className="text-4xl font-bold gradient-gold mb-2">
                      <AnimatedCounter end={scholarData.stats.citations.all} />
                    </div>
                    <div className="text-xs text-slate-400 uppercase tracking-widest">Citations</div>
                    <div className="mt-2 h-1 w-12 mx-auto bg-gradient-to-r from-amber-500 to-yellow-500 rounded-full opacity-50 group-hover:opacity-100 transition-opacity"></div>
                  </div>
                  <div className="group text-center p-6 bg-gradient-to-br from-teal-900/20 to-cyan-900/10 rounded-2xl ring-1 ring-teal-500/20 hover:ring-teal-500/40 transition-all duration-300 hover-lift">
                    <div className="text-4xl font-bold text-teal-400 mb-2">
                      <AnimatedCounter end={scholarData.stats.h_index.all} />
                    </div>
                    <div className="text-xs text-slate-400 uppercase tracking-widest">h-index</div>
                    <div className="mt-2 h-1 w-12 mx-auto bg-gradient-to-r from-teal-500 to-cyan-500 rounded-full opacity-50 group-hover:opacity-100 transition-opacity"></div>
                  </div>
                  <div className="group text-center p-6 bg-gradient-to-br from-indigo-900/20 to-purple-900/10 rounded-2xl ring-1 ring-indigo-500/20 hover:ring-indigo-500/40 transition-all duration-300 hover-lift">
                    <div className="text-4xl font-bold text-indigo-400 mb-2">
                      <AnimatedCounter end={scholarData.stats.i10_index.all} />
                    </div>
                    <div className="text-xs text-slate-400 uppercase tracking-widest">i10-index</div>
                    <div className="mt-2 h-1 w-12 mx-auto bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full opacity-50 group-hover:opacity-100 transition-opacity"></div>
                  </div>
                </div>
              )}

              <button
                onClick={() => setActiveModal('about')}
                className="group flex items-center gap-2 text-sm font-medium text-gold hover:text-white transition"
              >
                Read Full Profile <span className="transition-transform group-hover:translate-x-1">→</span>
              </button>

              {/* Modal Content for About */}
              <Modal isOpen={activeModal === 'about'} onClose={closeModal} title="Full Profile">
                <div className="space-y-6">
                  <p className="text-lg text-slate-300 leading-relaxed">{profile.about}</p>

                  {scholarData && scholarData.stats && (
                    <div>
                      <h3 className="text-xl font-bold text-teal-400 mb-4">Research Impact (Google Scholar)</h3>
                      <div className="grid grid-cols-2 gap-4 mb-6">
                        <div>
                          <p className="text-sm text-slate-400">Total Citations</p>
                          <p className="text-xl font-mono text-white">{scholarData.stats.citations.all} <span className="text-xs text-slate-500">(Since 2018: {scholarData.stats.citations.since2018})</span></p>
                        </div>
                        <div>
                          <p className="text-sm text-slate-400">h-index</p>
                          <p className="text-xl font-mono text-white">{scholarData.stats.h_index.all} <span className="text-xs text-slate-500">({scholarData.stats.h_index.since2018})</span></p>
                        </div>
                        <div>
                          <p className="text-sm text-slate-400">i10-index</p>
                          <p className="text-xl font-mono text-white">{scholarData.stats.i10_index.all} <span className="text-xs text-slate-500">({scholarData.stats.i10_index.since2018})</span></p>
                        </div>
                      </div>
                    </div>
                  )}

                  <div>
                    <h3 className="text-xl font-bold text-teal-400 mb-4">Contact Details</h3>
                    <p><strong>Email:</strong> {profile.email.join(', ')}</p>
                    <p><strong>Address:</strong> {profile.address}</p>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-teal-400 mb-4">Current Projects</h3>
                    <ul className="list-disc pl-5 space-y-2">
                      {projects.map((p, i) => <li key={i}>{p}</li>)}
                    </ul>
                  </div>
                </div>
              </Modal>

            </div>
            <div className="bg-surface glass rounded-3xl p-8 sticky top-32">
              <h3 className="mb-6 text-xl font-semibold text-white">Distinguished Fellowships</h3>
              <ul className="space-y-4">
                {achievements.slice(0, 4).map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-slate-300">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gold"></span>
                    {item}
                  </li>
                ))}
              </ul>
              <button
                onClick={() => setActiveModal('achievements')}
                className="mt-6 hidden text-xs font-medium text-slate-500 hover:text-white"
              >
                View All Achievements →
              </button>

              <Modal isOpen={activeModal === 'achievements'} onClose={closeModal} title="All Achievements & Recognitions">
                <ul className="space-y-4 text-slate-300">
                  {achievements.map((item, i) => (
                    <li key={i} className="flex items-start gap-3 border-b border-white/5 pb-3 last:border-0">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gold"></span>
                      {item}
                    </li>
                  ))}
                </ul>
              </Modal>
            </div>
          </div>
        </section>

        {/* Research Grid */}
        <section id="research" className="py-20">
          <h2 className="mb-12 text-center font-display text-4xl gradient-text font-bold">Research Focus</h2>
          <div className="grid gap-6 md:grid-cols-3">
            {researchAreas.map((area, index) => (
              <div key={area.title} className="group glass hover:glass-strong relative overflow-hidden rounded-2xl p-8 transition-all duration-500 md:min-h-[300px] hover-lift hover:border-teal-500/30">

                {/* Specific Vector based on Index */}
                <div className="absolute top-0 right-0 -mt-6 -mr-6 h-32 w-32 transition-all duration-500 group-hover:scale-125 group-hover:rotate-12 opacity-60 group-hover:opacity-100">
                  {index === 0 && ( /* Nanobiotech - Virus/Nanoparticle */
                    <svg viewBox="0 0 100 100" className="w-full h-full text-teal-500/30 fill-teal-500/10 group-hover:text-teal-400/40" stroke="currentColor" strokeWidth="1">
                      <circle cx="50" cy="50" r="30" />
                      <path d="M50 20 L50 10 M50 80 L50 90 M20 50 L10 50 M80 50 L90 50 M29 29 L22 22 M71 71 L78 78 M29 71 L22 78 M71 29 L78 22" />
                      <circle cx="50" cy="50" r="10" fill="currentColor" className="text-teal-400/40" />
                    </svg>
                  )}
                  {index === 1 && ( /* Biophysical - DNA Quadruplex */
                    <svg viewBox="0 0 100 100" className="w-full h-full text-indigo-500/30 fill-indigo-500/10 group-hover:text-indigo-400/40" stroke="currentColor" strokeWidth="1">
                      <rect x="30" y="20" width="40" height="10" rx="2" />
                      <rect x="30" y="40" width="40" height="10" rx="2" />
                      <rect x="30" y="60" width="40" height="10" rx="2" />
                      <line x1="50" y1="10" x2="50" y2="90" stroke="currentColor" strokeDasharray="4 2" />
                    </svg>
                  )}
                  {index === 2 && ( /* Structural - Protein Ribbon */
                    <svg viewBox="0 0 100 100" className="w-full h-full text-pink-500/30 fill-pink-500/10 group-hover:text-pink-400/40" stroke="currentColor" strokeWidth="1">
                      <path d="M20 80 Q 40 10, 50 50 T 80 20" fill="none" strokeWidth="3" />
                      <circle cx="20" cy="80" r="3" fill="currentColor" />
                      <circle cx="80" cy="20" r="3" fill="currentColor" />
                      <path d="M25 85 Q 45 15, 55 55 T 85 25" fill="none" strokeWidth="1" opacity="0.5" />
                    </svg>
                  )}
                </div>

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
        </section>

        {/* Publications */}
        <section id="publications" className="py-20">
          <div className="mx-auto max-w-4xl">
            <h2 className="mb-12 flex items-center gap-4 font-display text-3xl text-white font-bold">
              <span className="h-px flex-1 bg-gradient-to-r from-transparent to-teal-500/50"></span>
              <span className="gradient-text">Selected Publications</span>
              <span className="h-px flex-1 bg-gradient-to-l from-transparent to-teal-500/50"></span>
            </h2>
            <div className="space-y-6">
              {scholarData && scholarData.publications ? (
                scholarData.publications.slice(0, 3).map((pub: any, i: number) => (
                  <div key={i} className="glass rounded-xl p-6 transition-all hover:glass-strong hover-lift hover:border-teal-500/30">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-sm font-bold bg-gradient-to-r from-amber-500 to-yellow-500 bg-clip-text text-transparent">{pub.year}</span>
                      <span className="text-slate-600">•</span>
                      <span className="text-sm text-slate-400">{pub.journal}</span>
                      <span className="ml-auto px-3 py-1 rounded-full bg-teal-500/10 border border-teal-500/20 text-xs font-semibold text-teal-400">
                        {pub.citations} Citations
                      </span>
                    </div>
                    <h4 className="mt-2 text-lg font-medium text-white leading-relaxed">
                      <a href={pub.link} target="_blank" rel="noopener noreferrer" className="hover:text-teal-400 transition-colors">
                        {pub.title}
                      </a>
                    </h4>
                    <p className="mt-2 text-slate-400 text-sm">{pub.authors}</p>
                  </div>
                ))
              ) : (
                publications.slice(0, 3).map((pub, i) => (
                  <div key={i} className="glass rounded-xl p-6 transition-all hover:glass-strong hover-lift hover:border-teal-500/30">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-sm font-bold bg-gradient-to-r from-amber-500 to-yellow-500 bg-clip-text text-transparent">{pub.year}</span>
                      <span className="text-slate-600">•</span>
                      <span className="text-sm text-slate-400">{pub.journal}</span>
                    </div>
                    <h4 className="mt-2 text-lg font-medium text-white leading-relaxed">{pub.title}</h4>
                    <p className="mt-2 text-slate-400 text-sm">{pub.authors}</p>
                  </div>
                ))
              )}

              <div className="mt-8 text-center bg-gradient-to-r from-teal-900/20 via-cyan-900/20 to-teal-900/20 rounded-xl p-6 cursor-pointer hover:from-teal-900/30 hover:via-cyan-900/30 hover:to-teal-900/30 transition-all ring-1 ring-teal-500/20 hover:ring-teal-500/40 group" onClick={() => setActiveModal('publications')}>
                <span className="text-sm font-medium text-teal-300 group-hover:text-teal-200 transition-colors">
                  View Full Publication List ({(scholarData && scholarData.publications) ? scholarData.publications.length : publications.length}+ items) →
                </span>
              </div>

              <Modal isOpen={activeModal === 'publications'} onClose={closeModal} title="Complete List of Publications">

                {/* Search and Filter Controls */}
                <div className="sticky top-2 z-10 mx-auto w-full mb-6">
                  <div className="flex flex-col md:flex-row gap-4 bg-surface/80 backdrop-blur-xl border border-white/10 p-4 rounded-2xl shadow-2xl ring-1 ring-white/5">
                    <div className="relative flex-1">
                      <input
                        type="text"
                        placeholder="Search publications..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full rounded-xl bg-slate-900/50 border border-transparent px-6 py-3.5 pl-12 text-lg text-white placeholder-slate-500 focus:bg-slate-900 focus:border-teal-400 focus:outline-none focus:ring-0 transition"
                      />
                      <svg className="absolute left-4 top-4 h-6 w-6 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                    </div>

                    <div className="flex gap-3">
                      <select
                        value={selectedYear}
                        onChange={(e) => setSelectedYear(e.target.value)}
                        className="min-w-[120px] rounded-xl bg-slate-900/50 border border-transparent px-6 py-3.5 text-lg text-slate-300 focus:bg-slate-900 focus:border-teal-400 focus:outline-none focus:ring-0 transition appearance-none cursor-pointer hover:bg-slate-900 hover:text-white"
                      >
                        <option value="All">Year</option>
                        {filteredPublications.length === 0 && selectedYear !== "All" && <option value={selectedYear}>{selectedYear}</option>}
                        {uniqueYears.map((year: any) => (
                          <option key={year} value={year}>{year}</option>
                        ))}
                      </select>

                      <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        className="min-w-[180px] rounded-xl bg-slate-900/50 border border-transparent px-6 py-3.5 text-lg text-slate-300 focus:bg-slate-900 focus:border-teal-400 focus:outline-none focus:ring-0 transition appearance-none cursor-pointer hover:bg-slate-900 hover:text-white"
                      >
                        <option value="year-desc">Newest</option>
                        <option value="year-asc">Oldest</option>
                        <option value="citations-desc">Most Cited</option>
                        <option value="citations-asc">Least Cited</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="space-y-8">
                  {filteredPublications.length > 0 ? (
                    filteredPublications.map((pub: any, i: number) => (
                      <div key={i} className="border-b border-white/5 pb-6 last:border-0">
                        <div className="flex justify-between items-start mb-2">
                          <span className="text-gold font-mono text-sm">{pub.year || 'Unknown Year'}</span>
                          <span className="text-xs bg-teal-900/40 text-teal-400 px-2 py-1 rounded">
                            {pub.citations ? `${pub.citations} citations` : '0 citations'}
                          </span>
                        </div>
                        <h4 className="text-lg font-medium text-white mb-2">
                          <a href={pub.link} target="_blank" rel="noopener noreferrer" className="hover:text-teal-400 transition">{pub.title}</a>
                        </h4>
                        <p className="text-slate-400 text-sm mb-1 italic">{pub.journal}</p>
                        <p className="text-slate-500 text-xs">{pub.authors}</p>
                      </div>
                    ))
                  ) : (
                    <div className="py-12 text-center text-slate-500">
                      No publications found matching your search.
                    </div>
                  )}
                </div>
              </Modal>
            </div>
          </div>
        </section>

        {/* Timeline (Education) */}
        <section id="education" className="py-20">
          <div className="grid gap-16 md:grid-cols-2">
            <div>
              <h2 className="mb-8 font-display text-3xl text-white">Academic Journey</h2>
              <div className="border-l-2 border-white/10 pl-8 space-y-12">
                {education.map((edu) => (
                  <div key={edu.year} className="relative">
                    <span className="absolute -left-[39px] mt-1.5 h-4 w-4 rounded-full border-2 border-slate-900 bg-gold"></span>
                    <span className="text-sm font-bold text-gold-dim">{edu.year}</span>
                    <h3 className="text-lg font-semibold text-white">{edu.degree}</h3>
                    <p className="text-slate-400">{edu.institution}</p>
                  </div>
                ))}
              </div>
            </div>
            <div id="teaching">
              <h2 className="mb-8 font-display text-3xl text-white">Experience</h2>
              <div className="space-y-6">
                {experience.map((job, i) => (
                  <div key={i} className="glass rounded-2xl p-6">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-lg font-bold text-white">{job.role}</h3>
                        <p className="text-teal-400">{job.institution}</p>
                      </div>
                      <span className="rounded-full bg-white/5 px-3 py-1 text-xs font-medium text-slate-400">
                        {job.period}
                      </span>
                    </div>
                    <ul className="mt-4 list-disc pl-4 text-sm leading-relaxed text-slate-400 space-y-1">
                      {job.details.slice(0, 2).map((d, k) => <li key={k}>{d}</li>)}
                    </ul>
                    <button onClick={() => setActiveModal(`exp-${i}`)} className="mt-3 hidden text-xs text-gold hover:underline">Read All Responsibilities</button>

                    <Modal isOpen={activeModal === `exp-${i}`} onClose={closeModal} title={`${job.role} @ ${job.institution}`}>
                      <div className="space-y-4">
                        <p className="text-slate-300"><strong>Duration:</strong> {job.period}</p>
                        <h4 className="text-lg font-bold text-white">Key Responsibilities & Contributions</h4>
                        <ul className="list-disc pl-5 space-y-2 text-slate-300">
                          {job.details.map((detail, idx) => (
                            <li key={idx}>{detail}</li>
                          ))}
                        </ul>
                      </div>
                    </Modal>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* YouTube Section */}
        <YouTubeSection />

        {/* Contact Footer */}
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

      {/* Background Gradients & Scientific Vectors */}
      <ParticleBackground />
      <div className="fixed inset-0 top-0 left-0 -z-10 pointer-events-none overflow-hidden mix-blend-screen">
        <div className="absolute -top-[20%] -left-[10%] h-[60%] w-[60%] rounded-full bg-teal-900/30 blur-[150px] animate-pulse-glow" />
        <div className="absolute top-[40%] -right-[10%] h-[50%] w-[50%] rounded-full bg-indigo-900/30 blur-[150px] animate-pulse-glow" style={{ animationDelay: '1s' }} />
        <div className="absolute bottom-[10%] left-[30%] h-[40%] w-[40%] rounded-full bg-cyan-900/20 blur-[120px] animate-pulse-glow" style={{ animationDelay: '2s' }} />

        {/* Scientific SVGs as Background Decor - HIGH OPACITY (50%) */}

        {/* DNA Helix - Top Left */}
        <svg className="absolute top-20 left-10 w-64 h-64 text-teal-800/40 animate-pulse-glow" viewBox="0 0 100 100" fill="currentColor" style={{ opacity: 0.4 }}>
          <path d="M30 10 C 20 20, 20 40, 30 50 C 40 60, 40 80, 30 90" stroke="currentColor" strokeWidth="2" fill="none" />
          <path d="M70 10 C 80 20, 80 40, 70 50 C 60 60, 60 80, 70 90" stroke="currentColor" strokeWidth="2" fill="none" />
          <line x1="30" y1="15" x2="70" y2="15" stroke="currentColor" strokeWidth="1" />
          <line x1="25" y1="30" x2="75" y2="30" stroke="currentColor" strokeWidth="1" />
          <line x1="30" y1="45" x2="70" y2="45" stroke="currentColor" strokeWidth="1" />
          <line x1="25" y1="60" x2="75" y2="60" stroke="currentColor" strokeWidth="1" />
          <line x1="30" y1="75" x2="70" y2="75" stroke="currentColor" strokeWidth="1" />
        </svg>

        {/* Benzene Ring - Bottom Right */}
        <svg className="absolute bottom-10 right-10 w-96 h-96 text-gold/30 spin-slow" viewBox="0 0 100 100" fill="currentColor" style={{ opacity: 0.3 }}>
          <polygon points="50,15 85,35 85,75 50,95 15,75 15,35" stroke="currentColor" strokeWidth="1" fill="none" />
          <circle cx="50" cy="55" r="20" stroke="currentColor" strokeWidth="1" fill="none" />
        </svg>

        {/* Atom Structure - Mid Left */}
        <svg className="absolute top-[40%] -left-20 w-80 h-80 text-teal-700/40 rotate-45" viewBox="0 0 100 100" style={{ opacity: 0.4 }}>
          <ellipse cx="50" cy="50" rx="45" ry="10" stroke="currentColor" strokeWidth="1" fill="none" />
          <ellipse cx="50" cy="50" rx="45" ry="10" stroke="currentColor" strokeWidth="1" fill="none" transform="rotate(60 50 50)" />
          <ellipse cx="50" cy="50" rx="45" ry="10" stroke="currentColor" strokeWidth="1" fill="none" transform="rotate(120 50 50)" />
          <circle cx="50" cy="50" r="5" fill="currentColor" />
        </svg>

        {/* NEW: Conical Flask - Bottom Left */}
        <svg className="absolute bottom-20 left-20 w-48 h-48 text-indigo-700/30" viewBox="0 0 100 100" fill="currentColor" style={{ opacity: 0.3 }}>
          <path d="M40 10 L60 10 L75 80 Q 80 95, 50 95 Q 20 95, 25 80 Z" stroke="currentColor" strokeWidth="2" fill="none" />
          <line x1="45" y1="30" x2="55" y2="30" stroke="currentColor" strokeWidth="1" />
          <rect x="42" y="10" width="16" height="5" fill="currentColor" opacity="0.5" />
        </svg>

        {/* NEW: Hexagon Lattice - Top Right */}
        <svg className="absolute top-32 right-20 w-64 h-64 text-slate-700/40" viewBox="0 0 100 100" fill="currentColor" style={{ opacity: 0.4 }}>
          <path d="M10 20 L20 5 L40 5 L50 20 L40 35 L20 35 Z" fill="none" stroke="currentColor" />
          <path d="M50 20 L60 5 L80 5 L90 20 L80 35 L60 35 Z" fill="none" stroke="currentColor" />
          <path d="M30 50 L40 35 L60 35 L70 50 L60 65 L40 65 Z" fill="none" stroke="currentColor" />
        </svg>

      </div>
    </div>
  );
}
