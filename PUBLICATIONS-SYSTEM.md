# 🔧 Publications System - Hybrid Approach

## ✅ What's Been Implemented

I've created a **hybrid publications system** that combines the best of both worlds:

### **Primary Method: Google Scholar Scraper** (Automatic)
- Tries to fetch live data from Google Scholar
- Updates automatically
- No manual work needed

### **Fallback Method: Static Data** (Manual)
- Uses static data if scraping fails
- You can populate from the 25-page PDF
- Always works, even if network fails

---

## 📁 Files Created/Modified

### **1. New File: `src/data/publications.ts`**
This file contains static publication data as a fallback.

**What to do:**
- Open this file
- Add publications from the professor's PDF
- Follow the example format in the file

**Example:**
```typescript
export const staticPublications: Publication[] = [
    {
        title: "Your Publication Title Here",
        authors: "Author 1, Author 2, Author 3",
        journal: "Journal Name",
        year: "2023",
        citations: "50",
        link: "https://scholar.google.com/..."
    },
    // Add more publications...
];
```

### **2. Modified: `src/app/api/scholar/route.ts`**
Updated to use hybrid approach:
1. Tries to fetch from Google Scholar (10 second timeout)
2. If successful → Returns live data ✅
3. If fails → Returns static data from `publications.ts`

### **3. Modified: `api/src/services/scholar.ts`**
Increased timeout to 30 seconds to handle slow connections.

---

## 🚀 How It Works Now

```
User visits /publications
    ↓
Frontend calls /api/scholar
    ↓
API tries to fetch from backend (Google Scholar scraper)
    ↓
    ├─ Success? → Return live data ✅
    │
    └─ Failed/Timeout? → Return static data from publications.ts
    ↓
Frontend displays the data
```

---

## 🔍 Debugging the Network Issue

The backend is timing out when trying to reach Google Scholar. Here's how to debug:

### **Test 1: Check if backend can reach Google**
```bash
# In WSL
curl -I https://scholar.google.com
```

**Expected:** HTTP/2 200 (You already confirmed this works!)

### **Test 2: Check if Node.js can reach Google**
```bash
cd ~/Dev/webProjects/portfolio-mk/api
node -e "const https = require('https'); https.get('https://scholar.google.com', res => console.log('Status:', res.statusCode));"
```

**Expected:** Status: 200

### **Test 3: Check DNS resolution**
```bash
nslookup scholar.google.com
```

**Expected:** Should return IP addresses

---

## 🐛 Possible Causes of Timeout

1. **WSL2 Network Issue**
   - WSL2 sometimes has DNS/networking problems
   - **Fix:** Restart WSL or update `/etc/resolv.conf`

2. **Firewall/Antivirus**
   - Windows Firewall might be blocking Node.js
   - **Fix:** Allow Node.js through firewall

3. **Proxy Settings**
   - Corporate proxy or VPN
   - **Fix:** Configure proxy in axios

4. **Google Rate Limiting**
   - Google might be blocking automated requests
   - **Fix:** Add delays, use static data

---

## 🔧 Quick Fixes to Try

### **Fix 1: Update DNS Settings**
```bash
# In WSL
sudo rm /etc/resolv.conf
echo "nameserver 8.8.8.8" | sudo tee /etc/resolv.conf
echo "nameserver 8.8.4.4" | sudo tee -a /etc/resolv.conf
```

Then restart backend:
```bash
cd ~/Dev/webProjects/portfolio-mk/api
npm run start
```

### **Fix 2: Rebuild Backend**
```bash
cd ~/Dev/webProjects/portfolio-mk/api
rm -rf node_modules dist
npm install
npm run build
npm run start
```

### **Fix 3: Use Static Data (Immediate Solution)**
Just populate `src/data/publications.ts` with data from the PDF, and the Publications page will work immediately!

---

## 📝 How to Add Static Publications

1. **Open:** `src/data/publications.ts`

2. **Update stats:**
```typescript
export const staticStats: ScholarStats = {
    citations: { all: 1234, since2018: 567 },
    h_index: { all: 20, since2018: 15 },
    i10_index: { all: 30, since2018: 25 }
};
```

3. **Add publications:**
```typescript
export const staticPublications: Publication[] = [
    {
        title: "First Publication Title",
        authors: "Author names here",
        journal: "Journal name",
        year: "2023",
        citations: "50",
        link: "https://scholar.google.com/..."
    },
    {
        title: "Second Publication Title",
        authors: "Author names here",
        journal: "Journal name",
        year: "2022",
        citations: "30"
    },
    // Add all publications from the PDF...
];
```

4. **Save the file**

5. **Refresh:** `http://localhost:3000/publications`

The data will appear immediately!

---

## 🎯 Current Status

### **What's Working:**
- ✅ Publications page loads without errors
- ✅ Hybrid system in place
- ✅ Fallback to static data works
- ✅ Frontend displays data correctly

### **What Needs Fixing:**
- ⚠️ Google Scholar scraper timing out (network issue)
- 📝 Static data needs to be populated from PDF

### **What to Do Next:**

**Option A: Fix the Network Issue** (Best long-term)
1. Try the DNS fix above
2. Test with `curl` and Node.js
3. Restart backend
4. Check if scraper works

**Option B: Use Static Data** (Works immediately)
1. Open `src/data/publications.ts`
2. Copy publication data from the 25-page PDF
3. Paste into the file following the format
4. Save and refresh

**Recommended:** Do **both**! Use static data now so the page works, then fix the network issue for automatic updates later.

---

## 📊 Benefits of This Approach

### **Hybrid System Advantages:**
- ✅ **Always works** - Even if scraper fails
- ✅ **Auto-updates** - When scraper works
- ✅ **No downtime** - Fallback ensures data is always available
- ✅ **Easy to update** - Just edit one file for manual updates
- ✅ **Best of both worlds** - Automatic + Manual control

---

## 🆘 Troubleshooting

### **Problem: Still showing 0 publications**

**Solution:**
1. Make sure backend is running
2. Check browser console (F12) for errors
3. Add some static data to `publications.ts`
4. Refresh the page

### **Problem: Backend keeps timing out**

**Solution:**
1. Try the DNS fix
2. Check if you're behind a proxy/VPN
3. Use static data as temporary solution

### **Problem: Want to force use of static data**

**Solution:**
Just stop the backend server. The API will automatically fall back to static data!

---

## 📞 Quick Reference

| What | Command | Location |
|------|---------|----------|
| Start Backend | `npm run start` | `~/Dev/webProjects/portfolio-mk/api` |
| Start Frontend | `npm run dev` | `~/Dev/webProjects/portfolio-mk` |
| Edit Static Data | Open in editor | `src/data/publications.ts` |
| View Publications | Browser | `http://localhost:3000/publications` |
| Test Backend | Browser | `http://localhost:3001/scholar` |

---

**Next Step:** Either fix the network issue OR populate the static data file. Your choice! 🚀
