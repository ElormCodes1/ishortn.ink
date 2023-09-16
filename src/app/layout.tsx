import "@/styles/globals.css";
import type { Metadata } from "next";
import { Nunito_Sans } from "next/font/google";

import { Toaster } from "react-hot-toast";

const nunito = Nunito_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "iShortn",
  description: `Power up your links with our AI-driven analytics, advanced URL
  shortening, and dynamic QR code creation and boost engagement
  results like never before. Unleash the power of your links today!`,
  authors: [
    {
      name: "Kelvin Amoaba",
      url: "https://www.kelvinamoaba.live",
    },
  ],
  applicationName: "iShortn",
  creator: "Kelvin Amoaba",
  robots: "index, follow",
  category: "Technology",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={nunito.className}>
        <Toaster />
        {children}
      </body>
    </html>
  );
}
