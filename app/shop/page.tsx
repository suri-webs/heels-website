"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import Container from "@/components/ui/Container";
import ProductCard from "@/components/ui/ProductCard";
import { Filter, ChevronDown, LayoutGrid, List } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const ShopPage = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState("all");
  const [sort, setSort] = useState("newest");
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const categories = ["all", "stiletto", "block", "bridal", "party", "boots"];
  const sortOptions = [
    { label: "Newest", value: "newest" },
    { label: "Price: Low to High", value: "price-low" },
    { label: "Price: High to Low", value: "price-high" },
    { label: "Rating", value: "rating" },
  ];

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`/api/products?category=${category}&sort=${sort}`);
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [category, sort]);

  return (
    <div className="bg-brand-cream min-h-screen pt-12 pb-24">
      <Container>
        {/* Page Header */}
        <div className="mb-12 text-center lg:text-left">
          <h1 className="text-4xl md:text-6xl font-serif mb-4">The Collection</h1>
          <p className="text-brand-black/60 max-w-2xl uppercase tracking-widest text-[10px] md:text-xs">
            Refined craftsmanship and timeless design. Discover our latest collection of luxury footwear.
          </p>
        </div>

        {/* Toolbar */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center py-6 border-y border-brand-black/10 mb-12 gap-6 lg:gap-0">
          <div className="flex items-center space-x-6 w-full lg:w-auto">
            <button 
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="flex items-center space-x-2 text-xs uppercase tracking-widest font-bold hover:text-brand-gold transition-colors"
            >
              <Filter size={16} />
              <span>{isFilterOpen ? "Close Filters" : "Filters"}</span>
            </button>
            <div className="h-4 w-[1px] bg-brand-black/10 hidden md:block" />
            <div className="hidden md:flex items-center space-x-4">
              <button className="text-brand-black lg:hover:text-brand-gold transition-colors"><LayoutGrid size={18} /></button>
              <button className="text-brand-black/30 lg:hover:text-brand-gold transition-colors"><List size={18} /></button>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-4 w-full lg:w-auto justify-between lg:justify-end">
            <div className="flex items-center space-x-2">
              <span className="text-[10px] uppercase tracking-widest text-brand-black/40">Sort By:</span>
              <select 
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="bg-transparent text-xs uppercase tracking-widest font-bold focus:outline-none cursor-pointer"
              >
                {sortOptions.map(opt => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
            </div>
            <p className="text-[10px] uppercase tracking-widest text-brand-black/40 font-medium">
              Showing {products.length} Products
            </p>
          </div>
        </div>

        {/* Filters and Grid */}
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Animated Sidebar Filters */}
          <AnimatePresence>
            {isFilterOpen && (
              <motion.div
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: "250px", opacity: 1 }}
                exit={{ width: 0, opacity: 0 }}
                className="overflow-hidden hidden lg:block"
              >
                <div className="space-y-10 pr-8 border-r border-brand-black/5">
                  <div>
                    <h3 className="text-sm uppercase tracking-widest font-bold mb-6">Categories</h3>
                    <div className="flex flex-col space-y-4">
                      {categories.map((cat) => (
                        <button
                          key={cat}
                          onClick={() => setCategory(cat)}
                          className={cn(
                            "text-left text-sm uppercase tracking-widest transition-colors",
                            category === cat ? "text-brand-gold font-bold" : "text-brand-black/60 hover:text-brand-black"
                          )}
                        >
                          {cat}
                        </button>
                      ))}
                    </div>
                  </div>
                  {/* More filters can be added here (Size, Color, Price Range) */}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Product Grid */}
          <div className="flex-1">
            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-12 gap-x-8">
                {[1, 2, 3, 4, 5, 6].map(i => (
                  <div key={i} className="space-y-4">
                    <div className="aspect-[3/4] bg-brand-white animate-pulse" />
                    <div className="h-4 w-2/3 bg-brand-white animate-pulse" />
                    <div className="h-4 w-1/3 bg-brand-white animate-pulse" />
                  </div>
                ))}
              </div>
            ) : products.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-12 gap-x-8">
                {products.map((product) => (
                  <ProductCard key={product._id} product={product} />
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-20 text-center">
                <h3 className="text-2xl font-serif mb-4">No Products Found</h3>
                <p className="text-brand-black/60 mb-8">Try adjusting your filters to find what you're looking for.</p>
                <button 
                  onClick={() => {setCategory("all"); setSort("newest");}}
                  className="bg-brand-black text-brand-white px-8 py-3 uppercase tracking-widest text-xs font-bold hover:bg-brand-gold transition-colors"
                >
                  Clear All Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
};

// Helper for inline cn since I can't import comfortably in this snippet without potential errors
const cn = (...classes: any[]) => classes.filter(Boolean).join(" ");

export default ShopPage;
