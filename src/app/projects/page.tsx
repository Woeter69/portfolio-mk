'use client';

import Navigation from '@/components/Navigation';
import { projects } from '@/data/portfolio';
import { Beaker, Calendar, Building2, User } from 'lucide-react';

export default function ProjectsPage() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
            <Navigation currentPage="/projects" />

            {/* Background Effects */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-20 left-10 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-20 right-10 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
            </div>

            <main className="relative pt-32 pb-20 px-6">
                <div className="max-w-7xl mx-auto">

                    {/* Header */}
                    <div className="text-center mb-16">
                        <h1 className="text-5xl md:text-6xl font-bold mb-6">
                            <span className="gradient-gold">Research Projects</span>
                        </h1>
                        <p className="text-xl text-slate-400 max-w-3xl mx-auto">
                            Funded research projects spanning nano-biotechnology, DNA structures, and green chemistry
                        </p>
                    </div>

                    {/* Projects Grid */}
                    <div className="grid gap-6">
                        {projects.map((project, index) => (
                            <div
                                key={index}
                                className="glass rounded-2xl p-8 hover-lift group"
                            >
                                <div className="flex flex-col md:flex-row md:items-start gap-6">
                                    {/* Project Number */}
                                    <div className="flex-shrink-0">
                                        <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-indigo-600 to-pink-600 flex items-center justify-center text-white font-bold text-xl">
                                            {index + 1}
                                        </div>
                                    </div>

                                    {/* Content */}
                                    <div className="flex-1">
                                        {/* Title */}
                                        <h3 className="text-2xl font-semibold text-white mb-4 group-hover:text-indigo-400 transition-colors">
                                            {project.title}
                                        </h3>

                                        {/* Description */}
                                        {project.description && (
                                            <p className="text-slate-300 mb-4 italic">
                                                {project.description}
                                            </p>
                                        )}

                                        {/* Meta Info */}
                                        <div className="grid md:grid-cols-3 gap-4 mb-4">
                                            {/* Funding Agency */}
                                            <div className="flex items-start gap-3">
                                                <Building2 className="w-5 h-5 text-indigo-400 mt-1 flex-shrink-0" />
                                                <div>
                                                    <div className="text-xs text-slate-500 uppercase tracking-wider mb-1">Funding Agency</div>
                                                    <div className="text-sm text-slate-300">{project.funding}</div>
                                                </div>
                                            </div>

                                            {/* Role */}
                                            <div className="flex items-start gap-3">
                                                <User className="w-5 h-5 text-pink-400 mt-1 flex-shrink-0" />
                                                <div>
                                                    <div className="text-xs text-slate-500 uppercase tracking-wider mb-1">Role</div>
                                                    <div className="text-sm text-slate-300">{project.role}</div>
                                                </div>
                                            </div>

                                            {/* Year */}
                                            <div className="flex items-start gap-3">
                                                <Calendar className="w-5 h-5 text-teal-400 mt-1 flex-shrink-0" />
                                                <div>
                                                    <div className="text-xs text-slate-500 uppercase tracking-wider mb-1">Duration</div>
                                                    <div className="text-sm text-slate-300">{project.year}</div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Badge */}
                                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-indigo-600/20 to-pink-600/20 rounded-full text-sm text-indigo-300 border border-indigo-500/30">
                                            <Beaker className="w-4 h-4" />
                                            {project.role}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Stats Summary */}
                    <div className="mt-16 grid md:grid-cols-3 gap-6">
                        <div className="glass rounded-2xl p-6 text-center">
                            <div className="text-4xl font-bold gradient-gold mb-2">{projects.length}</div>
                            <div className="text-sm text-slate-400 uppercase tracking-widest">Total Projects</div>
                        </div>
                        <div className="glass rounded-2xl p-6 text-center">
                            <div className="text-4xl font-bold text-indigo-400 mb-2">6</div>
                            <div className="text-sm text-slate-400 uppercase tracking-widest">Ongoing (IOE)</div>
                        </div>
                        <div className="glass rounded-2xl p-6 text-center">
                            <div className="text-4xl font-bold text-pink-400 mb-2">15+</div>
                            <div className="text-sm text-slate-400 uppercase tracking-widest">Years of Research</div>
                        </div>
                    </div>

                </div>
            </main>
        </div>
    );
}
