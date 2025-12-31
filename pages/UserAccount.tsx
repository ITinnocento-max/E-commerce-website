
import React from 'react';
import { User, Package, MapPin, Settings, Heart, LogOut } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';

export const UserAccount: React.FC = () => {
  const { user, orders, wishlist, products, logout } = useApp();
  const navigate = useNavigate();

  if (!user) {
    navigate('/auth');
    return null;
  }

  const wishlistItems = products.filter(p => wishlist.includes(p.id));

  return (
    <div className="pt-32 pb-24 container mx-auto px-6">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
        {/* Sidebar Nav */}
        <aside className="space-y-4">
           <div className="glass rounded-3xl p-8 text-center mb-8">
              <div className="w-20 h-20 bg-black text-white rounded-full flex items-center justify-center text-3xl font-serif mx-auto mb-4">
                 {user.name.charAt(0)}
              </div>
              <h2 className="text-xl font-bold">{user.name}</h2>
              <p className="text-sm text-gray-500">{user.email}</p>
           </div>
           
           <nav className="space-y-2">
             <button className="w-full flex items-center p-4 bg-black text-white rounded-2xl text-sm font-bold shadow-lg">
                <Package size={18} className="mr-3" /> Order History
             </button>
             <button className="w-full flex items-center p-4 hover:bg-gray-100 rounded-2xl text-sm font-bold transition">
                <Heart size={18} className="mr-3" /> My Wishlist
             </button>
             <button className="w-full flex items-center p-4 hover:bg-gray-100 rounded-2xl text-sm font-bold transition">
                <MapPin size={18} className="mr-3" /> Saved Addresses
             </button>
             <button className="w-full flex items-center p-4 hover:bg-gray-100 rounded-2xl text-sm font-bold transition">
                <Settings size={18} className="mr-3" /> Account Settings
             </button>
             <button onClick={() => { logout(); navigate('/'); }} className="w-full flex items-center p-4 text-red-500 hover:bg-red-50 rounded-2xl text-sm font-bold transition">
                <LogOut size={18} className="mr-3" /> Logout
             </button>
           </nav>
        </aside>

        {/* Main Content */}
        <div className="lg:col-span-3 space-y-12">
           <section>
              <h2 className="text-2xl font-serif font-bold mb-8">Recent Orders</h2>
              {orders.length === 0 ? (
                <div className="p-12 text-center bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200">
                  <Package size={48} className="mx-auto text-gray-300 mb-4" />
                  <p className="text-gray-500">No orders placed yet.</p>
                </div>
              ) : (
                <div className="space-y-6">
                  {orders.map(order => (
                    <div key={order.id} className="bg-white border border-gray-100 rounded-3xl p-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 shadow-sm">
                       <div>
                         <p className="text-xs font-bold text-gray-400 mb-1 uppercase tracking-widest">Order ID: {order.id}</p>
                         <p className="font-bold text-lg mb-2">{new Date(order.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                         <div className="flex -space-x-3">
                            {order.items.slice(0, 3).map((item, idx) => {
                               const p = products.find(prod => prod.id === item.productId);
                               return <img key={idx} src={p?.images[0]} className="w-10 h-10 rounded-full border-2 border-white object-cover" alt="" />;
                            })}
                            {order.items.length > 3 && (
                              <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-[10px] font-bold border-2 border-white">
                                +{order.items.length - 3}
                              </div>
                            )}
                         </div>
                       </div>
                       <div className="text-left md:text-right">
                          <span className={`inline-block px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest mb-2 ${order.status === 'Delivered' ? 'bg-green-50 text-green-600' : 'bg-orange-50 text-orange-600'}`}>
                             {order.status}
                          </span>
                          <p className="text-xl font-bold">${order.total}</p>
                       </div>
                    </div>
                  ))}
                </div>
              )}
           </section>

           <section>
              <h2 className="text-2xl font-serif font-bold mb-8">Your Wishlist</h2>
              {wishlistItems.length === 0 ? (
                <div className="p-12 text-center bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200">
                  <Heart size={48} className="mx-auto text-gray-300 mb-4" />
                  <p className="text-gray-500">Your wishlist is empty.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                   {wishlistItems.map(item => (
                     <div key={item.id} className="group cursor-pointer" onClick={() => navigate(`/product/${item.id}`)}>
                        <div className="aspect-[4/5] rounded-2xl overflow-hidden mb-4">
                           <img src={item.images[0]} className="w-full h-full object-cover group-hover:scale-105 transition" alt={item.name} />
                        </div>
                        <h4 className="font-medium text-sm">{item.name}</h4>
                        <p className="text-sm font-bold">${item.price}</p>
                     </div>
                   ))}
                </div>
              )}
           </section>
        </div>
      </div>
    </div>
  );
};
