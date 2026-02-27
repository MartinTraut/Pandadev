import Navigation from "@/components/navigation";
import Hero from "@/components/hero";
import Clients from "@/components/clients";
import ServicesGrid from "@/components/services-grid";
import FullService from "@/components/full-service";
import Automation from "@/components/automation";
import Projects from "@/components/projects";
import TechStack from "@/components/tech-stack";
import Trust from "@/components/trust";
import CtaSection from "@/components/cta-section";
import Footer from "@/components/footer";

function SectionDivider() {
  return <div className="gradient-line mx-auto max-w-5xl" />;
}

export default function Home() {
  return (
    <>
      <Navigation />
      <main>
        <Hero />
        <Clients />
        <SectionDivider />
        <ServicesGrid />
        <FullService />
        <SectionDivider />
        <Automation />
        <Projects />
        <SectionDivider />
        <TechStack />
        <Trust />
        <CtaSection />
      </main>
      <Footer />
    </>
  );
}
