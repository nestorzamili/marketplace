// Mock data untuk semua produk dan detail produk
export interface Product {
  id: string;
  name: string;
  brand: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  image: string;
  href: string;
  isNew?: boolean;
  isBestSeller?: boolean;
  discount?: number;
  category: string;
  categorySlug: string;
  description: string;
  keyIngredients: string[];
  benefits: string[];
  howToUse: string[];
  images: string[];
  inStock: boolean;
  stockCount: number;
  skinType: string[];
  concerns: string[];
}

export const products: Product[] = [
  {
    id: '1',
    name: 'Gentle Foaming Cleanser',
    brand: 'CeraVe',
    price: 189000,
    originalPrice: 219000,
    rating: 4.8,
    reviewCount: 1245,
    image: '/images/products/foaming-cleanser/1.jpg',
    href: '/product/gentle-foaming-cleanser',
    isBestSeller: true,
    discount: 14,
    category: 'Pembersih',
    categorySlug: 'cleansing',
    description:
      'Pembersih wajah berbusa lembut yang diformulasikan dengan 3 essential ceramides dan hyaluronic acid untuk membersihkan kulit tanpa menghilangkan kelembapan alami.',
    keyIngredients: [
      'Ceramides',
      'Hyaluronic Acid',
      'Niacinamide',
      'Vitamin B5',
    ],
    benefits: [
      'Membersihkan kotoran dan makeup',
      'Mempertahankan kelembapan kulit',
      'Memperkuat skin barrier',
      'Cocok untuk kulit sensitif',
    ],
    howToUse: [
      'Basahi wajah dengan air hangat',
      'Aplikasikan cleanser ke telapak tangan',
      'Pijat lembut ke wajah selama 30-60 detik',
      'Bilas dengan air hingga bersih',
    ],
    images: [
      '/images/products/foaming-cleanser/1.jpg',
      '/images/products/foaming-cleanser/2.jpg',
      '/images/products/foaming-cleanser/3.jpg',
    ],
    inStock: true,
    stockCount: 25,
    skinType: ['All Types', 'Sensitive'],
    concerns: ['Cleansing', 'Hydration'],
  },
  {
    id: '2',
    name: 'Hydrating Hyaluronic Acid Serum',
    brand: 'CeraVe',
    price: 245000,
    originalPrice: 289000,
    rating: 4.9,
    reviewCount: 567,
    image: '/images/products/acid-serum/1.jpg',
    href: '/product/hydrating-serum',
    isNew: false,
    isBestSeller: true,
    discount: 15,
    category: 'Serum',
    categorySlug: 'serums',
    description:
      'Serum hyaluronic acid yang memberikan hidrasi intensif dan membantu menjaga kelembapan kulit sepanjang hari.',
    keyIngredients: ['Hyaluronic Acid', 'Vitamin B5', 'Ceramides'],
    benefits: [
      'Memberikan hidrasi intensif',
      'Menjaga kelembapan kulit',
      'Meningkatkan elastisitas kulit',
      'Cocok untuk semua jenis kulit',
    ],
    howToUse: [
      'Bersihkan wajah terlebih dahulu',
      'Aplikasikan 2-3 tetes serum ke wajah',
      'Pijat lembut hingga meresap',
      'Gunakan pagi dan malam',
    ],
    images: [
      '/images/products/acid-serum/1.jpg',
      '/images/products/acid-serum/2.jpg',
      '/images/products/acid-serum/3.jpg',
    ],
    inStock: true,
    stockCount: 18,
    skinType: ['All Types', 'Dry'],
    concerns: ['Hydration', 'Anti-Aging'],
  },
  {
    id: '3',
    name: 'Daily Moisturizing Lotion',
    brand: 'CeraVe',
    price: 165000,
    originalPrice: 189000,
    rating: 4.7,
    reviewCount: 889,
    image: '/images/products/moisturizer/1.jpg',
    href: '/product/daily-moisturizer',
    isNew: false,
    isBestSeller: false,
    discount: 13,
    category: 'Pelembab',
    categorySlug: 'moisturizers',
    description:
      'Pelembab harian yang ringan dan mudah meresap, diformulasikan dengan ceramides untuk melembapkan dan melindungi skin barrier.',
    keyIngredients: ['Ceramides', 'Dimethicone', 'Glycerin'],
    benefits: [
      'Melembapkan sepanjang hari',
      'Memperkuat skin barrier',
      'Tekstur ringan dan tidak lengket',
      'Dapat digunakan pada wajah dan tubuh',
    ],
    howToUse: [
      'Aplikasikan pada kulit yang bersih',
      'Pijat lembut hingga meresap',
      'Gunakan pagi dan malam',
      'Dapat digunakan di wajah dan tubuh',
    ],
    images: [
      '/images/products/moisturizer/1.jpg',
      '/images/products/moisturizer/2.jpg',
      '/images/products/moisturizer/3.jpg',
    ],
    inStock: true,
    stockCount: 32,
    skinType: ['All Types', 'Normal'],
    concerns: ['Hydration', 'Daily Care'],
  },
  {
    id: '4',
    name: 'Micellar Water',
    brand: 'Garnier',
    price: 89000,
    rating: 4.3,
    reviewCount: 189,
    image: '/images/products/micellar-water/1.jpg',
    href: '/product/micellar-water',
    isNew: true,
    isBestSeller: false,
    category: 'Pembersih',
    categorySlug: 'cleansing',
    description:
      'Micellar water yang lembut untuk membersihkan makeup dan kotoran tanpa perlu dibilas, cocok untuk semua jenis kulit.',
    keyIngredients: ['Micelles', 'Glycerin', 'Arginine'],
    benefits: [
      'Membersihkan makeup waterproof',
      'Tidak perlu dibilas',
      'Lembut untuk mata sensitif',
      'Memberikan kelembapan',
    ],
    howToUse: [
      'Tuangkan pada kapas secukupnya',
      'Usap lembut pada wajah dan mata',
      'Tidak perlu dibilas',
      'Gunakan pagi dan malam',
    ],
    images: [
      '/images/products/micellar-water/1.jpg',
      '/images/products/micellar-water/2.jpg',
      '/images/products/micellar-water/3.jpg',
    ],
    inStock: true,
    stockCount: 45,
    skinType: ['All Types', 'Sensitive'],
    concerns: ['Makeup Removal', 'Cleansing'],
  },
  {
    id: '5',
    name: 'Vitamin C Serum',
    brand: 'Skinceuticals',
    price: 450000,
    rating: 4.8,
    reviewCount: 567,
    image: '/images/products/vitamin-c-serum/1.jpg',
    href: '/product/vitamin-c-serum',
    isNew: false,
    isBestSeller: true,
    category: 'Serum',
    categorySlug: 'serums',
    description:
      'Serum vitamin C dengan konsentrasi tinggi untuk mencerahkan kulit dan memberikan perlindungan antioksidan.',
    keyIngredients: ['L-Ascorbic Acid', 'Vitamin E', 'Ferulic Acid'],
    benefits: [
      'Mencerahkan kulit kusam',
      'Melindungi dari radikal bebas',
      'Meratakan warna kulit',
      'Meningkatkan produksi kolagen',
    ],
    howToUse: [
      'Gunakan pada pagi hari',
      'Aplikasikan 2-3 tetes ke wajah',
      'Hindari area mata',
      'Selalu gunakan sunscreen setelahnya',
    ],
    images: [
      '/images/products/vitamin-c-serum/1.jpg',
      '/images/products/vitamin-c-serum/2.jpg',
      '/images/products/vitamin-c-serum/3.jpg',
    ],
    inStock: true,
    stockCount: 12,
    skinType: ['All Types', 'Dull'],
    concerns: ['Brightening', 'Anti-Aging'],
  },
  {
    id: '6',
    name: 'Niacinamide 10% + Zinc 1%',
    brand: 'The Ordinary',
    price: 85000,
    rating: 4.3,
    reviewCount: 389,
    image: '/images/products/niacinamide-serum/1.jpg',
    href: '/product/niacinamide-serum',
    isNew: false,
    isBestSeller: true,
    category: 'Serum',
    categorySlug: 'serums',
    description:
      'Serum niacinamide dengan zinc untuk mengontrol minyak berlebih dan meminimalkan tampilan pori-pori.',
    keyIngredients: ['Niacinamide', 'Zinc PCA'],
    benefits: [
      'Mengontrol produksi minyak',
      'Meminimalkan tampilan pori',
      'Mencerahkan bekas jerawat',
      'Menenangkan kulit meradang',
    ],
    howToUse: [
      'Aplikasikan pada kulit yang bersih',
      'Gunakan 2-3 tetes pada wajah',
      'Pijat lembut hingga meresap',
      'Gunakan pagi dan malam',
    ],
    images: [
      '/images/products/niacinamide-serum/1.jpg',
      '/images/products/niacinamide-serum/2.jpg',
      '/images/products/niacinamide-serum/3.jpg',
    ],
    inStock: true,
    stockCount: 28,
    skinType: ['Oily', 'Combination', 'Acne-Prone'],
    concerns: ['Pore Care', 'Oil Control'],
  },
  {
    id: '7',
    name: 'Anthelios Ultra Light Fluid SPF 50+',
    brand: 'La Roche-Posay',
    price: 295000,
    rating: 4.7,
    reviewCount: 278,
    image: '/images/products/sunscreen/1.jpg',
    href: '/product/anthelios-sunscreen',
    isNew: false,
    isBestSeller: true,
    category: 'Tabir Surya',
    categorySlug: 'sunscreen',
    description:
      'Sunscreen dengan perlindungan UVA/UVB tinggi, tekstur ringan dan tidak meninggalkan white cast.',
    keyIngredients: ['Mexoryl SX', 'Mexoryl XL', 'Thermal Spring Water'],
    benefits: [
      'Perlindungan SPF 50+ PA++++',
      'Tekstur ringan tidak lengket',
      'Tidak meninggalkan white cast',
      'Tahan air dan keringat',
    ],
    howToUse: [
      'Aplikasikan 15 menit sebelum terpapar sinar matahari',
      'Gunakan secukupnya pada wajah dan leher',
      'Aplikasikan ulang setiap 2 jam',
      'Gunakan sebagai langkah terakhir skincare',
    ],
    images: [
      '/images/products/sunscreen/1.jpg',
      '/images/products/sunscreen/2.jpg',
      '/images/products/sunscreen/3.jpg',
    ],
    inStock: true,
    stockCount: 22,
    skinType: ['All Types', 'Sensitive'],
    concerns: ['UV Protection', 'Anti-Aging'],
  },
  {
    id: '8',
    name: 'Hydrating Sheet Mask',
    brand: 'Innisfree',
    price: 25000,
    rating: 4.2,
    reviewCount: 156,
    image: '/images/products/hydrating-mask/1.jpg',
    href: '/product/hydrating-mask',
    isNew: true,
    isBestSeller: false,
    category: 'Masker',
    categorySlug: 'masks',
    description:
      'Sheet mask dengan hyaluronic acid untuk memberikan hidrasi intensif dan menenangkan kulit.',
    keyIngredients: ['Hyaluronic Acid', 'Aloe Vera', 'Green Tea Extract'],
    benefits: [
      'Memberikan hidrasi intensif',
      'Menenangkan kulit iritasi',
      'Meningkatkan kelembapan kulit',
      'Praktis dan mudah digunakan',
    ],
    howToUse: [
      'Bersihkan wajah terlebih dahulu',
      'Aplikasikan masker pada wajah',
      'Diamkan selama 15-20 menit',
      'Lepas masker dan pijat sisa essence',
    ],
    images: [
      '/images/products/hydrating-mask/1.jpg',
      '/images/products/hydrating-mask/2.jpg',
      '/images/products/hydrating-mask/3.jpg',
    ],
    inStock: true,
    stockCount: 50,
    skinType: ['All Types', 'Dry'],
    concerns: ['Hydration', 'Soothing'],
  },
  {
    id: '9',
    name: 'Facial Roller Jade',
    brand: 'Gua Sha Co',
    price: 120000,
    originalPrice: 150000,
    rating: 4.1,
    reviewCount: 89,
    image: '/images/products/facial-roller/1.jpg',
    href: '/product/facial-roller',
    isNew: false,
    isBestSeller: false,
    discount: 20,
    category: 'Alat Kecantikan',
    categorySlug: 'tools',
    description:
      'Facial roller dari batu jade asli untuk membantu lymphatic drainage dan meningkatkan sirkulasi darah.',
    keyIngredients: ['Natural Jade Stone'],
    benefits: [
      'Membantu lymphatic drainage',
      'Meningkatkan sirkulasi darah',
      'Mengurangi bengkak di wajah',
      'Membantu penyerapan skincare',
    ],
    howToUse: [
      'Simpan di kulkas untuk efek cooling',
      'Aplikasikan skincare terlebih dahulu',
      'Roll dari tengah wajah ke arah luar',
      'Gunakan tekanan lembut',
    ],
    images: [
      '/images/products/facial-roller/1.jpg',
      '/images/products/facial-roller/2.jpg',
      '/images/products/facial-roller/3.jpg',
    ],
    inStock: true,
    stockCount: 15,
    skinType: ['All Types'],
    concerns: ['Lymphatic Drainage', 'Relaxation'],
  },
  {
    id: '10',
    name: 'Charcoal Deep Clean Mask',
    brand: 'The Body Shop',
    price: 165000,
    originalPrice: 195000,
    rating: 4.1,
    reviewCount: 98,
    image: '/images/products/charcoal-mask/1.jpg',
    href: '/product/charcoal-mask',
    isNew: false,
    isBestSeller: false,
    discount: 15,
    category: 'Masker',
    categorySlug: 'masks',
    description:
      'Masker clay dengan charcoal untuk deep cleansing dan mengangkat impurities dari pori-pori.',
    keyIngredients: ['Activated Charcoal', 'Kaolin Clay', 'Tea Tree Oil'],
    benefits: [
      'Deep cleansing pori-pori',
      'Mengangkat blackhead',
      'Mengontrol minyak berlebih',
      'Menyegarkan kulit',
    ],
    howToUse: [
      'Aplikasikan pada wajah yang bersih',
      'Hindari area mata dan bibir',
      'Diamkan hingga kering (10-15 menit)',
      'Bilas dengan air hangat',
    ],
    images: [
      '/images/products/charcoal-mask/1.jpg',
      '/images/products/charcoal-mask/2.jpg',
      '/images/products/charcoal-mask/3.jpg',
    ],
    inStock: true,
    stockCount: 20,
    skinType: ['Oily', 'Combination'],
    concerns: ['Deep Cleansing', 'Pore Care'],
  },
];

