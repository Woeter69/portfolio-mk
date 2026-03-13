'use client';

import { useState } from 'react';
import Navigation from '@/components/Navigation';
import Image from 'next/image';
import { Camera, Layers, Users, Beaker, Maximize2, X } from 'lucide-react';

interface GalleryImage {
    src: string;
    title: string;
    category: 'lab' | 'group' | 'conference' | 'other';
    description?: string;
}

const galleryImages: GalleryImage[] = [
    {
        src: "/images/20260125_215428.png",
        title: "Research Group Session",
        category: "group",
        description: "Recent meeting with Ph.D. scholars discussing nano-biotechnology advancements."
    },
    // Placeholders for future content
    {
        src: "https://images.unsplash.com/photo-1532187863486-abf9fb3a3ec2?q=80&w=1470&auto=format&fit=crop",
        title: "Lab Experiments",
        category: "lab",
        description: "Synthesis of gold nanoparticles using green chemistry principles."
    },
    {
        src: "https://images.unsplash.com/photo-1507413245164-6160d8298b31?q=80&w=1470&auto=format&fit=crop",
        title: "Microscopy Analysis",
        category: "lab",
        description: "Characterization of silica nanoparticles under high-resolution microscopy."
    },
    {
        src: "https://images.unsplash.com/photo-1526628953301-3e589a6a8b74?q=80&w=1406&auto=format&fit=crop",
        title: "Conference Presentation",
        category: "conference",
        description: "Presenting research on DNA G-quadruplex structures at an international symposium."
    }
];

export default function GalleryPage() {
    const [filter, setFilter] = useState<GalleryImage['category'] | 'all'>('all');
    const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);

    const filteredImages = filter === 'all' 
        ? galleryImages 
        : galleryImages.filter(img => img.category === filter);

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
            <Navigation currentPage="/gallery" />

            {/* Background Effects */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-20 left-10 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-20 right-10 w-96 h-96 bg-rose-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
            </div>

            <main className="relative pt-32 pb-20 px-6">
                <div className="max-w-7xl mx-auto">
                    {/* Header */}
                    <div className="text-center mb-16">
                        <h1 className="text-5xl md:text-6xl font-bold mb-6">
                            <span className="gradient-gold">Visual Journey</span>
                        </h1>
                        <p className="text-xl text-slate-400 max-w-3xl mx-auto mb-10">
                            A glimpse into our lab activities, research group, and academic milestones
                        </p>

                        {/* Filter Tabs */}
                        <div className="flex flex-wrap justify-center gap-4 mb-12">
                            {[
                                { id: 'all', label: 'All Photos', icon: Layers },
                                { id: 'lab', label: 'Lab Work', icon: Beaker },
                                { id: 'group', label: 'Research Group', icon: Users },
                                { id: 'conference', label: 'Conferences', icon: Camera }
                            ].map((tab) => (
                                <button
                                    key={tab.id}
                                    onClick={() => setFilter(tab.id as any)}
                                    className={`flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all ${
                                        filter === tab.id 
                                        ? 'bg-rose-600 text-white shadow-lg shadow-rose-600/30 scale-105' 
                                        : 'bg-slate-800/50 text-slate-400 hover:bg-slate-800 hover:text-white border border-slate-700'
                                    }`}
                                >
                                    <tab.icon className="w-4 h-4" />
                                    {tab.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Gallery Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredImages.map((image, idx) => (
                            <div 
                                key={idx}
                                className="group relative glass rounded-2xl overflow-hidden aspect-[4/3] cursor-pointer hover-lift"
                                onClick={() => setSelectedImage(image)}
                            >
                                <Image
                                    src={image.src}
                                    alt={image.title}
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    <div className="absolute bottom-0 left-0 right-0 p-6">
                                        <p className="text-rose-400 text-xs uppercase tracking-widest mb-2 font-bold">{image.category}</p>
                                        <h3 className="text-xl font-bold text-white mb-2">{image.title}</h3>
                                        {image.description && (
                                            <p className="text-slate-300 text-sm line-clamp-2">{image.description}</p>
                                        )}
                                        <div className="mt-4 flex items-center gap-2 text-white/50 text-xs">
                                            <Maximize2 className="w-4 h-4" />
                                            <span>Click to enlarge</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Lightbox */}
                    {selectedImage && (
                        <div 
                            className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/95 p-4 backdrop-blur-sm animate-fadeIn"
                            onClick={() => setSelectedImage(null)}
                        >
                            <button className="absolute top-6 right-6 text-white/70 hover:text-white transition-colors">
                                <X className="w-10 h-10" />
                            </button>
                            <div className="max-w-5xl w-full relative" onClick={e => e.stopPropagation()}>
                                <div className="relative aspect-video rounded-3xl overflow-hidden shadow-2xl border border-white/10">
                                    <Image
                                        src={selectedImage.src}
                                        alt={selectedImage.title}
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                                <div className="mt-8 text-center max-w-2xl mx-auto">
                                    <p className="text-rose-400 text-sm uppercase tracking-widest mb-3 font-bold">{selectedImage.category}</p>
                                    <h2 className="text-3xl font-bold text-white mb-4">{selectedImage.title}</h2>
                                    {selectedImage.description && (
                                        <p className="text-slate-300 text-lg leading-relaxed">{selectedImage.description}</p>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}
