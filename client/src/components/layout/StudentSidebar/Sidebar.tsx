// "use client";

// import Link from "next/link";
// import { usePathname } from "next/navigation";
// import {
//   LayoutDashboard,
//   ClipboardList,
//   FolderKanban,
//   FileText,
//   User,
// } from "lucide-react";

// const menuItems = [
//   {
//     label: "Dashboard",
//     href: "/dashboard/student",
//     icon: LayoutDashboard,
//   },
//   {
//     label: "Tests",
//     href: "/dashboard/student/tests",
//     icon: ClipboardList,
//   },
//   {
//     label: "Projects",
//     href: "/dashboard/student/projects",
//     icon: FolderKanban,
//   },
//   {
//     label: "Resume",
//     href: "/dashboard/student/resume",
//     icon: FileText,
//   },
//   {
//     label: "Profile",
//     href: "/dashboard/student/profile",
//     icon: User,
//   },
// ];

// export default function StudentSidebar() {
//   const pathname = usePathname();

//   return (
//     <aside className="h-full p-4">
//       {/* LOGO */}
//       <div className="mb-8 text-xl font-semibold tracking-wide">
//         CareerCompass
//       </div>

//       {/* MENU */}
//       <nav className="space-y-1">

//         {menuItems.map((item) => {
//   const isActive =
//     item.href === "/dashboard/student"
//       ? pathname === item.href
//       : pathname === item.href || pathname.startsWith(item.href + "/");

//   return (
//     <Link
//       key={item.label}
//       href={item.href}
//       className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition
//         ${
//           isActive
//             ? "bg-indigo-600 text-white"
//             : "text-gray-300 hover:bg-white/5 hover:text-white"
//         }`}
//     >
//       <item.icon size={18} />
//       {item.label}
//     </Link>
//   );
// })}

//       </nav>
//     </aside>
//   );
// }

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  ClipboardList,
  FolderKanban,
  FileText,
  User,
  X,
} from "lucide-react";

const menuItems = [
  { label: "Dashboard", href: "/dashboard/student", icon: LayoutDashboard },
  { label: "Tests", href: "/dashboard/student/tests", icon: ClipboardList },
  { label: "Projects", href: "/dashboard/student/projects", icon: FolderKanban },
  { label: "Resume", href: "/dashboard/student/resume", icon: FileText },
  { label: "Profile", href: "/dashboard/student/profile", icon: User },
];

export default function StudentSidebar({
  closeSidebar,
}: {
  closeSidebar?: () => void;
}) {
  const pathname = usePathname();

  return (
    <aside className="h-full w-64 p-4 bg-gradient-to-b from-black to-slate-900">

      {/* HEADER */}
      <div className="flex items-center justify-between mb-8">

        <h2 className="text-lg font-semibold">CareerCompass</h2>

        <button
          className="sm:hidden"
          onClick={closeSidebar}
        >
          <X size={20} />
        </button>

      </div>

      {/* MENU */}
      <nav className="space-y-1">

        {menuItems.map((item) => {
          const isActive =
            item.href === "/dashboard/student"
              ? pathname === item.href
              : pathname === item.href ||
                pathname.startsWith(item.href + "/");

          return (
            <Link
              key={item.label}
              href={item.href}
              onClick={closeSidebar}
              className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition
                ${
                  isActive
                    ? "bg-indigo-600 text-white"
                    : "text-gray-300 hover:bg-white/5 hover:text-white"
                }`}
            >
              <item.icon size={18} />
              {item.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
