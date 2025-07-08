'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Breadcrumb } from '@/components/ui/breadcrumb';
import { useOrder } from '@/lib/order-context';
import { useAuth } from '@/lib/auth-context';
import { toast } from 'sonner';
import {
  Package,
  Clock,
  CheckCircle,
  Truck,
  ShoppingBag,
  Eye,
} from 'lucide-react';

export default function OrdersPage() {
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const { state, loadOrders } = useOrder();
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  // Auth protection
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      toast.error('Silakan masuk terlebih dahulu untuk melihat pesanan');
      router.push('/auth/sign-in');
    }
  }, [isAuthenticated, isLoading, router]);

  useEffect(() => {
    if (isAuthenticated) {
      loadOrders();
    }
  }, [loadOrders, isAuthenticated]);

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

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  };

  const getStatusConfig = (status: string) => {
    switch (status) {
      case 'pending':
        return {
          label: 'Menunggu Pembayaran',
          color: 'bg-yellow-100 text-yellow-800',
          icon: Clock,
        };
      case 'paid':
        return {
          label: 'Pembayaran Dikonfirmasi',
          color: 'bg-blue-100 text-blue-800',
          icon: CheckCircle,
        };
      case 'processing':
        return {
          label: 'Sedang Diproses',
          color: 'bg-purple-100 text-purple-800',
          icon: Package,
        };
      case 'shipped':
        return {
          label: 'Dalam Pengiriman',
          color: 'bg-orange-100 text-orange-800',
          icon: Truck,
        };
      case 'delivered':
        return {
          label: 'Pesanan Diterima',
          color: 'bg-green-100 text-green-800',
          icon: CheckCircle,
        };
      default:
        return {
          label: status,
          color: 'bg-gray-100 text-gray-800',
          icon: Package,
        };
    }
  };

  const filteredOrders =
    selectedStatus === 'all'
      ? state.orders
      : state.orders.filter((order) => order.status === selectedStatus);

  const statusFilters = [
    { value: 'all', label: 'Semua Pesanan' },
    { value: 'pending', label: 'Menunggu Pembayaran' },
    { value: 'paid', label: 'Dibayar' },
    { value: 'processing', label: 'Diproses' },
    { value: 'shipped', label: 'Dikirim' },
    { value: 'delivered', label: 'Selesai' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <Breadcrumb items={[{ label: 'Pesanan Saya' }]} className="mb-6" />

        {/* Status Filter */}
        <div className="flex flex-wrap gap-2 mb-6">
          {statusFilters.map((filter) => (
            <Button
              key={filter.value}
              variant={selectedStatus === filter.value ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedStatus(filter.value)}
              className={
                selectedStatus === filter.value
                  ? 'bg-pink-600 hover:bg-pink-700'
                  : ''
              }
            >
              {filter.label}
            </Button>
          ))}
        </div>

        {/* Orders List */}
        {filteredOrders.length === 0 ? (
          <Card className="text-center py-16">
            <CardContent>
              <ShoppingBag className="h-24 w-24 text-gray-300 mx-auto mb-6" />
              <h2 className="text-2xl font-semibold mb-4">Belum Ada Pesanan</h2>
              <p className="text-gray-600 mb-8">
                Anda belum memiliki pesanan. Yuk, mulai belanja sekarang!
              </p>
              <Button asChild size="lg">
                <Link href="/products">Mulai Belanja</Link>
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {filteredOrders.map((order) => {
              const statusConfig = getStatusConfig(order.status);
              const StatusIcon = statusConfig.icon;

              return (
                <Card
                  key={order.id}
                  className="hover:shadow-md transition-shadow"
                >
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div className="space-y-3">
                        <div className="flex items-center gap-3">
                          <h3 className="font-semibold text-lg">#{order.id}</h3>
                          <Badge className={statusConfig.color}>
                            <StatusIcon className="h-3 w-3 mr-1" />
                            {statusConfig.label}
                          </Badge>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                          <div>
                            <span className="text-gray-600">Tanggal Pesan</span>
                            <div className="font-medium">
                              {formatDate(order.createdAt)}
                            </div>
                          </div>
                          <div>
                            <span className="text-gray-600">Total</span>
                            <div className="font-bold text-pink-600">
                              {formatPrice(order.total)}
                            </div>
                          </div>
                          <div>
                            <span className="text-gray-600">Items</span>
                            <div className="font-medium">
                              {order.items.length} produk
                            </div>
                          </div>
                          <div>
                            <span className="text-gray-600">Pembayaran</span>
                            <div className="font-medium">
                              {order.paymentMethod}
                            </div>
                          </div>
                        </div>

                        {order.trackingNumber && (
                          <div className="text-sm">
                            <span className="text-gray-600">No. Resi: </span>
                            <span className="font-mono font-medium">
                              {order.trackingNumber}
                            </span>
                          </div>
                        )}
                      </div>

                      <div className="flex flex-col gap-2 md:items-end">
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4 mr-2" />
                          Detail Pesanan
                        </Button>

                        {order.status === 'pending' && (
                          <Button
                            size="sm"
                            className="bg-pink-600 hover:bg-pink-700"
                            asChild
                          >
                            <Link
                              href={`/payment?orderId=${order.id}&total=${order.total}&method=transfer`}
                            >
                              Bayar Sekarang
                            </Link>
                          </Button>
                        )}

                        {order.status === 'shipped' && order.trackingNumber && (
                          <Button variant="outline" size="sm">
                            <Truck className="h-4 w-4 mr-2" />
                            Lacak Paket
                          </Button>
                        )}

                        {order.status === 'delivered' && (
                          <Button variant="outline" size="sm">
                            Beli Lagi
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
