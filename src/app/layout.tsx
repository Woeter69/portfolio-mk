import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Prof. Mahima Kaushik | Professor at CIC, University of Delhi",
  description: "Official academic portfolio of Prof. Mahima Kaushik. Specialist in Nano-biotechnology, DNA G-quadruplex structures, and Biophysical Chemistry at Cluster Innovation Centre, University of Delhi.",
  keywords: ["Mahima Kaushik", "University of Delhi", "CIC DU", "Nano-biotechnology", "DNA G-quadruplex", "Biophysical Chemistry", "Professor", "Research"],
  authors: [{ name: "Prof. Mahima Kaushik" }],
  openGraph: {
    title: "Prof. Mahima Kaushik | Academic Portfolio",
    description: "Research, Teaching, and Administrative Leadership at University of Delhi.",
    url: "https://mahimakaushik.com",
    siteName: "Prof. Mahima Kaushik Portfolio",
    images: [
      {
        url: "/photo.jpg",
        width: 800,
        height: 800,
        alt: "Prof. Mahima Kaushik",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Prof. Mahima Kaushik | Academic Portfolio",
    description: "Professor at Cluster Innovation Centre, University of Delhi.",
    images: ["/photo.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}
