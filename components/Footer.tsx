"use client";

import { easeOut, motion } from "framer-motion";

const footerVariants = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.2,
        },
    },
};

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: easeOut } },
};

export const Footer: React.FC = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="py-12 bg-card border-t border-border">
            <div className="container mx-auto px-6">
                <motion.div
                    className="flex flex-col md:flex-row items-center justify-between gap-6"
                    variants={footerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                >
                    <motion.span
                        variants={itemVariants}
                        className="font-display text-xl"
                    >
                        Elena Moris
                    </motion.span>

                    <motion.p
                        variants={itemVariants}
                        className="text-sm text-muted-foreground text-center md:text-left"
                    >
                        © {currentYear} Elena Moris. All artworks and content are protected.
                    </motion.p>

                    <motion.div
                        variants={itemVariants}
                        className="flex gap-6"
                    >
                        <a
                            href="#"
                            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                        >
                            Privacy
                        </a>
                        <a
                            href="#"
                            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                        >
                            Terms
                        </a>
                    </motion.div>
                </motion.div>

                {/* Decorative line */}
                <motion.div
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
                    className="mt-8 h-px bg-linear-to-r from-transparent via-sketch-line/30 to-transparent origin-left"
                />

                <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5, duration: 0.6, ease: "easeOut" }}
                    className="mt-6 text-center text-xs text-muted-foreground/50 font-display italic"
                >
                    "Every line is a journey, every shadow a story."
                </motion.p>
            </div>
        </footer>
    );
};
