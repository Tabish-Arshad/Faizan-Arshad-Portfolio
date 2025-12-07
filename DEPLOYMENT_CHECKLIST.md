# Deployment Checklist & Quick Reference

## QUICK COMMAND REFERENCE

### Upload to GitHub
```powershell
cd "C:\Users\tabis\OneDrive\Desktop\Website"
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/YOUR_USERNAME/portfolio.git
git branch -M main
git push -u origin main
```

### Update and Push Changes
```powershell
git add .
git commit -m "Your change description"
git push origin main
```

---

## DEPLOYMENT CHECKLIST

### ✅ Phase 1: GitHub Setup
- [ ] Create GitHub account at github.com
- [ ] Create new repository named "portfolio"
- [ ] Install Git from git-scm.com
- [ ] Navigate to project folder in PowerShell
- [ ] Run: `git init`
- [ ] Run: `git add .`
- [ ] Run: `git commit -m "Initial commit"`
- [ ] Run: `git remote add origin https://github.com/USERNAME/portfolio.git`
- [ ] Run: `git branch -M main`
- [ ] Run: `git push -u origin main`
- [ ] Verify files appear on github.com

### ✅ Phase 2: Backend Deployment (Render)
- [ ] Create Render account at render.com
- [ ] Sign up with GitHub
- [ ] Click "New +" → "Web Service"
- [ ] Click "Connect account" for GitHub
- [ ] Select "portfolio" repository
- [ ] Set Name: `portfolio-api`
- [ ] Set Build Command: `npm install`
- [ ] Set Start Command: `node server/index.js`
- [ ] Select Free plan
- [ ] Click "Create Web Service"
- [ ] Wait 3-5 minutes for deployment
- [ ] Copy backend URL (e.g., https://portfolio-api.onrender.com)
- [ ] Test: Open URL/api/posts in browser

### ✅ Phase 3: Frontend Configuration
- [ ] Create `.env.production` file (if doesn't exist)
- [ ] Add: `VITE_API_URL=https://your-render-url.onrender.com`
- [ ] Edit `src/api/posts.ts`
  - [ ] Find: `const API_BASE_URL = 'http://localhost:4000'`
  - [ ] Replace with: `const API_BASE_URL = process.env.VITE_API_URL || 'http://localhost:4000'`
- [ ] Edit `src/api/projects.ts` - same change
- [ ] Push changes to GitHub:
  ```powershell
  git add .
  git commit -m "Update API URLs for production"
  git push origin main
  ```

### ✅ Phase 4: Frontend Deployment (Netlify)
- [ ] Create Netlify account at netlify.com
- [ ] Sign up with GitHub
- [ ] Click "Add new site" → "Import an existing project"
- [ ] Select "GitHub"
- [ ] Select "portfolio" repository
- [ ] Base directory: (leave empty)
- [ ] Build command: `npm run build`
- [ ] Publish directory: `dist`
- [ ] Click "Add" under Environment variables:
  - [ ] Key: `VITE_API_URL`
  - [ ] Value: `https://portfolio-api.onrender.com` (your Render URL)
- [ ] Click "Deploy site"
- [ ] Wait 2-3 minutes
- [ ] Copy Netlify URL (e.g., https://naughty-filename.netlify.app)
- [ ] Test site in browser

### ✅ Phase 5: Testing
- [ ] Open Netlify URL in browser
- [ ] Test public side:
  - [ ] Home page loads
  - [ ] About page works
  - [ ] Projects page loads
  - [ ] Blog page loads
  - [ ] Click blog post and read
- [ ] Test admin panel:
  - [ ] Click "Admin" button
  - [ ] Login
  - [ ] Create test blog post
  - [ ] Refresh public blog page
  - [ ] New post appears
- [ ] Test mobile responsiveness:
  - [ ] Open in mobile view (F12 → toggle device)
  - [ ] Check layout looks good
  - [ ] Check all buttons work

---

## DEPLOYMENT COMPLETED ✅

**Your URLs:**
- Frontend: `https://your-netlify-domain.netlify.app`
- Backend: `https://portfolio-api.onrender.com`
- GitHub: `https://github.com/YOUR_USERNAME/portfolio`

**From now on:**
1. Make changes locally
2. Run: `git add .` → `git commit -m "message"` → `git push origin main`
3. Netlify auto-deploys frontend (wait 2-3 min)
4. Render auto-restarts backend if needed

---

## TROUBLESHOOTING QUICK FIXES

| Problem | Quick Fix |
|---------|-----------|
| Backend 404 | Check `.env.production` has correct URL |
| Blog won't load | Test backend URL directly in browser |
| Build fails on Netlify | Run `npm run build` locally, fix errors |
| Login doesn't work | Check browser console (F12) for CORS errors |
| Images don't show | Check image paths and backend CORS headers |
| Changes don't appear | Make sure you `git push` to GitHub |

---

## GIT COMMON COMMANDS

```powershell
# Check status
git status

# Add all files
git add .

# Add specific file
git add filename.txt

# Commit
git commit -m "Your message"

# Push to GitHub
git push origin main

# Pull latest from GitHub
git pull origin main

# View history
git log

# Undo last commit (keep changes)
git reset --soft HEAD~1

# See what changed
git diff
```

---

## ENVIRONMENT VARIABLES REFERENCE

### .env.production
```
VITE_API_URL=https://portfolio-api.onrender.com
```

### Where to set in Netlify:
1. Site settings
2. Build & deploy
3. Environment
4. Add variable
5. Key: VITE_API_URL
6. Value: your-backend-url

---

## FILE LOCATIONS

| File | Purpose | Location |
|------|---------|----------|
| API - Posts | Post CRUD | `src/api/posts.ts` |
| API - Projects | Project CRUD | `src/api/projects.ts` |
| Backend | Express server | `server/index.js` |
| Data - Posts | Post data | `server/data/posts.json` |
| Data - Projects | Project data | `server/data/projects.json` |
| Config - Netlify | Build settings | `netlify.toml` |
| Config - Env Prod | Production vars | `.env.production` |
| Build Output | Static files | `dist/` |

---

## IMPORTANT NOTES

1. **Free Tiers Are Enough:**
   - Netlify: 300 free builds/month
   - Render: ~750 free hours/month
   - GitHub: unlimited repositories

2. **Backend Data Persistence:**
   - Data stored in `server/data/posts.json`
   - Stored on Render file system
   - Persistent between restarts
   - Backup by pushing to GitHub

3. **Auto-Deployment:**
   - Push to GitHub → Netlify auto-rebuilds
   - Render auto-restarts on code changes
   - Changes live in 2-3 minutes

4. **Custom Domain:**
   - Netlify: Easy via domain settings
   - Render: Can set custom domain
   - Point DNS to their nameservers

---

## NEXT STEPS

After successful deployment:

1. Share your portfolio URL
2. Add custom domain (optional)
3. Set up email backups of data
4. Monitor logs regularly
5. Update content frequently
6. Ask for feedback

**Congratulations! Your portfolio is live! 🎉**
