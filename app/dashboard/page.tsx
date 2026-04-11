"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { User, Package, MapPin, LogOut, ChevronRight, Calendar, DollarSign } from "lucide-react";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import NextImage from "next/image";

const DashboardPage = () => {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("orders");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [userRes, ordersRes] = await Promise.all([
          axios.get("/api/auth/me"),
          axios.get("/api/orders")
        ]);
        setUser(userRes.data);
        setOrders(ordersRes.data);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
        router.push("/login");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [router]);

  const handleLogout = async () => {
    try {
      await axios.delete("/api/auth/me");
      toast.success("Logged out successfully");
      router.push("/login");
      router.refresh();
    } catch (error) {
      toast.error("Logout failed");
    }
  };

  if (loading) return (
    <div className="min-h-screen bg-brand-cream flex items-center justify-center">
      <div className="w-12 h-12 border-4 border-brand-gold border-t-transparent rounded-full animate-spin" />
    </div>
  );

  return (
    <div className="bg-brand-cream min-h-screen py-12 md:py-24">
      <Container>
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Sidebar */}
          <div className="lg:w-80 space-y-8">
            <div className="bg-brand-white p-8 border border-brand-black/5 text-center">
              <div className="w-20 h-20 bg-brand-gold/10 rounded-full flex items-center justify-center mx-auto mb-4 text-brand-gold">
                <User size={40} />
              </div>
              <h1 className="text-xl font-serif">{user?.name}</h1>
              <p className="text-xs text-brand-black/40 uppercase tracking-widest mt-1">{user?.email}</p>
              {user?.role === "admin" && (
                <div className="mt-4">
                  <span className="bg-brand-black text-brand-white text-[10px] uppercase tracking-widest px-3 py-1 font-bold">Admin</span>
                </div>
              )}
            </div>

            <div className="bg-brand-white border border-brand-black/5 overflow-hidden">
              {[
                { id: "orders", label: "My Orders", icon: Package },
                { id: "addresses", label: "Saved Addresses", icon: MapPin },
                { id: "profile", label: "Profile Settings", icon: User },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center justify-between p-5 text-xs uppercase tracking-widest font-bold transition-all border-b last:border-0 border-brand-black/5 ${
                    activeTab === tab.id ? 'bg-brand-black text-brand-white' : 'hover:bg-brand-black/5'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <tab.icon size={18} />
                    <span>{tab.label}</span>
                  </div>
                  <ChevronRight size={14} />
                </button>
              ))}
              <button 
                onClick={handleLogout}
                className="w-full flex items-center gap-4 p-5 text-xs uppercase tracking-widest font-bold text-red-500 hover:bg-red-50 transition-all"
              >
                <LogOut size={18} />
                <span>Logout</span>
              </button>
            </div>
            
            {user?.role === "admin" && (
              <Button onClick={() => router.push("/admin")} variant="outline" className="w-full">
                Admin Panel
              </Button>
            )}
          </div>

          {/* Main Content */}
          <div className="flex-grow">
            {activeTab === "orders" && (
              <div className="space-y-8">
                <h2 className="text-3xl font-serif">Order History</h2>
                {orders.length === 0 ? (
                  <div className="bg-brand-white p-12 text-center border border-brand-black/5">
                    <Package className="mx-auto mb-4 text-brand-black/10" size={48} />
                    <p className="text-brand-black/60 uppercase tracking-widest text-xs">No orders yet</p>
                    <Button onClick={() => router.push("/shop")} variant="outline" className="mt-6">Start Shopping</Button>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {orders.map((order) => (
                      <motion.div
                        key={order._id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-brand-white border border-brand-black/5 p-6 md:p-8"
                      >
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8 pb-6 border-b border-brand-black/5">
                          <div className="space-y-1">
                            <p className="text-[10px] uppercase tracking-widest text-brand-black/40 font-bold">Order ID: #{order._id.slice(-6)}</p>
                            <div className="flex items-center gap-3 text-sm">
                              <Calendar size={14} className="text-brand-black/20" />
                              <span>{new Date(order.createdAt).toLocaleDateString()}</span>
                            </div>
                          </div>
                          <div className="flex items-center gap-6">
                            <div className="text-right">
                              <p className="text-[10px] uppercase tracking-widest text-brand-black/40 font-bold">Status</p>
                              <span className={`text-[10px] uppercase tracking-widest font-bold ${order.isPaid ? 'text-green-600' : 'text-brand-gold'}`}>
                                {order.isPaid ? 'Paid' : 'Processing'}
                              </span>
                            </div>
                            <div className="text-right">
                              <p className="text-[10px] uppercase tracking-widest text-brand-black/40 font-bold">Total</p>
                              <span className="text-lg font-bold tracking-tighter">${order.totalPrice.toLocaleString()}</span>
                            </div>
                          </div>
                        </div>

                        <div className="flex gap-4 overflow-auto pb-4 custom-scrollbar">
                          {order.orderItems.map((item: any, idx: number) => (
                            <div key={idx} className="flex-shrink-0 w-20">
                              <div className="relative aspect-[3/4] bg-brand-cream border border-brand-black/5">
                                <NextImage src={item.image} alt={item.name} fill sizes="80px" className="object-cover" />
                              </div>
                              <p className="text-[8px] uppercase tracking-widest mt-2 truncate font-bold text-center">{item.name}</p>
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {activeTab === "addresses" && (
              <div className="space-y-8">
                <h2 className="text-3xl font-serif">Saved Addresses</h2>
                <div className="bg-brand-white p-12 text-center border border-brand-black/5">
                  <MapPin className="mx-auto mb-4 text-brand-black/10" size={48} />
                  <p className="text-brand-black/60 uppercase tracking-widest text-xs">Manage your shipping destinations</p>
                  <Button variant="outline" className="mt-6">Add New Address</Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
};

export default DashboardPage;
