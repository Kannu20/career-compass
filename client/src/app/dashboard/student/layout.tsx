"use client";

import Navbar from "@/components/layout/Navbar";
import Sidebar from "@/components/layout/StudentSidebar/Sidebar";
import { useState } from "react";
import { Menu } from "lucide-react";
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  return (
    // <ProtectedRoute>
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white">
      <Navbar />
      {/* 
        <div className="flex">
          <Sidebar />

          <main className="flex-1 p-6">{children}</main>
        </div> */}
      <div className="flex min-h-screen bg-black text-white">

        {/* Overlay */}
        {open && (
          <div
            className="fixed inset-0 bg-black/60 z-40 sm:hidden"
            onClick={() => setOpen(false)}
          />
        )}

        {/* Sidebar */}
        <div
          className={`fixed top-0 left-0 h-full w-64 z-50
        bg-black/40 border-r border-white/10 backdrop-blur-lg p-6
        transform transition-transform duration-300
        ${open ? "translate-x-0" : "-translate-x-full"}
        sm:translate-x-0`}
        >
          <Sidebar closeSidebar={() => setOpen(false)} />
        </div>

        {/* Main Content */}
        <div className="flex-1">

          {/* Mobile Header */}
          <header className="flex items-center justify-between p-4 border-b border-white/10 sm:hidden">

            <button onClick={() => setOpen(true)}>
              <Menu size={22} />
            </button>

            <h1 className="font-semibold">CareerCompass</h1>

            <div className="w-6" />
          </header>

          <main className="p-4 sm:p-6">{children}</main>
        </div>
      </div>
    </div>
    // </ProtectedRoute>
  );
}