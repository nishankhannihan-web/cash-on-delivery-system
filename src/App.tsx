import React, { useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Benefits } from './components/Benefits';
import { HowCodWorks } from './components/HowCodWorks';
import { OrderForm } from './components/OrderForm';
import { FAQ } from './components/FAQ';
import { Footer } from './components/Footer';
import { VARIANTS } from './storeConfig';

export default function App() {
  const [selectedVariant, setSelectedVariant] = useState<string>(VARIANTS[0] || 'Default');

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-emerald-100 selection:text-emerald-900 antialiased">
      {/* 1. Header */}
      <Header />

      <main>
        {/* 2. Hero Section */}
        <Hero 
          selectedVariant={selectedVariant} 
          onSelectVariant={setSelectedVariant} 
        />

        {/* 3. Benefits (3 cards) */}
        <Benefits />

        {/* 4. How Cash on Delivery Works (3 steps) */}
        <HowCodWorks />

        {/* 5. Order Form & Order Summary (Price x Quantity + Supabase INSERT) */}
        <OrderForm 
          selectedVariant={selectedVariant} 
          onSelectVariant={setSelectedVariant} 
        />

        {/* 6. FAQ (3 items) */}
        <FAQ />
      </main>

      {/* 7. Footer */}
      <Footer />
    </div>
  );
}
