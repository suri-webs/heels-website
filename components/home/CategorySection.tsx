"use client";

import React from "react";
import NextImage from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import Container from "@/components/ui/Container";

const categories = [
  {
    name: "The Classics",
    image: "/assets/stiletto-black.png",
    href: "/shop?category=stiletto",
    size: "large",
  },
  {
    name: "Modern Blocks",
    image: "/assets/block-tan.png",
    href: "/shop?category=block",
    size: "small",
  },
  {
    name: "Wedding Series",
    image: "/assets/bridal-silver.png",
    href: "/shop?category=bridal",
    size: "small",
  },
];

const CategorySection = () => {
  return (
    <section className="py-24 bg-brand-white">
      <Container>
        <div className="text-center mb-16 px-4">
          <h2 className="text-4xl md:text-5xl font-serif mb-4">The Collections</h2>
          <p className="text-brand-black/60 max-w-lg mx-auto uppercase tracking-widest text-xs">
            Explore our curated selection of premium handcrafted footwear.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((cat, idx) => (
            <motion.div
              key={cat.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              viewport={{ once: true }}
              className={cn(
                "group relative overflow-hidden aspect-[4/5] bg-brand-cream",
                cat.size === "large" ? "lg:col-span-1" : ""
              )}
            >
              <Link href={cat.href}>
                <div className="relative w-full h-full"> {/* Parent with relative position for Next/Image fill */}
                  <NextImage
                    src={cat.image}
                    alt={cat.name}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </div>
                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/30 transition-colors" />
                <div className="absolute inset-0 flex flex-col justify-end p-8">
                  <h3 className="text-2xl font-serif text-white mb-2">{cat.name}</h3>
                  <div className="w-10 h-[1px] bg-brand-gold transition-all duration-300 group-hover:w-full" />
                  <span className="text-white/80 text-xs uppercase tracking-widest mt-4 opacity-0 transform translate-y-4 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
                    Explore Now
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
};

// Helper for inline cn since I can't import comfortably in this snippet without potential errors
const cn = (...classes: any[]) => classes.filter(Boolean).join(" ");

export default CategorySection;
