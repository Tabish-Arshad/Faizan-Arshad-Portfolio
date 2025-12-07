# Project System Sync Guide

This document explains how the project system works with API synchronization between admin and public sides, mirroring the blog system architecture.

## System Overview

The project system follows the exact same architecture as the blog system:
- **Admin Panel** → Create/Edit/Delete projects → API Save
- **Backend Server** → Store in `server/data/projects.json`
- **Public Site** → Fetch projects → Display

## Architecture Components

### 1. Backend API (`server/index.js`)

#### Project CRUD Endpoints

```
GET    /api/projects       - Fetch all projects
GET    /api/projects/:id   - Fetch single project
POST   /api/projects       - Create new project
PUT    /api/projects/:id   - Update project
DELETE /api/projects/:id   - Delete project
```

#### Data Storage

Projects are stored in `server/data/projects.json` with the following structure:

```json
[
  {
    "id": "timestamp-based",
    "title": "Project Name",
    "description": "Project description",
    "technologies": ["Tech1", "Tech2"],
    "imageUrl": "https://...",
    "demoUrl": "https://...",
    "githubUrl": "https://...",
    "featured": true,
    "completedAt": "YYYY-MM-DD"
  }
]
```

### 2. API Client (`src/api/projects.ts`)

Typed TypeScript functions for interacting with the backend:

```typescript
fetchProjects()              // Get all projects
fetchProject(id)             // Get single project
createProject(data)          // Create new project
updateProject(id, data)      // Update existing project
deleteProject(id)            // Delete project
```

### 3. Admin Components

#### ProjectManagement.tsx
- Lists all projects in admin panel
- Fetches from API on mount
- Delete functionality with async handler
- Loading/error states with helpful messages

#### ProjectEditor.tsx
- Create or edit a project
- Form fields: Title, Description, Technologies, Image URL, Demo URL, GitHub URL, Featured checkbox, Completion Date
- Save button with loading state ("Saving...")
- Error display on failure
- Calls `createProject()` or `updateProject()` via API
- Redirects back on success

### 4. Public Components

#### ProjectsPage.tsx
- Displays all projects fetched from API
- Loading state: "Loading projects..."
- Error state: Shows error message with helpful context
- Empty state: "No projects found."
- Renders project cards with:
  - Project image
  - Featured badge (if applicable)
  - Title and description
  - Technology tags
  - Demo and GitHub buttons
  - Animations and hover effects

## Complete Data Flow

### Creating a New Project (Admin)

1. Admin visits **ProjectManagement** component
2. Clicks "New Project" → Opens **ProjectEditor**
3. Fills in project details (title, description, technologies, etc.)
4. Clicks "Create Project" button
5. `handleSave()` is triggered:
   - Sets `saving = true` (button shows "Saving...")
   - Calls `createProject(projectData)` via API
   - API sends POST request to `/api/projects`
   - Server generates unique ID (timestamp)
   - Server saves to `projects.json`
6. On success: User redirected back to ProjectManagement
7. On error: Error message displayed, user can retry
8. ProjectManagement refreshes and shows new project in list

### Displaying on Public Site

1. User visits public **ProjectsPage**
2. Component fetches projects via `fetchProjects()`
3. Server reads `server/data/projects.json`
4. Projects rendered with all data (images, descriptions, tech tags)
5. User can click Demo or GitHub links

### Editing a Project (Admin)

1. Admin clicks Edit button on project in **ProjectManagement**
2. Opens **ProjectEditor** with existing project data
3. Modifies fields as needed
4. Clicks "Update Project" button
5. `handleSave()` calls `updateProject(id, projectData)`
6. API sends PUT request to `/api/projects/:id`
7. Server updates `projects.json` with new data
8. On success: Redirects back, public site shows updated project
9. On error: Error message displayed

### Deleting a Project (Admin)

1. Admin clicks Delete button on project in **ProjectManagement**
2. Confirmation dialog appears
3. On confirm: `deleteProject(id)` called
4. API sends DELETE request to `/api/projects/:id`
5. Server removes from `projects.json`
6. ProjectManagement list updates
7. Public site no longer shows deleted project

