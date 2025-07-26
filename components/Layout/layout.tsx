'use client';

import React from 'react';
import { SessionProvider } from 'next-auth/react';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <SessionProvider>
      <div className="bg-gradient-to-br from-green-50 via-white to-emerald-50 min-h-screen">
        <main>
          {children}
        </main>
      </div>
    </SessionProvider>
  );
};

export default Layout;