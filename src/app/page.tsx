import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center">
      {/* Hero Section */}
      <section className="w-full bg-slate-100 py-20 px-4 text-center">
        <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 mb-6">
          Precision Engineering for Industrial Motion
        </h1>
        <p className="text-xl text-slate-600 max-w-2xl mx-auto mb-10">
          Global B2B supplier of high-performance worm gear reducers and industrial motors. 
          Built for durability, efficiency, and reliability.
        </p>
        <Link 
          href="/products" 
          className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
        >
          View Our Catalog
        </Link>
      </section>

      {/* Feature Section */}
      <section className="container mx-auto py-16 px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Why Choose Our Solutions?</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="p-6 border rounded-xl hover:shadow-lg transition">
            <h3 className="text-xl font-bold mb-3">Superior Quality</h3>
            <p className="text-slate-600">Manufactured with high-grade materials and precision CNC machining for maximum lifespan.</p>
          </div>
          <div className="p-6 border rounded-xl hover:shadow-lg transition">
            <h3 className="text-xl font-bold mb-3">Custom Options</h3>
            <p className="text-slate-600">Tailored gear ratios and motor specifications to meet your unique industrial requirements.</p>
          </div>
          <div className="p-6 border rounded-xl hover:shadow-lg transition">
            <h3 className="text-xl font-bold mb-3">Global Delivery</h3>
            <p className="text-slate-600">Fast and secure shipping to industrial hubs worldwide with professional export support.</p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full bg-blue-900 text-white py-16 text-center">
        <h2 className="text-3xl font-bold mb-4">Ready to Optimize Your Machinery?</h2>
        <p className="mb-8 opacity-90">Request a bulk quote today and get expert technical advice.</p>
        <Link 
          href="/contact" 
          className="bg-white text-blue-900 px-8 py-3 rounded-lg font-semibold hover:bg-slate-100 transition"
        >
          Get a Quote
        </Link>
      </section>
    </div>
  );
}
