import { atom } from 'nanostores';
import type { ProductCategory } from '@/types/index';

/* ──────────────────────────────────────────────────────────────────────────
 *  Catalog UI Store — search query + active category pill
 *  Ephemeral UI state shared between the Header search input, the
 *  CategoryPills row, and the ProductGrid island.
 * ────────────────────────────────────────────────────────────────────────── */

export const searchQuery = atom<string>('');

/** `all` = no filter. */
export const activeCategory = atom<ProductCategory | 'all'>('all');

export function setSearch(value: string): void {
  searchQuery.set(value);
}

export function setCategory(cat: ProductCategory | 'all'): void {
  activeCategory.set(cat);
}

export function clearSearch(): void {
  searchQuery.set('');
}
