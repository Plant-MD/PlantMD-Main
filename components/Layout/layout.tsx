'use client';
export const dynamic = 'force-dynamic';

import React from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Leaf, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Header from './Header';
import { Roboto, Lato, Oswald } from "next/font/google";

interface LayoutProps {
  children: React.ReactNode;
}

const roboto = Roboto({
  subsets: ["latin"],
  weight: "300",
  variable: "--font-roboto",
});

const oswald = Oswald({
  subsets: ["latin"],
  weight: "700",
  variable: "--font-oswald",
});

const lato = Lato({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-lato',
})


const Layout: React.FC<LayoutProps> = ({ children }) => {
  const pathname = usePathname();
  const router = useRouter();
  const isHomePage = pathname === '/';
  const isCoreStep = ['/scan', '/processing', '/diagnosis'].includes(pathname);

  return (
    <div className={`min-h-screen bg-gradient-to-br from-cream via-white to-pale ${roboto.variable} ${lato.variable} ${oswald.variable}`}>
      <Header />
      <main className="pt-14 sm:pt-16">
        {children}
      </main>
    </div>
  );
};

export default Layout;