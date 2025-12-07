import { ArrowLeft, Calendar, Clock, Eye, Share2, Tag, BookmarkPlus, ThumbsUp, MessageCircle, TrendingUp, Copy, Check } from 'lucide-react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { motion } from 'motion/react';
import { useEffect, useState } from 'react';
import { fetchPost, fetchPosts } from '../../api/posts';

interface BlogPostPageProps {
  postId: string;
  onBack: () => void;
  onViewPost: (postId: string) => void;
}

export function BlogPostPage({ postId, onBack, onViewPost }: BlogPostPageProps) {
  const [post, setPost] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [relatedPosts, setRelatedPosts] = useState<any[]>([]);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    setError(null);
    
    Promise.all([fetchPost(postId), fetchPosts()])
      .then(([p, allPosts]) => {
        if (mounted) {
          setPost(p);
          // Get latest 3 posts excluding current post
          const latest = (allPosts as any[])
            .filter((post) => post.id !== postId)
            .slice(0, 3)
            .map((post) => ({
              id: post.id,
              title: post.title,
              category: post.category || 'Article',
              image: post.image || 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&h=300&fit=crop',
              readTime: post.readTime || '5 min',
            }));
          setRelatedPosts(latest);
        }
      })
      .catch((err) => {
        if (mounted) {
          console.error('Failed to load post', err);
          setError('Failed to load post');
        }
      })
      .finally(() => {
        if (mounted) setLoading(false);
      });
    return () => {
      mounted = false;
    };
  }, [postId]);

  const handleSharePost = () => {
    const url = `${window.location.origin}${window.location.pathname}`;
    const title = post?.title || 'Check out this blog post';
    const shareText = `${title} - ${url}`;

    // Check if Web Share API is available
    if (navigator.share) {
      navigator.share({
        title: title,
        text: 'Check out this blog post:',
        url: url,
      }).catch((err) => console.error('Error sharing:', err));
    } else {
      // Fallback: Copy to clipboard
      navigator.clipboard.writeText(shareText).then(() => {
        alert('Post link copied to clipboard!');
      }).catch(() => {
        alert('Unable to share. Please copy the URL manually.');
      });
    }
  };

  const handleCopyCode = (code: string, codeIndex: number) => {
    navigator.clipboard.writeText(code).then(() => {
      setCopiedCode(codeIndex.toString());
      setTimeout(() => setCopiedCode(null), 2000);
    }).catch((err) => {
      console.error('Failed to copy code:', err);
      alert('Failed to copy code snippet');
    });
  };

  if (loading) {
    return <div className="p-12 text-center text-gray-600">Loading...</div>;
  }

  if (error || !post) {
    return (
      <div className="p-12 text-center">
        <p className="text-red-600 mb-4">{error || 'Post not found'}</p>
        <button
          onClick={onBack}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Back to Blog
        </button>
      </div>
    );
  }

  // Parse content with code blocks and tables
  const renderContent = () => {
    if (!post.content) {
      return <p className="text-gray-700">No content available.</p>;
    }

    // First, extract code blocks
    const codeBlockPattern = /```(\w+)?\n([\s\S]*?)```/;
    const parts = post.content.split(codeBlockPattern);
    
    return parts.map((part, index) => {
      if (index % 3 === 0) {
        // Regular text - need to handle tables and other content
        const lines = part.split('\n');
        const elements: any[] = [];
        let i = 0;

        while (i < lines.length) {
          const line = lines[i];
          const trimmed = line.trim();

          // Check for markdown table
          if (trimmed.startsWith('|') && i + 1 < lines.length) {
            const nextLine = lines[i + 1].trim();
            // Check if next line is separator line
            if (nextLine.startsWith('|') && nextLine.includes('---')) {
              const headerCells = line.split('|')
                .slice(1, -1)
                .map((cell) => cell.trim());

              // Collect table rows
              const rows: string[][] = [];
              let j = i + 2;
              while (j < lines.length && lines[j].trim().startsWith('|')) {
                const rowCells = lines[j]
                  .split('|')
                  .slice(1, -1)
                  .map((cell) => cell.trim());
                rows.push(rowCells);
                j++;
              }

              // Render table
              elements.push(
                <motion.div
                  key={`table-${i}`}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="my-8 overflow-x-auto"
                >
                  <table className="w-full border-collapse border border-gray-300 rounded-lg overflow-hidden shadow-lg">
                    <thead>
                      <tr className="bg-gradient-to-r from-emerald-500 to-teal-600">
                        {headerCells.map((cell, cellIndex) => (
                          <th
                            key={cellIndex}
                            className="border border-gray-300 px-6 py-3 text-left font-semibold text-white"
                          >
                            {cell}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {rows.map((row, rowIndex) => (
                        <tr
                          key={rowIndex}
                          className={rowIndex % 2 === 0 ? 'bg-white' : 'bg-gray-50 hover:bg-gray-100'}
                        >
                          {row.map((cell, cellIndex) => (
                            <td
                              key={cellIndex}
                              className="border border-gray-300 px-6 py-4 text-gray-700"
                            >
                              {cell}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </motion.div>
              );

              i = j;
              continue;
            }
          }

          // Handle other content types
          if (line.startsWith('## ')) {
            elements.push(
              <h2 key={`${index}-${i}`} className="text-3xl mt-12 mb-6 bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                {line.substring(3)}
              </h2>
            );
          } else if (line.startsWith('### ')) {
            elements.push(
              <h3 key={`${index}-${i}`} className="text-2xl mt-8 mb-4 text-gray-900">
                {line.substring(4)}
              </h3>
            );
          } else if (line.startsWith('# ')) {
            elements.push(
              <h1 key={`${index}-${i}`} className="text-4xl mt-10 mb-6 text-gray-900">
                {line.substring(2)}
              </h1>
            );
          } else if (line.match(/^\d+\./)) {
            elements.push(
              <li key={`${index}-${i}`} className="ml-6 mb-2 text-gray-700 leading-relaxed">
                {line.substring(line.indexOf('.') + 1)}
              </li>
            );
          } else if (line.startsWith('- ') || line.startsWith('* ')) {
            elements.push(
              <li key={`${index}-${i}`} className="ml-6 mb-2 text-gray-700 leading-relaxed">
                {line.substring(2)}
              </li>
            );
          } else if (line.startsWith('✓ ')) {
            elements.push(
              <div key={`${index}-${i}`} className="flex items-start gap-2 mb-2">
                <span className="text-emerald-500 mt-1">✓</span>
                <span className="text-gray-700">{line.substring(2)}</span>
              </div>
            );
          } else if (trimmed) {
            elements.push(
              <p key={`${index}-${i}`} className="mb-4 text-gray-700 leading-relaxed text-lg">
                {line}
              </p>
            );
          }

          i++;
        }

        return <div key={index}>{elements}</div>;
      } else if (index % 3 === 2) {
        const language = parts[index - 1] || 'javascript';
        return (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="my-8 rounded-xl overflow-hidden shadow-2xl border-2 border-gray-200"
          >
            <div className="bg-gradient-to-r from-gray-800 to-gray-900 px-4 py-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500" />
                  <div className="w-3 h-3 rounded-full bg-green-500" />
                </div>
                <span className="text-gray-400 text-sm ml-3">{language}</span>
              </div>
              <button 
                onClick={() => handleCopyCode(part, index)}
                className={`flex items-center gap-2 text-sm px-3 py-1 rounded transition-colors ${
                  copiedCode === index.toString()
                    ? 'bg-green-600 text-white'
                    : 'text-gray-400 hover:text-white bg-gray-700 hover:bg-gray-600'
                }`}
              >
                {copiedCode === index.toString() ? (
                  <>
                    <Check className="w-4 h-4" />
                    Copied!
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    Copy
                  </>
                )}
              </button>
            </div>
            <SyntaxHighlighter
              language={language}
              style={vscDarkPlus}
              customStyle={{
                margin: 0,
                borderRadius: 0,
                fontSize: '0.9rem',
                padding: '1.5rem',
              }}
              showLineNumbers={true}
            >
              {part}
            </SyntaxHighlighter>
          </motion.div>
        );
      }
      return null;
    });
  };

  const defaultImage = 'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=1200&h=600&fit=crop';
  const postImage = post.image || defaultImage;
  const authorName = post.author?.name || 'Admin';
  const authorInitials = authorName.split(' ').map((n: string) => n[0]).join('');
  const publishDate = post.publishedAt || post.date || new Date().toISOString().split('T')[0];
  const viewCount = post.views || 0;
  const likes = post.likes || 0;
  const comments = post.comments || 0;

  return (
    <div className="py-12 bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          whileHover={{ x: -5 }}
          onClick={onBack}
          className="flex items-center gap-2 text-gray-600 hover:text-emerald-600 mb-8 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Blog
        </motion.button>

        {/* Article Header */}
        <motion.article
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-200"
        >
          <div className="relative h-96 overflow-hidden">
            <motion.img
              initial={{ scale: 1.2 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.8 }}
              src={postImage}
              alt={post.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
            <div className="absolute bottom-8 left-8 right-8">
              <span className="px-4 py-1.5 bg-emerald-500 text-white rounded-full text-sm shadow-lg inline-block mb-4">
                {post.category}
              </span>
              <h1 className="text-4xl md:text-5xl text-white mb-4">{post.title}</h1>
            </div>
          </div>

          <div className="p-8 md:p-12">
            {/* Meta Info */}
            <div className="flex flex-wrap items-center gap-6 pb-8 mb-8 border-b border-gray-200">
              <div className="flex items-center gap-4">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="w-14 h-14 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-full flex items-center justify-center text-white text-xl shadow-lg"
                >
                  {authorInitials}
                </motion.div>
                <div>
                  <p className="text-gray-900">{authorName}</p>
                  <p className="text-sm text-gray-600">{post.author?.title || 'Author'}</p>
                </div>
              </div>
              
              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 ml-auto">
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  <span>{publishDate}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  <span>{post.readTime || '5'} read</span>
                </div>
                <div className="flex items-center gap-1">
                  <Eye className="w-4 h-4" />
                  <span>{viewCount} views</span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-3 mb-8">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-lg hover:shadow-lg transition-all"
              >
                <ThumbsUp className="w-4 h-4" />
                <span>{likes}</span>
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                <span>{comments}</span>
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
              >
                <BookmarkPlus className="w-4 h-4" />
                Save
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleSharePost}
                className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors ml-auto"
              >
                <Share2 className="w-4 h-4" />
                Share
              </motion.button>
            </div>

            {/* Content */}
            <div className="prose prose-lg max-w-none">
              {renderContent()}
            </div>

            {/* Tags */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="mt-12 pt-8 border-t border-gray-200"
            >
              <div className="flex items-center gap-3 flex-wrap">
                <Tag className="w-5 h-5 text-gray-500" />
                {post.tags.map((tag) => (
                  <motion.span
                    key={tag}
                    whileHover={{ scale: 1.1 }}
                    className="px-4 py-2 bg-gradient-to-r from-emerald-50 to-teal-50 text-emerald-700 rounded-full text-sm border border-emerald-200 cursor-pointer hover:shadow-md transition-shadow"
                  >
                    #{tag}
                  </motion.span>
                ))}
              </div>
            </motion.div>

            {/* Author Bio */}
            {post.author && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mt-12 p-6 bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl border border-emerald-200"
            >
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-full flex items-center justify-center text-white text-2xl flex-shrink-0">
                  {authorInitials}
                </div>
                <div>
                  <h3 className="text-xl mb-1">About {authorName}</h3>
                  <p className="text-gray-600 mb-2">{post.author.title || 'Author'}</p>
                  <p className="text-gray-700">{post.author.bio || 'Author bio not available.'}</p>
                </div>
              </div>
            </motion.div>
            )}
          </div>
        </motion.article>

        {/* Related Posts */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16"
        >
          <div className="flex items-center gap-2 mb-8">
            <TrendingUp className="w-6 h-6 text-emerald-600" />
            <h3 className="text-3xl bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">Related Articles</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedPosts.map((relatedPost, index) => (
              <motion.div
                key={relatedPost.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.15)" }}
                onClick={() => onViewPost(relatedPost.id)}
                className="bg-white rounded-xl shadow-lg overflow-hidden cursor-pointer group border border-gray-200"
              >
                <div className="relative overflow-hidden h-40">
                  <motion.img
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.6 }}
                    src={relatedPost.image}
                    alt={relatedPost.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                </div>
                <div className="p-4">
                  <span className="text-xs px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full">
                    {relatedPost.category}
                  </span>
                  <h4 className="text-lg mt-3 mb-2 group-hover:text-emerald-600 transition-colors">{relatedPost.title}</h4>
                  <p className="text-sm text-gray-600">{relatedPost.readTime} read</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}