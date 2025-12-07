# Copy-Paste Commands for Deployment

**Important:** Replace `YOUR_USERNAME` with your actual GitHub username!

---

## PHASE 1: UPLOAD TO GITHUB

### Step 1: Open PowerShell in Project Folder

```powershell
cd "C:\Users\tabis\OneDrive\Desktop\Website"
```

### Step 2: Initialize Git & Commit

```powershell
git init
git add .
git commit -m "Initial commit: Portfolio with admin panel"
```

### Step 3: Connect to GitHub Repository

**First, replace `YOUR_USERNAME` in this command:**

```powershell
git remote add origin https://github.com/YOUR_USERNAME/portfolio.git
```

**Example:**
```powershell
git remote add origin https://github.com/johndoe/portfolio.git
```

### Step 4: Push to GitHub

```powershell
git branch -M main
git push -u origin main
```

**Result:** Your code is now on GitHub! ✓

---

## PHASE 2: UPDATE FRONTEND & PUSH CHANGES

### Step 1: Create .env.production File

The file should be in: `C:\Users\tabis\OneDrive\Desktop\Website\.env.production`

**Content:**
```
VITE_API_URL=https://portfolio-api.onrender.com
```

### Step 2: Update API Files

Edit `src/api/posts.ts` - Find and replace this line:
```typescript
// OLD:
const API_BASE_URL = 'http://localhost:4000';

// NEW:
const API_BASE_URL = process.env.VITE_API_URL || 'http://localhost:4000';
```

Do the same for `src/api/projects.ts`

### Step 3: Push Changes to GitHub

```powershell
cd "C:\Users\tabis\OneDrive\Desktop\Website"
git add .
git commit -m "Update API URLs for production deployment"
git push origin main
```

**Result:** Changes pushed to GitHub! ✓

---

## PHASE 3: FUTURE UPDATES (Workflow)

Whenever you make changes and want to deploy:

```powershell
cd "C:\Users\tabis\OneDrive\Desktop\Website"

# See what changed
git status

# Add all changes
git add .

# Commit with description
git commit -m "Your change description here"

# Push to GitHub (automatically deploys!)
git push origin main
```

**That's it!** Netlify will automatically rebuild in 2-3 minutes.

---

## USEFUL GIT COMMANDS

### Check Current Status
```powershell
git status
```

### See Previous Commits
```powershell
git log
```

### Add Specific File Only
```powershell
git add "filename.txt"
```

### See What Changed
```powershell
git diff
```

### Undo Last Commit (Keep Changes)
```powershell
git reset --soft HEAD~1
```

### Pull Latest Changes (If working with team)
```powershell
git pull origin main
```

---

## TESTING LOCALLY BEFORE PUSHING

### Run Frontend
```powershell
cd "C:\Users\tabis\OneDrive\Desktop\Website"
npm run dev
```

Then open: http://localhost:5173

### Run Backend (In Different PowerShell Window)
```powershell
cd "C:\Users\tabis\OneDrive\Desktop\Website"
npm run start:server
```

Then test API: http://localhost:4000/api/posts

### Build for Production (Test Build)
```powershell
npm run build
```

If it builds without errors, your code is ready to push!

---

## COMMON DEPLOYMENT SCENARIOS

### Scenario 1: Made Changes, Want to Deploy

```powershell
cd "C:\Users\tabis\OneDrive\Desktop\Website"
npm run build  # Test locally first
git add .
git commit -m "Your change description"
git push origin main
# Wait 2-3 minutes for Netlify to rebuild
```

### Scenario 2: Added New Blog Post in Admin

No PowerShell commands needed! The data is stored on Render's backend automatically.

### Scenario 3: Added New Feature (New File)

```powershell
cd "C:\Users\tabis\OneDrive\Desktop\Website"
git add .
git commit -m "Add new feature: description of what you added"
git push origin main
```

### Scenario 4: Deleted a File Accidentally

