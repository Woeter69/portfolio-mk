'use client';

import Navigation from '@/components/Navigation';
import { GraduationCap, BookOpen, Users, Award } from 'lucide-react';
import YouTubeSection from '@/components/YouTubeSection';

export default function TeachingPage() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
            <Navigation currentPage="/teaching" />

            {/* Background Effects */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-20 left-10 w-96 h-96 bg-green-500/10 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-20 right-10 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
            </div>

            <main className="relative pt-32 pb-20 px-6">
                <div className="max-w-7xl mx-auto">

                    {/* Header */}
                    <div className="text-center mb-16">
                        <h1 className="text-5xl md:text-6xl font-bold mb-6">
                            <span className="gradient-gold">Teaching & Courses</span>
                        </h1>
                        <p className="text-xl text-slate-400 max-w-3xl mx-auto mb-8">
                            Courses taught, research guidance, and academic contributions
                        </p>
                    </div>

                    {/* Coming Soon Section */}
                    <div className="glass rounded-3xl p-16 text-center max-w-4xl mx-auto">
                        <div className="mb-8">
                            <div className="w-24 h-24 bg-gradient-to-br from-green-600 to-teal-600 rounded-full flex items-center justify-center mx-auto mb-6">
                                <GraduationCap className="w-12 h-12 text-white" />
                            </div>
                            <h2 className="text-3xl font-bold text-white mb-4">Content Coming Soon</h2>
                            <p className="text-lg text-slate-400 mb-8">
                                Detailed information about courses taught, research guidance, and teaching philosophy will be available shortly.
                            </p>
                        </div>

                        {/* Preview Stats */}
                        <div className="grid md:grid-cols-3 gap-6 mt-12">
                            <div className="bg-slate-800/50 rounded-xl p-6">
                                <BookOpen className="w-8 h-8 text-green-400 mx-auto mb-3" />
                                <div className="text-2xl font-bold text-white mb-2">15+</div>
                                <div className="text-sm text-slate-400">Courses Taught</div>
                            </div>
                            <div className="bg-slate-800/50 rounded-xl p-6">
                                <Users className="w-8 h-8 text-teal-400 mx-auto mb-3" />
                                <div className="text-2xl font-bold text-white mb-2">8</div>
                                <div className="text-sm text-slate-400">Ph.D. Scholars</div>
                            </div>
                            <div className="bg-slate-800/50 rounded-xl p-6">
                                <Award className="w-8 h-8 text-gold mx-auto mb-3" />
                                <div className="text-2xl font-bold text-white mb-2">18-20</div>
                                <div className="text-sm text-slate-400">Years of Teaching</div>
                            </div>
                        </div>

                        {/* Highlights */}
                        <div className="mt-12 text-left bg-slate-800/30 rounded-xl p-8">
                            <h3 className="text-xl font-semibold text-white mb-6 flex items-center gap-3">
                                <BookOpen className="w-6 h-6 text-gold" />
                                Teaching Highlights
                            </h3>
                            <ul className="space-y-4 text-slate-300">
                                <li className="flex items-start gap-3">
                                    <span className="text-gold mt-1">•</span>
                                    <span><strong>B.Tech. (IT & MI):</strong> Engineering Chemistry I & II, Genomics & Proteomics, Environment Science</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="text-gold mt-1">•</span>
                                    <span><strong>B.Sc. (Hons.) Chemistry:</strong> Biochemistry, Environmental Chemistry, Organic Chemistry</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="text-gold mt-1">•</span>
                                    <span><strong>Ph.D. Course Work:</strong> Biomolecules, Research & Methodology</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="text-gold mt-1">•</span>
                                    <span><strong>Research Guidance:</strong> 5 Ph.D. awarded, 3 ongoing, numerous internships and projects</span>
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* YouTube Section */}
                    <div className="mt-20">
                        <YouTubeSection />
                    </div>

                </div>
            </main>
        </div>
    );
}
