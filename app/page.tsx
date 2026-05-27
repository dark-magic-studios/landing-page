import NavBar from "@/components/NavBar";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import TheWork from "@/components/TheWork";
import Engagement from "@/components/Engagement";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <NavBar />
      <main>
        <Hero />
        <Services />
        <TheWork />
        <Engagement />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
