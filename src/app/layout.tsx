import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Toast from "./components/Toast";
import "./globals.css"; // Keep a minimal global css file
import StyledComponentsRegistry from "./registry";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Tournament Builder",
  description: "Build and run a tournament bracket seamlessly.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <StyledComponentsRegistry>
          {children}
        </StyledComponentsRegistry>
          <Toast />
      </body>
    </html>
  );
}