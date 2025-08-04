"use client";

import type { Metadata } from "next";
import localFont from "next/font/local";
import { ThemeProvider } from "styled-components";
import "./globals.css"; // Keep a minimal global css file
import { theme } from "./globalStyles";
import StyledComponentsRegistry from "./registry";

export const metadata: Metadata = {
  title: "Tournament Builder",
  description: "Build and run a tournament bracket seamlessly.",
};

const myFont = localFont({
  src: "./fonts/LibertinusSerif-Regular.woff",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={myFont.className}>
        <ThemeProvider theme={theme.dark}>
          <StyledComponentsRegistry>{children}</StyledComponentsRegistry>
        </ThemeProvider>
      </body>
    </html>
  );
}
