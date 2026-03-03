"use client";

import Link from "next/link";
import {
  LayoutDashboard,
  ClipboardList,
  Users,
  User,
} from "lucide-react";
import { JSX } from "react";

export default function MentorSidebar() {
  return (
    <aside className="w-64 bg-gradient-to-b from-black to-slate-900 border-r border-white/10 p-4">
      <h2 className="text-lg font-semibold mb-6">CareerCompass</h2>

      <nav className="space-y-2">
        <SidebarLink
          href="/dashboard/mentor"
          label="Dashboard"
          icon={<LayoutDashboard size={18} />}
        />

        <SidebarLink
          href="/dashboard/mentor/tests"
          label="Tests"
          icon={<ClipboardList size={18} />}
        />

        <SidebarLink
          href="/dashboard/mentor/students"
          label="Students"
          icon={<Users size={18} />}
        />

        <SidebarLink
          href="/dashboard/mentor/profile"
          label="Profile"
          icon={<User size={18} />}
        />
      </nav>
    </aside>
  );
}

function SidebarLink({
  href,
  label,
  icon,
}: {
  href: string;
  label: string;
  icon: JSX.Element;
}) {
  return (
    <Link
      href={href}
      className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-gray-300 hover:bg-white/10 transition"
    >
      {icon}
      {label}
    </Link>
  );
}
