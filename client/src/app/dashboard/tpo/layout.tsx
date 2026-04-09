// import Navbar from "@/components/layout/Navbar";
// import TPOSidebar from "@/components/layout/TPOSidebar/Sidebar";
// // import TPONavbar from "@/components/layout/TPONavbar/navbar";

// export default function TPOLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   return (
//     <div className="flex min-h-screen bg-black text-white">
//       <TPOSidebar />

//       <div className="flex-1 flex flex-col">
//         {/* <TPONavbar /> */}
//         <Navbar/>
//         <main className="p-6">{children}</main>
//       </div>
//     </div>
//   );
// }

"use client";

import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import TPOSidebar from "@/components/layout/TPOSidebar/Sidebar";

export default function TPOLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);

  return (
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
        className={`
        fixed inset-y-0 left-0 z-50 w-64
        transform transition-transform duration-300
        ${open ? "translate-x-0" : "-translate-x-full"}
        sm:translate-x-0 sm:static
        `}
      >
        <TPOSidebar closeSidebar={() => setOpen(false)} />
      </div>

      {/* Main */}
      <div className="flex-1 flex flex-col">

        {/* Navbar */}
        <Navbar />

        <main className="p-4 sm:p-6">{children}</main>

      </div>
    </div>
  );
}