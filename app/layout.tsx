import type { Metadata } from "next";
import { Cairo } from "next/font/google";
import "./globals.css";

const cairo = Cairo({
  subsets: ["arabic", "latin"],
  variable: "--font-cairo",
  weight: ["400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "ثائر العبسي | أخصائي تسويق رقمي — Thaer Alabsi | Digital Marketing",
  description:
    "السيرة الذاتية لثائر العبسي، أخصائي تسويق رقمي: خبرات، مهارات، خدمات، ومقالات في التسويق الرقمي. Digital marketing specialist portfolio and CV.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl" className="scroll-smooth">
      <body className={`${cairo.variable} font-sans antialiased`}>{children}</body>
    </html>
  );
}
