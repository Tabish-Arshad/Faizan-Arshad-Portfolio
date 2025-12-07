import { useState, useEffect } from 'react';
import { Search, Calendar, Eye, Clock, ArrowRight, TrendingUp, Filter } from 'lucide-react';
import { motion } from 'framer-motion';
import { fetchPosts } from '../../api/posts';

interface BlogListPageProps {
  onViewPost: (postId: string) => void;
}

export function BlogListPage({ onViewPost }: BlogListPageProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    'All',
    'ERP Development',
    'SAP Development',
    'Integration',
    'Performance',
    'Best Practices',
    'Tutorial',
  ];

  const [blogPosts, setBlogPosts] = useState<any[]>([]);

  // Calculate category counts
  const getCategoryCount = (categoryName: string) => {
    if (categoryName === 'all') {
      return blogPosts.filter(post => 
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
      ).length;
    }
    return blogPosts.filter(post =>
      (post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
       post.excerpt.toLowerCase().includes(searchQuery.toLowerCase())) &&
      post.category?.toLowerCase() === categoryName.toLowerCase()
    ).length;
  };

  useEffect(() => {
    let mounted = true;
    fetchPosts()
      .then((data) => {
        if (mounted)
          setBlogPosts(
            (data as any[]).map((p) => ({
              ...p,
              date: p.date || p.publishedAt,
              image: p.image || `https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&h=400&fit=crop`,
              featured: p.featured || false,
            })),
          );
      })
      .catch((err) => console.error('Failed to load posts', err));
    return () => {
      mounted = false;
    };
  }, []);

  const filteredPosts = blogPosts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Fix category matching - compare with full category name or 'all'
    const selectedCategoryName = selectedCategory === 'all' 
      ? 'all' 
      : categories.find(c => c.toLowerCase() === selectedCategory)?.toLowerCase() || selectedCategory;
    
    const postCategory = post.category?.toLowerCase() || '';
    const matchesCategory =
      selectedCategoryName === 'all' || postCategory === selectedCategoryName;
    
    return matchesSearch && matchesCategory;
  });

  const featuredPosts = blogPosts.filter((post) => (post as any).featured);
  const regularPosts = filteredPosts.filter((post) => !(post as any).featured);

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
    <div className="py-12 bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl mb-4 bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">Blog</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Technical articles, tutorials, and insights about ERP development, SAP, and enterprise integrations
          </p>
        </motion.div>

        {/* Search and Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-12"
        >
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200">
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="flex-1 relative">
                <Search className="w-5 h-5 absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search articles by title or content..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all"
                />
                {searchQuery && (
                  <motion.button
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    onClick={() => setSearchQuery('')}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    ✕
                  </motion.button>
                )}
              </div>
            </div>

            {searchQuery && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-4 px-4 py-2 bg-emerald-50 border border-emerald-200 rounded-lg"
              >
                <p className="text-emerald-700 text-sm">
                  Found <span className="font-semibold">{filteredPosts.length}</span> article{filteredPosts.length !== 1 ? 's' : ''} matching "{searchQuery}"
                </p>
              </motion.div>
            )}

            <div className="flex items-center gap-2 mb-2">
              <span className="text-sm text-gray-600">Filter by category:</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => {
                const count = getCategoryCount(category);
                return (
                  <motion.button
                    key={category}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setSelectedCategory(category.toLowerCase())}
                    className={`px-4 py-2 rounded-lg transition-all ${
                      selectedCategory === category.toLowerCase()
                        ? 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-lg'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {category} <span className="ml-1 text-sm">({count})</span>
                  </motion.button>
                );
              })}
            </div>
          </div>
        </motion.div>

        {/* Featured Posts */}
        {featuredPosts.length > 0 && selectedCategory === 'all' && !searchQuery && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mb-12"
          >
            <div className="flex items-center gap-2 mb-6">
              <TrendingUp className="w-6 h-6 text-emerald-600" />
              <h2 className="text-2xl bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">Featured Articles</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {featuredPosts.map((post, index) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                  whileHover={{ y: -10, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.15)" }}
                  className="bg-white rounded-2xl shadow-lg overflow-hidden cursor-pointer group border border-gray-200"
                  onClick={() => onViewPost(post.id)}
                >
                  <div className="relative overflow-hidden h-64">
                    <motion.img
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.6 }}
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
                    <div className="absolute top-4 left-4">
                      <span className="px-4 py-1.5 bg-yellow-400 text-gray-900 rounded-full text-sm shadow-lg">
                        ⭐ Featured
                      </span>
                    </div>
                    <div className="absolute bottom-4 left-4 right-4">
                      <span className="text-xs px-3 py-1 bg-emerald-500/90 backdrop-blur-sm text-white rounded-full">
                        {post.category}
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-2xl mb-3 group-hover:text-emerald-600 transition-colors">{post.title}</h3>
                    <p className="text-gray-600 mb-4">{post.excerpt}</p>
                    
                    <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        <span>{post.date}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        <span>{post.readTime}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Eye className="w-4 h-4" />
                        <span>{post.views}</span>
                      </div>
                    </div>

                    <motion.div
                      whileHover={{ x: 5 }}
                      className="flex items-center gap-2 text-emerald-600"
                    >
                      <span>Read Article</span>
                      <ArrowRight className="w-4 h-4" />
                    </motion.div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* All Posts */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <h2 className="text-2xl mb-6 text-gray-900">All Articles</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {regularPosts.map((post) => (
              <motion.div
                key={post.id}
                variants={itemVariants}
                whileHover={{ y: -10, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)" }}
                className="bg-white rounded-2xl shadow-lg overflow-hidden cursor-pointer group border border-gray-200"
                onClick={() => onViewPost(post.id)}
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
                  <div className="absolute bottom-3 left-3">
                    <span className="text-xs px-3 py-1 bg-white/90 backdrop-blur-sm text-gray-900 rounded-full">
                      {post.category}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl mb-3 group-hover:text-emerald-600 transition-colors line-clamp-2">{post.title}</h3>
                  <p className="text-gray-600 mb-4 line-clamp-2">{post.excerpt}</p>
                  
                  <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      <span>{post.date}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      <span>{post.readTime}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                    <div className="flex items-center gap-1 text-gray-500">
                      <Eye className="w-4 h-4" />
                      <span className="text-sm">{post.views} views</span>
                    </div>
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
          </div>
        </motion.div>

        {filteredPosts.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12 bg-white rounded-2xl shadow-lg border border-gray-200"
          >
            <div className="flex flex-col items-center gap-3">
              <Search className="w-12 h-12 text-gray-300" />
              <p className="text-gray-500 text-lg">No articles found matching your criteria.</p>
              {searchQuery && (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedCategory('all');
                  }}
                  className="mt-4 px-6 py-2 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-lg hover:shadow-lg transition-all"
                >
                  Clear filters and try again
                </motion.button>
              )}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}