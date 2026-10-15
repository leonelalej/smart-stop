import { useEffect, useState } from 'react';
import { ChevronRight, Zap, Truck, ShieldCheck } from 'lucide-react';

/* ──────────────────────────────────────────────────────────────────────────
 *  HeroCarousel — auto-advancing promo banner.
 *  Renders directly under the Header. Optimized for mobile (full-bleed).
 *  Pure-CSS slide animation with React-driven state for the active dot.
 *  Hydrated with `client:visible` so it doesn't block first paint.
 * ────────────────────────────────────────────────────────────────────────── */

interface Slide {
  id: string;
  eyebrow: string;
  title: string;
  highlight?: string;
  description: string;
  cta?: string;
  href?: string;
  /** Background gradient classes. */
  bgClass: string;
  /** Decorative icon shown on the right side. */
  icon: 'zap' | 'truck' | 'shield';
}

const SLIDES: Slide[] = [
  {
    id: 'promo-cargadores',
    eyebrow: 'Promo de la semana',
    title: 'Cargadores GaN 65W',
    highlight: '-20%',
    description: 'Carga tu laptop, iPhone y Android al mismo tiempo.',
    cta: 'Ver cargadores',
    href: '#catalogo',
    bgClass: 'from-brand-900 via-brand-800 to-brand-700',
    icon: 'zap',
  },
  {
    id: 'promo-delivery',
    eyebrow: 'Delivery en Maracaibo',
    title: 'Pídelo hoy, recíbelo hoy',
    highlight: '🚚',
    description: 'Envíos a toda Venezuela. Pago móvil, USD o Zelle.',
    cta: 'Escríbenos',
    href: '#catalogo',
    bgClass: 'from-chrome-900 via-chrome-800 to-chrome-700',
    icon: 'truck',
  },
  {
    id: 'promo-garantia',
    eyebrow: 'Garantía real',
    title: 'Vidrios templados 9H',
    highlight: '7$',
    description: 'Protección anti-impacto con instalación gratis en tienda.',
    cta: 'Ver protectores',
    href: '#catalogo',
    bgClass: 'from-emerald-900 via-emerald-800 to-emerald-600',
    icon: 'shield',
  },
];

const ICONS = {
  zap: Zap,
  truck: Truck,
  shield: ShieldCheck,
} as const;

const AUTOPLAY_MS = 4500;

export default function HeroCarousel() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const id = window.setInterval(() => {
      setActive((cur) => (cur + 1) % SLIDES.length);
    }, AUTOPLAY_MS);
    return () => window.clearInterval(id);
  }, []);

  /* Pause autoplay on user interaction (visible focus / tap). */
  const handleDotClick = (idx: number) => setActive(idx);

  return (
    <section
      aria-label="Promociones destacadas"
      className="px-4 pt-3"
    >
      <div className="relative rounded-2xl overflow-hidden">
        {/* Slides track */}
        <div
          className="flex transition-transform duration-500 ease-out"
          style={{ transform: `translateX(-${active * 100}%)` }}
        >
          {SLIDES.map((slide) => {
            const Icon = ICONS[slide.icon];
            return (
              <article
                key={slide.id}
                className={`relative min-w-full aspect-[16/9]
                            bg-gradient-to-br ${slide.bgClass}
                            text-white p-5 sm:p-6
                            flex flex-col justify-between`}
              >
                {/* Decorative icon */}
                <Icon
                  size={120}
                  strokeWidth={1.25}
                  className="absolute -right-4 -bottom-4 opacity-15
                             text-white pointer-events-none"
                />

                <div className="relative">
                  <span className="inline-flex items-center gap-1
                                  bg-white/15 backdrop-blur-sm
                                  text-[11px] font-semibold uppercase tracking-wider
                                  px-2.5 py-1 rounded-full">
                    {slide.eyebrow}
                  </span>
                </div>

                <div className="relative">
                  <div className="flex items-baseline gap-2 flex-wrap">
                    <h2 className="font-display font-extrabold text-2xl sm:text-3xl
                                   leading-tight">
                      {slide.title}
                    </h2>
                    {slide.highlight && (
                      <span className="text-2xl sm:text-3xl font-extrabold
                                       text-amber-300">
                        {slide.highlight}
                      </span>
                    )}
                  </div>
                  <p className="mt-1 text-sm text-white/85 max-w-md">
                    {slide.description}
                  </p>

                  {slide.cta && slide.href && (
                    <a
                      href={slide.href}
                      className="inline-flex items-center gap-1 mt-3
                                 min-h-[44px] px-4 rounded-full
                                 bg-white text-chrome-900
                                 font-semibold text-sm
                                 hover:bg-chrome-100 active:scale-95
                                 transition-all"
                    >
                      {slide.cta}
                      <ChevronRight size={16} strokeWidth={2.5} />
                    </a>
                  )}
                </div>
              </article>
            );
          })}
        </div>

        {/* Dots */}
        <div className="absolute bottom-2.5 left-1/2 -translate-x-1/2 flex gap-1.5">
          {SLIDES.map((slide, idx) => (
            <button
              key={slide.id}
              type="button"
              onClick={() => handleDotClick(idx)}
              aria-label={`Ir a la promo ${idx + 1}`}
              aria-pressed={active === idx}
              className={`h-2 rounded-full transition-all duration-300
                          ${active === idx
                            ? 'w-6 bg-white'
                            : 'w-2 bg-white/50 hover:bg-white/75'}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
