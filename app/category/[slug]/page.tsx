'use client';

import { useState, use } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Heart, Star, ShoppingBag, Filter, Grid, List } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  getProductsByCategory,
  categories,
  formatPrice,
} from '@/lib/mock-data';
import { Breadcrumb } from '@/components/ui/breadcrumb';

interface CategoryPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default function CategoryPage({ params }: CategoryPageProps) {
  const resolvedParams = use(params);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState('popular');
  const [likedProducts, setLikedProducts] = useState<Set<string>>(new Set());

  // Get category info
  const categoryInfo =
    categories[resolvedParams.slug as keyof typeof categories];

  if (!categoryInfo) {
    notFound();
  }

  // Get products by category
  const categoryProducts = getProductsByCategory(resolvedParams.slug);

  const toggleLike = (productId: string) => {
    const newLikedProducts = new Set(likedProducts);
    if (newLikedProducts.has(productId)) {
      newLikedProducts.delete(productId);
    } else {
      newLikedProducts.add(productId);
    }
    setLikedProducts(newLikedProducts);
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main>
        {/* Breadcrumb */}
        <div className="bg-gray-50 border-b">
          <div className="container mx-auto px-4 py-4">
            <Breadcrumb
              items={[
                { label: 'Kategori', href: '/categories' },
                { label: categoryInfo.name },
              ]}
            />
          </div>
        </div>

        {/* Category Header */}
        <section className="py-8 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  {categoryInfo.name}
                </h1>
                <p className="text-gray-600 mb-4">{categoryInfo.description}</p>
                <p className="text-sm text-gray-500">
                  {categoryProducts.length} produk ditemukan
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Filters & Sort */}
        <section className="py-4 border-b">
          <div className="container mx-auto px-4">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="flex items-center gap-4">
                <Button variant="outline" size="sm">
                  <Filter className="w-4 h-4 mr-2" />
                  Filter
                </Button>

                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-md text-sm"
                >
                  <option value="popular">Paling Populer</option>
                  <option value="price-low">Harga Terendah</option>
                  <option value="price-high">Harga Tertinggi</option>
                  <option value="rating">Rating Tertinggi</option>
                  <option value="newest">Terbaru</option>
                </select>
              </div>

              <div className="flex items-center gap-2">
                <Button
                  variant={viewMode === 'grid' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setViewMode('grid')}
                >
                  <Grid className="w-4 h-4" />
                </Button>
                <Button
                  variant={viewMode === 'list' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setViewMode('list')}
                >
                  <List className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Products Grid */}
        <section className="py-8">
          <div className="container mx-auto px-4">
            <div
              className={cn(
                'grid gap-6',
                viewMode === 'grid'
                  ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
                  : 'grid-cols-1',
              )}
            >
              {categoryProducts.map((product) => (
                <Card
                  key={product.id}
                  className="group border-0 shadow-sm hover:shadow-md transition-all duration-300"
                >
                  <CardContent className="p-0">
                    <div className="relative">
                      <Link href={product.href}>
                        <div className="relative aspect-square overflow-hidden rounded-t-lg">
                          <Image
                            src={product.image}
                            alt={product.name}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                          {product.discount && (
                            <Badge className="absolute top-2 left-2 bg-red-500 hover:bg-red-500">
                              -{product.discount}%
                            </Badge>
                          )}
                          {product.isNew && (
                            <Badge className="absolute top-2 left-2 bg-green-500 hover:bg-green-500">
                              Baru
                            </Badge>
                          )}
                          {product.isBestSeller &&
                            !product.discount &&
                            !product.isNew && (
                              <Badge className="absolute top-2 left-2 bg-orange-500 hover:bg-orange-500">
                                Terlaris
                              </Badge>
                            )}
                        </div>
                      </Link>

                      <Button
                        variant="ghost"
                        size="sm"
                        className="absolute top-2 right-2 h-8 w-8 p-0 bg-white/80 hover:bg-white"
                        onClick={() => toggleLike(product.id)}
                      >
                        <Heart
                          className={cn(
                            'h-4 w-4',
                            likedProducts.has(product.id)
                              ? 'fill-red-500 text-red-500'
                              : 'text-gray-600',
                          )}
                        />
                      </Button>
                    </div>

                    <div className="p-4">
                      <div className="mb-2">
                        <div className="text-xs text-gray-500 uppercase tracking-wide">
                          {product.brand}
                        </div>
                        <Link href={product.href}>
                          <h3 className="font-medium text-gray-900 hover:text-pink-600 transition-colors line-clamp-2">
                            {product.name}
                          </h3>
                        </Link>
                      </div>

                      <div className="flex items-center gap-1 mb-2">
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={cn(
                                'h-3 w-3',
                                i < Math.floor(product.rating)
                                  ? 'fill-yellow-400 text-yellow-400'
                                  : 'text-gray-300',
                              )}
                            />
                          ))}
                        </div>
                        <span className="text-xs text-gray-500">
                          ({product.reviewCount})
                        </span>
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-semibold text-gray-900">
                            {formatPrice(product.price)}
                          </div>
                          {product.originalPrice && (
                            <div className="text-xs text-gray-500 line-through">
                              {formatPrice(product.originalPrice)}
                            </div>
                          )}
                        </div>

                        <Button
                          size="sm"
                          className="bg-pink-600 hover:bg-pink-700 h-8 w-8 p-0"
                        >
                          <ShoppingBag className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Load More */}
            {categoryProducts.length > 0 && (
              <div className="text-center mt-12">
                <Button variant="outline" size="lg">
                  Muat Lebih Banyak
                </Button>
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
