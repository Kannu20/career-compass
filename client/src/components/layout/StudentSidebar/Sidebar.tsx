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
} from "lucide-react";

const menuItems = [
  {
    label: "Dashboard",
    href: "/dashboard/student",
    icon: LayoutDashboard,
  },
  {
    label: "Tests",
    href: "/dashboard/student/tests",
    icon: ClipboardList,
  },
  {
    label: "Projects",
    href: "/dashboard/student/projects",
    icon: FolderKanban,
  },
  {
    label: "Resume",
    href: "/dashboard/student/resume",
    icon: FileText,
  },
  {
    label: "Profile",
    href: "/dashboard/student/profile",
    icon: User,
  },
];

export default function StudentSidebar() {
  const pathname = usePathname();

  return (
    <aside
      className="
        w-full
        sm:w-64
        h-full
        sm:min-h-screen
        p-4
        overflow-y-auto
      "
    >
      {/* LOGO */}
      <div className="mb-8 text-lg sm:text-xl font-semibold tracking-wide truncate">
        CareerCompass
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
              className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition w-full
                ${
                  isActive
                    ? "bg-indigo-600 text-white"
                    : "text-gray-300 hover:bg-white/5 hover:text-white"
                }`}
            >
              <item.icon size={18} />
              <span className="truncate">{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
