"use client";

import React from "react";
import { ApolloClient, InMemoryCache } from "@apollo/client";

import { AuthProvider } from '../_providers/Auth'
//import { CartProvider } from '../_providers/Cart'
import { ThemeProvider } from "./Theme";

const client = new ApolloClient({
  uri: "/api/graphql",
  cache: new InMemoryCache(),
});

export const Providers: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
    <AuthProvider>
      {children}
    </AuthProvider>
    </ThemeProvider>
  );
};
