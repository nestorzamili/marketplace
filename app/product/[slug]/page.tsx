'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import {
  Heart,
  Star,
  ShoppingBag,
  Minus,
  Plus,
  Share2,
  Truck,
  Shield,
  RotateCcw,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import {
  getProductBySlug,
  getRelatedProducts,
  formatPrice,
} from '@/lib/mock-data';
import { Breadcrumb } from '@/components/ui/breadcrumb';
import { useCart } from '@/lib/cart-context';

interface ProductDetailPageProps {
  params: Promise<{ slug: string }>;
}

export default function ProductDetailPage({ params }: ProductDetailPageProps) {
  const { slug } = React.use(params);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');
  const { addItem } = useCart();

  // Get product data based on slug
  const productDetail = getProductBySlug(slug);
  const relatedProducts = productDetail
    ? getRelatedProducts(productDetail.id, 3)
    : [];

  // If product not found, show not found message
  if (!productDetail) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <main className="container mx-auto px-4 py-12 text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Produk Tidak Ditemukan
          </h1>
          <p className="text-gray-600 mb-6">
            Produk yang Anda cari tidak tersedia.
          </p>
          <Button asChild>
            <Link href="/products">Lihat Semua Produk</Link>
          </Button>
        </main>
        <Footer />
      </div>
    );
  }

  const increaseQuantity = () => {
    if (quantity < productDetail.stockCount) {
      setQuantity(quantity + 1);
    }
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const nextImage = () => {
    setSelectedImage((prev) =>
      prev === productDetail.images.length - 1 ? 0 : prev + 1,
    );
  };

  const prevImage = () => {
    setSelectedImage((prev) =>
      prev === 0 ? productDetail.images.length - 1 : prev - 1,
    );
  };

  const handleAddToCart = () => {
    if (productDetail && productDetail.inStock) {
      addItem(productDetail, quantity);
      // Reset quantity after adding to cart
      setQuantity(1);
    }
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
                {
                  label: productDetail.category,
                  href: `/category/${productDetail.categorySlug}`,
                },
                { label: productDetail.name },
              ]}
            />
          </div>
        </div>

        {/* Product Detail Section */}
        <section className="py-8">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Product Images */}
              <div>
                <div className="relative aspect-square mb-4 overflow-hidden rounded-lg group">
                  <Image
                    src={productDetail.images[selectedImage]}
                    alt={productDetail.name}
                    fill
                    className="object-cover"
                  />
                  {productDetail.discount && (
                    <Badge className="absolute top-4 left-4 bg-red-500 hover:bg-red-500 z-10">
                      -{productDetail.discount}%
                    </Badge>
                  )}

                  {/* Navigation Arrows - Only show if more than 1 image */}
                  {productDetail.images.length > 1 && (
                    <>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 opacity-0 group-hover:opacity-100 transition-opacity duration-200 h-8 w-8 p-0 z-10"
                        onClick={prevImage}
                      >
                        <ChevronLeft className="h-5 w-5" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 opacity-0 group-hover:opacity-100 transition-opacity duration-200 h-8 w-8 p-0 z-10"
                        onClick={nextImage}
                      >
                        <ChevronRight className="h-5 w-5" />
                      </Button>
                    </>
                  )}

                  {/* Image Counter */}
                  {productDetail.images.length > 1 && (
                    <div className="absolute bottom-4 right-4 bg-black/50 text-white text-xs px-2 py-1 rounded">
                      {selectedImage + 1} / {productDetail.images.length}
                    </div>
                  )}
                </div>

                {/* Thumbnail Images */}
                <div className="flex gap-2">
                  {productDetail.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={`relative w-20 h-20 rounded-lg overflow-hidden border-2 ${
                        selectedImage === index
                          ? 'border-pink-600'
                          : 'border-gray-200'
                      }`}
                    >
                      <Image
                        src={image}
                        alt={`${productDetail.name} ${index + 1}`}
                        fill
                        className="object-cover"
                      />
                    </button>
                  ))}
                </div>
              </div>

              {/* Product Info */}
              <div>
                <div className="mb-4">
                  <div className="text-sm text-gray-500 uppercase tracking-wide mb-2">
                    {productDetail.brand}
                  </div>
                  <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                    {productDetail.name}
                  </h1>

                  {/* Rating */}
                  <div className="flex items-center gap-2 mb-4">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < Math.floor(productDetail.rating)
                              ? 'fill-yellow-400 text-yellow-400'
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-gray-600">
                      {productDetail.rating} ({productDetail.reviewCount}{' '}
                      ulasan)
                    </span>
                  </div>

                  {/* Price */}
                  <div className="mb-6">
                    <div className="flex items-center gap-3">
                      <span className="text-3xl font-bold text-gray-900">
                        {formatPrice(productDetail.price)}
                      </span>
                      {productDetail.originalPrice && (
                        <span className="text-lg text-gray-500 line-through">
                          {formatPrice(productDetail.originalPrice)}
                        </span>
                      )}
                    </div>
                    {productDetail.discount && (
                      <div className="text-sm text-green-600 font-medium">
                        Hemat{' '}
                        {formatPrice(
                          productDetail.originalPrice! - productDetail.price,
                        )}
                      </div>
                    )}
                  </div>

                  {/* Stock Status */}
                  <div className="mb-6">
                    {productDetail.inStock ? (
                      <div className="text-green-600 font-medium">
                        ✓ Tersedia ({productDetail.stockCount} item)
                      </div>
                    ) : (
                      <div className="text-red-600 font-medium">
                        ✗ Stok Habis
                      </div>
                    )}
                  </div>

                  {/* Quantity Selector */}
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Jumlah
                    </label>
                    <div className="flex items-center gap-3">
                      <div className="flex items-center border rounded-lg">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={decreaseQuantity}
                          disabled={quantity <= 1}
                        >
                          <Minus className="h-4 w-4" />
                        </Button>
                        <span className="px-4 py-2 min-w-[60px] text-center">
                          {quantity}
                        </span>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={increaseQuantity}
                          disabled={quantity >= productDetail.stockCount}
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row gap-3 mb-6">
                    <Button
                      className="flex-1 bg-pink-600 hover:bg-pink-700"
                      disabled={!productDetail.inStock}
                      onClick={handleAddToCart}
                    >
                      <ShoppingBag className="h-4 w-4 mr-2" />
                      Tambah ke Keranjang
                    </Button>
                    <Button variant="outline">
                      <Heart className="h-4 w-4 mr-2" />
                      Wishlist
                    </Button>
                    <Button variant="outline">
                      <Share2 className="h-4 w-4" />
                    </Button>
                  </div>

                  {/* Services */}
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 text-sm text-gray-600">
                      <Truck className="h-5 w-5 text-pink-600" />
                      <span>
                        Gratis ongkir untuk pembelian di atas IDR 500,000
                      </span>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-gray-600">
                      <Shield className="h-5 w-5 text-pink-600" />
                      <span>Produk 100% original bergaransi</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-gray-600">
                      <RotateCcw className="h-5 w-5 text-pink-600" />
                      <span>Dapat dikembalikan dalam 14 hari</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Product Details Tabs */}
        <section className="py-8 border-t">
          <div className="container mx-auto px-4">
            {/* Tab Navigation */}
            <div className="flex border-b mb-8">
              {[
                { id: 'description', label: 'Deskripsi' },
                { id: 'ingredients', label: 'Kandungan' },
                { id: 'howto', label: 'Cara Pakai' },
                { id: 'reviews', label: 'Ulasan' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-6 py-3 font-medium border-b-2 transition-colors ${
                    activeTab === tab.id
                      ? 'border-pink-600 text-pink-600'
                      : 'border-transparent text-gray-600 hover:text-gray-900'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Tab Content */}
            <div className="max-w-4xl">
              {activeTab === 'description' && (
                <div>
                  <p className="text-gray-700 leading-relaxed mb-6">
                    {productDetail.description}
                  </p>
                  <h4 className="font-semibold text-gray-900 mb-3">Manfaat:</h4>
                  <ul className="space-y-2">
                    {productDetail.benefits.map((benefit, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <span className="text-pink-600 mt-1">•</span>
                        <span className="text-gray-700">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {activeTab === 'ingredients' && (
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">
                    Kandungan Utama:
                  </h4>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {productDetail.keyIngredients.map((ingredient, index) => (
                      <div
                        key={index}
                        className="bg-gray-50 rounded-lg p-3 text-center"
                      >
                        <span className="text-gray-900 font-medium">
                          {ingredient}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'howto' && (
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">
                    Cara Penggunaan:
                  </h4>
                  <ol className="space-y-3">
                    {productDetail.howToUse.map((step, index) => (
                      <li key={index} className="flex gap-3">
                        <span className="flex-shrink-0 w-6 h-6 bg-pink-600 text-white rounded-full text-sm flex items-center justify-center">
                          {index + 1}
                        </span>
                        <span className="text-gray-700">{step}</span>
                      </li>
                    ))}
                  </ol>
                </div>
              )}

              {activeTab === 'reviews' && (
                <div>
                  <div className="text-center py-8">
                    <p className="text-gray-600">
                      Ulasan akan ditampilkan di sini
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Related Products - Only show if there are related products */}
        {relatedProducts.length > 0 && (
          <section className="py-12 bg-gray-50">
            <div className="container mx-auto px-4">
              <h2 className="text-2xl font-bold text-gray-900 mb-8">
                Produk Serupa
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {relatedProducts.map((product) => (
                  <Card
                    key={product.id}
                    className="group border-0 shadow-sm hover:shadow-md transition-all duration-300"
                  >
                    <CardContent className="p-0">
                      <Link href={product.href}>
                        <div className="relative aspect-square overflow-hidden rounded-t-lg">
                          <Image
                            src={product.image}
                            alt={product.name}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                      </Link>

                      <div className="p-4">
                        <div className="text-xs text-gray-500 uppercase tracking-wide mb-1">
                          {product.brand}
                        </div>
                        <Link href={product.href}>
                          <h3 className="font-medium text-gray-900 hover:text-pink-600 transition-colors line-clamp-2 text-sm mb-2">
                            {product.name}
                          </h3>
                        </Link>

                        <div className="flex items-center gap-1 mb-2">
                          <div className="flex items-center">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`h-3 w-3 ${
                                  i < Math.floor(product.rating)
                                    ? 'fill-yellow-400 text-yellow-400'
                                    : 'text-gray-300'
                                }`}
                              />
                            ))}
                          </div>
                          <span className="text-xs text-gray-500">
                            ({product.reviewCount})
                          </span>
                        </div>

                        <div>
                          <div className="font-semibold text-gray-900 text-sm">
                            {formatPrice(product.price)}
                          </div>
                          {product.originalPrice && (
                            <div className="text-xs text-gray-500 line-through">
                              {formatPrice(product.originalPrice)}
                            </div>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>

      <Footer />
    </div>
  );
}
