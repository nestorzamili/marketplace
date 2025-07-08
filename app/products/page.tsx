'use client';

import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';
import { products } from '@/lib/mock-data';
import { Breadcrumb } from '@/components/ui/breadcrumb';
import { ProductCard } from '@/components/product-card';

export default function ProductsPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main>
        {/* Breadcrumb */}
        <div className="bg-gray-50 border-b">
          <div className="container mx-auto px-4 py-4">
            <Breadcrumb items={[{ label: 'Semua Produk' }]} />
          </div>
        </div>

        {/* Products Grid */}
        <section className="py-8">
          <div className="container mx-auto px-4">
            <h1 className="text-2xl font-bold mb-6">Semua Produk</h1>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            {/* Load More */}
            <div className="text-center mt-8">
              <Button variant="outline" size="lg">
                Muat Lebih Banyak
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
