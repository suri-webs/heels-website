"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import NextImage from "next/image";
import { useParams } from "next/navigation";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import { Heart, ShoppingBag, Star, Share2, Info, ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useCart } from "@/lib/store/useCart";
import { useWishlist } from "@/lib/store/useWishlist";
import toast from "react-hot-toast";

const ProductDetailsPage = () => {
  const params = useParams();
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [mainImage, setMainImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string>("");
  const addItem = useCart((state) => state.addItem);
  const { toggleWishlist, isInWishlist } = useWishlist();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`/api/products/${params.id}`);
        setProduct(response.data);
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        setLoading(false);
      }
    };
    if (params.id) fetchProduct();
  }, [params.id]);

  const handleAddToCart = () => {
    if (!selectedSize) {
      toast.error("Please select a size first");
      return;
    }
    addItem({
      _id: product._id,
      name: product.name,
      price: product.price,
      image: product.images[0],
      size: selectedSize,
      quantity: 1,
    });
    toast.success(`${product.name} added to cart!`);
  };

  if (loading) return (
    <div className="min-h-screen bg-brand-cream flex items-center justify-center">
      <div className="w-12 h-12 border-4 border-brand-gold border-t-transparent rounded-full animate-spin" />
    </div>
  );

  if (!product) return (
    <div className="min-h-screen bg-brand-cream flex flex-col items-center justify-center gap-4">
      <h1 className="text-4xl font-serif">Product Not Found</h1>
      <Link href="/shop" className="text-brand-gold hover:underline text-sm uppercase tracking-widest">Back to Shop</Link>
    </div>
  );

  const isFavorited = isInWishlist(product._id);

  return (
    <div className="bg-brand-cream min-h-screen py-12">
      <Container>
        <Link href="/shop" className="inline-flex items-center space-x-2 text-xs uppercase tracking-[0.2em] font-bold text-brand-black/40 hover:text-brand-gold transition-colors mb-12">
          <ArrowLeft size={14} />
          <span>Back to Collection</span>
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Gallery Section */}
          <div className="space-y-6">
            <div className="relative aspect-[3/4] bg-brand-white overflow-hidden">
              <motion.div
                key={mainImage}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="relative h-full w-full"
              >
                <NextImage
                  src={product.images[mainImage]}
                  alt={product.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover cursor-zoom-in"
                />
              </motion.div>
            </div>

            {product.images.length > 1 && (
              <div className="grid grid-cols-4 gap-4">
                {product.images.map((img: string, idx: number) => (
                  <button
                    key={idx}
                    onClick={() => setMainImage(idx)}
                    className={`relative aspect-square bg-brand-white overflow-hidden border-2 transition-all ${mainImage === idx ? "border-brand-gold" : "border-transparent"}`}
                  >
                    <NextImage src={img} alt={product.name} fill sizes="25vw" className="object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Info Section */}
          <div className="space-y-10">
            <div>
              <p className="text-brand-gold uppercase tracking-[0.4em] text-xs font-bold mb-4">{product.category}</p>
              <h1 className="text-4xl md:text-5xl font-serif mb-4 leading-tight">{product.name}</h1>
              <div className="flex items-center space-x-4">
                <p className="text-2xl font-bold tracking-tighter">${product.price.toLocaleString()}</p>
                <div className="flex items-center text-brand-gold">
                  <Star size={14} fill="currentColor" />
                  <span className="text-xs font-bold ml-1">{product.rating}</span>
                  <span className="text-xs text-brand-black/30 ml-2">({product.numReviews} reviews)</span>
                </div>
              </div>
            </div>

            <p className="text-brand-black/60 leading-relaxed text-sm">{product.description}</p>

            {/* Size Selector */}
            <div className="space-y-4">
              <div className="flex justify-between items-center text-xs uppercase tracking-widest font-bold">
                <span>Select Size (EU)</span>
                <button className="underline text-brand-black/40 hover:text-brand-black transition-colors">Size Guide</button>
              </div>
              <div className="flex flex-wrap gap-3">
                {(product.sizes || []).map((size: string) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`w-14 h-14 border flex items-center justify-center transition-all ${
                      selectedSize === size
                        ? "border-brand-black bg-brand-black text-brand-white"
                        : "border-brand-black/10 hover:border-brand-black"
                    }`}
                  >
                    <span className="text-xs font-bold">{size}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4 pt-6">
              <Button size="lg" className="flex-1 flex items-center justify-center gap-3" onClick={handleAddToCart}>
                <ShoppingBag size={18} />
                <span>Add to Cart</span>
              </Button>
              <button
                onClick={() => toggleWishlist({ _id: product._id, name: product.name, price: product.price, image: product.images[0], category: product.category })}
                className={`w-14 h-14 border flex items-center justify-center transition-all duration-300 ${isFavorited ? "bg-brand-gold text-white border-brand-gold" : "border-brand-black/10 hover:bg-brand-black hover:text-brand-white"}`}
              >
                <Heart size={20} fill={isFavorited ? "currentColor" : "none"} />
              </button>
              <button className="w-14 h-14 border border-brand-black/10 flex items-center justify-center hover:bg-brand-black hover:text-brand-white transition-all duration-300">
                <Share2 size={20} />
              </button>
            </div>

            {/* Extra Info */}
            <div className="pt-10 border-t border-brand-black/5 space-y-4">
              <div className="flex items-center space-x-3 text-[10px] uppercase tracking-widest font-bold text-brand-black/60">
                <Info size={14} />
                <span>Handcrafted in Italy</span>
              </div>
              <p className="text-[10px] uppercase tracking-widest text-brand-black/40 leading-relaxed">
                Free express shipping on orders over $500. <br />
                Standard 30-day return policy applies.
              </p>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default ProductDetailsPage;
