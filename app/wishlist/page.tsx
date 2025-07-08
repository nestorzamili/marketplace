'use client';

import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';
import { Breadcrumb } from '@/components/ui/breadcrumb';
import { ProductCard } from '@/components/product-card';
import { useWishlist } from '@/lib/wishlist-context';
import { Heart, ShoppingBag } from 'lucide-react';
import Link from 'next/link';

export default function WishlistPage() {
  const { items, clearWishlist, getWishlistCount } = useWishlist();

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-white">
        <Header />

        <main>
          {/* Breadcrumb */}
          <div className="bg-gray-50 border-b">
            <div className="container mx-auto px-4 py-4">
              <Breadcrumb items={[{ label: 'Wishlist' }]} />
            </div>
          </div>

          {/* Empty State */}
          <section className="py-16">
            <div className="container mx-auto px-4">
              <div className="text-center max-w-md mx-auto">
                <div className="mb-6">
                  <Heart className="h-24 w-24 text-gray-300 mx-auto" />
                </div>
                <h1 className="text-2xl font-bold text-gray-900 mb-4">
                  Wishlist Kosong
                </h1>
                <p className="text-gray-600 mb-8">
                  Belum ada produk yang disimpan di wishlist. Mulai jelajahi
                  produk dan simpan favorit Anda!
                </p>
                <Button
                  asChild
                  size="lg"
                  className="bg-pink-600 hover:bg-pink-700"
                >
                  <Link href="/products">
                    <ShoppingBag className="h-4 w-4 mr-2" />
                    Jelajahi Produk
                  </Link>
                </Button>
              </div>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main>
        {/* Breadcrumb */}
        <div className="bg-gray-50 border-b">
          <div className="container mx-auto px-4 py-4">
            <Breadcrumb items={[{ label: 'Wishlist' }]} />
          </div>
        </div>

        {/* Wishlist Header */}
        <section className="py-6 border-b">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  Wishlist Saya
                </h1>
                <p className="text-gray-600">
                  {getWishlistCount()} produk tersimpan
                </p>
              </div>
              <Button
                variant="outline"
                onClick={clearWishlist}
                className="text-red-600 border-red-200 hover:bg-red-50"
              >
                Kosongkan Wishlist
              </Button>
            </div>
          </div>
        </section>

        {/* Wishlist Grid */}
        <section className="py-8">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {items.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
