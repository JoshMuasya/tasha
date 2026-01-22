"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";

export const Hero = () => {
    const containerRef = useRef<HTMLDivElement>(null);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"],
    });

    const y1 = useTransform(scrollYProgress, [0, 1], [0, -100]);
    const y2 = useTransform(scrollYProgress, [0, 1], [0, -200]);
    const y3 = useTransform(scrollYProgress, [0, 1], [0, -150]);
    const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
    const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95]);

    return (
        <section
            ref={containerRef}
            className="
        relative min-h-screen flex items-center justify-center overflow-hidden
        bg-gradient-paper
      "
        >
            {/* Floating sketches */}
            <motion.div style={{ y: y1 }} className="absolute top-20 left-[5%] w-40 md:w-56 lg:w-72 opacity-70">
                <motion.div initial={{ opacity: 0, x: -60 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 1.2, delay: 0.4 }}>
                    <Image
                        src="/assets/sketch-portrait.jpg"
                        alt="Portrait sketch"
                        width={320}
                        height={420}
                        className="
              rounded-lg shadow-(--shadow-sketch)
              -rotate-6 border border-sketch-line/20
            "
                    />
                </motion.div>
            </motion.div>

            <motion.div style={{ y: y2 }} className="absolute bottom-32 right-[5%] w-36 md:w-48 lg:w-64 opacity-60">
                <motion.div initial={{ opacity: 0, x: 60 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 1.2, delay: 0.6 }}>
                    <Image
                        src="/assets/sketch-hands.jpg"
                        alt="Hands sketch"
                        width={300}
                        height={200}
                        className="
              rounded-lg shadow-(--shadow-sketch)
              rotate-3 border border-sketch-line/15
            "
                    />
                </motion.div>
            </motion.div>

            <motion.div style={{ y: y3 }} className="absolute top-1/3 right-[15%] w-28 md:w-36 lg:w-44 opacity-50 hidden md:block">
                <motion.div initial={{ opacity: 0, scale: 0.75 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1.3, delay: 0.8 }}>
                    <Image
                        src="/assets/sketch-eye.jpg"
                        alt="Eye sketch"
                        width={200}
                        height={200}
                        className="
              rounded-lg shadow-(--shadow-sketch)
              rotate-6 border border-pencil/20
            "
                    />
                </motion.div>
            </motion.div>

            {/* Decorative sketch circles */}
            <motion.div
                className="absolute top-28 right-[18%] w-28 h-28 opacity-[0.07]"
                animate={{ rotate: 360 }}
                transition={{ duration: 80, repeat: Infinity, ease: "linear" }}
            >
                <svg viewBox="0 0 120 120" className="w-full h-full">
                    <path
                        d="M60,10 C85,10 105,30 105,60 C105,90 85,110 60,110 C35,110 15,90 15,60 C15,30 35,10 60,10 Z"
                        fill="none"
                        stroke="var(--color-pencil)"
                        strokeWidth="1.4"
                        strokeDasharray="2 1.5"
                        strokeLinecap="round"
                        opacity="0.6"
                    />
                </svg>
            </motion.div>

            <motion.div
                className="absolute bottom-40 left-[12%] w-40 h-40 opacity-[0.05]"
                style={{ y: y2 }}
                animate={{ rotate: -380 }}
                transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
            >
                <svg viewBox="0 0 160 160" className="w-full h-full">
                    <path
                        d="M80,20 C110,20 135,45 135,80 C135,115 110,140 80,140 C50,140 25,115 25,80 C25,45 50,20 80,20 Z"
                        fill="none"
                        stroke="var(--color-sketch-line)"
                        strokeWidth="1.2"
                        strokeDasharray="3 2"
                        strokeLinecap="round"
                        opacity="0.5"
                    />
                </svg>
            </motion.div>

            {/* Main content */}
            <motion.div style={{ opacity, scale }} className="relative z-20 text-center px-6 max-w-5xl mx-auto">
                <motion.p
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7 }}
                    className="text-sm md:text-base tracking-[0.35em] uppercase font-light text-muted-foreground"
                >
                    Artist & Illustrator
                </motion.p>

                <motion.h1
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.9, delay: 0.25 }}
                    className="
            font-display text-5xl md:text-7xl lg:text-8xl
            font-medium tracking-tight mb-8 md:mb-10 text-charcoal
          "
                >
                    <span
                        className="relative inline-block"
                        style={{ color: "var(--pencil)" }}           // ← sets currentColor
                    >
                        Mitchelle
                        <svg
                            className="absolute left-0 -bottom-1.5 w-full h-3.5 md:h-4.5"
                            preserveAspectRatio="none"
                            viewBox="0 0 300 20"
                        >
                            <path
                                d="M0,15 Q75,4 150,12 T300,15"
                                stroke="currentColor"
                                strokeWidth="3.5"
                                strokeLinecap="round"
                                opacity="0.85"
                            />
                            <path
                                d="M0,16 Q60,6 150,14 T300,16"
                                stroke="currentColor"
                                strokeWidth="2.8"
                                strokeLinecap="round"
                                opacity="0.6"
                            />
                        </svg>
                    </span> {" "}

                    Tasha
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.45 }}
                    className="max-w-2xl mx-auto mb-12 md:mb-14 text-lg md:text-xl leading-relaxed text-graphite"
                >
                    Capturing moments and emotions through the timeless art of pencil and paper.
                    <br className="hidden sm:block" />
                    Every stroke tells a story, every shadow holds meaning.
                </motion.p>

                <motion.div className="flex flex-col sm:flex-row gap-5 justify-center">
                    {/* Primary CTA */}
                    <motion.a
                        href="#gallery"
                        className="px-9 py-5 rounded-full font-medium bg-primary text-primary-foreground shadow-(--shadow-float) transition-colors"
                        whileHover={{
                            scale: 1.04,
                            boxShadow: "0 25px 60px -15px hsla(30, 10%, 15%, 0.4)",
                        }}
                        whileTap={{ scale: 0.97 }}
                    >
                        View Gallery
                    </motion.a>

                    {/* Secondary CTA */}
                    <motion.a
                        href="#contact"
                        className="px-9 py-5 rounded-full border font-medium border-border text-primary bg-transparent hover:bg-muted transition-colors"
                        whileHover={{ scale: 1.04 }}
                        whileTap={{ scale: 0.97 }}
                    >
                        Get in Touch
                    </motion.a>
                </motion.div>

            </motion.div>
        </section>
    );
};
