"use client";

import React from "react";
import NextImage from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Eye, Heart, ShoppingBag, Star } from "lucide-react";
import { cn } from "@/lib/utils";
import { useCart } from "@/lib/store/useCart";
import { useWishlist } from "@/lib/store/useWishlist";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/Button";

interface ProductListViewProps {
  products: any[];
}

const ProductListView = ({ products }: ProductListViewProps) => {
  const { addItem } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  const handleQuickAdd = (product: any) => {
    addItem({
      _id: product._id,
      name: product.name,
      price: product.price,
      image: product.images[0],
      size: "38",
      quantity: 1,
    });
    toast.success(`${product.name} added to bag`, {
      style: {
        borderRadius: "0",
        background: "#1a1a1a",
        color: "#fff",
        fontSize: "12px",
        textTransform: "uppercase",
        letterSpacing: "1px",
      },
    });
  };

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, x: -20 },
    show: { opacity: 1, x: 0 },
  };

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="flex flex-col gap-8"
    >
      {products.map((product) => {
        const isFavorited = isInWishlist(product._id);

        return (
          <motion.div
            key={product._id}
            variants={item}
            className="group flex flex-col sm:flex-row bg-brand-white border border-brand-black/[0.03] overflow-hidden hover:shadow-xl transition-all duration-500"
          >
            {/* Image Section */}
            <div className="relative w-full sm:w-72 md:w-80 aspect-4/5 sm:aspect-square overflow-hidden bg-brand-cream flex-shrink-0">
              <Link href={`/product/${product._id}`} className="block h-full w-full">
                <NextImage
                  src={product.images[0]}
                  alt={product.name}
                  fill
                  className="object-cover transition-transform duration-1000 group-hover:scale-105"
                />
              </Link>
              
              <button
                onClick={() =>
                  toggleWishlist({
                    _id: product._id,
                    name: product.name,
                    price: product.price,
                    image: product.images[0],
                    category: product.category,
                  })
                }
                className={cn(
                  "absolute top-4 left-4 transition-all z-10 p-2.5 rounded-full backdrop-blur-md",
                  isFavorited ? "text-brand-gold bg-brand-white/80" : "text-brand-black/40 bg-brand-white/40 hover:text-brand-gold"
                )}
              >
                <Heart size={16} fill={isFavorited ? "currentColor" : "none"} />
              </button>
            </div>

            {/* Content Section */}
            <div className="flex-1 p-8 md:p-10 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-brand-black/30">
                    {product.category}
                  </span>
                  <div className="h-[1px] w-8 bg-brand-gold/20" />
                  <div className="flex items-center text-brand-gold">
                    <Star size={12} fill="currentColor" />
                    <span className="text-[10px] ml-1.5 font-bold text-brand-black">{product.rating}</span>
                  </div>
                </div>

                <Link href={`/product/${product._id}`}>
                  <h3 className="text-2xl md:text-3xl font-serif text-brand-black mb-4 group-hover:text-brand-gold transition-colors">
                    {product.name}
                  </h3>
                </Link>

                <p className="text-brand-black/50 text-sm leading-relaxed max-w-xl line-clamp-2 md:line-clamp-3 mb-8">
                  {product.description}
                </p>
              </div>

              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 border-t border-brand-black/[0.05] pt-8">
                <p className="text-2xl font-bold tracking-tighter text-brand-black">
                  ${product.price.toLocaleString()}
                </p>

                <div className="flex items-center gap-4">
                  <Link href={`/product/${product._id}`}>
                    <Button variant="outline" className="border-brand-black/10 hover:border-brand-black px-6">
                      <Eye size={16} className="mr-2" />
                      Details
                    </Button>
                  </Link>
                  <Button
                    onClick={() => handleQuickAdd(product)}
                    className="flex-grow sm:flex-none"
                  >
                    <ShoppingBag size={16} className="mr-2" />
                    Add to Bag
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        );
      })}
    </motion.div>
  );
};

export default ProductListView;
