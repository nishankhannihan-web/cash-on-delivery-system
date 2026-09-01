import { BenefitItem, HowCodStep, FaqItem } from './types';

/**
 * ============================================================================
 * 🛍️ STORE CONFIGURATION & TEMPLATE PLACEHOLDERS
 * ============================================================================
 * Beginners: Edit the values below to customize your single-product COD store!
 * Everything updates automatically across the entire website.
 */

// 1. Basic Store & Product Details
export const STORE_NAME = "Arrum BD";
export const PRODUCT_NAME = "Premium Wireless Headphones";
export const PRODUCT_DESCRIPTION = "Immerse yourself in rich, high-fidelity sound with deep bass, active noise cancellation, and all-day ergonomic comfort. Engineered with 40-hour battery life and seamless Bluetooth 5.3 connectivity for music, calls, and everyday travel.";
export const PRODUCT_TAGLINE = "Experience premium craftsmanship with zero upfront payment. Inspect your order when it arrives at your doorstep before paying.";

// 2. Pricing & Currency
export const PRICE_PER_UNIT = 49;
export const ORIGINAL_PRICE = 79; // Strikethrough comparison price
export const CURRENCY = "USD";
export const CURRENCY_SYMBOL = "$";
export const SHIPPING_COST = 0; // 0 for Free Cash-on-Delivery Shipping

// 3. Product Variants & Defaults
export const VARIANTS = [
  "Variant A",
  "Variant B",
  "Variant C"
];

export const DEFAULT_COUNTRY = "United States";

// Available countries in the checkout dropdown
export const COUNTRIES = [
  "United States",
  "Canada",
  "United Kingdom",
  "Australia",
  "Germany",
  "France",
  "United Arab Emirates",
  "Saudi Arabia",
  "Philippines",
  "Malaysia",
  "Singapore",
  "India",
  "Other"
];

// Product Image URLs (Each variant maps directly to its corresponding index in this list)
export const PRODUCT_IMAGES = [
  "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=900&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=900&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=900&auto=format&fit=crop&q=80"
];

// Helper to get corresponding image URL for any variant name
export const getVariantImage = (variantName: string): string => {
  const index = VARIANTS.indexOf(variantName);
  if (index >= 0 && index < PRODUCT_IMAGES.length) {
    return PRODUCT_IMAGES[index];
  }
  return PRODUCT_IMAGES[0] || '';
};

// Helper to get corresponding image index for any variant name
export const getVariantImageIndex = (variantName: string): number => {
  const index = VARIANTS.indexOf(variantName);
  return index >= 0 && index < PRODUCT_IMAGES.length ? index : 0;
};

// 4. Key Highlights (3 Benefit Cards)
export const BENEFITS: BenefitItem[] = [
  {
    id: "benefit-1",
    title: "100% Risk-Free Payment",
    description: "Never pay in advance. Hand over cash only after your package is safely delivered to your doorstep.",
    iconName: "ShieldCheck"
  },
  {
    id: "benefit-2",
    title: "Fast & Tracked Shipping",
    description: "Orders are dispatched within 24 hours with real-time SMS & email delivery status updates.",
    iconName: "Truck"
  },
  {
    id: "benefit-3",
    title: "Premium Build Quality",
    description: "Engineered with top-grade materials and backed by our hassle-free 30-day satisfaction guarantee.",
    iconName: "Sparkles"
  }
];

// 5. How Cash-on-Delivery Works (3 Simple Steps)
export const HOW_COD_WORKS: HowCodStep[] = [
  {
    stepNumber: 1,
    title: "Fill in Your Order Details",
    description: "Select your desired variant and enter your delivery address below. No credit card or prepayment required.",
    badge: "30-Second Checkout"
  },
  {
    stepNumber: 2,
    title: "We Dispatch to Your Door",
    description: "Our courier team prepares and delivers your parcel directly to your address with priority handling.",
    badge: "Fast 2-4 Day Delivery"
  },
  {
    stepNumber: 3,
    title: "Inspect & Pay with Cash",
    description: "Open the door, verify your package, and hand over the exact cash amount to the courier driver.",
    badge: "100% Peace of Mind"
  }
];

// 6. Frequently Asked Questions (3 Items)
export const FAQS: FaqItem[] = [
  {
    question: "Do I need to enter any credit card or banking information?",
    answer: "No! This store operates exclusively on Cash on Delivery (COD). You never need to provide card details or bank credentials online. You only pay physical cash upon package handover."
  },
  {
    question: "What happens after I place an order?",
    answer: "You will immediately receive an order confirmation. Our team will verify your delivery details and dispatch your package within 24 hours. The courier will notify you before arrival."
  },
  {
    question: "Can I inspect the parcel before paying?",
    answer: "Yes, you can check the external package condition when the courier arrives. If you have any questions after receiving your item, our customer support team is available 24/7."
  }
];

// 7. Supabase Database Configuration (INSERT only)
export const SUPABASE_URL = "https://cldzrcmmdtxsggxlounk.supabase.co";
export const SUPABASE_PUBLISHABLE_KEY = "sb_publishable_B9B85-3wj9hATLLKbtDbDA_fVrvCObx";
