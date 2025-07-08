'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { ArrowLeft } from 'lucide-react';

interface PaymentItem {
  id: string;
  name: string;
  brand: string;
  price: number;
  quantity: number;
  image: string;
}

interface PaymentSummaryProps {
  items?: PaymentItem[];
  subtotal: number;
  shippingCost: number;
  adminFee: number;
  codFee?: number;
  total: number;
}

export function PaymentSummary({
  items = [],
  subtotal,
  shippingCost,
  adminFee,
  codFee = 0,
  total,
}: PaymentSummaryProps) {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <Card className="sticky top-24">
      <CardHeader>
        <CardTitle className="text-lg">Ringkasan Pesanan</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Order Items */}
        {items.length > 0 && (
          <>
            <div>
              <h4 className="font-medium text-sm mb-3">
                Produk Dibeli ({items.length})
              </h4>
              <div className="space-y-3 max-h-40 overflow-y-auto">
                {items.map((item) => (
                  <div key={item.id} className="flex gap-2">
                    <div className="relative w-12 h-12 rounded bg-gray-100 flex-shrink-0">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover rounded"
                        sizes="48px"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-medium truncate">
                        {item.name}
                      </p>
                      <p className="text-xs text-gray-500">{item.brand}</p>
                      <div className="flex justify-between items-center mt-1">
                        <span className="text-xs text-gray-600">
                          Qty: {item.quantity}
                        </span>
                        <span className="text-xs font-semibold">
                          {formatPrice(item.price * item.quantity)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <Separator />
          </>
        )}

        {/* Price Breakdown */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Subtotal</span>
            <span>{formatPrice(subtotal)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Ongkos Kirim</span>
            <span>
              {shippingCost === 0 ? (
                <span className="text-green-600 font-medium">GRATIS</span>
              ) : (
                formatPrice(shippingCost)
              )}
            </span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Biaya Admin</span>
            <span>{formatPrice(adminFee)}</span>
          </div>
          {codFee > 0 && (
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Biaya COD</span>
              <span>{formatPrice(codFee)}</span>
            </div>
          )}
        </div>

        <Separator />

        <div className="text-center">
          <div className="text-2xl font-bold text-pink-600 mb-2">
            {formatPrice(total)}
          </div>
          <p className="text-sm text-gray-600">Total Pembayaran</p>
        </div>

        <Separator />

        <div className="space-y-3">
          <Button variant="outline" className="w-full" asChild>
            <Link href="/cart">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Kembali ke Keranjang
            </Link>
          </Button>
          <Button variant="outline" className="w-full" asChild>
            <Link href="/orders">Lihat Status Pesanan</Link>
          </Button>
        </div>

        <div className="text-center text-sm text-gray-500">
          <p>Butuh bantuan?</p>
          <Link
            href="/customer-service"
            className="text-pink-600 hover:underline"
          >
            Hubungi Customer Service
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
