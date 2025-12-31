
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingBag, User, Heart, Menu, X, Search, LogOut, LayoutDashboard, MessageSquare } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { UserRole } from '../types';

export const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { cart, user, logout } = useApp();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          <div className="flex items-center">
            <Link to="/" className="text-2xl font-serif font-bold tracking-widest text-black">
              VOGUE & VERVE
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <Link to="/shop" className="text-sm font-medium hover:text-indigo-600 transition">SHOP</Link>
            <Link to="/shop?cat=Men" className="text-sm font-medium hover:text-indigo-600 transition">MEN</Link>
            <Link to="/shop?cat=Women" className="text-sm font-medium hover:text-indigo-600 transition">WOMEN</Link>
            <Link to="/about" className="text-sm font-medium hover:text-indigo-600 transition">OUR STORY</Link>
          </div>

          <div className="flex items-center space-x-5">
            <button className="p-2 hover:bg-gray-100 rounded-full transition"><Search size={20} /></button>
            <Link to="/wishlist" className="p-2 hover:bg-gray-100 rounded-full transition"><Heart size={20} /></Link>
            <Link to="/cart" className="p-2 hover:bg-gray-100 rounded-full transition relative">
              <ShoppingBag size={20} />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-black text-white text-[10px] w-5 h-5 flex items-center justify-center rounded-full font-bold">
                  {cartCount}
                </span>
              )}
            </Link>
            
            {user ? (
              <div className="group relative flex items-center space-x-2 cursor-pointer">
                <div className="w-8 h-8 bg-black text-white rounded-full flex items-center justify-center text-xs font-bold">
                  {user.name.charAt(0).toUpperCase()}
                </div>
                <div className="absolute top-10 right-0 w-48 bg-white border border-gray-100 rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all py-2 z-[60]">
                   <Link to="/account" className="flex items-center px-4 py-2 text-sm hover:bg-gray-50"><User size={16} className="mr-2"/> Profile</Link>
                   {user.role === UserRole.ADMIN && (
                     <Link to="/admin" className="flex items-center px-4 py-2 text-sm hover:bg-gray-50"><LayoutDashboard size={16} className="mr-2"/> Dashboard</Link>
                   )}
                   <button onClick={handleLogout} className="w-full flex items-center px-4 py-2 text-sm text-red-600 hover:bg-gray-50"><LogOut size={16} className="mr-2"/> Logout</button>
                </div>
              </div>
            ) : (
              <Link to="/auth" className="p-2 hover:bg-gray-100 rounded-full transition"><User size={20} /></Link>
            )}

            <button onClick={() => setIsOpen(!isOpen)} className="md:hidden p-2"><Menu size={20} /></button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 py-4 px-4 space-y-4 animate-in slide-in-from-top duration-300">
          <Link to="/shop" className="block text-lg font-medium">Shop All</Link>
          <Link to="/shop?cat=Men" className="block text-lg font-medium">Men</Link>
          <Link to="/shop?cat=Women" className="block text-lg font-medium">Women</Link>
          <Link to="/about" className="block text-lg font-medium">Our Story</Link>
          <div className="pt-4 border-t border-gray-100">
            {user ? (
               <div className="flex flex-col space-y-2">
                 <Link to="/account" className="text-sm">Account Settings</Link>
                 <button onClick={handleLogout} className="text-sm text-red-500 text-left">Logout</button>
               </div>
            ) : (
              <Link to="/auth" className="block text-lg font-medium">Login / Sign Up</Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-gray-200 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="space-y-4">
          <h3 className="text-xl font-serif font-bold tracking-widest">VOGUE & VERVE</h3>
          <p className="text-gray-500 text-sm leading-relaxed">
            Crafting premium aesthetics for the modern individual. Quality, sustainability, and timeless design.
          </p>
        </div>
        <div>
          <h4 className="font-bold text-sm uppercase tracking-widest mb-6">Shopping</h4>
          <ul className="space-y-3 text-sm text-gray-600">
            <li><Link to="/shop?cat=New Arrivals" className="hover:text-black transition">New Arrivals</Link></li>
            <li><Link to="/shop?cat=Best Sellers" className="hover:text-black transition">Best Sellers</Link></li>
            <li><Link to="/shop?cat=Men" className="hover:text-black transition">Men's Collection</Link></li>
            <li><Link to="/shop?cat=Women" className="hover:text-black transition">Women's Collection</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold text-sm uppercase tracking-widest mb-6">Company</h4>
          <ul className="space-y-3 text-sm text-gray-600">
            <li><Link to="/about" className="hover:text-black transition">About Us</Link></li>
            <li><Link to="/contact" className="hover:text-black transition">Contact Us</Link></li>
            <li><Link to="/faq" className="hover:text-black transition">FAQs</Link></li>
            <li><Link to="/terms" className="hover:text-black transition">Terms & Privacy</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold text-sm uppercase tracking-widest mb-6">Newsletter</h4>
          <p className="text-sm text-gray-500 mb-4">Join our list for exclusive drops and private sales.</p>
          <div className="flex">
            <input type="email" placeholder="Email Address" className="bg-gray-100 border-none px-4 py-2 text-sm w-full focus:ring-1 focus:ring-black" />
            <button className="bg-black text-white px-6 py-2 text-sm hover:bg-gray-800 transition">JOIN</button>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 mt-16 pt-8 border-t border-gray-100 flex flex-col md:row items-center justify-between space-y-4 md:space-y-0 text-xs text-gray-400">
        <p>&copy; 2024 VOGUE & VERVE. All rights reserved.</p>
        <div className="flex space-x-6">
          <span>Instagram</span>
          <span>Twitter</span>
          <span>Pinterest</span>
        </div>
      </div>
    </footer>
  );
};

