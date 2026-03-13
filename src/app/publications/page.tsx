'use client';

import { useState, useEffect } from 'react';
import Navigation from '@/components/Navigation';
import { Search, ExternalLink, TrendingUp, Calendar, Users, BookOpen, Award, Copy, Check } from 'lucide-react';

interface Publication {
    title: string;
    authors: string;
    journal: string;
    year: string;
    citations: string;
    link?: string;
}

interface ScholarStats {
    citations: { all: number; since2018: number };
    h_index: { all: number; since2018: number };
    i10_index: { all: number; since2018: number };
}

interface ScholarData {
    stats: ScholarStats;
    publications: Publication[];
}

export default function PublicationsPage() {
    const [scholarData, setScholarData] = useState<ScholarData | null>(null);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [yearFilter, setYearFilter] = useState<string>('all');
    const [sortBy, setSortBy] = useState<'year' | 'citations'>('year');
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
    const [selectedTopic, setSelectedTopic] = useState<string>('all');
    const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

    const copyCitation = (pub: Publication, index: number) => {
        const citation = `${pub.authors} (${pub.year}). ${pub.title}. ${pub.journal || ''}`;
        navigator.clipboard.writeText(citation);
        setCopiedIndex(index);
        setTimeout(() => setCopiedIndex(null), 2000);
    };

    const topics = [
        { id: 'all', label: 'All Topics' },
        { id: 'nanoparticle', label: 'Nanoparticles' },
        { id: 'dna', label: 'DNA / Genetics' },
        { id: 'biosensor', label: 'Biosensors' },
        { id: 'cancer', label: 'Cancer / Therapeutics' },
        { id: 'environmental', label: 'Environmental' }
    ];

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('/api/scholar');
                const data = await response.json();
                setScholarData(data);
            } catch (error) {
                console.error('Failed to fetch scholar data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    // Get unique years for filter
    const years = scholarData?.publications
        ? Array.from(new Set(scholarData.publications.map(p => p.year).filter(y => y)))
            .sort((a, b) => parseInt(b) - parseInt(a))
        : [];

    // Filter and sort publications
    const filteredPublications = scholarData?.publications
        ? scholarData.publications
            .filter(pub => {
                const matchesSearch =
                    pub.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    pub.authors.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    pub.journal.toLowerCase().includes(searchTerm.toLowerCase());

                const matchesYear = yearFilter === 'all' || pub.year === yearFilter;

                const matchesTopic = selectedTopic === 'all' || 
                    pub.title.toLowerCase().includes(selectedTopic) ||
                    pub.journal.toLowerCase().includes(selectedTopic);

                return matchesSearch && matchesYear && matchesTopic;
            })
            .sort((a, b) => {
                if (sortBy === 'year') {
                    const yearA = parseInt(a.year) || 0;
                    const yearB = parseInt(b.year) || 0;
                    return sortOrder === 'desc' ? yearB - yearA : yearA - yearB;
                } else {
                    const citA = parseInt(a.citations) || 0;
                    const citB = parseInt(b.citations) || 0;
                    return sortOrder === 'desc' ? citB - citA : citA - citB;
                }
            })
        : [];

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
                <Navigation currentPage="publications" />
                <div className="flex items-center justify-center min-h-screen">
                    <div className="text-center">
                        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-gold mx-auto mb-4"></div>
                        <p className="text-slate-400">Loading publications...</p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
            <Navigation currentPage="publications" />

            {/* Background Effects */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-20 left-10 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-20 right-10 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
            </div>

            <main className="relative pt-32 pb-20 px-6">
                <div className="max-w-7xl mx-auto">

                    {/* Header */}
                    <div className="text-center mb-20 animate-slideUp">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-teal-500/10 border border-teal-500/20 text-teal-400 text-sm font-medium mb-6">
                            <BookOpen className="w-4 h-4" />
                            <span>Scholarly Contributions</span>
                        </div>
                        <h1 className="text-6xl md:text-7xl font-bold mb-8 tracking-tight">
                            <span className="gradient-gold">Research Publications</span>
                        </h1>
                        <p className="text-xl text-slate-400 max-w-3xl mx-auto mb-10 leading-relaxed">
                            A comprehensive record of scientific impact across biophysical chemistry, 
                            nano-biotechnology, and structural biology.
                        </p>

                        {/* Google Scholar Link */}
                        <a
                            href="https://scholar.google.com/citations?user=PZ-8nBQAAAAJ&hl=en"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-3 px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl text-white font-semibold transition-all hover-lift group"
                        >
                            <div className="p-2 bg-teal-500/20 rounded-lg group-hover:bg-teal-500/30 transition-colors">
                                <Award className="w-5 h-5 text-teal-400" />
                            </div>
                            <span>Explore on Google Scholar</span>
                            <ExternalLink className="w-4 h-4 text-slate-500 group-hover:text-white transition-colors" />
                        </a>
                    </div>

                    {/* Stats Overview */}
                    {scholarData?.stats && (
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24 relative">
                            {/* Decorative background for stats */}
                            <div className="absolute inset-0 bg-teal-500/5 blur-[100px] -z-10 rounded-full"></div>
                            
                            <div className="glass-strong rounded-3xl p-10 text-center hover-lift border-white/5 relative overflow-hidden group">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-gold/5 blur-3xl rounded-full -mr-16 -mt-16 group-hover:bg-gold/10 transition-colors"></div>
                                <div className="flex justify-center mb-6">
                                    <div className="p-4 bg-gold/10 rounded-2xl">
                                        <TrendingUp className="w-10 h-10 text-gold" />
                                    </div>
                                </div>
                                <div className="text-6xl font-bold gradient-gold mb-3 tracking-tighter">
                                    {scholarData.stats.citations.all.toLocaleString()}
                                </div>
                                <div className="text-sm text-slate-400 uppercase tracking-[0.2em] font-semibold mb-2">Total Citations</div>
                                <div className="inline-block px-3 py-1 bg-white/5 rounded-full text-xs text-slate-500 font-medium">
                                    +{scholarData.stats.citations.since2018.toLocaleString()} since 2018
                                </div>
                            </div>

                            <div className="glass-strong rounded-3xl p-10 text-center hover-lift border-white/5 relative overflow-hidden group">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-teal-500/5 blur-3xl rounded-full -mr-16 -mt-16 group-hover:bg-teal-500/10 transition-colors"></div>
                                <div className="flex justify-center mb-6">
                                    <div className="p-4 bg-teal-500/10 rounded-2xl">
                                        <Award className="w-10 h-10 text-teal-400" />
                                    </div>
                                </div>
                                <div className="text-6xl font-bold text-teal-400 mb-3 tracking-tighter">
                                    {scholarData.stats.h_index.all}
                                </div>
                                <div className="text-sm text-slate-400 uppercase tracking-[0.2em] font-semibold mb-2">h-index</div>
                                <div className="inline-block px-3 py-1 bg-white/5 rounded-full text-xs text-slate-500 font-medium">
                                    i10: {scholarData.stats.i10_index.all} (total)
                                </div>
                            </div>

                            <div className="glass-strong rounded-3xl p-10 text-center hover-lift border-white/5 relative overflow-hidden group">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/5 blur-3xl rounded-full -mr-16 -mt-16 group-hover:bg-indigo-500/10 transition-colors"></div>
                                <div className="flex justify-center mb-6">
                                    <div className="p-4 bg-indigo-500/10 rounded-2xl">
                                        <Users className="w-10 h-10 text-indigo-400" />
                                    </div>
                                </div>
                                <div className="text-6xl font-bold text-indigo-400 mb-3 tracking-tighter">
                                    {scholarData.publications.length}
                                </div>
                                <div className="text-sm text-slate-400 uppercase tracking-[0.2em] font-semibold mb-2">Journal Articles</div>
                                <div className="inline-block px-3 py-1 bg-white/5 rounded-full text-xs text-slate-500 font-medium">
                                    Published in top tier journals
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Search and Filters Section */}
                    <div className="glass-strong rounded-[2rem] p-8 mb-12 border-white/5 shadow-2xl relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-teal-500 via-indigo-500 to-pink-500 opacity-30"></div>
                        
                        <div className="flex flex-col gap-8">
                            {/* Search bar row */}
                            <div className="relative group">
                                <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-6 h-6 text-slate-500 group-focus-within:text-teal-400 transition-colors" />
                                <input
                                    type="text"
                                    placeholder="Search by title, author, journal or keywords..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full pl-16 pr-6 py-5 bg-white/5 border border-white/10 rounded-2xl text-white text-lg placeholder-slate-500 focus:outline-none focus:border-teal-500/50 focus:bg-white/[0.08] transition-all"
                                />
                            </div>

                            {/* Secondary filters row */}
                            <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
                                {/* Topic Chips */}
                                <div className="flex flex-wrap gap-2 justify-center lg:justify-start">
                                    {topics.map((topic) => (
                                        <button
                                            key={topic.id}
                                            onClick={() => setSelectedTopic(topic.id)}
                                            className={`px-5 py-2.5 rounded-xl text-sm font-medium transition-all border ${
                                                selectedTopic === topic.id
                                                    ? 'bg-teal-500/20 border-teal-500/50 text-teal-300 shadow-lg shadow-teal-500/10'
                                                    : 'bg-white/5 border-white/10 text-slate-400 hover:bg-white/10 hover:text-white'
                                            }`}
                                        >
                                            {topic.label}
                                        </button>
                                    ))}
                                </div>

                                {/* Dropdowns */}
                                <div className="flex gap-3 w-full lg:w-auto">
                                    <div className="flex-1 lg:w-40">
                                        <select
                                            value={yearFilter}
                                            onChange={(e) => setYearFilter(e.target.value)}
                                            className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-sm text-slate-300 focus:outline-none focus:border-teal-500/50 transition-colors cursor-pointer"
                                        >
                                            <option value="all">All Years</option>
                                            {years.map(year => (
                                                <option key={year} value={year}>{year}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="flex-1 lg:w-48">
                                        <select
                                            value={`${sortBy}-${sortOrder}`}
                                            onChange={(e) => {
                                                const [by, order] = e.target.value.split('-') as [typeof sortBy, typeof sortOrder];
                                                setSortBy(by);
                                                setSortOrder(order);
                                            }}
                                            className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-sm text-slate-300 focus:outline-none focus:border-teal-500/50 transition-colors cursor-pointer"
                                        >
                                            <option value="year-desc">Newest First</option>
                                            <option value="year-asc">Oldest First</option>
                                            <option value="citations-desc">Most Cited</option>
                                            <option value="citations-asc">Least Cited</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Results Count Summary */}
                        <div className="mt-8 pt-6 border-t border-white/5 flex items-center justify-between">
                            <div className="text-sm text-slate-400 flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-teal-500 animate-pulse"></span>
                                Showing <span className="text-white font-bold">{filteredPublications.length}</span> publications
                            </div>
                            {searchTerm && (
                                <button 
                                    onClick={() => {setSearchTerm(''); setSelectedTopic('all'); setYearFilter('all');}}
                                    className="text-xs text-teal-400 hover:text-teal-300 transition-colors font-medium underline underline-offset-4"
                                >
                                    Clear all filters
                                </button>
                            )}
                        </div>
                    </div>

                    {/* Publications List */}
                    <div className="space-y-8 relative">
                        {/* Vertical Timeline Line */}
                        <div className="absolute left-[2.25rem] top-4 bottom-4 w-px bg-gradient-to-b from-teal-500/50 via-indigo-500/30 to-transparent hidden md:block"></div>

                        {filteredPublications.length === 0 ? (
                            <div className="glass-strong rounded-3xl p-20 text-center border-white/5">
                                <div className="inline-flex p-6 bg-slate-800/50 rounded-full mb-6 text-slate-600">
                                    <BookOpen className="w-16 h-16" />
                                </div>
                                <h3 className="text-2xl font-bold text-white mb-2">No matching publications</h3>
                                <p className="text-slate-500 max-w-md mx-auto">We couldn't find any papers matching your current search or filter criteria. Try clearing filters.</p>
                                <button 
                                    onClick={() => {setSearchTerm(''); setSelectedTopic('all'); setYearFilter('all');}}
                                    className="mt-8 px-8 py-3 bg-teal-500 text-white rounded-xl font-bold hover:bg-teal-400 transition-colors"
                                >
                                    Reset Discovery
                                </button>
                            </div>
                        ) : (
                            filteredPublications.map((pub, index) => (
                                <div
                                    key={index}
                                    className="relative pl-0 md:pl-20 animate-fadeIn"
                                    style={{ animationDelay: `${index * 0.05}s` }}
                                >
                                    {/* Timeline Dot */}
                                    <div className="absolute left-[1.85rem] top-8 w-4 h-4 rounded-full bg-slate-900 border-2 border-teal-500 z-10 hidden md:block group-hover:scale-125 transition-transform"></div>

                                    <div className="glass-strong rounded-[2rem] p-8 md:p-10 hover-lift group border-white/5 hover:border-teal-500/30 transition-all relative overflow-hidden">
                                        {/* Subtle background gradient on hover */}
                                        <div className="absolute inset-0 bg-gradient-to-br from-teal-500/[0.02] to-indigo-500/[0.02] opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                        
                                        <div className="flex flex-col gap-6 relative z-10">
                                            <div className="flex justify-between items-start gap-4">
                                                {/* Title */}
                                                <h3 className="text-2xl md:text-3xl font-bold text-white leading-tight group-hover:text-teal-400 transition-colors">
                                                    {pub.link ? (
                                                        <a
                                                            href={pub.link}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="hover:underline decoration-teal-500/30 underline-offset-8"
                                                        >
                                                            {pub.title}
                                                        </a>
                                                    ) : (
                                                        pub.title
                                                    )}
                                                </h3>
                                                
                                                {/* Year Badge (Desktop) */}
                                                <div className="hidden md:block">
                                                    <div className="px-6 py-2 bg-white/5 border border-white/10 rounded-2xl text-xl font-black text-slate-500 group-hover:text-teal-500 group-hover:border-teal-500/20 transition-all">
                                                        {pub.year}
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Authors */}
                                            <div className="flex items-start gap-3 text-slate-300">
                                                <div className="p-1.5 bg-teal-500/10 rounded-lg mt-0.5">
                                                    <Users className="w-4 h-4 text-teal-400" />
                                                </div>
                                                <p className="text-lg font-medium leading-relaxed italic">{pub.authors}</p>
                                            </div>

                                            {/* Journal */}
                                            {pub.journal && (
                                                <div className="flex items-start gap-3 text-slate-400">
                                                    <div className="p-1.5 bg-indigo-500/10 rounded-lg mt-0.5">
                                                        <BookOpen className="w-4 h-4 text-indigo-400" />
                                                    </div>
                                                    <p className="text-lg">{pub.journal}</p>
                                                </div>
                                            )}

                                            {/* Bottom Actions and Meta */}
                                            <div className="flex flex-wrap items-center justify-between gap-6 pt-6 border-t border-white/5">
                                                <div className="flex flex-wrap gap-3">
                                                    {pub.year && (
                                                        <div className="md:hidden flex items-center gap-2 px-4 py-2 bg-white/5 rounded-xl text-sm font-bold text-teal-400">
                                                            {pub.year}
                                                        </div>
                                                    )}
                                                    {pub.citations && parseInt(pub.citations) > 0 && (
                                                        <div className="flex items-center gap-2 px-4 py-2 bg-gold/10 rounded-xl text-sm font-bold text-gold border border-gold/20">
                                                            <TrendingUp className="w-4 h-4" />
                                                            {pub.citations} Citations
                                                        </div>
                                                    )}
                                                </div>

                                                <div className="flex items-center gap-4">
                                                    <button
                                                        onClick={() => copyCitation(pub, index)}
                                                        className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold transition-all border ${
                                                            copiedIndex === index 
                                                            ? 'bg-emerald-500/20 border-emerald-500/50 text-emerald-400' 
                                                            : 'bg-white/5 border-white/10 text-slate-400 hover:bg-white/10 hover:text-white'
                                                        }`}
                                                    >
                                                        {copiedIndex === index ? (
                                                            <><Check className="w-4 h-4" /> Copied</>
                                                        ) : (
                                                            <><Copy className="w-4 h-4" /> Copy Citation</>
                                                        )}
                                                    </button>
                                                    
                                                    {pub.link && (
                                                        <a
                                                            href={pub.link}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="flex items-center gap-2 px-5 py-2.5 bg-teal-500 hover:bg-teal-400 text-slate-950 rounded-xl text-sm font-black transition-all shadow-lg shadow-teal-500/20"
                                                        >
                                                            <span>Full Paper</span>
                                                            <ExternalLink className="w-4 h-4" />
                                                        </a>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>

                    {/* Footer Note */}
                    <div className="mt-12 text-center">
                        <p className="text-sm text-slate-500">
                            Data automatically fetched from Google Scholar • Last updated: {new Date().toLocaleDateString()}
                        </p>
                    </div>
                </div>
            </main>
        </div>
    );
}
