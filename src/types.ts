export interface OrderFormData {
  customer_name: string;
  phone: string;
  email: string;
  country: string;
  city: string;
  address: string;
  product_name: string;
  product_variant: string;
  quantity: number;
  notes: string;
}

export interface OrderInsertPayload {
  customer_name: string;
  phone: string;
  email: string;
  city: string;
  address: string;
  country: string;
  product_name: string;
  product_variant: string;
  quantity: number;
  notes: string;
  status: 'pending';
}

export interface BenefitItem {
  id: string;
  title: string;
  description: string;
  iconName: 'ShieldCheck' | 'Truck' | 'Sparkles' | 'ThumbsUp' | 'PackageCheck' | 'Clock';
}

export interface HowCodStep {
  stepNumber: number;
  title: string;
  description: string;
  badge: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface ProductVariant {
  name: string;
  colorHex?: string;
  badge?: string;
  image?: string;
}
