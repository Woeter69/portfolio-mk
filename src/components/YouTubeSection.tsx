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
        return <div className="py-24 text-center font-body text-slate-500 uppercase tracking-widest text-sm">Loading Media...</div>;
    }

    if (error || !channelData) {
        return <div className="py-24 text-center font-body text-slate-500 uppercase tracking-widest text-sm">Media content temporarily unavailable.</div>;
    }

    const formatCount = (count: string) => {
        const num = parseInt(count);
        return new Intl.NumberFormat('en-US', { notation: "compact", maximumFractionDigits: 1 }).format(num);
    };

    return (
        <section id="youtube">
            <div className="bg-[#0F1520] border border-[#1E2A3A] p-8 mb-12 flex flex-col md:flex-row items-center justify-between gap-8">
                <div className="flex items-center gap-6">
                    <div className="relative h-20 w-20 shrink-0 bg-[#0B0F19] border border-[#1E2A3A]">
                        <Image
                            src={channelData.thumbnailUrl}
                            alt={channelData.title}
                            fill
                            className="object-cover"
                        />
                    </div>
                    <div>
                        <h2 className="font-display text-2xl font-bold text-white mb-2">
                            {channelData.title}
                        </h2>
                        <div className="flex gap-4 font-body text-sm text-slate-400">
                            <span>
                                <strong className="text-white">{formatCount(channelData.subscriberCount)}</strong> Subscribers
                            </span>
                            <span className="w-px h-4 bg-[#1E2A3A]" />
                            <span>
                                <strong className="text-white">{formatCount(channelData.viewCount)}</strong> Views
                            </span>
                        </div>
                    </div>
                </div>

                <a
                    href={`https://youtube.com/@mahimakaushik2465?sub_confirmation=1`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-body text-sm border border-[#1E2A3A] bg-[#0B0F19] px-6 py-3 text-[#E8C547] hover:border-[#E8C547] hover:text-white transition-colors duration-200 uppercase tracking-widest font-medium flex items-center gap-2"
                >
                    <span>Subscribe</span>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                </a>
            </div>

            <div>
                <div className="mb-6">
                    <h3 className="font-display text-2xl text-white">Latest Uploads</h3>
                </div>
                <VideoCarousel videos={videos} />
            </div>
        </section>
    );
}