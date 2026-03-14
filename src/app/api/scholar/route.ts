import { NextResponse } from 'next/server';
import { staticStats, staticPublications } from '@/data/publications';
import axios from 'axios';
import * as cheerio from 'cheerio';
import fs from 'fs';
import path from 'path';

import os from 'os';

const SCHOLAR_ID = 'PZ-8nBQAAAAJ';
const SCHOLAR_URL = `https://scholar.google.com/citations?user=${SCHOLAR_ID}&hl=en&oi=ao&cstart=0&pagesize=100`;

// Cache configuration - Use /tmp for Vercel serverless compatibility
const CACHE_FILE = path.join(os.tmpdir(), 'scholar-cache.json');
const CACHE_TTL = 3600 * 1000; // 1 hour in milliseconds

interface ScholarStats {
    citations: { all: number; since2018: number; };
    h_index: { all: number; since2018: number; };
    i10_index: { all: number; since2018: number; };
}

interface Publication {
    title: string;
    authors: string;
    journal: string;
    year: string;
    citations: string;
    link?: string;
}

interface CoAuthor {
    name: string;
    link: string;
    affiliation: string;
}

// Static Fallback Data for Graph and Co-Authors
const staticGraph = [
    { year: '2012', citations: 37 }, { year: '2013', citations: 26 },
    { year: '2014', citations: 26 }, { year: '2015', citations: 25 },
    { year: '2016', citations: 53 }, { year: '2017', citations: 42 },
    { year: '2018', citations: 74 }, { year: '2019', citations: 60 },
    { year: '2020', citations: 84 }, { year: '2021', citations: 112 },
    { year: '2022', citations: 137 }, { year: '2023', citations: 190 },
    { year: '2024', citations: 197 }, { year: '2025', citations: 250 }
];

const staticCoAuthors = [
    { name: "Shrikant Kukreti", link: "https://scholar.google.com/citations?user=xZ3_p5cAAAAJ", affiliation: "Professor, Department of Chemistry, University of Delhi" },
    { name: "Ritushree Kukreti", link: "https://scholar.google.com/citations?user=Rku02yYAAAAJ", affiliation: "CSIR-Institute of Genomics and Integrative Biology" },
    { name: "Amit Singh", link: "https://scholar.google.com", affiliation: "Researcher, University of Delhi" },
    { name: "Sonia Khurana", link: "https://scholar.google.com", affiliation: "Researcher, University of Delhi" }
];

function getCachedData() {
    try {
        if (fs.existsSync(CACHE_FILE)) {
            const cache = JSON.parse(fs.readFileSync(CACHE_FILE, 'utf-8'));
            const now = Date.now();
            if (now - cache.timestamp < CACHE_TTL) {
                console.log('📦 Returning cached Scholar data');
                return cache.data;
            }
        }
    } catch (e) {
        console.warn('Failed to read Scholar cache:', e);
    }
    return null;
}

function setCachedData(data: any) {
    try {
        const cacheDir = path.dirname(CACHE_FILE);
        if (!fs.existsSync(cacheDir)) {
            fs.mkdirSync(cacheDir, { recursive: true });
        }
        fs.writeFileSync(CACHE_FILE, JSON.stringify({
            timestamp: Date.now(),
            data
        }));
        console.log('💾 Scholar data cached successfully');
    } catch (e) {
        console.warn('Failed to write Scholar cache:', e);
    }
}

export async function GET() {
    // 1. Try Cache First
    const cached = getCachedData();
    if (cached) {
        return NextResponse.json(cached, {
            headers: {
                'X-Cache': 'HIT',
                'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
            },
        });
    }

    try {
        const { data } = await axios.get(SCHOLAR_URL, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
            },
            timeout: 15000,
            maxRedirects: 5,
        });

        const $ = cheerio.load(data);

        // 1. Scrape Stats
        const stats: ScholarStats = {
            citations: { all: 0, since2018: 0 },
            h_index: { all: 0, since2018: 0 },
            i10_index: { all: 0, since2018: 0 },
        };

        const statsTable = $('#gsc_rsb_st');
        if (statsTable.length) {
            const rows = statsTable.find('tbody tr');
            const parseNum = (val: string) => parseInt(val.replace(/,/g, ''), 10) || 0;

            const citRow = $(rows[0]).find('.gsc_rsb_std');
            if (citRow.length >= 2) {
                stats.citations.all = parseNum($(citRow[0]).text());
                stats.citations.since2018 = parseNum($(citRow[1]).text());
            }

            const hRow = $(rows[1]).find('.gsc_rsb_std');
            if (hRow.length >= 2) {
                stats.h_index.all = parseNum($(hRow[0]).text());
                stats.h_index.since2018 = parseNum($(hRow[1]).text());
            }

            const i10Row = $(rows[2]).find('.gsc_rsb_std');
            if (i10Row.length >= 2) {
                stats.i10_index.all = parseNum($(i10Row[0]).text());
                stats.i10_index.since2018 = parseNum($(i10Row[1]).text());
            }
        }

        // 2. Scrape Recent Publications
        const publications: Publication[] = [];
        const pubRows = $('#gsc_a_b .gsc_a_tr');

        pubRows.slice(0, 100).each((_, element) => {
            const titleEl = $(element).find('.gsc_a_t a');
            const title = titleEl.text();
            const link = `https://scholar.google.com${titleEl.attr('href')}`;

            const authors = $(element).find('.gsc_a_t .gs_gray').first().text();
            const journal = $(element).find('.gsc_a_t .gs_gray').last().text();
            const citations = $(element).find('.gsc_a_c .gsc_a_ac').text();
            const year = $(element).find('.gsc_a_y .gsc_a_h').text();

            if (title) {
                publications.push({ title, authors, journal, year, citations, link });
            }
        });

        // 3. Scrape Co-authors
        const coAuthors: CoAuthor[] = [];
        const coAuthorRows = $('#gsc_rsb_co .gsc_rsb_aa');

        coAuthorRows.each((_, element) => {
            const nameEl = $(element).find('.gsc_rsb_a_desc a');
            const name = nameEl.text();
            const link = `https://scholar.google.com${nameEl.attr('href')}`;
            const affiliation = $(element).find('.gsc_rsb_a_ext').text();

            if (name) {
                coAuthors.push({ name, link, affiliation });
            }
        });

        // 4. Scrape Citation Graph
        const graph: { year: string; citations: number }[] = [];
        const years: string[] = [];
        $('.gsc_g_t').each((_, el) => years.push($(el).text()));
        
        $('.gsc_g_a').each((i, el) => {
            const citations = parseInt($(el).text() || '0', 10);
            if (years[i]) {
                graph.push({ year: years[i], citations });
            }
        });

        if (stats && publications && publications.length > 0) {
            const responseData = { stats, publications, coAuthors, graph };
            setCachedData(responseData);
            console.log('✅ Successfully fetched data from Google Scholar');
            return NextResponse.json(responseData, {
                headers: {
                    'X-Cache': 'MISS',
                    'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
                },
            });
        }

        throw new Error('Empty data derived from HTML');

    } catch (error) {
        console.warn('⚠️ Google Scholar fetch failed, using static data:', error instanceof Error ? error.message : 'Unknown error');

        // Fall back to static data safely
        return NextResponse.json(
            {
                stats: staticStats,
                publications: staticPublications,
                coAuthors: staticCoAuthors,
                graph: staticGraph,
                isStatic: true
            },
            {
                status: 200,
                headers: {
                    'X-Cache': 'ERROR',
                    'Cache-Control': 'public, s-maxage=86400',
                },
            }
        );
    }
}
