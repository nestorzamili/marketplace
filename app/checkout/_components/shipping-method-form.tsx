'use client';

import { Truck } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  shippingOptions,
  calculateShippingCost,
  getShippingOption,
} from './shipping-utils';

interface ShippingMethodProps {
  shippingMethod: string;
  onShippingMethodChange: (value: string) => void;
  subtotal: number;
  formatPrice: (price: number) => string;
}

export function ShippingMethodForm({
  shippingMethod,
  onShippingMethodChange,
  subtotal,
  formatPrice,
}: ShippingMethodProps) {
  const isFreeShipping = subtotal >= 500000;

  const getSelectedOptionDisplay = () => {
    const selectedOption = getShippingOption(shippingMethod);
    if (!selectedOption) return null;

    const price = calculateShippingCost(shippingMethod, subtotal);
    const isFree = price === 0 && selectedOption.value === 'regular';

    return (
      <span className="font-medium">
        {selectedOption.name} ({selectedOption.estimatedDays}) -{' '}
        {isFree ? (
          <span className="text-green-600">GRATIS</span>
        ) : (
          <span>{formatPrice(price)}</span>
        )}
      </span>
    );
  };

  return (
    <Card>
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2 text-lg">
          <Truck className="h-5 w-5 text-pink-600" />
          Metode Pengiriman
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label className="text-sm font-medium text-gray-700">
            Pilih Metode Pengiriman *
          </Label>
          <Select value={shippingMethod} onValueChange={onShippingMethodChange}>
            <SelectTrigger className="h-12">
              <SelectValue placeholder="Pilih metode pengiriman">
                {shippingMethod && getSelectedOptionDisplay()}
              </SelectValue>
            </SelectTrigger>
            <SelectContent>
              {shippingOptions.map((option) => {
                const price = calculateShippingCost(option.value, subtotal);
                const isFree = price === 0 && option.value === 'regular';

                return (
                  <SelectItem key={option.value} value={option.value}>
                    <div className="flex justify-between items-center w-full py-2">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-pink-50 rounded-lg flex items-center justify-center">
                          <Truck className="h-4 w-4 text-pink-600" />
                        </div>
                        <div>
                          <div className="font-medium text-gray-900">
                            {option.name} ({option.estimatedDays})
                          </div>
                          <div className="text-sm text-gray-500">
                            {option.description}
                          </div>
                        </div>
                      </div>
                      <div className="text-right ml-4">
                        {isFree ? (
                          <span className="font-semibold text-green-600">
                            GRATIS
                          </span>
                        ) : (
                          <span className="font-semibold text-gray-900">
                            {formatPrice(price)}
                          </span>
                        )}
                      </div>
                    </div>
                  </SelectItem>
                );
              })}
            </SelectContent>
          </Select>
        </div>

        {isFreeShipping && (
          <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
            <div className="flex items-center gap-2">
              <span className="text-2xl">🎉</span>
              <div>
                <p className="text-green-800 font-medium text-sm">
                  Selamat! Anda mendapat gratis ongkir
                </p>
                <p className="text-green-700 text-xs mt-1">
                  Untuk pengiriman reguler karena belanja minimal IDR 500,000
                </p>
              </div>
            </div>
          </div>
        )}

        <div className="text-xs text-gray-500">
          * Estimasi waktu pengiriman dapat berbeda tergantung lokasi dan
          kondisi
        </div>
      </CardContent>
    </Card>
  );
}

export { shippingOptions, calculateShippingCost };
