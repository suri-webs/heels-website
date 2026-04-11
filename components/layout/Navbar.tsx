"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag, Heart, Search, Menu, X, User, ArrowRight, LayoutDashboard } from "lucide-react";
import { cn } from "@/lib/utils";
import { useCart } from "@/lib/store/useCart";
import { useWishlist } from "@/lib/store/useWishlist";
import axios from "axios";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [mounted, setMounted] = useState(false);
  
  const pathname = usePathname();
  const router = useRouter();
  const totalItems = useCart((state) => state.totalItems());
  const wishlistCount = useWishlist((state) => state.items.length);

  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    setMounted(true);
    const fetchUser = async () => {
      try {
        const res = await axios.get("/api/auth/me");
        setUser(res.data);
      } catch (err) {
        setUser(null);
      }
    };
    fetchUser();
    
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [pathname]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/shop?search=${encodeURIComponent(searchQuery)}`);
      setIsSearchOpen(false);
      setSearchQuery("");
      setIsMobileMenuOpen(false);
    }
  };

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "The Shop", href: "/shop" },
    { name: "Stilettos", href: "/shop?category=stiletto" },
    { name: "Block Heels", href: "/shop?category=block" },
    { name: "Bridal Collection", href: "/shop?category=bridal" },
  ];

  return (
    <>
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 py-4",
        isScrolled
          ? "bg-brand-white/80 backdrop-blur-md shadow-sm py-3"
          : "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Mobile Menu Toggle & Search (Visible on Mobile) */}
        <div className="flex items-center gap-2 lg:hidden">
            <button
              className="text-brand-black p-2"
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <Menu size={24} />
            </button>
            <button 
                onClick={() => setIsSearchOpen(true)}
                className="text-brand-black p-2"
            >
                <Search size={22} />
            </button>
        </div>

        {/* Navigation Links - Desktop */}
        <div className="hidden lg:flex items-center space-x-8">
          {navLinks.slice(1, 4).map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-sm uppercase tracking-widest hover:text-brand-gold transition-colors font-medium"
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Logo */}
        <Link href="/" className="absolute left-1/2 -translate-x-1/2 lg:relative lg:left-0 lg:translate-x-0">
          <h1 className="text-2xl md:text-3xl font-serif tracking-tighter font-bold text-brand-black uppercase">
            LUXE<span className="text-brand-gold">HEELS</span>
          </h1>
        </Link>

        {/* Icons */}
        <div className="flex items-center space-x-3 md:space-x-5">
          <button 
            onClick={() => setIsSearchOpen(true)}
            className="hidden lg:block hover:text-brand-gold transition-colors"
          >
            <Search size={20} />
          </button>
          <Link href="/wishlist" className="hover:text-brand-gold transition-colors relative">
            <Heart size={20} />
            {mounted && wishlistCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-brand-gold text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center animate-fade-in shadow-sm">
                {wishlistCount}
              </span>
            )}
          </Link>
          <Link href="/cart" className="hover:text-brand-gold transition-colors relative">
            <ShoppingBag size={20} />
            {mounted && totalItems > 0 && (
              <span className="absolute -top-1 -right-1 bg-brand-black text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center animate-fade-in shadow-sm">
                {totalItems}
              </span>
            )}
          </Link>
          <Link href={user ? (user.role === 'admin' ? "/admin" : "/dashboard") : "/login"} className="hidden md:flex items-center space-x-2 hover:text-brand-gold transition-colors">
            {user ? (
               user.role === 'admin' ? <LayoutDashboard size={20} /> : <User size={20} />
            ) : (
              <User size={20} />
            )}
          </Link>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[60] lg:hidden"
            />
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 left-0 bottom-0 w-[85%] max-w-sm bg-brand-cream z-[70] p-8 lg:hidden flex flex-col"
            >
              <div className="flex justify-between items-center mb-12">
                <h2 className="text-2xl font-serif font-bold uppercase tracking-widest">LUXEHEELS</h2>
                <button onClick={() => setIsMobileMenuOpen(false)}>
                  <X size={24} />
                </button>
              </div>
              
              <div className="flex flex-col space-y-6">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-lg uppercase tracking-widest hover:text-brand-gold transition-colors font-medium border-b border-brand-black/5 pb-2"
                  >
                    {link.name}
                  </Link>
                ))}
              </div>

              <div className="mt-auto pt-8 border-t border-brand-black/10 flex flex-col gap-6">
                <Link href={user ? (user.role === 'admin' ? "/admin" : "/dashboard") : "/login"} onClick={() => setIsMobileMenuOpen(false)} className="flex items-center space-x-4 text-xs uppercase tracking-[0.2em] font-bold">
                    <div className="w-10 h-10 rounded-full bg-brand-black text-white flex items-center justify-center">
                        {user ? user.name.charAt(0) : <User size={18} />}
                    </div>
                    <div>
                        <p>{user ? "Dashboard" : "Account"}</p>
                        <p className="text-[10px] text-brand-black/40 font-normal tracking-widest">{user ? user.email : "Login / Register"}</p>
                    </div>
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>

    {/* Luxury Search Overlay */}
    <AnimatePresence>
      {isSearchOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-brand-white z-[100] flex flex-col"
        >
          <div className="h-24 px-6 md:px-10 flex justify-between items-center border-b border-brand-black/5">
             <h2 className="text-lg md:text-2xl font-serif uppercase tracking-widest">Search Collection</h2>
             <button onClick={() => setIsSearchOpen(false)} className="hover:rotate-90 transition-transform duration-300 p-2">
                <X size={28} />
             </button>
          </div>
          <div className="flex-grow flex items-center justify-center px-6">
            <div className="w-full max-w-4xl">
                <form onSubmit={handleSearchSubmit}>
                <input 
                    autoFocus
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search by color, style, or name..."
                    className="w-full bg-transparent text-3xl md:text-6xl font-serif placeholder:text-brand-black/10 border-b-2 border-brand-black/10 focus:outline-none focus:border-brand-gold pb-8 transition-colors"
                />
                </form>
                <div className="mt-12 flex flex-wrap gap-4 items-center">
                    <span className="text-[10px] uppercase tracking-widest font-bold text-brand-black/40">Trending:</span>
                    {["Stiletto", "Gold", "Bridal", "New Arrivals"].map((tag) => (
                    <button 
                        key={tag}
                        onClick={() => {
                            router.push(`/shop?search=${encodeURIComponent(tag)}`);
                            setIsSearchOpen(false);
                            setIsMobileMenuOpen(false);
                        }}
                        className="text-[10px] uppercase tracking-widest font-bold border border-brand-black/5 px-4 py-2 hover:bg-brand-black hover:text-white transition-all shadow-sm"
                    >
                        {tag}
                    </button>
                    ))}
                </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
    </>
  );
};

export default Navbar;
