import { useEffect } from 'react';
import { useStore } from '@nanostores/react';
import {
  Minus,
  Plus,
  ShoppingBag,
  Trash2,
  X,
  MessageCircle,
  ShoppingCart,
} from 'lucide-react';
import {
  cartItems,
  cartTotal,
  cartCount,
  isCartOpen,
  closeCart,
  decrementItem,
  incrementItem,
  removeFromCart,
  buildWhatsAppCheckoutLink,
  clearCart,
} from '@/stores/cart';
import { STORE_INFO } from '@/data/products';

/* ──────────────────────────────────────────────────────────────────────────
 *  CartDrawer — mobile-first slide-over from the right edge.
 *  - Slides in/out bound to the `isCartOpen` nanostore
 *  - Locks body scroll while open (`overflow:hidden` + `position:fixed`)
 *  - Dismiss via backdrop tap, ✕ button, or ESC key
 *  - "Order via WhatsApp" builds a wa.me deep link with itemized list
 * ────────────────────────────────────────────────────────────────────────── */

export default function CartDrawer() {
  const open = useStore(isCartOpen);
  const items = useStore(cartItems);
  const total = useStore(cartTotal);
  const count = useStore(cartCount);

  /* Body scroll lock + ESC handler */
  useEffect(() => {
    if (open) {
      document.body.classList.add('cart-open');
      const onKey = (e: KeyboardEvent) => {
        if (e.key === 'Escape') closeCart();
      };
      window.addEventListener('keydown', onKey);
      return () => {
        document.body.classList.remove('cart-open');
        window.removeEventListener('keydown', onKey);
      };
    }
    document.body.classList.remove('cart-open');
  }, [open]);

  /* Checkout handler: open WhatsApp in a new tab, then clear cart. */
  const handleCheckout = () => {
    const url = buildWhatsAppCheckoutLink();
    window.open(url, '_blank', 'noopener,noreferrer');
    // Don't clear immediately — give the user a chance to come back.
    // The cart stays open in case WhatsApp didn't open.
    closeCart();
  };

  return (
    <div
      aria-hidden={!open}
      className={`fixed inset-0 z-50 ${open ? '' : 'pointer-events-none'}`}
    >
      {/* Backdrop */}
      <div
        onClick={closeCart}
        className={`absolute inset-0 bg-chrome-900/60 backdrop-blur-sm
                    transition-opacity duration-300
                    ${open ? 'opacity-100' : 'opacity-0'}`}
        aria-hidden="true"
      />

      {/* Drawer panel — slides in from the right.
          Width: 100% on phones, capped at 420px on larger screens. */}
      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Tu pedido"
        className={`absolute top-0 right-0 h-dvh
                    w-full sm:max-w-[420px]
                    bg-chrome-50 shadow-drawer
                    flex flex-col
                    transition-transform duration-300 ease-out
                    ${open ? 'translate-x-0' : 'translate-x-full'}
                    pt-[max(env(safe-area-inset-top),0px)]
                    pb-[max(env(safe-area-inset-bottom),0px)]`}
      >
        {/* ─── Header ──────────────────────────────────────────── */}
        <div className="flex items-center justify-between px-4 py-3 bg-white border-b border-chrome-100">
          <div className="flex items-center gap-2">
            <ShoppingBag size={20} className="text-brand-700" strokeWidth={2.25} />
            <h2 className="font-display font-bold text-chrome-900">
              Tu pedido
            </h2>
            {count > 0 && (
              <span className="badge bg-brand-100 text-brand-800">
                {count} {count === 1 ? 'artículo' : 'artículos'}
              </span>
            )}
          </div>
          <button
            type="button"
            onClick={closeCart}
            aria-label="Cerrar"
            className="h-11 w-11 flex items-center justify-center rounded-xl
                       text-chrome-600 hover:bg-chrome-100
                       active:scale-95 transition-all"
          >
            <X size={22} strokeWidth={2.5} />
          </button>
        </div>

        {/* ─── Items list ─────────────────────────────────────── */}
        {items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center text-center px-6">
            <div className="w-20 h-20 rounded-full bg-chrome-100 flex items-center justify-center mb-4">
              <ShoppingCart
                size={36}
                className="text-chrome-300"
                strokeWidth={1.75}
              />
            </div>
            <h3 className="font-semibold text-chrome-800 text-lg">
              Tu carrito está vacío
            </h3>
            <p className="text-sm text-chrome-500 mt-1 max-w-xs">
              Explora nuestro catálogo de accesorios y agrega los productos que
              quieras pedir por WhatsApp.
            </p>
            <button
              type="button"
              onClick={closeCart}
              className="btn-primary mt-6"
            >
              Ver catálogo
            </button>
          </div>
        ) : (
          <ul
            className="flex-1 overflow-y-auto overscroll-contain
                       divide-y divide-chrome-100"
          >
            {items.map((item) => (
              <li key={item.productId} className="p-3 flex gap-3 bg-white">
                <div className="w-16 h-16 flex-shrink-0 rounded-lg overflow-hidden bg-chrome-100">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>

                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-sm text-chrome-900 line-clamp-1">
                    {item.name}
                  </h3>
                  <p className="text-[11px] text-chrome-500">
                    {item.compatibility}
                  </p>
                  <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center gap-1">
                      <button
                        type="button"
                        onClick={() => decrementItem(item.productId)}
                        aria-label={`Quitar uno de ${item.name}`}
                        className="h-9 w-9 flex items-center justify-center rounded-lg
                                   border border-chrome-200 text-chrome-700
                                   hover:bg-chrome-50 active:scale-95
                                   transition-all"
                      >
                        <Minus size={16} strokeWidth={2.5} />
                      </button>
                      <span className="w-8 text-center font-semibold text-sm tabular-nums">
                        {item.quantity}
                      </span>
                      <button
                        type="button"
                        onClick={() => incrementItem(item.productId)}
                        aria-label={`Agregar uno más de ${item.name}`}
                        className="h-9 w-9 flex items-center justify-center rounded-lg
                                   border border-chrome-200 text-chrome-700
                                   hover:bg-chrome-50 active:scale-95
                                   transition-all"
                      >
                        <Plus size={16} strokeWidth={2.5} />
                      </button>
                      <button
                        type="button"
                        onClick={() => removeFromCart(item.productId)}
                        aria-label={`Eliminar ${item.name} del pedido`}
                        className="h-9 w-9 ml-1 flex items-center justify-center rounded-lg
                                   text-chrome-400 hover:bg-red-50 hover:text-red-600
                                   active:scale-95 transition-all"
                      >
                        <Trash2 size={16} strokeWidth={2.25} />
                      </button>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-brand-700 text-sm tabular-nums">
                        ${(item.price * item.quantity).toFixed(2)}
                      </div>
                      <div className="text-[11px] text-chrome-400 tabular-nums">
                        ${item.price.toFixed(2)} c/u
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            ))}

            {/* Clear cart footer action */}
            <li className="p-3 bg-chrome-50">
              <button
                type="button"
                onClick={clearCart}
                className="text-xs font-medium text-chrome-500 hover:text-red-600
                           active:scale-95 transition-all inline-flex items-center gap-1"
              >
                <Trash2 size={14} strokeWidth={2.25} />
                Vaciar carrito
              </button>
            </li>
          </ul>
        )}

        {/* ─── Footer: total + WhatsApp checkout ──────────────── */}
        {items.length > 0 && (
          <div
            className="bg-white border-t border-chrome-100
                       px-4 pt-3 pb-4
                       pb-[max(env(safe-area-inset-bottom),1rem)]"
          >
            {/* Delivery info row */}
            <div className="flex items-center justify-between mb-2 text-xs">
              <span className="text-chrome-500">{STORE_INFO.delivery}</span>
              <span className="text-emerald-600 font-semibold">Disponible</span>
            </div>

            {/* Total row */}
            <div className="flex items-baseline justify-between mb-3">
              <span className="font-display font-semibold text-chrome-700">
                Total
              </span>
              <div className="text-right">
                <span className="text-2xl font-bold text-brand-700 tabular-nums">
                  ${total.toFixed(2)}
                </span>
                <span className="ml-1 text-xs text-chrome-400 font-medium">
                  USD
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={handleCheckout}
              className="btn-whatsapp w-full text-base"
            >
              <MessageCircle size={20} strokeWidth={2.5} />
              Pedir por WhatsApp
            </button>

            <p className="mt-2 text-center text-[11px] text-chrome-400 leading-snug">
              Se abrirá WhatsApp con tu pedido listo para enviar. Confirmamos
              disponibilidad, costo de envío y método de pago.
            </p>
          </div>
        )}
      </aside>
    </div>
  );
}
