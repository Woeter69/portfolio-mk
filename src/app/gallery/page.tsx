'use client';

import Navigation from '@/components/Navigation';
import { Camera, Image, Users, Beaker } from 'lucide-react';

export default function GalleryPage() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
            <Navigation currentPage="/gallery" />

            {/* Background Effects */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-20 left-10 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
            </div>

            <main className="relative pt-32 pb-20 px-6">
                <div className="max-w-7xl mx-auto">

                    {/* Header */}
                    <div className="text-center mb-16">
                        <h1 className="text-5xl md:text-6xl font-bold mb-6">
                            <span className="gradient-gold">Gallery</span>
                        </h1>
                        <p className="text-xl text-slate-400 max-w-3xl mx-auto mb-8">
                            Lab pictures, research group photos, visitors, and memorable moments
                        </p>
                    </div>

                    {/* Coming Soon Section */}
                    <div className="glass rounded-3xl p-16 text-center max-w-4xl mx-auto">
                        <div className="mb-8">
                            <div className="w-24 h-24 bg-gradient-to-br from-pink-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
                                <Camera className="w-12 h-12 text-white" />
                            </div>
                            <h2 className="text-3xl font-bold text-white mb-4">Gallery Coming Soon</h2>
                            <p className="text-lg text-slate-400 mb-8">
                                Photos from lab activities, research group events, conferences, and special occasions will be available shortly.
                            </p>
                        </div>

                        {/* Preview Categories */}
                        <div className="grid md:grid-cols-2 gap-6 mt-12">
                            <div className="bg-slate-800/50 rounded-xl p-8 text-left">
                                <Beaker className="w-10 h-10 text-pink-400 mb-4" />
                                <h3 className="text-xl font-semibold text-white mb-2">Lab Pictures</h3>
                                <p className="text-sm text-slate-400">Research equipment, experiments, and laboratory facilities</p>
                            </div>
                            <div className="bg-slate-800/50 rounded-xl p-8 text-left">
                                <Users className="w-10 h-10 text-purple-400 mb-4" />
                                <h3 className="text-xl font-semibold text-white mb-2">Research Group</h3>
                                <p className="text-sm text-slate-400">Team photos, group activities, and celebrations</p>
                            </div>
                            <div className="bg-slate-800/50 rounded-xl p-8 text-left">
                                <Image className="w-10 h-10 text-teal-400 mb-4" />
                                <h3 className="text-xl font-semibold text-white mb-2">Conferences & Events</h3>
                                <p className="text-sm text-slate-400">Presentations, workshops, and academic gatherings</p>
                            </div>
                            <div className="bg-slate-800/50 rounded-xl p-8 text-left">
                                <Camera className="w-10 h-10 text-gold mb-4" />
                                <h3 className="text-xl font-semibold text-white mb-2">Special Moments</h3>
                                <p className="text-sm text-slate-400">Awards, achievements, and memorable occasions</p>
                            </div>
                        </div>

                        {/* Note */}
                        <div className="mt-12 bg-gradient-to-r from-pink-600/10 to-purple-600/10 border border-pink-500/30 rounded-xl p-6">
                            <p className="text-slate-300 text-sm">
                                <strong className="text-white">Note:</strong> We're currently curating and organizing photos from various events and activities. Check back soon for a comprehensive visual journey through our research and academic life!
                            </p>
                        </div>
                    </div>

                </div>
            </main>
        </div>
    );
}
