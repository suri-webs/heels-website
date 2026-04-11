"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import Container from "@/components/ui/Container";
import ProductCard from "@/components/ui/ProductCard";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const FeaturedProducts = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const response = await axios.get("/api/products?featured=true");
        setProducts(response.data.slice(0, 4));
      } catch (error) {
        console.error("Error fetching featured products:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchFeatured();
  }, []);

  return (
    <section className="py-24 bg-brand-cream">
      <Container>
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 px-4 gap-8">
          <div className="max-w-md">
            <h2 className="text-4xl md:text-5xl font-serif mb-4">Timeless Classics</h2>
            <p className="text-brand-black/60 uppercase tracking-widest text-xs">
              Handpicked favorites from our most iconic collections.
            </p>
          </div>
          <Link href="/shop" className="group flex items-center gap-2 text-xs uppercase tracking-widest font-bold hover:text-brand-gold transition-colors">
            View All Collection
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="aspect-[3/4] bg-brand-white animate-pulse" />
            ))}
          </div>
        ) : products.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        ) : (
          <div className="bg-brand-white/50 border border-brand-black/5 p-12 text-center">
            <p className="text-sm uppercase tracking-widest text-brand-black/40">Our artisans are preparing new pieces...</p>
            <p className="text-[10px] mt-2 text-brand-black/20 font-bold uppercase tracking-tighter">(No featured products found. Please visit /api/seed to populate the store)</p>
          </div>
        )}
      </Container>
    </section>
  );
};

export default FeaturedProducts;