## Data Persistence

Projects are saved in `server/data/projects.json` - a JSON file on the server. This means:

✅ **Persists across server restarts** - Data stays in the JSON file
✅ **Simple and human-readable** - Can manually edit if needed
✅ **No database required** - File-based storage

⚠️ **Single file limitation** - Not suitable for thousands of projects (would switch to database in production)

## Key Features Implemented

### Admin Panel
- ✅ Create new projects with full details
- ✅ Edit existing projects
- ✅ Delete projects with confirmation
- ✅ View all projects with search capability
- ✅ Loading states ("Loading projects...")
- ✅ Error handling with helpful messages
- ✅ Save button shows "Saving..." while processing
- ✅ Error display on failed save

### Public Site
- ✅ Displays real data from API (not hardcoded)
- ✅ Shows all project fields (title, description, technologies, image, links)
- ✅ Featured projects badge
- ✅ Loading state while fetching
- ✅ Error state with helpful messages
- ✅ Empty state when no projects
- ✅ Smooth animations and hover effects
- ✅ Responsive grid layout

## Testing the Complete Flow

### Test 1: Create a New Project

1. Start server: `node server/index.js`
2. Start frontend: `npm run dev`
3. Go to Admin Panel → Projects
4. Click "New Project"
5. Fill in:
   - Title: "My New Project"
   - Description: "Test project"
   - Technologies: Add "React", "Node.js"
   - Image: Paste image URL
   - Demo/GitHub URLs
   - Mark as featured
6. Click "Create Project"
7. Wait for "Saving..." message
8. Should redirect to project list with new project showing
9. Go to Public Site → Projects
10. Should see your new project in the list

### Test 2: Edit a Project

1. In admin panel, click Edit on any project
2. Change title: Add " - Updated" to title
3. Click "Update Project"
4. Wait for "Saving..." message
5. Redirects to list
6. Go to public projects page
7. Title should show updated text

### Test 3: Delete a Project

1. In admin panel, click Delete on a project
2. Confirm deletion
3. Project disappears from list
4. Go to public projects page
5. Project should no longer appear

### Test 4: Error Handling

1. Stop the server
2. Try to create/edit/delete a project in admin
3. Should see error message
4. Restart server
5. Retry and it should work

## Troubleshooting

### Problem: Projects not showing on public site
- Check browser console for errors
- Verify server is running (`node server/index.js`)
- Check `server/data/projects.json` exists
- Verify port 4000 is accessible

### Problem: Can't save projects in admin
- Check browser console for error messages
- Verify server is running on port 4000
- Check `server/index.js` has POST endpoint for `/api/projects`
- Check `server/data/projects.json` has write permissions

### Problem: Images not loading
- Verify image URLs are valid and public
- Check network tab in browser dev tools
- Images must be accessible from public internet

## File Structure

```
server/
  ├── index.js                    # Express server with project CRUD
  └── data/
      └── projects.json           # Project storage

src/
  ├── api/
  │   └── projects.ts             # API client functions
  ├── components/
  │   ├── ProjectEditor.tsx        # Admin: Create/Edit form
  │   ├── ProjectManagement.tsx    # Admin: Project list
  │   └── public/
  │       └── ProjectsPage.tsx     # Public: Display projects
  └── App.tsx                      # Project interface definition
```

## Project Interface

From `src/App.tsx`:

```typescript
interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  imageUrl: string;
  demoUrl: string;
  githubUrl: string;
  featured: boolean;
  completedAt: string;
}
```

## Next Steps

1. **Start the server**: `node server/index.js`
2. **Start the app**: `npm run dev`
3. **Test the flow**: Create a project in admin, see it on public site
4. **Deploy**: Set up server hosting for production

## Additional Notes

- Project IDs are generated using `Date.now()` (millisecond timestamp)
- This ensures unique IDs and chronological ordering
- All timestamps are ISO format (YYYY-MM-DD)
- API base URL is `http://localhost:4000/api` (configurable via env vars)
