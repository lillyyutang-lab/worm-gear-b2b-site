export default function About() {
  return (
    <div className="container mx-auto py-16 px-4 max-w-4xl">
      <h1 className="text-4xl font-bold mb-8 text-center">About WormGear B2B</h1>
      <div className="prose prose-slate lg:prose-xl mx-auto">
        <p>
          Founded on principles of engineering excellence, WormGear B2B has emerged as a leading provider of 
          industrial transmission solutions. We specialize in the design, manufacture, and distribution of 
          high-performance worm gear reducers and electric motors.
        </p>
        <h2 className="text-2xl font-bold mt-8 mb-4">Our Mission</h2>
        <p>
          To empower industrial manufacturers worldwide with reliable, efficient, and cost-effective motion 
          control components that drive productivity and innovation.
        </p>
        <h2 className="text-2xl font-bold mt-8 mb-4">Why B2B Partners Trust Us</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>Quality Assurance:</strong> Every unit undergoes rigorous load and efficiency testing.</li>
          <li><strong>Technical Expertise:</strong> Our engineers provide comprehensive support for custom configurations.</li>
          <li><strong>Supply Chain Stability:</strong> Large inventory levels ensuring consistent availability for your production lines.</li>
        </ul>
      </div>
    </div>
  );
}
