'use client';

import Image from 'next/image';
import { Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { CartItem } from '@/lib/cart-context';
import { calculateShippingCost } from './shipping-utils';

interface OrderSummaryProps {
  items: CartItem[];
  getTotalItems: () => number;
  subtotal: number;
  shippingMethod: string;
  paymentMethod: string;
  adminFee: number;
  formatPrice: (price: number) => string;
  onCheckout: () => void;
  isFormValid: boolean;
}

export function OrderSummary({
  items,
  getTotalItems,
  subtotal,
  shippingMethod,
  paymentMethod,
  adminFee,
  formatPrice,
  onCheckout,
  isFormValid,
}: OrderSummaryProps) {
  const getShippingCost = () => {
    return calculateShippingCost(shippingMethod, subtotal);
  };

  const getCODFee = () => {
    return paymentMethod === 'cod' ? 5000 : 0;
  };

  const shippingCost = getShippingCost();
  const codFee = getCODFee();
  const total = subtotal + shippingCost + adminFee + codFee;

  return (
    <Card className="sticky top-24">
      <CardHeader className="pb-4">
        <CardTitle className="text-lg">Ringkasan Pesanan</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Products */}
        <div className="space-y-4">
          <h4 className="font-medium text-gray-900 text-sm">
            Produk ({items.length})
          </h4>
          <div className="space-y-3 max-h-64 overflow-y-auto">
            {items.map((item) => (
              <div key={item.id} className="flex gap-3">
                <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                  <Image
                    src={item.product.images[0]}
                    alt={item.product.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-medium truncate text-gray-900">
                    {item.product.name}
                  </h4>
                  <p className="text-xs text-gray-600 mt-1">
                    {item.product.brand}
                  </p>
                  <div className="flex justify-between items-center mt-2">
                    <span className="text-xs text-gray-600">
                      Qty: {item.quantity}
                    </span>
                    <span className="text-sm font-semibold text-gray-900">
                      {formatPrice(item.product.price * item.quantity)}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <Separator />

        {/* Price Breakdown */}
        <div className="space-y-3">
          <h4 className="font-medium text-gray-900 text-sm">Rincian Biaya</h4>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">
                Subtotal ({getTotalItems()} item)
              </span>
              <span className="text-gray-900">{formatPrice(subtotal)}</span>
            </div>

            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Ongkos Kirim</span>
              <span
                className={
                  shippingCost === 0
                    ? 'text-green-600 font-medium'
                    : 'text-gray-900'
                }
              >
                {shippingCost === 0 ? 'GRATIS' : formatPrice(shippingCost)}
              </span>
            </div>

            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Biaya Admin</span>
              <span className="text-gray-900">{formatPrice(adminFee)}</span>
            </div>

            {codFee > 0 && (
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Biaya COD</span>
                <span className="text-gray-900">{formatPrice(codFee)}</span>
              </div>
            )}
          </div>
        </div>

        <Separator />

        <div className="flex justify-between text-lg font-bold">
          <span className="text-gray-900">Total</span>
          <span className="text-pink-600">{formatPrice(total)}</span>
        </div>

        <Button
          className="w-full bg-pink-600 hover:bg-pink-700 h-12 text-base font-medium"
          onClick={onCheckout}
          disabled={!isFormValid}
        >
          {isFormValid ? 'Buat Pesanan' : 'Lengkapi Data Dulu'}
        </Button>

        <div className="text-center text-sm text-gray-500 flex items-center justify-center gap-1">
          <Clock className="h-4 w-4" />
          Estimasi proses pesanan: 1-2 jam kerja
        </div>

        <div className="p-4 bg-gray-50 rounded-lg">
          <h3 className="font-medium mb-3 text-gray-900 text-sm">
            Jaminan Yelis
          </h3>
          <ul className="text-sm text-gray-600 space-y-1">
            <li className="flex items-center gap-2">
              <span className="text-green-600">✓</span>
              Produk 100% Original
            </li>
            <li className="flex items-center gap-2">
              <span className="text-green-600">✓</span>
              Garansi uang kembali
            </li>
            <li className="flex items-center gap-2">
              <span className="text-green-600">✓</span>
              Customer service 24/7
            </li>
            <li className="flex items-center gap-2">
              <span className="text-green-600">✓</span>
              Pengiriman cepat & aman
            </li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}
