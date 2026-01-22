import About from "@/components/About";
import { Contact } from "@/components/Contact";
import { Gallery } from "@/components/Gallery";
import { Hero } from "@/components/Hero";
import { PencilParticles } from "@/components/PencilParticles";
import { Process } from "@/components/Process";
import { Sketchbook } from "@/components/Sketchbook";

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <PencilParticles />
      <main>
        <Hero />
        <Gallery />
        <About />
        <Process />
        <Sketchbook />
        <Contact />
      </main>
    </div>
  );
}
