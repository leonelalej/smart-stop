import type { CategoryDescriptor, Product } from '@/types/index';

/**
 * Smart Stop — Catalog Data
 * =========================
 * Static product list mirroring a real Maracaibo tech-store inventory.
 * Prices are USD-anchored (standard practice in Venezuela).
 * Replace with a fetch() from your CMS / API when ready.
 */

export const CATEGORIES: CategoryDescriptor[] = [
  { id: 'all', label: 'Todo', icon: 'LayoutGrid' },
  { id: 'cases', label: 'Fundas', icon: 'Smartphone' },
  { id: 'chargers', label: 'Cargadores', icon: 'Zap' },
  { id: 'cables', label: 'Cables', icon: 'Cable' },
  { id: 'screen-protectors', label: 'Protectores', icon: 'Shield' },
  { id: 'power-banks', label: 'Power Banks', icon: 'BatteryCharging' },
  { id: 'audio', label: 'Audio', icon: 'Headphones' },
  { id: 'gadgets', label: 'Gadgets', icon: 'Sparkles' },
  { id: 'repair-parts', label: 'Repuestos', icon: 'Wrench' },
];

export const PRODUCTS: Product[] = [
  {
    id: 'silicone-case-iphone-15-pro',
    name: 'Silicone Case iPhone 15 Pro',
    description: 'Funda de silicona suave con borde reforzado.',
    price: 12,
    originalPrice: 18,
    category: 'cases',
    compatibility: 'iPhone 15 Pro',
    image:
      'https://images.unsplash.com/photo-1696446702183-cbdb02430a80?auto=format&fit=crop&w=800&q=70',
    badge: 'promo',
    stock: 24,
  },
  {
    id: 'magsafe-charger-15w',
    name: 'MagSafe Charger 15W',
    description: 'Carga inalámbrica magnética original.',
    price: 35,
    category: 'chargers',
    compatibility: 'iPhone 12 / 13 / 14 / 15',
    image:
      'https://images.unsplash.com/photo-1633269540822-44d6d3c6e9c5?auto=format&fit=crop&w=800&q=70',
    badge: 'best-seller',
    stock: 12,
  },
  {
    id: 'type-c-braided-cable-2m',
    name: 'Cable USB-C trenzado 2m',
    description: 'Cable trenzado doble nylon, 60W Power Delivery.',
    price: 9,
    originalPrice: 14,
    category: 'cables',
    compatibility: 'Type-C universal',
    image:
      'https://images.unsplash.com/photo-1588872657578-7efd7f04662a?auto=format&fit=crop&w=800&q=70',
    badge: 'promo',
    stock: 50,
  },
  {
    id: 'tempered-glass-iphone-14',
    name: 'Vidrio Templado 9H iPhone 14',
    description: 'Protección anti-impacto, oleofóbica.',
    price: 7,
    category: 'screen-protectors',
    compatibility: 'iPhone 14 / 14 Plus',
    image:
      'https://images.unsplash.com/photo-1592899677977-9c10e8918a98?auto=format&fit=crop&w=800&q=70',
    badge: null,
    stock: 80,
  },
  {
    id: 'power-bank-20000mah',
    name: 'Power Bank 20000mAh 22.5W',
    description: 'Carga rápida PD + QC, entrada USB-C.',
    price: 28,
    originalPrice: 39,
    category: 'power-banks',
    compatibility: 'Universal',
    image:
      'https://images.unsplash.com/photo-1609592424823-2dbe1c3a8e72?auto=format&fit=crop&w=800&q=70',
    badge: 'best-seller',
    stock: 9,
  },
  {
    id: 'airpods-pro-2',
    name: 'AirPods Pro 2 (USB-C)',
    description: 'Cancelación activa de ruido. Sellado original.',
    price: 189,
    category: 'audio',
    compatibility: 'Apple / Bluetooth',
    image:
      'https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?auto=format&fit=crop&w=800&q=70',
    badge: 'new',
    stock: 5,
  },
  {
    id: 'jbl-go-4-speaker',
    name: 'Parlante JBL Go 4',
    description: 'Bluetooth 5.3, IP67 resistente al agua.',
    price: 45,
    originalPrice: 59,
    category: 'audio',
    compatibility: 'Bluetooth universal',
    image:
      'https://images.unsplash.com/photo-1545454675-3531b543be5d?auto=format&fit=crop&w=800&q=70',
    badge: 'promo',
    stock: 14,
  },
  {
    id: 'gan-charger-65w',
    name: 'Cargador GaN 65W USB-C',
    description: 'Tecnología GaN, 3 puertos, compacto.',
    price: 25,
    category: 'chargers',
    compatibility: 'Laptops / iPhone / Android',
    image:
      'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?auto=format&fit=crop&w=800&q=70',
    badge: 'new',
    stock: 18,
  },
  {
    id: 'smartwatch-straps-22mm',
    name: 'Correa Silicona 22mm',
    description: 'Compatible Apple Watch / Amazfit / Xiaomi.',
    price: 6,
    category: 'gadgets',
    compatibility: 'Smartwatch 22mm',
    image:
      'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?auto=format&fit=crop&w=800&q=70',
    badge: null,
    stock: 60,
  },
  {
    id: 'iphone-13-battery',
    name: 'Batería iPhone 13',
    description: 'Repuesto original, 3250mAh, con adhesivos.',
    price: 22,
    category: 'repair-parts',
    compatibility: 'iPhone 13 / 13 Mini',
    image:
      'https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?auto=format&fit=crop&w=800&q=70',
    badge: null,
    stock: 7,
  },
  {
    id: 'usb-c-to-lightning',
    name: 'Cable USB-C a Lightning',
    description: 'MFi certificado, 1m, carga rápida 20W.',
    price: 11,
    category: 'cables',
    compatibility: 'iPhone 12+ / iPad',
    image:
      'https://images.unsplash.com/photo-1608256246200-53e635b5b65f?auto=format&fit=crop&w=800&q=70',
    badge: 'best-seller',
    stock: 32,
  },
  {
    id: 'wireless-earbuds-x8',
    name: 'Audífonos Inalámbricos X8',
    description: 'ENC mic, 30h batería total, estuche LED.',
    price: 18,
    originalPrice: 25,
    category: 'audio',
    compatibility: 'Bluetooth 5.3',
    image:
      'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=800&q=70',
    badge: 'promo',
    stock: 22,
  },
];

/** Quick lookup helper used by the cart store. */
export const PRODUCT_MAP: Record<string, Product> = Object.fromEntries(
  PRODUCTS.map((p) => [p.id, p]),
);

/** Public store contact info used to build the WhatsApp checkout link. */
export const STORE_INFO = {
  name: 'Smart Stop',
  handle: '@smartstopmcbo',
  city: 'Maracaibo, Venezuela',
  // WhatsApp number in international format, no `+`, no spaces.
  whatsapp: '584123456789',
  instagram: 'https://instagram.com/smartstopmcbo',
  hours: 'Lun–Sáb · 9am – 6pm',
  delivery: 'Delivery en Maracaibo · Envíos a toda Venezuela',
} as const;
