"use client";

import Navigation from "@/components/Navigation";
import { experience } from "@/data/portfolio";

export default function AdministrativePage() {
  const adminExp = experience.find(exp => exp.role === "Professor");

  const currentRoles = [
    "Provost, Rajiv Gandhi Hostel for Girls, University of Delhi (April 2023 - Present)",
    "Joint Coordinator, Design Innovation Centre (DIC), CIC (Aug 2023 - Present)",
    "Convener, Alumni Committee, CIC (2024-2026)",
    "Member, Governing Body, Amar Jyoti Institute of Physiotherapy, University of Delhi (Oct 2023 - Present)"
  ];

  const pastRoles = [
    "Program Coordinator, B.Tech. (IT & MI) (March 2021 - June 2023)",
    "Member Secretary, Staff Council, CIC (July 2017 - June 2022)",
    "Treasurer, Governing Body, Indira Gandhi Institute of Sports Sciences (2021-2022)",
    "Staff Advisor, Dept. of Chemistry, DBT Star College Project, Ramjas College (2012-2014)",
    "In-charge, Chemistry Society, Ramjas College (2007-2009)"
  ];

  return (
    <div className="min-h-screen bg-[#0B0F19]">
      <Navigation currentPage="/administrative" />

      <main className="mx-auto max-w-5xl px-6 pt-32 pb-24">
        
        <div className="mb-12">
          <h1 className="font-display text-4xl font-bold text-white mb-4">
            Administrative Leadership
          </h1>
          <p className="font-body text-slate-400 text-lg max-w-2xl">
            Contributing to university governance and academic leadership through various administrative assignments.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="bg-[#0F1520] border border-[#1E2A3A] p-8 text-center">
            <div className="font-display text-4xl text-[#E8C547] mb-2">10+</div>
            <div className="font-body text-xs text-slate-400 uppercase tracking-widest">Committees Chaired</div>
          </div>
          <div className="bg-[#0F1520] border border-[#1E2A3A] p-8 text-center">
            <div className="font-display text-4xl text-[#E8C547] mb-2">15+</div>
            <div className="font-body text-xs text-slate-400 uppercase tracking-widest">Years in Governance</div>
          </div>
          <div className="bg-[#0F1520] border border-[#1E2A3A] p-8 text-center">
            <div className="font-display text-4xl text-[#E8C547] mb-2">50+</div>
            <div className="font-body text-xs text-slate-400 uppercase tracking-widest">Student Initiatives</div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <div>
            <h2 className="font-display text-3xl text-white border-l-[3px] border-[#E8C547] pl-4 mb-8">
              Current Assignments
            </h2>
            <div className="flex flex-col gap-4">
              {currentRoles.map((role, idx) => (
                <div key={idx} className="bg-[#0F1520] border border-[#1E2A3A] p-6 hover:border-[#E8C547] transition-colors duration-200">
                  <p className="font-body text-slate-300 leading-relaxed">{role}</p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h2 className="font-display text-3xl text-white border-l-[3px] border-[#E8C547] pl-4 mb-8">
              Past Roles
            </h2>
            <div className="flex flex-col gap-4">
              {pastRoles.map((role, idx) => (
                <div key={idx} className="bg-[#0F1520] border border-[#1E2A3A] p-6 hover:border-[#E8C547] transition-colors duration-200">
                  <p className="font-body text-slate-300 leading-relaxed">{role}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div>
          <h2 className="font-display text-3xl text-white border-l-[3px] border-[#E8C547] pl-4 mb-8">
            Leadership Experience
          </h2>
          {adminExp && (
            <div className="bg-[#0F1520] border border-[#1E2A3A] p-8">
              <h3 className="font-display text-2xl text-white mb-2">{adminExp.role}</h3>
              <p className="font-body text-[#4A9EBF] text-sm mb-6">{adminExp.institution} • {adminExp.period}</p>
              <ul className="flex flex-col gap-4">
                {adminExp.details.map((detail, idx) => (
                  <li key={idx} className="font-body text-slate-400 border-l-2 border-[#1E2A3A] pl-4">
                    {detail}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

      </main>
    </div>
  );
}