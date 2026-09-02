import NavBar from "@/components/NavBar";
import Hero from "@/components/Hero";
import HomeTeasers from "@/components/HomeTeasers";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <NavBar />
      <main>
        <Hero />
        <HomeTeasers />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
