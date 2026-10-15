import { useStore } from '@nanostores/react';
import {
  BatteryCharging,
  Cable,
  Headphones,
  LayoutGrid,
  Shield,
  Smartphone,
  Sparkles,
  Wrench,
  Zap,
  type LucideIcon,
} from 'lucide-react';
import { CATEGORIES } from '@/data/products';
import { activeCategory, setCategory } from '@/stores/catalog';

/* ──────────────────────────────────────────────────────────────────────────
 *  CategoryPills — horizontally scrollable, snap-scroll, hidden scrollbar.
 *  Renders inside the Header sticky region on mobile so users can
 *  quickly filter without scrolling back to the top.
 * ────────────────────────────────────────────────────────────────────────── */

const ICON_MAP: Record<string, LucideIcon> = {
  LayoutGrid,
  Smartphone,
  Zap,
  Cable,
  Shield,
  BatteryCharging,
  Headphones,
  Sparkles,
  Wrench,
};

export default function CategoryPills() {
  const active = useStore(activeCategory);

  return (
    <nav
      aria-label="Categorías"
      className="no-scrollbar snap-x-pills overflow-x-auto -mx-4 px-4 py-1"
    >
      <ul className="flex gap-2 w-max pr-4">
        {CATEGORIES.map((cat) => {
          const Icon = ICON_MAP[cat.icon] ?? LayoutGrid;
          const isActive = active === cat.id;
          return (
            <li key={cat.id} className="snap-start">
              <button
                type="button"
                onClick={() => setCategory(cat.id)}
                aria-pressed={isActive}
                className={`pill ${isActive ? 'pill-active' : 'pill-idle'}`}
              >
                <Icon size={16} strokeWidth={2.25} />
                <span>{cat.label}</span>
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