```powershell
# Undo everything back to last commit
git reset --hard HEAD
```

### Scenario 5: Want to See History

```powershell
git log
git log --oneline  # Shorter format
```

---

## IF YOU GET ERRORS

### Error: "fatal: not a git repository"
**Solution:** You're not in the right folder. Run:
```powershell
cd "C:\Users\tabis\OneDrive\Desktop\Website"
git init
```

### Error: "Permission denied"
**Solution:** GitHub authentication issue. Try:
```powershell
git config --global user.name "Your Name"
git config --global user.email "your-email@github.com"
```

### Error: "Please tell me who you are"
**Solution:** Same as above, set your Git config.

### Error: "fatal: origin already exists"
**Solution:** You already have remote set. Skip that step, just do:
```powershell
git push -u origin main
```

### Error: "Updates were rejected"
**Solution:** Someone else pushed changes. Pull first:
```powershell
git pull origin main
git push origin main
```

---

## AUTHENTICATION SETUP (One Time Only)

If you haven't set up GitHub authentication:

```powershell
# Set your name
git config --global user.name "Your Name"

# Set your email
git config --global user.email "your-email@github.com"
```

First time you push, it will ask for credentials:
- Username: Your GitHub username
- Password: Your GitHub personal access token (not password!)

### Get Personal Access Token:
1. Go to: https://github.com/settings/tokens
2. Click "Generate new token"
3. Select: repo, read:user, user:email
4. Click "Generate token"
5. Copy the token
6. Paste when Git asks for password

---

## VERIFY EVERYTHING WORKS

### Check GitHub
```powershell
# Navigate to your repo on GitHub
https://github.com/YOUR_USERNAME/portfolio
# Should see all your files
```

### Check Netlify
```
https://your-netlify-domain.netlify.app
# Should see your portfolio site
```

### Check Render Backend
```
https://portfolio-api.onrender.com/api/posts
# Should show JSON data
```

### Check API Connection
1. Go to your Netlify URL
2. Go to Admin panel
3. Try creating a blog post
4. Go to public blog
5. New post should appear

---

## DAILY WORKFLOW

After deployment is set up:

```powershell
# 1. Make your changes in VS Code
# 2. When ready to deploy:

cd "C:\Users\tabis\OneDrive\Desktop\Website"
git status  # See what changed
git add .   # Add all changes
git commit -m "Description of changes"
git push origin main

# 3. Wait 2-3 minutes
# 4. Check your deployed site
# 5. Done!
```

---

## BACKUP YOUR DATA

Your data is stored in:
- `server/data/posts.json` - All blog posts
- `server/data/projects.json` - All projects

When you push to GitHub, these files are backed up.

To restore from backup:
```powershell
git log  # See all commits
git checkout <commit-id> -- server/data/posts.json
```

---

## HELPFUL ALIASES (Optional)

Make Git faster with aliases. Add this to PowerShell profile:

```powershell
Set-Alias -Name gs -Value "git status"
Set-Alias -Name ga -Value "git add"
Set-Alias -Name gc -Value "git commit"
Set-Alias -Name gp -Value "git push"
```

Then you can just use:
```powershell
gs      # Instead of git status
ga .    # Instead of git add .
gc -m "message"  # Instead of git commit -m "message"
gp      # Instead of git push origin main
```

---

## QUICK REFERENCE TABLE

| Task | Command |
|------|---------|
| See changes | `git status` |
| Add changes | `git add .` |
| Commit | `git commit -m "message"` |
| Push to GitHub | `git push origin main` |
| See history | `git log` |
| Pull changes | `git pull origin main` |
| Undo last commit | `git reset --soft HEAD~1` |
| View diff | `git diff` |

---

## YOU'VE GOT THIS! 💪

All these commands will make deployment automatic. After first setup:
- Push to GitHub → Netlify rebuilds → Site updates
- Add blog post in admin → Render saves → Everyone sees it
- Make code changes → Push → Live in 3 minutes

**Happy deploying!**
