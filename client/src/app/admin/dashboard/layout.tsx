// "use client";

// import { ReactNode } from "react";
// import { useRouter, usePathname } from "next/navigation";
// import {
//   LayoutDashboard,
//   CheckCircle,
//   Users,
//   Settings,
//   LogOut,
// } from "lucide-react";

// const menu = [
//   {
//     label: "Dashboard",
//     icon: LayoutDashboard,
//     path: "/admin/dashboard",
//   },
//   {
//     label: "Approvals",
//     icon: CheckCircle,
//     path: "/admin/dashboard/approvals",
//   },
//   {
//     label: "Users",
//     icon: Users,
//     path: "/admin/dashboard/users",
//   },
//   {
//     label: "Settings",
//     icon: Settings,
//     path: "/admin/dashboard/settings",
//   },
// ];

// export default function AdminLayout({ children }: { children: ReactNode }) {
//   const router = useRouter();
//   const pathname = usePathname();

//   const logout = () => {
//     localStorage.removeItem("token");
//     router.replace("/admin/auth/login");
//   };

//   return (
//     <div className="min-h-screen flex bg-gradient-to-br from-black via-gray-900 to-black text-white">
      
//       {/* SIDEBAR */}
//       <aside className="w-64 bg-black/40 border-r border-white/10 backdrop-blur-lg p-6">
//         <h1 className="text-xl font-bold mb-8">CareerCompass</h1>

//         <nav className="space-y-2">
//           {menu.map((item) => {
//             const active = pathname === item.path;
//             const Icon = item.icon;

//             return (
//               <button
//                 key={item.path}
//                 onClick={() => router.push(item.path)}
//                 className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg transition text-sm
//                   ${
//                     active
//                       ? "bg-indigo-600"
//                       : "hover:bg-white/10"
//                   }`}
//               >
//                 <Icon size={18} />
//                 {item.label}
//               </button>
//             );
//           })}
//         </nav>

//         {/* LOGOUT */}
//         <button
//           onClick={logout}
//           className="mt-10 w-full flex items-center gap-3 px-4 py-2 rounded-lg text-sm hover:bg-red-500/20 text-red-400"
//         >
//           <LogOut size={18} />
//           Logout
//         </button>
//       </aside>

//       {/* MAIN */}
//       <main className="flex-1 p-8">{children}</main>
//     </div>
//   );
// }

// "use client";

// import { ReactNode, useState } from "react";
// import { useRouter, usePathname } from "next/navigation";
// import {
//   LayoutDashboard,
//   CheckCircle,
//   Users,
//   Settings,
//   LogOut,
//   Menu,
//   X,
// } from "lucide-react";

// const menu = [
//   {
//     label: "Dashboard",
//     icon: LayoutDashboard,
//     path: "/admin/dashboard",
//   },
//   {
//     label: "Approvals",
//     icon: CheckCircle,
//     path: "/admin/dashboard/approvals",
//   },
//   {
//     label: "Users",
//     icon: Users,
//     path: "/admin/dashboard/users",
//   },
//   {
//     label: "Settings",
//     icon: Settings,
//     path: "/admin/dashboard/settings",
//   },
// ];

// export default function AdminLayout({ children }: { children: ReactNode }) {
//   const router = useRouter();
//   const pathname = usePathname();
//   const [open, setOpen] = useState(false);

//   const logout = () => {
//     localStorage.removeItem("token");
//     router.replace("/admin/auth/login");
//   };

//   return (
//     <div className="min-h-screen flex bg-gradient-to-br from-black via-gray-900 to-black text-white">

//       {/* MOBILE OVERLAY */}
//       {open && (
//         <div
//           className="fixed inset-0 bg-black/50 z-40 sm:hidden"
//           onClick={() => setOpen(false)}
//         />
//       )}

//       {/* SIDEBAR */}
//       <aside
//         className={`fixed z-50 inset-y-0 left-0 w-64
//         bg-black/40 border-r border-white/10 backdrop-blur-lg p-6
//         transform transition-transform duration-300
//         ${open ? "translate-x-0" : "-translate-x-full"}
//         sm:translate-x-0 sm:static`}
//       >
//         {/* MOBILE CLOSE */}
//         <div className="flex items-center justify-between mb-6 sm:hidden">
//           <h1 className="text-lg font-bold">CareerCompass</h1>
//           <button onClick={() => setOpen(false)}>
//             <X size={20} />
//           </button>
//         </div>

