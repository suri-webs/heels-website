import React from "react";
import Container from "@/components/ui/Container";

const PrivacyPolicyPage = () => {
  return (
    <div className="bg-brand-cream min-h-screen py-24">
      <Container>
        <div className="max-w-3xl mx-auto bg-brand-white p-8 md:p-16 border border-brand-black/5 shadow-sm">
          <h1 className="text-4xl md:text-5xl font-serif mb-10 border-b border-brand-black/10 pb-6">Privacy Policy</h1>
          
          <div className="space-y-8 text-brand-black/80 font-sans leading-relaxed text-sm">
            <p className="italic text-brand-black/50">Last updated: April 10, 2026</p>

            <section>
              <h2 className="text-lg font-serif font-bold mb-4 uppercase tracking-wider text-brand-black">1. Information We Collect</h2>
              <p className="mb-2">We collect information that you manually provide to us when creating an account, placing an order, or contacting customer support. This may include your name, email address, physical address, and payment information.</p>
              <p>We also automatically collect certain technical information when you visit our website, such as your IP address, browser type, and browsing behavior using cookies.</p>
            </section>

            <section>
              <h2 className="text-lg font-serif font-bold mb-4 uppercase tracking-wider text-brand-black">2. How We Use Your Information</h2>
              <ul className="list-disc pl-5 space-y-2">
                <li>To process and fulfill your orders, including sending emails to confirm your order status and shipment.</li>
                <li>To communicate with you about products, services, offers, and promotions.</li>
                <li>To improve and optimize our website functionality and customer experience.</li>
                <li>To protect against fraudulent transactions and monitor against theft.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-lg font-serif font-bold mb-4 uppercase tracking-wider text-brand-black">3. Information Sharing</h2>
              <p>We do not sell, rent, or trade your personal information to third parties. We only share information with trusted third-party service providers (like payment processors and shipping partners) solely for the purpose of fulfilling our services to you.</p>
            </section>

            <section>
              <h2 className="text-lg font-serif font-bold mb-4 uppercase tracking-wider text-brand-black">4. Data Security</h2>
              <p>We implement a variety of security measures including secure socket layer technology (SSL) to maintain the safety of your personal information. Your payment information is encrypted and securely processed by our payment gateway providers.</p>
            </section>

            <section>
              <h2 className="text-lg font-serif font-bold mb-4 uppercase tracking-wider text-brand-black">5. Your Rights</h2>
              <p>You have the right to access, correct, or delete any personal information we hold about you. You may also opt out of promotional communications at any time by clicking the "unsubscribe" link in our emails.</p>
            </section>
            
            <p className="mt-12 text-xs uppercase tracking-widest text-brand-black/40 text-center">
                For privacy inquiries, contact privacy@luxeheels.com
            </p>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default PrivacyPolicyPage;
