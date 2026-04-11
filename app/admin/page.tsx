"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import {
  DollarSign,
  ShoppingBag,
  Users,
  BarChart3,
  ArrowUpRight,
} from "lucide-react";

const AdminDashboardPage = () => {
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await axios.get("/api/admin/stats");
        setStats(response.data);
      } catch (error) {
        console.error("Error fetching stats:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  if (loading) return (
    <div className="flex items-center justify-center p-20">
      <div className="w-10 h-10 border-4 border-brand-black border-t-transparent rounded-full animate-spin" />
    </div>
  );

  const cards = [
    { label: "Total Revenue", value: `$${stats?.totalRevenue?.toLocaleString()}`, icon: DollarSign, color: "bg-green-100 text-green-600", trend: "+12.5%" },
    { label: "Total Orders", value: stats?.orderCount, icon: BarChart3, color: "bg-blue-100 text-blue-600", trend: "+5.2%" },
    { label: "Active Products", value: stats?.productCount, icon: ShoppingBag, color: "bg-purple-100 text-purple-600", trend: "Stable" },
    { label: "Registered Users", value: stats?.userCount, icon: Users, color: "bg-orange-100 text-orange-600", trend: "+2.1%" },
  ];

  return (
    <div className="space-y-12">
      <div>
        <h1 className="text-4xl font-serif mb-2">System Overview</h1>
        <p className="text-xs uppercase tracking-widest text-brand-black/40 font-bold">Business intelligence at a glance</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {cards.map((card) => (
          <div key={card.label} className="bg-brand-white p-8 border border-brand-black/5 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <div className={`p-4 ${card.color}`}>
                <card.icon size={24} />
              </div>
              <div className="flex items-center gap-1 text-[10px] font-bold text-green-600">
                <ArrowUpRight size={14} />
                <span>{card.trend}</span>
              </div>
            </div>
            <p className="text-[10px] uppercase font-bold text-brand-black/40 tracking-widest mb-1">{card.label}</p>
            <h3 className="text-3xl font-serif font-bold tracking-tighter">{card.value}</h3>
          </div>
        ))}
      </div>

      {/* Placeholder for Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pt-6">
        <div className="lg:col-span-2 bg-brand-white p-8 border border-brand-black/5">
          <h3 className="text-lg font-serif mb-6 pb-4 border-b border-brand-black/5">Revenue Trends</h3>
          <div className="h-64 flex items-end justify-between gap-2 px-2">
            {[40, 70, 45, 90, 65, 80, 50, 60, 85, 95, 75, 100].map((h, i) => (
              <div key={i} className="flex-grow bg-brand-black/5 hover:bg-brand-gold transition-colors" style={{ height: `${h}%` }} />
            ))}
          </div>
          <div className="flex justify-between mt-4 text-[8px] uppercase font-bold text-brand-black/30 tracking-widest px-2">
            <span>Jan</span><span>Feb</span><span>Mar</span><span>Apr</span><span>May</span><span>Jun</span><span>Jul</span><span>Aug</span><span>Sep</span><span>Oct</span><span>Nov</span><span>Dec</span>
          </div>
        </div>
        <div className="bg-brand-black text-brand-white p-8 flex flex-col justify-center items-center text-center">
          <h3 className="text-lg font-serif mb-4">Stock Alert</h3>
          <p className="text-sm text-white/60 mb-8">3 items are currently running low in stock. Please restock soon.</p>
          <button className="bg-brand-gold text-white px-8 py-3 text-[10px] uppercase font-bold tracking-widest hover:bg-white hover:text-brand-black transition-all">
            View Inventory
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardPage;
