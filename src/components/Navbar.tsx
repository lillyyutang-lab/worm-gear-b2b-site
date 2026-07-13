import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="bg-slate-900 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-xl font-bold italic">
          WormGear B2B
        </Link>
        <div className="space-x-6">
          <Link href="/" className="hover:text-blue-400">Home</Link>
          <Link href="/products" className="hover:text-blue-400">Products</Link>
          <Link href="/about" className="hover:text-blue-400">About</Link>
          <Link href="/contact" className="hover:text-blue-400">Contact</Link>
        </div>
      </div>
    </nav>
  );
}
