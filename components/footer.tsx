import Link from 'next/link';
import { Logo } from './logo';
import {
  Facebook,
  Instagram,
  Twitter,
  Youtube,
  Mail,
  Phone,
  MapPin,
} from 'lucide-react';

const footerLinks = {
  company: {
    title: 'Perusahaan',
    links: [
      { name: 'Tentang Kami', href: '/about' },
      { name: 'Karir', href: '/careers' },
      { name: 'Pers', href: '/press' },
      { name: 'Blog', href: '/blog' },
    ],
  },
  customer: {
    title: 'Layanan Pelanggan',
    links: [
      { name: 'Hubungi Kami', href: '/contact' },
      { name: 'FAQ', href: '/faq' },
      { name: 'Info Pengiriman', href: '/shipping' },
      { name: 'Pengembalian', href: '/returns' },
      { name: 'Panduan Ukuran', href: '/size-guide' },
    ],
  },
  account: {
    title: 'Akun Saya',
    links: [
      { name: 'Masuk', href: '/auth/sign-in' },
      { name: 'Daftar', href: '/auth/sign-up' },
      { name: 'Riwayat Pesanan', href: '/orders' },
      { name: 'Wishlist', href: '/wishlist' },
      { name: 'Lacak Pesanan', href: '/track-order' },
    ],
  },
  connect: {
    title: 'Terhubung',
    links: [
      { name: 'Newsletter', href: '#newsletter' },
      { name: 'Tips Kecantikan', href: '/beauty-tips' },
      { name: 'Program Reward', href: '/rewards' },
      { name: 'Program Afiliasi', href: '/affiliate' },
    ],
  },
};

const socialLinks = [
  { icon: Facebook, href: 'https://facebook.com/yelis', label: 'Facebook' },
  { icon: Instagram, href: 'https://instagram.com/yelis', label: 'Instagram' },
  { icon: Twitter, href: 'https://twitter.com/yelis', label: 'Twitter' },
  { icon: Youtube, href: 'https://youtube.com/yelis', label: 'YouTube' },
];

export function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-200">
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <Logo className="mb-4" />
            <p className="text-gray-600 text-sm mb-4">
              Platform terpercaya untuk produk skincare premium. Temukan
              kecantikan dalam diri Anda.
            </p>

            {/* Contact Info */}
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2 text-gray-600">
                <Phone className="h-4 w-4" />
                <span>+62 21 123 4567</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <Mail className="h-4 w-4" />
                <span>hello@yelis.com</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <MapPin className="h-4 w-4" />
                <span>Nias Selatan, Indonesia</span>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex gap-3 mt-4">
              {socialLinks.map((social) => (
                <Link
                  key={social.label}
                  href={social.href}
                  className="text-gray-400 hover:text-pink-600 transition-colors"
                  aria-label={social.label}
                >
                  <social.icon className="h-5 w-5" />
                </Link>
              ))}
            </div>
          </div>

          {/* Footer Links */}
          {Object.entries(footerLinks).map(([key, section]) => (
            <div key={key}>
              <h4 className="font-semibold text-gray-900 mb-4">
                {section.title}
              </h4>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-gray-600 hover:text-gray-900 text-sm transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-200 bg-gray-100">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="text-sm text-gray-600">
              © 2025 Yelis Skin Care. All rights reserved.
            </div>
            <div className="flex gap-6 text-sm">
              <Link
                href="/privacy"
                className="text-gray-600 hover:text-gray-900"
              >
                Kebijakan Privasi
              </Link>
              <Link href="/terms" className="text-gray-600 hover:text-gray-900">
                Syarat & Ketentuan
              </Link>
              <Link
                href="/cookies"
                className="text-gray-600 hover:text-gray-900"
              >
                Kebijakan Cookie
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
