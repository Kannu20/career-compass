"use client";

import Link from "next/link";
import {
  LayoutDashboard,
  Users,
  UserCheck,
  ClipboardList,
  User,
} from "lucide-react";

export default function TPOSidebar() {
  return (
    <aside className="w-64 bg-gradient-to-b from-black to-slate-900 border-r border-white/10 p-4">
      <h2 className="text-lg font-semibold mb-6">CareerCompass</h2>

      <nav className="space-y-2">
        <NavItem
          href="/dashboard/tpo"
          icon={<LayoutDashboard size={18} />}
          label="Dashboard"
        />

        <NavItem
          href="/dashboard/tpo/students"
          icon={<Users size={18} />}
          label="Students"
        />

        <NavItem
          href="/dashboard/tpo/mentors"
          icon={<UserCheck size={18} />}
          label="Mentors"
        />

        <NavItem
          href="/dashboard/tpo/shortlist"
          icon={<ClipboardList size={18} />}
          label="Shortlist"
        />

        {/* PROFILE */}
        <NavItem
          href="/dashboard/tpo/profile"
          icon={<User size={18} />}
          label="Profile"
        />
      </nav>
    </aside>
  );
}

function NavItem({
  href,
  icon,
  label,
}: {
  href: string;
  icon: JSX.Element;
  label: string;
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
