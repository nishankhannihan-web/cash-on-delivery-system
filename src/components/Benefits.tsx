import React from 'react';
import { BENEFITS } from '../storeConfig';
import { ShieldCheck, Truck, Sparkles, ThumbsUp, PackageCheck, Clock } from 'lucide-react';

const iconMap = {
  ShieldCheck: ShieldCheck,
  Truck: Truck,
  Sparkles: Sparkles,
  ThumbsUp: ThumbsUp,
  PackageCheck: PackageCheck,
  Clock: Clock
};

export const Benefits: React.FC = () => {
  return (
    <section id="benefits" className="py-16 md:py-24 bg-white border-y border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <h2 className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-emerald-700 mb-2">
            Why Cash on Delivery
          </h2>
          <p className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-slate-900">
            Shopping Designed for Zero-Risk Peace of Mind
          </p>
          <p className="mt-3 text-sm sm:text-base text-slate-600">
            Enjoy complete buyer protection with our straightforward pay-on-arrival policy.
          </p>
        </div>

        {/* 3 Benefit Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {BENEFITS.map((benefit, index) => {
            const IconComponent = iconMap[benefit.iconName] || ShieldCheck;

            return (
              <div
                key={benefit.id || index}
                id={`benefit-card-${index + 1}`}
                className="group relative p-6 sm:p-8 rounded-2xl bg-slate-50/60 hover:bg-white border border-slate-200/80 hover:border-slate-300 transition-all duration-200 hover:shadow-md hover:-translate-y-1"
              >
                {/* Icon Badge */}
                <div className="w-12 h-12 rounded-xl bg-emerald-100/80 text-emerald-800 flex items-center justify-center mb-5 group-hover:scale-110 group-hover:bg-emerald-600 group-hover:text-white transition-all">
                  <IconComponent className="w-6 h-6" />
                </div>

                {/* Title */}
                <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-2.5">
                  {benefit.title}
                </h3>

                {/* Description */}
                <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
