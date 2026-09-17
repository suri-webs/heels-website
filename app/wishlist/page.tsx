"use client";

import React, { useEffect, useState } from "react";
import Container from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import NextImage from "next/image";
import Link from "next/link";
import { Trash2, ShoppingBag, Heart } from "lucide-react";
import { useWishlist } from "@/lib/store/useWishlist";
import { useCart } from "@/lib/store/useCart";
import toast from "react-hot-toast";

const WishlistPage = () => {
  const { items, removeFromWishlist } = useWishlist();
  const { addItem } = useCart();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const handleAddToCart = (product: any) => {
    addItem({
      _id: product._id,
      name: product.name,
      price: product.price,
      image: product.image,
      size: "38",
      quantity: 1,
    });
    toast.success("Added to Bag");
  };

  return (
    <div className="bg-brand-cream min-h-screen pt-24 pb-12">
      <Container>
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 px-4 gap-4">
            <div>
              <h1 className="text-4xl md:text-5xl font-serif mb-2">My Wishlist</h1>
              <p className="text-xs uppercase tracking-widest text-brand-black/40 font-bold">
                {items.length} {items.length === 1 ? 'PIECE' : 'PIECES'} SAVED
              </p>
            </div>
          </div>

          {items.length === 0 ? (
            <div className="bg-brand-white p-20 text-center border border-brand-black/5">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-brand-cream border border-brand-black/5 mb-6 text-brand-black/20">
                <Heart size={32} />
              </div>
              <h2 className="text-2xl font-serif mb-6 text-brand-black">Your wishlist is empty</h2>
              <p className="text-brand-black/40 text-sm mb-10 max-w-sm mx-auto uppercase tracking-widest leading-relaxed">
                Save your favorite pieces from our latest collection to see them here.
              </p>
              <Link href="/shop">
                <Button>Explore Collection</Button>
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-4">
              {items.map((item) => (
                <div key={item._id} className="group relative bg-brand-white border border-brand-black/5 shadow-sm transition-all hover:shadow-md">
                  <div className="relative aspect-[4/5] overflow-hidden bg-brand-cream">
                    <Link href={`/product/${item._id}`}>
                      <NextImage
                        src={item.image}
                        alt={item.name}
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                    </Link>
                    <button
                      onClick={() => removeFromWishlist(item._id)}
                      className="absolute top-4 right-4 bg-brand-white p-2 text-brand-black/30 hover:text-red-500 transition-colors shadow-sm"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>

                  <div className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <p className="text-[10px] uppercase tracking-widest text-brand-black/40 mb-1">{item.category}</p>
                        <h3 className="text-lg font-serif">
                          <Link href={`/product/${item._id}`}>{item.name}</Link>
                        </h3>
                      </div>
                      <p className="font-bold tracking-tighter text-brand-black">${item.price.toLocaleString()}</p>
                    </div>

                    <button
                      onClick={() => handleAddToCart(item)}
                      className="w-full h-12 flex items-center justify-center gap-2 bg-brand-black text-brand-white text-xs uppercase font-bold tracking-widest hover:bg-brand-gold transition-colors"
                    >
                      <ShoppingBag size={18} />
                      Add to Bag
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </Container>
    </div>
  );
};

export default WishlistPage;
