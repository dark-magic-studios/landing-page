import type { Metadata } from "next";
import { Cinzel, Cormorant_Garamond, Manrope, JetBrains_Mono } from "next/font/google";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import "./globals.css";

const cinzel = Cinzel({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-cinzel-var",
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500"],
  style: ["normal", "italic"],
  variable: "--font-cormorant-var",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-manrope-var",
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-jetbrains-var",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://darkmagicstudios.com"),
  title: {
    default: "Dark Magic Studios — apps, tools & software",
    template: "%s",
  },
  description:
    "A small independent studio building developer tools, apps, and game systems. Hocus and Vitreus in development, Signum free in your browser, Forgeboard and Pulsebook on the way.",
  openGraph: {
    title: "Dark Magic Studios — apps, tools & software",
    description:
      "A small independent studio building developer tools, apps, and game systems.",
    url: "/",
    siteName: "Dark Magic Studios",
    type: "website",
  },
  icons: [{ rel: "icon", url: "/vector.ico" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${cinzel.variable} ${cormorant.variable} ${manrope.variable} ${jetbrains.variable}`}
    >
      <body>
        <GoogleAnalytics />
        {children}
      </body>
    </html>
  );
}
