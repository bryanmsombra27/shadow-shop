import type { Metadata } from "next";
import "./globals.css";
import { geistSans } from "@/config/fonts";

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
    <html lang="en">
      <body className={`${geistSans.variable}  `}>{children}</body>
    </html>
  );
}
