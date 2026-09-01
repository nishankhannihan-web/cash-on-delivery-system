import React from 'react';
import { STORE_NAME } from '../storeConfig';
import { ShoppingBag, ShieldCheck, ArrowRight } from 'lucide-react';

export const Header: React.FC = () => {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-white/80 backdrop-blur-md border-b border-slate-200/80 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between">
        {/* Brand */}
        <div 
          id="brand-header" 
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="flex items-center gap-3 cursor-pointer group"
        >
          <div className="w-10 h-10 rounded-xl bg-slate-900 text-white flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform">
            <ShoppingBag className="w-5 h-5" />
          </div>
          <div>
            <span className="font-semibold text-slate-900 text-lg sm:text-xl tracking-tight block">
              {STORE_NAME}
            </span>
            <span className="text-[11px] text-emerald-600 font-medium flex items-center gap-1 -mt-0.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
              Cash on Delivery Available
            </span>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
          <button 
            id="nav-benefits"
            onClick={() => scrollToSection('benefits')}
            className="hover:text-slate-900 transition-colors cursor-pointer"
          >
            Why Choose Us
          </button>
          <button 
            id="nav-how-cod-works"
            onClick={() => scrollToSection('how-cod-works')}
            className="hover:text-slate-900 transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            How COD Works
          </button>
          <button 
            id="nav-faq"
            onClick={() => scrollToSection('faq')}
            className="hover:text-slate-900 transition-colors cursor-pointer"
          >
            FAQ
          </button>
        </nav>

        {/* Action Button */}
        <div className="flex items-center gap-3">
          <button
            id="header-order-cta"
            onClick={() => scrollToSection('order-form')}
            className="inline-flex items-center gap-2 px-4 py-2.5 sm:px-5 sm:py-2.5 rounded-full bg-slate-900 hover:bg-slate-800 text-white text-xs sm:text-sm font-medium shadow-sm transition-all hover:shadow hover:-translate-y-0.5 cursor-pointer"
          >
            <span>Order Now (COD)</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </header>
  );
};
