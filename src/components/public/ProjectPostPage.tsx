import { ArrowLeft, ExternalLink, Github, Calendar } from 'lucide-react';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { fetchProject } from '../../api/projects';
import type { Project } from '../../App';

interface ProjectPostPageProps {
  projectId: string;
  onBack: () => void;
}

export function ProjectPostPage({ projectId, onBack }: ProjectPostPageProps) {
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    setError(null);
    fetchProject(projectId)
      .then((p) => {
        if (mounted) setProject(p);
      })
      .catch((err) => {
        if (mounted) {
          console.error('Failed to load project', err);
          setError('Failed to load project');
        }
      })
      .finally(() => {
        if (mounted) setLoading(false);
      });
    return () => {
      mounted = false;
    };
  }, [projectId]);

  if (loading) {
    return (
      <div className="min-h-screen py-12 px-4 bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <p className="text-gray-600 text-lg">Loading project...</p>
      </div>
    );
  }

  if (error || !project) {
    return (
      <div className="min-h-screen py-12 px-4 bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="max-w-4xl mx-auto">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-emerald-600 hover:text-emerald-700 mb-6"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Projects
          </button>
          <div className="text-center">
            <p className="text-red-600 text-lg mb-4">{error || 'Project not found'}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12 px-4 bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-emerald-600 hover:text-emerald-700 mb-8 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Projects
        </button>

        {/* Main Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-2xl shadow-lg overflow-hidden"
        >
          {/* Hero Image */}
          {project.imageUrl && (
            <div className="relative h-96 overflow-hidden">
              <motion.img
                src={project.imageUrl}
                alt={project.title}
                className="w-full h-full object-cover"
                initial={{ scale: 1.05 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5 }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
            </div>
          )}

          {/* Content */}
          <div className="p-8 md:p-12">
            {/* Title */}
            <h1 className="text-4xl md:text-5xl mb-4 bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
              {project.title}
            </h1>

            {/* Meta Information */}
            <div className="flex flex-wrap gap-4 mb-8 pb-8 border-b border-gray-200">
              {project.completedAt && (
                <div className="flex items-center gap-2 text-gray-600">
                  <Calendar className="w-5 h-5 text-emerald-600" />
                  <span>Completed: {new Date(project.completedAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                </div>
              )}
              {project.featured && (
                <div className="flex items-center gap-2 px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm font-medium">
                  ⭐ Featured Project
                </div>
              )}
            </div>

            {/* Description */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-4 text-gray-900">About</h2>
              <p className="text-gray-700 leading-relaxed whitespace-pre-wrap text-lg">
                {project.description}
              </p>
            </div>

            {/* Technologies */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-4 text-gray-900">Technologies Used</h2>
              <div className="flex flex-wrap gap-3">
                {project.technologies.map((tech) => (
                  <motion.span
                    key={tech}
                    whileHover={{ scale: 1.05 }}
                    className="px-4 py-2 bg-gradient-to-r from-emerald-50 to-teal-50 text-emerald-700 rounded-lg border border-emerald-200 font-medium"
                  >
                    {tech}
                  </motion.span>
                ))}
              </div>
            </div>

            {/* Links */}
            <div className="flex gap-4 flex-wrap">
              {project.demoUrl && project.demoUrl !== '#' && (
                <motion.a
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  href={project.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-lg font-medium hover:shadow-lg transition-shadow"
                >
                  <ExternalLink className="w-5 h-5" />
                  View Demo
                </motion.a>
              )}
              {project.githubUrl && project.githubUrl !== '#' && (
                <motion.a
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-6 py-3 bg-gray-900 text-white rounded-lg font-medium hover:bg-gray-800 transition-colors"
                >
                  <Github className="w-5 h-5" />
                  View Code
                </motion.a>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
