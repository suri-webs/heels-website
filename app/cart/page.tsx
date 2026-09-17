"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import NextImage from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight, ArrowLeft } from "lucide-react";
import Container from "@/components/ui/Container";
import { useCart } from "@/lib/store/useCart";
import { Button } from "@/components/ui/Button";

const CartPage = () => {
  const { items, updateQuantity, removeItem, totalPrice, totalItems } = useCart();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  if (items.length === 0) {
    return (
      <div className="bg-brand-cream min-h-[70vh] flex flex-col items-center justify-center p-6 text-center">
        <div className="mb-8 text-brand-black/20">
          <ShoppingBag size={80} strokeWidth={1} />
        </div>
        <h1 className="text-4xl font-serif mb-4">Your bag is empty</h1>
        <p className="text-brand-black/60 mb-8 max-w-xs mx-auto">
          Whatever you're looking for, we've got the perfect pair waiting for you.
        </p>
        <Link href="/shop">
          <Button size="lg">Discover Collection</Button>
        </Link>
      </div>
    );
  }

  const subtotal = totalPrice();
  const shipping = subtotal > 500 ? 0 : 50;
  const tax = subtotal * 0.1; // 10% tax example
  const total = subtotal + shipping + tax;

  return (
    <div className="bg-brand-cream min-h-screen py-12 md:py-24">
      <Container>
        <div className="flex flex-col lg:flex-row gap-16">
          {/* Main Cart Items */}
          <div className="flex-1">
            <div className="flex items-center justify-between mb-12 pb-6 border-b border-brand-black/10">
              <h1 className="text-4xl font-serif">Your Bag ({totalItems()})</h1>
              <Link href="/shop" className="text-xs uppercase tracking-widest font-bold hover:text-brand-gold transition-colors flex items-center gap-2">
                <ArrowLeft size={14} />
                Continue Shopping
              </Link>
            </div>

            <div className="space-y-10">
              <AnimatePresence>
                {items.map((item) => (
                  <motion.div
                    key={`${item._id}-${item.size}`}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -100 }}
                    className="flex flex-col sm:flex-row gap-6 pb-10 border-b border-brand-black/5 last:border-0"
                  >
                    {/* Item Image */}
                    <Link href={`/product/${item._id}`} className="relative aspect-[3/4] w-full sm:w-40 bg-brand-white flex-shrink-0 block overflow-hidden">
                      <NextImage src={item.image} alt={item.name} fill sizes="160px" className="object-cover" />
                    </Link>

                    {/* Item Content */}
                    <div className="flex-grow flex flex-col justify-between pt-2">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="text-xl font-serif mb-2 tracking-tight">
                            <Link href={`/product/${item._id}`} className="hover:text-brand-gold transition-colors">
                              {item.name}
                            </Link>
                          </h3>
                          <p className="text-[10px] uppercase tracking-widest text-brand-black/40 font-bold">Size: {item.size}</p>
                        </div>
                        <p className="text-lg font-bold tracking-tighter">${(item.price * item.quantity).toLocaleString()}</p>
                      </div>

                      <div className="flex items-center justify-between mt-8">
                        {/* Quantity Controls */}
                        <div className="flex items-center border border-brand-black/10 px-2 py-1">
                          <button
                            onClick={() => updateQuantity(item._id, item.size, item.quantity - 1)}
                            className="p-2 hover:text-brand-gold transition-colors"
                          >
                            <Minus size={14} />
                          </button>
                          <span className="w-10 text-center text-xs font-bold">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item._id, item.size, item.quantity + 1)}
                            className="p-2 hover:text-brand-gold transition-colors"
                          >
                            <Plus size={14} />
                          </button>
                        </div>

                        {/* Remove Button */}
                        <button
                          onClick={() => removeItem(item._id, item.size)}
                          className="flex items-center gap-2 text-[10px] uppercase tracking-widest font-bold text-brand-black/40 hover:text-red-500 transition-colors"
                        >
                          <Trash2 size={14} />
                          <span>Remove</span>
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>

          {/* Cart Summary Sideboard */}
          <div className="lg:w-96">
            <div className="bg-brand-white p-8 md:p-10 sticky top-32">
              <h2 className="text-2xl font-serif mb-8 border-b border-brand-black/5 pb-6">Order Summary</h2>

              <div className="space-y-4 mb-8">
                <div className="flex justify-between text-sm uppercase tracking-widest text-brand-black/60">
                  <span>Subtotal</span>
                  <span className="font-bold text-brand-black font-sans">${subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm uppercase tracking-widest text-brand-black/60">
                  <span>Estimated Shipping</span>
                  <span className="font-bold text-brand-black font-sans">
                    {shipping === 0 ? "FREE" : `$${shipping.toLocaleString()}`}
                  </span>
                </div>
                <div className="flex justify-between text-sm uppercase tracking-widest text-brand-black/60">
                  <span>Estimated Tax</span>
                  <span className="font-bold text-brand-black font-sans">${tax.toLocaleString()}</span>
                </div>
              </div>

              <div className="flex justify-between items-end border-t border-brand-black/5 pt-6 mb-10">
                <span className="text-sm uppercase tracking-widest font-bold">Total</span>
                <span className="text-4xl font-serif tracking-tighter">${total.toLocaleString()}</span>
              </div>

              <Link href="/checkout" className="block w-full">
                <Button size="lg" className="w-full justify-between items-center group">
                  <span>Checkout</span>
                  <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform" />
                </Button>
              </Link>

              <div className="mt-8 flex flex-col items-center gap-4 text-center">
                <p className="text-[10px] uppercase tracking-widest text-brand-black/40 font-bold">Secure Payment via Stripe</p>
                <div className="flex gap-2">
                  {/* Payment Icons placeholder */}
                  {[1, 2, 3, 4].map(i => (
                    <div key={i} className="w-8 h-5 bg-brand-black/5 rounded" />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default CartPage;
