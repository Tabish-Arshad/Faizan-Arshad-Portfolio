import { useState } from "react";
import {
  ArrowLeft,
  Save,
  Eye,
  X,
  Code,
  Plus,
  Table as TableIcon,
} from "lucide-react";
import { BlogPost } from "../App";
import { createPost, updatePost } from "../api/posts";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import { motion, AnimatePresence } from "motion/react";

interface BlogEditorProps {
  blog: BlogPost | null;
  onBack: () => void;
}

export function BlogEditor({ blog, onBack }: BlogEditorProps) {
  const [title, setTitle] = useState(blog?.title || "");
  const [slug, setSlug] = useState(blog?.slug || "");
  const [category, setCategory] = useState(
    blog?.category || "ERP Development",
  );
  const [content, setContent] = useState(blog?.content || "");
  const [excerpt, setExcerpt] = useState(blog?.excerpt || "");
  const [image, setImage] = useState(blog?.image || "");
  const [tags, setTags] = useState<string[]>(blog?.tags || []);
  const [tagInput, setTagInput] = useState("");
  const [published, setPublished] = useState(
    blog?.published || false,
  );
  const [showPreview, setShowPreview] = useState(false);
  const [showCodeModal, setShowCodeModal] = useState(false);
  const [codeSnippet, setCodeSnippet] = useState("");
  const [codeLanguage, setCodeLanguage] =
    useState("javascript");
  const [showTableModal, setShowTableModal] = useState(false);
  const [tableRows, setTableRows] = useState(3);
  const [tableCols, setTableCols] = useState(3);
  const [tableData, setTableData] = useState<string[][]>(
    Array(3).fill(null).map(() => Array(3).fill(""))
  );
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);

  const languages = [
    { value: "abap", label: "ABAP" },
    { value: "javascript", label: "JavaScript" },
    { value: "typescript", label: "TypeScript" },
    { value: "python", label: "Python" },
    { value: "java", label: "Java" },
    { value: "sql", label: "SQL" },
    { value: "json", label: "JSON" },
    { value: "xml", label: "XML" },
    { value: "css", label: "CSS" },
    { value: "html", label: "HTML" },
    { value: "csharp", label: "X++" },
  ];

  const handleAddTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      setTags([...tags, tagInput.trim()]);
      setTagInput("");
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  const handleSave = () => {
    const payload: Partial<BlogPost> = {
      title,
      slug: slug || title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
      category,
      content,
      excerpt,
      tags,
      published,
      image,
      readTime: Math.max(1, Math.ceil(content.split(/\s+/).length / 200)) + ' min',
    };

    setSaving(true);
    setSaveError(null);

    (async () => {
      try {
        if (blog?.id) {
          await updatePost(blog.id, payload);
        } else {
          await createPost(payload);
        }
        onBack();
      } catch (e) {
        console.error('Save failed', e);
        setSaveError('Failed to save post. Make sure the server is running (npm run start:server)');
        setSaving(false);
      }
    })();
  };

  const insertCodeBlock = () => {
    setShowCodeModal(true);
  };

  const handleInsertCode = () => {
    const codeBlock = `\n\`\`\`${codeLanguage}\n${codeSnippet}\n\`\`\`\n`;
    setContent(content + codeBlock);
    setShowCodeModal(false);
    setCodeSnippet("");
    setCodeLanguage("javascript");
  };

  const handleTableRowsChange = (newRows: number) => {
    const newData = [...tableData];
    if (newRows > tableData.length) {
      for (let i = tableData.length; i < newRows; i++) {
        newData.push(Array(tableCols).fill(""));
      }
    } else {
      newData.splice(newRows);
    }
    setTableRows(newRows);
    setTableData(newData);
  };

  const handleTableColsChange = (newCols: number) => {
    const newData = tableData.map((row) => {
      const newRow = [...row];
      if (newCols > row.length) {
        for (let i = row.length; i < newCols; i++) {
          newRow.push("");
        }
      } else {
        newRow.splice(newCols);
      }
      return newRow;
    });
    setTableCols(newCols);
    setTableData(newData);
  };

  const handleTableCellChange = (row: number, col: number, value: string) => {
    const newData = [...tableData];
    newData[row][col] = value;
    setTableData(newData);
  };

  const handleInsertTable = () => {
    // Convert table data to markdown-style table
    let table = "\n";
    
    // Header row
    table += "| " + tableData[0].join(" | ") + " |\n";
    table += "|" + Array(tableCols).fill("---").join("|") + "|\n";
    
    // Data rows
    for (let i = 1; i < tableRows; i++) {
      table += "| " + tableData[i].join(" | ") + " |\n";
    }
    
    setContent(content + table);
    setShowTableModal(false);
    setTableRows(3);
    setTableCols(3);
    setTableData(Array(3).fill(null).map(() => Array(3).fill("")));
  };

  // Parse markdown-style content for preview
  const renderPreviewContent = () => {
    const parts = content.split(/```(\w+)?\n([\s\S]*?)```/);
    return parts.map((part, index) => {
      // Even indices are regular text, odd indices are language identifiers, next are code blocks
      if (index % 3 === 0) {
        // Check for markdown tables in regular text
        const lines = part.split('\n');
        const elements = [];
        let i = 0;
        
        while (i < lines.length) {
          const line = lines[i];
          
          // Check if this is a table header line
          if (line.includes('|') && i + 1 < lines.length && lines[i + 1].includes('|') && lines[i + 1].includes('---')) {
            const headerCells = line.split('|').filter((cell) => cell.trim());
            const separatorLine = lines[i + 1];
            const dataRows = [];
            
            // Collect table rows
            let j = i + 2;
            while (j < lines.length && lines[j].includes('|')) {
              const rowCells = lines[j].split('|').filter((cell) => cell.trim());
              dataRows.push(rowCells);
              j++;
            }
            
            // Render table
            elements.push(
              <div key={`table-${i}`} className="overflow-x-auto my-6 border border-gray-300 rounded-lg">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-gray-200">
                      {headerCells.map((cell, cellIndex) => (
                        <th
                          key={cellIndex}
                          className="border border-gray-300 px-4 py-2 text-left font-semibold"
                        >
                          {cell.trim()}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {dataRows.map((row, rowIndex) => (
                      <tr key={rowIndex} className={rowIndex % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                        {row.map((cell, cellIndex) => (
                          <td
                            key={cellIndex}
                            className="border border-gray-300 px-4 py-2"
                          >
                            {cell.trim()}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            );
            
            i = j;
            continue;
          }
          
          // Regular text
          if (line.trim()) {
            elements.push(
              <p key={`text-${i}`} className="mb-4 text-gray-700">
                {line}
              </p>
            );
          }
          i++;
        }
        
        return <div key={index}>{elements}</div>;
      } else if (index % 3 === 2) {
        const language = parts[index - 1] || "javascript";
        return (
          <div
            key={index}
            className="mb-6 rounded-xl overflow-hidden shadow-2xl border-2 border-gray-200"
          >
            <div className="bg-gradient-to-r from-gray-800 to-gray-900 px-4 py-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500" />
                  <div className="w-3 h-3 rounded-full bg-green-500" />
                </div>
                <span className="text-gray-400 text-sm ml-3">
                  {language}
                </span>
              </div>
              <button className="text-gray-400 hover:text-white text-sm px-3 py-1 bg-gray-700 rounded hover:bg-gray-600 transition-colors">
                Copy
              </button>
            </div>
            <SyntaxHighlighter
              language={language}
              style={vscDarkPlus}
              customStyle={{
                margin: 0,
                borderRadius: 0,
                fontSize: "0.875rem",
                padding: "1.5rem",
              }}
              showLineNumbers={true}
            >
              {part}
            </SyntaxHighlighter>
          </div>
        );
      }
      return null;
    });
  };

  return (
    <div className="p-8">
      <div className="mb-6 flex items-center justify-between">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Posts
        </button>
        <div className="flex gap-3">
          <button
            onClick={() => setShowPreview(!showPreview)}
            className={`flex items-center gap-2 px-4 py-2 border rounded-lg ${
              showPreview
                ? "bg-blue-50 border-blue-500 text-blue-700"
                : "border-gray-300 hover:bg-gray-50"
            }`}
          >
            <Eye className="w-5 h-5" />
            {showPreview ? "Edit" : "Preview"}
          </button>
          <button
            onClick={handleSave}
            disabled={saving}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Save className="w-5 h-5" />
            {saving ? "Saving..." : blog ? "Update Post" : "Create Post"}
          </button>
        </div>
      </div>

      {saveError && (
        <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-800">{saveError}</p>
        </div>
      )}

      <div className="bg-white rounded-lg shadow border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h1 className="text-2xl">
            {blog ? "Edit Blog Post" : "Create New Blog Post"}
          </h1>
        </div>

        <div className="p-6 space-y-6">
          {/* Title */}
          <div>
            <label className="block text-sm text-gray-700 mb-2">
              Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter blog post title..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Slug */}
          <div>
            <label className="block text-sm text-gray-700 mb-2">
              URL Slug
            </label>
            <input
              type="text"
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              placeholder="url-friendly-slug"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm text-gray-700 mb-2">
              Category
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="ERP Development">
                ERP Development
              </option>
              <option value="SAP Development">
                SAP Development
              </option>
              <option value="Integration">Integration</option>
              <option value="Performance">Performance</option>
              <option value="Best Practices">
                Best Practices
              </option>
              <option value="Tutorial">Tutorial</option>
            </select>
          </div>

          {/* Excerpt */}
          <div>
            <label className="block text-sm text-gray-700 mb-2">
              Excerpt
            </label>
            <textarea
              value={excerpt}
              onChange={(e) => setExcerpt(e.target.value)}
              placeholder="Brief description of your blog post..."
              rows={3}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Image URL */}
          <div>
            <label className="block text-sm text-gray-700 mb-2">
              Featured Image URL
            </label>
            <input
              type="text"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              placeholder="https://example.com/image.jpg"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {image && (
              <div className="mt-3 rounded-lg overflow-hidden border border-gray-300">
                <img src={image} alt="Preview" className="w-full h-48 object-cover" onError={(e) => { e.currentTarget.src = 'https://via.placeholder.com/800x400?text=Invalid+Image'; }} />
              </div>
            )}
          </div>

          {/* Content */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-sm text-gray-700">
                Content
              </label>
              {!showPreview && (
                <div className="flex gap-2">
                  <button
                    onClick={insertCodeBlock}
                    className="flex items-center gap-1 text-sm px-3 py-1 bg-emerald-500 hover:bg-emerald-600 rounded text-white transition-colors"
                  >
                    <Code className="w-4 h-4" />
                    Insert Code Snippet
                  </button>
                  <button
                    onClick={() => setShowTableModal(true)}
                    className="flex items-center gap-1 text-sm px-3 py-1 bg-emerald-500 hover:bg-emerald-600 rounded text-white transition-colors"
                  >
                    <TableIcon className="w-4 h-4" />
                    Insert Table
                  </button>
                </div>
              )}
            </div>
            {showPreview ? (
              <div className="w-full px-4 py-4 border border-gray-300 rounded-lg bg-white min-h-[400px]">
                {renderPreviewContent()}
              </div>
            ) : (
              <>
                <textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Write your blog post content here...

Use markdown-style code blocks:
```python
print('Hello World')
```

Supported languages: python, javascript, java, abap, sql, typescript, and more..."
                  rows={16}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-sm"
                />
                <p className="text-sm text-gray-500 mt-1">
                  Use ```language to start a code block and ```
                  to end it. Or click &quot;Insert Code
                  Snippet&quot; button above.
                </p>
              </>
            )}
          </div>

          {/* Tags */}
          <div>
            <label className="block text-sm text-gray-700 mb-2">
              Tags
            </label>
            <div className="flex gap-2 mb-2">
              <input
                type="text"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyPress={(e) =>
                  e.key === "Enter" &&
                  (e.preventDefault(), handleAddTag())
                }
                placeholder="Add a tag..."
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                onClick={handleAddTag}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Add Tag
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center gap-1 px-3 py-1 bg-blue-50 text-blue-700 rounded-lg"
                >
                  #{tag}
                  <button
                    onClick={() => handleRemoveTag(tag)}
                    className="hover:text-blue-900"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </span>
              ))}
            </div>
          </div>

          {/* Published Status */}
          <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
            <input
              type="checkbox"
              id="published"
              checked={published}
              onChange={(e) => setPublished(e.target.checked)}
              className="w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
            />
            <label
              htmlFor="published"
              className="text-gray-700"
            >
              Publish this post immediately
            </label>
          </div>
        </div>
      </div>

      {/* Code Snippet Modal */}
      <AnimatePresence>
        {showCodeModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            onClick={() => setShowCodeModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden"
            >
              <div className="p-6 border-b border-gray-200 flex items-center justify-between">
                <div>
                  <h2 className="text-2xl">
                    Insert Code Snippet
                  </h2>
                  <p className="text-gray-600 text-sm mt-1">
                    Add formatted code to your blog post
                  </p>
                </div>
                <button
                  onClick={() => setShowCodeModal(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="p-6 space-y-4 overflow-y-auto max-h-[calc(90vh-200px)]">
                <div>
                  <label className="block text-sm text-gray-700 mb-2">
                    Programming Language
                  </label>
                  <select
                    value={codeLanguage}
                    onChange={(e) =>
                      setCodeLanguage(e.target.value)
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  >
                    {languages.map((lang) => (
                      <option
                        key={lang.value}
                        value={lang.value}
                      >
                        {lang.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm text-gray-700 mb-2">
                    Code
                  </label>
                  <textarea
                    value={codeSnippet}
                    onChange={(e) =>
                      setCodeSnippet(e.target.value)
                    }
                    placeholder="Paste your code here..."
                    rows={12}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 font-mono text-sm"
                  />
                </div>

                {codeSnippet && (
                  <div>
                    <label className="block text-sm text-gray-700 mb-2">
                      Preview
                    </label>
                    <div className="rounded-xl overflow-hidden shadow-2xl border-2 border-gray-200">
                      <div className="bg-gradient-to-r from-gray-800 to-gray-900 px-4 py-3 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="flex gap-2">
                            <div className="w-3 h-3 rounded-full bg-red-500" />
                            <div className="w-3 h-3 rounded-full bg-yellow-500" />
                            <div className="w-3 h-3 rounded-full bg-green-500" />
                          </div>
                          <span className="text-gray-400 text-sm ml-3">
                            {codeLanguage}
                          </span>
                        </div>
                        <button className="text-gray-400 hover:text-white text-sm px-3 py-1 bg-gray-700 rounded hover:bg-gray-600 transition-colors">
                          Copy
                        </button>
                      </div>
                      <SyntaxHighlighter
                        language={codeLanguage}
                        style={vscDarkPlus}
                        customStyle={{
                          margin: 0,
                          borderRadius: 0,
                          fontSize: "0.875rem",
                          padding: "1.5rem",
                        }}
                        showLineNumbers={true}
                      >
                        {codeSnippet}
                      </SyntaxHighlighter>
                    </div>
                  </div>
                )}
              </div>

              <div className="p-6 border-t border-gray-200 flex justify-end gap-3">
                <button
                  onClick={() => setShowCodeModal(false)}
                  className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleInsertCode}
                  disabled={!codeSnippet}
                  className="px-6 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  <Plus className="w-5 h-5" />
                  Insert Code
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Table Modal */}
      <AnimatePresence>
        {showTableModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            onClick={() => setShowTableModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden"
            >
              <div className="p-6 border-b border-gray-200 flex items-center justify-between">
                <div>
                  <h2 className="text-2xl">Insert Table</h2>
                  <p className="text-gray-600 text-sm mt-1">
                    Create and configure your table
                  </p>
                </div>
                <button
                  onClick={() => setShowTableModal(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="p-6 space-y-6 overflow-y-auto max-h-[calc(90vh-200px)]">
                {/* Table Size Configuration */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-gray-700 mb-2">
                      Number of Rows
                    </label>
                    <input
                      type="number"
                      min="1"
                      max="20"
                      value={tableRows}
                      onChange={(e) => handleTableRowsChange(Math.max(1, parseInt(e.target.value) || 1))}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-700 mb-2">
                      Number of Columns
                    </label>
                    <input
                      type="number"
                      min="1"
                      max="10"
                      value={tableCols}
                      onChange={(e) => handleTableColsChange(Math.max(1, parseInt(e.target.value) || 1))}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>
                </div>

                {/* Table Editor */}
                <div>
                  <label className="block text-sm text-gray-700 mb-2">
                    Table Content
                  </label>
                  <div className="overflow-x-auto border border-gray-300 rounded-lg">
                    <table className="w-full border-collapse">
                      <tbody>
                        {tableData.map((row, rowIndex) => (
                          <tr key={rowIndex} className={rowIndex === 0 ? "bg-gray-100" : ""}>
                            {row.map((cell, colIndex) => (
                              <td
                                key={`${rowIndex}-${colIndex}`}
                                className="border border-gray-300"
                              >
                                <input
                                  type="text"
                                  value={cell}
                                  onChange={(e) =>
                                    handleTableCellChange(
                                      rowIndex,
                                      colIndex,
                                      e.target.value
                                    )
                                  }
                                  placeholder={
                                    rowIndex === 0
                                      ? `Header ${colIndex + 1}`
                                      : `Row ${rowIndex}, Col ${colIndex + 1}`
                                  }
                                  className="w-full px-3 py-2 border-0 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                                />
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <p className="text-sm text-gray-600 mt-2">
                    First row will be treated as header row
                  </p>
                </div>

                {/* Preview */}
                <div>
                  <label className="block text-sm text-gray-700 mb-2">
                    Preview
                  </label>
                  <div className="overflow-x-auto border border-gray-300 rounded-lg bg-gray-50">
                    <table className="w-full border-collapse">
                      <tbody>
                        {tableData.map((row, rowIndex) => (
                          <tr
                            key={rowIndex}
                            className={
                              rowIndex === 0
                                ? "bg-gray-200 border-b-2 border-gray-400"
                                : "border-b border-gray-300"
                            }
                          >
                            {row.map((cell, colIndex) => (
                              <td
                                key={`${rowIndex}-${colIndex}`}
                                className="px-4 py-2 border-r border-gray-300"
                              >
                                {cell || (rowIndex === 0 ? `Header ${colIndex + 1}` : "-")}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              <div className="p-6 border-t border-gray-200 flex justify-end gap-3">
                <button
                  onClick={() => setShowTableModal(false)}
                  className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleInsertTable}
                  className="px-6 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors flex items-center gap-2"
                >
                  <Plus className="w-5 h-5" />
                  Insert Table
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}