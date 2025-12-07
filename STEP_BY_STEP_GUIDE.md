# Step-by-Step Visual Deployment Guide

## STEP 1: CREATE GITHUB REPOSITORY

### 1.1 Go to GitHub.com and Click "+"
```
Top right corner of GitHub → "+" icon → "New repository"
```

### 1.2 Fill Repository Form
```
Repository name: portfolio
Description: ERP Developer Portfolio with Admin Panel
Public: ✓ (checked)
Initialize with README: ☐ (unchecked)

Click: "Create repository"
```

### 1.3 You'll See This Page
```
…or create a new repository on the command line

git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/portfolio.git
git push -u origin main
```

---

## STEP 2: UPLOAD PROJECT TO GITHUB

### 2.1 Open PowerShell

1. Right-click on your Desktop
2. Select "Open PowerShell here" OR
3. Open PowerShell and type: `cd "C:\Users\tabis\OneDrive\Desktop\Website"`

### 2.2 Run These Commands (Copy & Paste)

```powershell
# Initialize git
git init

# Add all files
git add .

# Create first commit
git commit -m "Initial commit"

# Add your repository (REPLACE YOUR_USERNAME)
git remote add origin https://github.com/YOUR_USERNAME/portfolio.git

# Change branch name to main
git branch -M main

# Push code to GitHub
git push -u origin main
```

### 2.3 Wait for Upload

You should see:
```
Enumerating objects: 500+, done.
Counting objects: 100%
...
Branch 'main' set up to track remote branch 'main'
```

### 2.4 Verify on GitHub

1. Go to: https://github.com/YOUR_USERNAME/portfolio
2. You should see all your project files
3. Copy the repository URL from the green "Code" button

---

## STEP 3: DEPLOY BACKEND TO RENDER

### 3.1 Go to Render.com

1. Visit: https://render.com
2. Click "Get started"
3. Click "Sign up with GitHub"
4. Authorize Render
5. Complete profile setup

### 3.2 Create Web Service

1. In Render dashboard, click "New +" (top right)
2. Click "Web Service"
3. Click "Connect account" under GitHub
4. Select your "portfolio" repository
5. Click "Connect"

### 3.3 Configure Service

Fill in these fields:

| Field | Value |
|-------|-------|
| Name | `portfolio-api` |
| Region | Your closest region |
| Build Command | `npm install` |
| Start Command | `node server/index.js` |
| Plan | **Free** (right column) |

### 3.4 Create Service

1. Scroll down
2. Click "Create Web Service"
3. **Wait 3-5 minutes** for it to deploy
4. You'll see "Your service is live" when done

### 3.5 Copy Backend URL

At the top of the page, you'll see your URL:
```
https://portfolio-api.onrender.com
```

**Copy this URL!** You need it next.

### 3.6 Test Backend

1. Open a new browser tab
2. Go to: `https://portfolio-api.onrender.com/api/posts`
3. You should see: `[]` or your posts data
4. This means backend is working ✓

---

## STEP 4: UPDATE FRONTEND FOR PRODUCTION

### 4.1 Create `.env.production` File

In your project folder, create a new file:
- Right-click → New → Text Document
- Name it: `.env.production` (with the dot!)
- Open with Notepad

Add this content:
```
VITE_API_URL=https://portfolio-api.onrender.com
```

**Replace with your actual backend URL from Step 3.5**

### 4.2 Update API Files

Open: `src/api/posts.ts`

Find this line:
```typescript
const API_BASE_URL = 'http://localhost:4000';
```

Replace with:
```typescript
const API_BASE_URL = process.env.VITE_API_URL || 'http://localhost:4000';
```

**Do the same for:** `src/api/projects.ts`

### 4.3 Push Changes to GitHub

```powershell
cd "C:\Users\tabis\OneDrive\Desktop\Website"

git add .
git commit -m "Update API URLs for production"
git push origin main
```

Wait for it to complete.

---

## STEP 5: DEPLOY FRONTEND TO NETLIFY

### 5.1 Go to Netlify.com

1. Visit: https://netlify.com
2. Click "Sign up"
3. Click "Sign up with GitHub"
4. Authorize Netlify
5. Complete profile

### 5.2 Add New Site

1. In Netlify dashboard, click "Add new site"
2. Click "Import an existing project"
3. Click "GitHub"
4. Select your "portfolio" repository
5. Click to authorize (if prompted)

### 5.3 Configure Build Settings

You'll see this form:

| Setting | Value |
|---------|-------|
| Base directory | (leave empty) |
| Build command | `npm run build` |
| Publish directory | `dist` |

### 5.4 Add Environment Variable

Under "Environment variables":

1. Click "Add"
2. Key: `VITE_API_URL`
3. Value: `https://portfolio-api.onrender.com` (your Render URL)
4. Click "Add"

### 5.5 Deploy

1. Click "Deploy site"
2. **Wait 2-3 minutes** for build to complete
3. You'll see a green checkmark when done

### 5.6 Get Your Frontend URL

