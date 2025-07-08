'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Trash2, Plus, Minus, ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Breadcrumb } from '@/components/ui/breadcrumb';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { useCart } from '@/lib/cart-context';

export default function CartPage() {
  const {
    state,
    updateQuantity,
    removeItem,
    clearCart,
    getTotalItems,
    getTotalPrice,
  } = useCart();

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const shippingCost = getTotalPrice() >= 500000 ? 0 : 25000;
  const finalTotal = getTotalPrice() + shippingCost;

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <Breadcrumb items={[{ label: 'Keranjang Belanja' }]} className="mb-6" />

        {state.items.length === 0 ? (
          <Card className="text-center py-16">
            <CardContent>
              <ShoppingBag className="h-24 w-24 text-gray-300 mx-auto mb-6" />
              <h2 className="text-2xl font-semibold mb-4">
                Keranjang Anda Kosong
              </h2>
              <p className="text-gray-600 mb-8">
                Belum ada produk yang ditambahkan ke keranjang. Yuk, mulai
                belanja sekarang!
              </p>
              <Button asChild size="lg">
                <Link href="/products">Mulai Belanja</Link>
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              <Card>
                <CardContent className="p-6">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold">
                      Produk ({state.items.length})
                    </h2>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={clearCart}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="h-4 w-4 mr-2" />
                      Hapus Semua
                    </Button>
                  </div>

                  <div className="space-y-4">
                    {state.items.map((item, index) => (
                      <div key={item.id}>
                        <div className="flex gap-4 p-4 rounded-lg border bg-white">
                          <div className="relative w-24 h-24 rounded-lg overflow-hidden bg-gray-100">
                            <Image
                              src={item.product.images[0]}
                              alt={item.product.name}
                              fill
                              className="object-cover"
                            />
                          </div>

                          <div className="flex-1 min-w-0">
                            <h3 className="font-semibold text-lg mb-1">
                              {item.product.name}
                            </h3>
                            <p className="text-gray-600 mb-2">
                              {item.product.brand}
                            </p>
                            <p className="text-pink-600 font-bold text-lg">
                              {formatPrice(item.product.price)}
                            </p>
                            <p className="text-sm text-gray-500 mt-2">
                              Subtotal:{' '}
                              {formatPrice(item.product.price * item.quantity)}
                            </p>
                          </div>

                          <div className="flex flex-col items-end justify-between">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => removeItem(item.id)}
                              className="text-gray-400 hover:text-red-500 p-2"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>

                            <div className="flex items-center gap-2 border rounded-lg">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() =>
                                  updateQuantity(item.id, item.quantity - 1)
                                }
                                className="h-8 w-8 p-0"
                                disabled={item.quantity <= 1}
                              >
                                <Minus className="h-3 w-3" />
                              </Button>
                              <span className="text-sm w-8 text-center font-medium">
                                {item.quantity}
                              </span>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() =>
                                  updateQuantity(item.id, item.quantity + 1)
                                }
                                className="h-8 w-8 p-0"
                              >
                                <Plus className="h-3 w-3" />
                              </Button>
                            </div>
                          </div>
                        </div>
                        {index < state.items.length - 1 && (
                          <Separator className="my-4" />
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <Card className="sticky top-24">
                <CardContent className="p-6">
                  <h2 className="text-xl font-semibold mb-4">
                    Ringkasan Pesanan
                  </h2>

                  <div className="space-y-3 mb-4">
                    <div className="flex justify-between">
                      <span>Subtotal ({getTotalItems()} item)</span>
                      <span>{formatPrice(getTotalPrice())}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Ongkos Kirim</span>
                      <span
                        className={
                          shippingCost === 0 ? 'text-green-600 font-medium' : ''
                        }
                      >
                        {shippingCost === 0
                          ? 'GRATIS'
                          : formatPrice(shippingCost)}
                      </span>
                    </div>
                    {shippingCost === 0 && (
                      <p className="text-sm text-green-600">
                        🎉 Selamat! Anda mendapat gratis ongkir
                      </p>
                    )}
                    {shippingCost > 0 && (
                      <p className="text-sm text-gray-600">
                        Belanja {formatPrice(500000 - getTotalPrice())} lagi
                        untuk gratis ongkir
                      </p>
                    )}
                  </div>

                  <Separator className="my-4" />

                  <div className="flex justify-between text-lg font-bold mb-6">
                    <span>Total</span>
                    <span className="text-pink-600">
                      {formatPrice(finalTotal)}
                    </span>
                  </div>

                  <Button className="w-full mb-3" size="lg" asChild>
                    <Link href="/checkout">Lanjut ke Checkout</Link>
                  </Button>

                  <Button variant="outline" className="w-full" asChild>
                    <Link href="/products">Lanjut Belanja</Link>
                  </Button>

                  <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                    <h3 className="font-medium mb-2">
                      Keuntungan Berbelanja di Yelis
                    </h3>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>✓ Produk 100% Original</li>
                      <li>✓ Gratis ongkir min. IDR 500,000</li>
                      <li>✓ Garansi uang kembali</li>
                      <li>✓ Customer service 24/7</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
