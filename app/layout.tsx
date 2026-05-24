import type { Metadata } from "next";
import { Bebas_Neue, Space_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { SmoothScroll } from "@/components/smooth-scroll";
import { CustomCursor } from "@/components/custom-cursor";

const bebasNeue = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-bebas-neue",
});

const spaceMono = Space_Mono({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-space-mono",
});

export const metadata: Metadata = {
  title: "Ahmad Ilyas | Software Engineer & UI/UX",
  description: "Portfolio of Ahmad Ilyas, a Software Engineering student specializing in Next.js, React, and Neobrutalism UI/UX design.",
  keywords: ["Ahmad Ilyas", "Software Engineer", "Frontend Developer", "Next.js", "React", "Portfolio", "Neobrutalism", "Indonesia"],
  openGraph: {
    title: "Ahmad Ilyas | Software Engineer",
    description: "Crafting digital experiences that feel alive, intentional, and intuitive.",
    url: "https://ahmadilyas-portfolio.vercel.app",
    siteName: "Ahmad Ilyas Portfolio",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Ahmad Ilyas Portfolio Preview",
      },
    ],
    locale: "en_ID",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ahmad Ilyas | Software Engineer",
    description: "Crafting digital experiences that feel alive, intentional, and intuitive.",
    images: ["/og-image.jpg"],
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
        className={`${bebasNeue.variable} ${spaceMono.variable} font-mono antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          <SmoothScroll>
            <CustomCursor />
            {children}
          </SmoothScroll>
        </ThemeProvider>
      </body>
    </html>
  );
}
