/**
 * Smart Stop — Strongly Typed Domain Models
 * =========================================
 * All shared TypeScript interfaces live here so they can be imported
 * from any Astro page, React island, or store module.
 */

/** Product badges shown on cards. `null` means "no badge". */
export type ProductBadge = 'best-seller' | 'new' | 'promo' | null;

/** Top-level product categories used for filter pills & search. */
export type ProductCategory =
  | 'cases'
  | 'chargers'
  | 'cables'
  | 'screen-protectors'
  | 'power-banks'
  | 'audio'
  | 'gadgets'
  | 'repair-parts';

/** A single SKU in the Smart Stop catalog. */
export interface Product {
  /** Stable id used by the cart store. */
  id: string;
  /** Short display name, e.g. "Silicone Case iPhone 15 Pro". */
  name: string;
  /** Optional one-line description shown under the title. */
  description?: string;
  /** Price in USD. Maracaibo pricing is USD-anchored. */
  price: number;
  /** Original price (only set when `badge === 'promo'`). */
  originalPrice?: number;
  /** Category id — drives filter pills. */
  category: ProductCategory;
  /** Compatibility label, e.g. "iPhone 15 Pro", "Type-C", "Universal". */
  compatibility: string;
  /** Image URL — can be a remote URL or a local /public path. */
  image: string;
  /** Promo / status badge. */
  badge?: ProductBadge;
  /** Stock counter for UX (0 = sold out). */
  stock?: number;
}

/** A product line item inside the cart. */
export interface CartItem {
  /** References `Product.id`. */
  productId: string;
  /** Snapshot of product fields at the moment of adding — keeps the
   *  cart resilient if the catalog mutates during a session. */
  name: string;
  price: number;
  image: string;
  compatibility: string;
  /** Quantity in cart (>= 1). */
  quantity: number;
}

/** Lightweight descriptor for a category filter pill. */
export interface CategoryDescriptor {
  id: ProductCategory | 'all';
  label: string;
  /** Lucide icon name — resolved in the React layer. */
  icon: string;
}
