"use client";

import React from "react";
import { LayoutGrid, List, Filter } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";


interface ProductToolbarProps {
  viewMode: "grid" | "list";
  setViewMode: (mode: "grid" | "list") => void;
  sortValue: string;
  setSortValue: (value: string) => void;
  productCount: number;
  onFilterClick?: () => void;
}

const ProductToolbar = ({
  viewMode,
  setViewMode,
  sortValue,
  setSortValue,
  productCount,
  onFilterClick,
}: ProductToolbarProps) => {
  const sortOptions = [
    { label: "Newest", value: "newest" },
    { label: "Price: Low to High", value: "price-low" },
    { label: "Price: High to Low", value: "price-high" },
    { label: "Rating", value: "rating" },
  ];

  return (
    <div className="relative z-20 mb-12">
      {/* Premium Glassmorphism Container */}
      <div className="flex flex-col lg:flex-row justify-between items-center py-4 px-6 bg-brand-white/40 backdrop-blur-md border border-brand-black/[0.05] shadow-sm gap-6 lg:gap-0">
        
        {/* Left Section: Filter & View Toggle */}
        <div className="flex items-center space-x-8 w-full lg:w-auto">
          {/* Mobile Filter Trigger */}
          <button
            onClick={onFilterClick}
            className="flex items-center space-x-3 text-[10px] uppercase tracking-[0.2em] font-bold hover:text-brand-gold transition-all group"
          >
            <div className="bg-brand-black text-brand-white p-2 group-hover:bg-brand-gold transition-colors">
              <Filter size={14} />
            </div>
            <span>Filters</span>
          </button>

          <div className="h-4 w-[1px] bg-brand-black/10 hidden md:block" />

          {/* View Selection Toggle */}
          <div className="flex items-center p-1 bg-brand-black/5 rounded-none border border-brand-black/[0.03]">
            <button
              onClick={() => setViewMode("grid")}
              className={cn(
                "relative p-2 transition-all duration-300",
                viewMode === "grid" ? "text-brand-white" : "text-brand-black/40 hover:text-brand-black"
              )}
            >
              <LayoutGrid size={18} className="relative z-10" />
              {viewMode === "grid" && (
                <motion.div
                  layoutId="activeView"
                  className="absolute inset-0 bg-brand-black shadow-lg"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={cn(
                "relative p-2 transition-all duration-300",
                viewMode === "list" ? "text-brand-white" : "text-brand-black/40 hover:text-brand-black"
              )}
            >
              <List size={18} className="relative z-10" />
              {viewMode === "list" && (
                <motion.div
                  layoutId="activeView"
                  className="absolute inset-0 bg-brand-black shadow-lg"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
            </button>
          </div>
        </div>

        {/* Dynamic Gradient Divider Line (Mobile hidden) */}
        <div className="flex-1 max-w-[200px] h-[1px] bg-gradient-to-r from-transparent via-brand-black/5 to-transparent hidden xl:block mx-8" />

        {/* Right Section: Sorting & Count */}
        <div className="flex items-center justify-between lg:justify-end gap-10 w-full lg:w-auto">
          {/* Count Indicator */}
          <div className="flex flex-col items-end">
            <span className="text-[9px] uppercase tracking-[0.3em] text-brand-black/30 font-bold mb-0.5">Availability</span>
            <span className="text-[10px] font-bold tracking-widest text-brand-black">
              {productCount} <span className="font-normal text-brand-black/40 italic">Pieces</span>
            </span>
          </div>

          <div className="h-8 w-[1px] bg-brand-black/5 hidden sm:block" />

          {/* Sort Dropdown */}
          <div className="flex items-center space-x-3">
            <span className="hidden sm:inline-block text-[9px] uppercase tracking-[0.3em] text-brand-black/40 font-bold">SortBy:</span>
            <Select value={sortValue} onValueChange={(val) => { if (val !== null) setSortValue(val); }}>
              <SelectTrigger className="w-[160px] bg-transparent border-none shadow-none text-[10px] uppercase font-bold tracking-[0.2em] focus:ring-0 px-0 h-auto gap-3 text-brand-black hover:text-brand-gold transition-colors">
                <SelectValue placeholder="Newest" />
              </SelectTrigger>
              <SelectContent className="bg-brand-white border-brand-black/5 rounded-none shadow-2xl p-0 overflow-hidden">
                {sortOptions.map(opt => (
                  <SelectItem
                    key={opt.value}
                    value={opt.value}
                    className="text-[10px] uppercase tracking-[0.2em] font-bold py-4 cursor-pointer rounded-none hover:bg-brand-gold/5 focus:bg-brand-gold/10 transition-colors border-b border-brand-black/[0.02] last:border-0"
                  >
                    {opt.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Subtle Bottom Accent Gradient */}
      <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-brand-gold/20 to-transparent" />
    </div>
  );
};

export default ProductToolbar;
