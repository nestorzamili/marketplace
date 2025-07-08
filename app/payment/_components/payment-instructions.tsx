'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Copy, Check, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';

interface BankAccount {
  bank: string;
  accountNumber: string;
  accountName: string;
}

interface PaymentInstructionsProps {
  orderId: string;
  total: number;
  paymentMethod: string;
  bankAccount?: BankAccount;
}

export function PaymentInstructions({
  orderId,
  total,
  paymentMethod,
  bankAccount,
}: PaymentInstructionsProps) {
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const copyToClipboard = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    toast.success('Disalin ke clipboard!', {
      description: `${
        field === 'orderId'
          ? 'ID Pesanan'
          : field === 'accountNumber'
          ? 'Nomor Rekening'
          : 'Teks'
      } berhasil disalin`,
      duration: 2000,
    });
    setTimeout(() => setCopiedField(null), 2000);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Detail Pembayaran</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <Label className="text-gray-600">ID Pesanan</Label>
            <div className="flex items-center gap-2 mt-1">
              <span className="font-mono font-medium">{orderId}</span>
              <Button
                variant="ghost"
                size="sm"
                className="h-6 w-6 p-0"
                onClick={() => copyToClipboard(orderId, 'orderId')}
              >
                {copiedField === 'orderId' ? (
                  <Check className="h-3 w-3 text-green-600" />
                ) : (
                  <Copy className="h-3 w-3" />
                )}
              </Button>
            </div>
          </div>
          <div>
            <Label className="text-gray-600">Total Pembayaran</Label>
            <div className="font-bold text-lg text-pink-600 mt-1">
              {formatPrice(total)}
            </div>
          </div>
        </div>

        <Separator />

        {paymentMethod === 'transfer' && bankAccount && (
          <div className="space-y-4">
            <h4 className="font-medium">Transfer ke Rekening</h4>
            <div className="bg-blue-50 p-4 rounded-lg space-y-3">
              <div>
                <Label className="text-gray-600">Bank</Label>
                <div className="font-medium">{bankAccount.bank}</div>
              </div>
              <div>
                <Label className="text-gray-600">Nomor Rekening</Label>
                <div className="flex items-center gap-2">
                  <span className="font-mono font-medium text-lg">
                    {bankAccount.accountNumber}
                  </span>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-6 w-6 p-0"
                    onClick={() =>
                      copyToClipboard(
                        bankAccount.accountNumber,
                        'accountNumber',
                      )
                    }
                  >
                    {copiedField === 'accountNumber' ? (
                      <Check className="h-3 w-3 text-green-600" />
                    ) : (
                      <Copy className="h-3 w-3" />
                    )}
                  </Button>
                </div>
              </div>
              <div>
                <Label className="text-gray-600">Atas Nama</Label>
                <div className="font-medium">{bankAccount.accountName}</div>
              </div>
            </div>
          </div>
        )}

        <div className="bg-yellow-50 p-4 rounded-lg">
          <div className="flex items-start gap-2">
            <AlertCircle className="h-4 w-4 text-yellow-600 mt-0.5" />
            <div className="text-sm">
              <p className="font-medium text-yellow-800 mb-1">Penting!</p>
              <ul className="text-yellow-700 space-y-1">
                <li>• Transfer sesuai dengan jumlah total yang tertera</li>
                <li>• Sertakan ID pesanan sebagai berita transfer</li>
                <li>• Upload bukti transfer setelah pembayaran</li>
                <li>• Pembayaran akan diverifikasi dalam 1-10 menit</li>
              </ul>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
