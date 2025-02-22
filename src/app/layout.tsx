import type { Metadata } from "next";
import "./globals.css";
import { geistSans } from "@/config/fonts";
import { Providers } from "@/components";

export const metadata: Metadata = {
  title: {
    template: "%s - Shadow | shop",
    default: "Home - Shadow | shop",
  },
  description: "Tienda virtual de productos",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Providers>
      <html lang="en">
        <body className={`${geistSans.variable}  `}>{children}</body>
      </html>
    </Providers>
  );
}
