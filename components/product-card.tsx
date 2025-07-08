'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Heart, Star, ShoppingBag, Check } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { type Product, formatPrice } from '@/lib/mock-data';
import { useCart } from '@/lib/cart-context';
import { useWishlist } from '@/lib/wishlist-context';
import { useState } from 'react';

interface ProductCardProps {
  product: Product;
  className?: string;
}

export function ProductCard({ product, className }: ProductCardProps) {
  const { addItem } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [justAdded, setJustAdded] = useState(false);

  const isWishlisted = isInWishlist(product.id);

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    setIsAddingToCart(true);

    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 300));

    addItem(product, 1);
    setJustAdded(true);

    // Reset the "just added" state after animation
    setTimeout(() => {
      setJustAdded(false);
    }, 2000);

    setIsAddingToCart(false);
  };

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product);
  };

  return (
    <Card
      className={`group border-0 shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden ${className}`}
    >
      <Link href={product.href}>
        <CardContent className="p-0">
          {' '}
          {/* Product Image */}
          <div className="relative aspect-square overflow-hidden bg-gray-50">
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
            />

            {/* Discount Badge */}
            {product.discount && (
              <Badge className="absolute top-2 left-2 bg-red-500 hover:bg-red-600 text-white">
                -{product.discount}%
              </Badge>
            )}

            {/* Quick Actions */}
            <div className="absolute top-2 right-2 flex flex-col gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              {/* Wishlist Button */}
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    size="sm"
                    variant="secondary"
                    className={`h-8 w-8 p-0 shadow-md transition-all duration-200 ${
                      isWishlisted
                        ? 'bg-red-500 hover:bg-red-600 text-white'
                        : 'bg-white/90 hover:bg-white'
                    }`}
                    onClick={handleToggleWishlist}
                  >
                    <Heart
                      className={`h-4 w-4 transition-transform duration-200 ${
                        isWishlisted ? 'fill-current scale-110' : ''
                      }`}
                    />
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="left">
                  {isWishlisted ? 'Hapus dari wishlist' : 'Tambah ke wishlist'}
                </TooltipContent>
              </Tooltip>
            </div>

            {/* Add to Cart Overlay */}
            <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    className={`w-full h-9 text-sm font-medium transition-all duration-300 ${
                      justAdded
                        ? 'bg-green-500 hover:bg-green-600'
                        : 'bg-pink-600 hover:bg-pink-700'
                    }`}
                    onClick={handleAddToCart}
                    disabled={isAddingToCart}
                  >
                    {isAddingToCart ? (
                      <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    ) : justAdded ? (
                      <>
                        <Check className="h-4 w-4 mr-1" />
                        Ditambahkan
                      </>
                    ) : (
                      <>
                        <ShoppingBag className="h-4 w-4 mr-1" />
                        Tambah ke Keranjang
                      </>
                    )}
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="top">
                  {justAdded
                    ? 'Berhasil ditambahkan ke keranjang'
                    : 'Klik untuk menambah ke keranjang'}
                </TooltipContent>
              </Tooltip>
            </div>
          </div>
          {/* Product Info */}
          <div className="p-4 space-y-2">
            {/* Brand */}
            <p className="text-xs text-gray-500 uppercase tracking-wide">
              {product.brand}
            </p>

            {/* Product Name */}
            <h3 className="font-medium text-sm leading-tight line-clamp-2 group-hover:text-pink-600 transition-colors">
              {product.name}
            </h3>

            {/* Rating */}
            <div className="flex items-center gap-1">
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

            {/* Price */}
            <div className="flex items-center gap-2">
              <span className="font-bold text-pink-600">
                {formatPrice(product.price)}
              </span>
              {product.originalPrice && (
                <span className="text-xs text-gray-500 line-through">
                  {formatPrice(product.originalPrice)}
                </span>
              )}
            </div>

            {/* Stock Status */}
            <div className="flex items-center justify-between">
              <span
                className={`text-xs ${
                  product.stockCount > 10
                    ? 'text-green-600'
                    : product.stockCount > 0
                    ? 'text-orange-600'
                    : 'text-red-600'
                }`}
              >
                {product.stockCount > 10
                  ? 'Stok tersedia'
                  : product.stockCount > 0
                  ? `Stok terbatas (${product.stockCount})`
                  : 'Stok habis'}
              </span>
            </div>
          </div>
        </CardContent>
      </Link>
    </Card>
  );
}
