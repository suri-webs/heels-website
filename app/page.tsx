"use client";

import React from "react";
import Hero from "@/components/home/Hero";
import CategorySection from "@/components/home/CategorySection";
import FeaturedProducts from "@/components/home/FeaturedProducts";

export default function Home() {
  return (
    <div className="flex flex-col w-full">
      <Hero />
      
      <CategorySection />

      <FeaturedProducts />

      {/* Newsletter / CTA Section */}
      <section className="py-24 bg-brand-black text-brand-white text-center">
        <div className="max-w-7xl mx-auto px-6">
          <span className="text-brand-gold uppercase tracking-[0.4em] text-[10px] mb-6 block">
            Never miss a step
          </span>
          <h2 className="text-4xl md:text-6xl font-serif mb-8 max-w-3xl mx-auto leading-tight">
            Be the first to know <br /> about <span className="italic text-brand-gold">new arrivals.</span>
          </h2>
          <form className="max-w-md mx-auto flex flex-col sm:flex-row gap-4">
            <input 
              type="email" 
              placeholder="Your email address"
              className="flex-grow bg-white/10 border-b border-white/20 py-4 px-6 focus:outline-none focus:border-brand-gold transition-colors text-brand-white"
            />
            <button className="bg-brand-white text-brand-black px-8 py-4 uppercase tracking-widest text-sm font-bold hover:bg-brand-gold hover:text-white transition-all">
              Subscribe
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}
