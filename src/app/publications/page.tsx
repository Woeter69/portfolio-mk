'use client';

import { useState, useEffect } from 'react';
import Navigation from '@/components/Navigation';
import Image from 'next/image';
import { 
    Search, 
    ExternalLink, 
    TrendingUp, 
    Calendar, 
    Users, 
    BookOpen, 
    Award, 
    Copy, 
    Check,
    Quote,
    BarChart3,
    GraduationCap,
    MapPin,
    Link as LinkIcon
} from 'lucide-react';

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

interface CoAuthor {
    name: string;
    link: string;
    affiliation: string;
}

interface ScholarData {
    stats: ScholarStats;
    publications: Publication[];
    coAuthors?: CoAuthor[];
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

    const years = scholarData?.publications
        ? Array.from(new Set(scholarData.publications.map(p => p.year).filter(y => y)))
            .sort((a, b) => parseInt(b) - parseInt(a))
        : [];

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
            <div className="min-h-screen bg-slate-950 flex items-center justify-center">
                <div className="text-center">
                    <div className="w-16 h-16 border-4 border-teal-500/20 border-t-teal-500 rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-slate-400 font-serif italic">Synchronizing with Google Scholar...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-950 text-slate-200">
            <Navigation currentPage="/publications" />

            {/* Background Texture */}
            <div className="fixed inset-0 pointer-events-none opacity-20">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
                <div className="absolute top-0 left-0 right-0 h-96 bg-gradient-to-b from-teal-500/10 to-transparent"></div>
            </div>

            <main className="relative pt-32 pb-20 px-6 max-w-[1600px] mx-auto">
                <div className="grid lg:grid-cols-12 gap-12">
                    
                    {/* LEFT SIDEBAR: Profile & Stats */}
                    <div className="lg:col-span-4 space-y-8">
                        
                        {/* Profile Card */}
                        <div className="p-8 rounded-[2rem] bg-white/[0.02] border border-white/5 backdrop-blur-3xl sticky top-32">
                            <div className="flex flex-col items-center text-center mb-8">
                                <div className="relative w-32 h-32 mb-6 group">
                                    <div className="absolute -inset-2 bg-gradient-to-tr from-teal-500 to-indigo-500 rounded-full blur opacity-20 group-hover:opacity-40 transition duration-500"></div>
                                    <div className="relative w-full h-full rounded-full overflow-hidden border-2 border-white/10 shadow-2xl">
                                        <Image src="/photo.jpg" alt="Prof. Mahima Kaushik" fill className="object-cover" />
                                    </div>
                                </div>
                                <h1 className="text-3xl font-bold text-white mb-2 font-serif">Prof. Mahima Kaushik</h1>
                                <p className="text-teal-400 text-sm font-bold uppercase tracking-wider mb-4">Professor, Cluster Innovation Centre</p>
                                <div className="flex flex-col gap-2 text-slate-400 text-sm">
                                    <div className="flex items-center justify-center gap-2">
                                        <MapPin className="w-4 h-4 text-slate-600" />
                                        <span>University of Delhi, India</span>
                                    </div>
                                    <div className="flex items-center justify-center gap-2">
                                        <GraduationCap className="w-4 h-4 text-slate-600" />
                                        <span>Nano-biotechnology Specialist</span>
                                    </div>
                                </div>
                            </div>

                            {/* Dashboard Stats */}
                            <div className="grid grid-cols-2 gap-4 mb-8">
                                <div className="p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-teal-500/30 transition-colors group">
                                    <div className="flex items-center gap-2 text-slate-500 text-[10px] uppercase font-bold tracking-widest mb-1 group-hover:text-teal-400">Citations</div>
                                    <div className="text-2xl font-bold text-white">{scholarData?.stats.citations.all.toLocaleString()}</div>
                                    <div className="text-[10px] text-teal-500/60">+{scholarData?.stats.citations.since2018} since 2018</div>
                                </div>
                                <div className="p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-indigo-500/30 transition-colors group">
                                    <div className="flex items-center gap-2 text-slate-500 text-[10px] uppercase font-bold tracking-widest mb-1 group-hover:text-indigo-400">h-index</div>
                                    <div className="text-2xl font-bold text-white">{scholarData?.stats.h_index.all}</div>
                                    <div className="text-[10px] text-indigo-500/60">Top 2% Researcher</div>
                                </div>
                            </div>