// Hero Carousel Data
export interface HeroSlide {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  cta: {
    text: string;
    href: string;
  };
  theme: 'light' | 'dark';
}

export const heroSlides: HeroSlide[] = [
  {
    id: '1',
    title: 'Koleksi Terbaru',
    subtitle: 'Skincare Korea Pilihan',
    description:
      'Temukan rahasia kulit sempurna dengan koleksi skincare Korea pilihan kami',
    image: '/images/carousel/skincare-korea-pilihan.jpg',
    cta: {
      text: 'Belanja Sekarang',
      href: '/products',
    },
    theme: 'dark',
  },
  {
    id: '2',
    title: 'Glow Musim Panas',
    subtitle: 'Perlindungan & Kilau Alami',
    description:
      'Lindungi dan berikan kilau alami pada kulit dengan produk perawatan musim panas kami',
    image: '/images/carousel/summer-glow.jpg',
    cta: {
      text: 'Jelajahi Koleksi',
      href: '/category/sunscreen',
    },
    theme: 'light',
  },
  {
    id: '3',
    title: 'Solusi Anti-Aging',
    subtitle: 'Kecantikan Abadi',
    description:
      'Formula canggih untuk membantu menjaga kulit tetap muda dan bercahaya',
    image: '/images/carousel/anti-aging.jpg',
    cta: {
      text: 'Temukan Lebih',
      href: '/category/serums',
    },
    theme: 'dark',
  },
];

