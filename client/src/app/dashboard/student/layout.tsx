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

        {/* MOBILE OVERLAY */}
        {open && (
          <div
            className="fixed inset-0 bg-black/50 z-40 sm:hidden"
            onClick={() => setOpen(false)}
          />
        )}

        {/* SIDEBAR */}
        <div
          className={`fixed z-50 inset-y-0 left-0 transform 
        ${open ? "translate-x-0" : "-translate-x-full"}
        transition-transform duration-300
        sm:translate-x-0 sm:static sm:z-auto`}
        >
          <Sidebar />
        </div>

        {/* MAIN CONTENT */}
        <div className="flex-1">

          {/* MOBILE HEADER */}
          <header className="flex items-center gap-3 p-4 border-b border-white/10 sm:hidden">
            <button onClick={() => setOpen(true)}>
              <Menu size={22} />
            </button>

            <h1 className="font-semibold">CareerCompass</h1>
          </header>

          <main className="p-4 sm:p-6">{children}</main>
        </div>
      </div>
    </div>
    // </ProtectedRoute>
  );
}