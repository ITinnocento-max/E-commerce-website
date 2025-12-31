
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ChevronLeft, ShoppingBag, Heart, Star, Truck, ShieldCheck, RefreshCcw } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const ProductDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { products, addToCart, toggleWishlist, wishlist } = useApp();
  const product = products.find(p => p.id === id);

  const [selectedSize, setSelectedSize] = useState(product?.sizes[0] || '');
  const [selectedColor, setSelectedColor] = useState(product?.colors[0] || '');
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  if (!product) return <div className="pt-40 text-center">Product not found.</div>;

  const handleAddToCart = () => {
    addToCart({
      productId: product.id,
      quantity,
      selectedSize,
      selectedColor
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="pt-32 pb-24 container mx-auto px-6">
      <button 
        onClick={() => navigate(-1)}
        className="flex items-center text-sm font-medium mb-12 hover:translate-x-[-4px] transition-transform"
      >
        <ChevronLeft size={18} /> BACK TO SHOP
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        {/* Gallery */}
        <div className="space-y-4">
          <div className="aspect-[3/4] rounded-3xl overflow-hidden bg-gray-100">
            <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover" />
          </div>
          <div className="grid grid-cols-4 gap-4">
            {/* Multiple images mock */}
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="aspect-square rounded-xl overflow-hidden bg-gray-100 cursor-pointer hover:opacity-75 transition">
                <img src={`https://picsum.photos/seed/${product.id}-${i}/400/400`} alt="preview" className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
        </div>

        {/* Info */}
        <div className="flex flex-col">
          <div className="border-b border-gray-100 pb-8 mb-8">
            <p className="text-xs tracking-[0.3em] font-bold uppercase text-gray-400 mb-4">{product.category}</p>
            <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">{product.name}</h1>
            <div className="flex items-center space-x-4 mb-6">
              <span className="text-2xl font-bold">${product.price}</span>
              <div className="flex items-center text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={16} className={i < Math.floor(product.rating) ? "fill-yellow-400" : "text-gray-300"} />
                ))}
                <span className="text-sm text-gray-500 ml-2">({product.rating} Reviews)</span>
              </div>
            </div>
            <p className="text-gray-500 leading-relaxed max-w-lg">{product.description}</p>
          </div>

          <div className="space-y-8 mb-10">
            {/* Colors */}
            <div>
              <label className="text-xs font-bold uppercase tracking-widest block mb-4">Select Color: {selectedColor}</label>
              <div className="flex space-x-3">
                {product.colors.map(color => (
                  <button 
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`w-10 h-10 rounded-full border-2 p-1 transition ${selectedColor === color ? 'border-black' : 'border-transparent'}`}
                  >
                    <div className="w-full h-full rounded-full" style={{ backgroundColor: color.toLowerCase().includes('white') ? '#f3f4f6' : color.toLowerCase() }}></div>
                  </button>
                ))}
              </div>
            </div>

            {/* Sizes */}
            <div>
              <div className="flex justify-between items-center mb-4">
                <label className="text-xs font-bold uppercase tracking-widest">Select Size</label>
                <button className="text-xs border-b border-black pb-0.5">SIZE GUIDE</button>
              </div>
              <div className="flex flex-wrap gap-3">
                {product.sizes.map(size => (
                  <button 
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`min-w-[50px] h-12 flex items-center justify-center rounded-xl border-2 transition text-sm font-bold ${selectedSize === size ? 'border-black bg-black text-white' : 'border-gray-100 hover:border-gray-300'}`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="flex space-x-4 mt-auto">
            <div className="flex-1 flex items-center space-x-4">
              <div className="flex items-center border border-gray-200 rounded-2xl h-14">
                 <button onClick={() => setQuantity(q => Math.max(1, q-1))} className="px-5 h-full hover:text-indigo-600 transition">-</button>
                 <span className="w-8 text-center font-bold">{quantity}</span>
                 <button onClick={() => setQuantity(q => q+1)} className="px-5 h-full hover:text-indigo-600 transition">+</button>
              </div>
              <button 
                onClick={handleAddToCart}
                disabled={added}
                className={`flex-1 h-14 rounded-2xl font-bold transition flex items-center justify-center space-x-2 ${added ? 'bg-green-600 text-white' : 'bg-black text-white hover:bg-gray-800 shadow-xl'}`}
              >
                {added ? (
                  <span>ADDED TO BAG</span>
                ) : (
                  <>
                    <ShoppingBag size={20} />
                    <span>ADD TO BAG</span>
                  </>
                )}
              </button>
            </div>
            <button 
              onClick={() => toggleWishlist(product.id)}
              className={`w-14 h-14 rounded-2xl border flex items-center justify-center transition ${wishlist.includes(product.id) ? 'border-red-500 bg-red-50 text-red-500' : 'border-gray-200 hover:border-gray-400'}`}
            >
              <Heart size={20} className={wishlist.includes(product.id) ? 'fill-current' : ''} />
            </button>
          </div>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 py-8 border-t border-gray-100">
             <div className="flex items-center text-[11px] font-bold text-gray-500">
               <Truck size={14} className="mr-2" /> FREE WORLDWIDE SHIPPING
             </div>
             <div className="flex items-center text-[11px] font-bold text-gray-500">
               <ShieldCheck size={14} className="mr-2" /> 2 YEAR WARRANTY
             </div>
             <div className="flex items-center text-[11px] font-bold text-gray-500">
               <RefreshCcw size={14} className="mr-2" /> 30-DAY EASY RETURNS
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};
