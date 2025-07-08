import Image from 'next/image';
import Link from 'next/link';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Card, CardContent } from '@/components/ui/card';
import { Breadcrumb } from '@/components/ui/breadcrumb';
import { getCategoriesArray } from '@/lib/mock-data';

export default function CategoriesPage() {
  const categories = getCategoriesArray();

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main>
        {/* Breadcrumb */}
        <div className="bg-gray-50 border-b">
          <div className="container mx-auto px-4 py-4">
            <Breadcrumb items={[{ label: 'Semua Kategori' }]} />
          </div>
        </div>

        {/* Categories Grid */}
        <section className="py-6">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {categories.map((category) => (
                <Link key={category.id} href={category.href} className="group">
                  <Card className="border-0 shadow-sm hover:shadow-lg transition-all duration-300 group-hover:-translate-y-1">
                    <CardContent className="p-0">
                      <div className="relative aspect-square overflow-hidden rounded-t-lg">
                        <Image
                          src={category.image}
                          alt={category.name}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors" />
                        <div className="absolute bottom-4 left-4 text-white">
                          <h3 className="text-xl font-semibold mb-1">
                            {category.name}
                          </h3>
                          <p className="text-sm opacity-90">
                            {category.description}
                          </p>
                        </div>
                      </div>
                      <div className="p-6">
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600">
                            {category.productCount} produk
                          </span>
                          <span className="text-pink-600 font-medium group-hover:text-pink-700">
                            Lihat Semua →
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-12 bg-pink-50">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-2xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                Tidak Yakin Pilih Kategori?
              </h2>
              <p className="text-gray-600 mb-6">
                Tim beauty consultant kami siap membantu Anda menemukan produk
                yang tepat sesuai jenis kulit dan kebutuhan perawatan Anda
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/consultation"
                  className="px-6 py-3 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition-colors"
                >
                  Konsultasi Gratis
                </Link>
                <Link
                  href="/skin-quiz"
                  className="px-6 py-3 border border-pink-600 text-pink-600 rounded-lg hover:bg-pink-50 transition-colors"
                >
                  Tes Jenis Kulit
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
