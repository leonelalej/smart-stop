import { useStore } from '@nanostores/react';
import { Home, Search, ShoppingCart } from 'lucide-react';
import WhatsAppIcon from './WhatsAppIcon';
import {
  cartCount,
  toggleCart,
} from '@/stores/cart';
import { STORE_INFO } from '@/data/products';
import {
  searchQuery,
  setSearch,
} from '@/stores/catalog';

/* ──────────────────────────────────────────────────────────────────────────
 *  BottomNav — sticky one-thumb dock.
 *  Slots:
 *    [ Inicio ]  [ Buscar ]  [ WhatsApp ]  [ Carrito ]
 *  The WhatsApp slot is the floating center button (slightly elevated).
 *  The Cart slot shows a live item-count badge that pops when it changes.
 *  Height: 72px + safe-area-inset-bottom (iPhone home indicator).
 * ────────────────────────────────────────────────────────────────────────── */

export default function BottomNav() {
  const count = useStore(cartCount);
  const query = useStore(searchQuery);

  const triggerSearchFocus = () => {
    const input = document.querySelector<HTMLInputElement>(
      'input[type="search"]',
    );
    if (input) {
      if (query) setSearch('');
      input.focus();
      // Smooth-scroll to top so the search bar is in view.
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <nav
      aria-label="Navegación inferior"
      className="fixed bottom-0 inset-x-0 z-40
                 bg-white/95 backdrop-blur-md border-t border-chrome-100
                 shadow-dock
                 pb-[max(env(safe-area-inset-bottom),0px)]"
    >
      <ul className="mx-auto max-w-screen-desktop grid grid-cols-4 h-[72px]">
        {/* Inicio */}
        <li>
          <a
            href="#top"
            className="flex flex-col items-center justify-center gap-0.5 h-full
                       text-chrome-600 hover:text-brand-700 active:scale-95
                       transition-all min-h-[48px]"
          >
            <Home size={22} strokeWidth={2.25} />
            <span className="text-[10px] font-semibold">Inicio</span>
          </a>
        </li>

        {/* Buscar */}
        <li>
          <button
            type="button"
            onClick={triggerSearchFocus}
            className="flex flex-col items-center justify-center gap-0.5 h-full w-full
                       text-chrome-600 hover:text-brand-700 active:scale-95
                       transition-all min-h-[48px]"
            aria-label="Buscar productos"
          >
            <Search size={22} strokeWidth={2.25} />
            <span className="text-[10px] font-semibold">Buscar</span>
          </button>
        </li>

        {/* WhatsApp — center, elevated */}
        <li>
          <a
            href={`https://wa.me/${STORE_INFO.whatsapp}?text=${encodeURIComponent(
              `¡Hola ${STORE_INFO.name}! 👋 Quiero más información sobre sus productos.`,
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Escríbenos por WhatsApp"
            className="flex flex-col items-center justify-center gap-0.5 h-full
                       text-whatsapp active:scale-95 transition-all min-h-[48px]"
          >
            <span className="absolute -top-3
                             h-12 w-12 rounded-full bg-whatsapp
                             flex items-center justify-center text-white
                             shadow-lg ring-4 ring-white">
              <WhatsAppIcon size={22} />
            </span>
            <span className="text-[10px] font-semibold mt-6">Escribir</span>
          </a>
        </li>

        {/* Cart with live badge */}
        <li>
          <button
            type="button"
            onClick={toggleCart}
            className="relative flex flex-col items-center justify-center gap-0.5
                       h-full w-full text-chrome-600 hover:text-brand-700
                       active:scale-95 transition-all min-h-[48px]"
            aria-label={`Ver pedido, ${count} artículos`}
          >
            <div className="relative">
              <ShoppingCart size={22} strokeWidth={2.25} />
              {count > 0 && (
                <span
                  key={count} // re-mount on count change → re-trigger animation
                  className="absolute -top-2 -right-2 min-w-[18px] h-[18px] px-1
                             flex items-center justify-center
                             rounded-full bg-brand-700 text-white
                             text-[10px] font-bold
                             ring-2 ring-white
                             animate-badge-pop"
                >
                  {count > 99 ? '99+' : count}
                </span>
              )}
            </div>
            <span className="text-[10px] font-semibold">Pedido</span>
          </button>
        </li>
      </ul>
    </nav>
  );
}
