"use client";

import { motion, useScroll, useTransform, Variants } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";


interface Sketch {
    image: string;
    title: string;
    date: string;
}

const sketches: Sketch[] = [
    { image: "/assets/sketch-cat.jpg", title: "Quick cat study", date: "Dec 2024" },
    { image: "/assets/sketch-botanic.jpg", title: "Garden notes", date: "Nov 2024" },
    { image: "/assets/sketch-street.jpg", title: "Morning walk", date: "Oct 2024" },
    { image: "/assets/sketch-eye.jpg", title: "Expression study", date: "Sept 2024" },
];

// Animation variants
const fadeUp: Variants = {
    hidden: { opacity: 0, y: 30 },
    show: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, ease: "easeOut" },
    },
};

const cardVariant: Variants = {
    hidden: { opacity: 0, scale: 0.85 },
    show: (i: number) => ({
        opacity: 1,
        scale: 1,
        transition: {
            duration: 0.6,
            delay: i * 0.15,
            ease: "easeOut",
        },
    }),
};

export const Sketchbook = () => {
    const containerRef = useRef<HTMLDivElement>(null);

    // Parallax scroll
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"],
    });

    const x = useTransform(scrollYProgress, [0, 1], ["0%", "-20%"]);

    return (
        <section
            id="sketchbook"
            ref={containerRef}
            className="py-32 bg-card overflow-hidden"
        >
            {/* Section Header */}
            <div className="container mx-auto px-6 mb-12">
                <motion.div
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true }}
                    className="flex flex-col md:flex-row md:items-end md:justify-between gap-6"
                >
                    <div>
                        <p className="text-sm tracking-[0.3em] uppercase text-muted-foreground mb-4">
                            Daily Practice
                        </p>
                        <h2 className="section-heading">The Sketchbook</h2>
                    </div>

                    <p className="body-text max-w-md">
                        A glimpse into daily sketches, studies, and experiments. The
                        informal space where ideas take their first breath.
                    </p>
                </motion.div>
            </div>

            {/* Horizontal Parallax Gallery */}
            <motion.div style={{ x }} className="flex gap-6 pl-6 md:pl-12">
                {sketches.map((sketch, index) => (
                    <motion.div
                        key={sketch.title}
                        custom={index}
                        variants={cardVariant}
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true }}
                        className="shrink-0 w-72 md:w-96 group"
                    >
                        <div className="relative overflow-hidden rounded-lg bg-background shadow-sm">
                            {/* Texture overlay */}
                            <div className="absolute inset-0 bg-linear-to-br from-transparent to-background/10 z-10 pointer-events-none" />

                            <motion.div whileHover={{ scale: 1.03 }} transition={{ duration: 0.5 }}>
                                <Image
                                    src={sketch.image}
                                    alt={sketch.title}
                                    width={400}
                                    height={600}
                                    className="w-full aspect-square object-cover"
                                />
                            </motion.div>

                            {/* Tape effect */}
                            <div className="absolute top-4 left-1/2 -translate-x-1/2 w-16 h-6 bg-sepia/30 -rotate-2 z-20" />
                        </div>

                        <div className="mt-4 flex justify-between items-baseline">
                            <p className="font-display text-lg">{sketch.title}</p>
                            <p className="text-sm text-muted-foreground">{sketch.date}</p>
                        </div>
                    </motion.div>
                ))}

                {/* View More Card */}
                <motion.div
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true }}
                    className="shrink-0 w-72 md:w-96 flex items-center justify-center"
                >
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.4 }}
                        className="p-8 border-2 border-dashed border-sketch-line/40 rounded-lg text-muted-foreground hover:border-foreground hover:text-foreground transition-colors"
                    >
                        <span className="font-display text-lg">View Full Sketchbook →</span>
                    </motion.button>
                </motion.div>
            </motion.div>
        </section>
    );
};
