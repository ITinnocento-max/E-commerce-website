
import React, { useState } from 'react';
import { 
  Users, ShoppingCart, Package, DollarSign, Plus, Edit, Trash2, 
  Search, Check, X, Filter, BarChart3, TrendingUp, ArrowUpRight 
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Category, Product, UserRole, OrderStatus } from '../types';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, Cell } from 'recharts';

export const AdminDashboard: React.FC = () => {
  const { products, orders, user, addProduct, updateProduct, deleteProduct, updateOrder } = useApp();
  const [view, setView] = useState<'overview' | 'products' | 'orders' | 'users'>('overview');
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  if (!user || user.role !== UserRole.ADMIN) {
    return <div className="pt-40 text-center">Unauthorized.</div>;
  }

  // Stats
  const totalSales = orders.reduce((acc, o) => acc + o.total, 0);
  const pendingOrders = orders.filter(o => o.status === OrderStatus.PENDING).length;

  // Chart data
  const salesData = [
    { name: 'Mon', sales: 4000 },
    { name: 'Tue', sales: 3000 },
    { name: 'Wed', sales: 2000 },
    { name: 'Thu', sales: 2780 },
    { name: 'Fri', sales: 1890 },
    { name: 'Sat', sales: 2390 },
    { name: 'Sun', sales: 3490 },
  ];

  const categoryData = Object.values(Category).map(cat => ({
    name: cat,
    value: products.filter(p => p.category === cat).length
  }));

  const ProductForm = ({ product, onClose }: { product?: Product, onClose: () => void }) => {
    const [formData, setFormData] = useState<Partial<Product>>(product || {
      name: '',
      price: 0,
      description: '',
      category: Category.MEN,
      images: ['https://picsum.photos/seed/new/600/800'],
      sizes: ['S', 'M', 'L'],
      colors: ['Black', 'White'],
      stock: 10,
      rating: 5
    });

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      if (product) {
        updateProduct({ ...product, ...formData } as Product);
      } else {
        addProduct({ ...formData, id: Date.now().toString() } as Product);
      }
      onClose();
    };

    return (
      <div className="fixed inset-0 bg-black/50 z-[100] flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl w-full max-w-2xl p-8 max-h-[90vh] overflow-y-auto">
          <h2 className="text-2xl font-bold mb-6">{product ? 'Edit Product' : 'Add New Product'}</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
             <div>
               <label className="text-xs font-bold uppercase mb-2 block">Name</label>
               <input 
                 value={formData.name} 
                 onChange={(e) => setFormData({...formData, name: e.target.value})}
                 className="w-full bg-gray-50 p-3 rounded-xl" required 
                />
             </div>
             <div className="grid grid-cols-2 gap-4">
               <div>
                 <label className="text-xs font-bold uppercase mb-2 block">Price ($)</label>
                 <input 
                   type="number"
                   value={formData.price} 
                   onChange={(e) => setFormData({...formData, price: Number(e.target.value)})}
                   className="w-full bg-gray-50 p-3 rounded-xl" required 
                  />
               </div>
               <div>
                 <label className="text-xs font-bold uppercase mb-2 block">Category</label>
                 <select 
                   value={formData.category} 
                   onChange={(e) => setFormData({...formData, category: e.target.value as Category})}
                   className="w-full bg-gray-50 p-3 rounded-xl"
                 >
                   {Object.values(Category).map(cat => <option key={cat} value={cat}>{cat}</option>)}
                 </select>
               </div>
             </div>
             <div>
               <label className="text-xs font-bold uppercase mb-2 block">Description</label>
               <textarea 
                 value={formData.description} 
                 onChange={(e) => setFormData({...formData, description: e.target.value})}
                 className="w-full bg-gray-50 p-3 rounded-xl h-24" required 
               />
             </div>
             <div>
               <label className="text-xs font-bold uppercase mb-2 block">Stock Quantity</label>
               <input 
                 type="number"
                 value={formData.stock} 
                 onChange={(e) => setFormData({...formData, stock: Number(e.target.value)})}
                 className="w-full bg-gray-50 p-3 rounded-xl" required 
               />
             </div>
             <div className="flex gap-4 pt-4">
               <button type="button" onClick={onClose} className="flex-1 border py-3 rounded-xl font-bold">Cancel</button>
               <button type="submit" className="flex-1 bg-black text-white py-3 rounded-xl font-bold">Save Product</button>
             </div>
          </form>
        </div>
      </div>
    );
  };

  return (
    <div className="pt-20 min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 p-6 space-y-10 hidden lg:block">
        <div className="text-xl font-serif font-bold italic">Admin Console</div>
        <nav className="space-y-2">
           <button onClick={() => setView('overview')} className={`w-full flex items-center p-3 rounded-xl text-sm font-medium transition ${view === 'overview' ? 'bg-black text-white' : 'hover:bg-gray-100 text-gray-500'}`}>
              <BarChart3 size={18} className="mr-3" /> Dashboard
           </button>
           <button onClick={() => setView('products')} className={`w-full flex items-center p-3 rounded-xl text-sm font-medium transition ${view === 'products' ? 'bg-black text-white' : 'hover:bg-gray-100 text-gray-500'}`}>
              <Package size={18} className="mr-3" /> Products
           </button>
           <button onClick={() => setView('orders')} className={`w-full flex items-center p-3 rounded-xl text-sm font-medium transition ${view === 'orders' ? 'bg-black text-white' : 'hover:bg-gray-100 text-gray-500'}`}>
              <ShoppingCart size={18} className="mr-3" /> Orders
           </button>
           <button onClick={() => setView('users')} className={`w-full flex items-center p-3 rounded-xl text-sm font-medium transition ${view === 'users' ? 'bg-black text-white' : 'hover:bg-gray-100 text-gray-500'}`}>
              <Users size={18} className="mr-3" /> Users
           </button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-y-auto">
        {view === 'overview' && (
          <div className="space-y-8 animate-in fade-in duration-500">
             <div className="flex justify-between items-center">
               <h1 className="text-3xl font-bold">Overview</h1>
               <div className="text-sm font-medium text-gray-500">Last updated: Just now</div>
             </div>

             <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
                   <div className="flex justify-between mb-4">
                      <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg"><DollarSign size={20}/></div>
                      <span className="text-green-500 text-xs font-bold flex items-center"><ArrowUpRight size={12}/> +12%</span>
                   </div>
                   <p className="text-gray-500 text-sm font-medium">Total Revenue</p>
                   <p className="text-2xl font-bold">${totalSales.toLocaleString()}</p>
                </div>
                <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
                   <div className="flex justify-between mb-4">
                      <div className="p-2 bg-orange-50 text-orange-600 rounded-lg"><ShoppingCart size={20}/></div>
                   </div>
                   <p className="text-gray-500 text-sm font-medium">Orders</p>
                   <p className="text-2xl font-bold">{orders.length}</p>
                </div>
                <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
                   <div className="flex justify-between mb-4">
                      <div className="p-2 bg-blue-50 text-blue-600 rounded-lg"><Package size={20}/></div>
                   </div>
                   <p className="text-gray-500 text-sm font-medium">Products</p>
                   <p className="text-2xl font-bold">{products.length}</p>
                </div>
                <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
                   <div className="flex justify-between mb-4">
                      <div className="p-2 bg-red-50 text-red-600 rounded-lg"><TrendingUp size={20}/></div>
                   </div>
                   <p className="text-gray-500 text-sm font-medium">Pending Tasks</p>
                   <p className="text-2xl font-bold">{pendingOrders}</p>
                </div>
             </div>

             <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 h-96">
                   <h3 className="text-lg font-bold mb-6">Sales Performance</h3>
                   <ResponsiveContainer width="100%" height="80%">
                      <LineChart data={salesData}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} />
                        <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 12}} />
                        <YAxis axisLine={false} tickLine={false} tick={{fontSize: 12}} />
                        <Tooltip />
                        <Line type="monotone" dataKey="sales" stroke="#000" strokeWidth={3} dot={{r: 4, fill: "#000"}} />
                      </LineChart>
                   </ResponsiveContainer>
                </div>
                <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 h-96">
                   <h3 className="text-lg font-bold mb-6">Stock by Category</h3>
                   <ResponsiveContainer width="100%" height="80%">
                      <BarChart data={categoryData}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} />
                        <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 12}} />
                        <YAxis axisLine={false} tickLine={false} tick={{fontSize: 12}} />
                        <Tooltip />
                        <Bar dataKey="value" fill="#000" radius={[4, 4, 0, 0]} />
                      </BarChart>
                   </ResponsiveContainer>
                </div>
             </div>
          </div>
        )}

        {view === 'products' && (
          <div className="animate-in fade-in duration-500">
             <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold">Inventory</h1>
                <button 
                  onClick={() => setShowAddProduct(true)}
                  className="bg-black text-white px-6 py-3 rounded-xl font-bold flex items-center"
                >
                   <Plus size={18} className="mr-2" /> Add Product
                </button>
             </div>

             <div className="bg-white rounded-3xl shadow-sm overflow-hidden border border-gray-100">
                <table className="w-full text-left">
                   <thead className="bg-gray-50 text-xs font-bold uppercase tracking-widest text-gray-500">
                      <tr>
                        <th className="px-6 py-4">Product</th>
                        <th className="px-6 py-4">Category</th>
                        <th className="px-6 py-4">Price</th>
                        <th className="px-6 py-4">Stock</th>
                        <th className="px-6 py-4 text-right">Actions</th>
                      </tr>
                   </thead>
                   <tbody className="divide-y divide-gray-100">
                      {products.map(p => (
                        <tr key={p.id} className="hover:bg-gray-50 transition">
                           <td className="px-6 py-4">
                              <div className="flex items-center">
                                <img src={p.images[0]} className="w-10 h-10 rounded-lg object-cover mr-3" alt="" />
                                <span className="font-medium">{p.name}</span>
                              </div>
                           </td>
                           <td className="px-6 py-4 text-sm">{p.category}</td>
                           <td className="px-6 py-4 text-sm font-bold">${p.price}</td>
                           <td className="px-6 py-4 text-sm">
                             <span className={`px-2 py-1 rounded-full text-xs font-bold ${p.stock < 10 ? 'bg-red-50 text-red-600' : 'bg-green-50 text-green-600'}`}>
                               {p.stock} units
                             </span>
                           </td>
                           <td className="px-6 py-4 text-right">
                              <div className="flex justify-end space-x-2">
                                <button onClick={() => setEditingProduct(p)} className="p-2 hover:bg-gray-100 rounded-lg transition"><Edit size={16}/></button>
                                <button onClick={() => deleteProduct(p.id)} className="p-2 hover:bg-red-50 text-red-500 rounded-lg transition"><Trash2 size={16}/></button>
                              </div>
                           </td>
                        </tr>
                      ))}
                   </tbody>
                </table>
             </div>
          </div>
        )}

        {view === 'orders' && (
          <div className="animate-in fade-in duration-500">
             <h1 className="text-3xl font-bold mb-8">Order Management</h1>
             <div className="bg-white rounded-3xl shadow-sm overflow-hidden border border-gray-100">
                <table className="w-full text-left">
                   <thead className="bg-gray-50 text-xs font-bold uppercase tracking-widest text-gray-500">
                      <tr>
                        <th className="px-6 py-4">Order ID</th>
                        <th className="px-6 py-4">Date</th>
                        <th className="px-6 py-4">Status</th>
                        <th className="px-6 py-4">Total</th>
                        <th className="px-6 py-4 text-right">Update Status</th>
                      </tr>
                   </thead>
                   <tbody className="divide-y divide-gray-100">
                      {orders.map(o => (
                        <tr key={o.id} className="hover:bg-gray-50 transition">
                           <td className="px-6 py-4 font-bold">{o.id}</td>
                           <td className="px-6 py-4 text-sm text-gray-500">{new Date(o.createdAt).toLocaleDateString()}</td>
                           <td className="px-6 py-4">
                              <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${
                                o.status === OrderStatus.PENDING ? 'bg-orange-50 text-orange-600' : 
                                o.status === OrderStatus.DELIVERED ? 'bg-green-50 text-green-600' : 
                                o.status === OrderStatus.CANCELED ? 'bg-red-50 text-red-600' : 'bg-blue-50 text-blue-600'
                              }`}>
                                {o.status}
                              </span>
                           </td>
                           <td className="px-6 py-4 font-bold">${o.total}</td>
                           <td className="px-6 py-4 text-right">
                              <select 
                                value={o.status}
                                onChange={(e) => updateOrder(o.id, e.target.value as OrderStatus)}
                                className="text-xs bg-gray-50 border-none rounded-lg p-2 focus:ring-1 focus:ring-black"
                              >
                                 {Object.values(OrderStatus).map(st => <option key={st} value={st}>{st}</option>)}
                              </select>
                           </td>
                        </tr>
                      ))}
                   </tbody>
                </table>
             </div>
          </div>
        )}
      </main>

      {(showAddProduct || editingProduct) && (
        <ProductForm 
          product={editingProduct || undefined} 
          onClose={() => { setShowAddProduct(false); setEditingProduct(null); }} 
        />
      )}
    </div>
  );
};
