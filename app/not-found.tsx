import Link from 'next/link';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Search, Home, Sparkles } from 'lucide-react';

export default function NotFound() {
  const popularCategories = [
    { name: 'Pembersih', href: '/category/cleansing' },
    { name: 'Serum', href: '/category/serums' },
    { name: 'Pelembab', href: '/category/moisturizers' },
    { name: 'Tabir Surya', href: '/category/sunscreen' },
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto text-center">
          {/* Error Illustration */}
          <div className="mb-12">
            <div className="flex items-center justify-center gap-2">
              <span className="text-8xl md:text-9xl font-bold text-pink-600 select-none">
                4
              </span>
              <div className="w-20 h-20 md:w-24 md:h-24 bg-gradient-to-br from-pink-400 to-purple-500 rounded-full flex items-center justify-center">
                <Sparkles className="w-10 h-10 md:w-12 md:h-12 text-white" />
              </div>
              <span className="text-8xl md:text-9xl font-bold text-pink-600 select-none">
                4
              </span>
            </div>
          </div>

          {/* Main Message */}
          <div className="mb-12">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Oops! Halaman Tidak Ditemukan
            </h1>
            <p className="text-lg text-gray-600 mb-6 max-w-2xl mx-auto">
              Halaman yang Anda cari mungkin telah dipindahkan, dihapus, atau
              tidak pernah ada. Jangan khawatir, mari kita bantu Anda menemukan
              produk skincare yang tepat!
            </p>

            {/* Quick Actions */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Button
                asChild
                size="lg"
                className="bg-pink-600 hover:bg-pink-700"
              >
                <Link href="/">
                  <Home className="w-4 h-4 mr-2" />
                  Kembali ke Beranda
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/products">
                  <Search className="w-4 h-4 mr-2" />
                  Jelajahi Produk
                </Link>
              </Button>
            </div>
          </div>

          {/* Popular Categories */}
          <div className="mb-12">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">
              Kategori Populer
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {popularCategories.map((category) => (
                <Card
                  key={category.name}
                  className="hover:shadow-md transition-shadow duration-200"
                >
                  <CardContent className="p-4 text-center">
                    <Link
                      href={category.href}
                      className="text-gray-700 hover:text-pink-600 transition-colors"
                    >
                      <div className="font-medium">{category.name}</div>
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Help Section */}
          <div className="bg-gray-50 rounded-lg p-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Butuh Bantuan?
            </h3>
            <p className="text-gray-600 mb-6">
              Tim customer service kami siap membantu Anda menemukan produk yang
              tepat
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild variant="outline">
                <Link href="/contact">Hubungi Kami</Link>
              </Button>
              <Button asChild variant="outline">
                <Link href="/faq">FAQ</Link>
              </Button>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