// Featured Brands Data
export interface Brand {
  id: string;
  name: string;
  logo: string;
  href: string;
  productCount: number;
  description?: string;
}

export const featuredBrands: Brand[] = [
  {
    id: '1',
    name: 'CeraVe',
    logo: '/images/brands/cerave.png',
    href: '/brand/cerave',
    productCount: 45,
    description: 'Skincare dermatologist-recommended',
  },
  {
    id: '2',
    name: 'The Ordinary',
    logo: '/images/brands/the-ordinary.jpg',
    href: '/brand/the-ordinary',
    productCount: 32,
    description: 'Clinical formulations with integrity',
  },
  {
    id: '3',
    name: 'La Roche-Posay',
    logo: '/images/brands/la-roche-posay.png',
    href: '/brand/la-roche-posay',
    productCount: 38,
    description: 'Toleriane dan thermal water',
  },
  {
    id: '4',
    name: 'Olay',
    logo: '/images/brands/olay.png',
    href: '/brand/olay',
    productCount: 29,
    description: 'Regenerist anti-aging',
  },
  {
    id: '5',
    name: 'Neutrogena',
    logo: '/images/brands/neutrogena.png',
    href: '/brand/neutrogena',
    productCount: 41,
    description: 'Dermatologist recommended',
  },
  {
    id: '6',
    name: 'Innisfree',
    logo: '/images/brands/innisfree.png',
    href: '/brand/innisfree',
    productCount: 35,
    description: 'Natural skincare dari Korea',
  },
  {
    id: '7',
    name: 'COSRX',
    logo: '/images/brands/cosrx.png',
    href: '/brand/cosrx',
    productCount: 28,
    description: 'K-beauty advanced skincare',
  },
  {
    id: '8',
    name: 'Some By Mi',
    logo: '/images/brands/some-by-mi.webp',
    href: '/brand/some-by-mi',
    productCount: 24,
    description: 'Bye Bye Blackhead & AHA-BHA',
  },
  {
    id: '9',
    name: 'Skintific',
    logo: '/images/brands/skintific.png',
    href: '/brand/skintific',
    productCount: 22,
    description: 'Local skincare innovation',
  },
  {
    id: '10',
    name: 'Wardah',
    logo: '/images/brands/wardah.png',
    href: '/brand/wardah',
    productCount: 33,
    description: 'Halal beauty Indonesia',
  },
];

