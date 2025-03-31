import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Toaster } from '@/components/ui/toaster';
import Navbar from '@/components/layout/navbar';
import { QueryProvider } from '@/components/providers';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'GoOut - Social Events Platform',
  description: 'Find and join social events near you',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
          integrity="sha256-o9N1j7kQ+2bK0UoEKdDk5M+crYVW57k49S4LMw6r9Hc="
          crossOrigin=""
        />
      </head>
      <body className={inter.className}>
        <QueryProvider>
          <Navbar />
          {children}
          <Toaster />
        </QueryProvider>
      </body>
    </html>
  );
}
