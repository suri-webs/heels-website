"use client";

import React from "react";
import NextImage from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

const Hero = () => {
  return (
    <section className="relative h-[90vh] min-h-[600px] w-full overflow-hidden bg-brand-cream">
      {/* Background Image / Overlay */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <NextImage
          src="/assets/hero.png"
          alt="Luxury Heels Collection"
          fill
          priority
          loading="eager"
          sizes="100vw"
          className="object-cover object-center grayscale-[20%] brightness-[0.85]"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-brand-black/40 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 h-full max-w-7xl mx-auto px-6 md:px-12 flex flex-col justify-center items-start">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-2xl"
        >
          <span className="text-brand-gold font-medium uppercase tracking-[0.3em] text-xs mb-4 block">
            The 2026 Collection
          </span>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif text-white mb-6 leading-[1.1] tracking-tight">
            Elegance <br />
            <span className="italic">Redefined.</span>
          </h1>
          <p className="text-brand-cream/80 text-lg md:text-xl mb-10 max-w-lg leading-relaxed">
            Discover the epitome of handcrafted luxury. From timeless stilettos to modern block heels,
            designed for the woman who never settles.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/shop">
              <Button size="lg" className="w-full sm:w-auto">
                Shop Collection
              </Button>
            </Link>
            <Link href="/shop?category=new">
              <Button variant="outline" size="lg" className="w-full sm:w-auto border-white text-white hover:bg-white hover:text-brand-black">
                New Arrivals
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 hidden md:block"
      >
        <div className="w-[1px] h-16 bg-white/30 relative">
          <div className="absolute top-0 left-0 w-full h-1/2 bg-white" />
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
