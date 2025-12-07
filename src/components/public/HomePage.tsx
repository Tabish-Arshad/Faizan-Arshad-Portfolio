import { ArrowRight, Code2, Database, Zap, Calendar, Eye, Star, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';

interface HomePageProps {
  onNavigate: (page: string) => void;
}

export function HomePage({ onNavigate }: HomePageProps) {
  const skills = [
    { 
      icon: Code2, 
      title: 'SAP ABAP Development', 
      description: 'Expert in custom module development and function modules',
      gradient: 'from-emerald-500 to-teal-600'
    },
    { 
      icon: Database, 
      title: 'ERP Integration', 
      description: 'Seamless integration between ERP systems and modern tech',
      gradient: 'from-blue-500 to-cyan-600'
    },
    { 
      icon: Zap, 
      title: 'Performance Optimization', 
      description: 'Optimizing large-scale enterprise implementations',
      gradient: 'from-purple-500 to-pink-600'
    },
  ];

  const featuredProjects = [
    {
      id: '1',
      title: 'SAP Custom Module Builder',
      description: 'A comprehensive tool for generating custom function modules in SAP.',
      tags: ['SAP ABAP', 'TypeScript', 'React'],
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop',
    },
    {
      id: '2',
      title: 'ERP Data Migration Tool',
      description: 'Enterprise-grade data migration utility for seamless transfer between ERP systems.',
      tags: ['Python', 'SQL', 'SAP'],
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop',
    },
  ];

  const recentPosts = [
    {
      id: '1',
      title: 'Understanding SAP ABAP Development Best Practices',
      excerpt: 'A comprehensive guide to writing clean and maintainable ABAP code...',
      date: '2025-12-02',
      readTime: '8 min',
      views: 1243,
      image: 'https://images.unsplash.com/photo-1603351130949-476794ec3dff?w=400&h=300&fit=crop',
    },
    {
      id: '2',
      title: 'Integrating ERP Systems with Modern Web Technologies',
      excerpt: 'Learn how to bridge traditional ERP systems with modern web frameworks...',
      date: '2025-11-28',
      readTime: '10 min',
      views: 892,
      image: 'https://images.unsplash.com/photo-1646153114001-495dfb56506d?w=400&h=300&fit=crop',
    },
    {
      id: '3',
      title: 'Custom Function Modules in SAP: A Complete Guide',
      excerpt: 'Everything you need to know about creating custom function modules...',
      date: '2025-11-20',
      readTime: '12 min',
      views: 654,
      image: 'https://images.unsplash.com/photo-1719400471588-575b23e27bd7?w=400&h=300&fit=crop',
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 py-20 overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear"
            }}
            className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-200/30 rounded-full blur-3xl"
          />
          <motion.div
            animate={{
              scale: [1.2, 1, 1.2],
              rotate: [360, 180, 0],
            }}
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: "linear"
            }}
            className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-teal-200/30 rounded-full blur-3xl"
          />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full shadow-lg mb-6"
              >
                <Sparkles className="w-4 h-4 text-emerald-600" />
                <span className="text-sm text-gray-700">Welcome to my portfolio</span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-5xl lg:text-6xl mb-6 bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 bg-clip-text text-transparent"
              >
                Functional ERP Developer
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-xl text-gray-700 mb-8"
              >
                Specializing in SAP ABAP development and enterprise integrations. 
                I build robust ERP solutions and share my knowledge through technical blogs.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="flex flex-wrap gap-4"
              >
                <motion.button
                  whileHover={{ scale: 1.05, boxShadow: "0 20px 25px -5px rgba(16, 185, 129, 0.3)" }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => onNavigate('projects')}
                  className="px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-lg hover:shadow-xl transition-all flex items-center gap-2"
                >
                  View My Work
                  <ArrowRight className="w-5 h-5" />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => onNavigate('contact')}
                  className="px-6 py-3 border-2 border-emerald-600 text-emerald-600 rounded-lg hover:bg-emerald-50 transition-colors"
                >
                  Get In Touch
                </motion.button>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <motion.div
                animate={{ y: [0, -20, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="relative z-10"
              >
                <img
                  src="https://images.unsplash.com/photo-1719400471588-575b23e27bd7?w=600&h=600&fit=crop"
                  alt="Developer workspace"
                  className="rounded-2xl shadow-2xl"
                />
              </motion.div>
              <div className="absolute -top-4 -right-4 w-72 h-72 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-2xl -z-10" />
              <div className="absolute -bottom-4 -left-4 w-72 h-72 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-2xl -z-10" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl mb-4 bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">What I Do</h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              Expertise in enterprise resource planning development and modern integration solutions
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {skills.map((skill, index) => {
              const Icon = skill.icon;
              return (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  whileHover={{ y: -10, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)" }}
                  className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100 relative overflow-hidden group"
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${skill.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
                  <motion.div
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                    className={`w-14 h-14 bg-gradient-to-br ${skill.gradient} rounded-xl flex items-center justify-center mb-4 shadow-lg`}
                  >
                    <Icon className="w-7 h-7 text-white" />
                  </motion.div>
                  <h3 className="text-xl mb-3">{skill.title}</h3>
                  <p className="text-gray-600">{skill.description}</p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center justify-between mb-12"
          >
            <div>
              <h2 className="text-4xl mb-2 bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">Featured Projects</h2>
              <p className="text-gray-600 text-lg">Showcasing my recent work and contributions</p>
            </div>
            <motion.button
              whileHover={{ x: 5 }}
              onClick={() => onNavigate('projects')}
              className="text-emerald-600 hover:text-emerald-700 flex items-center gap-2"
            >
              View All Projects
              <ArrowRight className="w-5 h-5" />
            </motion.button>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
          >
            {featuredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                variants={itemVariants}
                whileHover={{ y: -10 }}
                className="bg-white rounded-2xl shadow-lg overflow-hidden cursor-pointer group"
                onClick={() => onNavigate('projects')}
              >
                <div className="relative overflow-hidden h-56">
                  <motion.img
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.6 }}
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <div className="absolute top-4 left-4 flex items-center gap-1 bg-yellow-400 text-gray-900 px-3 py-1 rounded-full shadow-lg">
                    <Star className="w-4 h-4 fill-current" />
                    <span className="text-sm">Featured</span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl mb-2 group-hover:text-emerald-600 transition-colors">{project.title}</h3>
                  <p className="text-gray-600 mb-4">{project.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span key={tag} className="text-xs px-3 py-1 bg-gradient-to-r from-emerald-50 to-teal-50 text-emerald-700 rounded-full border border-emerald-200">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Recent Blog Posts */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center justify-between mb-12"
          >
            <div>
              <h2 className="text-4xl mb-2 bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">Recent Blog Posts</h2>
              <p className="text-gray-600 text-lg">Insights and tutorials on ERP development</p>
            </div>
            <motion.button
              whileHover={{ x: 5 }}
              onClick={() => onNavigate('blog')}
              className="text-emerald-600 hover:text-emerald-700 flex items-center gap-2"
            >
              View All Posts
              <ArrowRight className="w-5 h-5" />
            </motion.button>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {recentPosts.map((post, index) => (
              <motion.div
                key={post.id}
                variants={itemVariants}
                whileHover={{ y: -10, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)" }}
                className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden cursor-pointer group"
                onClick={() => onNavigate('blog')}
              >
                <div className="relative overflow-hidden h-48">
                  <motion.img
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.6 }}
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-3 text-sm text-gray-500 mb-3">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      <span>{post.date}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Eye className="w-4 h-4" />
                      <span>{post.views}</span>
                    </div>
                  </div>
                  <h3 className="text-xl mb-3 group-hover:text-emerald-600 transition-colors">{post.title}</h3>
                  <p className="text-gray-600 mb-4 line-clamp-2">{post.excerpt}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">{post.readTime} read</span>
                    <motion.span
                      whileHover={{ x: 5 }}
                      className="text-emerald-600 flex items-center gap-1"
                    >
                      Read More
                      <ArrowRight className="w-4 h-4" />
                    </motion.span>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-600 via-teal-600 to-cyan-600" />
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [0, -90, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute bottom-0 left-0 w-96 h-96 bg-white/10 rounded-full blur-3xl"
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl text-white mb-4">Let&apos;s Work Together</h2>
            <p className="text-xl text-emerald-100 mb-8 max-w-2xl mx-auto">
              I&apos;m always interested in hearing about new projects and opportunities.
            </p>
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.3)" }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onNavigate('contact')}
              className="px-8 py-3 bg-white text-emerald-600 rounded-lg hover:shadow-xl transition-all inline-flex items-center gap-2"
            >
              Contact Me
              <ArrowRight className="w-5 h-5" />
            </motion.button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
