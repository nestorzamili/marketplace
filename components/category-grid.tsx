import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { getCategoriesArray } from '@/lib/mock-data';

export function CategoryGrid() {
  const categories = getCategoriesArray();

  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
            Belanja Berdasarkan Kategori
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Temukan pilihan produk skincare yang dipilih khusus untuk membantu
            Anda mencapai tujuan kecantikan
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6">
          {categories.map((category) => (
            <Link key={category.id} href={category.href} className="group">
              <div className="relative h-40 md:h-48 lg:h-52 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 group-hover:-translate-y-1">
                <Image
                  src={category.image}
                  alt={category.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

                {/* Content overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-3 text-white">
                  <h3 className="font-semibold text-sm mb-1">
                    {category.name}
                  </h3>
                  <p className="text-xs opacity-90 mb-1 line-clamp-2">
                    {category.description}
                  </p>
                  <div className="text-xs opacity-75">
                    {category.productCount} produk
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center mt-8">
          <Button asChild variant="outline" size="lg">
            <Link href="/categories">Lihat Semua Kategori</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
