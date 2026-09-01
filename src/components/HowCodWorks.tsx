import React from 'react';
import { HOW_COD_WORKS } from '../storeConfig';
import { ClipboardList, Truck, HandCoins, ArrowRight } from 'lucide-react';

const stepIcons = [ClipboardList, Truck, HandCoins];

export const HowCodWorks: React.FC = () => {
  const scrollToOrderForm = () => {
    const element = document.getElementById('order-form');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="how-cod-works" className="py-16 md:py-24 bg-slate-50/70 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <h2 className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-emerald-700 mb-2">
            Simple 3-Step Process
          </h2>
          <p className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-slate-900">
            How Cash on Delivery (COD) Works
          </p>
          <p className="mt-3 text-sm sm:text-base text-slate-600">
            Ordering is risk-free and takes less than a minute. No credit cards, no pre-authorizations.
          </p>
        </div>

        {/* 3 Step Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 relative">
          {HOW_COD_WORKS.map((step, index) => {
            const StepIcon = stepIcons[index] || ClipboardList;

            return (
              <div
                key={step.stepNumber || index}
                id={`how-cod-step-${step.stepNumber}`}
                className="relative p-6 sm:p-8 rounded-2xl bg-white border border-slate-200/80 shadow-xs flex flex-col justify-between"
              >
                <div>
                  {/* Step Number & Icon Row */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-12 h-12 rounded-2xl bg-slate-900 text-white flex items-center justify-center shadow-xs">
                      <StepIcon className="w-6 h-6" />
                    </div>
                    <span className="text-3xl font-black text-slate-200">
                      0{step.stepNumber}
                    </span>
                  </div>

                  {/* Badge */}
                  <div className="inline-block px-2.5 py-1 rounded-md bg-emerald-50 text-emerald-800 text-xs font-semibold mb-3 border border-emerald-100">
                    {step.badge}
                  </div>

                  {/* Step Title */}
                  <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-2.5">
                    {step.title}
                  </h3>

                  {/* Step Description */}
                  <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                    {step.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center text-xs font-medium text-slate-500">
                  <span>Step {step.stepNumber} of 3</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Banner Callout */}
        <div className="mt-12 p-6 rounded-2xl bg-emerald-900 text-white flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm">
          <div className="text-center sm:text-left">
            <h4 className="text-base sm:text-lg font-bold">Ready to receive your order?</h4>
            <p className="text-xs sm:text-sm text-emerald-200">Submit your address now. Pay the delivery courier only when the package arrives.</p>
          </div>
          <button
            id="how-cod-cta-btn"
            onClick={scrollToOrderForm}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white hover:bg-emerald-50 text-emerald-950 font-semibold text-sm transition-all shadow-xs shrink-0 cursor-pointer"
          >
            <span>Proceed to Order Form</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </section>
  );
};
