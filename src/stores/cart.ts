import { atom, computed } from 'nanostores';
import type { CartItem, Product } from '@/types/index';
import { PRODUCT_MAP, STORE_INFO } from '@/data/products';

/* ──────────────────────────────────────────────────────────────────────────
 *  Smart Stop — Cart Store (Nano Stores)
 *  A single source of truth for the cart, shared across all React islands
 *  (ProductCard, CartDrawer, BottomNav badge, WhatsAppFloat, etc.).
 * ────────────────────────────────────────────────────────────────────────── */

/** Persistent: items array. Defaults to empty. */
export const cartItems = atom<CartItem[]>([]);

/** UI state: is the cart drawer visible? */
export const isCartOpen = atom<boolean>(false);

/** UI state: id of the most-recently-added product (for "added ✓" feedback). */
export const lastAddedId = atom<string | null>(null);

/** Derived: total number of units in the cart (sum of quantities). */
export const cartCount = computed(cartItems, (items) =>
  items.reduce((sum, item) => sum + item.quantity, 0),
);

/** Derived: subtotal in USD. */
export const cartTotal = computed(cartItems, (items) =>
  items.reduce((sum, item) => sum + item.price * item.quantity, 0),
);

/**
 * Add a product (or increase its quantity by 1 if already in the cart).
 * Snapshots the relevant product fields so cart stays consistent even if
 * the catalog is later mutated.
 */
export function addToCart(product: Product): void {
  const items = cartItems.get();
  const existing = items.find((item) => item.productId === product.id);

  if (existing) {
    cartItems.set(
      items.map((item) =>
        item.productId === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item,
      ),
    );
  } else {
    cartItems.set([
      ...items,
      {
        productId: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        compatibility: product.compatibility,
        quantity: 1,
      },
    ]);
  }

  lastAddedId.set(product.id);
  // Clear the "just added" highlight after 1.2s
  setTimeout(() => {
    if (lastAddedId.get() === product.id) lastAddedId.set(null);
  }, 1200);
}

/** Decrease quantity by 1; remove the line when it hits 0. */
export function decrementItem(productId: string): void {
  const items = cartItems.get();
  const existing = items.find((item) => item.productId === productId);
  if (!existing) return;

  if (existing.quantity <= 1) {
    cartItems.set(items.filter((item) => item.productId !== productId));
  } else {
    cartItems.set(
      items.map((item) =>
        item.productId === productId
          ? { ...item, quantity: item.quantity - 1 }
          : item,
      ),
    );
  }
}

/** Increase quantity by 1 — looks up the full product from the catalog. */
export function incrementItem(productId: string): void {
  const product = PRODUCT_MAP[productId];
  if (!product) return;
  addToCart(product);
}

/** Remove a line item entirely, regardless of quantity. */
export function removeFromCart(productId: string): void {
  cartItems.set(
    cartItems.get().filter((item) => item.productId !== productId),
  );
}

/** Empty the cart (used after a successful WhatsApp checkout redirect). */
export function clearCart(): void {
  cartItems.set([]);
  lastAddedId.set(null);
}

/** Drawer visibility helpers. */
export function openCart(): void {
  isCartOpen.set(true);
}
export function closeCart(): void {
  isCartOpen.set(false);
}
export function toggleCart(): void {
  isCartOpen.set(!isCartOpen.get());
}

/**
 * Build a WhatsApp deep-link that pre-fills a clean, human-readable order.
 * Format: https://wa.me/{phone}?text={urlencoded message}
 *
 * Example output:
 *   ¡Hola Smart Stop! 👋 Quiero confirmar este pedido:
 *
 *   • Silicone Case iPhone 15 Pro  ×2  —  $24.00
 *   • MagSafe Charger 15W          ×1  —  $35.00
 *
 *   Total: $59.00
 *
 *   ¿Tienen delivery en Maracaibo hoy? 🚚
 */
export function buildWhatsAppCheckoutLink(): string {
  const items = cartItems.get();
  if (items.length === 0) return `https://wa.me/${STORE_INFO.whatsapp}`;

  const lines = items.map((item, idx) => {
    const lineTotal = (item.price * item.quantity).toFixed(2);
    const num = String(idx + 1).padStart(2, '0');
    const qty = `×${item.quantity}`;
    return `${num}. ${item.name} ${qty} — $${lineTotal}`;
  });

  const total = cartTotal
    .get()
    .toFixed(2)
    .replace(/\B(?=(\d{3})+(?!\d))/g, ',');

  const message = [
    `¡Hola ${STORE_INFO.name}! 👋 Quiero confirmar este pedido:`,
    '',
    ...lines,
    '',
    `💰 *Total: $${total}*`,
    '',
    `📍 ${STORE_INFO.city}`,
    `🚚 ¿Tienen delivery disponible hoy?`,
    `💳 ¿Aceptan pago móvil / USD / Zelle?`,
    '',
    `— Enviado desde ${STORE_INFO.handle} web`,
  ].join('\n');

  return `https://wa.me/${STORE_INFO.whatsapp}?text=${encodeURIComponent(message)}`;
}
