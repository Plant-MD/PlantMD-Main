"use client"

import React from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Leaf, ArrowLeft } from 'lucide-react';
import { Button } from './ui/button';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const pathname = usePathname();
  const router = useRouter();
  const isHomePage = pathname === '/';
  const isCoreStep = ['/scan', '/processing', '/diagnosis'].includes(pathname);

  return (
    <div className="min-h-screen bg-gradient-to-br from-cream via-white to-pale">
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-sage/20">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
          <div className="flex justify-between items-center h-14 sm:h-16">
            <Link href="/" className="flex items-center space-x-2 sm:space-x-3 group">
              <div className="relative">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-forest to-mint rounded-lg sm:rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Leaf className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
                </div>
                <div className="absolute inset-0 bg-gradient-to-br from-forest to-mint rounded-lg sm:rounded-xl opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
              </div>
              <div className="hidden sm:block">
                <h1 className="text-lg sm:text-xl font-bold bg-gradient-to-r from-primary-dark to-forest bg-clip-text text-transparent">
                  PlantMD
                </h1>
                <p className="text-xs text-sage -mt-1">Disease Detection</p>
              </div>
            </Link>
            
            <div className="flex items-center space-x-4">
              {!isCoreStep && (
                <div className="hidden md:flex items-center space-x-6 lg:space-x-8">
                  <Link href="#about" passHref>
                    <Button variant="link" className="text-gray-600 hover:text-gray-900 transition-colors">
                      About Us
                    </Button>
                  </Link>
                  <Link href="#tutorial" passHref>
                    <Button variant="link" className="text-gray-600 hover:text-gray-900 transition-colors">
                      Tutorial
                    </Button>
                  </Link>
                  <Link href="#contact" passHref>
                    <Button variant="link" className="text-gray-600 hover:text-gray-900 transition-colors">
                      Contact
                    </Button>
                  </Link>
                  <Link href="/scan" passHref>
                    <Button className="bg-plant-dark hover:bg-gray-800 text-white px-4 lg:px-6">
                      Dashboard
                    </Button>
                  </Link>
                </div>
              )}

              {!isHomePage && (
                <button
                  onClick={() => router.back()}
                  className="flex items-center space-x-1 sm:space-x-2 px-3 sm:px-4 py-2 bg-white/60 backdrop-blur-sm text-primary-dark rounded-lg hover:bg-white/80 transition-all duration-200 border border-sage/20 touch-manipulation"
                >
                  <ArrowLeft className="h-4 w-4" />
                  <span className="hidden sm:inline text-sm font-medium">Back</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </nav>
      
      <main className="pt-14 sm:pt-16">
        {children}
      </main>
    </div>
  );
};

export default Layout;