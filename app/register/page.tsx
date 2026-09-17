"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
import Container from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import { Mail, Lock, User, ArrowRight } from "lucide-react";

const RegisterPage = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      return toast.error("Passwords do not match");
    }
    setLoading(true);
    try {
      const response = await axios.post("/api/auth/register", {
        name: formData.name,
        email: formData.email,
        password: formData.password,
      });
      toast.success(`Account created! Welcome, ${response.data.name}.`);
      router.push("/");
      router.refresh();
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-brand-cream min-h-[80vh] flex items-center py-12">
      <Container className="flex justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md bg-brand-white p-8 md:p-12 shadow-sm border border-brand-black/5"
        >
          <div className="text-center mb-10">
            <h1 className="text-4xl font-serif mb-3">Join the Club</h1>
            <p className="text-brand-black/40 text-xs uppercase tracking-widest font-bold">
              Access the latest collections and exclusive offers
            </p>
          </div>

          <form onSubmit={handleRegister} className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-widest font-bold text-brand-black/60">Full Name</label>
              <div className="relative">
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-transparent border-b border-brand-black/10 py-3 pl-8 focus:outline-none focus:border-brand-gold transition-colors text-sm"
                  placeholder="Jane Doe"
                />
                <User className="absolute left-0 top-1/2 -translate-y-1/2 text-brand-black/20" size={18} />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-widest font-bold text-brand-black/60">Email Address</label>
              <div className="relative">
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-transparent border-b border-brand-black/10 py-3 pl-8 focus:outline-none focus:border-brand-gold transition-colors text-sm"
                  placeholder="name@example.com"
                />
                <Mail className="absolute left-0 top-1/2 -translate-y-1/2 text-brand-black/20" size={18} />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-widest font-bold text-brand-black/60">Password</label>
              <div className="relative">
                <input
                  type="password"
                  required
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full bg-transparent border-b border-brand-black/10 py-3 pl-8 focus:outline-none focus:border-brand-gold transition-colors text-sm"
                  placeholder="••••••••"
                />
                <Lock className="absolute left-0 top-1/2 -translate-y-1/2 text-brand-black/20" size={18} />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-widest font-bold text-brand-black/60">Confirm Password</label>
              <div className="relative">
                <input
                  type="password"
                  required
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                  className="w-full bg-transparent border-b border-brand-black/10 py-3 pl-8 focus:outline-none focus:border-brand-gold transition-colors text-sm"
                  placeholder="••••••••"
                />
                <Lock className="absolute left-0 top-1/2 -translate-y-1/2 text-brand-black/20" size={18} />
              </div>
            </div>

            <Button size="lg" className="w-full group" disabled={loading}>
              {loading ? "Creating Account..." : (
                <div className="flex items-center justify-between w-full">
                  <span>Register</span>
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </div>
              )}
            </Button>
          </form>

          <div className="mt-10 text-center">
            <p className="text-sm text-brand-black/60">
              Already have an account?{" "}
              <Link href="/login" className="font-bold text-brand-black hover:text-brand-gold transition-colors">
                Sign In Instead
              </Link>
            </p>
          </div>
        </motion.div>
      </Container>
    </div>
  );
};

export default RegisterPage;
