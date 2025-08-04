import type { Metadata } from "next";
import localFont from 'next/font/local';
import { ToastProvider } from "./components/ToastProvider";
import "./globals.css"; // Keep a minimal global css file
import StyledComponentsRegistry from "./registry";

export const metadata: Metadata = {
  title: "Tournament Builder",
  description: "Build and run a tournament bracket seamlessly.",
};

const myFont = localFont({
  src: './fonts/LibertinusSerif-Regular.woff',
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={myFont.className}>
        <StyledComponentsRegistry>
          <ToastProvider>{children}</ToastProvider>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}