//         {/* DESKTOP LOGO */}
//         <h1 className="text-xl font-bold mb-8 hidden sm:block">
//           CareerCompass
//         </h1>

//         <nav className="space-y-2">
//           {menu.map((item) => {
//             const active = pathname === item.path;
//             const Icon = item.icon;

//             return (
//               <button
//                 key={item.path}
//                 onClick={() => {
//                   router.push(item.path);
//                   setOpen(false);
//                 }}
//                 className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg transition text-sm
//                   ${active ? "bg-indigo-600" : "hover:bg-white/10"}`}
//               >
//                 <Icon size={18} />
//                 {item.label}
//               </button>
//             );
//           })}
//         </nav>

//         {/* LOGOUT */}
//         <button
//           onClick={logout}
//           className="mt-10 w-full flex items-center gap-3 px-4 py-2 rounded-lg text-sm hover:bg-red-500/20 text-red-400"
//         >
//           <LogOut size={18} />
//           Logout
//         </button>
//       </aside>

//       {/* MAIN AREA */}
//       <div className="flex-1 flex flex-col">

//         {/* MOBILE HEADER */}
//         <header className="flex items-center gap-3 p-4 border-b border-white/10 sm:hidden">
//           <button onClick={() => setOpen(true)}>
//             <Menu size={22} />
//           </button>
//           <h1 className="font-semibold">Admin Panel</h1>
//         </header>

//         {/* CONTENT */}
//         <main className="flex-1 w-full p-4 sm:p-8 overflow-x-hidden">{children}</main>
//       </div>
//     </div>
//   );
// }

"use client";

import { ReactNode, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import {
  LayoutDashboard,
  CheckCircle,
  Users,
  Settings,
  LogOut,
  Menu,
  X,
} from "lucide-react";

const menu = [
  { label: "Dashboard", icon: LayoutDashboard, path: "/admin/dashboard" },
  { label: "Approvals", icon: CheckCircle, path: "/admin/dashboard/approvals" },
  { label: "Users", icon: Users, path: "/admin/dashboard/users" },
  { label: "Settings", icon: Settings, path: "/admin/dashboard/settings" },
];

export default function AdminLayout({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const logout = () => {
    localStorage.removeItem("token");
    router.replace("/admin/auth/login");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white">

      {/* MOBILE OVERLAY */}
      {open && (
        <div
          className="fixed inset-0 bg-black/60 z-40 sm:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* SIDEBAR */}
      <aside
        className={`fixed top-0 left-0 h-full w-64 z-50
        bg-black/40 border-r border-white/10 backdrop-blur-lg p-6
        transform transition-transform duration-300
        ${open ? "translate-x-0" : "-translate-x-full"}
        sm:translate-x-0`}
      >
        {/* MOBILE CLOSE */}
        <div className="flex items-center justify-between mb-6 sm:hidden">
          <h1 className="text-lg font-bold">CareerCompass</h1>
          <button onClick={() => setOpen(false)}>
            <X size={20} />
          </button>
        </div>

        {/* DESKTOP LOGO */}
        <h1 className="text-xl font-bold mb-8 hidden sm:block">
          CareerCompass
        </h1>

        <nav className="space-y-2">
          {menu.map((item) => {
            const Icon = item.icon;
            const active = pathname === item.path;

            return (
              <button
                key={item.path}
                onClick={() => {
                  router.push(item.path);
                  setOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg transition text-sm
                ${active ? "bg-indigo-600" : "hover:bg-white/10"}`}
              >
                <Icon size={18} />
                {item.label}
              </button>
            );
          })}
        </nav>

        <button
          onClick={logout}
          className="mt-10 w-full flex items-center gap-3 px-4 py-2 rounded-lg text-sm hover:bg-red-500/20 text-red-400"
        >
          <LogOut size={18} />
          Logout
        </button>
      </aside>

      {/* MAIN CONTENT */}
      <div className="sm:ml-64">

        {/* MOBILE HEADER */}
        <header className="flex items-center gap-3 p-4 border-b border-white/10 sm:hidden">
          <button onClick={() => setOpen(true)}>
            <Menu size={22} />
          </button>
          <h1 className="font-semibold">Admin Panel</h1>
        </header>

        <main className="p-4 sm:p-8 w-full">
          {children}
        </main>

      </div>
    </div>
  );
}