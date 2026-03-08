import productsData from "../data/products.json";

export interface Merchant {
  merchant_name: string;
  affiliate_url: string;
  affiliate_network: string;
  commission_rate: number;
  is_primary: boolean;
}

export interface ProductSpecs {
  noise_db: number;
  capacity_liters: number;
  max_cat_weight_kg: number;
  max_cats: number;
  dimensions_cm: string;
  weight_kg: number;
  mechanism: string;
  is_enclosed: boolean;
  has_wifi: boolean;
  has_app: boolean;
  has_health_tracking: boolean;
}

export interface QuizAttributes {
  budget_tier: "entry" | "budget" | "mid" | "premium";
  noise_level: "low" | "medium" | "high";
  footprint: "small" | "medium" | "large";
  priority_tags: string[];
  reasoning_fr: Record<string, string>;
}

export interface Product {
  slug: string;
  title: string;
  brand: string;
  description: string;
  image_url: string | null;
  price_min: number;
  price_max: number;
  rating: number;
  rating_count: number;
  merchants: Merchant[];
  specs: ProductSpecs;
  quiz_attributes: QuizAttributes;
}

const products: Product[] = productsData as Product[];

export function getAllProducts(): Product[] {
  return products;
}

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getPrimaryMerchant(product: Product): Merchant {
  return product.merchants.find((m) => m.is_primary) || product.merchants[0];
}

export function getHighestCommissionMerchant(product: Product): Merchant {
  return product.merchants.reduce((best, m) =>
    m.commission_rate > best.commission_rate ? m : best
  );
}

export function getMerchantSlug(merchant: Merchant): string {
  return merchant.merchant_name
    .toLowerCase()
    .replace(/[\s.]+/g, "-")
    .replace(/-+/g, "-");
}

export function getAffiliateHref(product: Product): string {
  const merchant = getHighestCommissionMerchant(product);
  return `/go/${product.slug}/${getMerchantSlug(merchant)}/`;
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
}

export function getPriceRange(product: Product): string {
  return product.price_min === product.price_max
    ? formatPrice(product.price_min)
    : `${formatPrice(product.price_min)} – ${formatPrice(product.price_max)}`;
}
