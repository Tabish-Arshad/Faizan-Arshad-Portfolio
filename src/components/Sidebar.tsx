import {
  LayoutDashboard,
  FileText,
  Briefcase,
  Settings,
  LogOut,
  ExternalLink,
} from "lucide-react";
import { View } from "../App";

interface SidebarProps {
  currentView: View;
  onViewChange: (view: View) => void;
  onLogout: () => void;
  onViewWebsite: () => void;
}

export function Sidebar({
  currentView,
  onViewChange,
  onLogout,
  onViewWebsite,
}: SidebarProps) {
  const menuItems = [
    { id: "dashboard" as View, label: "Dashboard", icon: LayoutDashboard },
    { id: "blogs" as View, label: "Blog Posts", icon: FileText },
    { id: "projects" as View, label: "Projects", icon: Briefcase },
  ];

  return (
    <div className="w-64 bg-gray-900 text-white flex flex-col">
      <div className="p-6">
        <h1 className="text-xl">Admin Panel</h1>
        <p className="text-gray-400 text-sm mt-1">ERP Developer Portfolio</p>
      </div>

      <nav className="flex-1 px-3">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive =
            currentView === item.id ||
            (currentView === "blog-editor" && item.id === "blogs") ||
            (currentView === "project-editor" && item.id === "projects");

          return (
            <button
              key={item.id}
              onClick={() => onViewChange(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg mb-1 transition-colors ${
                isActive
                  ? "bg-blue-600 text-white"
                  : "text-gray-300 hover:bg-gray-800"
              }`}
            >
              <Icon className="w-5 h-5" />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>

      <div className="p-3 border-t border-gray-800">
        <button
          onClick={onViewWebsite}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-gray-300 hover:bg-gray-800 transition-colors mb-2"
        >
          <ExternalLink className="w-5 h-5" />
          <span>View Website</span>
        </button>
        <button
          onClick={() => onViewChange("settings")}
          className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
            currentView === "settings"
              ? "bg-blue-600 text-white"
              : "text-gray-300 hover:bg-gray-800"
          }`}
        >
          <Settings className="w-5 h-5" />
          <span>Settings</span>
        </button>
        <button
          onClick={onLogout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-gray-300 hover:bg-gray-800 transition-colors"
        >
          <LogOut className="w-5 h-5" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
}
