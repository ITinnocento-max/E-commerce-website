
import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, User, CartItem, Order, UserRole, OrderStatus } from '../types';
import { INITIAL_PRODUCTS } from '../constants';

interface AppContextType {
  products: Product[];
  user: User | null;
  cart: CartItem[];
  wishlist: string[];
  orders: Order[];
  login: (email: string, role: UserRole) => void;
  logout: () => void;
  addToCart: (item: CartItem) => void;
  removeFromCart: (productId: string) => void;
  updateCartQuantity: (productId: string, qty: number) => void;
  clearCart: () => void;
  toggleWishlist: (productId: string) => void;
  addOrder: (order: Order) => void;
  updateOrder: (orderId: string, status: OrderStatus) => void;
  addProduct: (p: Product) => void;
  updateProduct: (p: Product) => void;
  deleteProduct: (id: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>(() => {
    const saved = localStorage.getItem('vv_products');
    return saved ? JSON.parse(saved) : INITIAL_PRODUCTS;
  });
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('vv_user');
    return saved ? JSON.parse(saved) : null;
  });
  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('vv_cart');
    return saved ? JSON.parse(saved) : [];
  });
  const [wishlist, setWishlist] = useState<string[]>(() => {
    const saved = localStorage.getItem('vv_wishlist');
    return saved ? JSON.parse(saved) : [];
  });
  const [orders, setOrders] = useState<Order[]>(() => {
    const saved = localStorage.getItem('vv_orders');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('vv_products', JSON.stringify(products));
    localStorage.setItem('vv_user', JSON.stringify(user));
    localStorage.setItem('vv_cart', JSON.stringify(cart));
    localStorage.setItem('vv_wishlist', JSON.stringify(wishlist));
    localStorage.setItem('vv_orders', JSON.stringify(orders));
  }, [products, user, cart, wishlist, orders]);

  const login = (email: string, role: UserRole) => {
    const name = email.split('@')[0];
    const newUser: User = {
      id: Math.random().toString(36).substr(2, 9),
      name: name.charAt(0).toUpperCase() + name.slice(1),
      email,
      role
    };
    setUser(newUser);
  };

  const logout = () => {
    setUser(null);
  };

  const addToCart = (item: CartItem) => {
    setCart(prev => {
      const existing = prev.find(i => i.productId === item.productId && i.selectedSize === item.selectedSize);
      if (existing) {
        return prev.map(i => (i.productId === item.productId && i.selectedSize === item.selectedSize) ? { ...i, quantity: i.quantity + item.quantity } : i);
      }
      return [...prev, item];
    });
  };

  const removeFromCart = (productId: string) => {
    setCart(prev => prev.filter(i => i.productId !== productId));
  };

  const updateCartQuantity = (productId: string, qty: number) => {
    setCart(prev => prev.map(i => i.productId === productId ? { ...i, quantity: Math.max(1, qty) } : i));
  };

  const clearCart = () => setCart([]);

  const toggleWishlist = (productId: string) => {
    setWishlist(prev => prev.includes(productId) ? prev.filter(id => id !== productId) : [...prev, productId]);
  };

  const addOrder = (order: Order) => {
    setOrders(prev => [order, ...prev]);
    clearCart();
  };

  const updateOrder = (orderId: string, status: OrderStatus) => {
    setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status } : o));
  };

  const addProduct = (p: Product) => setProducts(prev => [p, ...prev]);
  const updateProduct = (p: Product) => setProducts(prev => prev.map(item => item.id === p.id ? p : item));
  const deleteProduct = (id: string) => setProducts(prev => prev.filter(p => p.id !== id));

  return (
    <AppContext.Provider value={{ 
      products, user, cart, wishlist, orders,
      login, logout, addToCart, removeFromCart, updateCartQuantity, clearCart,
      toggleWishlist, addOrder, updateOrder,
      addProduct, updateProduct, deleteProduct
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error("useApp must be used within AppProvider");
  return context;
};
