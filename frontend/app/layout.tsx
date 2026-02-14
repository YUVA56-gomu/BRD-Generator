import type { Metadata } from 'next';
import { Toaster } from 'react-hot-toast';
import Script from 'next/script';
import './globals.css';

export const metadata: Metadata = {
  title: 'BRD Generator - AI-Powered Requirements',
  description: 'Generate Business Requirements Documents with AI',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <Script
          src="https://accounts.google.com/gsi/client"
          strategy="afterInteractive"
        />
      </head>
      <body>
        {children}
        <Toaster position="top-right" />
      </body>
    </html>
  );
}
