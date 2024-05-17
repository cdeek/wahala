import React from 'react';
import type { Metadata } from "next";
import { Inter } from "next/font/google";
//import { ApolloClient, InMemoryCache } from '@apollo/client';
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Diksa",
  description: "Under development",
};

// const client = new ApolloClient({
//   uri: '/api/graphql',
//   cache: new InMemoryCache(),
// });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        
      </head>
      <body className={inter.className}>
          {children}
      </body>
    </html>
  );
}
