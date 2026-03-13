# Professor Mahima Kaushik - Academic Portfolio

A modern, high-performance academic portfolio built with Next.js 15, React 19, and Tailwind CSS 4. This project showcases the research, teaching, and administrative contributions of Prof. Mahima Kaushik.

## Key Features

- Dynamic Publications System: Hybrid approach using live Google Scholar scraping with file-based caching and static fallback.
- Modern UI/UX: Professional aesthetic using a structured academic layout, deep dark themes, refined typography, and smooth interactions.
- Interactive Gallery: Categorized visual journey through lab work, conferences, and group activities.
- YouTube Integration: Real-time channel statistics and latest videos display using the YouTube Data API.
- SEO Optimized: Advanced metadata, OpenGraph tags, and semantic HTML for high academic visibility.
- Comprehensive Sections:
    - Research: Detailed focus areas and funded projects.
    - Teaching: Mentorship highlights and courses taught.
    - Administrative: Leadership roles and university governance.
    - Group: Individual scholar profiles and research team overview.

## Technical Stack

- Frontend: Next.js 15 (App Router), TypeScript, Tailwind CSS 4, Lucide Icons.
- Backend/API: Next.js API Routes (Serverless), Cheerio (Scraping), Axios.
- State/Data: React Hooks, Static Data Fallbacks.

## Getting Started

### Prerequisites
- Node.js 18.x or higher
- YouTube Data API v3 Key (optional, for video section)

### Installation
1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env.local` file:
   ```env
   NEXT_PUBLIC_YOUTUBE_API_KEY=your_api_key_here
   ```
4. Run the development server:
   ```bash
   npm run dev
   ```

## Project Structure

- `src/app/`: Next.js pages and API routes.
- `src/components/`: Reusable UI components.
- `src/data/`: Centralized data store (portfolio, publications, scholars).
- `src/lib/`: Utility functions and API integrations.
- `public/`: Static assets and images.

---
Maintained for Prof. Mahima Kaushik by @Pranjul-00 @woeter69 @hy69x @chandraguptsharma07
