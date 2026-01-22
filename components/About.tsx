"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";

export default function About() {
    const containerRef = useRef<HTMLDivElement>(null);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"],
    });

    // Parallax depth
    const imageY = useTransform(scrollYProgress, [0, 1], [-80, 80]);
    const textY = useTransform(scrollYProgress, [0, 1], [60, -60]);
    const imageRotate = useTransform(scrollYProgress, [0, 1], [-2, 2]);

    const textContainer = {
        hidden: {},
        show: {
            transition: {
                staggerChildren: 0.15,
            },
        },
    };

    const textItem = {
        hidden: { opacity: 0, y: 30 },
        show: { opacity: 1, y: 0 },
    };

    return (
        <section
            id="about"
            ref={containerRef}
            className="relative py-32 bg-card overflow-hidden"
        >
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    {/* IMAGE */}
                    <motion.div
                        style={{ y: imageY, rotate: imageRotate }}
                        className="relative"
                    >
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.9, ease: "easeOut" }}
                            whileHover={{ scale: 1.03 }}
                            className="relative"
                        >
                            <div className="relative w-full h-96 lg:h-125">
                                <Image
                                    src="/assets/sketch-portrait.jpg"
                                    alt="Artist portrait"
                                    fill
                                    className="rounded-lg shadow-float object-cover object-top"
                                    priority
                                />
                            </div>

                            {/* Decorative frames */}
                            <motion.div
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                transition={{ delay: 0.4 }}
                                className="absolute -inset-4 border-2 border-sketch-line/30 rounded-lg -rotate-2 -z-10"
                            />
                            <motion.div
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                transition={{ delay: 0.6 }}
                                className="absolute -inset-8 border border-sketch-line/10 rounded-lg rotate-1 -z-20"
                            />
                        </motion.div>

                        {/* FLOATING QUOTE */}
                        <motion.div
                            initial={{ opacity: 0, x: 60 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.7, delay: 0.5 }}
                            animate={{
                                y: [0, -6, 0],
                            }}
                            className="absolute -bottom-8 -right-4 lg:right-0 bg-background p-6 rounded-lg shadow-sketch max-w-xs"
                        >
                            <p className="font-display text-lg italic text-foreground/80">
                                “Art is not what you see, but what you make others see.”
                            </p>
                            <p className="text-sm text-muted-foreground mt-2">
                                — Edgar Degas
                            </p>
                        </motion.div>
                    </motion.div>

                    {/* CONTENT */}
                    <motion.div
                        style={{ y: textY }}
                        variants={textContainer}
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true }}
                    >
                        <motion.p
                            variants={textItem}
                            className="text-sm tracking-[0.3em] uppercase text-muted-foreground mb-4"
                        >
                            About the Artist
                        </motion.p>

                        <motion.h2
                            variants={textItem}
                            className="section-heading mb-8"
                        >
                            A Journey in{" "}
                            <span className="pencil-underline">Lines</span>
                        </motion.h2>

                        <motion.div
                            variants={textContainer}
                            className="space-y-6"
                        >
                            <motion.p variants={textItem} className="body-text">
                                For over five years, I've dedicated myself to the timeless
                                craft of pencil illustration. What began as childhood doodles
                                transformed into a passionate pursuit of capturing the world's
                                quiet beauty through graphite and paper.
                            </motion.p>

                            <motion.p variants={textItem} className="body-text">
                                My work explores the intersection of classical technique and
                                contemporary subjects, finding poetry in everyday moments—the
                                curve of a hand, the architecture of forgotten streets, the
                                silent language of eyes.
                            </motion.p>

                            <motion.p variants={textItem} className="body-text">
                                Based in Mombasa, Kenya, I draw inspiration from the
                                Renaissance masters while developing a voice distinctly my
                                own. Each piece is a meditation, a slow dance between
                                observation and interpretation.
                            </motion.p>
                        </motion.div>

                        {/* STATS */}
                        <motion.div
                            variants={textContainer}
                            className="mt-10 flex flex-wrap gap-10"
                        >
                            {[
                                { value: "5+", label: "Years of Practice" },
                                { value: "200+", label: "Original Works" },
                                { value: "10+", label: "Exhibitions" },
                            ].map((stat) => (
                                <motion.div
                                    key={stat.label}
                                    variants={textItem}
                                    whileHover={{ y: -4 }}
                                >
                                    <p className="font-display text-4xl font-medium">
                                        {stat.value}
                                    </p>
                                    <p className="text-sm text-muted-foreground">
                                        {stat.label}
                                    </p>
                                </motion.div>
                            ))}
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
