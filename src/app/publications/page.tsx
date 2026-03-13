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

                    {/* Header - Centered for better orientation */}
                    <div className="mb-16 text-center">
                        <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight text-white">
                            Research & <span className="text-teal-400">Publications</span>
                        </h1>
                        <p className="text-xl text-slate-400 max-w-4xl mx-auto mb-10 leading-relaxed">
                            A record of scientific contributions in biophysical chemistry and nano-biotechnology.
                        </p>

                        <div className="flex flex-wrap justify-center gap-4">
                            <a
                                href="https://scholar.google.com/citations?user=PZ-8nBQAAAAJ&hl=en"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 px-6 py-3 bg-teal-500/10 hover:bg-teal-500/20 border border-teal-500/20 rounded-xl text-teal-400 text-sm font-semibold transition-all group"
                            >
                                <Award className="w-5 h-5" />
                                <span>View Full Scholar Profile</span>
                                <ExternalLink className="w-4 h-4 opacity-50 group-hover:opacity-100" />
                            </a>
                        </div>
                    </div>

                    {/* Stats Overview - Minimalist Row */}
                    {scholarData?.stats && (
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
                            <div className="p-6 rounded-2xl border border-white/5 bg-white/[0.02]">
                                <div className="text-xs text-slate-500 uppercase tracking-widest font-bold mb-1">Citations</div>
                                <div className="text-3xl font-bold text-white">{scholarData.stats.citations.all.toLocaleString()}</div>
                                <div className="text-[10px] text-slate-600 mt-1">+{scholarData.stats.citations.since2018} since 2018</div>
                            </div>
                            <div className="p-6 rounded-2xl border border-white/5 bg-white/[0.02]">
                                <div className="text-xs text-slate-500 uppercase tracking-widest font-bold mb-1">h-index</div>
                                <div className="text-3xl font-bold text-white">{scholarData.stats.h_index.all}</div>
                                <div className="text-[10px] text-slate-600 mt-1">{scholarData.stats.h_index.since2018} (since 2018)</div>
                            </div>
                            <div className="p-6 rounded-2xl border border-white/5 bg-white/[0.02]">
                                <div className="text-xs text-slate-500 uppercase tracking-widest font-bold mb-1">i10-index</div>
                                <div className="text-3xl font-bold text-white">{scholarData.stats.i10_index.all}</div>
                                <div className="text-[10px] text-slate-600 mt-1">{scholarData.stats.i10_index.since2018} (since 2018)</div>
                            </div>
                            <div className="p-6 rounded-2xl border border-white/5 bg-white/[0.02]">
                                <div className="text-xs text-slate-500 uppercase tracking-widest font-bold mb-1">Publications</div>
                                <div className="text-3xl font-bold text-white">{scholarData.publications.length}</div>
                                <div className="text-[10px] text-slate-600 mt-1">Journal Articles</div>
                            </div>
                        </div>
                    )}

                    {/* Discovery Bar - Minimalist */}
                    <div className="mb-12 space-y-6">
                        <div className="flex flex-col md:flex-row gap-4">
                            <div className="flex-1 relative group">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 group-focus-within:text-teal-400 transition-colors" />
                                <input
                                    type="text"
                                    placeholder="Search papers..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full pl-12 pr-4 py-3 bg-white/[0.03] border border-white/10 rounded-xl text-white placeholder-slate-600 focus:outline-none focus:border-teal-500/30 transition-all"
                                />
                            </div>
                            <div className="flex gap-2">
                                <select
                                    value={yearFilter}
                                    onChange={(e) => setYearFilter(e.target.value)}
                                    className="px-4 py-3 bg-white/[0.03] border border-white/10 rounded-xl text-sm text-slate-400 focus:outline-none focus:border-teal-500/30 cursor-pointer"
                                >
                                    <option value="all">All Years</option>
                                    {years.map(year => (
                                        <option key={year} value={year}>{year}</option>
                                    ))}
                                </select>
                                <select
                                    value={`${sortBy}-${sortOrder}`}
                                    onChange={(e) => {
                                        const [by, order] = e.target.value.split('-') as [typeof sortBy, typeof sortOrder];
                                        setSortBy(by);
                                        setSortOrder(order);
                                    }}
                                    className="px-4 py-3 bg-white/[0.03] border border-white/10 rounded-xl text-sm text-slate-400 focus:outline-none focus:border-teal-500/30 cursor-pointer"
                                >
                                    <option value="year-desc">Newest</option>
                                    <option value="citations-desc">Most Cited</option>
                                </select>
                            </div>
                        </div>

                        {/* Minimalist Topic Chips */}
                        <div className="flex flex-wrap gap-2">
                            {topics.map((topic) => (
                                <button
                                    key={topic.id}
                                    onClick={() => setSelectedTopic(topic.id)}
                                    className={`px-4 py-1.5 rounded-lg text-xs font-medium transition-all border ${
                                        selectedTopic === topic.id
                                            ? 'bg-teal-500/10 border-teal-500/30 text-teal-400'
                                            : 'bg-transparent border-white/5 text-slate-500 hover:border-white/20 hover:text-slate-300'
                                    }`}
                                >
                                    {topic.label}
                                </button>
                            ))}
                        </div>

                        <div className="text-xs text-slate-600 flex items-center justify-between border-b border-white/5 pb-4">
                            <span>Showing {filteredPublications.length} results</span>
                            {searchTerm && (
                                <button 
                                    onClick={() => {setSearchTerm(''); setSelectedTopic('all'); setYearFilter('all');}}
                                    className="hover:text-teal-400 transition-colors"
                                >
                                    Reset filters
                                </button>
                            )}
                        </div>
                    </div>

                    {/* Publications List - Minimalist Clean */}
                    <div className="space-y-6">
                        {filteredPublications.length === 0 ? (
                            <div className="rounded-2xl p-16 text-center border border-white/5 bg-white/[0.01]">
                                <div className="inline-flex p-4 bg-white/5 rounded-full mb-4 text-slate-700">
                                    <BookOpen className="w-12 h-12" />
                                </div>
                                <h3 className="text-xl font-bold text-white mb-1">No matches found</h3>
                                <p className="text-slate-600 text-sm">Adjust your filters to see more results.</p>
                            </div>
                        ) : (
                            filteredPublications.map((pub, index) => (
                                <div
                                    key={index}
                                    className="group p-6 rounded-2xl border border-white/5 bg-white/[0.01] hover:bg-white/[0.03] hover:border-white/10 transition-all"
                                >
                                    <div className="flex flex-col gap-4">
                                        <div className="flex justify-between items-start gap-4">
                                            {/* Title */}
                                            <h3 className="text-lg md:text-xl font-bold text-slate-100 leading-snug group-hover:text-teal-400 transition-colors">
                                                {pub.link ? (
                                                    <a
                                                        href={pub.link}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="hover:underline underline-offset-4"
                                                    >
                                                        {pub.title}
                                                    </a>
                                                ) : (
                                                    pub.title
                                                )}
                                            </h3>
                                            
                                            {/* Year */}
                                            <span className="text-sm font-bold text-slate-600 shrink-0">{pub.year}</span>
                                        </div>

                                        {/* Authors & Journal */}
                                        <div className="space-y-1">
                                            <p className="text-sm text-slate-400 leading-relaxed italic">{pub.authors}</p>
                                            {pub.journal && (
                                                <p className="text-xs text-slate-500 flex items-center gap-1.5">
                                                    <BookOpen className="w-3 h-3" />
                                                    {pub.journal}
                                                </p>
                                            )}
                                        </div>

                                        {/* Actions */}
                                        <div className="flex items-center justify-between pt-4 border-t border-white/5">
                                            <div className="flex gap-4">
                                                {pub.citations && parseInt(pub.citations) > 0 && (
                                                    <div className="flex items-center gap-1.5 text-[10px] font-bold text-gold uppercase tracking-wider">
                                                        <TrendingUp className="w-3 h-3" />
                                                        {pub.citations} Citations
                                                    </div>
                                                )}
                                                <button
                                                    onClick={() => copyCitation(pub, index)}
                                                    className="flex items-center gap-1.5 text-[10px] font-bold text-slate-500 hover:text-slate-300 uppercase tracking-wider transition-colors"
                                                >
                                                    {copiedIndex === index ? (
                                                        <><Check className="w-3 h-3 text-emerald-500" /> Copied</>
                                                    ) : (
                                                        <><Copy className="w-3 h-3" /> Copy Citation</>
                                                    )}
                                                </button>
                                            </div>
                                            
                                            {pub.link && (
                                                <a
                                                    href={pub.link}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="text-[10px] font-bold text-teal-500 hover:text-teal-400 uppercase tracking-widest flex items-center gap-1 transition-colors"
                                                >
                                                    View Publication <ExternalLink className="w-3 h-3" />
                                                </a>
                                            )}
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
