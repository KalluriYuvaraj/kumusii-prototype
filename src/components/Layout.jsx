import { NavLink, Outlet } from "react-router-dom";
import { Home, ListChecks, Store, LayoutDashboard, Search } from "lucide-react";

const navItems = [
  { to: "/", icon: Home, label: "Home" },
  { to: "/lists", icon: ListChecks, label: "Lists" },
  { to: "/merchant", icon: Store, label: "Merchant" },
  { to: "/admin", icon: LayoutDashboard, label: "Admin" },
];

export default function Layout() {
  return (
    <div className="min-h-full flex flex-col bg-slate-50">
      {/* Top bar */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur border-b border-slate-200">
        <div className="max-w-3xl mx-auto px-4 h-14 flex items-center justify-between">
          <NavLink to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-teal-600 flex items-center justify-center text-white font-bold text-sm">
              K
            </div>
            <span className="font-semibold text-slate-900 tracking-tight">
              Kumusii
            </span>
          </NavLink>
          <div className="text-xs text-slate-500 font-medium">
            Prototype · Demo
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1 max-w-3xl w-full mx-auto px-4 py-4 pb-24">
        <Outlet />
      </main>

      {/* Bottom nav — mobile first */}
      <nav className="fixed bottom-0 inset-x-0 z-40 bg-white border-t border-slate-200 safe-area-pb">
        <div className="max-w-3xl mx-auto flex justify-around h-16">
          {navItems.map(({ to, icon: Icon, label }) => (
            <NavLink
              key={to}
              to={to}
              end={to === "/"}
              className={({ isActive }) =>
                `flex flex-col items-center justify-center flex-1 gap-0.5 text-xs font-medium transition-colors ${
                  isActive ? "text-teal-600" : "text-slate-400 hover:text-slate-600"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <Icon
                    size={22}
                    strokeWidth={isActive ? 2.25 : 1.75}
                    className={isActive ? "text-teal-600" : ""}
                  />
                  <span>{label}</span>
                </>
              )}
            </NavLink>
          ))}
        </div>
      </nav>
    </div>
  );
}
