const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

const POSTS_PATH = path.join(__dirname, 'data', 'posts.json');
const PROJECTS_PATH = path.join(__dirname, 'data', 'projects.json');

function readPosts() {
  try {
    const raw = fs.readFileSync(POSTS_PATH, 'utf8');
    return JSON.parse(raw);
  } catch (e) {
    return [];
  }
}

function writePosts(posts) {
  fs.writeFileSync(POSTS_PATH, JSON.stringify(posts, null, 2), 'utf8');
}

function readProjects() {
  try {
    const raw = fs.readFileSync(PROJECTS_PATH, 'utf8');
    return JSON.parse(raw);
  } catch (e) {
    return [];
  }
}

function writeProjects(projects) {
  fs.writeFileSync(PROJECTS_PATH, JSON.stringify(projects, null, 2), 'utf8');
}

app.get('/api/posts', (req, res) => {
  const posts = readPosts();
  res.json(posts);
});

app.get('/api/posts/:id', (req, res) => {
  const posts = readPosts();
  const post = posts.find((p) => p.id === req.params.id);
  if (!post) return res.status(404).json({ message: 'Not found' });
  res.json(post);
});

app.post('/api/posts', (req, res) => {
  const posts = readPosts();
  const payload = req.body;
  const id = Date.now().toString();
  const now = new Date().toISOString().split('T')[0];
  const newPost = Object.assign(
    {
      id,
      views: 0,
      publishedAt: payload.published ? now : payload.publishedAt || null,
    },
    payload,
  );
  posts.unshift(newPost);
  writePosts(posts);
  res.status(201).json(newPost);
});

app.put('/api/posts/:id', (req, res) => {
  const posts = readPosts();
  const idx = posts.findIndex((p) => p.id === req.params.id);
  if (idx === -1) return res.status(404).json({ message: 'Not found' });
  const payload = req.body;
  const now = new Date().toISOString().split('T')[0];
  const updated = Object.assign({}, posts[idx], payload, {
    publishedAt: payload.published ? (posts[idx].publishedAt || now) : payload.publishedAt || null,
  });
  posts[idx] = updated;
  writePosts(posts);
  res.json(updated);
});

app.delete('/api/posts/:id', (req, res) => {
  let posts = readPosts();
  const idx = posts.findIndex((p) => p.id === req.params.id);
  if (idx === -1) return res.status(404).json({ message: 'Not found' });
  const deleted = posts.splice(idx, 1)[0];
  writePosts(posts);
  res.json(deleted);
});

// PROJECTS ENDPOINTS
app.get('/api/projects', (req, res) => {
  const projects = readProjects();
  res.json(projects);
});

app.get('/api/projects/:id', (req, res) => {
  const projects = readProjects();
  const project = projects.find((p) => p.id === req.params.id);
  if (!project) return res.status(404).json({ message: 'Not found' });
  res.json(project);
});

app.post('/api/projects', (req, res) => {
  const projects = readProjects();
  const payload = req.body;
  const id = Date.now().toString();
  const newProject = Object.assign(
    {
      id,
    },
    payload,
  );
  projects.unshift(newProject);
  writeProjects(projects);
  res.status(201).json(newProject);
});

app.put('/api/projects/:id', (req, res) => {
  const projects = readProjects();
  const idx = projects.findIndex((p) => p.id === req.params.id);
  if (idx === -1) return res.status(404).json({ message: 'Not found' });
  const payload = req.body;
  const updated = Object.assign({}, projects[idx], payload);
  projects[idx] = updated;
  writeProjects(projects);
  res.json(updated);
});

app.delete('/api/projects/:id', (req, res) => {
  let projects = readProjects();
  const idx = projects.findIndex((p) => p.id === req.params.id);
  if (idx === -1) return res.status(404).json({ message: 'Not found' });
  const deleted = projects.splice(idx, 1)[0];
  writeProjects(projects);
  res.json(deleted);
});

app.listen(PORT, () => {
  console.log(`API server listening on http://localhost:${PORT}`);
});
