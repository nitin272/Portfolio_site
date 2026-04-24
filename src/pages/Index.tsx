import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import SystemFocus from "@/components/SystemFocus";
import Contact from "@/components/Contact";
import CustomCursor from "@/components/CustomCursor";
import ScrollProgress from "@/components/ScrollProgress";
import UXDelight from "@/components/UXDelight";

const Index = () => {
  return (
    <main className="bg-background text-foreground font-body min-h-screen overflow-x-hidden">
      <CustomCursor />
      <ScrollProgress />
      <UXDelight />
      <Nav />
      <Hero />
      <About />
      <Experience />
      <Projects />
      <Skills />
      <SystemFocus />
      <Contact />
    </main>
  );
};

export default Index;
