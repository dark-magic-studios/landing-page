import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Dark Magic Studios",
  description:
    "Dark Magic Studios is an independent studio focused on tools, games, and developer products. We ship things that are useful, well-made, and built to last.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
