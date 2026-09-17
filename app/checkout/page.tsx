"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import NextImage from "next/image";
import axios from "axios";
import { CreditCard, Truck, ShieldCheck, ArrowRight, ChevronLeft } from "lucide-react";
import Container from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { useCart } from "@/lib/store/useCart";
import toast from "react-hot-toast";
import Link from "next/link";

const CheckoutPage = () => {
  const router = useRouter();
  const { items, totalItems, totalPrice, clearCart } = useCart();
  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(false);

  const [address, setAddress] = useState({
    street: "",
    city: "",
    postalCode: "",
    country: "",
  });

  const [coupon, setCoupon] = useState("");
  const [discount, setDiscount] = useState(0);

  useEffect(() => {
    setMounted(true);
    if (mounted && items.length === 0) {
      router.push("/cart");
    }
  }, [mounted, items, router]);

  if (!mounted || items.length === 0) return null;

  const subtotal = totalPrice();
  const shipping = subtotal > 500 ? 0 : 50;
  const tax = subtotal * 0.1;
  const total = subtotal + shipping + tax;
  const finalTotal = total - discount;

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.get("/api/auth/me");

      const orderData = {
        orderItems: items,
        shippingAddress: {
          address: address.street,
          city: address.city,
          postalCode: address.postalCode,
          country: address.country
        },
        paymentMethod: "Card",
        shippingPrice: shipping,
        taxPrice: tax,
        totalPrice: finalTotal,
      };

      const response = await axios.post("/api/orders", orderData);

      if (response.status === 201) {
        toast.success("Order Placed Successfully", {
          style: {
            borderRadius: '0',
            background: '#1a1a1a',
            color: '#fff',
            fontSize: '12px',
            textTransform: 'uppercase',
            letterSpacing: '1px'
          }
        });
        clearCart();
        router.push("/order-success");
      }
    } catch (error: any) {
      if (error.response?.status === 401) {
        toast.error("Please login to complete your purchase");
        router.push("/login?redirect=checkout");
      } else {
        toast.error(error.response?.data?.message || "Order processing failed. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-brand-cream min-h-screen py-12 md:py-24">
      <Container>
        <div className="max-w-5xl mx-auto">
          <Link href="/cart" className="inline-flex items-center gap-2 text-xs uppercase tracking-widest font-bold text-brand-black/40 hover:text-brand-gold transition-colors mb-12">
            <ChevronLeft size={16} />
            Back to Bag
          </Link>

          <h1 className="text-4xl md:text-5xl font-serif mb-16">Checkout</h1>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
            {/* Form Section */}
            <form onSubmit={handlePlaceOrder} className="space-y-12">
              <div className="flex items-center gap-4 border-b border-brand-black/10 pb-4">
                <Truck className="text-brand-gold" size={24} />
                <h2 className="text-xl font-serif uppercase tracking-tight">Shipping Information</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2 space-y-2">
                  <label className="text-[10px] uppercase tracking-widest font-bold text-brand-black/60">Street Address</label>
                  <input
                    required
                    type="text"
                    value={address.street}
                    onChange={(e) => setAddress({ ...address, street: e.target.value })}
                    className="w-full bg-transparent border-b border-brand-black/10 py-3 focus:outline-none focus:border-brand-gold transition-colors text-sm"
                    placeholder="123 Luxury Ave, Apt 4"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest font-bold text-brand-black/60">City</label>
                  <input
                    required
                    type="text"
                    value={address.city}
                    onChange={(e) => setAddress({ ...address, city: e.target.value })}
                    className="w-full bg-transparent border-b border-brand-black/10 py-3 focus:outline-none focus:border-brand-gold transition-colors text-sm"
                    placeholder="New York"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest font-bold text-brand-black/60">Postal Code</label>
                  <input
                    required
                    type="text"
                    value={address.postalCode}
                    onChange={(e) => setAddress({ ...address, postalCode: e.target.value })}
                    className="w-full bg-transparent border-b border-brand-black/10 py-3 focus:outline-none focus:border-brand-gold transition-colors text-sm"
                    placeholder="10001"
                  />
                </div>
                <div className="md:col-span-2 space-y-2">
                  <label className="text-[10px] uppercase tracking-widest font-bold text-brand-black/60">Country</label>
                  <input
                    required
                    type="text"
                    value={address.country}
                    onChange={(e) => setAddress({ ...address, country: e.target.value })}
                    className="w-full bg-transparent border-b border-brand-black/10 py-3 focus:outline-none focus:border-brand-gold transition-colors text-sm"
                    placeholder="United States"
                  />
                </div>
              </div>

              <div className="space-y-12 pt-8">
                <div className="flex items-center gap-4 border-b border-brand-black/10 pb-4">
                  <CreditCard className="text-brand-gold" size={24} />
                  <h2 className="text-xl font-serif uppercase tracking-tight">Payment Method</h2>
                </div>
                <div className="p-6 border border-brand-black/10 bg-brand-white/50 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-6 bg-brand-black rounded flex items-center justify-center text-[8px] text-white font-bold">VISA</div>
                    <span className="text-sm font-medium">Card Ending in 4242</span>
                  </div>
                  <span className="text-[10px] uppercase tracking-widest font-bold text-brand-black/40">Default</span>
                </div>
              </div>

              <div className="flex items-center gap-4 text-brand-black/40 pt-4">
                <ShieldCheck size={20} />
                <p className="text-[10px] uppercase tracking-widest font-bold">Encrypted & Secure Checkout</p>
              </div>

              <Button size="lg" className="w-full group" disabled={loading}>
                {loading ? "Processing..." : (
                  <div className="flex items-center justify-between w-full">
                    <span>Pay ${finalTotal.toLocaleString()}</span>
                    <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                  </div>
                )}
              </Button>
            </form>

            {/* Summary Section */}
            <div className="bg-brand-white p-8 md:p-12 h-fit border border-brand-black/5">
              <h3 className="text-sm uppercase tracking-widest font-bold mb-10 pb-4 border-b border-brand-black/5">Review Items ({totalItems()})</h3>
              <div className="space-y-6 max-h-[400px] overflow-auto pr-4 mb-10 custom-scrollbar">
                {items.map(item => (
                  <div key={item._id} className="flex gap-4">
                    <div className="relative w-16 h-20 bg-brand-cream flex-shrink-0">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-grow flex flex-col justify-between py-1">
                      <div>
                        <h4 className="text-sm font-serif">{item.name}</h4>
                        <p className="text-[10px] text-brand-black/40 uppercase tracking-widest">Qty: {item.quantity} · Size: {item.size}</p>
                      </div>
                      <p className="text-sm font-bold tracking-tighter">${(item.price * item.quantity).toLocaleString()}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-4 mb-10 pt-6 border-t border-brand-black/5">
                <div className="flex justify-between text-xs uppercase tracking-widest text-brand-black/40">
                  <span>Subtotal</span>
                  <span>${subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-xs uppercase tracking-widest text-brand-black/40">
                  <span>Shipping</span>
                  <span>{shipping === 0 ? "FREE" : `$${shipping.toLocaleString()}`}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-xs uppercase tracking-widest text-brand-gold font-bold">
                    <span>Discount</span>
                    <span>-${discount.toLocaleString()}</span>
                  </div>
                )}
                <div className="flex justify-between text-xs uppercase tracking-widest text-brand-black/40">
                  <span>Tax</span>
                  <span>${tax.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-lg font-serif pt-4">
                  <span>Total</span>
                  <span className="font-bold tracking-tighter">${finalTotal.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default CheckoutPage;
