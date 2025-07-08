'use client';

import { Button } from '@/components/ui/button';
import { getFeaturedProducts } from '@/lib/mock-data';
import { ProductCard } from '@/components/product-card';
import Link from 'next/link';

export function FeaturedProducts() {
  const featuredProducts = getFeaturedProducts(8);

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Produk Unggulan
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Temukan produk skincare terbaik yang dipilih khusus untuk kebutuhan
            kecantikan Anda
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-12">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <div className="text-center">
          <Button 
            variant="outline" 
            size="lg" 
            className="border-pink-200 text-pink-600 hover:bg-pink-50"
            asChild
          >
            <Link href="/products">
              Lihat Semua Produk
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
