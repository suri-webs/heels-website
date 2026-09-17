"use client";

import React from "react";
import Container from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Mail, Phone, MapPin, MessageSquare, Clock } from "lucide-react";
import { motion } from "framer-motion";

const ContactPage = () => {
  return (
    <div className="bg-brand-cream min-h-screen py-12 md:py-24">
      <Container>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-20">
            <h1 className="text-5xl md:text-7xl font-serif mb-6">Concierge</h1>
            <p className="text-xs uppercase tracking-[0.4em] font-bold text-brand-black/40">Our artisans are here to assist you</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-brand-white p-8 md:p-12 shadow-sm border border-brand-black/5 h-fit"
            >
              <h2 className="text-2xl font-serif mb-8">Send a Message</h2>
              <form className="space-y-8">
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest font-bold text-brand-black/60">Full Name</label>
                  <input
                    type="text"
                    className="w-full bg-transparent border-b border-brand-black/10 py-3 focus:outline-none focus:border-brand-gold transition-colors text-sm"
                    placeholder="Enter your name"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest font-bold text-brand-black/60">Email Address</label>
                  <input
                    type="email"
                    className="w-full bg-transparent border-b border-brand-black/10 py-3 focus:outline-none focus:border-brand-gold transition-colors text-sm"
                    placeholder="Enter your email"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest font-bold text-brand-black/60">Inquiry Type</label>
                  <select className="w-full bg-transparent border-b border-brand-black/10 py-3 focus:outline-none focus:border-brand-gold transition-colors text-sm">
                    <option>General Inquiry</option>
                    <option>Order Status</option>
                    <option>Style Consultation</option>
                    <option>Returns & Exchanges</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest font-bold text-brand-black/60">Message</label>
                  <textarea
                    rows={4}
                    className="w-full bg-transparent border-b border-brand-black/10 py-3 focus:outline-none focus:border-brand-gold transition-colors text-sm resize-none"
                    placeholder="Tell us how we can help"
                  />
                </div>
                <Button className="w-full">Send Inquiry</Button>
              </form>
            </motion.div>

            {/* Info Section */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-12 py-6"
            >
              <div>
                <h2 className="text-sm uppercase tracking-widest font-bold mb-6 border-l-2 border-brand-gold pl-4">Global Headquarters</h2>
                <div className="space-y-4 text-brand-black/60">
                  <div className="flex items-start gap-4">
                    <MapPin size={20} className="text-brand-gold mt-1" />
                    <p className="text-sm italic">Via della Spiga, 12, 20121 Milano MI, Italy</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <Phone size={20} className="text-brand-gold" />
                    <p className="text-sm font-bold tracking-tighter">+39 02 1234 5678</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <Mail size={20} className="text-brand-gold" />
                    <p className="text-sm underline decoration-brand-gold/20">concierge@luxeheels.com</p>
                  </div>
                </div>
              </div>

              <div>
                <h2 className="text-sm uppercase tracking-widest font-bold mb-6 border-l-2 border-brand-gold pl-4">Support Hours</h2>
                <div className="space-y-2 text-brand-black/60">
                  <div className="flex items-center gap-4 text-sm">
                    <Clock size={18} className="text-brand-black/20" />
                    <span>Mon - Fri: 9:00 AM - 6:00 PM (CET)</span>
                  </div>
                  <div className="flex items-center gap-4 text-sm">
                    <MessageSquare size={18} className="text-brand-black/20" />
                    <span>Live Chat: Available Weekends</span>
                  </div>
                </div>
              </div>

              <div className="p-8 bg-brand-black text-brand-white">
                <h3 className="text-lg font-serif mb-4">Urgent Inquiries</h3>
                <p className="text-xs text-brand-white/60 leading-relaxed uppercase tracking-widest">
                  For immediate assistance regarding an active order, please call our 24/7 priority line at +1 (800) LUXE-SHIP
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default ContactPage;