// Helper functions
export const getProductById = (id: string): Product | undefined => {
  return products.find((product) => product.id === id);
};

export const getProductBySlug = (slug: string): Product | undefined => {
  return products.find(
    (product) =>
      product.href === `/product/${slug}` ||
      product.name.toLowerCase().replace(/\s+/g, '-') === slug,
  );
};

export const getProductsByCategory = (categorySlug: string): Product[] => {
  return products.filter((product) => product.categorySlug === categorySlug);
};

export const getRelatedProducts = (
  productId: string,
  limit: number = 4,
): Product[] => {
  const product = getProductById(productId);
  if (!product) return [];

  return products
    .filter(
      (p) => p.categorySlug === product.categorySlug && p.id !== productId,
    )
    .slice(0, limit);
};

export const getBestSellerProducts = (limit: number = 6): Product[] => {
  return products.filter((product) => product.isBestSeller).slice(0, limit);
};

export const getNewProducts = (limit: number = 6): Product[] => {
  return products.filter((product) => product.isNew).slice(0, limit);
};

export const getFeaturedProducts = (limit: number = 8): Product[] => {
  return products
    .sort((a, b) => {
      // Sort by best seller first, then by rating
      if (a.isBestSeller && !b.isBestSeller) return -1;
      if (!a.isBestSeller && b.isBestSeller) return 1;
      return b.rating - a.rating;
    })
    .slice(0, limit);
};

