"use client";

import React, { useEffect } from "react";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import Link from "next/link";
import { CheckCircle, ArrowRight, Package, Calendar } from "lucide-react";
import { useCart } from "@/lib/store/useCart";
import { motion } from "framer-motion";

const OrderSuccessPage = () => {
  const { clearCart } = useCart();

  useEffect(() => {
    // Clear cart when success page is reached
    clearCart();
  }, [clearCart]);

  return (
    <div className="bg-brand-cream min-h-screen py-24 md:py-32">
      <Container>
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-brand-gold text-white mb-10 shadow-xl"
          >
            <CheckCircle size={48} />
          </motion.div>

          <motion.h1 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-5xl md:text-7xl font-serif mb-6 text-brand-black"
          >
            Confirmed
          </motion.h1>

          <motion.p 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-xs uppercase tracking-[0.4em] font-bold text-brand-black/40 mb-16"
          >
            Your handcrafted pieces are being prepared
          </motion.p>

          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="bg-brand-white p-8 md:p-12 border border-brand-black/5 shadow-sm mb-16 space-y-8"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left border-b border-brand-black/5 pb-8">
              <div className="space-y-2">
                <p className="text-[10px] uppercase tracking-widest font-bold text-brand-black/40 flex items-center gap-2">
                    <Package size={14} /> Order Number
                </p>
                <p className="text-lg font-serif">#LX-{Math.random().toString(36).substr(2, 9).toUpperCase()}</p>
              </div>
              <div className="space-y-2">
                <p className="text-[10px] uppercase tracking-widest font-bold text-brand-black/40 flex items-center gap-2">
                    <Calendar size={14} /> Order Date
                </p>
                <p className="text-lg font-serif">{new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
              </div>
            </div>

            <div className="text-left space-y-4">
               <p className="text-sm italic text-brand-black/60 leading-relaxed">
                  A confirmation email has been sent to your registered address. 
                  Our artisans will notify you as soon as your selection leaves our flagship workshop.
               </p>
            </div>
          </motion.div>

          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-6"
          >
            <Link href="/shop" className="w-full sm:w-auto">
              <Button className="w-full sm:w-auto">Continue Shopping</Button>
            </Link>
            <Link href="/dashboard" className="group flex items-center gap-2 text-xs uppercase tracking-widest font-bold hover:text-brand-gold transition-colors">
              View Order Status
              <ArrowRight size={16} className="group-hover:translate-x-2 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </Container>
    </div>
  );
};

export default OrderSuccessPage;
