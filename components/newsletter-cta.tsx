import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export function NewsletterCTA() {
  return (
    <section className="py-16 bg-gradient-to-r from-pink-50 to-purple-50">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
            Tetap Cantik dengan Newsletter Kami
          </h2>
          <p className="text-lg text-gray-600 mb-6">
            Dapatkan tips kecantikan terbaru, peluncuran produk, dan penawaran
            eksklusif langsung di inbox Anda
          </p>
          <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <Input
              type="email"
              placeholder="Masukkan email Anda"
              className="flex-1 h-12"
            />
            <Button
              size="lg"
              className="bg-pink-600 hover:bg-pink-700 h-12 px-8"
            >
              Berlangganan
            </Button>
          </div>
          <p className="text-sm text-gray-500 mt-4">
            Kami menghormati privasi Anda. Berhenti berlangganan kapan saja.
          </p>
        </div>
      </div>
    </section>
  );
}
