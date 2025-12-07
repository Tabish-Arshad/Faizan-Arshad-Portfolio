import { FileText, Eye, MessageSquare, TrendingUp, Calendar } from 'lucide-react';

export function Dashboard() {
  const stats = [
    {
      label: 'Total Blog Posts',
      value: '24',
      change: '+3 this month',
      icon: FileText,
      color: 'bg-blue-500',
    },
    {
      label: 'Total Views',
      value: '12,458',
      change: '+18% from last month',
      icon: Eye,
      color: 'bg-green-500',
    },
    {
      label: 'Comments',
      value: '342',
      change: '+12 new',
      icon: MessageSquare,
      color: 'bg-purple-500',
    },
    {
      label: 'Projects',
      value: '8',
      change: '2 featured',
      icon: TrendingUp,
      color: 'bg-orange-500',
    },
  ];

  const recentPosts = [
    {
      id: '1',
      title: 'Understanding SAP ABAP Development Best Practices',
      views: 1243,
      date: '2025-12-02',
      status: 'published',
    },
    {
      id: '2',
      title: 'Integrating ERP Systems with Modern Web Technologies',
      views: 892,
      date: '2025-11-28',
      status: 'published',
    },
    {
      id: '3',
      title: 'Custom Function Modules in SAP: A Complete Guide',
      views: 654,
      date: '2025-11-20',
      status: 'published',
    },
    {
      id: '4',
      title: 'Optimizing Performance in Large ERP Implementations',
      views: 423,
      date: '2025-11-15',
      status: 'draft',
    },
  ];

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl mb-2">Dashboard</h1>
        <p className="text-gray-600">Welcome back! Here&apos;s your portfolio overview.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.label}
              className="bg-white rounded-lg shadow p-6 border border-gray-200"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`${stat.color} w-12 h-12 rounded-lg flex items-center justify-center`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
              </div>
              <h3 className="text-gray-500 text-sm mb-1">{stat.label}</h3>
              <p className="text-3xl mb-1">{stat.value}</p>
              <p className="text-sm text-gray-500">{stat.change}</p>
            </div>
          );
        })}
      </div>

      {/* Recent Posts */}
      <div className="bg-white rounded-lg shadow border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl">Recent Blog Posts</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-sm text-gray-600">Title</th>
                <th className="px-6 py-3 text-left text-sm text-gray-600">Views</th>
                <th className="px-6 py-3 text-left text-sm text-gray-600">Date</th>
                <th className="px-6 py-3 text-left text-sm text-gray-600">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {recentPosts.map((post) => (
                <tr key={post.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <FileText className="w-4 h-4 text-gray-400" />
                      <span>{post.title}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 text-gray-600">
                      <Eye className="w-4 h-4" />
                      <span>{post.views}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-600">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      <span>{post.date}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex px-2 py-1 rounded text-xs ${
                        post.status === 'published'
                          ? 'bg-green-100 text-green-700'
                          : 'bg-yellow-100 text-yellow-700'
                      }`}
                    >
                      {post.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
