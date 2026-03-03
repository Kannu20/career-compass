"use client";

import { ReactNode } from "react";
import MentorSidebar from "@/components/layout/MentorSidebar/Sidebar";
import Navbar from "@/components/layout/Navbar";

export default function MentorLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen bg-black text-white">
      <MentorSidebar />

      <div className="flex-1 flex flex-col">
        <Navbar />
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
}
