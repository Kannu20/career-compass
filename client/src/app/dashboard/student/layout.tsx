// "use client";

// import Navbar from "@/components/layout/Navbar";
// import Sidebar from "@/components/layout/StudentSidebar/Sidebar";
// import { useState } from "react";
// import { Menu } from "lucide-react";
// export default function DashboardLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   const [open, setOpen] = useState(false);
//   return (
//     // <ProtectedRoute>
//     <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white">
//       <Navbar />
//       {/* 
//         <div className="flex">
//           <Sidebar />

//           <main className="flex-1 p-6">{children}</main>
//         </div> */}
//       <div className="flex min-h-screen bg-black text-white">

//         {/* Overlay */}
//         {open && (
//           <div
//             className="fixed inset-0 bg-black/60 z-40 sm:hidden"
//             onClick={() => setOpen(false)}
//           />
//         )}

//         {/* Sidebar */}
//         <div
//           className={`top-0 left-0  h-full w-64 z-50
//         bg-black/40 border-r border-white/10 backdrop-blur-lg p-6
//         transform transition-transform duration-300
//         ${open ? "translate-x-0" : "-translate-x-full"}
//         sm:translate-x-0`}
//         >
//           <Sidebar closeSidebar={() => setOpen(false)} />
//         </div>

//         {/* Main Content */}
//         <div className="flex-1">

//           {/* Mobile Header */}
//           <header className="flex items-center justify-between p-4 border-b border-white/10 sm:hidden">

//             <button onClick={() => setOpen(true)}>
//               <Menu size={22} />
//             </button>

//             <h1 className="font-semibold">CareerCompass</h1>

//             <div className="w-6" />
//           </header>

//           <main className="p-4 sm:p-6">{children}</main>
//         </div>
//       </div>
//     </div>
//     // </ProtectedRoute>
//   );
// }

"use client";

import Navbar from "@/components/layout/Navbar";
import Sidebar from "@/components/layout/StudentSidebar/Sidebar";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  // Lock body scroll when mobile sidebar is open
  useEffect(() => {
    if (!mounted) return;
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open, mounted]);

  // Close sidebar on resize to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) setOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white antialiased">
      {/* Top Navbar */}
      <Navbar />

      <div className="flex h-[calc(100vh-56px)] relative">

        {/* ── Backdrop overlay (mobile only) ── */}
        <div
          onClick={() => setOpen(false)}
          className={`
            fixed inset-0 top-[56px] z-40 bg-black/70 backdrop-blur-sm
            transition-opacity duration-300 md:hidden
            ${open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}
          `}
          aria-hidden="true"
        />

        {/* ── Sidebar ── */}
        <aside
          className={`
            fixed top-[56px] left-0 z-50 h-[calc(100vh-56px)] w-64
            flex flex-col
            bg-[#0d0d14] border-r border-white/[0.06]
            shadow-[4px_0_24px_rgba(0,0,0,0.4)]
            transition-transform duration-300 ease-in-out
            md:translate-x-0 md:sticky md:top-0 md:shadow-none
            ${open ? "translate-x-0" : "-translate-x-full"}
          `}
        >
          {/* Sidebar top accent line */}
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-violet-500/60 via-indigo-500/40 to-transparent" />

          {/* Close button — mobile only */}
          <button
            onClick={() => setOpen(false)}
            className="
              absolute top-3 right-3 md:hidden
              w-7 h-7 flex items-center justify-center
              rounded-md text-white/40 hover:text-white hover:bg-white/10
              transition-colors duration-150
            "
            aria-label="Close sidebar"
          >
            <X size={16} />
          </button>

          <Sidebar closeSidebar={() => setOpen(false)} />
        </aside>

        {/* ── Main content area ── */}
        <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">

          {/* Mobile top bar */}
          <header className="
            sticky top-0 z-30 flex items-center gap-3 px-4 py-3
            bg-[#0a0a0f]/90 backdrop-blur-md
            border-b border-white/[0.06]
            md:hidden
          ">
            <button
              onClick={() => setOpen(true)}
              className="
                w-9 h-9 flex items-center justify-center rounded-lg
                bg-white/[0.06] hover:bg-white/[0.10]
                border border-white/[0.08]
                text-white/70 hover:text-white
                transition-all duration-150 active:scale-95
              "
              aria-label="Open sidebar"
            >
              <Menu size={18} />
            </button>

            <span className="text-[15px] font-semibold tracking-tight text-white/90">
              CareerCompass
            </span>

            {/* Subtle accent dot */}
            <span className="w-1.5 h-1.5 rounded-full bg-violet-500 animate-pulse" />
          </header>

          {/* Page content */}
          <main className="flex-1 p-4 sm:p-6 lg:p-8">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}