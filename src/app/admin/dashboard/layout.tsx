"use client";

import { ReactNode } from "react";
import { useRouter, usePathname } from "next/navigation";
import {
  LayoutDashboard,
  CheckCircle,
  Users,
  Settings,
  LogOut,
} from "lucide-react";

const menu = [
  {
    label: "Dashboard",
    icon: LayoutDashboard,
    path: "/admin/dashboard",
  },
  {
    label: "Approvals",
    icon: CheckCircle,
    path: "/admin/dashboard/approvals",
  },
  {
    label: "Users",
    icon: Users,
    path: "/admin/dashboard/users",
  },
  {
    label: "Settings",
    icon: Settings,
    path: "/admin/dashboard/settings",
  },
];

export default function AdminLayout({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();

  const logout = () => {
    localStorage.removeItem("token");
    router.replace("/admin/auth/login");
  };

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-black via-gray-900 to-black text-white">
      
      {/* SIDEBAR */}
      <aside className="w-64 bg-black/40 border-r border-white/10 backdrop-blur-lg p-6">
        <h1 className="text-xl font-bold mb-8">CareerCompass</h1>

        <nav className="space-y-2">
          {menu.map((item) => {
            const active = pathname === item.path;
            const Icon = item.icon;

            return (
              <button
                key={item.path}
                onClick={() => router.push(item.path)}
                className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg transition text-sm
                  ${
                    active
                      ? "bg-indigo-600"
                      : "hover:bg-white/10"
                  }`}
              >
                <Icon size={18} />
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* LOGOUT */}
        <button
          onClick={logout}
          className="mt-10 w-full flex items-center gap-3 px-4 py-2 rounded-lg text-sm hover:bg-red-500/20 text-red-400"
        >
          <LogOut size={18} />
          Logout
        </button>
      </aside>

      {/* MAIN */}
      <main className="flex-1 p-8">{children}</main>
    </div>
  );
}
