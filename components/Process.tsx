"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { Pencil, Eye, Layers, Sparkles, LucideIcon } from "lucide-react";
import { useRef } from "react";

interface Step {
    icon: LucideIcon;
    title: string;
    description: string;
}

const steps: Step[] = [
    {
        icon: Eye,
        title: "Observation",
        description:
            "Every piece begins with careful study. I spend hours observing my subject, understanding the play of light and shadow, the subtle nuances that give life to form.",
    },
    {
        icon: Pencil,
        title: "Initial Sketch",
        description:
            "Light, gestural marks establish the composition. This stage is about capturing energy and proportion before committing to detail.",
    },
    {
        icon: Layers,
        title: "Building Depth",
        description:
            "Layer by layer, the image emerges. Cross-hatching, blending, and careful pressure control create the full range of values.",
    },
    {
        icon: Sparkles,
        title: "Final Touches",
        description:
            "The final stage is about refinement—adding highlights with an eraser, deepening shadows, and ensuring every element serves the whole.",
    },
];

const tools: string[] = [
    "Faber-Castell 9000 Pencils (2H to 8B)",
    "Strathmore Bristol Paper 400 Series",
    "Kneaded Erasers",
    "Blending Stumps & Tortillons",
    "Mechanical Pencils for Fine Details",
    "Fixative Spray for Preservation",
];

export const Process = () => {
    const ref = useRef<HTMLDivElement | null>(null);

    // Parallax on scroll
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"],
    });

    const parallaxY = useTransform(scrollYProgress, [0, 1], [0, -80]);

    return (
        <section id="process" className="py-32 paper-texture overflow-hidden">
            <div ref={ref} className="container mx-auto px-6">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="text-center mb-20"
                >
                    <p className="text-sm tracking-[0.3em] uppercase text-muted-foreground mb-4">
                        Behind the Art
                    </p>

                    <motion.h2
                        className="section-heading"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3, duration: 0.8 }}
                    >
                        Process & Tools
                    </motion.h2>
                </motion.div>

                {/* Steps */}
                <motion.div
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-24"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={{
                        hidden: {},
                        visible: { transition: { staggerChildren: 0.18 } },
                    }}
                >
                    {steps.map((step, index) => (
                        <motion.div
                            key={step.title}
                            variants={{
                                hidden: { opacity: 0, y: 40 },
                                visible: { opacity: 1, y: 0 },
                            }}
                            transition={{ duration: 0.6, ease: "easeOut" }}
                            className="relative group"
                        >
                            <motion.div
                                className="p-8 bg-card rounded-lg transition-all duration-500 group-hover:shadow-float group-hover:-translate-y-3"
                                whileHover={{ scale: 1.04 }}
                            >
                                {/* Number */}
                                <span className="absolute top-4 right-4 font-display text-6xl text-muted/50 font-medium">
                                    {String(index + 1).padStart(2, "0")}
                                </span>

                                {/* Icon */}
                                <motion.div
                                    whileHover={{ rotate: 12, scale: 1.15 }}
                                    className="w-12 h-12 mb-6 flex items-center justify-center rounded-full bg-secondary"
                                >
                                    <step.icon className="w-6 h-6 text-foreground" />
                                </motion.div>

                                <h3 className="font-display text-xl mb-4">{step.title}</h3>
                                <p className="text-sm text-muted-foreground leading-relaxed">
                                    {step.description}
                                </p>
                            </motion.div>

                            {/* Connector */}
                            {index < steps.length - 1 && (
                                <div className="hidden lg:block absolute top-1/2 -right-4 w-8 border-t-2 border-dashed border-sketch-line/30" />
                            )}
                        </motion.div>
                    ))}
                </motion.div>

                {/* Tools */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="bg-card rounded-2xl p-8 md:p-12"
                >
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <div>
                            <h3 className="font-display text-3xl mb-6">Tools of the Trade</h3>

                            <p className="body-text mb-8">
                                Quality materials are essential to achieving the depth and
                                precision my work requires. Here are the tools I rely on in the
                                studio.
                            </p>

                            <ul className="space-y-4">
                                {tools.map((tool, index) => (
                                    <motion.li
                                        key={tool}
                                        initial={{ opacity: 0, x: -20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{
                                            duration: 0.4,
                                            delay: index * 0.1,
                                            ease: "easeOut",
                                        }}
                                        className="flex items-center gap-4 text-muted-foreground"
                                    >
                                        <span className="w-2 h-2 rounded-full bg-accent" />
                                        {tool}
                                    </motion.li>
                                ))}
                            </ul>
                        </div>

                        {/* Animated Illustration */}
                        <motion.div
  style={{ y: parallaxY }}
  initial={{ opacity: 0, scale: 0.95 }}
  whileInView={{ opacity: 1, scale: 1 }}
  viewport={{ once: true }}
  transition={{ duration: 0.7 }}
  whileHover={{ scale: 1.03 }}
  className="relative"
>
  <motion.div
    animate={{
      y: [0, -10, 0], // bobbing float
    }}
    transition={{
      duration: 6,
      repeat: Infinity,
      ease: "easeInOut",
    }}
    className="aspect-square bg-secondary rounded-2xl flex items-center justify-center overflow-hidden shadow-xl relative"
  >
    {/* Soft glow pulse */}
    <motion.div
      className="absolute inset-0 rounded-2xl bg-accent/10 blur-3xl"
      animate={{ opacity: [0.2, 0.5, 0.2] }}
      transition={{ duration: 5, repeat: Infinity }}
    />

    {/* Large rotating dashed ring */}
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
      className="absolute inset-0 flex items-center justify-center"
    >
      <div className="w-[85%] h-[85%] border-[3px] border-dashed border-sketch-line/20 rounded-full" />
    </motion.div>

    {/* Middle ring */}
    <motion.div
      animate={{ rotate: -360 }}
      transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
      className="absolute inset-0 flex items-center justify-center"
    >
      <div className="w-[60%] h-[60%] border-2 border-dashed border-sketch-line/30 rounded-full" />
    </motion.div>

    {/* Quick subtle rotation ellipse */}
    <motion.div
      animate={{ rotate: [0, 6, 0] }}
      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      className="absolute inset-0 flex items-center justify-center"
    >
      <div className="w-[40%] h-[28%] border border-sketch-line/20 rounded-full rotate-45" />
    </motion.div>

    {/* Pencil in middle */}
    <motion.div
      animate={{
        rotate: [-3, 3, -3],
      }}
      transition={{
        duration: 5,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      <Pencil className="w-24 h-24 text-sketch-line/40" />
    </motion.div>
  </motion.div>
</motion.div>

                    </div>
                </motion.div>
            </div>
        </section>
    );
};
