import Navigation from "@/components/navigation";
import Hero from "@/components/hero";
import Marquee from "@/components/marquee";
import Clients from "@/components/clients";
import Services from "@/components/services";
import Portfolio from "@/components/portfolio";
import About from "@/components/about";
import Stats from "@/components/stats";
import Process from "@/components/process";
import Testimonials from "@/components/testimonials";
import Faq from "@/components/faq";
import Blog from "@/components/blog";
import Cta from "@/components/cta";
import Footer from "@/components/footer";

export default function Home() {
  return (
    <main className="relative min-h-screen" style={{ overflowX: "clip" }}>
      <Navigation />
      <Hero />
      <Marquee />
      <Clients />
      <Services />
      <Portfolio />
      <About />
      <Stats />
      <Process />
      <Testimonials />
      <Faq />
      <Blog />
      <Cta />
      <Footer />
    </main>
  );
}
