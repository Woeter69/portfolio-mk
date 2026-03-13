'use client';

import Navigation from '@/components/Navigation';
import { GraduationCap, BookOpen, Users, Award, ChevronRight, CheckCircle2 } from 'lucide-react';
import YouTubeSection from '@/components/YouTubeSection';
import { experience } from '@/data/portfolio';
import { scholars } from '@/data/scholars';

export default function TeachingPage() {
    const teachingExp = experience.find(exp => exp.role === "Professor");
    const currentPhDScholars = scholars.filter(s => s.status === 'current').length;
    const awardedPhDScholars = scholars.filter(s => s.status === 'past').length;

    const courses = [
        {
            level: "B.Tech. (IT & MI)",
            subjects: ["Engineering Chemistry I & II", "Genomics & Proteomics", "Environment Science"]
        },
        {
            level: "B.Sc. (Hons.) Chemistry",
            subjects: ["Biochemistry", "Environmental Chemistry", "Organic Chemistry"]
        },
        {
            level: "Ph.D. Course Work",
            subjects: ["Biomolecules", "Research & Methodology"]
        }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
            <Navigation currentPage="/teaching" />

            {/* Background Effects */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-20 left-10 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-20 right-10 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
            </div>

            <main className="relative pt-32 pb-20 px-6">
                <div className="max-w-7xl mx-auto">

                    {/* Header */}
                    <div className="text-center mb-16">
                        <h1 className="text-5xl md:text-6xl font-bold mb-6">
                            <span className="gradient-gold">Teaching & Mentorship</span>
                        </h1>
                        <p className="text-xl text-slate-400 max-w-3xl mx-auto mb-8">
                            Nurturing the next generation of scientists through innovative pedagogy and research guidance
                        </p>
                    </div>

                    {/* Stats Overview */}
                    <div className="grid md:grid-cols-3 gap-6 mb-16">
                        <div className="glass rounded-2xl p-8 text-center hover-lift">
                            <div className="flex justify-center mb-4">
                                <div className="p-3 bg-emerald-500/20 rounded-xl">
                                    <BookOpen className="w-8 h-8 text-emerald-400" />
                                </div>
                            </div>
                            <div className="text-4xl font-bold text-white mb-2">20+ Years</div>
                            <div className="text-sm text-slate-400 uppercase tracking-widest">Teaching Experience</div>
                        </div>

                        <div className="glass rounded-2xl p-8 text-center hover-lift">
                            <div className="flex justify-center mb-4">
                                <div className="p-3 bg-teal-500/20 rounded-xl">
                                    <Users className="w-8 h-8 text-teal-400" />
                                </div>
                            </div>
                            <div className="text-4xl font-bold text-white mb-2">{currentPhDScholars + awardedPhDScholars}</div>
                            <div className="text-sm text-slate-400 uppercase tracking-widest">Ph.D. Scholars Guided</div>
                        </div>

                        <div className="glass rounded-2xl p-8 text-center hover-lift">
                            <div className="flex justify-center mb-4">
                                <div className="p-3 bg-gold/20 rounded-xl">
                                    <Award className="w-8 h-8 text-gold" />
                                </div>
                            </div>
                            <div className="text-4xl font-bold text-white mb-2">{courses.length}</div>
                            <div className="text-sm text-slate-400 uppercase tracking-widest">Academic Levels</div>
                        </div>
                    </div>

                    <div className="grid lg:grid-cols-2 gap-12 mb-20">
                        {/* Courses Section */}
                        <div className="space-y-8">
                            <h2 className="text-3xl font-bold text-white flex items-center gap-3">
                                <GraduationCap className="w-8 h-8 text-gold" />
                                Courses Taught
                            </h2>
                            <div className="space-y-6">
                                {courses.map((course, idx) => (
                                    <div key={idx} className="glass rounded-2xl p-6 group hover:border-teal-500/30 transition-colors">
                                        <h3 className="text-xl font-bold text-teal-400 mb-4 flex items-center gap-2">
                                            <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                            {course.level}
                                        </h3>
                                        <div className="flex flex-wrap gap-2">
                                            {course.subjects.map((subject, sIdx) => (
                                                <span key={sIdx} className="px-4 py-2 bg-slate-800/50 rounded-lg text-sm text-slate-300 border border-slate-700">
                                                    {subject}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Mentorship Section */}
                        <div className="space-y-8">
                            <h2 className="text-3xl font-bold text-white flex items-center gap-3">
                                <Users className="w-8 h-8 text-teal-400" />
                                Research Guidance
                            </h2>
                            <div className="glass rounded-2xl p-8 space-y-8">
                                <div className="flex items-start gap-4">
                                    <div className="mt-1">
                                        <CheckCircle2 className="w-6 h-6 text-emerald-500" />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-white mb-2">Ph.D. Supervision</h3>
                                        <p className="text-slate-400 leading-relaxed">
                                            Directing advanced research in nano-biotechnology and biophysical chemistry.
                                            Successfully guided <span className="text-teal-400 font-bold">{awardedPhDScholars}</span> scholars to their doctoral degree, with <span className="text-teal-400 font-bold">{currentPhDScholars}</span> currently pursuing their research.
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="mt-1">
                                        <CheckCircle2 className="w-6 h-6 text-emerald-500" />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-white mb-2">Innovation Projects</h3>
                                        <p className="text-slate-400 leading-relaxed">
                                            Mentored numerous undergraduate innovation projects at CIC, focusing on real-world applications of chemical and biological sciences.
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="mt-1">
                                        <CheckCircle2 className="w-6 h-6 text-emerald-500" />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-white mb-2">Internships</h3>
                                        <p className="text-slate-400 leading-relaxed">
                                            Providing summer research opportunities for students across India, fostering early interest in biophysical research.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* YouTube Section */}
                    <div className="mt-32">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl font-bold text-white mb-4">Educational Content</h2>
                            <p className="text-slate-400 max-w-2xl mx-auto">
                                Watch educational videos and research insights on our YouTube channel
                            </p>
                        </div>
                        <YouTubeSection />
                    </div>

                </div>
            </main>
        </div>
    );
}
