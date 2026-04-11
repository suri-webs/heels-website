"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { ClipboardList, ChevronRight, Eye, Truck, CheckCircle, Clock } from "lucide-react";
import toast from "react-hot-toast";

const AdminOrdersPage = () => {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get("/api/orders"); // In a real app, this would be an admin-all-orders endpoint.
        setOrders(response.data);
      } catch (error) {
        toast.error("Error loading orders");
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  const updateStatus = async (id: string, status: string) => {
    try {
      // Simulation of status update
      toast.success(`Order #${id.slice(-6)} status updated to ${status}`);
      setOrders(orders.map(o => o._id === id ? { ...o, status } : o));
    } catch (error) {
      toast.error("Failed to update status");
    }
  };

  if (loading) return (
     <div className="flex items-center justify-center p-20">
       <div className="w-10 h-10 border-4 border-brand-black border-t-transparent rounded-full animate-spin" />
     </div>
  );

  return (
    <div className="space-y-12">
      <div>
        <h1 className="text-4xl font-serif mb-2">Order Management</h1>
        <p className="text-xs uppercase tracking-widest text-brand-black/40 font-bold">Track and fulfill guest orders</p>
      </div>

      <div className="bg-brand-white border border-brand-black/5 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-brand-cream/30 text-[10px] uppercase tracking-widest font-bold text-brand-black/40 border-b border-brand-black/5">
                <th className="px-8 py-5">Order ID</th>
                <th className="px-8 py-5">Customer</th>
                <th className="px-8 py-5">Date</th>
                <th className="px-8 py-5">Status</th>
                <th className="px-8 py-5">Total</th>
                <th className="px-8 py-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-brand-black/5">
              {orders.map((order) => (
                <tr key={order._id} className="hover:bg-brand-cream/10 transition-colors group">
                  <td className="px-8 py-5">
                    <span className="text-sm font-bold font-sans">#{order._id.slice(-6)}</span>
                  </td>
                  <td className="px-8 py-5">
                    <div className="text-sm font-medium">Customer #{order.user.slice(-4)}</div>
                    <div className="text-[10px] text-brand-black/30 truncate max-w-[150px]">{order.shippingAddress.city}, {order.shippingAddress.country}</div>
                  </td>
                  <td className="px-8 py-5 text-sm">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-2">
                       <span className={`w-2 h-2 rounded-full ${order.status === 'Delivered' ? 'bg-green-500' : 'bg-brand-gold animte-pulse'}`} />
                       <span className="text-[10px] uppercase tracking-widest font-bold">{order.status || 'Processing'}</span>
                    </div>
                  </td>
                  <td className="px-8 py-5 text-sm font-bold tracking-tighter">${order.totalPrice.toLocaleString()}</td>
                  <td className="px-8 py-5">
                    <div className="flex items-center justify-end gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button 
                        onClick={() => updateStatus(order._id, "Shipped")}
                        className="p-2 hover:text-brand-gold transition-colors" 
                        title="Mark as Shipped"
                      >
                        <Truck size={18} />
                      </button>
                      <button 
                         onClick={() => updateStatus(order._id, "Delivered")}
                         className="p-2 hover:text-green-600 transition-colors" 
                         title="Mark as Delivered"
                      >
                        <CheckCircle size={18} />
                      </button>
                      <button className="p-2 hover:text-brand-black transition-colors" title="View Details">
                        <Eye size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminOrdersPage;
