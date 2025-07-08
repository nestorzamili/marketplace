import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { CartProvider } from '@/lib/cart-context';
import { OrderProvider } from '@/lib/order-context';
import { AuthProvider } from '@/lib/auth-context';
import { WishlistProvider } from '@/lib/wishlist-context';
import { TooltipProvider } from '@/components/ui/tooltip';
import NextTopLoader from 'nextjs-toploader';
import { Toaster } from 'sonner';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Yelis Skin Care',
  description: 'Belanja skincare online dengan mudah dan cepat',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <TooltipProvider>
          <AuthProvider>
            <WishlistProvider>
              <CartProvider>
                <OrderProvider>
                  <NextTopLoader showSpinner={false} />
                  {children}
                  <Toaster position="bottom-right" richColors />
                </OrderProvider>
              </CartProvider>
            </WishlistProvider>
          </AuthProvider>
        </TooltipProvider>
      </body>
    </html>
  );
}
