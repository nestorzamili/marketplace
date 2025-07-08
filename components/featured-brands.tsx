'use client';

import Image from 'next/image';
import Link from 'next/link';
import { featuredBrands } from '@/lib/mock-data';

export function FeaturedBrands() {
  // Duplicate brands for seamless loop
  const allBrands = [...featuredBrands, ...featuredBrands];

  return (
    <section className="py-12 bg-white overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
            Brand Terpercaya
          </h2>
          <p className="text-gray-600">
            Produk berkualitas dari brand kecantikan terkemuka dunia
          </p>
        </div>

        {/* Scrolling Brand Cloud */}
        <div className="relative">
          <div className="flex space-x-8 animate-marquee hover:animation-pause">
            {allBrands.map((brand, index) => (
              <Link
                key={`${brand.id}-${index}`}
                href={brand.href}
                className="flex-shrink-0 group block bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md hover:border-gray-300 transition-all duration-200 min-w-[120px]"
              >
                <div className="flex flex-col items-center text-center">
                  <div className="relative w-full h-10 flex items-center justify-center">
                    <Image
                      src={brand.logo}
                      alt={`${brand.name} logo`}
                      width={100}
                      height={50}
                      className="object-contain group-hover:scale-105 transition-transform duration-200"
                    />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
