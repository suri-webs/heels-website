import React from "react";
import Container from "@/components/ui/Container";

const ShippingPage = () => {
  return (
    <div className="bg-brand-cream min-h-screen py-24">
      <Container>
        <div className="max-w-3xl mx-auto bg-brand-white p-8 md:p-16 border border-brand-black/5 shadow-sm">
          <h1 className="text-4xl md:text-5xl font-serif mb-10 border-b border-brand-black/10 pb-6">Shipping & Returns</h1>
          
          <div className="space-y-10 text-brand-black/80 font-sans leading-relaxed">
            <section>
              <h2 className="text-xl font-serif mb-4 uppercase tracking-wider text-brand-black">Shipping Policy</h2>
              <p className="mb-4">
                We offer complimentary express shipping on all orders over $500. For orders under this amount, a standard shipping fee of $50 applies.
                All our pieces are handcrafted and dispatched from our artisan workshops in Italy.
              </p>
              <ul className="list-disc pl-5 space-y-2 text-sm text-brand-black/70">
                <li>Domestic Delivery (US): 3-5 business days</li>
                <li>International Delivery: 5-10 business days</li>
                <li>Custom Orders: Please allow an additional 2-3 weeks for crafting</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-serif mb-4 uppercase tracking-wider text-brand-black">Order Tracking</h2>
              <p>
                Once your order has been dispatched, you will receive a confirmation email containing your tracking number and a link to monitor your shipment's journey.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-serif mb-4 uppercase tracking-wider text-brand-black">Returns & Exchanges</h2>
              <p className="mb-4">
                We want you to be completely satisfied with your LUXE HEELS purchase. If for any reason you are not, we accept returns and exchanges within 30 days of delivery.
              </p>
              <p className="mb-4">
                Please note that items must be returned in their original condition, unworn, with all tags attached, and in the original packaging. Shoes must be tried on a carpeted surface to prevent scuffing.
              </p>
              <h3 className="text-sm uppercase tracking-widest font-bold mt-6 mb-2">How to Return:</h3>
              <ol className="list-decimal pl-5 space-y-2 text-sm text-brand-black/70">
                <li>Log securely into your dashboard and navigate to 'My Orders'.</li>
                <li>Select the item(s) you wish to return and choose the reason.</li>
                <li>Print the pre-paid return shipping label provided.</li>
                <li>Drop the package off at your nearest authorized shipping center.</li>
              </ol>
            </section>

            <section>
              <h2 className="text-xl font-serif mb-4 uppercase tracking-wider text-brand-black">Refunds</h2>
              <p>
                Refunds will be processed to the original method of payment within 5-7 business days of receiving your return at our facility. Original shipping costs are non-refundable.
              </p>
            </section>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default ShippingPage;
