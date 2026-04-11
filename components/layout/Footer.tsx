"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Container from "@/components/ui/Container";

const Footer = () => {
  return (
    <footer className="bg-brand-white pt-24 pb-12 border-t border-brand-black/5">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
          {/* Brand Section */}
          <div className="space-y-6">
            <h2 className="text-3xl font-serif font-bold tracking-tighter">
              LUXE<span className="text-brand-gold">HEELS</span>
            </h2>
            <p className="text-brand-black/60 text-sm leading-relaxed max-w-xs">
              Defining elegance through handcrafted premium footwear for the modern woman.
              Step into luxury, every day.
            </p>
            <div className="flex space-x-5">
              <a href="#" className="hover:text-brand-gold transition-colors" aria-label="Instagram">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
              </a>
              <a href="#" className="hover:text-brand-gold transition-colors" aria-label="Facebook">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
              </a>
              <a href="#" className="hover:text-brand-gold transition-colors" aria-label="Twitter">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path></svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h3 className="text-sm uppercase tracking-widest font-bold">COLLECTIONS</h3>
            <ul className="space-y-4 text-brand-black/70 text-sm">
              <li><Link href="/shop?category=stiletto" className="hover:text-brand-black transition-colors">Stilettos</Link></li>
              <li><Link href="/shop?category=block" className="hover:text-brand-black transition-colors">Block Heels</Link></li>
              <li><Link href="/shop?category=party" className="hover:text-brand-black transition-colors">Party Wear</Link></li>
              <li><Link href="/shop?category=bridal" className="hover:text-brand-black transition-colors">Bridal Collection</Link></li>
            </ul>
          </div>

          {/* Customer Service */}
          <div className="space-y-6">
            <h3 className="text-sm uppercase tracking-widest font-bold">CUSTOMER CARE</h3>
            <ul className="space-y-4 text-brand-black/70 text-sm">
              <li><Link href="/contact" className="hover:text-brand-black transition-colors">Contact Us</Link></li>
              <li><Link href="/shipping" className="hover:text-brand-black transition-colors">Shipping & Returns</Link></li>
              <li><Link href="/size-guide" className="hover:text-brand-black transition-colors">Size Guide</Link></li>
              <li><Link href="/faq" className="hover:text-brand-black transition-colors">FAQ</Link></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="space-y-6">
            <h3 className="text-sm uppercase tracking-widest font-bold">JOIN THE INNER CIRCLE</h3>
            <p className="text-brand-black/60 text-sm">
              Subscribe to receive updates, access to exclusive deals, and more.
            </p>
            <form className="relative">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full bg-transparent border-b border-brand-black/20 py-2 pr-10 focus:outline-none focus:border-brand-gold transition-colors text-sm"
              />
              <button type="submit" className="absolute right-0 top-1/2 -translate-y-1/2 text-brand-black hover:text-brand-gold">
                <ArrowRight size={18} />
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="pt-12 border-t border-brand-black/5 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <p className="text-[10px] uppercase tracking-widest text-brand-black/40 font-medium">
            &copy; {new Date().getFullYear()} LUXE HEELS. All Rights Reserved.
          </p>
          <div className="flex space-x-6 text-[10px] uppercase tracking-widest text-brand-black/40 font-medium">
            <Link href="/privacy" className="hover:text-brand-black">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-brand-black">Terms of Service</Link>
          </div>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
