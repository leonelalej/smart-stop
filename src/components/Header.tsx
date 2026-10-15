import { useStore } from '@nanostores/react';
import { MapPin, Search, X, Clock } from 'lucide-react';
import CategoryPills from './CategoryPills';
import { searchQuery, setSearch, clearSearch } from '@/stores/catalog';
import { STORE_INFO } from '@/data/products';

/* ──────────────────────────────────────────────────────────────────────────
 *  Header (React island)
 *  - Brand row: SMT logo + name + live "Open now / Delivery" status pill
 *  - Sticky search bar with clear button
 *  - Horizontally scrollable category pills
 *  Sticky on mobile using `sticky top-0 z-30`; the search bar uses
 *  `inputMode="search"` to surface the mobile keyboard's "Search" key.
 * ────────────────────────────────────────────────────────────────────────── */

export default function Header() {
  const query = useStore(searchQuery);

  return (
    <header
      className="sticky top-0 z-30 bg-white/95 backdrop-blur-md
                 border-b border-chrome-100
                 pt-[max(env(safe-area-inset-top),0px)]"
    >
      <div className="mx-auto max-w-screen-desktop px-4">
        {/* ─── Brand row ─────────────────────────────────────────── */}
        <div className="flex items-center justify-between gap-3 py-3">
          <a
            href="/"
            className="flex items-center gap-2 min-h-[48px] py-1"
            aria-label="Smart Stop inicio"
          >
            <img
              src="/smart-stop-logo.png"
              alt="Smart Stop"
              width={40}
              height={40}
              className="h-10 w-10 rounded-lg object-cover shadow-sm ring-1 ring-chrome-200"
              fetchPriority="high"
            />
            <div className="flex flex-col leading-tight">
              <span className="font-display font-bold text-base text-chrome-900">
                Smart Stop
              </span>
              <span className="text-[11px] text-chrome-500 font-medium">
                {STORE_INFO.handle}
              </span>
            </div>
          </a>

          {/* Status pill — Open + Delivery */}
          <div className="flex items-center gap-2 text-[11px] font-semibold">
            <span className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-700 px-2.5 py-1.5 rounded-full">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-2 w-2 rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
              </span>
              Abierto
            </span>
            <span className="hidden xs:inline-flex items-center gap-1 bg-chrome-100 text-chrome-700 px-2.5 py-1.5 rounded-full">
              <MapPin size={12} strokeWidth={2.5} />
              Delivery
            </span>
            <span className="hidden md:inline-flex items-center gap-1 bg-chrome-100 text-chrome-700 px-2.5 py-1.5 rounded-full">
              <Clock size={12} strokeWidth={2.5} />
              {STORE_INFO.hours}
            </span>
          </div>
        </div>

        {/* ─── Search bar ────────────────────────────────────────── */}
        <div className="pb-3">
          <label className="relative block">
            <span className="sr-only">Buscar productos</span>
            <Search
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-chrome-400 pointer-events-none"
              strokeWidth={2.25}
            />
            <input
              type="search"
              inputMode="search"
              enterKeyHint="search"
              autoComplete="off"
              placeholder="Buscar: funda, cargador, USB-C, AirPods…"
              value={query}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full min-h-[48px] pl-10 pr-10 rounded-xl
                         bg-chrome-100 border border-chrome-200
                         text-sm font-medium text-chrome-900
                         placeholder:text-chrome-400 placeholder:font-normal
                         focus:bg-white focus:border-brand-400
                         focus:ring-4 focus:ring-brand-100
                         focus:outline-none
                         transition-all duration-200"
            />
            {query.trim().length > 0 && (
              <button
                type="button"
                onClick={() => clearSearch()}
                aria-label="Limpiar búsqueda"
                className="absolute right-2 top-1/2 -translate-y-1/2
                           h-9 w-9 flex items-center justify-center
                           rounded-lg text-chrome-500
                           hover:bg-chrome-200 hover:text-chrome-700
                           active:scale-95 transition-all"
              >
                <X size={18} strokeWidth={2.5} />
              </button>
            )}
          </label>
        </div>

        {/* ─── Category pills (snap-scroll, hidden scrollbar) ─── */}
        <div className="pb-3 -mt-1">
          <CategoryPills />
        </div>
      </div>
    </header>
  );
}
