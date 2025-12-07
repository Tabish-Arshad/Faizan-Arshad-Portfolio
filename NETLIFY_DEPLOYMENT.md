# Complete Deployment Guide: GitHub → Render → Netlify

This guide walks you through uploading your project to GitHub and deploying both frontend and backend.

## ⚠️ Important: Separate Frontend & Backend

Your project has two parts that need separate deployments:
- **Frontend**: React/Vite app (deploys to Netlify)
- **Backend**: Express.js API server (deploys to Render, Railway, or Heroku)

---

# PART 1: UPLOAD PROJECT TO GITHUB

## Step 1.1: Create GitHub Repository

1. Go to [github.com](https://github.com) and log in (or sign up if needed)
2. Click the **"+"** icon in top right corner
3. Click **"New repository"**
4. Fill in the form:
   - **Repository name**: `portfolio` (or any name you like)
   - **Description**: "ERP Developer Portfolio with Admin Panel"
   - **Visibility**: Choose **Public** (free) or **Private** (if you have GitHub Pro)
   - Leave "Initialize this repository with" unchecked
5. Click **"Create repository"**
6. You'll see a page with instructions - we'll follow them next

## Step 1.2: Install Git on Your Computer

If you don't have Git installed:

1. Download from [git-scm.com](https://git-scm.com/download/win)
2. Install with default settings
3. Open PowerShell and verify: `git --version`

## Step 1.3: Connect Local Project to GitHub

Open PowerShell in your project folder:

```powershell
# Navigate to your project
cd "C:\Users\tabis\OneDrive\Desktop\Website"

# Initialize git repository
git init

# Add all files
git add .

# Create first commit
git commit -m "Initial commit: Portfolio with admin panel"

# Add remote (replace YOUR_GITHUB_USERNAME and YOUR_REPO_NAME)
git remote add origin https://github.com/YOUR_GITHUB_USERNAME/YOUR_REPO_NAME.git

# Push to GitHub (this uploads your code)
git branch -M main
git push -u origin main
```

**What to replace:**
- `YOUR_GITHUB_USERNAME`: Your GitHub username (e.g., `johndoe`)
- `YOUR_REPO_NAME`: Your repository name (e.g., `portfolio`)

**Example:**
```powershell
git remote add origin https://github.com/johndoe/portfolio.git
git push -u origin main
```

## Step 1.4: Verify on GitHub

1. Go to [github.com](https://github.com) and navigate to your repository
2. You should see all your project files uploaded
3. Copy the repository URL (e.g., `https://github.com/johndoe/portfolio.git`)

---

# PART 2: DEPLOY BACKEND TO RENDER

## Step 2.1: Create Render Account

1. Go to [render.com](https://render.com)
2. Click **"Get started"**
3. Click **"Sign up with GitHub"** (easiest option)
4. Authorize Render to access your GitHub account
5. Complete your profile

## Step 2.2: Connect GitHub to Render

1. In Render dashboard, click **"New +"** in top right
2. Select **"Web Service"**
3. Click **"Connect account"** under GitHub
4. Authorize Render (if prompted)
5. Select your repository:
   - Search for your portfolio repository
   - Click **"Connect"** next to it

## Step 2.3: Configure Backend Service

After connecting, you'll see a form:

**1. Name:**
- Enter: `portfolio-api` (or any name)

**2. Environment:**
- Select: **Node**

**3. Build Command:**
```
npm install
```

**4. Start Command:**
```
node server/index.js
```

**5. Region:**
- Select the region closest to you

**6. Plan:**
- Select: **Free** (right side)

**7. Environment Variables:**
- Click **"Add Environment Variable"**
- For now, skip this (you can add later if needed)

**8. Create Web Service:**
- Click the **"Create Web Service"** button
- Wait 3-5 minutes for deployment

## Step 2.4: Get Your Backend URL

1. Wait for deployment to complete (you'll see "Your service is live")
2. At the top, you'll see your URL like:
   ```
   https://portfolio-api.onrender.com
   ```
3. **Copy this URL** - you'll need it for the frontend

4. Test your backend API:
   - Open browser and go to: `https://portfolio-api.onrender.com/api/posts`
   - You should see `[]` (empty array) or your posts data

---

# PART 3: PREPARE FRONTEND FOR NETLIFY

## Step 3.1: Update API URLs in Frontend

You need to tell your frontend where the backend is.

**Option A: Using Environment Variables (Recommended)**

1. In your project, check if `.env.production` exists
   - If it doesn't, create a new file called `.env.production`

2. Add this to `.env.production`:
   ```
   VITE_API_URL=https://portfolio-api.onrender.com
   ```
   Replace with your actual backend URL from Step 2.4

3. Update `src/api/posts.ts`:
   - Find the line: `const API_BASE_URL = 'http://localhost:4000'`
   - Replace with:
   ```typescript
   const API_BASE_URL = process.env.VITE_API_URL || 'http://localhost:4000';
   ```

4. Do the same for `src/api/projects.ts`

**Option B: Direct URL (Quick fix)**

Simply replace `http://localhost:4000` with your backend URL:
```typescript
const API_BASE_URL = 'https://portfolio-api.onrender.com';
```

## Step 3.2: Push Changes to GitHub

```powershell
cd "C:\Users\tabis\OneDrive\Desktop\Website"

# Check what changed
git status

# Add all changes
git add .

# Commit with message
git commit -m "Update API URLs for production"

# Push to GitHub
git push origin main
```

---

# PART 4: DEPLOY FRONTEND TO NETLIFY

## Step 4.1: Create Netlify Account

1. Go to [netlify.com](https://netlify.com)
2. Click **"Sign up"**
3. Choose **"Sign up with GitHub"** (easiest)
4. Authorize Netlify to access your GitHub
5. Complete your profile

## Step 4.2: Connect GitHub Repository to Netlify

1. In Netlify dashboard, click **"Add new site"**
2. Select **"Import an existing project"**
3. Click **"GitHub"** under "Connect to Git provider"
4. Select your repository from the list
5. You'll see: "Authorize Netlify"
   - Click **"Authorize Netlify by Netlify"**

## Step 4.3: Configure Build Settings

After selecting your repository, you'll see a form:

**1. Base directory:**
- Leave empty (or `/`)

**2. Build command:**
```
npm run build
```

**3. Publish directory:**
```
dist
```

**4. Environment variables:**
- Click **"Add"** (under Environment variables)
- Key: `VITE_API_URL`
- Value: `https://portfolio-api.onrender.com` (your backend URL)
- Click **"Add"**

**5. Deploy:**
- Click **"Deploy site"**
- Wait for deployment (usually 2-3 minutes)

## Step 4.4: Get Your Netlify URL

1. Wait for the deployment to complete
2. You'll see a green checkmark when done
3. Your site URL appears at the top, like:
   ```
   https://naughty-filename-abc123.netlify.app
   ```

4. **Test your site:**
   - Click the URL to open your portfolio
   - Test the public side (blog, projects)
   - Try admin login
   - Create a test blog post to verify API connection

## Step 4.5: Custom Domain (Optional)

1. In Netlify, click **"Site settings"**
2. Go to **"Domain management"**
3. Click **"Add custom domain"**
4. Enter your domain (e.g., `myportfolio.com`)
5. Follow DNS setup instructions

---

## Step 2.1: Prepare Backend for Deployment (Express Server)

---

# ALTERNATIVE: DEPLOY BACKEND TO RAILWAY

## Step A.1: Create Railway Account

1. Go to [railway.app](https://railway.app)
2. Click **"Start Project"**
3. Click **"Deploy from GitHub repo"**
4. Click **"Connect GitHub Account"**
5. Authorize Railway

## Step A.2: Select Repository

1. Search for your portfolio repository
2. Click to select it
3. Railway will detect it's a Node.js project

## Step A.3: Configure Service

1. In Railway dashboard, click your project
2. Click **"Generate Domain"**
3. You'll get a URL like: `https://portfolio-api-production.railway.app`
4. Copy this URL - use it as your backend URL in frontend

## Step A.4: Verify Deployment

1. Click the domain link to open your backend
2. Go to: `https://your-railway-domain.railway.app/api/posts`
3. Should see posts data

---

# ALTERNATIVE: DEPLOY BACKEND TO HEROKU

Note: Heroku free tier was discontinued. Paid plans start at $5/month.

## Step H.1: Create Heroku Account

1. Go to [heroku.com](https://heroku.com)
2. Sign up and verify email

## Step H.2: Install Heroku CLI

1. Download from [heroku.com/devcenter](https://devcenter.heroku.com/articles/heroku-cli)
2. Install and restart your terminal

## Step H.3: Deploy

Open PowerShell in your project:

```powershell
# Login to Heroku
heroku login

# Create app
heroku create portfolio-api

# Push code
git push heroku main

# View logs
heroku logs --tail
```

Your backend URL will be: `https://portfolio-api.herokuapp.com`

---

# PART 5: VERIFY EVERYTHING WORKS

## Step 5.1: Test Backend API

In your browser, visit:
```
https://your-backend-url.com/api/posts
https://your-backend-url.com/api/projects
```

You should see JSON data (or `[]` if empty).

## Step 5.2: Test Frontend

1. Open your Netlify URL
2. **Public side:**
   - Check Home, About, Projects, Blog pages load
   - Verify images load
   - Click blog post and read content

3. **Admin panel:**
   - Click "Admin" button
   - Login (default credentials in your code)
   - Create a test blog post
   - Check if it appears on public blog page

## Step 5.3: Check Logs

**Netlify logs:**
1. Go to Netlify dashboard
2. Click your site
3. Click **"Deploys"** tab
4. Click latest deploy to see logs

**Render/Railway logs:**
1. Go to dashboard
2. Click your service
3. View logs in the "Logs" tab

---

# TROUBLESHOOTING

## Problem: Blog/Projects Don't Load

**Solution:**
1. Check your backend URL in `.env.production`
2. Test backend API directly in browser
3. Check Netlify logs for errors

## Problem: Admin Login Fails

**Solution:**
1. Check browser console (F12)
2. Look for CORS errors
3. Verify backend is running

## Problem: Images Don't Show

**Solution:**
1. Check image URLs are correct
2. Verify image paths work on backend
3. Check CORS headers allow image access

## Problem: Build Fails on Netlify

**Solution:**
1. Run `npm run build` locally first
2. Fix any errors shown
3. Push to GitHub
4. Redeploy on Netlify

## Problem: "Cannot POST /api/posts"

**Solution:**
1. Backend API URL is wrong
2. Backend is not running/deployed
3. Check backend logs

---

# WORKFLOW AFTER DEPLOYMENT

After everything is set up, here's your workflow:

1. **Make changes locally:**
   ```powershell
   # Make edits to your files
   # Test with: npm run dev (frontend) and npm run start:server (backend)
   ```

2. **Push to GitHub:**
   ```powershell
   git add .
   git commit -m "Your message"
   git push origin main
   ```

3. **Auto-deploy:**
   - Netlify automatically rebuilds frontend
   - Render automatically restarts backend
   - Changes live in 2-3 minutes!

---

# QUICK REFERENCE URLS

After following all steps:

| Component | URL | Notes |
|-----------|-----|-------|
| **Frontend** | `https://your-site.netlify.app` | Your portfolio site |
| **Backend** | `https://portfolio-api.onrender.com` | Your API server |
| **GitHub** | `https://github.com/username/portfolio` | Source code |
| **Netlify Dashboard** | `netlify.com` | Manage frontend |
| **Render Dashboard** | `render.com` | Manage backend |

---

# COST BREAKDOWN

| Service | Free Tier | Paid Tier |
|---------|-----------|-----------|
| **GitHub** | ✅ Unlimited | $4-21/month |
| **Netlify** | ✅ 300 builds/month | $19+/month |
| **Render** | ✅ 750 hours/month | $7+/month |
| **Railway** | ✅ $5 monthly credit | Pay-as-you-go |
| **Heroku** | ❌ Discontinued | $5-50+/month |

**Total Cost: FREE** (if using Netlify + Render + GitHub free tiers)

---

# NEXT STEPS

1. ✅ Push to GitHub (Part 1)
2. ✅ Deploy backend to Render (Part 2)
3. ✅ Update frontend API URLs (Part 3)
4. ✅ Deploy frontend to Netlify (Part 4)
5. ✅ Test everything (Part 5)
6. ✅ Add custom domain (optional)
7. ✅ Share your portfolio!

---

# HELPFUL LINKS

- Git Guide: https://git-scm.com/book/en/v2/Getting-Started-About-Version-Control
- GitHub Docs: https://docs.github.com
- Netlify Docs: https://docs.netlify.com
- Render Docs: https://render.com/docs
- Railway Docs: https://docs.railway.app
- Node.js Docs: https://nodejs.org/docs

---

# NEED HELP?

**Common Issues:**
- "fatal: not a git repository" → Run `git init` first
- "Permission denied" → Check GitHub SSH keys
- "API calls fail" → Wrong backend URL in `.env.production`
- "Build fails" → Check `npm run build` works locally

Check the logs in your service dashboard for detailed error messages!
