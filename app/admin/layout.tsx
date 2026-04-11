"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { 
  LayoutDashboard, 
  ShoppingBag, 
  Users, 
  ClipboardList, 
  Settings, 
  LogOut,
  ChevronRight,
  Menu,
  X
} from "lucide-react";
import axios from "axios";
import toast from "react-hot-toast";

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  useEffect(() => {
    const checkAdmin = async () => {
      try {
        const response = await axios.get("/api/auth/me");
        if (response.data.role !== "admin") {
          toast.error("Unauthorized Access");
          router.push("/dashboard");
        } else {
          setLoading(false);
        }
      } catch (error) {
        router.push("/login?redirect=admin");
      }
    };
    checkAdmin();
  }, [router]);

  const menuItems = [
    { name: "Overview", href: "/admin", icon: LayoutDashboard },
    { name: "Products", href: "/admin/products", icon: ShoppingBag },
    { name: "Orders", href: "/admin/orders", icon: ClipboardList },
    { name: "Users", href: "/admin/users", icon: Users },
  ];

  if (loading) return (
    <div className="min-h-screen bg-brand-white flex items-center justify-center">
      <div className="text-sm uppercase tracking-widest font-bold animate-pulse">Entering Secure Admin Area...</div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#f1f1f1] flex">
      {/* Sidebar */}
      <aside className={`bg-brand-black text-brand-white transition-all duration-300 ${isSidebarOpen ? 'w-64' : 'w-20'} hidden lg:flex flex-col`}>
        <div className="p-6 border-b border-white/10 flex items-center justify-between">
          <Link href="/" className={`${isSidebarOpen ? 'block' : 'hidden'} font-serif text-xl`}>
            LUXE<span className="text-brand-gold">ADMIN</span>
          </Link>
          <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="p-1 hover:text-brand-gold">
            <Menu size={20} />
          </button>
        </div>

        <nav className="flex-grow py-6">
          {menuItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-4 px-6 py-4 transition-all hover:bg-white/5 ${
                pathname === item.href ? 'border-r-4 border-brand-gold bg-white/5 text-brand-gold' : 'text-white/60'
              }`}
            >
              <item.icon size={20} />
              <span className={`${isSidebarOpen ? 'block' : 'hidden'} text-xs font-bold uppercase tracking-widest`}>{item.name}</span>
            </Link>
          ))}
        </nav>

        <div className="p-6 border-t border-white/10">
          <button 
            onClick={() => router.push("/")}
            className="flex items-center gap-4 text-white/40 hover:text-white transition-all text-xs font-bold uppercase tracking-widest"
          >
            <LogOut size={18} />
            <span className={`${isSidebarOpen ? 'block' : 'hidden'}`}>Exit Portal</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-grow overflow-auto h-screen">
        <header className="bg-brand-white h-20 border-b border-brand-black/5 flex items-center justify-between px-8 lg:px-12">
          <div className="lg:hidden flex items-center gap-4">
             <button onClick={() => setIsSidebarOpen(true)}><Menu size={24} /></button>
             <h2 className="font-serif text-lg">LUXEADMIN</h2>
          </div>
          <div className="flex-grow hidden lg:block" />
          <div className="flex items-center gap-6">
            <div className="text-right hidden sm:block">
              <p className="text-[10px] uppercase font-bold text-brand-black/40">System Role</p>
              <p className="text-xs font-bold uppercase tracking-widest">Administrator</p>
            </div>
            <div className="w-10 h-10 bg-brand-black rounded-full flex items-center justify-center text-white font-bold">A</div>
          </div>
        </header>

        <div className="p-8 lg:p-12 max-w-7xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
