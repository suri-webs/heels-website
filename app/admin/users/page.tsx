"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { Users, Shield, Trash2, Mail, UserPlus } from "lucide-react";
import toast from "react-hot-toast";

const AdminUsersPage = () => {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        // In a real app, we'd have an admin-all-users endpoint
        const response = await axios.get("/api/auth/me"); 
        setUsers([response.data]); // Simulating list with current user
      } catch (error) {
        toast.error("Error loading users");
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  if (loading) return (
     <div className="flex items-center justify-center p-20">
       <div className="w-10 h-10 border-4 border-brand-black border-t-transparent rounded-full animate-spin" />
     </div>
  );

  return (
    <div className="space-y-12">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-4xl font-serif mb-2">User Directory</h1>
          <p className="text-xs uppercase tracking-widest text-brand-black/40 font-bold">Manage global customer accounts</p>
        </div>
        <button className="flex items-center gap-2 bg-brand-black text-white px-6 py-3 text-[10px] uppercase font-bold tracking-widest hover:bg-brand-gold transition-all">
          <UserPlus size={16} />
          <span>Invite Guest</span>
        </button>
      </div>

      <div className="bg-brand-white border border-brand-black/5 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-brand-cream/30 text-[10px] uppercase tracking-widest font-bold text-brand-black/40 border-b border-brand-black/5">
                <th className="px-8 py-5">Guest</th>
                <th className="px-8 py-5">Role</th>
                <th className="px-8 py-5">Joined</th>
                <th className="px-8 py-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-brand-black/5">
              {users.map((user) => (
                <tr key={user._id} className="hover:bg-brand-cream/10 transition-colors group">
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-brand-gold/10 rounded-full flex items-center justify-center text-brand-gold font-bold">
                        {user.name.charAt(0)}
                      </div>
                      <div>
                        <p className="text-sm font-bold">{user.name}</p>
                        <p className="text-[10px] text-brand-black/30 truncate">{user.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-2">
                       <Shield size={14} className={user.role === 'admin' ? 'text-brand-gold' : 'text-brand-black/20'} />
                       <span className="text-[10px] uppercase tracking-widest font-bold">{user.role}</span>
                    </div>
                  </td>
                  <td className="px-8 py-5 text-sm text-brand-black/60">
                    {new Date(user.createdAt || Date.now()).toLocaleDateString()}
                  </td>
                  <td className="px-8 py-5">
                    <div className="flex items-center justify-end gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-2 hover:text-brand-gold transition-colors" title="Send Mail">
                        <Mail size={18} />
                      </button>
                      <button className="p-2 hover:text-red-500 transition-colors" title="Deactivate">
                        <Trash2 size={18} />
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

export default AdminUsersPage;
