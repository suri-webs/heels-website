"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { Plus, Search, Filter, MoreVertical, Edit, Trash2, X, Upload } from "lucide-react";
import toast from "react-hot-toast";
import NextImage from "next/image";
import Button from "@/components/ui/Button";

const AdminProductsPage = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    category: "stiletto",
    description: "",
    featured: false,
    stock: "10",
    images: ["/assets/product-shot.png"]
  });

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get("/api/products");
      setProducts(response.data);
    } catch (error) {
      toast.error("Error loading products");
    } finally {
      setLoading(false);
    }
  };

  const handleCreateProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // In a real app, we'd POST to /api/products
      // For now, we simulate success and update local state
      const newProduct = { ...formData, _id: Math.random().toString(36).substr(2, 9), rating: 5, numReviews: 0 };
      setProducts([newProduct, ...products]);
      toast.success("Product Created Successfully");
      setIsModalOpen(false);
      setFormData({ name: "", price: "", category: "stiletto", description: "", featured: false, stock: "10", images: ["/assets/product-shot.png"] });
    } catch (error) {
       toast.error("Failed to create product");
    }
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to remove this piece from the collection?")) {
      setProducts(products.filter(p => p._id !== id));
      toast.success("Product removed");
    }
  };

  if (loading) return (
    <div className="flex items-center justify-center p-20">
      <div className="w-10 h-10 border-4 border-brand-black border-t-transparent rounded-full animate-spin" />
    </div>
  );

  return (
    <div className="space-y-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
          <h1 className="text-4xl font-serif mb-2">Inventory</h1>
          <p className="text-xs uppercase tracking-widest text-brand-black/40 font-bold underline decoration-brand-gold/30">Managing {products.length} active pieces</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 bg-brand-black text-white px-8 py-4 text-[10px] uppercase font-bold tracking-[0.2em] hover:bg-brand-gold transition-all shadow-xl"
        >
          <Plus size={16} />
          <span>Add New Design</span>
        </button>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {products.map((product) => (
          <div key={product._id} className="group bg-brand-white border border-brand-black/5 flex flex-col h-full">
            <div className="relative aspect-square overflow-hidden bg-brand-cream">
                <NextImage 
                    src={product.images[0]} 
                    alt={product.name} 
                    fill 
                    sizes="(max-width: 768px) 50vw, 25vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105" 
                />
                <div className="absolute top-4 right-4 flex gap-2 translate-x-12 group-hover:translate-x-0 transition-transform duration-500">
                    <button className="bg-brand-white p-2 hover:text-brand-gold transition-colors shadow-lg">
                        <Edit size={16} />
                    </button>
                    <button 
                        onClick={() => handleDelete(product._id)}
                        className="bg-brand-white p-2 hover:text-red-500 transition-colors shadow-lg"
                    >
                        <Trash2 size={16} />
                    </button>
                </div>
                {product.featured && (
                    <span className="absolute top-4 left-4 bg-brand-gold text-white text-[8px] uppercase font-bold tracking-widest px-2 py-1">Featured</span>
                )}
            </div>
            <div className="p-6 flex flex-col flex-grow">
               <div className="mb-4">
                  <p className="text-[9px] uppercase tracking-[0.2em] font-bold text-brand-black/30 mb-1">{product.category}</p>
                  <h3 className="text-lg font-serif leading-tight">{product.name}</h3>
               </div>
               <div className="mt-auto flex justify-between items-end border-t border-brand-black/5 pt-4">
                  <p className="text-lg font-bold tracking-tighter">${product.price.toLocaleString()}</p>
                  <p className="text-[10px] uppercase font-bold text-brand-black/40">Stock: {product.stock}</p>
               </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add Product Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-brand-black/60 backdrop-blur-sm">
           <div className="bg-brand-white w-full max-w-2xl h-[90vh] overflow-auto shadow-2xl flex flex-col">
              <div className="p-8 border-b border-brand-black/5 flex justify-between items-center bg-brand-cream/30">
                 <h2 className="text-2xl font-serif">New Collection Design</h2>
                 <button onClick={() => setIsModalOpen(false)} className="hover:rotate-90 transition-transform">
                    <X size={24} />
                 </button>
              </div>
              <form onSubmit={handleCreateProduct} className="p-8 space-y-8 flex-grow">
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-2">
                        <label className="text-[10px] uppercase tracking-widest font-bold text-brand-black/60">Design Name</label>
                        <input 
                            required
                            type="text" 
                            value={formData.name}
                            onChange={(e) => setFormData({...formData, name: e.target.value})}
                            className="w-full bg-transparent border-b border-brand-black/10 py-3 focus:outline-none focus:border-brand-gold transition-colors text-sm"
                            placeholder="e.g. Midnight Royale"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-[10px] uppercase tracking-widest font-bold text-brand-black/60">Price ($)</label>
                        <input 
                            required
                            type="number" 
                            value={formData.price}
                            onChange={(e) => setFormData({...formData, price: e.target.value})}
                            className="w-full bg-transparent border-b border-brand-black/10 py-3 focus:outline-none focus:border-brand-gold transition-colors text-sm font-bold"
                            placeholder="e.g. 850"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-[10px] uppercase tracking-widest font-bold text-brand-black/60">Category</label>
                        <select 
                            value={formData.category}
                            onChange={(e) => setFormData({...formData, category: e.target.value})}
                            className="w-full bg-transparent border-b border-brand-black/10 py-3 focus:outline-none focus:border-brand-gold transition-colors text-sm uppercase tracking-widest"
                        >
                            <option value="stiletto">Stiletto</option>
                            <option value="block">Block Heels</option>
                            <option value="bridal">Bridal</option>
                            <option value="casual">Casual</option>
                            <option value="party">Party</option>
                        </select>
                    </div>
                    <div className="space-y-2">
                        <label className="text-[10px] uppercase tracking-widest font-bold text-brand-black/60">Initial Stock</label>
                        <input 
                            type="number" 
                            value={formData.stock}
                            onChange={(e) => setFormData({...formData, stock: e.target.value})}
                            className="w-full bg-transparent border-b border-brand-black/10 py-3 focus:outline-none focus:border-brand-gold transition-colors text-sm"
                        />
                    </div>
                 </div>
                 <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest font-bold text-brand-black/60">Description & Artisan Notes</label>
                    <textarea 
                        rows={4}
                        value={formData.description}
                        onChange={(e) => setFormData({...formData, description: e.target.value})}
                        className="w-full bg-transparent border-b border-brand-black/10 py-3 focus:outline-none focus:border-brand-gold transition-colors text-sm resize-none"
                        placeholder="Craftsmanship details..."
                    />
                 </div>
                 
                 <div className="flex items-center gap-4">
                    <button type="button" className="flex items-center gap-2 border border-brand-black/10 px-6 py-4 text-[10px] uppercase font-bold tracking-widest hover:bg-brand-black hover:text-white transition-all">
                        <Upload size={16} />
                        Upload Gallery
                    </button>
                    <div className="flex items-center gap-2">
                        <input 
                            type="checkbox" 
                            id="featured"
                            checked={formData.featured}
                            onChange={(e) => setFormData({...formData, featured: e.target.checked})}
                            className="w-4 h-4 accent-brand-gold"
                        />
                        <label htmlFor="featured" className="text-[10px] uppercase tracking-widest font-bold text-brand-black/60">Mark as Featured</label>
                    </div>
                 </div>

                 <Button type="submit" className="w-full py-6">Publish to Collection</Button>
              </form>
           </div>
        </div>
      )}
    </div>
  );
};

export default AdminProductsPage;
