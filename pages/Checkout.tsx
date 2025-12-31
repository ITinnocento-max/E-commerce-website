
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CreditCard, Truck, CheckCircle, ArrowLeft } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { OrderStatus } from '../types';

export const Checkout: React.FC = () => {
  const { cart, products, addOrder, user } = useApp();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [address, setAddress] = useState('');
  const [cardName, setCardName] = useState('');
  const [cardNumber, setCardNumber] = useState('');

  const cartDetails = cart.map(item => {
    const p = products.find(prod => prod.id === item.productId);
    return { ...item, ...p };
  });

  const subtotal = cartDetails.reduce((acc, item) => acc + (item.price || 0) * item.quantity, 0);
  const total = subtotal > 200 ? subtotal : subtotal + 25;

  const handleCompleteOrder = () => {
    if (!user) {
      navigate('/auth');
      return;
    }
    const order = {
      id: `ORD-${Math.random().toString(36).substr(2, 6).toUpperCase()}`,
      userId: user.id,
      items: [...cart],
      total,
      status: OrderStatus.PENDING,
      createdAt: new Date().toISOString(),
      address
    };
    addOrder(order);
    setStep(3);
  };

  if (step === 3) {
    return (
      <div className="pt-40 pb-24 text-center container mx-auto px-6 animate-in zoom-in duration-300">
        <div className="bg-white rounded-3xl p-16 max-w-xl mx-auto shadow-2xl">
          <CheckCircle size={80} className="mx-auto text-green-500 mb-8" />
          <h2 className="text-4xl font-serif font-bold mb-4">Thank you for your order!</h2>
          <p className="text-gray-500 mb-8">We've received your request and we're getting it ready for shipment. You will receive a confirmation email shortly.</p>
          <div className="space-y-4">
            <button onClick={() => navigate('/account')} className="w-full bg-black text-white py-4 rounded-xl font-bold hover:bg-gray-800 transition">VIEW ORDER HISTORY</button>
            <button onClick={() => navigate('/shop')} className="w-full border border-black py-4 rounded-xl font-bold hover:bg-gray-50 transition">CONTINUE SHOPPING</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-24 container mx-auto px-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        <div>
           <button onClick={() => navigate('/cart')} className="flex items-center text-sm font-bold mb-8 hover:opacity-70">
             <ArrowLeft size={16} className="mr-2"/> RETURN TO BAG
           </button>
           <h1 className="text-3xl font-serif font-bold mb-10">Checkout</h1>
           
           <div className="space-y-12">
              {/* Step 1: Shipping */}
              <div className={step === 1 ? "opacity-100" : "opacity-40"}>
                 <div className="flex items-center space-x-4 mb-6">
                    <div className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center font-bold">1</div>
                    <h2 className="text-xl font-bold">Shipping Details</h2>
                 </div>
                 {step === 1 && (
                   <div className="space-y-4 animate-in slide-in-from-left duration-300">
                      <div className="grid grid-cols-2 gap-4">
                        <input placeholder="First Name" className="w-full bg-gray-50 border-none px-4 py-3 rounded-xl focus:ring-1 focus:ring-black" />
                        <input placeholder="Last Name" className="w-full bg-gray-50 border-none px-4 py-3 rounded-xl focus:ring-1 focus:ring-black" />
                      </div>
                      <input 
                        placeholder="Shipping Address" 
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        className="w-full bg-gray-50 border-none px-4 py-3 rounded-xl focus:ring-1 focus:ring-black" 
                      />
                      <div className="grid grid-cols-3 gap-4">
                        <input placeholder="City" className="w-full bg-gray-50 border-none px-4 py-3 rounded-xl focus:ring-1 focus:ring-black" />
                        <input placeholder="State" className="w-full bg-gray-50 border-none px-4 py-3 rounded-xl focus:ring-1 focus:ring-black" />
                        <input placeholder="Zip Code" className="w-full bg-gray-50 border-none px-4 py-3 rounded-xl focus:ring-1 focus:ring-black" />
                      </div>
                      <button 
                        onClick={() => address && setStep(2)}
                        className="w-full bg-black text-white py-4 rounded-xl font-bold mt-4 disabled:opacity-50"
                        disabled={!address}
                      >
                        CONTINUE TO PAYMENT
                      </button>
                   </div>
                 )}
              </div>

              {/* Step 2: Payment */}
              <div className={step === 2 ? "opacity-100" : "opacity-40"}>
                 <div className="flex items-center space-x-4 mb-6">
                    <div className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center font-bold">2</div>
                    <h2 className="text-xl font-bold">Payment Method</h2>
                 </div>
                 {step === 2 && (
                   <div className="space-y-4 animate-in slide-in-from-left duration-300">
                      <div className="relative">
                        <input 
                          placeholder="Cardholder Name" 
                          value={cardName}
                          onChange={(e) => setCardName(e.target.value)}
                          className="w-full bg-gray-50 border-none px-4 py-3 rounded-xl focus:ring-1 focus:ring-black" 
                        />
                      </div>
                      <div className="relative">
                        <input 
                          placeholder="Card Number" 
                          value={cardNumber}
                          onChange={(e) => setCardNumber(e.target.value)}
                          className="w-full bg-gray-50 border-none px-4 py-3 rounded-xl focus:ring-1 focus:ring-black" 
                        />
                        <CreditCard size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <input placeholder="MM/YY" className="w-full bg-gray-50 border-none px-4 py-3 rounded-xl focus:ring-1 focus:ring-black" />
                        <input placeholder="CVV" className="w-full bg-gray-50 border-none px-4 py-3 rounded-xl focus:ring-1 focus:ring-black" />
                      </div>
                      <button 
                        onClick={handleCompleteOrder}
                        disabled={!cardName || !cardNumber}
                        className="w-full bg-black text-white py-4 rounded-xl font-bold mt-4 disabled:opacity-50"
                      >
                        PLACE ORDER - ${total.toFixed(2)}
                      </button>
                   </div>
                 )}
              </div>
           </div>
        </div>

        {/* Order Summary Sidebar */}
        <div>
           <div className="glass rounded-3xl p-10 space-y-8 sticky top-32">
              <h3 className="text-xl font-bold">Summary</h3>
              <div className="max-h-64 overflow-y-auto space-y-6 pr-4">
                 {cartDetails.map((item, idx) => (
                   <div key={idx} className="flex gap-4">
                      <img src={item.images?.[0]} className="w-16 h-20 object-cover rounded-lg" alt="" />
                      <div className="flex-1">
                        <h4 className="text-sm font-bold">{item.name}</h4>
                        <p className="text-[11px] text-gray-500">Qty: {item.quantity} | Size: {item.selectedSize}</p>
                        <p className="text-sm font-bold mt-1">${(item.price || 0) * item.quantity}</p>
                      </div>
                   </div>
                 ))}
              </div>
              <div className="pt-6 border-t border-gray-100 space-y-4">
                 <div className="flex justify-between text-gray-600 text-sm">
                   <span>Subtotal</span>
                   <span>${subtotal.toFixed(2)}</span>
                 </div>
                 <div className="flex justify-between text-gray-600 text-sm">
                   <span>Shipping</span>
                   <span>{subtotal > 200 ? 'FREE' : '$25.00'}</span>
                 </div>
                 <div className="flex justify-between text-xl font-bold pt-4 border-t border-gray-100">
                   <span>Total</span>
                   <span>${total.toFixed(2)}</span>
                 </div>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};
