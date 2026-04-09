// "use client";

// import Link from "next/link";
// import {
//   LayoutDashboard,
//   Users,
//   UserCheck,
//   ClipboardList,
//   User,
// } from "lucide-react";
// import { JSX } from "react";

// export default function TPOSidebar() {
//   return (
//     <aside className="w-64 bg-gradient-to-b from-black to-slate-900 border-r border-white/10 p-4">
//       <h2 className="text-lg font-semibold mb-6">CareerCompass</h2>

//       <nav className="space-y-2">
//         <NavItem
//           href="/dashboard/tpo"
//           icon={<LayoutDashboard size={18} />}
//           label="Dashboard"
//         />

//         <NavItem
//           href="/dashboard/tpo/students"
//           icon={<Users size={18} />}
//           label="Students"
//         />

//         <NavItem
//           href="/dashboard/tpo/mentors"
//           icon={<UserCheck size={18} />}
//           label="Mentors"
//         />

//         <NavItem
//           href="/dashboard/tpo/shortlist"
//           icon={<ClipboardList size={18} />}
//           label="Shortlist"
//         />

//         {/* PROFILE */}
//         <NavItem
//           href="/dashboard/tpo/profile"
//           icon={<User size={18} />}
//           label="Profile"
//         />
//       </nav>
//     </aside>
//   );
// }

// function NavItem({
//   href,
//   icon,
//   label,
// }: {
//   href: string;
//   icon: JSX.Element;
//   label: string;
// }) {
//   return (
//     <Link
//       href={href}
//       className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-gray-300 hover:bg-white/10 transition"
//     >
//       {icon}
//       {label}
//     </Link>
//   );
// }

"use client";

import Link from "next/link";
import {
  LayoutDashboard,
  Users,
  UserCheck,
  ClipboardList,
  User,
  X,
} from "lucide-react";
import { JSX } from "react";

export default function TPOSidebar({
  closeSidebar,
}: {
  closeSidebar?: () => void;
}) {
  return (
    <aside
      className="
      w-64
      bg-gradient-to-b
      from-black
      to-slate-900
      border-r
      border-white/10
      p-4
      min-h-screen
      overflow-y-auto
    "
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-white">
          CareerCompass
        </h2>

        {/* Mobile Close Button */}
        <button
          className="sm:hidden"
          onClick={closeSidebar}
        >
          <X size={20} />
        </button>
      </div>

      <nav className="space-y-2">
        <NavItem
          href="/dashboard/tpo"
          icon={<LayoutDashboard size={18} />}
          label="Dashboard"
          closeSidebar={closeSidebar}
        />

        <NavItem
          href="/dashboard/tpo/students"
          icon={<Users size={18} />}
          label="Students"
          closeSidebar={closeSidebar}
        />

        <NavItem
          href="/dashboard/tpo/mentors"
          icon={<UserCheck size={18} />}
          label="Mentors"
          closeSidebar={closeSidebar}
        />

        <NavItem
          href="/dashboard/tpo/shortlist"
          icon={<ClipboardList size={18} />}
          label="Shortlist"
          closeSidebar={closeSidebar}
        />

        <NavItem
          href="/dashboard/tpo/profile"
          icon={<User size={18} />}
          label="Profile"
          closeSidebar={closeSidebar}
        />
      </nav>
    </aside>
  );
}

function NavItem({
  href,
  icon,
  label,
  closeSidebar,
}: {
  href: string;
  icon: JSX.Element;
  label: string;
  closeSidebar?: () => void;
}) {
  return (
    <Link
      href={href}
      onClick={closeSidebar}
      className="
        flex
        items-center
        gap-3
        px-3
        py-2
        rounded-lg
        text-sm
        text-gray-300
        hover:bg-white/10
        transition
        w-full
      "
    >
      {icon}
      <span className="truncate">{label}</span>
    </Link>
  );
}