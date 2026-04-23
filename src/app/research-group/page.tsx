"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Navigation from "@/components/Navigation";
import { currentScholars, pastScholars } from "@/data/scholars";

export default function ResearchGroupPage() {
  const [activeTab, setActiveTab] = useState<"current" | "past">("current");

  const displayScholars = activeTab === "current" ? currentScholars : pastScholars;

  return (
    <div className="min-h-screen bg-[#0B0F19]">
      <Navigation currentPage="/research-group" />

      <main className="mx-auto max-w-5xl px-6 pt-32 pb-24">
        
        <div className="mb-12">
          <h1 className="font-display text-4xl font-bold text-white mb-4">
            Research Group
          </h1>
          <p className="font-body text-slate-400 text-lg max-w-2xl">
            A dedicated group of scholars advancing research in chemical sciences and nanotechnology.
          </p>
        </div>

        {/* Tabs */}
        <div className="flex gap-8 mb-12 border-b border-[#1E2A3A]">
          <button
            onClick={() => setActiveTab("current")}
            className={`pb-4 font-body uppercase tracking-widest text-sm font-medium transition-colors duration-200 ${
              activeTab === "current"
                ? "text-[#E8C547] border-b-2 border-[#E8C547]"
                : "text-slate-400 hover:text-white"
            }`}
          >
            Current Scholars ({currentScholars.length})
          </button>
          <button
            onClick={() => setActiveTab("past")}
            className={`pb-4 font-body uppercase tracking-widest text-sm font-medium transition-colors duration-200 ${
              activeTab === "past"
                ? "text-[#E8C547] border-b-2 border-[#E8C547]"
                : "text-slate-400 hover:text-white"
            }`}
          >
            Past Scholars ({pastScholars.length})
          </button>
        </div>

        {/* Scholars Grid - 2 Column */}
        <div className="grid gap-8 md:grid-cols-2">
          {displayScholars.map((scholar) => (
            <Link
              key={scholar.id}
              href={`/research-group/${scholar.id}`}
              className="group bg-[#0F1520] border border-[#1E2A3A] p-6 hover:border-[#E8C547] transition-colors duration-200 flex gap-6 items-start"
            >
              <div className="w-24 h-24 shrink-0 bg-[#0B0F19] border border-[#1E2A3A]">
                <Image
                  src={scholar.photo}
                  alt={scholar.name}
                  width={96}
                  height={96}
                  className="object-cover w-full h-full transition-all duration-300"
                />
              </div>

              <div className="flex flex-col flex-grow">
                <h3 className="font-display text-xl text-white mb-1">
                  {scholar.name}
                </h3>
                <p className="font-body text-sm text-[#E8C547] mb-2">
                  {scholar.currentDesignation}
                </p>
                {scholar.institution && (
                  <p className="font-body text-xs text-slate-400 mb-4 line-clamp-2">
                    {scholar.institution}
                  </p>
                )}

                <div className="flex gap-6 mt-auto border-t border-[#1E2A3A] pt-4">
                  <div>
                    <div className="font-body text-xs text-slate-500 uppercase tracking-widest">
                      Pubs
                    </div>
                    <div className="font-display text-lg text-white">
                      {scholar.publications || 0}
                    </div>
                  </div>
                  {scholar.bookChapters && scholar.bookChapters > 0 && (
                    <div>
                      <div className="font-body text-xs text-slate-500 uppercase tracking-widest">
                        Chapters
                      </div>
                      <div className="font-display text-lg text-white">
                        {scholar.bookChapters}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>

        {displayScholars.length === 0 && (
          <div className="py-20 border border-[#1E2A3A] bg-[#0F1520] text-center">
            <p className="font-body text-slate-400 text-base">
              No {activeTab} scholars to display.
            </p>
          </div>
        )}
      </main>
    </div>
  );
}