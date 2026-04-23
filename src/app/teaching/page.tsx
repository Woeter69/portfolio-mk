"use client";

import Navigation from "@/components/Navigation";
import YouTubeSection from "@/components/YouTubeSection";
import { experience } from "@/data/portfolio";
import { scholars } from "@/data/scholars";

export default function TeachingPage() {
  const currentPhDScholars = scholars.filter(s => s.status === 'current').length;
  const awardedPhDScholars = scholars.filter(s => s.status === 'past').length;

  const courses = [
    {
      level: "B.Tech. (IT & MI)",
      subjects: ["Engineering Chemistry I & II", "Genomics & Proteomics", "Environment Science"]
    },
    {
      level: "B.Sc. (Hons.) Chemistry",
      subjects: ["Biochemistry", "Environmental Chemistry", "Organic Chemistry"]
    },
    {
      level: "Ph.D. Course Work",
      subjects: ["Biomolecules", "Research & Methodology"]
    }
  ];

  return (
    <div className="min-h-screen bg-[#0B0F19]">
      <Navigation currentPage="/teaching" />

      <main className="mx-auto max-w-5xl px-6 pt-32 pb-24">
        
        <div className="mb-12">
          <h1 className="font-display text-4xl font-bold text-white mb-4">
            Teaching & Mentorship
          </h1>
          <p className="font-body text-slate-400 text-lg max-w-2xl">
            Nurturing the next generation of scientists through innovative pedagogy and research guidance.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-16">
          <div className="bg-[#0F1520] border border-[#1E2A3A] p-8 text-center">
            <div className="font-display text-4xl text-[#E8C547] mb-2">20+</div>
            <div className="font-body text-xs text-slate-400 uppercase tracking-widest">Years Experience</div>
          </div>
          <div className="bg-[#0F1520] border border-[#1E2A3A] p-8 text-center">
            <div className="font-display text-4xl text-[#E8C547] mb-2">{currentPhDScholars + awardedPhDScholars}</div>
            <div className="font-body text-xs text-slate-400 uppercase tracking-widest">Ph.D. Scholars Guided</div>
          </div>
          <div className="bg-[#0F1520] border border-[#1E2A3A] p-8 text-center">
            <div className="font-display text-4xl text-[#E8C547] mb-2">{courses.length}</div>
            <div className="font-body text-xs text-slate-400 uppercase tracking-widest">Academic Levels</div>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 mb-20">
          <div>
            <h2 className="font-display text-3xl text-white border-l-[3px] border-[#E8C547] pl-4 mb-8">
              Courses Taught
            </h2>
            <div className="flex flex-col gap-6">
              {courses.map((course, idx) => (
                <div key={idx} className="bg-[#0F1520] border border-[#1E2A3A] p-6 hover:border-[#E8C547] transition-colors duration-200">
                  <h3 className="font-display text-xl text-white mb-4">{course.level}</h3>
                  <div className="flex flex-wrap gap-2">
                    {course.subjects.map((subject, sIdx) => (
                      <span key={sIdx} className="px-3 py-1 border border-[#1E2A3A] bg-[#0B0F19] text-sm text-slate-300 font-body">
                        {subject}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h2 className="font-display text-3xl text-white border-l-[3px] border-[#E8C547] pl-4 mb-8">
              Research Guidance
            </h2>
            <div className="bg-[#0F1520] border border-[#1E2A3A] p-8 flex flex-col gap-8">
              
              <div>
                <h3 className="font-display text-xl text-white mb-2">Ph.D. Supervision</h3>
                <p className="font-body text-slate-400 leading-relaxed border-l-2 border-[#1E2A3A] pl-4">
                  Directing advanced research in nano-biotechnology and biophysical chemistry.
                  Successfully guided <span className="text-[#E8C547] font-medium">{awardedPhDScholars}</span> scholars to their doctoral degree, with <span className="text-[#E8C547] font-medium">{currentPhDScholars}</span> currently pursuing their research.
                </p>
              </div>

              <div>
                <h3 className="font-display text-xl text-white mb-2">Innovation Projects</h3>
                <p className="font-body text-slate-400 leading-relaxed border-l-2 border-[#1E2A3A] pl-4">
                  Mentored numerous undergraduate innovation projects at CIC, focusing on real-world applications of chemical and biological sciences.
                </p>
              </div>

              <div>
                <h3 className="font-display text-xl text-white mb-2">Internships</h3>
                <p className="font-body text-slate-400 leading-relaxed border-l-2 border-[#1E2A3A] pl-4">
                  Providing summer research opportunities for students across India, fostering early interest in biophysical research.
                </p>
              </div>

            </div>
          </div>
        </div>

        <div className="mt-20">
          <h2 className="font-display text-3xl text-white border-l-[3px] border-[#E8C547] pl-4 mb-8">
            Educational Content
          </h2>
          <YouTubeSection />
        </div>

      </main>
    </div>
  );
}