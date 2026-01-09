import axios from 'axios';
import * as cheerio from 'cheerio';

const SCHOLAR_ID = 'PZ-8nBQAAAAJ';
const SCHOLAR_URL = `https://scholar.google.com/citations?user=${SCHOLAR_ID}&hl=en&oi=ao&cstart=0&pagesize=100`;

export interface ScholarStats {
  citations: {
    all: number;
    since2018: number; // or calculate "since recent year" dynamically if possible, but scholar hardcodes the column
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

export interface Publication {
  title: string;
  authors: string;
  journal: string;
  year: string;
  citations: string;
  link?: string;
}

export const getScholarData = async () => {
  try {
    const { data } = await axios.get(SCHOLAR_URL, {
      headers: {
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
      },
    });

    const $ = cheerio.load(data);

    // 1. Scrape Stats (Citations, h-index, i10-index)
    // The table #gsc_rsb_st has rows for Citations, h-index, i10-index
    // Each row has two numerical columns: All and Since 20xx
    const stats: ScholarStats = {
      citations: { all: 0, since2018: 0 },
      h_index: { all: 0, since2018: 0 },
      i10_index: { all: 0, since2018: 0 },
    };

    const statsTable = $('#gsc_rsb_st');
    if (statsTable.length) {
      const rows = statsTable.find('tbody tr');

      // Helper to safely parse numbers
      const parseNum = (val: string) => parseInt(val.replace(/,/g, ''), 10) || 0;

      // Row 0: Citations
      const citRow = $(rows[0]).find('.gsc_rsb_std');
      if (citRow.length >= 2) {
        stats.citations.all = parseNum($(citRow[0]).text());
        stats.citations.since2018 = parseNum($(citRow[1]).text());
      }

      // Row 1: h-index
      const hRow = $(rows[1]).find('.gsc_rsb_std');
      if (hRow.length >= 2) {
        stats.h_index.all = parseNum($(hRow[0]).text());
        stats.h_index.since2018 = parseNum($(hRow[1]).text());
      }

      // Row 2: i10-index
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

      if (title) { // simple validation
        publications.push({
          title,
          authors,
          journal,
          year,
          citations,
          link
        });
      }
    });

    return { stats, publications };

  } catch (error) {
    console.error('Error fetching Scholar data:', error);
    throw new Error('Failed to fetch Google Scholar data');
  }
};
