# Changelog

All notable changes to this project will be documented in this file.

## [Unreleased]

### Fixed
- Reduced the Scholar API timeout from 10s to 2.5s to prevent serverless function timeouts (e.g., on Vercel) before the static data fallback can trigger. This fixes the issue where the publications page would show a 504 error instead of the fallback data when the backend scraper is unreachable.
