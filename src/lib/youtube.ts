import { google } from 'googleapis';

const YOUTUBE_API_KEY = process.env.NEXT_PUBLIC_YOUTUBE_API_KEY || "AIzaSyD19Vz8uy7gyrDvSkZKi_zALq5l_OSoPrM";
// TODO: Move key to .env.local

export interface YouTubeChannelStats {
    id: string;
    subscriberCount: string;
    viewCount: string;
    hiddenSubscriberCount: boolean;
    videoCount: string;
    title: string;
    customUrl: string;
    thumbnailUrl: string;
    uploadsPlaylistId: string;
}

export interface YouTubeVideo {
    id: string;
    title: string;
    thumbnailUrl: string;
    publishedAt: string;
    description: string;
    url: string;
}

export const getChannelData = async (handle: string) => {
    if (!YOUTUBE_API_KEY) {
        console.warn("YouTube API Key is missing");
        return null;
    }

    try {
        const response = await fetch(
            `https://www.googleapis.com/youtube/v3/channels?part=snippet,statistics,contentDetails&forHandle=${handle}&key=${YOUTUBE_API_KEY}`
        );

        if (!response.ok) {
            throw new Error('Failed to fetch channel data');
        }

        const data = await response.json();

        if (!data.items || data.items.length === 0) {
            return null;
        }

        const item = data.items[0];
        return {
            id: item.id,
            subscriberCount: item.statistics.subscriberCount,
            viewCount: item.statistics.viewCount,
            hiddenSubscriberCount: item.statistics.hiddenSubscriberCount,
            videoCount: item.statistics.videoCount,
            title: item.snippet.title,
            customUrl: item.snippet.customUrl,
            thumbnailUrl: item.snippet.thumbnails.high?.url || item.snippet.thumbnails.medium?.url || item.snippet.thumbnails.default?.url,
            uploadsPlaylistId: item.contentDetails.relatedPlaylists.uploads
        } as YouTubeChannelStats;

    } catch (error) {
        console.error("Error fetching YouTube channel statistics:", error);
        return null;
    }
};

export const getLatestVideos = async (uploadsPlaylistId: string, maxResults = 10) => {
    if (!YOUTUBE_API_KEY) return [];

    try {
        const videosResponse = await fetch(
            `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${uploadsPlaylistId}&maxResults=${maxResults}&key=${YOUTUBE_API_KEY}`
        );
        const videosData = await videosResponse.json();

        if (!videosData.items) return [];

        return videosData.items.map((item: any) => ({
            id: item.snippet.resourceId.videoId,
            title: item.snippet.title,
            thumbnailUrl: item.snippet.thumbnails.high?.url || item.snippet.thumbnails.medium?.url || item.snippet.thumbnails.default?.url,
            publishedAt: item.snippet.publishedAt,
            description: item.snippet.description,
            url: `https://www.youtube.com/watch?v=${item.snippet.resourceId.videoId}`
        })) as YouTubeVideo[];

    } catch (error) {
        console.error("Error fetching YouTube videos:", error);
        return [];
    }
};
