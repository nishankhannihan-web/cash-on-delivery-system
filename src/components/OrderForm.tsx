import React, { useState } from 'react';
import { 
  PRODUCT_NAME, 
  PRICE_PER_UNIT, 
  CURRENCY, 
  CURRENCY_SYMBOL, 
  VARIANTS, 
  DEFAULT_COUNTRY, 
  COUNTRIES, 
  PRODUCT_IMAGES,
  SHIPPING_COST,
  getVariantImage
} from '../storeConfig';
import { OrderFormData, OrderInsertPayload } from '../types';
import { submitCodOrder } from '../lib/supabase';
import { 
  ShieldCheck, 
  Truck, 
  CheckCircle, 
  AlertCircle, 
  Loader2, 
  ShoppingBag, 
  Minus, 
  Plus, 
  Banknote, 
  ArrowRight,
  RefreshCw,
  Package
} from 'lucide-react';

interface OrderFormProps {
  selectedVariant: string;
  onSelectVariant: (variant: string) => void;
}

export const OrderForm: React.FC<OrderFormProps> = ({ selectedVariant, onSelectVariant }) => {
  const [formData, setFormData] = useState<OrderFormData>({
    customer_name: '',
    phone: '',
    email: '',
    country: DEFAULT_COUNTRY,
    city: '',
    address: '',
    product_name: PRODUCT_NAME,
    product_variant: selectedVariant,
    quantity: 1,
    notes: ''
  });

  const [errors, setErrors] = useState<Partial<Record<keyof OrderFormData, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [placedOrderSummary, setPlacedOrderSummary] = useState<OrderInsertPayload | null>(null);

  // Keep formData.product_variant in sync with prop if changed from hero
  React.useEffect(() => {
    setFormData(prev => ({ ...prev, product_variant: selectedVariant }));
  }, [selectedVariant]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    // Clear inline error on type
    if (errors[name as keyof OrderFormData]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handleQuantityChange = (newQty: number) => {
    if (newQty >= 1 && newQty <= 99) {
      setFormData(prev => ({ ...prev, quantity: newQty }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof OrderFormData, string>> = {};

    if (!formData.customer_name.trim()) {
      newErrors.customer_name = 'Please enter your full name.';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Please enter a valid phone number for delivery confirmation.';
    } else if (formData.phone.trim().length < 6) {
      newErrors.phone = 'Phone number is too short. Please enter a valid number.';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Please enter your email address.';
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email.trim())) {
        newErrors.email = 'Please enter a valid email address (e.g. name@example.com).';
      }
    }

    if (!formData.country.trim()) {
      newErrors.country = 'Please select your country.';
    }

    if (!formData.city.trim()) {
      newErrors.city = 'Please enter your city / state / province.';
    }

    if (!formData.address.trim()) {
      newErrors.address = 'Please enter your complete street address and house/apartment number.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitStatus('idle');
    setErrorMessage('');

    if (!validateForm()) {
      // Scroll smoothly to the first error
      const firstErrorKey = Object.keys(errors)[0];
      if (firstErrorKey) {
        const errorElement = document.getElementById(`input-${firstErrorKey}`);
        errorElement?.focus();
      }
      return;
    }

    setIsSubmitting(true);

    const payload: OrderInsertPayload = {
      customer_name: formData.customer_name.trim(),
      phone: formData.phone.trim(),
      email: formData.email.trim(),
      city: formData.city.trim(),
      address: formData.address.trim(),
      country: formData.country.trim(),
      product_name: PRODUCT_NAME,
      product_variant: formData.product_variant,
      quantity: formData.quantity,
      notes: formData.notes.trim(),
      status: 'pending'
    };

    // INSERT only into Supabase orders table
    const result = await submitCodOrder(payload);

    setIsSubmitting(false);

    if (result.success) {
      setSubmitStatus('success');
      setPlacedOrderSummary(payload);
      // Reset form
      setFormData({
        customer_name: '',
        phone: '',
        email: '',
        country: DEFAULT_COUNTRY,
        city: '',
        address: '',
        product_name: PRODUCT_NAME,
        product_variant: VARIANTS[0] || 'Default',
        quantity: 1,
        notes: ''
      });
      setErrors({});
    } else {
      setSubmitStatus('error');
      setErrorMessage(
        result.error || 'We could not submit your order at this moment. Please check your details and try again.'
      );
    }
  };

  const resetAfterSuccess = () => {
    setSubmitStatus('idle');
    setPlacedOrderSummary(null);
  };

  const subtotal = PRICE_PER_UNIT * formData.quantity;
  const totalPayable = subtotal + SHIPPING_COST;

  return (
    <section id="order-form" className="py-16 md:py-24 bg-white border-t border-slate-200/80 scroll-mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-semibold uppercase tracking-wider mb-2 border border-emerald-100">
            <Banknote className="w-3.5 h-3.5 text-emerald-600" />
            No Card Needed • Pay When Delivered
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-slate-900">
            Order Form & Cash on Delivery Checkout
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-600">
            Fill in your delivery address below. We will dispatch your order and you will pay only when the courier hands you the package.
          </p>
        </div>

        {/* Success Banner */}
        {submitStatus === 'success' && (
          <div 
            id="order-success-banner" 
            className="mb-12 p-6 sm:p-8 rounded-3xl bg-emerald-50 border border-emerald-200/80 shadow-md text-slate-900 max-w-3xl mx-auto"
          >
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-xs">
                <CheckCircle className="w-7 h-7" />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-emerald-950">
                  🎉 Order Successfully Placed!
                </h3>
                <p className="text-sm text-emerald-800 mt-1">
                  Thank you, <span className="font-semibold">{placedOrderSummary?.customer_name}</span>. Your Cash-on-Delivery order has been received and registered.
                </p>
              </div>
            </div>

            {/* Order Details Recap */}
            {placedOrderSummary && (
              <div className="mt-6 p-4 sm:p-5 rounded-2xl bg-white border border-emerald-100 shadow-xs text-xs sm:text-sm space-y-2.5">
                <div className="flex justify-between border-b border-slate-100 pb-2">
                  <span className="text-slate-500 font-medium">Item Ordered:</span>
                  <span className="text-slate-900 font-semibold">{placedOrderSummary.product_name} ({placedOrderSummary.product_variant})</span>
                </div>
                <div className="flex justify-between border-b border-slate-100 pb-2">
                  <span className="text-slate-500 font-medium">Quantity:</span>
                  <span className="text-slate-900 font-semibold">{placedOrderSummary.quantity} unit(s)</span>
                </div>
                <div className="flex justify-between border-b border-slate-100 pb-2">
                  <span className="text-slate-500 font-medium">Delivery Address:</span>
                  <span className="text-slate-900 font-medium text-right">{placedOrderSummary.address}, {placedOrderSummary.city}, {placedOrderSummary.country}</span>
                </div>
                <div className="flex justify-between border-b border-slate-100 pb-2">
                  <span className="text-slate-500 font-medium">Contact:</span>
                  <span className="text-slate-900 font-medium">{placedOrderSummary.phone} ({placedOrderSummary.email})</span>
                </div>
                <div className="flex justify-between pt-1 text-sm sm:text-base font-bold text-emerald-900">
                  <span>Amount to Pay on Arrival:</span>
                  <span>{CURRENCY_SYMBOL}{(PRICE_PER_UNIT * placedOrderSummary.quantity).toFixed(2)} {CURRENCY}</span>
                </div>
              </div>
            )}

            <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-emerald-200/60">
              <span className="text-xs text-emerald-800 flex items-center gap-1.5">
                <Truck className="w-4 h-4 text-emerald-600" />
                Our courier will call/SMS before reaching your doorstep.
              </span>
              <button
                id="place-another-order-btn"
                onClick={resetAfterSuccess}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs sm:text-sm font-medium transition-all shadow-xs cursor-pointer"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Place Another Order</span>
              </button>
            </div>
          </div>
        )}

        {/* Error Banner */}
        {submitStatus === 'error' && (
          <div 
            id="order-error-banner"
            className="mb-8 p-4 sm:p-5 rounded-2xl bg-rose-50 border border-rose-200 text-rose-900 max-w-3xl mx-auto flex items-start gap-3 shadow-xs"
          >
            <AlertCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
            <div className="flex-1 text-sm">
              <h4 className="font-semibold text-rose-950">Unable to submit order</h4>
              <p className="text-rose-800 mt-0.5">{errorMessage}</p>
            </div>
          </div>
        )}

        {/* Main Grid: Form Left, Order Summary Right */}
        {submitStatus !== 'success' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            
            {/* Left 7 Columns: Delivery Address Form */}
            <div className="lg:col-span-7 bg-slate-50/70 p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-xs">
              <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-1 flex items-center gap-2">
                <Package className="w-5 h-5 text-slate-700" />
                1. Delivery & Contact Details
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 mb-6">
                All fields marked with an asterisk (<span className="text-rose-500 font-bold">*</span>) are required.
              </p>

              <form onSubmit={handleSubmit} noValidate className="space-y-4 sm:space-y-5">
                
                {/* Full Name */}
                <div>
                  <label htmlFor="input-customer_name" className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
                    Full Name <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="input-customer_name"
                    name="customer_name"
                    value={formData.customer_name}
                    onChange={handleInputChange}
                    placeholder="e.g. John Doe"
                    disabled={isSubmitting}
                    className={`w-full px-4 py-3 rounded-xl bg-white border text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none transition-colors ${
                      errors.customer_name
                        ? 'border-rose-400 focus:border-rose-500 ring-1 ring-rose-400'
                        : 'border-slate-300 focus:border-slate-900 focus:ring-1 focus:ring-slate-900'
                    }`}
                  />
                  {errors.customer_name && (
                    <p className="mt-1 text-xs text-rose-600 font-medium flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      {errors.customer_name}
                    </p>
                  )}
                </div>

                {/* Phone & Email Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  
                  {/* Phone */}
                  <div>
                    <label htmlFor="input-phone" className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
                      Phone Number <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="tel"
                      id="input-phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="e.g. +1 555 123 4567"
                      disabled={isSubmitting}
                      className={`w-full px-4 py-3 rounded-xl bg-white border text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none transition-colors ${
                        errors.phone
                          ? 'border-rose-400 focus:border-rose-500 ring-1 ring-rose-400'
                          : 'border-slate-300 focus:border-slate-900 focus:ring-1 focus:ring-slate-900'
                      }`}
                    />
                    {errors.phone ? (
                      <p className="mt-1 text-xs text-rose-600 font-medium flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        {errors.phone}
                      </p>
                    ) : (
                      <p className="mt-1 text-[11px] text-slate-500">For SMS delivery notification</p>
                    )}
                  </div>

                  {/* Email */}
                  <div>
                    <label htmlFor="input-email" className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
                      Email Address <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="email"
                      id="input-email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="e.g. john@example.com"
                      disabled={isSubmitting}
                      className={`w-full px-4 py-3 rounded-xl bg-white border text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none transition-colors ${
                        errors.email
                          ? 'border-rose-400 focus:border-rose-500 ring-1 ring-rose-400'
                          : 'border-slate-300 focus:border-slate-900 focus:ring-1 focus:ring-slate-900'
                      }`}
                    />
                    {errors.email && (
                      <p className="mt-1 text-xs text-rose-600 font-medium flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        {errors.email}
                      </p>
                    )}
                  </div>
                </div>

                {/* Country & City Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  
                  {/* Country */}
                  <div>
                    <label htmlFor="input-country" className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
                      Country <span className="text-rose-500">*</span>
                    </label>
                    <select
                      id="input-country"
                      name="country"
                      value={formData.country}
                      onChange={handleInputChange}
                      disabled={isSubmitting}
                      className="w-full px-4 py-3 rounded-xl bg-white border border-slate-300 text-sm text-slate-900 focus:outline-none focus:border-slate-900 focus:ring-1 focus:ring-slate-900 transition-colors"
                    >
                      {COUNTRIES.map(country => (
                        <option key={country} value={country}>
                          {country}
                        </option>
                      ))}
                    </select>
                    {errors.country && (
                      <p className="mt-1 text-xs text-rose-600 font-medium flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        {errors.country}
                      </p>
                    )}
                  </div>

                  {/* City */}
                  <div>
                    <label htmlFor="input-city" className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
                      City / State / Region <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="input-city"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      placeholder="e.g. Los Angeles, CA"
                      disabled={isSubmitting}
                      className={`w-full px-4 py-3 rounded-xl bg-white border text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none transition-colors ${
                        errors.city
                          ? 'border-rose-400 focus:border-rose-500 ring-1 ring-rose-400'
                          : 'border-slate-300 focus:border-slate-900 focus:ring-1 focus:ring-slate-900'
                      }`}
                    />
                    {errors.city && (
                      <p className="mt-1 text-xs text-rose-600 font-medium flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        {errors.city}
                      </p>
                    )}
                  </div>
                </div>

                {/* Street Address */}
                <div>
                  <label htmlFor="input-address" className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
                    Street Address & Apartment/House # <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="input-address"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    placeholder="e.g. 742 Evergreen Terrace, Apt 4B"
                    disabled={isSubmitting}
                    className={`w-full px-4 py-3 rounded-xl bg-white border text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none transition-colors ${
                      errors.address
                        ? 'border-rose-400 focus:border-rose-500 ring-1 ring-rose-400'
                        : 'border-slate-300 focus:border-slate-900 focus:ring-1 focus:ring-slate-900'
                    }`}
                  />
                  {errors.address && (
                    <p className="mt-1 text-xs text-rose-600 font-medium flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      {errors.address}
                    </p>
                  )}
                </div>

                {/* Delivery Notes */}
                <div>
                  <label htmlFor="input-notes" className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
                    Delivery Instructions / Notes <span className="text-slate-400 lowercase font-normal">(optional)</span>
                  </label>
                  <textarea
                    id="input-notes"
                    name="notes"
                    rows={2}
                    value={formData.notes}
                    onChange={handleInputChange}
                    placeholder="e.g. Gate code #1234, please call 10 minutes before arrival"
                    disabled={isSubmitting}
                    className="w-full px-4 py-2.5 rounded-xl bg-white border border-slate-300 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-slate-900 focus:ring-1 focus:ring-slate-900 transition-colors"
                  />
                </div>

                {/* Mobile Order Submit Button (Also placed inside right column on desktop) */}
                <div className="pt-4 lg:hidden">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    id="submit-order-mobile-btn"
                    className="w-full inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-slate-900 hover:bg-slate-800 disabled:bg-slate-400 text-white text-base font-semibold shadow-md transition-all cursor-pointer disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        <span>Confirming Cash-on-Delivery Order...</span>
                      </>
                    ) : (
                      <>
                        <span>Confirm Order • Pay {CURRENCY_SYMBOL}{totalPayable.toFixed(2)} on Delivery</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </div>

              </form>
            </div>

            {/* Right 5 Columns: Order Summary & Variant Selection */}
            <div className="lg:col-span-5 space-y-6">
              
              <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200/90 shadow-md">
                <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                  <ShoppingBag className="w-5 h-5 text-slate-700" />
                  2. Order Summary
                </h3>

                {/* Product Mini Row */}
                <div className="flex gap-4 items-center pb-5 border-b border-slate-100">
                  <div className="w-20 h-20 rounded-2xl bg-slate-100 overflow-hidden border border-slate-200/80 shrink-0">
                    <img 
                      src={getVariantImage(formData.product_variant)} 
                      alt={`${PRODUCT_NAME} - ${formData.product_variant}`}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover transition-all duration-200" 
                    />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-base">{PRODUCT_NAME}</h4>
                    <p className="text-xs text-slate-500 mt-0.5">Selected: <span className="font-semibold text-slate-800">{formData.product_variant}</span></p>
                    <p className="text-sm font-extrabold text-slate-900 mt-1">
                      {CURRENCY_SYMBOL}{PRICE_PER_UNIT} {CURRENCY}
                    </p>
                  </div>
                </div>

                {/* Variant Picker */}
                <div className="py-4 border-b border-slate-100">
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-2">
                    Choose Variant:
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    {VARIANTS.map((v) => (
                      <button
                        key={v}
                        type="button"
                        id={`order-variant-${v.toLowerCase().replace(/\s+/g, '-')}`}
                        onClick={() => {
                          onSelectVariant(v);
                          setFormData(prev => ({ ...prev, product_variant: v }));
                        }}
                        className={`px-3 py-2 rounded-xl text-xs font-semibold text-center border transition-all cursor-pointer ${
                          formData.product_variant === v
                            ? 'bg-slate-900 text-white border-slate-900 shadow-xs'
                            : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                        }`}
                      >
                        {v}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Quantity Selector */}
                <div className="py-4 border-b border-slate-100 flex items-center justify-between">
                  <span className="text-xs font-semibold uppercase tracking-wider text-slate-700">
                    Quantity:
                  </span>
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      id="qty-minus-btn"
                      onClick={() => handleQuantityChange(formData.quantity - 1)}
                      disabled={formData.quantity <= 1 || isSubmitting}
                      className="w-8 h-8 rounded-lg bg-slate-100 hover:bg-slate-200 disabled:opacity-40 flex items-center justify-center text-slate-700 transition-colors cursor-pointer"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="w-8 text-center font-bold text-slate-900 text-base">
                      {formData.quantity}
                    </span>
                    <button
                      type="button"
                      id="qty-plus-btn"
                      onClick={() => handleQuantityChange(formData.quantity + 1)}
                      disabled={formData.quantity >= 99 || isSubmitting}
                      className="w-8 h-8 rounded-lg bg-slate-100 hover:bg-slate-200 disabled:opacity-40 flex items-center justify-center text-slate-700 transition-colors cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Price Breakdown */}
                <div className="py-4 space-y-2.5 text-sm border-b border-slate-100">
                  <div className="flex justify-between text-slate-600">
                    <span>Subtotal ({formData.quantity} unit{formData.quantity > 1 ? 's' : ''})</span>
                    <span className="font-medium text-slate-900">{CURRENCY_SYMBOL}{subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-slate-600 items-center">
                    <span className="flex items-center gap-1">
                      <Truck className="w-3.5 h-3.5 text-emerald-600" />
                      COD Doorstep Shipping
                    </span>
                    <span className="text-emerald-700 font-semibold uppercase text-xs px-2 py-0.5 rounded bg-emerald-50 border border-emerald-100">
                      FREE
                    </span>
                  </div>
                </div>

                {/* Total */}
                <div className="pt-4 pb-2 flex justify-between items-baseline">
                  <div>
                    <span className="text-base font-bold text-slate-900 block">Total Due on Arrival</span>
                    <span className="text-[11px] text-emerald-600 font-medium">Pay courier in cash</span>
                  </div>
                  <span className="text-2xl sm:text-3xl font-black text-slate-900">
                    {CURRENCY_SYMBOL}{totalPayable.toFixed(2)} <span className="text-xs text-slate-500 font-normal">{CURRENCY}</span>
                  </span>
                </div>

                {/* Payment Badge Info */}
                <div className="mt-4 p-3.5 rounded-2xl bg-emerald-50/80 border border-emerald-200/70 flex items-start gap-2.5 text-xs text-emerald-900">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold block">Cash on Delivery Guaranteed</span>
                    <span>No advance charge. Hand over cash to the delivery driver after inspecting the parcel.</span>
                  </div>
                </div>

                {/* Desktop Submit Button */}
                <div className="mt-6 hidden lg:block">
                  <button
                    type="button"
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                    id="submit-order-desktop-btn"
                    className="w-full inline-flex items-center justify-center gap-2.5 px-6 py-4 rounded-xl bg-slate-900 hover:bg-slate-800 disabled:bg-slate-400 text-white text-base font-semibold shadow-md hover:shadow-lg transition-all hover:-translate-y-0.5 cursor-pointer disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        <span>Sending Order...</span>
                      </>
                    ) : (
                      <>
                        <span>Confirm COD Order ({CURRENCY_SYMBOL}{totalPayable.toFixed(2)})</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </div>

              </div>

              {/* Guarantees Box */}
              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 text-xs text-slate-600 space-y-2">
                <div className="flex items-center gap-2 font-medium text-slate-900">
                  <CheckCircle className="w-4 h-4 text-emerald-600" />
                  <span>30-Day Inspection & Satisfaction Guarantee</span>
                </div>
                <div className="flex items-center gap-2 font-medium text-slate-900">
                  <CheckCircle className="w-4 h-4 text-emerald-600" />
                  <span>Direct Customer Support for Any Inquiries</span>
                </div>
              </div>

            </div>

          </div>
        )}

      </div>
    </section>
  );
};
