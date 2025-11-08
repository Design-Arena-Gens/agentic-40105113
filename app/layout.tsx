import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'DocumentManagement | Pharma DMS',
  description: '21 CFR Part 11 compliant pharmaceutical document management system',
  icons: {
    icon: '/favicon.svg'
  }
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} min-h-screen bg-slate-50`}>{children}</body>
    </html>
  );
}
