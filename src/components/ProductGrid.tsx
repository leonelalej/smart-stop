import { useMemo } from 'react';
import { useStore } from '@nanostores/react';
import { PackageOpen, SearchX } from 'lucide-react';
import ProductCard from './ProductCard';
import { PRODUCTS } from '@/data/products';
import { activeCategory, searchQuery } from '@/stores/catalog';

/* ──────────────────────────────────────────────────────────────────────────
 *  ProductGrid — the catalog island.
 *  Reactively filters PRODUCTS by:
 *   1. The active category pill (`activeCategory`)
 *   2. The search query from the header (`searchQuery`)
 *  Matching is case-insensitive across name, description, and compatibility.
 *  Renders a responsive 2/3/4 column grid.
 *  Shows an empty state if no product matches.
 * ────────────────────────────────────────────────────────────────────────── */

export default function ProductGrid() {
  const query = useStore(searchQuery);
  const category = useStore(activeCategory);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return PRODUCTS.filter((p) => {
      if (category !== 'all' && p.category !== category) return false;
      if (!q) return true;
      return (
        p.name.toLowerCase().includes(q) ||
        (p.description?.toLowerCase().includes(q) ?? false) ||
        p.compatibility.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q)
      );
    });
  }, [query, category]);

  const noResults = filtered.length === 0;
  const isQueryDriven = query.trim().length > 0;

  if (noResults) {
    return (
      <div className="flex flex-col items-center justify-center text-center py-16 px-6">
        <div className="w-16 h-16 rounded-full bg-chrome-100 flex items-center justify-center mb-4">
          {isQueryDriven ? (
            <SearchX size={28} className="text-chrome-400" strokeWidth={2} />
          ) : (
            <PackageOpen
              size={28}
              className="text-chrome-400"
              strokeWidth={2}
            />
          )}
        </div>
        <h3 className="font-semibold text-chrome-700">
          {isQueryDriven
            ? 'Sin resultados para tu búsqueda'
            : 'No hay productos en esta categoría'}
        </h3>
        <p className="text-sm text-chrome-500 mt-1 max-w-xs">
          {isQueryDriven
            ? 'Prueba con otro término o explora una categoría diferente.'
            : 'Vuelve pronto, estamos reposando inventario constantemente.'}
        </p>
      </div>
    );
  }

  return (
    <section
      aria-label="Catálogo de productos"
      className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4"
    >
      {filtered.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </section>
  );
}
