import { NextResponse } from 'next/server';
import { staticStats, staticPublications } from '@/data/publications';
import axios from 'axios';
import * as cheerio from 'cheerio';

const SCHOLAR_ID = 'PZ-8nBQAAAAJ';
const SCHOLAR_URL = `https://scholar.google.com/citations?user=${SCHOLAR_ID}&hl=en&oi=ao&cstart=0&pagesize=100`;

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

export async function GET() {
    try {
        const { data } = await axios.get(SCHOLAR_URL, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
            },
            timeout: 10000,
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

        if (stats && publications && publications.length > 0) {
            console.log('✅ Successfully fetched data from Google Scholar');
            return NextResponse.json({ stats, publications }, {
                headers: {
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
                isStatic: true
            },
            {
                status: 200,
                headers: {
                    'Cache-Control': 'public, s-maxage=86400',
                },
            }
        );
    }
}
