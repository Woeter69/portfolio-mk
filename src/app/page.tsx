"use client";

import { useState } from "react";
import ColorBends from "@/components/react-bits/ColorBends";
import { GlareCard } from "@/components/ui/glare-card";
import GlassIcons from "@/components/GlassIcons";
import { Briefcase, Mail } from "lucide-react";
import DNAIntro from "@/components/DNAIntro";

export default function Home() {
  const [introComplete, setIntroComplete] = useState(false);
  
  const glassItems = [
    { icon: <Briefcase size={24} />, color: 'blue', label: 'Explore Work' },
    { icon: <Mail size={24} />, color: 'purple', label: 'Contact Me' },
  ];

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-black text-white">
      {/* Intro Animation */}
      {!introComplete && (
        <DNAIntro onComplete={() => setIntroComplete(true)} />
      )}

      {/* Background Effect */}
      <div 
        className={`absolute inset-0 z-0 transition-opacity duration-[3000ms] ${introComplete ? "opacity-100" : "opacity-0"}`}
      >
        <ColorBends
          className="h-full w-full"
          colors={["#ff5c7a", "#8a5cff", "#00ffd1"]}
          rotation={30}
          speed={0.3}
          scale={1.2}
          frequency={1.4}
          warpStrength={1.2}
          mouseInfluence={0.8}
          parallax={0.6}
          noise={0.08}
          transparent
        />
      </div>

      {/* Content Overlay */}
      <div 
        className={`relative z-10 flex flex-col items-center justify-center p-4 transition-all duration-1000 transform ${introComplete ? "opacity-100 scale-100" : "opacity-0 scale-95"}`}
      >
        <GlareCard className="flex flex-col items-center justify-center p-12 text-center max-w-3xl w-full rounded-3xl">
          <div className="h-24 w-24 rounded-full bg-gradient-to-br from-cyan-400 to-purple-500 mb-6 flex items-center justify-center shadow-lg">
            <span className="text-4xl">🧬</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tighter mb-4 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-500">
            Prof. Mahima Kaushik
          </h1>
          <p className="text-lg md:text-xl font-light text-gray-200 mb-8 max-w-xl">
            Pioneering Nano-biotechnology & Environmental Applications
          </p>
          
          <div className="flex justify-center w-full">
            <GlassIcons items={glassItems} />
          </div>
        </GlareCard>
      </div>
    </div>
  );
}
