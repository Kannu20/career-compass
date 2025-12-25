// import ProtectedRoute from "@/components/layout/ProtectedRoute";
// import Navbar from "@/components/layout/Navbar";


// export default function DashboardLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   return (
//     <ProtectedRoute>
//       <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black">
//         <Navbar />
//         <main className="p-6">{children}</main>
//       </div>
//     </ProtectedRoute>
//   );
// }

import ProtectedRoute from "@/components/layout/ProtectedRoute";
import Navbar from "@/components/layout/Navbar";
import Sidebar from "@/components/layout/Sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white">
        <Navbar />

        <div className="flex">
          <Sidebar />

          <main className="flex-1 p-6">{children}</main>
        </div>
      </div>
    </ProtectedRoute>
  );
}
