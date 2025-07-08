'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Clock } from 'lucide-react';

interface PaymentTimerProps {
  initialTime?: number; // in seconds
  onTimeExpired?: () => void;
}

export function PaymentTimer({
  initialTime = 24 * 60 * 60,
  onTimeExpired,
}: PaymentTimerProps) {
  const [timeLeft, setTimeLeft] = useState(initialTime);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          onTimeExpired?.();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [onTimeExpired]);

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes
      .toString()
      .padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <Card className="border-orange-200 bg-orange-50">
      <CardContent className="p-6">
        <div className="flex items-center gap-3 mb-3">
          <Clock className="h-5 w-5 text-orange-600" />
          <h3 className="font-semibold text-orange-800">
            Selesaikan Pembayaran Dalam
          </h3>
        </div>
        <div className="text-3xl font-bold text-orange-600 mb-2">
          {formatTime(timeLeft)}
        </div>
        <p className="text-sm text-orange-700">
          Pesanan akan otomatis dibatalkan jika pembayaran tidak selesai dalam
          waktu yang ditentukan
        </p>
      </CardContent>
    </Card>
  );
}