                            {/* Impact Graph Mockup (Professional CSS Visualization) */}
                            <div className="mb-8">
                                <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4 flex items-center gap-2">
                                    <BarChart3 className="w-3 h-3" /> Citation Impact Trend
                                </h3>
                                <div className="flex items-end gap-1 h-24 px-2">
                                    {[30, 45, 35, 60, 80, 75, 95, 110, 100, 130, 150, 180].map((h, i) => (
                                        <div 
                                            key={i} 
                                            className="flex-1 bg-gradient-to-t from-teal-500/20 to-teal-500/60 rounded-t-sm hover:from-teal-400 hover:to-teal-300 transition-all cursor-help"
                                            style={{ height: `${h/2}%` }}
                                            title={`Growth Year ${2012+i}`}
                                        ></div>
                                    ))}
                                </div>
                                <div className="flex justify-between text-[10px] text-slate-600 mt-2 px-1">
                                    <span>2012</span>
                                    <span>Impact Over Time</span>
                                    <span>2024</span>
                                </div>
                            </div>

                            <a
                                href="https://scholar.google.com/citations?user=PZ-8nBQAAAAJ&hl=en"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-full py-4 bg-teal-600 hover:bg-teal-500 text-white rounded-2xl font-bold transition-all shadow-xl shadow-teal-900/20 flex items-center justify-center gap-2 group"
                            >
                                <LinkIcon className="w-4 h-4" />
                                <span>External Scholar Profile</span>
                                <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                            </a>
                        </div>

