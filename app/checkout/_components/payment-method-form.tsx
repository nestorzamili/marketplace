'use client';

import { CreditCard } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface PaymentMethodProps {
  paymentMethod: string;
  onPaymentMethodChange: (value: string) => void;
}

interface PaymentOption {
  value: string;
  name: string;
  description: string;
  icon: string;
  bgColor: string;
}

const paymentOptions: PaymentOption[] = [
  {
    value: 'transfer',
    name: 'Transfer Bank',
    description: 'BCA, Mandiri, BNI, BRI',
    icon: '💳',
    bgColor: 'bg-blue-100',
  },
  {
    value: 'ewallet',
    name: 'E-Wallet',
    description: 'OVO, GoPay, DANA, ShopeePay',
    icon: '📱',
    bgColor: 'bg-green-100',
  },
  {
    value: 'credit',
    name: 'Kartu Kredit',
    description: 'Visa, Mastercard, JCB',
    icon: '💎',
    bgColor: 'bg-purple-100',
  },
  {
    value: 'cod',
    name: 'Bayar di Tempat (COD)',
    description: 'Bayar saat barang diterima',
    icon: '💰',
    bgColor: 'bg-orange-100',
  },
];

export function PaymentMethodForm({
  paymentMethod,
  onPaymentMethodChange,
}: PaymentMethodProps) {
  const getSelectedPaymentDisplay = () => {
    const selectedOption = paymentOptions.find(
      (opt) => opt.value === paymentMethod,
    );
    if (!selectedOption) return null;

    return <span className="font-medium">{selectedOption.name}</span>;
  };

  return (
    <Card>
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2 text-lg">
          <CreditCard className="h-5 w-5 text-pink-600" />
          Metode Pembayaran
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label className="text-sm font-medium text-gray-700">
            Pilih Metode Pembayaran *
          </Label>
          <Select value={paymentMethod} onValueChange={onPaymentMethodChange}>
            <SelectTrigger className="h-12">
              <SelectValue placeholder="Pilih metode pembayaran">
                {paymentMethod && getSelectedPaymentDisplay()}
              </SelectValue>
            </SelectTrigger>
            <SelectContent>
              {paymentOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  <div className="flex items-center gap-3 py-2">
                    <div
                      className={`w-10 h-10 ${option.bgColor} rounded-lg flex items-center justify-center`}
                    >
                      <span className="text-lg">{option.icon}</span>
                    </div>
                    <div>
                      <div className="font-medium text-gray-900">
                        {option.name}
                      </div>
                      <div className="text-sm text-gray-500">
                        {option.description}
                      </div>
                    </div>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <div className="flex items-start gap-2">
            <span className="text-blue-600 text-lg">ℹ️</span>
            <div>
              <p className="text-blue-800 font-medium text-sm">
                Informasi Pembayaran
              </p>
              <ul className="text-blue-700 text-xs mt-1 space-y-1">
                <li>• Transfer bank: Verifikasi otomatis dalam 1-10 menit</li>
                <li>• E-wallet: Pembayaran real-time</li>
                <li>• Kartu kredit: Proses instan dan aman</li>
                <li>
                  • COD: Tersedia untuk area tertentu (biaya admin +IDR 5,000)
                </li>
              </ul>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