At the top, you'll see:
```
https://naughty-filename-abc123.netlify.app
```

**This is your portfolio URL!** Share this with people.

---

## STEP 6: TEST YOUR DEPLOYED SITE

### 6.1 Test Public Website

1. Click your Netlify URL
2. Check:
   - [ ] Home page loads
   - [ ] Images appear
   - [ ] Click "Blog" - posts show
   - [ ] Click "Projects" - projects show
   - [ ] Mobile view works (resize browser)

### 6.2 Test Admin Panel

1. Click "Admin" button (top right)
2. Login (use your admin credentials)
3. Click "Dashboard" - should show real data
4. Go to "Blog Posts"
5. Click "New Post"
6. Fill in:
   - Title: "Test Post"
   - Content: "This is a test"
   - Category: (choose one)
   - Click "Create Post"
7. Go back to public site
8. Check blog page
9. **New post should appear!** ✓

### 6.3 Check Mobile

1. Open your Netlify URL
2. Press F12 (Developer Tools)
3. Click phone icon (toggle device)
4. Check layout looks good
5. Test buttons work

---

## STEP 7: OPTIONAL - ADD CUSTOM DOMAIN

### 7.1 Buy a Domain

1. Go to: namecheap.com, godaddy.com, or domain.com
2. Search for domain (e.g., myportfolio.com)
3. Buy it

### 7.2 Add to Netlify

1. In Netlify, click "Site settings"
2. Go to "Domain settings"
3. Click "Add custom domain"
4. Enter your domain (e.g., myportfolio.com)
5. Follow DNS setup instructions

### 7.3 Update in Render (Optional)

If you want custom domain for backend:
1. In Render dashboard
2. Click your service
3. Settings → Domains
4. Add your subdomain (e.g., api.myportfolio.com)

---

## AFTER DEPLOYMENT - YOUR WORKFLOW

Now that everything is deployed:

### Making Changes

1. Edit files locally
2. Test with `npm run dev` and `npm run start:server`
3. Push to GitHub:
   ```powershell
   git add .
   git commit -m "Your change description"
   git push origin main
   ```
4. Netlify automatically rebuilds (wait 2-3 min)
5. Check your site - changes live!

### Adding Blog Posts

1. Go to your Netlify URL
2. Click "Admin"
3. Click "Blog Posts"
4. Click "New Post"
5. Fill form and submit
6. Post appears on public site immediately

### Backup Your Data

1. Go to your GitHub repository
2. Make sure all changes are pushed
3. Your code is backed up in GitHub
4. Data is stored on Render's servers

---

## TROUBLESHOOTING GUIDE

### Issue: "Cannot connect to API"

**Solution:**
1. Check `.env.production` file
2. Make sure URL is correct
3. Test backend URL in browser: `https://portfolio-api.onrender.com/api/posts`
4. If it works, problem is in frontend setup

### Issue: "Build failed on Netlify"

**Solution:**
1. Go to Netlify dashboard
2. Click "Deploys"
3. Click failed deploy
4. Read the error message
5. Usually it's a typo in `.env.production` or API URLs
6. Fix it and `git push` again

### Issue: "Posts aren't showing"

**Solution:**
1. Open browser DevTools (F12)
2. Click "Network" tab
3. Refresh page
4. Look for requests to API
5. Click failed request to see error
6. Usually CORS or wrong URL

### Issue: "Admin login doesn't work"

**Solution:**
1. Check browser console (F12 → Console tab)
2. Look for red error messages
3. Try clearing browser cache (Ctrl+Shift+Delete)
4. Try incognito/private window
5. Check that credentials are correct

### Issue: "Changes don't show on deployed site"

**Solution:**
1. Did you push to GitHub? `git push origin main`
2. Check Netlify dashboard for new deployment
3. Wait 2-3 minutes for build
4. Hard refresh browser (Ctrl+Shift+R)

---

## SUCCESS CHECKLIST

When everything works, you'll have:

- ✅ GitHub repository with all code
- ✅ Backend running on Render
- ✅ Frontend running on Netlify
- ✅ Public website visible to everyone
- ✅ Admin panel working
- ✅ Create blog posts that appear publicly
- ✅ All changes auto-deploy

**Congratulations! Your portfolio is live!** 🎉

---

## IMPORTANT LINKS

Save these URLs:

| Service | URL |
|---------|-----|
| Your Portfolio | `https://your-netlify-domain.netlify.app` |
| Your Backend | `https://portfolio-api.onrender.com` |
| GitHub Code | `https://github.com/your-username/portfolio` |
| Netlify Dashboard | https://app.netlify.com |
| Render Dashboard | https://dashboard.render.com |

---

## SUPPORT RESOURCES

- **Git Help:** https://git-scm.com/book
- **GitHub Help:** https://docs.github.com
- **Netlify Support:** https://docs.netlify.com
- **Render Support:** https://render.com/docs
- **React Docs:** https://react.dev

**Good luck! You've got this! 💪**
