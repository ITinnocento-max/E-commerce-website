
import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Filter, SlidersHorizontal, Heart, ShoppingBag } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Category } from '../types';

export const Shop: React.FC = () => {
  const { products, toggleWishlist, wishlist } = useApp();
  const [searchParams] = useSearchParams();
  const initialCat = searchParams.get('cat') as Category || 'All';
  
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCat);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 500]);
  const [sortBy, setSortBy] = useState<string>('newest');

  useEffect(() => {
    setSelectedCategory(initialCat);
  }, [initialCat]);

  const filteredProducts = products.filter(p => {
    const catMatch = selectedCategory === 'All' || p.category === selectedCategory;
    const priceMatch = p.price >= priceRange[0] && p.price <= priceRange[1];
    return catMatch && priceMatch;
  }).sort((a, b) => {
    if (sortBy === 'price-low') return a.price - b.price;
    if (sortBy === 'price-high') return b.price - a.price;
    if (sortBy === 'rating') return b.rating - a.rating;
    return 0; // Default newest
  });

  return (
    <div className="pt-32 pb-24 container mx-auto px-6">
      <div className="flex flex-col md:flex-row gap-12">
        {/* Filters Sidebar */}
        <aside className="w-full md:w-64 space-y-8">
          <div>
            <h3 className="font-bold text-lg mb-6 flex items-center">
              <Filter size={18} className="mr-2" /> Categories
            </h3>
            <div className="space-y-3">
              {['All', ...Object.values(Category)].map(cat => (
                <button 
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`block text-sm transition ${selectedCategory === cat ? 'font-bold border-l-2 border-black pl-3' : 'text-gray-500 hover:text-black hover:pl-2'}`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-6 flex items-center">
              <SlidersHorizontal size={18} className="mr-2" /> Price Range
            </h3>
            <input 
              type="range" 
              min="0" 
              max="500" 
              value={priceRange[1]} 
              onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
              className="w-full accent-black mb-2"
            />
            <div className="flex justify-between text-xs font-medium text-gray-500">
              <span>$0</span>
              <span>Up to ${priceRange[1]}</span>
            </div>
          </div>

          <div className="p-6 bg-black text-white rounded-3xl">
             <h4 className="font-serif italic text-xl mb-4">The VIP Style Service</h4>
             <p className="text-xs text-gray-400 mb-6 leading-relaxed">Join our membership for early access to limited edition drops and 24/7 styling assistance.</p>
             <button className="text-xs font-bold border-b border-white pb-1">LEARN MORE</button>
          </div>
        </aside>

        {/* Product Grid */}
        <main className="flex-1">
          <div className="flex justify-between items-center mb-10">
            <h1 className="text-3xl font-serif font-bold">
              {selectedCategory === 'All' ? 'Our Collections' : selectedCategory}
              <span className="text-sm font-sans font-normal text-gray-400 ml-4 italic">({filteredProducts.length} items)</span>
            </h1>
            <select 
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="text-sm border-none bg-transparent focus:ring-0 cursor-pointer font-medium"
            >
              <option value="newest">Newest Arrivals</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Top Rated</option>
            </select>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
            {filteredProducts.map(product => (
              <div key={product.id} className="group relative">
                <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-gray-100 mb-4">
                  <Link to={`/product/${product.id}`}>
                    <img 
                      src={product.images[0]} 
                      alt={product.name} 
                      className="w-full h-full object-cover transition duration-500 group-hover:scale-105" 
                    />
                  </Link>
                  <button 
                    onClick={() => toggleWishlist(product.id)}
                    className="absolute top-4 right-4 p-2 bg-white/80 backdrop-blur rounded-full shadow-md hover:bg-white transition"
                  >
                    <Heart size={18} className={wishlist.includes(product.id) ? "fill-red-500 text-red-500" : "text-black"} />
                  </button>
                  <div className="absolute bottom-4 left-4 right-4 translate-y-12 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all">
                     <Link to={`/product/${product.id}`} className="w-full glass-dark text-white text-xs font-bold py-3 rounded-xl flex items-center justify-center">
                        <ShoppingBag size={14} className="mr-2" /> QUICK VIEW
                     </Link>
                  </div>
                </div>
                <div className="space-y-1 px-1">
                  <p className="text-[10px] tracking-widest text-gray-400 font-bold uppercase">{product.category}</p>
                  <h3 className="text-sm font-medium"><Link to={`/product/${product.id}`}>{product.name}</Link></h3>
                  <p className="text-sm font-bold">${product.price}</p>
                  <div className="flex items-center pt-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={10} className={i < Math.floor(product.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"} />
                    ))}
                    <span className="text-[10px] text-gray-400 ml-1">({product.rating})</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="text-center py-20">
              <h3 className="text-xl font-medium mb-2">No items found</h3>
              <p className="text-gray-500">Try adjusting your filters or category selection.</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

const Star: React.FC<{ size: number, className: string }> = ({ size, className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
);
