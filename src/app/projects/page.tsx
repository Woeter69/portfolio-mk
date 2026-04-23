"use client";

import Navigation from "@/components/Navigation";
import { projects } from "@/data/portfolio";

export default function ProjectsPage() {
  return (
    <div className="min-h-screen bg-[#0B0F19]">
      <Navigation currentPage="/projects" />

      <main className="mx-auto max-w-5xl px-6 pt-32 pb-24">
        <div className="mb-12">
          <h1 className="font-display text-4xl font-bold text-white mb-4">
            Research Projects
          </h1>
          <p className="font-body text-slate-400 text-lg max-w-2xl">
            Funded research projects spanning nano-biotechnology, DNA structures, and green chemistry.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="bg-[#0F1520] border border-[#1E2A3A] p-8 text-center">
            <div className="font-display text-4xl text-[#E8C547] mb-2">{projects.length}</div>
            <div className="font-body text-xs text-slate-400 uppercase tracking-widest">Total Projects</div>
          </div>
          <div className="bg-[#0F1520] border border-[#1E2A3A] p-8 text-center">
            <div className="font-display text-4xl text-[#E8C547] mb-2">6</div>
            <div className="font-body text-xs text-slate-400 uppercase tracking-widest">Ongoing (IOE)</div>
          </div>
          <div className="bg-[#0F1520] border border-[#1E2A3A] p-8 text-center">
            <div className="font-display text-4xl text-[#E8C547] mb-2">15+</div>
            <div className="font-body text-xs text-slate-400 uppercase tracking-widest">Years of Research</div>
          </div>
        </div>

        <div className="flex flex-col gap-6">
          {projects.map((project, index) => (
            <div
              key={index}
              className="bg-[#0F1520] border border-[#1E2A3A] p-8 hover:border-[#E8C547] transition-colors duration-200"
            >
              <div className="flex flex-col md:flex-row gap-8 items-start">
                <div className="font-display text-3xl text-[#E8C547] opacity-50 w-12 shrink-0">
                  {(index + 1).toString().padStart(2, '0')}
                </div>

                <div className="flex-1">
                  <h3 className="font-display text-2xl text-white mb-3">
                    {project.title}
                  </h3>

                  {project.description && (
                    <p className="font-body text-slate-400 mb-6 italic">
                      {project.description}
                    </p>
                  )}

                  <div className="grid md:grid-cols-3 gap-6 border-t border-[#1E2A3A] pt-6">
                    <div>
                      <div className="font-body text-xs text-[#4A9EBF] uppercase tracking-widest mb-1">Funding Agency</div>
                      <div className="font-body text-slate-400 text-sm">{project.funding}</div>
                    </div>
                    <div>
                      <div className="font-body text-xs text-[#4A9EBF] uppercase tracking-widest mb-1">Role</div>
                      <div className="font-body text-slate-400 text-sm">{project.role}</div>
                    </div>
                    <div>
                      <div className="font-body text-xs text-[#4A9EBF] uppercase tracking-widest mb-1">Duration</div>
                      <div className="font-body text-slate-400 text-sm">{project.year}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}