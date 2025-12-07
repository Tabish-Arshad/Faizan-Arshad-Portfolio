import { useState, useEffect } from 'react';
import { Plus, Search, Edit2, Trash2, ExternalLink, Github, Star } from 'lucide-react';
import { Project } from '../App';
import { fetchProjects, deleteProject } from '../api/projects';

interface ProjectManagementProps {
  onEditProject: (project: Project) => void;
  onNewProject: () => void;
}

export function ProjectManagement({ onEditProject, onNewProject }: ProjectManagementProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    setError(null);
    fetchProjects()
      .then((data) => {
        if (mounted) setProjects(data);
      })
      .catch((err) => {
        if (mounted) {
          console.error('Failed to load projects', err);
          setError('Failed to load projects. Make sure the server is running (npm run start:server)');
        }
      })
      .finally(() => {
        if (mounted) setLoading(false);
      });
    return () => {
      mounted = false;
    };
  }, []);

  const filteredProjects = projects.filter((project) =>
    project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    project.technologies.some((tech) =>
      tech.toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  return (
    <div className="p-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl mb-2">Projects</h1>
          <p className="text-gray-600">Manage your portfolio projects and showcases</p>
        </div>
        <button
          onClick={onNewProject}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
        >
          <Plus className="w-5 h-5" />
          New Project
        </button>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg shadow p-4 mb-6">
          <p className="text-red-800">{error}</p>
        </div>
      )}

      {loading ? (
        <div className="bg-white rounded-lg shadow border border-gray-200 p-12 text-center">
          <p className="text-gray-600">Loading projects...</p>
        </div>
      ) : (
        <>
      {/* Search */}
      <div className="bg-white rounded-lg shadow border border-gray-200 p-6 mb-6">
        <div className="relative">
          <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search projects..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredProjects.map((project) => (
          <div
            key={project.id}
            className="bg-white rounded-lg shadow border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow"
          >
            <div
              className="h-48 bg-cover bg-center"
              style={{ backgroundImage: `url(${project.imageUrl})` }}
            >
              {project.featured && (
                <div className="flex items-center gap-1 bg-yellow-500 text-white px-3 py-1 rounded-br-lg inline-flex">
                  <Star className="w-4 h-4 fill-current" />
                  <span className="text-sm">Featured</span>
                </div>
              )}
            </div>

            <div className="p-6">
              <h3 className="text-xl mb-2">{project.title}</h3>
              <p className="text-gray-600 mb-4">{project.description}</p>

              <div className="flex flex-wrap gap-2 mb-4">
                {project.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="text-xs px-2 py-1 bg-gray-100 text-gray-700 rounded"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
                <span>Completed: {project.completedAt}</span>
              </div>

              <div className="flex gap-2">
                <button 
                  onClick={() => onEditProject(project)}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors"
                >
                  <Edit2 className="w-4 h-4" />
                  Edit
                </button>
                <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
                  <ExternalLink className="w-4 h-4" />
                </button>
                <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
                  <Github className="w-4 h-4" />
                </button>
                <button
                  onClick={async () => {
                    if (!confirm('Delete this project?')) return;
                    try {
                      await deleteProject(project.id);
                      setProjects((prev) => prev.filter((p) => p.id !== project.id));
                    } catch (e) {
                      console.error('Delete failed', e);
                      alert('Failed to delete project');
                    }
                  }}
                  className="px-4 py-2 bg-red-50 text-red-700 rounded-lg hover:bg-red-100 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredProjects.length === 0 && (
        <div className="bg-white rounded-lg shadow border border-gray-200 p-12 text-center">
          <Search className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl text-gray-600 mb-2">No projects found</h3>
          <p className="text-gray-500">Try adjusting your search criteria</p>
        </div>
      )}
        </>
      )}
    </div>
  );
}