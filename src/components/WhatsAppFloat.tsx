import { useStore } from '@nanostores/react';
import { ShoppingCart } from 'lucide-react';
import WhatsAppIcon from './WhatsAppIcon';
import {
  cartCount,
  buildWhatsAppCheckoutLink,
} from '@/stores/cart';
import { STORE_INFO } from '@/data/products';

/* ──────────────────────────────────────────────────────────────────────────
 *  WhatsAppFloat — floating action button above the bottom dock.
 *  Behavior:
 *    - Empty cart  → opens WhatsApp with a generic "hola" template
 *    - With items  → opens WhatsApp with the pre-filled order message
 *  Hidden on small screens (xs < sm) because the BottomNav already has
 *  a WhatsApp slot. Shown from sm: up where there's more room.
 *  Also has a small cart badge to indicate pending items.
 * ────────────────────────────────────────────────────────────────────────── */

export default function WhatsAppFloat() {
  const count = useStore(cartCount);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    /* Even with items in cart, we let the link open as usual —
       but we pre-build the URL so the wa.me payload is itemized. */
    const url = buildWhatsAppCheckoutLink();
    e.currentTarget.href = url;
  };

  return (
    <a
      href={`https://wa.me/${STORE_INFO.whatsapp}`}
      target="_blank"
      rel="noopener noreferrer"
      onClick={handleClick}
      aria-label={
        count > 0
          ? `Pedir ${count} artículos por WhatsApp`
          : 'Escríbenos por WhatsApp'
      }
      className={`fixed right-4 z-30
                  hidden sm:flex items-center gap-2
                  min-h-[56px] pl-4 pr-5
                  rounded-full
                  bg-whatsapp text-white font-semibold text-sm
                  shadow-lg hover:bg-whatsapp-dark
                  active:scale-95 transition-all
                  focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-green-200
                  bottom-[calc(88px+env(safe-area-inset-bottom)))]`}
      style={{ bottom: 'calc(88px + env(safe-area-inset-bottom))' }}
    >
      <WhatsAppIcon size={22} />
      <span>{count > 0 ? `Pedir $${count}` : 'WhatsApp'}</span>
      {count > 0 && (
        <span className="inline-flex items-center justify-center gap-1
                         bg-white/20 rounded-full px-2 py-0.5 text-xs
                         font-bold">
          <ShoppingCart size={12} strokeWidth={2.5} />
          {count}
        </span>
      )}
    </a>
  );
}
