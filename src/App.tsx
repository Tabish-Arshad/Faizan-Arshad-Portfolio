import { useState } from "react";
import { Sidebar } from "./components/Sidebar";
import { Dashboard } from "./components/Dashboard";
import { BlogManagement } from "./components/BlogManagement";
import { ProjectManagement } from "./components/ProjectManagement";
import { BlogEditor } from "./components/BlogEditor";
import { ProjectEditor } from "./components/ProjectEditor";
import { Settings } from "./components/Settings";
import { Login } from "./components/Login";
import { Header } from "./components/public/Header";
import { Footer } from "./components/public/Footer";
import { HomePage } from "./components/public/HomePage";
import { BlogListPage } from "./components/public/BlogListPage";
import { BlogPostPage } from "./components/public/BlogPostPage";
import { ProjectsPage } from "./components/public/ProjectsPage";
import { ProjectPostPage } from "./components/public/ProjectPostPage";
import { ContactPage } from "./components/public/ContactPage";
import { AboutPage } from "./components/public/AboutPage";

export type View =
  | "dashboard"
  | "blogs"
  | "projects"
  | "blog-editor"
  | "project-editor"
  | "settings";
export type PublicPage =
  | "home"
  | "about"
  | "projects"
  | "project-post"
  | "blog"
  | "blog-post"
  | "contact";

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  tags: string[];
  published: boolean;
  publishedAt: string;
  views: number;
  readTime: string;
  image?: string;
  author?: {
    name: string;
    title?: string;
    bio?: string;
  };
}

export interface Project {
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

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showAdmin, setShowAdmin] = useState(false);
  const [currentView, setCurrentView] = useState<View>("dashboard");
  const [currentPage, setCurrentPage] = useState<PublicPage>("home");
  const [selectedPostId, setSelectedPostId] = useState<string | null>(null);
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);
  const [editingBlog, setEditingBlog] = useState<BlogPost | null>(null);
  const [editingProject, setEditingProject] = useState<Project | null>(null);

  const handleLogin = () => {
    setIsAuthenticated(true);
    setShowAdmin(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setShowAdmin(false);
    setCurrentView("dashboard");
  };

  const handleViewWebsite = () => {
    setShowAdmin(false);
    setCurrentPage("home");
  };

  const handleViewAdmin = () => {
    if (!isAuthenticated) {
      // Show login
      setShowAdmin(true);
    } else {
      setShowAdmin(true);
    }
  };

  const handleNavigatePublic = (page: string) => {
    setCurrentPage(page as PublicPage);
    if (page !== "blog-post" && page !== "project-post") {
      setSelectedPostId(null);
      setSelectedProjectId(null);
    }
  };

  const handleViewPost = (postId: string) => {
    setSelectedPostId(postId);
    setCurrentPage("blog-post");
  };

  const handleBackFromPost = () => {
    setSelectedPostId(null);
    setCurrentPage("blog");
  };

  const handleViewProject = (projectId: string) => {
    setSelectedProjectId(projectId);
    setCurrentPage("project-post");
  };

  const handleBackFromProject = () => {
    setSelectedProjectId(null);
    setCurrentPage("projects");
  };

  const handleEditBlog = (blog: BlogPost) => {
    setEditingBlog(blog);
    setCurrentView("blog-editor");
  };

  const handleNewBlog = () => {
    setEditingBlog(null);
    setCurrentView("blog-editor");
  };

  const handleBackFromEditor = () => {
    setEditingBlog(null);
    setCurrentView("blogs");
  };

  const handleEditProject = (project: Project) => {
    setEditingProject(project);
    setCurrentView("project-editor");
  };

  const handleNewProject = () => {
    setEditingProject(null);
    setCurrentView("project-editor");
  };

  const handleBackFromProjectEditor = () => {
    setEditingProject(null);
    setCurrentView("projects");
  };

  // Show public website
  if (!showAdmin) {
    return (
      <>
        <div className="min-h-screen flex flex-col bg-gray-50">
          <Header
            currentPage={currentPage}
            onNavigate={handleNavigatePublic}
            onAdminClick={handleViewAdmin}
          />
          <main className="flex-1">
            {currentPage === "home" && (
              <HomePage onNavigate={handleNavigatePublic} />
            )}
            {currentPage === "about" && <AboutPage />}
            {currentPage === "projects" && (
              <ProjectsPage onViewProject={handleViewProject} />
            )}
            {currentPage === "project-post" && selectedProjectId && (
              <ProjectPostPage
                projectId={selectedProjectId}
                onBack={handleBackFromProject}
              />
            )}
            {currentPage === "blog" && (
              <BlogListPage onViewPost={handleViewPost} />
            )}
            {currentPage === "blog-post" && selectedPostId && (
              <BlogPostPage
                postId={selectedPostId}
                onBack={handleBackFromPost}
                onViewPost={handleViewPost}
              />
            )}
            {currentPage === "contact" && <ContactPage />}
          </main>
          <Footer />
        </div>
      </>
    );
  }

  // Show login if not authenticated
  if (!isAuthenticated) {
    return <Login onLogin={handleLogin} />;
  }

  // Show admin panel
  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar
        currentView={currentView}
        onViewChange={setCurrentView}
        onLogout={handleLogout}
        onViewWebsite={handleViewWebsite}
      />

      <main className="flex-1 overflow-y-auto">
        {currentView === "dashboard" && <Dashboard />}
        {currentView === "blogs" && (
          <BlogManagement
            onEditBlog={handleEditBlog}
            onNewBlog={handleNewBlog}
          />
        )}
        {currentView === "projects" && (
          <ProjectManagement
            onEditProject={handleEditProject}
            onNewProject={handleNewProject}
          />
        )}
        {currentView === "blog-editor" && (
          <BlogEditor blog={editingBlog} onBack={handleBackFromEditor} />
        )}
        {currentView === "project-editor" && (
          <ProjectEditor
            project={editingProject}
            onBack={handleBackFromProjectEditor}
          />
        )}
        {currentView === "settings" && <Settings />}
      </main>
    </div>
  );
}

export default App;
