
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Star, Truck, ShieldCheck, RefreshCcw } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Category } from '../types';

export const Home: React.FC = () => {
  const { products } = useApp();
  const featured = products.filter(p => p.featured).slice(0, 3);

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="relative h-[90vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&q=80&w=2070" 
            className="w-full h-full object-cover" 
            alt="Hero Fashion"
          />
          <div className="absolute inset-0 bg-black/30"></div>
        </div>
        
        <div className="container mx-auto px-6 relative z-10 text-white">
          <div className="max-w-2xl glass-dark p-8 rounded-3xl animate-in fade-in slide-in-from-left duration-1000">
            <span className="text-sm tracking-[0.3em] font-medium uppercase mb-4 block">New Collection 2024</span>
            <h1 className="text-5xl md:text-7xl font-serif font-bold mb-6 leading-tight">
              Aesthetics for the <br/> Modern Soul
            </h1>
            <p className="text-lg text-gray-200 mb-8 max-w-lg leading-relaxed">
              Discover curated high-fashion pieces designed for those who value elegance and timeless craftsmanship.
            </p>
            <div className="flex space-x-4">
              <Link to="/shop" className="bg-white text-black px-8 py-4 rounded-full font-bold hover:bg-gray-100 transition flex items-center">
                SHOP NOW <ArrowRight className="ml-2" size={18} />
              </Link>
              <Link to="/shop?cat=Women" className="border-2 border-white px-8 py-4 rounded-full font-bold hover:bg-white/10 transition">
                WOMEN
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Collections */}
      <section className="py-24 container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12">
          <div>
            <h2 className="text-4xl font-serif font-bold mb-4">The Editorial Selection</h2>
            <p className="text-gray-500 max-w-md">Our weekly curation of luxury essentials that define the Vogue & Verve silhouette.</p>
          </div>
          <Link to="/shop" className="text-black font-bold border-b-2 border-black pb-1 mb-2 hover:opacity-70 transition">VIEW ALL COLLECTIONS</Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featured.map(product => (
            <Link key={product.id} to={`/product/${product.id}`} className="group">
              <div className="relative overflow-hidden aspect-[3/4] rounded-2xl mb-4 bg-gray-100">
                <img 
                  src={product.images[0]} 
                  alt={product.name} 
                  className="w-full h-full object-cover transition duration-700 group-hover:scale-110" 
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-white/90 backdrop-blur-sm text-[10px] font-bold tracking-widest uppercase px-3 py-1 rounded-full shadow-sm">
                    Featured
                  </span>
                </div>
              </div>
              <h3 className="text-lg font-medium mb-1 group-hover:text-gray-600 transition">{product.name}</h3>
              <p className="text-gray-900 font-bold">${product.price}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Category Grid */}
      <section className="py-24 bg-gray-100">
        <div className="container mx-auto px-6">
           <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="relative h-96 group overflow-hidden rounded-3xl">
                 <img src="https://images.unsplash.com/photo-1488161628813-04466f872be2?auto=format&fit=crop&q=80&w=1000" className="w-full h-full object-cover transition duration-1000 group-hover:scale-105" alt="Men's"/>
                 <div className="absolute inset-0 bg-black/20 flex flex-col justify-center items-center text-white">
                    <h2 className="text-4xl font-serif font-bold mb-4">THE MEN'S EDIT</h2>
                    <Link to="/shop?cat=Men" className="bg-white text-black px-6 py-3 rounded-full font-bold hover:scale-105 transition-transform">SHOP MEN</Link>
                 </div>
              </div>
              <div className="relative h-96 group overflow-hidden rounded-3xl">
                 <img src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=1000" className="w-full h-full object-cover transition duration-1000 group-hover:scale-105" alt="Women's"/>
                 <div className="absolute inset-0 bg-black/20 flex flex-col justify-center items-center text-white">
                    <h2 className="text-4xl font-serif font-bold mb-4">THE WOMEN'S EDIT</h2>
                    <Link to="/shop?cat=Women" className="bg-white text-black px-6 py-3 rounded-full font-bold hover:scale-105 transition-transform">SHOP WOMEN</Link>
                 </div>
              </div>
           </div>
        </div>
      </section>

      {/* Why Vogue & Verve */}
      <section className="py-24 container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
           <div className="text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Truck className="text-black" />
              </div>
              <h4 className="font-bold mb-2">Global Shipping</h4>
              <p className="text-sm text-gray-500">Fast and secure shipping to over 150 countries worldwide.</p>
           </div>
           <div className="text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <ShieldCheck className="text-black" />
              </div>
              <h4 className="font-bold mb-2">Secure Payments</h4>
              <p className="text-sm text-gray-500">Your data is protected by industry-leading encryption.</p>
           </div>
           <div className="text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <RefreshCcw className="text-black" />
              </div>
              <h4 className="font-bold mb-2">Easy Returns</h4>
              <p className="text-sm text-gray-500">30-day hassle-free return policy for ultimate peace of mind.</p>
           </div>
           <div className="text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Star className="text-black" />
              </div>
              <h4 className="font-bold mb-2">Premium Quality</h4>
              <p className="text-sm text-gray-500">Only the finest materials crafted with obsessive detail.</p>
           </div>
        </div>
      </section>

      {/* Promotion */}
      <section className="py-24 relative overflow-hidden">
        <div className="container mx-auto px-6">
           <div className="glass rounded-[3rem] p-12 md:p-20 text-center relative overflow-hidden border-none bg-indigo-50/50">
              <div className="relative z-10">
                <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6 italic">Sustainable Fashion. Endless Style.</h2>
                <p className="text-gray-600 max-w-2xl mx-auto mb-10 leading-relaxed text-lg">
                  Join our mission to transform fashion into a force for good. Discover our Earth-first collection made from 100% recycled luxury materials.
                </p>
                <Link to="/shop" className="bg-black text-white px-10 py-4 rounded-full font-bold hover:bg-gray-800 transition shadow-xl">DISCOVER SUSTAINABILITY</Link>
              </div>
           </div>
        </div>
      </section>
    </div>
  );
};
