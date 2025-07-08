'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Breadcrumb } from '@/components/ui/breadcrumb';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { useCart } from '@/lib/cart-context';
import { useOrder } from '@/lib/order-context';
import { useAuth } from '@/lib/auth-context';
import { ShippingAddressForm } from './_components/shipping-address-form';
import { ShippingMethodForm } from './_components/shipping-method-form';
import { PaymentMethodForm } from './_components/payment-method-form';
import { OrderSummary } from './_components/order-summary';
import { calculateShippingCost } from './_components/shipping-utils';
import { toast } from 'sonner';

interface ShippingAddress {
  name: string;
  phone: string;
  address: string;
  city: string;
  province: string;
  postalCode: string;
}

export default function CheckoutPage() {
  const router = useRouter();
  const { state, getTotalItems, getTotalPrice, clearCart } = useCart();
  const { isAuthenticated, isLoading } = useAuth();
  const { createOrder } = useOrder();
  const [shippingAddress, setShippingAddress] = useState<ShippingAddress>({
    name: '',
    phone: '',
    address: '',
    city: '',
    province: '',
    postalCode: '',
  });
  const [shippingMethod, setShippingMethod] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');

  // Auth protection
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      toast.error('Silakan masuk terlebih dahulu untuk melanjutkan checkout');
      router.push('/auth/sign-in');
    }
  }, [isAuthenticated, isLoading, router]);

  // Show loading or redirect if not authenticated
  if (isLoading || !isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-pink-600 mx-auto mb-4"></div>
          <p>Memuat...</p>
        </div>
      </div>
    );
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const subtotal = getTotalPrice();
  const adminFee = 2500;

  const handleAddressChange = (field: keyof ShippingAddress, value: string) => {
    setShippingAddress((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const checkFormValidity = (): boolean => {
    return !!(
      shippingAddress.name &&
      shippingAddress.phone &&
      shippingAddress.address &&
      shippingAddress.city &&
      shippingAddress.province &&
      shippingAddress.postalCode &&
      shippingMethod &&
      paymentMethod
    );
  };

  const handleCheckout = () => {
    if (!checkFormValidity()) {
      alert('Mohon lengkapi semua data yang diperlukan');
      return;
    }

    // Calculate final total
    const shippingCost = calculateShippingCost(shippingMethod, subtotal);
    const codFee = paymentMethod === 'cod' ? 5000 : 0;
    const finalTotal = subtotal + shippingCost + adminFee + codFee;

    // Generate order ID
    const orderId = 'YLS' + Date.now();

    // Prepare order data
    const orderData = {
      orderId,
      total: finalTotal,
      subtotal,
      shippingCost,
      adminFee,
      codFee,
      paymentMethod,
      shippingMethod,
      shippingAddress,
      items: state.items.map((item) => ({
        id: item.id,
        name: item.product.name,
        brand: item.product.brand,
        price: item.product.price,
        quantity: item.quantity,
        image: item.product.images[0],
      })),
      bankAccount: {
        bank: 'Bank BCA',
        accountNumber: '1234567890',
        accountName: 'PT Yelis Marketplace',
      },
      status: 'pending' as const,
      createdAt: new Date().toISOString(),
    };

    // Create order using OrderContext
    createOrder(orderData);

    // Save order data to localStorage for payment page
    localStorage.setItem(`order_${orderId}`, JSON.stringify(orderData));

    // Clear cart after successful order
    clearCart();

    // Redirect to payment page with order details
    const paymentParams = new URLSearchParams({
      orderId,
      total: finalTotal.toString(),
      method: paymentMethod,
      shipping: shippingMethod,
    });

    router.push(`/payment?${paymentParams.toString()}`);
  };

  if (state.items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <Card className="text-center py-16">
            <CardContent>
              <h2 className="text-2xl font-semibold mb-4">
                Tidak Ada Item di Keranjang
              </h2>
              <p className="text-gray-600 mb-8">
                Silakan tambahkan produk ke keranjang terlebih dahulu.
              </p>
              <Button asChild size="lg">
                <Link href="/products">Mulai Belanja</Link>
              </Button>
            </CardContent>
          </Card>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <Breadcrumb
          className="mb-6"
          items={[{ label: 'Keranjang', href: '/cart' }, { label: 'Checkout' }]}
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Forms */}
          <div className="lg:col-span-2 space-y-6">
            <ShippingAddressForm
              shippingAddress={shippingAddress}
              onAddressChange={handleAddressChange}
            />

            <ShippingMethodForm
              shippingMethod={shippingMethod}
              onShippingMethodChange={setShippingMethod}
              subtotal={subtotal}
              formatPrice={formatPrice}
            />

            <PaymentMethodForm
              paymentMethod={paymentMethod}
              onPaymentMethodChange={setPaymentMethod}
            />
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <OrderSummary
              items={state.items}
              getTotalItems={getTotalItems}
              subtotal={subtotal}
              shippingMethod={shippingMethod}
              paymentMethod={paymentMethod}
              adminFee={adminFee}
              formatPrice={formatPrice}
              onCheckout={handleCheckout}
              isFormValid={checkFormValidity()}
            />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
