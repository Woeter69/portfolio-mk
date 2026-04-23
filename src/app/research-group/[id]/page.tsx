"use client";

import { use } from "react";
import Image from "next/image";
import Link from "next/link";
import Navigation from "@/components/Navigation";
import { scholars } from "@/data/scholars";

export default function ScholarProfilePage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
    const scholar = scholars.find(s => s.id === id);

    if (!scholar) {
        return (
            <div className="min-h-screen bg-[#0B0F19] flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-4xl font-display font-bold text-white mb-4">Scholar Not Found</h1>
                    <Link href="/research-group" className="text-[#4A9EBF] hover:text-[#E8C547] transition-colors duration-200 font-body">
                        ← Back to Research Group
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#0B0F19]">
            <Navigation currentPage="/research-group" />

            <main className="mx-auto max-w-5xl px-6 pt-32 pb-24">
                <Link
                    href="/research-group"
                    className="inline-flex items-center gap-2 text-[#4A9EBF] hover:text-[#E8C547] transition-colors duration-200 mb-8 font-body text-sm uppercase tracking-widest font-medium"
                >
                    <span>←</span> Back to Team
                </Link>

                <div className="bg-[#0F1520] border border-[#1E2A3A] p-8 md:p-12 mb-12">
                    <div className="flex flex-col md:flex-row gap-12 items-start">
                        <div className="w-48 h-48 shrink-0 bg-[#0B0F19] border border-[#1E2A3A]">
                            <Image
                                src={scholar.photo}
                                alt={scholar.name}
                                width={192}
                                height={192}
                                className="object-cover w-full h-full"
                            />
                        </div>

                        <div className="flex flex-col gap-4 w-full">
                            <div>
                                <h1 className="font-display text-4xl font-bold text-white mb-2">{scholar.name}</h1>
                                <p className="font-body text-[#E8C547] text-lg mb-1">{scholar.currentDesignation}</p>
                                {scholar.institution && (
                                    <p className="font-body text-slate-400">{scholar.institution}</p>
                                )}
                            </div>

                            <div className="flex flex-wrap gap-4 mt-2 border-t border-[#1E2A3A] pt-6">
                                {scholar.email && (
                                    <a
                                        href={`mailto:${scholar.email}`}
                                        className="font-body text-sm text-[#4A9EBF] hover:text-[#E8C547] transition-colors duration-200"
                                    >
                                        Email: {scholar.email}
                                    </a>
                                )}
                                {scholar.phone && (
                                    <a
                                        href={`tel:${scholar.phone}`}
                                        className="font-body text-sm text-[#4A9EBF] hover:text-[#E8C547] transition-colors duration-200 ml-4"
                                    >
                                        Phone: {scholar.phone}
                                    </a>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="grid md:grid-cols-3 gap-6 mb-12">
                    <div className="bg-[#0F1520] border border-[#1E2A3A] p-8 text-center">
                        <div className="font-display text-4xl text-[#E8C547] mb-2">{scholar.publications || 0}</div>
                        <div className="font-body text-xs text-slate-400 uppercase tracking-widest">Publications</div>
                    </div>
                    <div className="bg-[#0F1520] border border-[#1E2A3A] p-8 text-center">
                        <div className="font-display text-4xl text-[#E8C547] mb-2">{scholar.bookChapters || 0}</div>
                        <div className="font-body text-xs text-slate-400 uppercase tracking-widest">Book Chapters</div>
                    </div>
                    <div className="bg-[#0F1520] border border-[#1E2A3A] p-8 text-center">
                        <div className="font-display text-4xl text-[#E8C547] mb-2">{scholar.status === 'current' ? 'Current' : 'Alumni'}</div>
                        <div className="font-body text-xs text-slate-400 uppercase tracking-widest">Status</div>
                    </div>
                </div>

                <div className="bg-[#0F1520] border border-[#1E2A3A] p-8 md:p-12">
                    <h2 className="font-display text-3xl text-white border-l-[3px] border-[#E8C547] pl-4 mb-8">
                        Ph.D. Details
                    </h2>

                    <div className="flex flex-col gap-8">
                        <div>
                            <h3 className="font-body text-sm text-[#4A9EBF] uppercase tracking-widest mb-2">Thesis Title</h3>
                            <p className="font-display text-xl text-white leading-snug">{scholar.thesisTitle}</p>
                        </div>

                        {scholar.supervisors && scholar.supervisors.length > 0 && (
                            <div>
                                <h3 className="font-body text-sm text-[#4A9EBF] uppercase tracking-widest mb-2">Supervisors</h3>
                                <ul className="flex flex-col gap-2">
                                    {scholar.supervisors.map((supervisor, index) => (
                                        <li key={index} className="font-body text-slate-400 border-l-2 border-[#1E2A3A] pl-4">
                                            {supervisor}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        {(scholar.thesisSubmissionDate || scholar.vivaDate) && (
                            <div className="grid md:grid-cols-2 gap-8 pt-8 border-t border-[#1E2A3A]">
                                {scholar.thesisSubmissionDate && (
                                    <div>
                                        <h3 className="font-body text-sm text-[#4A9EBF] uppercase tracking-widest mb-2">Thesis Submission</h3>
                                        <p className="font-body text-slate-400">{scholar.thesisSubmissionDate}</p>
                                    </div>
                                )}
                                {scholar.vivaDate && (
                                    <div>
                                        <h3 className="font-body text-sm text-[#4A9EBF] uppercase tracking-widest mb-2">Ph.D. Viva</h3>
                                        <p className="font-body text-slate-400">{scholar.vivaDate}</p>
                                    </div>
                                )}
                            </div>
                        )}

                        {scholar.awards && scholar.awards.length > 0 && (
                            <div className="pt-8 border-t border-[#1E2A3A]">
                                <h3 className="font-body text-sm text-[#4A9EBF] uppercase tracking-widest mb-4">Awards & Recognition</h3>
                                <ul className="flex flex-col gap-4">
                                    {scholar.awards.map((award, index) => (
                                        <li key={index} className="font-body text-slate-400 border-l-2 border-[#1E2A3A] pl-4">
                                            {award}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
}