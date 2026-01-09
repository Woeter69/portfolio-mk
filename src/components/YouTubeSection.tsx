"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { getChannelData, getLatestVideos, type YouTubeChannelStats, type YouTubeVideo } from "../lib/youtube";
import VideoCarousel from "./VideoCarousel";

const HANDLE = "@mahimakaushik2465";

export default function YouTubeSection() {
    const [channelData, setChannelData] = useState<YouTubeChannelStats | null>(null);
    const [videos, setVideos] = useState<YouTubeVideo[]>([]);
    const [loading, setLoading] = useState(true);

    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchData() {
            try {
                const stats = await getChannelData(HANDLE);
                if (stats) {
                    setChannelData(stats);
                    const latestVideos = await getLatestVideos(stats.uploadsPlaylistId);
                    setVideos(latestVideos);
                } else {
                    setError("No channel data found. Check API Key or Handle.");
                }
            } catch (error) {
                console.error("Failed to load YouTube data", error);
                setError("Failed to load YouTube content.");
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    }, []);

    if (loading) {
        return <div className="py-20 text-center text-slate-500" suppressHydrationWarning>Loading YouTube Content...</div>;
    }

    if (error || !channelData) {
        // Show a discrete error message in development or logged in, but for public site maybe just hide?
        // User wants to debug, so let's show it temporarily or use proper logging.
        // Let's print the error to the UI so the user can see it on Vercel.
        return <div className="py-20 text-center text-red-400">Unable to load YouTube Section: {error}</div>;
    }

    // Format numbers (e.g. 1500 -> 1.5K)
    const formatCount = (count: string) => {
        const num = parseInt(count);
        return new Intl.NumberFormat('en-US', { notation: "compact", maximumFractionDigits: 1 }).format(num);
    };

    return (
        <section id="youtube" className="py-20 relative overflow-hidden">
            {/* Background Decor */}
            <div className="absolute inset-0 bg-red-900/5 -z-10" />
            <div className="absolute -right-20 top-20 w-96 h-96 bg-red-600/10 rounded-full blur-[100px]" />

            <div className="mx-auto max-w-7xl px-6">
                {/* Channel Header */}
                <div className="mb-12 flex flex-col md:flex-row items-center justify-between gap-8 glass p-8 rounded-3xl border border-white/5 bg-gradient-to-br from-white/5 to-transparent">

                    <div className="flex items-center gap-6">
                        <div className="relative h-20 w-20 md:h-24 md:w-24 shrink-0 rounded-full overflow-hidden border-2 border-red-600/50 shadow-lg shadow-red-900/20">
                            <Image
                                src={channelData.thumbnailUrl}
                                alt={channelData.title}
                                fill
                                className="object-cover"
                            />
                        </div>
                        <div>
                            <h2 className="font-display text-2xl md:text-3xl font-bold text-white mb-2">
                                {channelData.title}
                            </h2>
                            <div className="flex gap-4 text-sm md:text-base text-slate-400">
                                <span className="flex items-center gap-1.5">
                                    <svg className="w-4 h-4 text-red-500" fill="currentColor" viewBox="0 0 24 24"><path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" /></svg>
                                    <strong className="text-white">{formatCount(channelData.subscriberCount)}</strong> Subscribers
                                </span>
                                <span className="w-px h-4 bg-white/10" />
                                <span>
                                    <strong className="text-white">{formatCount(channelData.viewCount)}</strong> Views
                                </span>
                            </div>
                        </div>
                    </div>

                    <a
                        href={`https://youtube.com/${channelData.customUrl}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group relative inline-flex items-center gap-2 rounded-full bg-red-600 px-6 py-3 font-semibold text-white shadow-lg shadow-red-600/30 transition hover:bg-red-500 hover:-translate-y-0.5"
                    >
                        <span>Subscribe</span>
                        <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                    </a>
                </div>

                {/* Video Carousel */}
                <div>
                    <div className="flex items-center gap-4 mb-8">
                        <h3 className="text-2xl font-display text-white">Latest Videos</h3>
                        <div className="h-px flex-1 bg-gradient-to-r from-white/10 to-transparent" />
                    </div>

                    <VideoCarousel videos={videos} />
                </div>

            </div>
        </section>
    );
}
