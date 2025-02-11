import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { Kantumruy_Pro } from "next/font/google";

const kantumruyPro = Kantumruy_Pro({
  weight: ["100", "200", "300", "400", "500", "600", "700"],
  subsets: ["khmer"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${kantumruyPro.className} antialiased`}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
