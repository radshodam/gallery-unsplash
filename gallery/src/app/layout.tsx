import type { Metadata } from "next";
import { Exo } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";

const exo = Exo({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "NextJS 14 Image Gallery",
  description: "Tutorial project by Radshodam",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`bg-gray-900 ${exo.className}`}>
        <Header />
        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">{children}</div>
      </body>
    </html>
  );
}
