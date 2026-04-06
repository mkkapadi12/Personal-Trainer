// ─── Constants ──────────────────────────────────────────
export const sortOptions = [
  { value: 'latest', label: 'Latest' },
  { value: 'rating', label: 'Rating' },
  { value: 'price-asc', label: 'Price: Low → High' },
  { value: 'price-desc', label: 'Price: High → Low' },
];

export const categoryOptions = [
  'cross trainer',
  'gym equipment',
  'protein powder',
  'treadmills',
  'accessories',
  'creatine',
  'mass gainer',
  'bcaa',
];

export const emptyForm = {
  name: '',
  brand: '',
  category: '',
  price: '',
  description: '',
  mainImage: '',
  stock: '',
};

// ─── Dark-themed input class ────────────────────────────
export const inputClass =
  'bg-zinc-900 border-zinc-800 text-white placeholder:text-zinc-600 focus-visible:ring-lime-400/30 focus-visible:border-lime-400/50 transition-colors';
