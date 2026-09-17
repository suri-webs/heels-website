"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import Container from "@/components/ui/Container";
import { Filter } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import ProductToolbar from "@/components/shop/ProductToolbar";
import ProductGridView from "@/components/shop/ProductGridView";
import ProductListView from "@/components/shop/ProductListView";
const ShopPage = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState("all");
  const [sort, setSort] = useState("newest");
  const [isFilterOpen, setIsFilterOpen] = useState(true);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);

  const categories = ["all", "stiletto", "block", "bridal", "party", "boots"];

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

  // Sidebar Filter Component used in both Desktop layout & Mobile Sheet
  const FilterContent = () => (
    <Accordion defaultValue={["categories"]} className="w-full">
      <AccordionItem value="categories" className="border-b-brand-black/5">
        <AccordionTrigger className="text-sm uppercase tracking-widest font-bold hover:no-underline">
          Categories
        </AccordionTrigger>
        <AccordionContent>
          <div className="flex flex-col space-y-3 pt-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  setCategory(cat);
                  setIsMobileFiltersOpen(false);
                }}
                className={cn(
                  "text-left text-sm uppercase tracking-widest transition-colors",
                  category === cat ? "text-brand-gold font-bold" : "text-brand-black/60 hover:text-brand-black"
                )}
              >
                {cat}
              </button>
            ))}
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );

  return (
    <div className="bg-brand-cream min-h-screen pt-12 pb-24">
      <Container>
        {/* Page Header */}
        <div className="mb-12 text-center lg:text-left">
          <div className="inline-block px-4 py-1.5 bg-brand-gold/10 text-brand-gold text-[10px] uppercase font-bold tracking-[0.3em] mb-6">
            L'Atelier De Luxe
          </div>
          <h1 className="text-5xl md:text-7xl font-serif mb-6">The Collection</h1>
          <p className="text-brand-black/50 max-w-2xl uppercase tracking-[0.2em] text-[10px] md:text-xs leading-relaxed">
            Meticulously handcrafted heels designed for timeless elegance.
            Discover our curated series of silhouettes from the 2026 runway.
          </p>
        </div>

        {/* Premium Toolbar Component */}
        <ProductToolbar
          viewMode={viewMode}
          setViewMode={setViewMode}
          sortValue={sort}
          setSortValue={setSort}
          productCount={products.length}
          onFilterClick={() => setIsMobileFiltersOpen(true)}
        />

        {/* Mobile Filter Sheet */}
        <Sheet open={isMobileFiltersOpen} onOpenChange={setIsMobileFiltersOpen}>
          <SheetContent side="left" className="w-[300px] sm:w-[350px] bg-brand-white border-none p-0">
            <SheetHeader className="p-8 border-b border-brand-black/[0.03]">
              <div className="text-[10px] uppercase tracking-[0.4em] text-brand-black/30 font-bold mb-2">Select Style</div>
              <SheetTitle className="text-left font-serif text-3xl">Filters</SheetTitle>
            </SheetHeader>
            <div className="p-8">
              <FilterContent />

              <div className="mt-12 h-[1px] bg-gradient-to-r from-brand-black/5 via-brand-black/10 to-transparent" />

              <div className="mt-8 space-y-6">
                <p className="text-[10px] uppercase tracking-widest font-bold text-brand-black/40">Status</p>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                  <span className="text-[10px] uppercase tracking-widest font-bold">New Arrivals Available</span>
                </div>
              </div>
            </div>
          </SheetContent>
        </Sheet>

        {/* Filters and Layout Grid */}
        <div className="flex flex-col lg:flex-row gap-16 items-start">
          {/* Desktop Filters Sidebar */}
          <AnimatePresence initial={false}>
            {isFilterOpen && (
              <motion.div
                initial={{ width: 0, opacity: 0, x: -20 }}
                animate={{ width: "240px", opacity: 1, x: 0 }}
                exit={{ width: 0, opacity: 0, x: -20 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="overflow-hidden hidden lg:block flex-shrink-0 sticky top-24"
              >
                <div className="w-[200px]">
                  <div className="flex items-center justify-between mb-8 pb-4 border-b border-brand-black/5">
                    <span className="text-[10px] uppercase tracking-[0.3em] font-bold">Menu</span>
                    <button
                      onClick={() => setIsFilterOpen(false)}
                      className="text-[9px] uppercase font-bold text-brand-black/30 hover:text-brand-black"
                    >
                      Hide
                    </button>
                  </div>
                  <FilterContent />
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {!isFilterOpen && (
            <button
              onClick={() => setIsFilterOpen(true)}
              className="hidden lg:flex fixed left-8 top-1/2 -rotate-90 origin-left items-center gap-4 text-[10px] uppercase tracking-[0.3em] font-bold text-brand-black/40 hover:text-brand-black transition-all z-30"
            >
              <div className="w-8 h-[1px] bg-brand-gold/30" />
              Explore Filters
            </button>
          )}

          {/* Product Results */}
          <div className="flex-1 w-full min-w-0">
            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-y-16 gap-x-8">
                {[1, 2, 3, 4, 5, 6, 7, 8].map(i => (
                  <div key={i} className="space-y-6">
                    <div className="aspect-4/5 bg-brand-black/[0.03] animate-pulse rounded-none" />
                    <div className="space-y-3">
                      <div className="h-3 w-1/4 bg-brand-black/[0.03] animate-pulse" />
                      <div className="h-6 w-3/4 bg-brand-black/[0.05] animate-pulse" />
                      <div className="h-4 w-1/3 bg-brand-black/[0.03] animate-pulse" />
                    </div>
                  </div>
                ))}
              </div>
            ) : products.length > 0 ? (
              <AnimatePresence mode="wait">
                {viewMode === "grid" ? (
                  <ProductGridView key="grid" products={products} />
                ) : (
                  <ProductListView key="list" products={products} />
                )}
              </AnimatePresence>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col items-center justify-center py-32 text-center bg-brand-white/30 border border-brand-black/[0.03]"
              >
                <div className="w-20 h-20 rounded-full border border-brand-black/[0.05] flex items-center justify-center mb-10 text-brand-black/10">
                  <Filter size={32} />
                </div>
                <h3 className="text-3xl font-serif mb-4">No silhouettes found</h3>
                <p className="text-brand-black/40 mb-10 max-w-sm text-sm uppercase tracking-widest leading-relaxed">
                  Try adjusting your filters or search criteria to explore our collection.
                </p>
                <Button
                  onClick={() => { setCategory("all"); setSort("newest"); }}
                >
                  Reset All Filters
                </Button>
              </motion.div>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
};

export default ShopPage;
