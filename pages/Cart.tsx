
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Trash2, Plus, Minus, ArrowRight, ShoppingBag } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const Cart: React.FC = () => {
  const { cart, products, removeFromCart, updateCartQuantity } = useApp();
  const navigate = useNavigate();

  const cartDetails = cart.map(item => {
    const p = products.find(prod => prod.id === item.productId);
    return { ...item, ...p };
  });

  const subtotal = cartDetails.reduce((acc, item) => acc + (item.price || 0) * item.quantity, 0);
  const shipping = subtotal > 200 ? 0 : 25;
  const total = subtotal + shipping;

  if (cart.length === 0) {
    return (
      <div className="pt-40 pb-24 text-center container mx-auto px-6">
        <div className="bg-gray-50 rounded-3xl p-12 max-w-xl mx-auto border-2 border-dashed border-gray-200">
          <ShoppingBag size={64} className="mx-auto text-gray-300 mb-6" />
          <h2 className="text-3xl font-serif font-bold mb-4">Your bag is empty</h2>
          <p className="text-gray-500 mb-8 leading-relaxed">Looks like you haven't added anything to your cart yet. Discover our latest arrivals and find something you love.</p>
          <Link to="/shop" className="inline-block bg-black text-white px-10 py-4 rounded-full font-bold hover:bg-gray-800 transition">
            START SHOPPING
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-24 container mx-auto px-6">
      <h1 className="text-4xl font-serif font-bold mb-12">Shopping Bag <span className="text-xl font-sans font-normal text-gray-400">({cart.length} items)</span></h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
        <div className="lg:col-span-2 space-y-8">
          {cartDetails.map((item, idx) => (
            <div key={`${item.productId}-${idx}`} className="flex flex-col sm:flex-row items-center gap-6 py-6 border-b border-gray-100 last:border-none">
              <div className="w-32 aspect-[3/4] bg-gray-100 rounded-2xl overflow-hidden shrink-0">
                <img src={item.images?.[0]} alt={item.name} className="w-full h-full object-cover" />
              </div>
              <div className="flex-1 space-y-2">
                <h3 className="text-lg font-bold">{item.name}</h3>
                <p className="text-sm text-gray-500">Color: {item.selectedColor} | Size: {item.selectedSize}</p>
                <div className="flex items-center space-x-6 pt-2">
                   <div className="flex items-center border border-gray-200 rounded-xl px-2 py-1">
                      <button onClick={() => updateCartQuantity(item.productId, item.quantity - 1)} className="px-2 hover:text-black transition"><Minus size={14}/></button>
                      <span className="px-2 text-sm font-bold w-8 text-center">{item.quantity}</span>
                      <button onClick={() => updateCartQuantity(item.productId, item.quantity + 1)} className="px-2 hover:text-black transition"><Plus size={14}/></button>
                   </div>
                   <button onClick={() => removeFromCart(item.productId)} className="text-red-500 hover:text-red-700 transition flex items-center text-xs font-bold">
                     <Trash2 size={14} className="mr-1" /> REMOVE
                   </button>
                </div>
              </div>
              <div className="text-lg font-bold">
                ${(item.price || 0) * item.quantity}
              </div>
            </div>
          ))}
        </div>

        <div className="lg:col-span-1">
          <div className="glass rounded-3xl p-8 sticky top-32 space-y-6">
            <h3 className="text-xl font-bold border-b border-gray-200 pb-4">Order Summary</h3>
            <div className="space-y-4">
               <div className="flex justify-between text-gray-600">
                 <span>Subtotal</span>
                 <span>${subtotal.toFixed(2)}</span>
               </div>
               <div className="flex justify-between text-gray-600">
                 <span>Shipping</span>
                 <span>{shipping === 0 ? <span className="text-green-600 font-bold">FREE</span> : `$${shipping.toFixed(2)}`}</span>
               </div>
               <div className="flex justify-between text-gray-600">
                 <span>Estimated Tax</span>
                 <span>$0.00</span>
               </div>
               <div className="pt-4 border-t border-gray-200 flex justify-between text-xl font-bold">
                 <span>Total</span>
                 <span>${total.toFixed(2)}</span>
               </div>
            </div>

            <button 
              onClick={() => navigate('/checkout')}
              className="w-full bg-black text-white py-5 rounded-2xl font-bold hover:bg-gray-800 transition flex items-center justify-center shadow-xl"
            >
              PROCEED TO CHECKOUT <ArrowRight size={18} className="ml-2" />
            </button>

            <div className="pt-6 space-y-3">
               <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest text-center">Accepted Payment Methods</p>
               <div className="flex justify-center space-x-4 opacity-50">
                  <span className="text-xs font-bold italic">VISA</span>
                  <span className="text-xs font-bold italic">MASTERCARD</span>
                  <span className="text-xs font-bold italic">PAYPAL</span>
                  <span className="text-xs font-bold italic">AMEX</span>
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
