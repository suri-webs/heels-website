"use client";

import React from "react";
import NextImage from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Eye, Heart, Star } from "lucide-react";
import { cn } from "@/lib/utils";
import { useCart } from "@/lib/store/useCart";
import { useWishlist } from "@/lib/store/useWishlist";
import toast from "react-hot-toast";

interface ProductCardProps {
  product: {
    _id: string;
    name: string;
    description: string;
    price: number;
    images: string[];
    rating: number;
    category: string;
  };
}

const ProductCard = ({ product }: ProductCardProps) => {
  const { addItem } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  const handleQuickAdd = () => {
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
        borderRadius: '0',
        background: '#1a1a1a',
        color: '#fff',
        fontSize: '12px',
        textTransform: 'uppercase',
        letterSpacing: '1px'
      }
    });
  };

  const isFavorited = isInWishlist(product._id);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="group relative bg-brand-white"
    >
      {/* Image Container */}
      <div className="relative aspect-4/5 overflow-hidden bg-brand-cream border border-brand-black/3">
        <Link href={`/product/${product._id}`} className="block h-full w-full relative">
          <NextImage
            src={product.images[0]}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
            className="object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
          />
          {/* Subtle Overlay on image */}
          <div className="absolute inset-0 bg-brand-black/0 group-hover:bg-brand-black/5 transition-colors duration-500" />
        </Link>

        {/* Action Buttons Layer */}
        <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[0.16, 1, 0.3, 1] z-10 flex gap-2">
          <button
            onClick={handleQuickAdd}
            className="flex-grow bg-brand-white text-brand-black text-[10px] uppercase font-bold tracking-[0.2em] py-3 hover:bg-brand-black hover:text-brand-white transition-all shadow-xl"
          >
            Quick Add
          </button>
          <Link
            href={`/product/${product._id}`}
            className="bg-brand-white text-brand-black p-3 hover:bg-brand-gold hover:text-brand-white transition-all shadow-xl"
          >
            <Eye size={16} />
          </Link>
        </div>

        {/* Wishlist Icon Top Right */}
        <button
          onClick={() => toggleWishlist({
            _id: product._id,
            name: product.name,
            price: product.price,
            image: product.images[0],
            category: product.category
          })}
          className={cn(
            "absolute top-4 right-4 transition-colors z-10 p-2 rounded-full",
            isFavorited ? "text-brand-gold bg-white/40 backdrop-blur-sm" : "text-brand-black/40 hover:text-brand-gold"
          )}
        >
          <Heart size={18} fill={isFavorited ? "currentColor" : "none"} />
        </button>
      </div>

      {/* Info Section */}
      <div className="pt-6 pb-2 space-y-3 px-1">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-[9px] uppercase tracking-[0.3em] font-bold text-brand-black/40">{product.category}</span>
            <div className="h-[1px] w-4 bg-brand-gold/30" />
          </div>
          <Link href={`/product/${product._id}`}>
            <h3 className="text-xl font-serif text-brand-black group-hover:text-brand-gold transition-colors leading-tight">
              {product.name}
            </h3>
          </Link>
        </div>

        <div className="flex items-center justify-between mt-2 border-t border-brand-black/[0.03] pt-4">
          <p className="text-lg font-bold tracking-tighter text-brand-black">
            ${product.price.toLocaleString()}
          </p>

          <div className="flex items-center space-x-1">
            <div className="flex items-center text-brand-gold">
              <Star size={10} fill="currentColor" />
              <span className="text-[10px] ml-1 font-bold text-brand-black">{product.rating}</span>
            </div>
            <span className="text-brand-black/10 text-[10px]">|</span>
            <span className="text-[9px] uppercase tracking-widest text-brand-black/40 font-bold">In Stock</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
