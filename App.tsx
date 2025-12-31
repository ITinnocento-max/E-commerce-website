
import React from 'react';
import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import { Navbar, Footer, AIShopAssistant } from './components/Layout';
import { Home } from './pages/Home';
import { Shop } from './pages/Shop';
import { ProductDetails } from './pages/ProductDetails';
import { Cart } from './pages/Cart';
import { Checkout } from './pages/Checkout';
import { Auth } from './pages/Auth';
import { UserAccount } from './pages/UserAccount';
import { AdminDashboard } from './pages/AdminDashboard';

// Static / Informational Pages
const About = () => (
  <div className="pt-32 pb-24 container mx-auto px-6 max-w-4xl">
    <h1 className="text-5xl font-serif font-bold mb-12 italic">The Vogue & Verve Story</h1>
    <div className="space-y-8 text-lg leading-relaxed text-gray-600">
       <p>Founded in 2024, Vogue & Verve was born from a simple yet powerful idea: high fashion shouldn't compromise on ethics, and luxury should be timeless, not temporary.</p>
       <img src="https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&q=80&w=1200" className="w-full rounded-3xl my-12" alt="Our Atelier"/>
       <p>We work with master artisans across the globe to bring you pieces that are handcrafted with obsessive attention to detail. Every thread is selected for its quality, every silhouette designed for elegance.</p>
       <p>Our commitment to sustainability is at our core. We use recycled luxury fabrics and maintain a zero-waste atelier, ensuring that our impact on the planet is as beautiful as our garments.</p>
    </div>
  </div>
);

const FAQ = () => (
  <div className="pt-32 pb-24 container mx-auto px-6 max-w-3xl">
    <h1 className="text-4xl font-serif font-bold mb-12">Frequently Asked Questions</h1>
    <div className="space-y-8">
       {[
         { q: "How long does global shipping take?", a: "Most international orders arrive within 5-7 business days via our premium express partners." },
         { q: "What is your return policy?", a: "We offer 30-day complimentary returns for all items in their original condition." },
         { q: "Are your sizes true to fit?", a: "Yes, our sizes follow international luxury standards. You can check our detailed size guide on each product page." },
         { q: "Do you offer bespoke tailoring?", a: "Currently, we only offer our ready-to-wear collections, but we are launching a limited bespoke service later this year." }
       ].map((item, i) => (
         <div key={i} className="glass p-8 rounded-3xl">
           <h3 className="font-bold mb-4">{item.q}</h3>
           <p className="text-gray-500 text-sm leading-relaxed">{item.a}</p>
         </div>
       ))}
    </div>
  </div>
);

const AppRoutes = () => {
  const location = useLocation();
  const isAdminPage = location.pathname.startsWith('/admin');

  return (
    <div className="min-h-screen flex flex-col">
      {!isAdminPage && <Navbar />}
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/account" element={<UserAccount />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/about" element={<About />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/contact" element={<div className="pt-40 text-center">Contact Form Coming Soon</div>} />
          <Route path="/terms" element={<div className="pt-40 text-center">Privacy Policy & Terms</div>} />
        </Routes>
      </main>
      {!isAdminPage && <Footer />}
      {!isAdminPage && <AIShopAssistant />}
    </div>
  );
};

const App: React.FC = () => {
  return (
    <AppProvider>
      <HashRouter>
        <AppRoutes />
      </HashRouter>
    </AppProvider>
  );
};

export default App;
