import { useEffect, useState } from 'react';
import { Check, Plus, ShoppingCart } from 'lucide-react';
import type { Product, ProductBadge } from '@/types/index';
import { useStore } from '@nanostores/react';
import { addToCart, lastAddedId } from '@/stores/cart';

/* ──────────────────────────────────────────────────────────────────────────
 *  ProductCard — single catalog tile
 *  - Lazy-loads image with blur-up placeholder
 *  - Tactile "Add to order" button with ✓ confirmation state
 *  - Minimum 48x48 touch target on the add button
 * ────────────────────────────────────────────────────────────────────────── */

interface BadgeConfig {
  label: string;
  cls: string;
}

const BADGE_MAP: Record<NonNullable<ProductBadge>, BadgeConfig> = {
  'best-seller': { label: 'Top', cls: 'badge-best-seller' },
  'new': { label: 'Nuevo', cls: 'badge-new' },
  'promo': { label: 'Promo', cls: 'badge-promo' },
};

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const [imgLoaded, setImgLoaded] = useState(false);
  const justAddedId = useStore(lastAddedId);
  const isJustAdded = justAddedId === product.id;

  const badge = product.badge ? BADGE_MAP[product.badge] : null;
  const onSale =
    product.badge === 'promo' &&
    typeof product.originalPrice === 'number' &&
    product.originalPrice > product.price;
  const savings = onSale
    ? Math.round(
        ((product.originalPrice! - product.price) / product.originalPrice!) *
          100,
      )
    : 0;

  const soldOut = (product.stock ?? 1) === 0;

  return (
    <article className="card-surface overflow-hidden flex flex-col group">
      {/* Image with badges */}
      <div className="product-media">
        {!imgLoaded && (
          <div className="absolute inset-0 animate-pulse bg-gradient-to-br from-chrome-100 via-chrome-200 to-chrome-100" />
        )}
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          decoding="async"
          onLoad={() => setImgLoaded(true)}
          style={{
            opacity: imgLoaded ? 1 : 0,
            transition: 'opacity 280ms ease-out',
          }}
        />

        {/* Badge stack (top-left) */}
        {badge && (
          <div className="absolute top-2 left-2 flex flex-col gap-1 items-start">
            <span className={`badge ${badge.cls}`}>{badge.label}</span>
            {onSale && savings > 0 && (
              <span className="badge bg-brand-900 text-white">
                -{savings}%
              </span>
            )}
          </div>
        )}

        {/* Sold out overlay */}
        {soldOut && (
          <div className="absolute inset-0 flex items-center justify-center bg-chrome-900/60">
            <span className="text-white font-bold uppercase tracking-wider text-sm">
              Agotado
            </span>
          </div>
        )}
      </div>

      {/* Body */}
      <div className="p-3 flex flex-col gap-2 flex-1">
        {/* Compatibility chip */}
        <span className="self-start text-[11px] font-medium text-chrome-500 bg-chrome-100 px-2 py-0.5 rounded-md">
          {product.compatibility}
        </span>

        {/* Title */}
        <h3 className="font-semibold text-chrome-900 text-sm leading-snug line-clamp-2 min-h-[2.5rem]">
          {product.name}
        </h3>

        {product.description && (
          <p className="text-xs text-chrome-500 line-clamp-1">
            {product.description}
          </p>
        )}

        {/* Price + Add */}
        <div className="mt-auto flex items-end justify-between gap-2 pt-1">
          <div className="flex flex-col">
            {onSale && (
              <span className="text-[11px] text-chrome-400 line-through leading-none">
                ${product.originalPrice!.toFixed(2)}
              </span>
            )}
            <span className="text-lg font-bold text-brand-700 leading-none">
              ${product.price.toFixed(2)}
            </span>
          </div>

          <button
            type="button"
            onClick={() => addToCart(product)}
            disabled={soldOut}
            aria-label={`Agregar ${product.name} al pedido`}
            className={`inline-flex items-center justify-center
                        min-h-[48px] min-w-[48px] px-3 rounded-xl
                        font-semibold text-sm
                        transition-all duration-200
                        active:scale-95
                        focus-visible:outline-none focus-visible:ring-4
                        ${
                          isJustAdded
                            ? 'bg-emerald-500 text-white'
                            : 'bg-brand-700 text-white hover:bg-brand-800 focus-visible:ring-brand-200'
                        }
                        disabled:bg-chrome-300 disabled:text-chrome-500
                        disabled:cursor-not-allowed disabled:active:scale-100`}
          >
            {isJustAdded ? (
              <>
                <Check size={18} strokeWidth={2.5} />
                <span className="ml-1">Agregado</span>
              </>
            ) : (
              <>
                <Plus size={18} strokeWidth={2.5} />
                <span className="ml-1 hidden xs:inline">Agregar</span>
                <ShoppingCart
                  size={16}
                  strokeWidth={2}
                  className="xs:hidden"
                />
              </>
            )}
          </button>
        </div>
      </div>
    </article>
  );
}

/* xs breakpoint is configured inline above via the `xs:` variant.
   Tailwind doesn't ship it by default, so we register it in
   tailwind.config.mjs → but for a single component we can also just
   use the `min-[420px]:` arbitrary variant pattern. To keep the config
   clean, we map `xs:` to a min-width of 420px. */
