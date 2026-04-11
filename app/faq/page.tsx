import React from "react";
import Container from "@/components/ui/Container";

const FAQPage = () => {
  return (
    <div className="bg-brand-cream min-h-screen py-24">
      <Container>
        <div className="max-w-3xl mx-auto bg-brand-white p-8 md:p-16 border border-brand-black/5 shadow-sm">
          <h1 className="text-4xl md:text-5xl font-serif mb-10 border-b border-brand-black/10 pb-6 text-center">Frequently Asked Questions</h1>
          
          <div className="space-y-8 text-brand-black/80 font-sans leading-relaxed">
            
            <div className="border-b border-brand-black/5 pb-6">
              <h3 className="text-lg font-serif font-bold mb-2">Are your shoes true to size?</h3>
              <p className="text-sm text-brand-black/70">
                Our luxury heels generally fit true to European sizing. However, different styles may fit differently. We provide fit notes on each product page and a detailed <a href="/size-guide" className="underline hover:text-brand-gold">Size Guide</a> to help you find your perfect fit.
              </p>
            </div>

            <div className="border-b border-brand-black/5 pb-6">
              <h3 className="text-lg font-serif font-bold mb-2">Can I return a pair if they don't fit?</h3>
              <p className="text-sm text-brand-black/70">
                Yes, we accept returns within 30 days of delivery, provided the shoes have not been worn outdoors and have no scuff marks on the soles. Please try your shoes on a carpeted surface. Visit our <a href="/shipping" className="underline hover:text-brand-gold">Returns Policy</a> for details.
              </p>
            </div>

            <div className="border-b border-brand-black/5 pb-6">
              <h3 className="text-lg font-serif font-bold mb-2">Do you offer international shipping?</h3>
              <p className="text-sm text-brand-black/70">
                We ship to most countries worldwide. International shipping rates and delivery times are calculated at checkout. Please note that customs duties and taxes may apply upon arrival in your country.
              </p>
            </div>

            <div className="border-b border-brand-black/5 pb-6">
              <h3 className="text-lg font-serif font-bold mb-2">Where are LUXE HEELS made?</h3>
              <p className="text-sm text-brand-black/70">
                All of our shoes are exquisitely handcrafted by master artisans in Italy, using premium, ethically sourced leathers and luxury fabrics.
              </p>
            </div>

            <div className="pb-2">
              <h3 className="text-lg font-serif font-bold mb-2">How do I care for my heels?</h3>
              <p className="text-sm text-brand-black/70">
                We recommend storing your heels in the provided dust bags away from direct sunlight. Suede and velvet styles should be brushed gently with a specialized brush, while leather can be wiped with a soft, slightly damp cloth.
              </p>
            </div>

          </div>
          
          <div className="mt-12 p-8 bg-brand-cream/30 text-center border border-brand-black/5">
              <p className="font-serif italic text-brand-black mb-4">Still have questions?</p>
              <a href="/contact" className="inline-block bg-brand-black text-white text-[10px] uppercase font-bold tracking-[0.2em] px-8 py-3 hover:bg-brand-gold transition-colors">
                  Contact Customer Care
              </a>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default FAQPage;
