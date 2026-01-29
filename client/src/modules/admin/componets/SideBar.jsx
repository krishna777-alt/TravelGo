import { NavLink } from "react-router-dom";

const navItems = [
  { name: "Dashboard", path: "/admin", icon: "📊" },
  { name: "Places", path: "/admin/managePlaces", icon: "📍" },
  { name: "Hotels", path: "/admin/hotels", icon: "🏨" },
  { name: "Reviews", path: "/admin/reviews", icon: "⭐" },
  { name: "Users", path: "/admin/users", icon: "👥" },
  { name: "Settings", path: "/admin/settings", icon: "⚙️" },
];

function AdminSidebar() {
  return (
    <aside className="w-64 min-h-screen bg-gray-900 text-gray-300 flex flex-col">
      {/* Header */}
      <div className="px-6 py-5 border-b border-gray-800">
        <h1 className="text-xl font-semibold tracking-wide text-white">
          AdminPanel
        </h1>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-6 space-y-1">
        {navItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            end
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium
               transition-all duration-200
               ${
                 isActive
                   ? "bg-blue-600 text-white shadow-md"
                   : "text-gray-300 hover:bg-gray-800 hover:text-white"
               }`
            }
          >
            <span className="text-lg">{item.icon}</span>
            <span>{item.name}</span>
          </NavLink>
        ))}
      </nav>

      {/* Footer */}
      <div className="px-6 py-4 border-t border-gray-800 text-xs text-gray-400">
        © 2026 Admin
      </div>
    </aside>
  );
}

export default AdminSidebar;
