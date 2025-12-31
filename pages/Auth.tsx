
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, User as UserIcon, ArrowRight } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { UserRole } from '../types';

export const Auth: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useApp();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, validation logic would be here
    const role = email.includes('admin') ? UserRole.ADMIN : UserRole.USER;
    login(email, role);
    navigate(role === UserRole.ADMIN ? '/admin' : '/');
  };

  return (
    <div className="pt-20 min-h-screen flex items-center justify-center bg-gray-50 p-6">
      <div className="max-w-4xl w-full grid grid-cols-1 md:grid-cols-2 rounded-[2.5rem] overflow-hidden shadow-2xl bg-white border border-gray-100">
        {/* Visual Side */}
        <div className="relative hidden md:block">
           <img 
             src="https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&q=80&w=1000" 
             className="w-full h-full object-cover" 
             alt="Fashion"
           />
           <div className="absolute inset-0 bg-black/20 flex flex-col justify-end p-12 text-white">
              <h2 className="text-4xl font-serif font-bold mb-4">Join the Collective.</h2>
              <p className="text-lg text-gray-200">Exclusive access to limited releases and personalized style curation.</p>
           </div>
        </div>

        {/* Form Side */}
        <div className="p-12 flex flex-col justify-center">
           <div className="mb-10 text-center md:text-left">
              <h1 className="text-3xl font-serif font-bold mb-2">{isLogin ? 'Welcome Back' : 'Create Account'}</h1>
              <p className="text-gray-500">{isLogin ? 'Enter your details to access your wardrobe.' : 'Start your high-fashion journey today.'}</p>
           </div>

           <form onSubmit={handleSubmit} className="space-y-6">
              {!isLogin && (
                <div className="relative">
                   <UserIcon size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                   <input placeholder="Full Name" className="w-full bg-gray-50 border-none px-12 py-4 rounded-2xl focus:ring-1 focus:ring-black" />
                </div>
              )}
              <div className="relative">
                 <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                 <input 
                   type="email" 
                   value={email}
                   onChange={(e) => setEmail(e.target.value)}
                   placeholder="Email Address" 
                   className="w-full bg-gray-50 border-none px-12 py-4 rounded-2xl focus:ring-1 focus:ring-black" 
                   required
                 />
              </div>
              <div className="relative">
                 <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                 <input 
                   type="password" 
                   value={password}
                   onChange={(e) => setPassword(e.target.value)}
                   placeholder="Password" 
                   className="w-full bg-gray-50 border-none px-12 py-4 rounded-2xl focus:ring-1 focus:ring-black" 
                   required
                 />
              </div>
              
              <button type="submit" className="w-full bg-black text-white py-4 rounded-2xl font-bold hover:bg-gray-800 transition flex items-center justify-center shadow-lg">
                {isLogin ? 'SIGN IN' : 'CREATE ACCOUNT'} <ArrowRight size={18} className="ml-2" />
              </button>
           </form>

           <div className="mt-8 text-center text-sm">
             <span className="text-gray-500">{isLogin ? "Don't have an account?" : "Already have an account?"}</span>
             <button onClick={() => setIsLogin(!isLogin)} className="ml-2 font-bold text-black border-b border-black">
               {isLogin ? 'Sign Up' : 'Log In'}
             </button>
           </div>

           <div className="mt-12 pt-8 border-t border-gray-100">
              <p className="text-xs text-center text-gray-400">
                Hint: Use "admin@vogue.com" to access admin dashboard.
              </p>
           </div>
        </div>
      </div>
    </div>
  );
};
