# 🚀 API Integration Guide - Professor's Website

## 📚 Table of Contents
1. [What Are APIs?](#what-are-apis)
2. [Your Current APIs](#your-current-apis)
3. [How to Monitor Your Website](#how-to-monitor)
4. [Google Scholar Integration](#google-scholar)
5. [YouTube Integration](#youtube)
6. [Next Steps](#next-steps)

---

## 🤔 What Are APIs?

**API = Application Programming Interface**

Think of an API as a **waiter in a restaurant**:
- **You (Frontend)** = Customer who wants food
- **Kitchen (External Service)** = Google Scholar, YouTube
- **Waiter (API)** = Takes your order, brings back data

### Simple Example:
```
Your Website → "Hey, get me Google Scholar data!" → API → Google Scholar
Google Scholar → Sends data → API → Your Website displays it
```

**Benefits:**
- ✅ **Always up-to-date**: Data updates automatically from the source
- ✅ **No manual work**: You don't need to copy-paste publications
- ✅ **Real-time**: Shows current stats (citations, subscribers, etc.)

---

## 🔧 Your Current APIs

### 1️⃣ **Google Scholar API** (Custom Web Scraper)
**Location:** `api/src/services/scholar.ts`

**What it does:**
- Fetches citation stats (total citations, h-index, i10-index)
- Gets all publications with titles, authors, journals, years, citations
- Updates automatically when you refresh the page

**Current Scholar ID:** `PZ-8nBQAAAAJ` ✅ (Already configured!)

**How it works:**
```
Frontend (localhost:3000) 
    ↓ 
Calls: http://localhost:3001/scholar
    ↓
Backend scrapes Google Scholar
    ↓
Returns: { stats, publications }
    ↓
Frontend displays on homepage
```

**Where it's used:**
- Homepage → Stats section (Citations, h-index, i10-index)
- Can be used for Publications page (we'll create this!)

---

### 2️⃣ **YouTube API** (Official Google API)
**Location:** `src/lib/youtube.ts`

**What it does:**
- Fetches channel stats (subscribers, total views, video count)
- Gets latest videos from the channel
- Shows video thumbnails, titles, descriptions

**Requires:** YouTube API Key (stored in `.env.local`)

**How it works:**
```
Frontend (localhost:3000)
    ↓
Calls YouTube API directly with API Key
    ↓
Google returns channel data
    ↓
Displays videos in YouTubeSection component
```

**Where it's used:**
- Homepage → YouTube Section (if uncommented)
- Shows professor's educational videos

---

## 👀 How to Monitor Your Website

### **Frontend (Next.js) - Port 3000**
**URL:** `http://localhost:3000`

**What to watch:**
1. **Visual Changes**: Any UI updates you make appear here
2. **Console (F12 → Console tab)**:
   - Errors in red ❌
   - Warnings in yellow ⚠️
   - API call logs 📡

**Common Console Messages:**
```javascript
// ✅ Good - API working
"Fetched scholar data successfully"

// ❌ Error - API not running
"Failed to fetch scholar data"

// ⚠️ Warning - Missing API key
"YouTube API Key is missing"
```

### **Backend (Express) - Port 3001**
**URL:** `http://localhost:3001`

**What to watch:**
1. **Terminal Output**: Shows API requests and errors
2. **Test Endpoint**: Visit `http://localhost:3001/scholar` to see raw data

**Common Terminal Messages:**
```bash
# ✅ Good - Server running
Server is running at http://localhost:3001

# 📡 API call received
GET /scholar

# ❌ Error - Something failed
Error fetching Scholar data: ...
```

### **How to Check if Everything is Working:**

#### **Step 1: Check Backend**
Open browser → `http://localhost:3001/scholar`

**Expected Result:**
```json
{
  "stats": {
    "citations": { "all": 1234, "since2018": 567 },
    "h_index": { "all": 20, "since2018": 15 },
    "i10_index": { "all": 30, "since2018": 25 }
  },
  "publications": [
    {
      "title": "Some Paper Title",
      "authors": "Author names",
      "journal": "Journal name",
      "year": "2023",
      "citations": "50",
      "link": "https://scholar.google.com/..."
    }
  ]
}
```

If you see this → ✅ **Backend is working!**

#### **Step 2: Check Frontend**
Open browser → `http://localhost:3000`

1. **Open DevTools**: Press `F12`
2. **Go to Console tab**
3. **Look for errors** (red text)
4. **Check Network tab** → Look for `/scholar` request

**Expected:**
- Stats section shows numbers (not 0 or loading forever)
- No red errors in console

---

## 🎓 Google Scholar Integration

### **Current Status:** ✅ Already Integrated!

The Google Scholar ID is already configured in your backend:
```typescript
// api/src/services/scholar.ts
const SCHOLAR_ID = 'PZ-8nBQAAAAJ';
```

### **What's Being Fetched:**
1. **Stats** (Updates automatically):
   - Total Citations
   - h-index
   - i10-index
   - Since 2018 stats

2. **Publications** (Up to 100):
   - Title
   - Authors
   - Journal/Conference
   - Year
   - Citation count
   - Link to paper

### **How Often Does It Update?**
- **Every time** someone visits the page
- **No caching** = Always fresh data
- **Note:** Google Scholar might rate-limit if too many requests

### **Limitations:**
- ⚠️ **Web scraping** (not official API) - Google might block if overused
- ⚠️ **Slower** than official APIs
- ⚠️ **Can break** if Google changes their HTML structure

### **Recommendation:**
For production, consider:
1. **Caching**: Store data for 24 hours, refresh daily
2. **Backup**: Save data in database in case scraping fails
3. **Fallback**: Show last known data if fetch fails

---

## 📺 YouTube Integration

### **Current Status:** ⚠️ Needs API Key

**YouTube API Key Required:** `NEXT_PUBLIC_YOUTUBE_API_KEY`

### **How to Get YouTube API Key:**

1. **Go to:** [Google Cloud Console](https://console.cloud.google.com/)
2. **Create a project** (or use existing)
3. **Enable YouTube Data API v3**
4. **Create credentials** → API Key
5. **Copy the key**

### **How to Add API Key:**

Create file: `.env.local` in project root:
```bash
NEXT_PUBLIC_YOUTUBE_API_KEY=your_api_key_here
```

### **What Channel to Use?**

You need the **channel handle** (e.g., `@ProfessorName`)

**Find it:**
1. Go to professor's YouTube channel
2. Look at URL: `youtube.com/@ChannelHandle`
3. Copy the `@ChannelHandle` part

### **Where to Configure:**

In `src/components/YouTubeSection.tsx`, update the handle:
```typescript
const channelData = await getChannelData('@YourChannelHandle');
```

---

## 🎯 Next Steps - What We Can Build

### **Option 1: Publications Page** 📚 (Recommended)
**What:** Full searchable list of all publications

**Features:**
- ✅ Search by title, author, journal
- ✅ Filter by year, citations
- ✅ Sort by citations, year
- ✅ Link to Google Scholar profile
- ✅ Auto-updates from API

**Time:** ~30 minutes

---

### **Option 2: Enhanced YouTube Section** 📺
**What:** Better video showcase

**Features:**
- ✅ Latest videos carousel
- ✅ Channel stats (subscribers, views)
- ✅ Video categories
- ✅ Playlist integration

**Requires:** YouTube API Key

**Time:** ~20 minutes

---

### **Option 3: API Dashboard** 📊
**What:** Admin page to monitor API health

**Features:**
- ✅ Check if APIs are working
- ✅ View cached data
- ✅ Manual refresh button
- ✅ Error logs

**Time:** ~40 minutes

---

## 🔍 Monitoring Checklist

### **Daily Checks:**
- [ ] Frontend loads at `localhost:3000`
- [ ] Backend responds at `localhost:3001/scholar`
- [ ] Stats section shows numbers (not 0)
- [ ] No red errors in browser console

### **When Making Changes:**
- [ ] Save file
- [ ] Check browser auto-refreshes
- [ ] Check console for errors
- [ ] Check terminal for backend errors

### **Before Deployment:**
- [ ] Test all pages load
- [ ] Test API endpoints work
- [ ] Check mobile responsiveness
- [ ] Verify no console errors

---

## 🆘 Troubleshooting

### **Problem: Stats show 0 or don't load**
**Solution:**
1. Check backend is running (`localhost:3001`)
2. Visit `localhost:3001/scholar` directly
3. Check browser console for errors
4. Check backend terminal for errors

### **Problem: YouTube section not showing**
**Solution:**
1. Check if API key is in `.env.local`
2. Restart frontend after adding `.env.local`
3. Check console for "YouTube API Key is missing"

### **Problem: Changes don't appear**
**Solution:**
1. Hard refresh: `Ctrl + Shift + R` (Windows) or `Cmd + Shift + R` (Mac)
2. Clear browser cache
3. Check if file saved properly
4. Restart dev server

---

## 📞 Quick Reference

| What | URL | Purpose |
|------|-----|---------|
| Frontend | `http://localhost:3000` | Main website |
| Backend | `http://localhost:3001` | API server |
| Scholar API | `http://localhost:3001/scholar` | Get Google Scholar data |
| Google Scholar Profile | `https://scholar.google.com/citations?user=PZ-8nBQAAAAJ` | Professor's profile |

---

**Ready to build the Publications page?** Just let me know! 🚀
