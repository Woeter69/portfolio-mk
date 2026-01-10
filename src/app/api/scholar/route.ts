import { NextResponse } from 'next/server';
import axios from 'axios';
import * as cheerio from 'cheerio';

const SCHOLAR_ID = 'PZ-8nBQAAAAJ';
const SCHOLAR_URL = `https://scholar.google.com/citations?user=${SCHOLAR_ID}&hl=en&oi=ao&cstart=0&pagesize=100`;

interface ScholarStats {
    citations: {
        all: number;
        since2018: number;
    };
    h_index: {
        all: number;
        since2018: number;
    };
    i10_index: {
        all: number;
        since2018: number;
    };
}

interface Publication {
    title: string;
    authors: string;
    journal: string;
    year: string;
    citations: string;
    link?: string;
}

const SERPAPI_KEY = process.env.SERPAPI_KEY;

export async function GET() {
    try {
        if (!SERPAPI_KEY) {
            console.error('Missing SERPAPI_KEY');
            // Fallback if key is missing
            return NextResponse.json({ stats: null, publications: null, error: 'Configuration Error' }, { status: 200 });
        }

        const response = await axios.get('https://serpapi.com/search.json', {
            params: {
                engine: 'google_scholar_author',
                author_id: SCHOLAR_ID,
                api_key: SERPAPI_KEY,
                hl: 'en',
                num: 100 // Fetch up to 100 publications (replaces previous pagesize=100)
            }
        });

        const data = response.data;

        // 1. Process Stats
        // SerpApi returns a table array: [ { citations: { all: X, since_2021: Y } }, ... ]
        const table = data.cited_by?.table || [];

        const getSince = (obj: any) => {
            if (!obj) return 0;
            // Find key starting with 'since' (e.g., since_2021)
            const key = Object.keys(obj).find(k => k.startsWith('since'));
            return key ? obj[key] : 0;
        };

        const stats: ScholarStats = {
            citations: {
                all: table[0]?.citations?.all || 0,
                since2018: getSince(table[0]?.citations)
            },
            h_index: {
                all: table[1]?.h_index?.all || 0,
                since2018: getSince(table[1]?.h_index)
            },
            i10_index: {
                all: table[2]?.i10_index?.all || 0,
                since2018: getSince(table[2]?.i10_index)
            },
        };

        // 2. Process Publications
        const publications: Publication[] = (data.articles || []).map((article: any) => ({
            title: article.title,
            authors: article.authors,
            journal: article.publication,
            year: article.year || 'N/A',
            citations: article.cited_by?.value?.toString() || '0',
            link: article.link
        }));

        return NextResponse.json(
            { stats, publications },
            {
                headers: {
                    // Cache for 12 hours (43200s), allow stale for 24h
                    'Cache-Control': 'public, s-maxage=43200, stale-while-revalidate=86400',
                },
            }
        );

    } catch (error) {
        console.error('Error fetching SerpApi data:', error);
        // Fail gracefully so frontend uses fallback
        return NextResponse.json({ stats: null, publications: null, error: 'API Error' }, { status: 200 });
    }
}
