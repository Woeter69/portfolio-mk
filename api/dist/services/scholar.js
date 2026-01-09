"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getScholarData = void 0;
const axios_1 = __importDefault(require("axios"));
const cheerio = __importStar(require("cheerio"));
const SCHOLAR_ID = 'PZ-8nBQAAAAJ';
const SCHOLAR_URL = `https://scholar.google.com/citations?user=${SCHOLAR_ID}&hl=en&oi=ao&cstart=0&pagesize=100`;
const getScholarData = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { data } = yield axios_1.default.get(SCHOLAR_URL, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
            },
        });
        const $ = cheerio.load(data);
        // 1. Scrape Stats (Citations, h-index, i10-index)
        // The table #gsc_rsb_st has rows for Citations, h-index, i10-index
        // Each row has two numerical columns: All and Since 20xx
        const stats = {
            citations: { all: 0, since2018: 0 },
            h_index: { all: 0, since2018: 0 },
            i10_index: { all: 0, since2018: 0 },
        };
        const statsTable = $('#gsc_rsb_st');
        if (statsTable.length) {
            const rows = statsTable.find('tbody tr');
            // Helper to safely parse numbers
            const parseNum = (val) => parseInt(val.replace(/,/g, ''), 10) || 0;
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
        const publications = [];
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
    }
    catch (error) {
        console.error('Error fetching Scholar data:', error);
        throw new Error('Failed to fetch Google Scholar data');
    }
});
exports.getScholarData = getScholarData;
