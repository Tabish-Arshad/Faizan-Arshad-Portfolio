# Blog Admin & Public API Setup

## Quick Start

To use the admin blog editor and have posts display on the public site, you need to run **both** the backend API server and the frontend dev server.

### Step 1: Install Dependencies

```powershell
cd "c:\Users\tabis\OneDrive\Desktop\Website"
npm install
```

### Step 2: Start API Server (Terminal 1)

```powershell
cd "c:\Users\tabis\OneDrive\Desktop\Website"
npm run start:server
```

You should see:
```
API server listening on http://localhost:4000
```

### Step 3: Start Frontend Dev Server (Terminal 2)

In a **new terminal**:

```powershell
cd "c:\Users\tabis\OneDrive\Desktop\Website"
npm run dev
```

The frontend will be available at `http://localhost:5173` (or similar).

## How It Works

- **Admin Side**: When you create or edit a blog post in the admin panel, it saves to the API server at `http://localhost:4000`
- **Public Side**: Blog posts are fetched from the same API server and displayed on the public blog pages
- **Data Storage**: Posts are stored in `server/data/posts.json` (simple file-based storage)

## Features

✅ Create/Edit/Delete blog posts from admin panel  
✅ Posts instantly appear on public blog  
✅ Search and filter posts by status (Published/Draft)  
✅ Code syntax highlighting in posts  
✅ Category filtering  

## Troubleshooting

**"Failed to load posts" error?**
- Make sure the API server is running (`npm run start:server`)
- Check that port 4000 is not blocked

**Posts not saving?**
- Check console for errors
- Verify the server is running and responding to requests
- Make sure `server/data/` directory exists

## Next Steps (Optional)

For production, consider:
- Using a real database instead of JSON file
- Adding authentication to the API
- Deploying to a hosting service
