'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Search, Heart, User, Menu, X, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import { Logo } from './logo';
import { CartDropdown } from './cart-dropdown';
import { useAuth } from '@/lib/auth-context';
import { useWishlist } from '@/lib/wishlist-context';
import { toast } from 'sonner';
import { useState } from 'react';

const mainCategories = [
  { name: 'Pembersih', href: '/category/cleansing' },
  { name: 'Pelembab', href: '/category/moisturizers' },
  { name: 'Serum', href: '/category/serums' },
  { name: 'Tabir Surya', href: '/category/sunscreen' },
  { name: 'Masker', href: '/category/masks' },
  { name: 'Alat Kecantikan', href: '/category/tools' },
];

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const { user, signOut, isAuthenticated } = useAuth();
  const { getWishlistCount } = useWishlist();

  const handleSignOut = () => {
    signOut();
    toast.success('Berhasil keluar');
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      {/* Top Bar */}
      <div className="border-b border-gray-100">
        <div className="container mx-auto px-4">
          <div className="flex h-10 items-center justify-between text-sm">
            {' '}
            <div className="hidden md:flex items-center gap-4">
              <span className="text-gray-600">
                Gratis ongkir untuk pembelian di atas IDR 500,000
              </span>
            </div>
            <div className="flex items-center gap-4">
              <Link
                href="/customer-service"
                className="text-gray-600 hover:text-black"
              >
                Layanan Pelanggan
              </Link>
              <Link
                href="/track-order"
                className="text-gray-600 hover:text-black"
              >
                Lacak Pesanan
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden mr-2"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
            <Link href="/" className="flex items-center">
              <Logo />
            </Link>
          </div>

          {/* Search Bar */}
          <div className="flex-1 max-w-xl mx-8 hidden md:block">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                type="search"
                placeholder="Cari produk, brand..."
                className="pl-10 pr-4 py-2 w-full"
              />
            </div>
          </div>

          {/* User Actions */}
          <div className="flex items-center gap-2">
            {/* Mobile Search */}
            <Button variant="ghost" size="sm" className="md:hidden">
              <Search className="h-5 w-5" />
            </Button>

            {/* Wishlist */}
            <Button variant="ghost" size="sm" className="relative" asChild>
              <Link href="/wishlist">
                <Heart className="h-5 w-5" />
                {getWishlistCount() > 0 && (
                  <Badge className="absolute -top-1 -right-1 h-4 w-4 p-0 text-xs">
                    {getWishlistCount()}
                  </Badge>
                )}
              </Link>
            </Button>

            {/* Cart */}
            <CartDropdown />

            {/* User Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="flex items-center gap-2"
                >
                  <User className="h-5 w-5" />
                  {isAuthenticated && user && (
                    <span className="hidden md:inline-block text-sm max-w-20 truncate">
                      {user.name}
                    </span>
                  )}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                {isAuthenticated ? (
                  <>
                    <div className="px-2 py-2 text-sm">
                      <p className="font-medium">{user?.name}</p>
                      <p className="text-gray-500 text-xs">{user?.email}</p>
                    </div>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link href="/profile">Profil Saya</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/orders">Pesanan Saya</Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      onClick={handleSignOut}
                      className="text-red-600"
                    >
                      <LogOut className="h-4 w-4 mr-2" />
                      Keluar
                    </DropdownMenuItem>
                  </>
                ) : (
                  <>
                    <DropdownMenuItem asChild>
                      <Link href="/auth/sign-in">Masuk</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/auth/sign-up">Daftar</Link>
                    </DropdownMenuItem>
                  </>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>

      {/* Navigation Categories */}
      <div className="border-b border-gray-100 hidden md:block">
        <div className="container mx-auto px-4">
          <nav className="flex h-12 items-center space-x-8">
            <Link
              href="/categories"
              className={`text-sm font-medium transition-colors ${
                pathname === '/categories'
                  ? 'text-pink-600 border-b-2 border-pink-600'
                  : 'text-pink-600 hover:text-pink-700'
              }`}
            >
              Semua Kategori
            </Link>
            <Link
              href="/products"
              className={`text-sm font-medium transition-colors ${
                pathname === '/products'
                  ? 'text-black border-b-2 border-black'
                  : 'text-gray-700 hover:text-black'
              }`}
            >
              Semua Produk
            </Link>
            {mainCategories.map((category) => (
              <Link
                key={category.name}
                href={category.href}
                className={`text-sm font-medium transition-colors ${
                  pathname === category.href
                    ? 'text-black border-b-2 border-black'
                    : 'text-gray-700 hover:text-black'
                }`}
              >
                {category.name}
              </Link>
            ))}
          </nav>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-b border-gray-100 bg-white">
          <div className="container mx-auto px-4 py-4">
            {/* Mobile Search */}
            <div className="mb-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  type="search"
                  placeholder="Cari produk, brand..."
                  className="pl-10 pr-4 py-2 w-full"
                />
              </div>
            </div>

            {/* Mobile Categories */}
            <nav className="space-y-2">
              <Link
                href="/categories"
                className={`block py-2 text-sm font-medium transition-colors ${
                  pathname === '/categories'
                    ? 'text-pink-600 bg-pink-50 px-2 rounded'
                    : 'text-pink-600 hover:text-pink-700'
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Semua Kategori
              </Link>
              <Link
                href="/products"
                className={`block py-2 text-sm font-medium transition-colors ${
                  pathname === '/products'
                    ? 'text-black bg-gray-50 px-2 rounded'
                    : 'text-gray-700 hover:text-black'
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Semua Produk
              </Link>
              {mainCategories.map((category) => (
                <Link
                  key={category.name}
                  href={category.href}
                  className={`block py-2 text-sm font-medium transition-colors ${
                    pathname === category.href
                      ? 'text-black bg-gray-50 px-2 rounded'
                      : 'text-gray-700 hover:text-black'
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {category.name}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}
