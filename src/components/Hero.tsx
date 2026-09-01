import React, { useState, useEffect } from 'react';
import { 
  PRODUCT_NAME, 
  PRODUCT_DESCRIPTION, 
  PRODUCT_TAGLINE,
  PRICE_PER_UNIT, 
  ORIGINAL_PRICE, 
  CURRENCY_SYMBOL, 
  CURRENCY,
  VARIANTS,
  PRODUCT_IMAGES,
  getVariantImageIndex
} from '../storeConfig';
import { ShieldCheck, Truck, ArrowRight, CheckCircle2, Star, Sparkles } from 'lucide-react';

interface HeroProps {
  selectedVariant: string;
  onSelectVariant: (variant: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ selectedVariant, onSelectVariant }) => {
  const [activeImageIndex, setActiveImageIndex] = useState(() => getVariantImageIndex(selectedVariant));

  // Automatically change the product image to the corresponding variant image instantly
  useEffect(() => {
    const idx = getVariantImageIndex(selectedVariant);
    setActiveImageIndex(idx);
  }, [selectedVariant]);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const savings = ORIGINAL_PRICE - PRICE_PER_UNIT;

  return (
    <section className="relative pt-8 pb-16 md:pt-16 md:pb-24 overflow-hidden">
      {/* Background Soft Pastel Ambient Glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-b from-emerald-50/50 via-slate-100/40 to-transparent pointer-events-none -z-10 rounded-full blur-3xl" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Copy & CTAs */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            
            {/* Top Pill Badge */}
            <div 
              id="hero-trust-badge"
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200/80 text-emerald-800 text-xs sm:text-sm font-medium mb-6 shadow-xs"
            >
              <span className="flex items-center text-amber-500">
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                <span className="ml-1 font-semibold text-slate-800">4.9/5</span>
              </span>
              <span className="text-slate-300">•</span>
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                Cash on Delivery (No Card Required)
              </span>
            </div>

            {/* Main Product Headline */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-slate-900 leading-[1.15]">
              {PRODUCT_NAME}
            </h1>

            {/* Product Description */}
            <p className="mt-4 sm:mt-6 text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl">
              {PRODUCT_DESCRIPTION}
            </p>
            <p className="mt-2 text-sm sm:text-base text-slate-500 max-w-2xl">
              {PRODUCT_TAGLINE}
            </p>

            {/* Pricing Section */}
            <div className="mt-6 sm:mt-8 p-4 sm:p-5 rounded-2xl bg-white border border-slate-200/80 shadow-sm w-full max-w-lg">
              <div className="flex flex-wrap items-baseline gap-3">
                <span className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                  {CURRENCY_SYMBOL}{PRICE_PER_UNIT}
                </span>
                <span className="text-xs sm:text-sm font-medium text-slate-500">
                  {CURRENCY}
                </span>
                {ORIGINAL_PRICE > PRICE_PER_UNIT && (
                  <>
                    <span className="text-lg sm:text-xl text-slate-400 line-through font-normal">
                      {CURRENCY_SYMBOL}{ORIGINAL_PRICE}
                    </span>
                    <span className="px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-semibold">
                      Save {CURRENCY_SYMBOL}{savings} Today
                    </span>
                  </>
                )}
              </div>

              {/* Variant Selector Quick Preview */}
              <div className="mt-4 pt-4 border-t border-slate-100">
                <div className="flex items-center justify-between text-xs font-medium text-slate-500 mb-2">
                  <span>SELECT VARIANT:</span>
                  <span className="text-slate-900 font-semibold">{selectedVariant}</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {VARIANTS.map((variant) => (
                    <button
                      key={variant}
                      id={`hero-variant-${variant.toLowerCase().replace(/\s+/g, '-')}`}
                      onClick={() => {
                        onSelectVariant(variant);
                        setActiveImageIndex(getVariantImageIndex(variant));
                      }}
                      className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all cursor-pointer ${
                        selectedVariant === variant
                          ? 'bg-slate-900 text-white shadow-xs'
                          : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200'
                      }`}
                    >
                      {variant}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 w-full max-w-lg">
              <button
                id="hero-order-primary-btn"
                onClick={() => scrollToSection('order-form')}
                className="flex-1 inline-flex items-center justify-center gap-2.5 px-6 py-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-base font-semibold shadow-md hover:shadow-lg transition-all hover:-translate-y-0.5 cursor-pointer"
              >
                <span>Order Now (Pay on Delivery)</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                id="hero-how-cod-btn"
                onClick={() => scrollToSection('how-cod-works')}
                className="inline-flex items-center justify-center gap-2 px-5 py-4 rounded-xl bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 text-sm font-medium transition-colors cursor-pointer"
              >
                <span>How COD Works</span>
              </button>
            </div>

            {/* Micro Trust Bullet Points */}
            <div className="mt-6 flex flex-wrap items-center gap-y-2 gap-x-6 text-xs sm:text-sm text-slate-600">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Zero Upfront Card Payments</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Truck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Free Tracked Delivery</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>30-Day Inspection Period</span>
              </div>
            </div>

          </div>

          {/* Right Column: Product Showcase Card */}
          <div className="lg:col-span-5 flex flex-col items-center">
            <div className="relative w-full max-w-md lg:max-w-none rounded-3xl bg-white p-4 sm:p-6 border border-slate-200/80 shadow-md">
              
              {/* Product Image Stage */}
              <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-slate-100 border border-slate-100">
                <img
                  src={PRODUCT_IMAGES[activeImageIndex] || PRODUCT_IMAGES[0]}
                  alt={PRODUCT_NAME}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center transition-all duration-300 hover:scale-105"
                />
                
                {/* Floating Cash on Delivery Badge */}
                <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-full border border-slate-200/80 text-xs font-semibold text-slate-800 shadow-xs flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>Pay Cash at Door</span>
                </div>

                {/* Stock status */}
                <div className="absolute bottom-3 right-3 bg-emerald-950/80 backdrop-blur-md text-emerald-200 px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                  In Stock & Ready to Ship
                </div>
              </div>

              {/* Thumbnails row */}
              {PRODUCT_IMAGES.length > 1 && (
                <div className="mt-4 flex items-center justify-center gap-3">
                  {PRODUCT_IMAGES.map((imgUrl, index) => (
                    <button
                      key={index}
                      id={`hero-img-thumb-${index}`}
                      onClick={() => {
                        setActiveImageIndex(index);
                        if (VARIANTS[index]) {
                          onSelectVariant(VARIANTS[index]);
                        }
                      }}
                      className={`w-16 h-16 rounded-xl overflow-hidden border-2 transition-all cursor-pointer ${
                        activeImageIndex === index
                          ? 'border-slate-900 shadow-xs scale-105'
                          : 'border-transparent opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img 
                        src={imgUrl} 
                        alt={`${PRODUCT_NAME} thumbnail ${index + 1}`} 
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover" 
                      />
                    </button>
                  ))}
                </div>
              )}

              {/* Quick Summary Pill below image */}
              <div className="mt-4 p-3 rounded-xl bg-slate-50 border border-slate-200/60 flex items-center justify-between text-xs text-slate-600">
                <span className="font-medium text-slate-900">{selectedVariant}</span>
                <span className="text-emerald-700 font-semibold flex items-center gap-1">
                  <Truck className="w-3.5 h-3.5" />
                  Dispatched in 24h
                </span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
