import Navbar from "@/components/layout/Navbar";
import TPOSidebar from "@/components/layout/TPOSidebar/Sidebar";
// import TPONavbar from "@/components/layout/TPONavbar/navbar";

export default function TPOLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-black text-white">
      <TPOSidebar />

      <div className="flex-1 flex flex-col">
        {/* <TPONavbar /> */}
        <Navbar/>
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
}
