'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Breadcrumb } from '@/components/ui/breadcrumb';
import { useOrder } from '@/lib/order-context';
import { toast } from 'sonner';
import {
  PaymentTimer,
  PaymentInstructions,
  PaymentUpload,
  PaymentSummary,
} from './_components';

interface PaymentData {
  orderId: string;
  total: number;
  subtotal: number;
  shippingCost: number;
  adminFee: number;
  codFee: number;
  paymentMethod: string;
  shippingMethod: string;
  items: Array<{
    id: string;
    name: string;
    brand: string;
    price: number;
    quantity: number;
    image: string;
  }>;
  bankAccount?: {
    bank: string;
    accountNumber: string;
    accountName: string;
  };
}

function PaymentContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { addPaymentProof } = useOrder();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [paymentData, setPaymentData] = useState<PaymentData | null>(null);

  useEffect(() => {
    // Get order data from localStorage or searchParams
    const orderId = searchParams.get('orderId');
    const total = parseInt(searchParams.get('total') || '0');
    const paymentMethod = searchParams.get('method') || 'transfer';
    const shippingMethod = searchParams.get('shipping') || 'regular';

    // Get order details from localStorage (set during checkout)
    const orderData = localStorage.getItem(`order_${orderId}`);

    if (orderData) {
      const parsedOrder = JSON.parse(orderData);
      setPaymentData(parsedOrder);
    } else {
      // Fallback - create basic payment data from URL params
      const basicPaymentData: PaymentData = {
        orderId: orderId || 'YLS' + Date.now(),
        total,
        subtotal: total - 25000 - 3000, // Estimate
        shippingCost: 25000,
        adminFee: 3000,
        codFee: paymentMethod === 'cod' ? 5000 : 0,
        paymentMethod,
        shippingMethod,
        items: [], // Empty array as fallback
        bankAccount: {
          bank: 'Bank BCA',
          accountNumber: '1234567890',
          accountName: 'PT Yelis Marketplace',
        },
      };
      setPaymentData(basicPaymentData);
    }
  }, [searchParams]);

  // Show loading if payment data not loaded yet
  if (!paymentData) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-pink-600 mx-auto mb-4"></div>
            <p>Memuat data pembayaran...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const handlePaymentSubmit = async (file: File) => {
    setIsSubmitting(true);

    try {
      // Simulate API call to upload payment proof
      const formData = new FormData();
      formData.append('file', file);
      formData.append('orderId', paymentData.orderId);

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const result = await response.json();

        // Update order status in OrderContext
        addPaymentProof(paymentData.orderId, result.url);

        toast.success('Bukti pembayaran berhasil dikirim!', {
          description:
            'Pesanan Anda akan segera diproses. Tim kami akan memverifikasi pembayaran dalam 1-10 menit.',
          duration: 6000,
        });

        // Redirect to orders page after 3 seconds
        setTimeout(() => {
          router.push('/orders');
        }, 3000);
      } else {
        throw new Error('Upload failed');
      }
    } catch (error) {
      console.error('Payment upload error:', error);
      toast.error('Gagal mengirim bukti pembayaran', {
        description: 'Silakan coba lagi atau hubungi customer service.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleTimeExpired = () => {
    toast.error('Waktu pembayaran telah habis', {
      description: 'Pesanan akan dibatalkan otomatis',
    });
    // Could redirect to cancelled order page or home
    setTimeout(() => {
      router.push('/orders');
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <Breadcrumb
          items={[
            { label: 'Checkout', href: '/checkout' },
            { label: 'Pembayaran' },
          ]}
          className="mb-6"
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Payment Instructions */}
          <div className="lg:col-span-2 space-y-6">
            {/* Timer */}
            <PaymentTimer onTimeExpired={handleTimeExpired} />

            {/* Payment Details */}
            <PaymentInstructions
              orderId={paymentData.orderId}
              total={paymentData.total}
              paymentMethod={paymentData.paymentMethod}
              bankAccount={paymentData.bankAccount}
            />

            {/* Upload Proof */}
            <PaymentUpload
              onSubmit={handlePaymentSubmit}
              isSubmitting={isSubmitting}
            />
          </div>

          {/* Order Summary Sidebar */}
          <div>
            <PaymentSummary
              items={paymentData.items}
              subtotal={paymentData.subtotal}
              shippingCost={paymentData.shippingCost}
              adminFee={paymentData.adminFee}
              codFee={paymentData.codFee}
              total={paymentData.total}
            />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default function PaymentPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-gray-50">
          <Header />
          <main className="container mx-auto px-4 py-8">
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-pink-600 mx-auto mb-4"></div>
              <p>Memuat halaman pembayaran...</p>
            </div>
          </main>
          <Footer />
        </div>
      }
    >
      <PaymentContent />
    </Suspense>
  );
}