// Category mapping
export const categories = {
  cleansing: {
    name: 'Pembersih',
    description: 'Pembersih lembut untuk semua jenis kulit',
    productCount: getProductsByCategory('cleansing').length,
  },
  moisturizers: {
    name: 'Pelembab',
    description: 'Krim dan lotion pelembab',
    productCount: getProductsByCategory('moisturizers').length,
  },
  serums: {
    name: 'Serum',
    description: 'Perawatan khusus dan essence',
    productCount: getProductsByCategory('serums').length,
  },
  sunscreen: {
    name: 'Tabir Surya',
    description: 'Perlindungan UV untuk penggunaan harian',
    productCount: getProductsByCategory('sunscreen').length,
  },
  masks: {
    name: 'Masker',
    description: 'Sheet mask dan perawatan khusus',
    productCount: getProductsByCategory('masks').length,
  },
  tools: {
    name: 'Alat Kecantikan',
    description: 'Alat dan aksesoris kecantikan',
    productCount: getProductsByCategory('tools').length,
  },
};

// Helper function to get categories as array for categories page
export const getCategoriesArray = () => {
  return Object.entries(categories).map(([slug, category], index) => ({
    id: (index + 1).toString(),
    name: category.name,
    description: category.description,
    image: `/images/categories/${slug}.jpg`,
    href: `/category/${slug}`,
    productCount: category.productCount,
    slug,
  }));
};

export const formatPrice = (price: number): string => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(price);
};
