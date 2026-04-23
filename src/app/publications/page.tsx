"use client";

import { useState, useEffect } from "react";
import Navigation from "@/components/Navigation";
import Image from "next/image";
import { profile } from "@/data/portfolio";

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
  const [isLoaded, setIsLoaded] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [yearFilter, setYearFilter] = useState<string>("all");
  const [sortBy, setSortBy] = useState<"year" | "citations">("year");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");

  useEffect(() => {
    setIsLoaded(true);
    fetch("/api/scholar")
      .then((res) => res.json())
      .then((data) => setScholarData(data))
      .catch((err) => console.error("Failed to load scholar data", err));
  }, []);

  const years = scholarData?.publications
    ? Array.from(
        new Set(scholarData.publications.map((p) => p.year).filter((y) => y))
      ).sort((a, b) => parseInt(b) - parseInt(a))
    : [];

  const filteredPublications = scholarData?.publications
    ? scholarData.publications
        .filter((pub) => {
          const matchesSearch =
            pub.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            pub.authors.toLowerCase().includes(searchTerm.toLowerCase()) ||
            (pub.journal && pub.journal.toLowerCase().includes(searchTerm.toLowerCase()));
          const matchesYear = yearFilter === "all" || pub.year === yearFilter;
          return matchesSearch && matchesYear;
        })
        .sort((a, b) => {
          if (sortBy === "year") {
            const yearA = parseInt(a.year) || 0;
            const yearB = parseInt(b.year) || 0;
            return sortOrder === "desc" ? yearB - yearA : yearA - yearB;
          } else {
            const citA = parseInt(a.citations) || 0;
            const citB = parseInt(b.citations) || 0;
            return sortOrder === "desc" ? citB - citA : citA - citB;
          }
        })
    : [];

  return (
    <div className={`min-h-screen bg-[#0B0F19] transition-opacity duration-400 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
      <Navigation currentPage="/publications" />

      <main className="mx-auto max-w-5xl px-6 pt-32 pb-24">
        <h1 className="font-display text-4xl font-bold text-white mb-12">
          Publications
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 items-start">
          
          {/* Sidebar */}
          <div className="md:col-span-1 flex flex-col gap-8">
            <div className="bg-[#0F1520] border border-[#1E2A3A] p-6">
              <div className="mb-6 relative w-40 h-40 mx-auto rounded-full overflow-hidden border border-[#1E2A3A] p-1 bg-[#0F1520]">
                <div className="relative w-full h-full rounded-full overflow-hidden bg-[#0B0F19]">
                  <Image 
                    src="/photo.jpg" 
                    alt={profile.name} 
                    fill 
                    className="object-cover"
                  />
                </div>
              </div>
              <h2 className="font-display text-xl text-white mb-2">{profile.name}</h2>
              <p className="font-body text-sm text-slate-400 mb-6">{profile.department}</p>
              
              <div className="flex flex-col gap-4">
                <div>
                  <div className="font-body text-xs text-slate-500 uppercase tracking-widest mb-1">Citations</div>
                  <div className="font-display text-2xl text-[#E8C547]">{scholarData?.stats?.citations?.all || "—"}</div>
                </div>
                <div>
                  <div className="font-body text-xs text-slate-500 uppercase tracking-widest mb-1">h-index</div>
                  <div className="font-display text-2xl text-[#E8C547]">{scholarData?.stats?.h_index?.all || "—"}</div>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-[#1E2A3A]">
                <a
                  href={profile.googleScholar}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-body text-sm text-[#4A9EBF] hover:text-[#E8C547] transition-colors duration-200"
                >
                  Google Scholar Profile →
                </a>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="md:col-span-3 flex flex-col gap-8">
            
            {/* Filters */}
            <div className="bg-[#0F1520] border border-[#1E2A3A] p-6 flex flex-col gap-4">
              <input
                type="text"
                placeholder="Search publications..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-[#0B0F19] border border-[#1E2A3A] text-white p-3 font-body focus:outline-none focus:border-[#E8C547] transition-colors duration-200 rounded-none"
              />
              <div className="flex gap-4">
                <select
                  value={yearFilter}
                  onChange={(e) => setYearFilter(e.target.value)}
                  className="bg-[#0B0F19] border border-[#1E2A3A] text-slate-400 p-2 font-body text-sm focus:outline-none focus:border-[#E8C547] transition-colors duration-200 rounded-none"
                >
                  <option value="all">All Years</option>
                  {years.map((year) => (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  ))}
                </select>
                <select
                  value={`${sortBy}-${sortOrder}`}
                  onChange={(e) => {
                    const [by, order] = e.target.value.split("-") as ["year" | "citations", "asc" | "desc"];
                    setSortBy(by);
                    setSortOrder(order);
                  }}
                  className="bg-[#0B0F19] border border-[#1E2A3A] text-slate-400 p-2 font-body text-sm focus:outline-none focus:border-[#E8C547] transition-colors duration-200 rounded-none"
                >
                  <option value="year-desc">Sort: Newest</option>
                  <option value="year-asc">Sort: Oldest</option>
                  <option value="citations-desc">Sort: Most Cited</option>
                </select>
              </div>
            </div>

            {/* List */}
            <div className="flex flex-col gap-8">
              {filteredPublications.map((pub, index) => (
                <div
                  key={index}
                  className="border-l-2 border-[#E8C547] pl-5 py-1"
                >
                  <h3 className="font-display text-xl text-white mb-2 leading-snug">
                    {pub.link ? (
                      <a href={pub.link} target="_blank" rel="noopener noreferrer" className="hover:text-[#E8C547] transition-colors duration-200">
                        {pub.title}
                      </a>
                    ) : (
                      pub.title
                    )}
                  </h3>
                  <p className="font-body text-slate-400 text-sm mb-2">{pub.authors}</p>
                  <div className="flex gap-4 items-center font-body text-xs text-[#94A3B8]">
                    <span className="text-[#E8C547] font-medium">{pub.journal}</span>
                    <span>{pub.year}</span>
                    {pub.citations && parseInt(pub.citations) > 0 && (
                      <span className="text-[#4A9EBF]">Citations: {pub.citations}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>
      </main>
    </div>
  );
}