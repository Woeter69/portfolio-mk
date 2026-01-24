import { NextResponse } from 'next/server';
import { staticStats, staticPublications } from '@/data/publications';

export async function GET() {
    try {
        // Try to fetch from backend scraper first
        const backendUrl = process.env.BACKEND_URL || 'http://localhost:3001';

        const controller = new AbortController();
        // Reduced to 2.5s to ensure we fail fast and fallback to static data 
        // before the Vercel/Serverless function execution limit (often 10s) kills the process.
        const timeoutId = setTimeout(() => controller.abort(), 2500);

        const response = await fetch(`${backendUrl}/scholar`, {
            signal: controller.signal,
        });

        clearTimeout(timeoutId);

        if (!response.ok) {
            throw new Error(`Backend returned ${response.status}`);
        }

        const data = await response.json();

        // Check if we got valid data
        if (data && data.stats && data.publications && data.publications.length > 0) {
            console.log('✅ Successfully fetched data from Google Scholar');
            return NextResponse.json(data, {
                headers: {
                    'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
                },
            });
        }

        // If data is empty, fall back to static
        throw new Error('Empty data from backend');

    } catch (error) {
        console.warn('⚠️ Google Scholar fetch failed, using static data:', error instanceof Error ? error.message : 'Unknown error');

        // Fall back to static data
        return NextResponse.json(
            {
                stats: staticStats,
                publications: staticPublications,
                isStatic: true // Flag to indicate this is static data
            },
            {
                status: 200,
                headers: {
                    'Cache-Control': 'public, s-maxage=86400', // Cache static data for 24 hours
                },
            }
        );
    }
}
