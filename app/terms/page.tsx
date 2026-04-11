import React from "react";
import Container from "@/components/ui/Container";

const TermsOfServicePage = () => {
  return (
    <div className="bg-brand-cream min-h-screen py-24">
      <Container>
        <div className="max-w-3xl mx-auto bg-brand-white p-8 md:p-16 border border-brand-black/5 shadow-sm">
          <h1 className="text-4xl md:text-5xl font-serif mb-10 border-b border-brand-black/10 pb-6">Terms of Service</h1>
          
          <div className="space-y-8 text-brand-black/80 font-sans leading-relaxed text-sm">
            <p className="italic text-brand-black/50">Last updated: April 10, 2026</p>

            <section>
              <h2 className="text-lg font-serif font-bold mb-4 uppercase tracking-wider text-brand-black">1. Acceptance of Terms</h2>
              <p>By accessing and using LUXE HEELS (the "Website"), you agree to be bound by these Terms of Service. If you do not agree with any part of these terms, you may not use our services.</p>
            </section>

            <section>
              <h2 className="text-lg font-serif font-bold mb-4 uppercase tracking-wider text-brand-black">2. Products and Pricing</h2>
              <p className="mb-2">We make every effort to display as accurately as possible the colors and images of our products. However, we cannot guarantee that your computer monitor's display of any color will be accurate.</p>
              <p>All prices are subject to change without notice. We reserve the right to modify or discontinue a product at any time without prior notice.</p>
            </section>

            <section>
              <h2 className="text-lg font-serif font-bold mb-4 uppercase tracking-wider text-brand-black">3. Order Acceptance and Cancellation</h2>
              <p>We reserve the right to refuse any order you place with us. We may, in our sole discretion, limit or cancel quantities purchased per person, per household, or per order. In the event we make a change to or cancel an order, we will attempt to notify you via the email provided at the time the order was made.</p>
            </section>

            <section>
              <h2 className="text-lg font-serif font-bold mb-4 uppercase tracking-wider text-brand-black">4. Intellectual Property</h2>
              <p>All content included on this site, such as text, graphics, logos, images, and software, is the property of LUXE HEELS or its content suppliers and protected by international copyright laws.</p>
            </section>

            <section>
              <h2 className="text-lg font-serif font-bold mb-4 uppercase tracking-wider text-brand-black">5. Limitation of Liability</h2>
              <p>LUXE HEELS shall not be liable for any direct, indirect, incidental, special, or consequential damages resulting from the use or inability to use our services or products.</p>
            </section>

            <section>
              <h2 className="text-lg font-serif font-bold mb-4 uppercase tracking-wider text-brand-black">6. Governing Law</h2>
              <p>These Terms of Service and any separate agreements whereby we provide you services shall be governed by and construed in accordance with the laws of the jurisdiction in which our corporate headquarters is located.</p>
            </section>
            
          </div>
        </div>
      </Container>
    </div>
  );
};

export default TermsOfServicePage;
