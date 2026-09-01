import React from 'react';
import { STORE_NAME } from '../storeConfig';
import { ShoppingBag, ShieldCheck, Truck, RotateCcw, ArrowUp } from 'lucide-react';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 text-slate-400 py-12 md:py-16 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Trust Seal Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pb-12 border-b border-slate-800 text-center sm:text-left">
          <div className="flex items-center justify-center sm:justify-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-slate-800 text-emerald-400 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-white text-sm font-semibold">100% COD Guarantee</h4>
              <p className="text-xs text-slate-400">Zero upfront card charges</p>
            </div>
          </div>

          <div className="flex items-center justify-center sm:justify-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-slate-800 text-emerald-400 flex items-center justify-center shrink-0">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-white text-sm font-semibold">Fast Tracked Delivery</h4>
              <p className="text-xs text-slate-400">Doorstep courier with SMS alerts</p>
            </div>
          </div>

          <div className="flex items-center justify-center sm:justify-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-slate-800 text-emerald-400 flex items-center justify-center shrink-0">
              <RotateCcw className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-white text-sm font-semibold">30-Day Inspection</h4>
              <p className="text-xs text-slate-400">Easy replacement & support</p>
            </div>
          </div>
        </div>

        {/* Brand & Links */}
        <div className="py-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-emerald-500 text-slate-950 flex items-center justify-center font-bold">
              <ShoppingBag className="w-4 h-4" />
            </div>
            <span className="text-white font-bold text-lg tracking-tight">
              {STORE_NAME}
            </span>
          </div>

          <p className="text-xs text-slate-500 text-center md:text-right max-w-md">
            Single Product Cash on Delivery (COD) Store Template. Built for seamless zero-risk buyer conversion.
          </p>

          <button
            id="footer-back-to-top"
            onClick={scrollToTop}
            className="inline-flex items-center gap-2 text-xs font-medium text-slate-300 hover:text-white bg-slate-800/80 hover:bg-slate-800 px-3.5 py-2 rounded-xl transition-colors cursor-pointer"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Copyright */}
        <div className="pt-6 border-t border-slate-800/60 text-center text-xs text-slate-500 flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>© {currentYear} {STORE_NAME}. All rights reserved.</span>
          <span className="text-slate-600">Cash on Delivery Store Template</span>
        </div>

      </div>
    </footer>
  );
};
