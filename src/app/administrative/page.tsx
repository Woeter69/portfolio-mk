'use client';

import Navigation from '@/components/Navigation';
import { Building2, Users, Award, Calendar } from 'lucide-react';

export default function AdministrativePage() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
            <Navigation currentPage="/administrative" />

            {/* Background Effects */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-20 left-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
            </div>

            <main className="relative pt-32 pb-20 px-6">
                <div className="max-w-7xl mx-auto">

                    {/* Header */}
                    <div className="text-center mb-16">
                        <h1 className="text-5xl md:text-6xl font-bold mb-6">
                            <span className="gradient-gold">Administrative Assignments</span>
                        </h1>
                        <p className="text-xl text-slate-400 max-w-3xl mx-auto mb-8">
                            Leadership roles and administrative responsibilities at University of Delhi
                        </p>
                    </div>

                    {/* Coming Soon Section */}
                    <div className="glass rounded-3xl p-16 text-center max-w-4xl mx-auto">
                        <div className="mb-8">
                            <div className="w-24 h-24 bg-gradient-to-br from-purple-600 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                                <Building2 className="w-12 h-12 text-white" />
                            </div>
                            <h2 className="text-3xl font-bold text-white mb-4">Content Coming Soon</h2>
                            <p className="text-lg text-slate-400 mb-8">
                                Detailed information about administrative assignments, committee memberships, and leadership roles will be available shortly.
                            </p>
                        </div>

                        {/* Preview Stats */}
                        <div className="grid md:grid-cols-3 gap-6 mt-12">
                            <div className="bg-slate-800/50 rounded-xl p-6">
                                <Users className="w-8 h-8 text-purple-400 mx-auto mb-3" />
                                <div className="text-2xl font-bold text-white mb-2">50+</div>
                                <div className="text-sm text-slate-400">Committee Roles</div>
                            </div>
                            <div className="bg-slate-800/50 rounded-xl p-6">
                                <Award className="w-8 h-8 text-blue-400 mx-auto mb-3" />
                                <div className="text-2xl font-bold text-white mb-2">15+</div>
                                <div className="text-sm text-slate-400">Leadership Positions</div>
                            </div>
                            <div className="bg-slate-800/50 rounded-xl p-6">
                                <Calendar className="w-8 h-8 text-teal-400 mx-auto mb-3" />
                                <div className="text-2xl font-bold text-white mb-2">10+</div>
                                <div className="text-sm text-slate-400">Years of Service</div>
                            </div>
                        </div>

                        {/* Highlights */}
                        <div className="mt-12 text-left bg-slate-800/30 rounded-xl p-8">
                            <h3 className="text-xl font-semibold text-white mb-6 flex items-center gap-3">
                                <Award className="w-6 h-6 text-gold" />
                                Key Highlights
                            </h3>
                            <ul className="space-y-4 text-slate-300">
                                <li className="flex items-start gap-3">
                                    <span className="text-gold mt-1">•</span>
                                    <span>Provost, Rajiv Gandhi Hostel for Girls, University of Delhi (April 2023 - Present)</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="text-gold mt-1">•</span>
                                    <span>Joint Coordinator, Design Innovation Centre, CIC (Aug 2023 onwards)</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="text-gold mt-1">•</span>
                                    <span>Program Coordinator, B. Tech. (IT & Mathematical Innovations) (March 2021 - June 2023)</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="text-gold mt-1">•</span>
                                    <span>Member Secretary, Staff Council, CIC (July 2017 - June 2022)</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="text-gold mt-1">•</span>
                                    <span>Convener, Alumni Committee, CIC (2024-26)</span>
                                </li>
                            </ul>
                        </div>
                    </div>

                </div>
            </main>
        </div>
    );
}
