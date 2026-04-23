"use client";

import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import type { YouTubeVideo } from "../lib/youtube";

interface VideoCarouselProps {
    videos: YouTubeVideo[];
}

export default function VideoCarousel({ videos }: VideoCarouselProps) {
    const scrollRef = useRef<HTMLDivElement>(null);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(true);

    const checkScroll = () => {
        if (scrollRef.current) {
            const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
            setCanScrollLeft(scrollLeft > 0);
            setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1);
        }
    };

    useEffect(() => {
        checkScroll();
        window.addEventListener("resize", checkScroll);
        return () => window.removeEventListener("resize", checkScroll);
    }, [videos]);

    const scroll = (direction: "left" | "right") => {
        if (scrollRef.current) {
            const container = scrollRef.current;
            const linkTag = container.querySelector('a');
            const cardWidth = linkTag ? linkTag.clientWidth : 350;
            const gap = 24;
            const scrollAmount = cardWidth + gap;

            container.scrollBy({
                left: direction === "left" ? -scrollAmount : scrollAmount,
                behavior: "smooth",
            });
            setTimeout(checkScroll, 300);
        }
    };

    return (
        <div className="relative group">
            {canScrollLeft && (
                <button
                    onClick={() => scroll("left")}
                    className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 p-3 bg-[#0F1520] border border-[#1E2A3A] text-slate-400 hover:text-[#E8C547] hover:border-[#E8C547] transition-colors duration-200 opacity-0 group-hover:opacity-100 disabled:opacity-0"
                    aria-label="Scroll left"
                >
                    ←
                </button>
            )}

            {canScrollRight && (
                <button
                    onClick={() => scroll("right")}
                    className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 p-3 bg-[#0F1520] border border-[#1E2A3A] text-slate-400 hover:text-[#E8C547] hover:border-[#E8C547] transition-colors duration-200 opacity-0 group-hover:opacity-100 disabled:opacity-0"
                    aria-label="Scroll right"
                >
                    →
                </button>
            )}

            <div
                ref={scrollRef}
                onScroll={checkScroll}
                className="flex gap-6 overflow-x-auto pb-4 pt-2 snap-x snap-mandatory scrollbar-hide no-scrollbar"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
                {videos.map((video) => (
                    <a
                        key={video.id}
                        href={video.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-none w-[300px] md:w-[350px] snap-center group/card bg-[#0F1520] border border-[#1E2A3A] p-4 hover:border-[#E8C547] transition-colors duration-200"
                    >
                        <div className="relative aspect-video w-full mb-4 bg-[#0B0F19] border border-[#1E2A3A]">
                            <Image
                                src={video.thumbnailUrl}
                                alt={video.title}
                                fill
                                className="object-cover transition-all duration-300"
                            />
                        </div>

                        <div className="text-left">
                            <h3 className="font-display text-lg text-white mb-2 line-clamp-2">
                                {video.title}
                            </h3>
                            <p className="font-body text-[#4A9EBF] text-xs uppercase tracking-widest font-bold">
                                {new Date(video.publishedAt).toLocaleDateString(undefined, {
                                    year: "numeric",
                                    month: "long",
                                    day: "numeric",
                                })}
                            </p>
                        </div>
                    </a>
                ))}
            </div>
        </div>
    );
}