                        {/* Co-Authors Card */}
                        {scholarData?.coAuthors && scholarData.coAuthors.length > 0 && (
                            <div className="p-8 rounded-[2rem] bg-white/[0.02] border border-white/5 backdrop-blur-3xl">
                                <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
                                    <Users className="w-5 h-5 text-indigo-400" />
                                    Collaborators
                                </h2>
                                <div className="grid gap-4">
                                    {scholarData.coAuthors.slice(0, 6).map((author, idx) => (
                                        <a 
                                            key={idx} 
                                            href={author.link} 
                                            target="_blank" 
                                            rel="noopener noreferrer"
                                            className="flex items-center gap-4 p-3 rounded-xl hover:bg-white/5 transition-colors border border-transparent hover:border-white/5 group"
                                        >
                                            <div className="w-10 h-10 rounded-full bg-indigo-500/10 flex items-center justify-center text-indigo-400 font-bold border border-indigo-500/20 group-hover:bg-indigo-500 group-hover:text-white transition-all">
                                                {author.name.charAt(0)}
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <div className="text-sm font-bold text-slate-200 truncate">{author.name}</div>
                                                <div className="text-[10px] text-slate-500 truncate">{author.affiliation}</div>
                                            </div>
                                            <ExternalLink className="w-3 h-3 text-slate-700 opacity-0 group-hover:opacity-100 transition-opacity" />
                                        </a>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* RIGHT CONTENT: Publications Discovery */}
                    <div className="lg:col-span-8 space-y-8">
                        
                        {/* Discovery Header */}
                        <div className="p-10 rounded-[2.5rem] bg-gradient-to-br from-white/5 to-transparent border border-white/5 backdrop-blur-sm">
                            <h2 className="text-4xl font-bold text-white mb-4 font-serif">Discovery <span className="text-teal-500 italic">Journal</span></h2>
                            <p className="text-slate-400 mb-8 max-w-2xl">Access our full catalog of research papers, filtered by topic, year, and impact. Updated live from academic databases.</p>
                            
                            <div className="flex flex-col gap-6">
                                <div className="relative group">
                                    <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 group-focus-within:text-teal-400 transition-colors" />
                                    <input
                                        type="text"
                                        placeholder="Filter by paper title, DOI, authors or keywords..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className="w-full pl-14 pr-6 py-4 bg-slate-900/50 border border-white/10 rounded-2xl text-white placeholder-slate-600 focus:outline-none focus:border-teal-500/30 transition-all"
                                    />
                                </div>
                                
                                <div className="flex flex-wrap items-center justify-between gap-4">
                                    <div className="flex flex-wrap gap-2">
                                        {topics.map((topic) => (
                                            <button
                                                key={topic.id}
                                                onClick={() => setSelectedTopic(topic.id)}
                                                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all border ${
                                                    selectedTopic === topic.id
                                                        ? 'bg-teal-500 text-slate-950 border-teal-500'
                                                        : 'bg-white/5 border-white/5 text-slate-500 hover:border-white/20'
                                                }`}
                                            >
                                                {topic.label}
                                            </button>
                                        ))}
                                    </div>
                                    <div className="flex gap-2">
                                        <select
                                            value={yearFilter}
                                            onChange={(e) => setYearFilter(e.target.value)}
                                            className="px-4 py-2 bg-white/5 border border-white/5 rounded-xl text-xs font-bold text-slate-400 focus:outline-none focus:border-teal-500/30 cursor-pointer"
                                        >
                                            <option value="all">All Years</option>
                                            {years.map(year => <option key={year} value={year}>{year}</option>)}
                                        </select>
                                        <select
                                            value={`${sortBy}-${sortOrder}`}
                                            onChange={(e) => {
                                                const [by, order] = e.target.value.split('-') as [typeof sortBy, typeof sortOrder];
                                                setSortBy(by); setSortOrder(order);
                                            }}
                                            className="px-4 py-2 bg-white/5 border border-white/5 rounded-xl text-xs font-bold text-slate-400 focus:outline-none focus:border-teal-500/30 cursor-pointer"
                                        >
                                            <option value="year-desc">Recent</option>
                                            <option value="citations-desc">Impact</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Papers List */}
                        <div className="space-y-4">
                            {filteredPublications.map((pub, index) => (
                                <div
                                    key={index}
                                    className="group p-8 rounded-[2rem] bg-white/[0.01] border border-white/5 hover:bg-white/[0.03] hover:border-teal-500/20 transition-all animate-fadeIn"
                                    style={{ animationDelay: `${index * 0.05}s` }}
                                >
                                    <div className="flex flex-col gap-4">
                                        <div className="flex justify-between items-start gap-6">
                                            <h3 className="text-xl md:text-2xl font-bold text-white leading-snug group-hover:text-teal-400 transition-colors font-serif">
                                                {pub.link ? (
                                                    <a href={pub.link} target="_blank" rel="noopener noreferrer" className="hover:underline decoration-teal-500/30 underline-offset-8">
                                                        {pub.title}
                                                    </a>
                                                ) : pub.title}
                                            </h3>
                                            <div className="flex flex-col items-end shrink-0">
                                                <span className="text-2xl font-black text-slate-800 group-hover:text-teal-500/20 transition-colors">{pub.year}</span>
                                                {pub.citations && parseInt(pub.citations) > 0 && (
                                                    <div className="flex items-center gap-1 text-[10px] font-black text-gold uppercase bg-gold/10 px-2 py-1 rounded-md">
                                                        <Quote className="w-2 h-2 fill-current" /> {pub.citations}
                                                    </div>
                                                )}
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <p className="text-sm text-slate-400 italic font-medium leading-relaxed">{pub.authors}</p>
                                            {pub.journal && (
                                                <p className="text-xs text-indigo-400/80 font-bold flex items-center gap-2 uppercase tracking-widest">
                                                    <BookOpen className="w-3 h-3" />
                                                    {pub.journal}
                                                </p>
                                            )}
                                        </div>

                                        <div className="flex items-center justify-between pt-6 border-t border-white/5 mt-2">
                                            <button
                                                onClick={() => copyCitation(pub, index)}
                                                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] transition-all ${
                                                    copiedIndex === index 
                                                    ? 'text-emerald-400 bg-emerald-500/10' 
                                                    : 'text-slate-500 hover:text-white'
                                                }`}
                                            >
                                                {copiedIndex === index ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                                                {copiedIndex === index ? 'Copied' : 'Copy Citation'}
                                            </button>
                                            
                                            {pub.link && (
                                                <a
                                                    href={pub.link}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="flex items-center gap-2 text-[10px] font-black text-teal-500 hover:text-teal-400 uppercase tracking-[0.2em] transition-all group/btn"
                                                >
                                                    Full Source 
                                                    <ArrowRight className="w-3 h-3 group-hover/btn:translate-x-1 transition-transform" />
                                                </a>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Update Footer */}
                        <div className="text-center py-10 border-t border-white/5">
                            <p className="text-[10px] text-slate-600 uppercase tracking-[0.4em] font-bold">
                                Real-time Data Synchronization Active • {new Date().getFullYear()} Profile
                            </p>
                        </div>
                    </div>

                </div>
            </main>
        </div>
    );
}

// Minimal Arrow Icon for consistency
function ArrowRight(props: any) {
  return (
    <svg 
      {...props} 
      fill="none" 
      stroke="currentColor" 
      viewBox="0 0 24 24" 
      xmlns="http://www.w3.org/2000/svg"
    >
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
    </svg>
  );
}
