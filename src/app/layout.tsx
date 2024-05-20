import React from 'react';
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Providers } from './_providers'
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Diksa",
  description: "Under development",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        
      </head>
      <body className={inter.className}>
        <Providers>
          <main>
           {children}
          </main>
        </Providers>
      </body>
    </html>
  );
}
