'use client';

import Navigation from '@/components/Navigation';
import { Building2, Users, Award, Calendar, ShieldCheck, Briefcase, GraduationCap } from 'lucide-react';
import { experience } from '@/data/portfolio';

export default function AdministrativePage() {
    const adminExp = experience.find(exp => exp.role === "Professor");
    const pastExp = experience.find(exp => exp.role === "Associate Professor / Assistant Professor");

    const currentRoles = [
        "Provost, Rajiv Gandhi Hostel for Girls, University of Delhi (April 2023 - Present)",
        "Joint Coordinator, Design Innovation Centre (DIC), CIC (Aug 2023 - Present)",
        "Convener, Alumni Committee, CIC (2024-2026)",
        "Member, Governing Body, Amar Jyoti Institute of Physiotherapy, University of Delhi (Oct 2023 - Present)"
    ];

    const pastRoles = [
        "Program Coordinator, B.Tech. (IT & MI) (March 2021 - June 2023)",
        "Member Secretary, Staff Council, CIC (July 2017 - June 2022)",
        "Treasurer, Governing Body, Indira Gandhi Institute of Sports Sciences (2021-2022)",
        "Staff Advisor, Dept. of Chemistry, DBT Star College Project, Ramjas College (2012-2014)",
        "In-charge, Chemistry Society, Ramjas College (2007-2009)"
    ];

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
                            <span className="gradient-gold">Administrative Leadership</span>
                        </h1>
                        <p className="text-xl text-slate-400 max-w-3xl mx-auto mb-8">
                            Contributing to university governance and academic leadership through various administrative assignments
                        </p>
                    </div>

                    {/* Current Roles Section */}
                    <div className="mb-20">
                        <h2 className="text-3xl font-bold text-white mb-8 flex items-center gap-3">
                            <ShieldCheck className="w-8 h-8 text-purple-400" />
                            Current Assignments
                        </h2>
                        <div className="grid md:grid-cols-2 gap-6">
                            {currentRoles.map((role, idx) => (
                                <div key={idx} className="glass rounded-2xl p-6 flex items-start gap-4 hover-lift border-purple-500/20">
                                    <div className="p-3 bg-purple-500/20 rounded-xl mt-1">
                                        <Award className="w-6 h-6 text-purple-400" />
                                    </div>
                                    <div className="text-lg text-slate-200 font-medium">
                                        {role}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Key Leadership Highlights */}
                    <div className="grid lg:grid-cols-3 gap-8 mb-20">
                        <div className="lg:col-span-2 space-y-8">
                            <h2 className="text-3xl font-bold text-white flex items-center gap-3">
                                <Briefcase className="w-8 h-8 text-blue-400" />
                                Leadership Experience
                            </h2>
                            <div className="space-y-6">
                                {adminExp && (
                                    <div className="glass rounded-2xl p-8 border-blue-500/20">
                                        <h3 className="text-2xl font-bold text-white mb-2">{adminExp.role}</h3>
                                        <p className="text-blue-400 font-medium mb-6">{adminExp.institution} • {adminExp.period}</p>
                                        <ul className="space-y-4">
                                            {adminExp.details.map((detail, idx) => (
                                                <li key={idx} className="flex items-start gap-3 text-slate-300">
                                                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-500"></span>
                                                    {detail}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="space-y-8">
                            <h2 className="text-3xl font-bold text-white flex items-center gap-3">
                                <Calendar className="w-8 h-8 text-teal-400" />
                                Past Roles
                            </h2>
                            <div className="space-y-4">
                                {pastRoles.map((role, idx) => (
                                    <div key={idx} className="glass rounded-xl p-5 text-sm text-slate-300 border-teal-500/10 hover:border-teal-500/30 transition-colors">
                                        {role}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Stats Section */}
                    <div className="grid md:grid-cols-3 gap-6">
                        <div className="glass rounded-2xl p-8 text-center bg-gradient-to-br from-purple-900/20 to-transparent">
                            <Building2 className="w-10 h-10 text-purple-400 mx-auto mb-4" />
                            <div className="text-4xl font-bold text-white mb-2">10+</div>
                            <div className="text-sm text-slate-400 uppercase tracking-widest">Committees Chaired</div>
                        </div>
                        <div className="glass rounded-2xl p-8 text-center bg-gradient-to-br from-blue-900/20 to-transparent">
                            <Users className="w-10 h-10 text-blue-400 mx-auto mb-4" />
                            <div className="text-4xl font-bold text-white mb-2">15+</div>
                            <div className="text-sm text-slate-400 uppercase tracking-widest">Years in Governance</div>
                        </div>
                        <div className="glass rounded-2xl p-8 text-center bg-gradient-to-br from-teal-900/20 to-transparent">
                            <GraduationCap className="w-10 h-10 text-teal-400 mx-auto mb-4" />
                            <div className="text-4xl font-bold text-white mb-2">50+</div>
                            <div className="text-sm text-slate-400 uppercase tracking-widest">Student Initiatives</div>
                        </div>
                    </div>

                </div>
            </main>
        </div>
    );
}
