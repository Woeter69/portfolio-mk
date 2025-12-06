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
            const { clientWidth } = scrollRef.current;
            const scrollAmount = clientWidth * 0.8;
            scrollRef.current.scrollBy({
                left: direction === "left" ? -scrollAmount : scrollAmount,
                behavior: "smooth",
            });
            setTimeout(checkScroll, 300); // Check after scroll animation
        }
    };

    return (
        <div className="relative group">
            {/* Navigation Buttons */}
            {canScrollLeft && (
                <button
                    onClick={() => scroll("left")}
                    className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 p-3 rounded-full bg-surface border border-white/10 text-white shadow-xl hover:bg-gold hover:text-surface transition opacity-0 group-hover:opacity-100 disabled:opacity-0"
                    aria-label="Scroll left"
                >
                    ←
                </button>
            )}

            {canScrollRight && (
                <button
                    onClick={() => scroll("right")}
                    className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 p-3 rounded-full bg-surface border border-white/10 text-white shadow-xl hover:bg-gold hover:text-surface transition opacity-0 group-hover:opacity-100 disabled:opacity-0"
                    aria-label="Scroll right"
                >
                    →
                </button>
            )}

            {/* Carousel Container */}
            <div
                ref={scrollRef}
                onScroll={checkScroll}
                className="flex gap-6 overflow-x-auto pb-8 pt-4 px-4 snap-x snap-mandatory scrollbar-hide no-scrollbar"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
                {videos.map((video) => (
                    <a
                        key={video.id}
                        href={video.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-none w-[300px] md:w-[350px] snap-center group/card"
                    >
                        <div className="relative aspect-video rounded-xl overflow-hidden border border-white/10 shadow-lg transition duration-300 md:group-hover/card:-translate-y-2 md:group-hover/card:shadow-gold/20">
                            <Image
                                src={video.thumbnailUrl}
                                alt={video.title}
                                fill
                                className="object-cover transition duration-500 group-hover/card:scale-105"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover/card:opacity-40 transition" />

                            {/* Play Button Overlay */}
                            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover/card:opacity-100 transition duration-300">
                                <div className="w-12 h-12 rounded-full bg-red-600 flex items-center justify-center shadow-lg transform scale-90 group-hover/card:scale-100 transition">
                                    <svg className="w-6 h-6 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M8 5v14l11-7z" />
                                    </svg>
                                </div>
                            </div>
                        </div>

                        <div className="mt-4 px-1">
                            <h3 className="text-white font-medium line-clamp-2 group-hover/card:text-gold transition">
                                {video.title}
                            </h3>
                            <p className="mt-2 text-xs text-slate-400">
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
