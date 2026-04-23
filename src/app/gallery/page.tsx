"use client";

import { useState } from "react";
import Navigation from "@/components/Navigation";
import Image from "next/image";
import { Camera, Layers, Users, Beaker, Maximize2, X } from "lucide-react";

interface GalleryImage {
  src: string;
  title: string;
  category: "lab" | "group" | "conference" | "other";
  description?: string;
}

const galleryImages: GalleryImage[] = [
  {
    src: "/images/20260125_215428.png",
    title: "Research Group Session",
    category: "group",
    description: "Recent meeting with Ph.D. scholars discussing nano-biotechnology advancements.",
  },
  {
    src: "https://images.unsplash.com/photo-1532187863486-abf9fb3a3ec2?q=80&w=1470&auto=format&fit=crop",
    title: "Lab Experiments",
    category: "lab",
    description: "Synthesis of gold nanoparticles using green chemistry principles.",
  },
  {
    src: "https://images.unsplash.com/photo-1507413245164-6160d8298b31?q=80&w=1470&auto=format&fit=crop",
    title: "Microscopy Analysis",
    category: "lab",
    description: "Characterization of silica nanoparticles under high-resolution microscopy.",
  },
  {
    src: "https://images.unsplash.com/photo-1526628953301-3e589a6a8b74?q=80&w=1406&auto=format&fit=crop",
    title: "Conference Presentation",
    category: "conference",
    description: "Presenting research on DNA G-quadruplex structures at an international symposium.",
  },
];

export default function GalleryPage() {
  const [filter, setFilter] = useState<GalleryImage["category"] | "all">("all");
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);

  const filteredImages =
    filter === "all"
      ? galleryImages
      : galleryImages.filter((img) => img.category === filter);

  return (
    <div className="min-h-screen bg-[#0B0F19]">
      <Navigation currentPage="/gallery" />

      <main className="mx-auto max-w-5xl px-6 pt-32 pb-24">
        <div className="mb-12">
          <h1 className="font-display text-4xl font-bold text-white mb-4">
            Visual Journey
          </h1>
          <p className="font-body text-slate-400 text-lg max-w-2xl">
            A glimpse into our lab activities, research group, and academic milestones.
          </p>
        </div>

        <div className="flex gap-8 mb-12 border-b border-[#1E2A3A]">
          {[
            { id: "all", label: "All Photos" },
            { id: "lab", label: "Lab Work" },
            { id: "group", label: "Research Group" },
            { id: "conference", label: "Conferences" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setFilter(tab.id as any)}
              className={`pb-4 font-body uppercase tracking-widest text-sm font-medium transition-colors duration-200 ${
                filter === tab.id
                  ? "text-[#E8C547] border-b-2 border-[#E8C547]"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredImages.map((image, idx) => (
            <div
              key={idx}
              className="group relative bg-[#0F1520] border border-[#1E2A3A] p-4 cursor-pointer hover:border-[#E8C547] transition-colors duration-200"
              onClick={() => setSelectedImage(image)}
            >
              <div className="relative aspect-[4/3] w-full mb-4 bg-[#0B0F19] border border-[#1E2A3A]">
                <Image
                  src={image.src}
                  alt={image.title}
                  fill
                  className="object-cover transition-all duration-300"
                />
              </div>
              <p className="font-body text-[#4A9EBF] text-xs uppercase tracking-widest mb-1 font-bold">
                {image.category}
              </p>
              <h3 className="font-display text-lg text-white">{image.title}</h3>
            </div>
          ))}
        </div>

        {selectedImage && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-[#0B0F19]/95 p-4"
            onClick={() => setSelectedImage(null)}
          >
            <button className="absolute top-6 right-6 text-slate-400 hover:text-white transition-colors">
              <X className="w-10 h-10" />
            </button>
            <div
              className="max-w-4xl w-full relative bg-[#0F1520] border border-[#1E2A3A] p-6"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative aspect-video w-full mb-6 bg-[#0B0F19] border border-[#1E2A3A]">
                <Image
                  src={selectedImage.src}
                  alt={selectedImage.title}
                  fill
                  className="object-contain"
                />
              </div>
              <div className="text-left">
                <p className="font-body text-[#4A9EBF] text-xs uppercase tracking-widest mb-2 font-bold">
                  {selectedImage.category}
                </p>
                <h2 className="font-display text-2xl font-bold text-white mb-2">
                  {selectedImage.title}
                </h2>
                {selectedImage.description && (
                  <p className="font-body text-slate-400 text-base leading-relaxed">
                    {selectedImage.description}
                  </p>
                )}
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}