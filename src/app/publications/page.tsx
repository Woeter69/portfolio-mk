'use client';

import { useState, useEffect } from 'react';
import Navigation from '@/components/Navigation';
import { Search, ExternalLink, TrendingUp, Calendar, Users, BookOpen, Award, Copy, Check } from 'lucide-react';

// ... (inside the component, before the return)
    const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

    const copyCitation = (pub: Publication, index: number) => {
        const citation = `${pub.authors} (${pub.year}). ${pub.title}. ${pub.journal || ''}`;
        navigator.clipboard.writeText(citation);
        setCopiedIndex(index);
        setTimeout(() => setCopiedIndex(null), 2000);
    };

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

                return matchesSearch && matchesYear;
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
                    <div className="text-center mb-16">
                        <h1 className="text-5xl md:text-6xl font-bold mb-6">
                            <span className="gradient-gold">Publications</span>
                        </h1>
                        <p className="text-xl text-slate-400 max-w-3xl mx-auto mb-8">
                            Comprehensive list of research publications, articles, and scholarly contributions
                        </p>

                        {/* Google Scholar Link */}
                        <a
                            href="https://scholar.google.com/citations?user=PZ-8nBQAAAAJ&hl=en"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-teal-600 to-indigo-600 rounded-full text-white font-semibold hover:shadow-lg hover:shadow-teal-500/50 transition-all hover-lift"
                        >
                            <Award className="w-5 h-5" />
                            View Full Google Scholar Profile
                            <ExternalLink className="w-4 h-4" />
                        </a>
                    </div>

                    {/* Stats Overview */}
                    {scholarData?.stats && (
                        <div className="grid md:grid-cols-3 gap-6 mb-12">
                            <div className="glass rounded-2xl p-6 text-center hover-lift">
                                <div className="flex justify-center mb-3">
                                    <TrendingUp className="w-8 h-8 text-gold" />
                                </div>
                                <div className="text-4xl font-bold gradient-gold mb-2">
                                    {scholarData.stats.citations.all.toLocaleString()}
                                </div>
                                <div className="text-sm text-slate-400 uppercase tracking-widest mb-1">Total Citations</div>
                                <div className="text-xs text-slate-500">
                                    {scholarData.stats.citations.since2018.toLocaleString()} since 2018
                                </div>
                            </div>

                            <div className="glass rounded-2xl p-6 text-center hover-lift">
                                <div className="flex justify-center mb-3">
                                    <Award className="w-8 h-8 text-teal-400" />
                                </div>
                                <div className="text-4xl font-bold text-teal-400 mb-2">
                                    {scholarData.stats.h_index.all}
                                </div>
                                <div className="text-sm text-slate-400 uppercase tracking-widest mb-1">h-index</div>
                                <div className="text-xs text-slate-500">
                                    {scholarData.stats.h_index.since2018} since 2018
                                </div>
                            </div>

                            <div className="glass rounded-2xl p-6 text-center hover-lift">
                                <div className="flex justify-center mb-3">
                                    <BookOpen className="w-8 h-8 text-indigo-400" />
                                </div>
                                <div className="text-4xl font-bold text-indigo-400 mb-2">
                                    {scholarData.stats.i10_index.all}
                                </div>
                                <div className="text-sm text-slate-400 uppercase tracking-widest mb-1">i10-index</div>
                                <div className="text-xs text-slate-500">
                                    {scholarData.stats.i10_index.since2018} since 2018
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Search and Filters */}
                    <div className="glass rounded-2xl p-6 mb-8">
                        <div className="grid md:grid-cols-4 gap-4">
                            {/* Search */}
                            <div className="md:col-span-2 relative">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                                <input
                                    type="text"
                                    placeholder="Search by title, author, or journal..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full pl-12 pr-4 py-3 bg-slate-800/50 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-teal-500 transition-colors"
                                />
                            </div>

                            {/* Year Filter */}
                            <div>
                                <select
                                    value={yearFilter}
                                    onChange={(e) => setYearFilter(e.target.value)}
                                    className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-teal-500 transition-colors"
                                >
                                    <option value="all">All Years</option>
                                    {years.map(year => (
                                        <option key={year} value={year}>{year}</option>
                                    ))}
                                </select>
                            </div>

                            {/* Sort */}
                            <div>
                                <select
                                    value={`${sortBy}-${sortOrder}`}
                                    onChange={(e) => {
                                        const [by, order] = e.target.value.split('-') as [typeof sortBy, typeof sortOrder];
                                        setSortBy(by);
                                        setSortOrder(order);
                                    }}
                                    className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-teal-500 transition-colors"
                                >
                                    <option value="year-desc">Newest First</option>
                                    <option value="year-asc">Oldest First</option>
                                    <option value="citations-desc">Most Cited</option>
                                    <option value="citations-asc">Least Cited</option>
                                </select>
                            </div>
                        </div>

                        {/* Results Count */}
                        <div className="mt-4 text-sm text-slate-400">
                            Showing <span className="text-teal-400 font-semibold">{filteredPublications.length}</span> of{' '}
                            <span className="text-teal-400 font-semibold">{scholarData?.publications?.length || 0}</span> publications
                        </div>
                    </div>

                    {/* Publications List */}
                    <div className="space-y-4">
                        {filteredPublications.length === 0 ? (
                            <div className="glass rounded-2xl p-12 text-center">
                                <BookOpen className="w-16 h-16 text-slate-600 mx-auto mb-4" />
                                <p className="text-slate-400 text-lg">No publications found matching your criteria</p>
                            </div>
                        ) : (
                            filteredPublications.map((pub, index) => (
                                <div
                                    key={index}
                                    className="glass rounded-2xl p-6 hover-lift group"
                                >
                                    <div className="flex flex-col md:flex-row md:items-start gap-4">
                                        {/* Publication Number */}
                                        <div className="flex-shrink-0">
                                            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-teal-600 to-indigo-600 flex items-center justify-center text-white font-bold">
                                                {index + 1}
                                            </div>
                                        </div>

                                        {/* Content */}
                                        <div className="flex-1 min-w-0">
                                            {/* Title */}
                                            <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-teal-400 transition-colors">
                                                {pub.link ? (
                                                    <a
                                                        href={pub.link}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="flex items-start gap-2 hover:underline"
                                                    >
                                                        <span className="flex-1">{pub.title}</span>
                                                        <ExternalLink className="w-5 h-5 flex-shrink-0 mt-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                                                    </a>
                                                ) : (
                                                    pub.title
                                                )}
                                            </h3>

                                            {/* Authors */}
                                            <div className="flex items-start gap-2 text-slate-400 mb-2">
                                                <Users className="w-4 h-4 mt-1 flex-shrink-0" />
                                                <p className="text-sm">{pub.authors}</p>
                                            </div>

                                            {/* Journal */}
                                            {pub.journal && (
                                                <div className="flex items-start gap-2 text-slate-400 mb-3">
                                                    <BookOpen className="w-4 h-4 mt-1 flex-shrink-0" />
                                                    <p className="text-sm italic">{pub.journal}</p>
                                                </div>
                                            )}

                                            {/* Meta Info */}
                                            <div className="flex flex-wrap gap-3">
                                                {pub.year && (
                                                    <div className="flex items-center gap-1.5 px-3 py-1 bg-slate-800/50 rounded-full text-xs text-slate-300">
                                                        <Calendar className="w-3.5 h-3.5" />
                                                        {pub.year}
                                                    </div>
                                                )}
                                                {pub.citations && parseInt(pub.citations) > 0 && (
                                                    <div className="flex items-center gap-1.5 px-3 py-1 bg-gradient-to-r from-gold/20 to-yellow-600/20 rounded-full text-xs text-gold border border-gold/30">
                                                        <TrendingUp className="w-3.5 h-3.5" />
                                                        {pub.citations} citations
                                                    </div>
                                                )}
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
