import { Geist, Montserrat_Alternates } from "next/font/google";
export const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const titleFont = Montserrat_Alternates({
  subsets: ["latin"],
  weight: ["500", "700"],
});
