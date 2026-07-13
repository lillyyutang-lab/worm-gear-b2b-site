export default function Contact() {
  return (
    <div className="container mx-auto py-16 px-4 max-w-5xl">
      <h1 className="text-4xl font-bold mb-8 text-center">Contact Our Sales Team</h1>
      <div className="grid md:grid-cols-2 gap-12 mt-12">
        {/* Contact Info */}
        <div>
          <h2 className="text-2xl font-bold mb-6">Global Support</h2>
          <p className="text-slate-600 mb-8">
            Our expert engineers and sales representatives are available to discuss your technical requirements and provide custom quotes for bulk orders.
          </p>
          <div className="space-y-4">
            <p><strong>Email:</strong> sales@wormgear-b2b.com</p>
            <p><strong>Phone:</strong> +86-555-12345678</p>
            <p><strong>WhatsApp:</strong> +86-138-1234-5678</p>
            <p><strong>Address:</strong> No. 888 Industrial Zone, Transmission Park, Shanghai, China</p>
          </div>
        </div>

        {/* Contact Form */}
        <div className="bg-slate-50 p-8 rounded-xl border">
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Company Name</label>
              <input type="text" className="w-full p-2 border rounded" placeholder="Your Industrial Co., Ltd." />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Your Name</label>
              <input type="text" className="w-full p-2 border rounded" placeholder="John Doe" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Work Email</label>
              <input type="email" className="w-full p-2 border rounded" placeholder="john@company.com" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Requirement Details</label>
              <textarea className="w-full p-2 border rounded h-32" placeholder="Tell us about your project requirements (e.g. quantity, gear ratio, motor power)..."></textarea>
            </div>
            <button className="w-full bg-blue-600 text-white py-3 rounded font-bold hover:bg-blue-700 transition">
              Request Quote
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
