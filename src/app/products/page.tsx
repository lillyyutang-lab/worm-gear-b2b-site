export default function Products() {
  const products = [
    { name: "NMRV Worm Gear Reducer", desc: "Compact design with high thermal dissipation.", category: "Reducers" },
    { name: "WP Series Worm Reducer", desc: "Heavy duty cast iron housing for stability.", category: "Reducers" },
    { name: "Three-Phase AC Motor", desc: "High efficiency industrial motor, 0.12-315kW.", category: "Motors" },
    { name: "Servo Motor", desc: "Precision control for automation and robotics.", category: "Motors" },
  ];

  return (
    <div className="container mx-auto py-16 px-4">
      <h1 className="text-4xl font-bold mb-8">Our Products</h1>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {products.map((p, i) => (
          <div key={i} className="border p-6 rounded-lg hover:border-blue-500 transition">
            <div className="text-sm text-blue-600 font-semibold mb-2 uppercase">{p.category}</div>
            <h2 className="text-2xl font-bold mb-3">{p.name}</h2>
            <p className="text-slate-600 mb-4">{p.desc}</p>
            <button className="text-blue-600 font-bold hover:underline">View Specifications →</button>
          </div>
        ))}
      </div>
    </div>
  );
}
