import React from "react";
import Container from "@/components/ui/Container";

const SizeGuidePage = () => {
  return (
    <div className="bg-brand-cream min-h-screen py-24">
      <Container>
        <div className="max-w-4xl mx-auto bg-brand-white p-8 md:p-16 border border-brand-black/5 shadow-sm">
          <h1 className="text-4xl md:text-5xl font-serif mb-10 border-b border-brand-black/10 pb-6 text-center">Size Guide</h1>
          
          <div className="space-y-12 text-brand-black/80 font-sans leading-relaxed">
            <div className="text-center max-w-2xl mx-auto">
              <p className="text-lg">
                LUXE HEELS uses standard European (EU) sizing for all our collections. 
                Our footwear is handcrafted to fit true to size. If you are between sizes, we generally recommend sizing up for closed-toe styles and sizing down for open-toe styles.
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-center border-collapse">
                <thead>
                  <tr className="bg-brand-black text-brand-white uppercase tracking-widest text-xs">
                    <th className="p-4 border border-brand-black/20">EU Size</th>
                    <th className="p-4 border border-brand-black/20">US Size</th>
                    <th className="p-4 border border-brand-black/20">UK Size</th>
                    <th className="p-4 border border-brand-black/20">Foot Length (cm)</th>
                    <th className="p-4 border border-brand-black/20">Foot Length (in)</th>
                  </tr>
                </thead>
                <tbody className="text-sm">
                  {[
                    { eu: '35', us: '5', uk: '2.5', cm: '22.8', inch: '9.0' },
                    { eu: '36', us: '6', uk: '3.5', cm: '23.5', inch: '9.3' },
                    { eu: '37', us: '6.5', uk: '4', cm: '23.8', inch: '9.4' },
                    { eu: '38', us: '7.5', uk: '5', cm: '24.5', inch: '9.6' },
                    { eu: '39', us: '8.5', uk: '6', cm: '25.1', inch: '9.9' },
                    { eu: '40', us: '9', uk: '6.5', cm: '25.4', inch: '10.0' },
                    { eu: '41', us: '10', uk: '7.5', cm: '26.0', inch: '10.2' },
                    { eu: '42', us: '10.5', uk: '8', cm: '26.4', inch: '10.4' },
                  ].map((row, idx) => (
                    <tr key={idx} className={idx % 2 === 0 ? "bg-brand-cream/30" : ""}>
                      <td className="p-4 border border-brand-black/10 font-bold">{row.eu}</td>
                      <td className="p-4 border border-brand-black/10">{row.us}</td>
                      <td className="p-4 border border-brand-black/10">{row.uk}</td>
                      <td className="p-4 border border-brand-black/10">{row.cm}</td>
                      <td className="p-4 border border-brand-black/10">{row.inch}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <section className="bg-brand-cream/50 p-8 border border-brand-black/5 mt-12">
              <h2 className="text-xl font-serif mb-4 uppercase tracking-wider text-brand-black">How to Measure</h2>
              <ol className="list-decimal pl-5 space-y-3 text-sm text-brand-black/70">
                <li>Place a piece of paper on a flat surface against a wall.</li>
                <li>Stand on the paper with your heel firmly touching the wall.</li>
                <li>Draw a line at the longest part of your foot (usually the big toe).</li>
                <li>Measure the distance from the edge of the paper to the line in centimeters or inches.</li>
                <li>Compare your measurement to the chart above.</li>
              </ol>
            </section>

          </div>
        </div>
      </Container>
    </div>
  );
};

export default SizeGuidePage;