export const GlassCard: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = "" }) => (
  <div className={`glass rounded-2xl p-6 shadow-lg ${className}`}>
    {children}
  </div>
);

export const AIShopAssistant: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<{role: 'user' | 'ai', text: string}[]>([
    {role: 'ai', text: 'Hello! I am your Vogue & Verve personal stylist. How can I help you today?'}
  ]);
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;
    const userMsg = input;
    setMessages(prev => [...prev, {role: 'user', text: userMsg}]);
    setInput('');
    setLoading(true);

    const { getFashionAdvice } = await import('../services/geminiService');
    const advice = await getFashionAdvice(userMsg);
    setMessages(prev => [...prev, {role: 'ai', text: advice}]);
    setLoading(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-[100]">
      {!open ? (
        <button 
          onClick={() => setOpen(true)}
          className="w-14 h-14 bg-black text-white rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-transform"
        >
          <MessageSquare size={24} />
        </button>
      ) : (
        <div className="w-80 sm:w-96 glass rounded-2xl shadow-2xl overflow-hidden border border-gray-200 animate-in fade-in zoom-in duration-200">
          <div className="bg-black text-white p-4 flex justify-between items-center">
            <span className="font-medium">AI Stylist</span>
            <button onClick={() => setOpen(false)}><X size={18} /></button>
          </div>
          <div className="h-80 overflow-y-auto p-4 space-y-4 bg-white/30">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] p-3 rounded-2xl text-sm ${m.role === 'user' ? 'bg-black text-white' : 'glass-dark text-white'}`}>
                  {m.text}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="glass-dark text-white p-3 rounded-2xl text-xs animate-pulse">Stylist is thinking...</div>
              </div>
            )}
          </div>
          <div className="p-3 border-t border-gray-200 bg-white/50 flex gap-2">
            <input 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
              placeholder="Ask for fashion advice..."
              className="flex-1 bg-white/80 border-none rounded-full px-4 py-2 text-sm focus:ring-1 focus:ring-black"
            />
            <button 
              onClick={sendMessage}
              className="bg-black text-white w-10 h-10 rounded-full flex items-center justify-center"
            >
              <ShoppingBag size={16} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
