import type { Metadata } from "next";
import SignumApp from "./SignumApp";

export const metadata: Metadata = {
  title: "Signum — Dark Magic Studios",
  description:
    "Fill in and sign PDFs entirely in your browser. Drop in text, dates, company names, logos, and cursive signatures, then export the finished document. Nothing is uploaded anywhere.",
};

export default function SignumPage() {
  return (
    <>
      {/* Loaded as a direct <link>, not next/font: the cursive family names
          must resolve to literal strings usable in a <canvas> ctx.font at
          export time, which next/font's hashed CSS-variable names can't do. */}
      {/* eslint-disable-next-line @next/next/no-page-custom-font */}
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,600;9..144,700&family=IBM+Plex+Sans:wght@400;500;600&family=IBM+Plex+Mono:wght@400;500&family=Dancing+Script:wght@500;700&family=Great+Vibes&family=Sacramento&family=Allura&family=Parisienne&family=Caveat:wght@500;700&display=swap"
      />
      <SignumApp />
    </>
  );
}
