# 📺 YouTube API Setup Guide

## Step-by-Step Instructions

### **Step 1: Get YouTube API Key**

1. **Go to Google Cloud Console:**
   - Visit: https://console.cloud.google.com/

2. **Create a New Project (or use existing):**
   - Click the project dropdown at the top
   - Click "New Project"
   - Name it: `Professor Website`
   - Click "Create"

3. **Enable YouTube Data API v3:**
   - In the search bar, type: `YouTube Data API v3`
   - Click on it
   - Click the blue "Enable" button

4. **Create API Credentials:**
   - Click "Credentials" in the left sidebar
   - Click "+ CREATE CREDENTIALS" at the top
   - Select "API Key"
   - Copy the API key that appears
   - Click "Restrict Key" (recommended for security)

5. **Restrict the API Key (Optional but Recommended):**
   - Under "API restrictions":
     - Select "Restrict key"
     - Check only "YouTube Data API v3"
   - Under "Website restrictions":
     - Add your domains (e.g., `localhost:3000`, your production URL)
   - Click "Save"

---

### **Step 2: Add API Key to Your Project**

1. **Create `.env.local` file** in your project root:
   ```
   \\wsl.localhost\Ubuntu\home\drogon\Dev\webProjects\portfolio-mk\.env.local
   ```

2. **Add this line** (replace with your actual key):
   ```
   NEXT_PUBLIC_YOUTUBE_API_KEY=AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
   ```

3. **Save the file**

---

### **Step 3: Find the YouTube Channel Handle**

1. **Go to the professor's YouTube channel**

2. **Look at the URL**, it will be one of these formats:
   - `youtube.com/@ChannelHandle` ← This is what we need!
   - `youtube.com/c/ChannelName`
   - `youtube.com/channel/UCxxxxxxxxx`

3. **Copy the handle** (the part after `@`)

**Example:**
- If URL is: `youtube.com/@ChemistryWithDrSmith`
- Handle is: `@ChemistryWithDrSmith`

---

### **Step 4: Update the Code**

The code is already set up! Just need to uncomment the YouTube section.

**File:** `src/app/page.tsx`

Find this section (around line 400-450) and **uncomment it**:

```tsx
{/* YouTube Section - Uncomment when API key is ready */}
{/* <YouTubeSection /> */}
```

Change to:
```tsx
{/* YouTube Section */}
<YouTubeSection />
```

---

### **Step 5: Configure the Channel Handle**

**File:** `src/components/YouTubeSection.tsx`

Find this line (around line 20):
```typescript
const channelData = await getChannelData('@ChemistryChannel');
```

Replace `@ChemistryChannel` with the actual channel handle:
```typescript
const channelData = await getChannelData('@ActualChannelHandle');
```

---

### **Step 6: Restart the Frontend**

**IMPORTANT:** After creating `.env.local`, you MUST restart the frontend!

1. **Stop the frontend** (Ctrl+C in the terminal running `npm run dev`)
2. **Start it again:**
   ```bash
   cd ~/Dev/webProjects/portfolio-mk
   npm run dev
   ```

---

### **Step 7: Test It**

1. **Open:** `http://localhost:3000`
2. **Scroll down** to the YouTube section
3. **Check the browser console** (F12 → Console) for any errors

**Expected Result:**
- Channel stats (subscribers, views, video count)
- Latest videos displayed in a carousel
- No errors in console

---

## 🔍 Troubleshooting

### **Problem: "YouTube API Key is missing"**

**Solution:**
1. Check if `.env.local` exists in project root
2. Check if the key starts with `NEXT_PUBLIC_`
3. Restart the frontend server

---

### **Problem: "Failed to fetch channel data"**

**Possible causes:**
1. **Wrong API key** → Double-check the key
2. **API not enabled** → Make sure YouTube Data API v3 is enabled
3. **Wrong channel handle** → Verify the handle is correct
4. **API quota exceeded** → YouTube API has daily limits (10,000 units/day)

---

### **Problem: "Channel not found"**

**Solution:**
1. Try different handle formats:
   - `@ChannelHandle`
   - `ChannelName` (without @)
2. Check if the channel is public
3. Verify the handle in the YouTube URL

---

## 📊 API Quota Information

**YouTube Data API v3 Quota:**
- **Daily limit:** 10,000 units
- **Cost per request:**
  - Channel stats: ~3 units
  - Video list: ~3 units
- **Total per page load:** ~6 units
- **Estimated page loads per day:** ~1,600

**Note:** This is more than enough for a personal website!

---

## 🎯 What the YouTube Section Will Show

Once set up, the YouTube section will display:

1. **Channel Stats:**
   - Total subscribers
   - Total views
   - Number of videos

2. **Latest Videos:**
   - Video thumbnails
   - Titles
   - Upload dates
   - Clickable links to watch

3. **Channel Link:**
   - Button to visit the full YouTube channel

---

## 🔒 Security Best Practices

1. **Never commit `.env.local` to Git**
   - It's already in `.gitignore`
   - Don't share your API key publicly

2. **Restrict the API key**
   - Limit to YouTube Data API v3 only
   - Add website restrictions

3. **Monitor usage**
   - Check Google Cloud Console for quota usage
   - Set up alerts if needed

---

## 📝 Quick Checklist

- [ ] Created Google Cloud project
- [ ] Enabled YouTube Data API v3
- [ ] Created and copied API key
- [ ] Created `.env.local` file
- [ ] Added API key to `.env.local`
- [ ] Found YouTube channel handle
- [ ] Updated channel handle in code
- [ ] Uncommented YouTube section
- [ ] Restarted frontend server
- [ ] Tested on localhost:3000

---

## 🆘 Need Help?

If you get stuck, share:
1. The error message from browser console
2. The error from terminal (if any)
3. Screenshot of the issue

I'll help you debug! 🚀
