"use client";

import { motion } from "framer-motion";
import { Mail, MapPin } from "lucide-react";
import { useState, FormEvent } from "react";
import { FaInstagram, FaTwitter } from "react-icons/fa";

// Types
interface FormState {
    name: string;
    email: string;
    message: string;
}

// Framer Motion Variants
const fadeInLeft = {
    hidden: { opacity: 0, x: -30 },
    show: { opacity: 1, x: 0, transition: { duration: 0.6 } },
};

const fadeInRight = {
    hidden: { opacity: 0, x: 30 },
    show: { opacity: 1, x: 0, transition: { duration: 0.6, delay: 0.2 } },
};

const floatHover = {
    hover: { scale: 1.1, rotate: 3 },
    tap: { scale: 0.94 },
};

const staggerContainer = {
    hidden: {},
    show: { transition: { staggerChildren: 0.15 } },
};

export const Contact = () => {
    const [formState, setFormState] = useState<FormState>({
        name: "",
        email: "",
        message: "",
    });

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        console.log("Form submitted:", formState);
    };

    return (
        <section id="contact" className="py-32 paper-texture">
            <div className="container mx-auto px-6">
                <motion.div
                    className="grid grid-cols-1 lg:grid-cols-2 gap-16"
                    variants={staggerContainer}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, amount: 0.2 }}
                >
                    {/* Left: Info */}
                    <motion.div variants={fadeInLeft}>
                        <p className="text-sm tracking-[0.3em] uppercase text-muted-foreground mb-4">
                            Let's Connect
                        </p>

                        <h2 className="section-heading mb-8">
                            Start a <span className="pencil-underline">Conversation</span>
                        </h2>

                        <p className="body-text mb-12 max-w-md">
                            Whether you're interested in commissioning a piece, collaborating on a
                            project, or simply want to discuss art, I'd love to hear from you.
                        </p>

                        <div className="space-y-6">
                            {/* Email */}
                            <motion.a
                                href="mailto:hello@mitchelletasha.art"
                                className="flex items-center gap-4 text-muted-foreground hover:text-foreground transition-colors group"
                                whileHover={{ x: 5 }}
                            >
                                <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center group-hover:bg-accent transition-colors">
                                    <Mail className="w-5 h-5" />
                                </div>
                                <span>hello@mitchelletasha.art</span>
                            </motion.a>

                            {/* Location */}
                            <motion.div
                                className="flex items-center gap-4 text-muted-foreground"
                                whileHover={{ x: 5 }}
                            >
                                <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center">
                                    <MapPin className="w-5 h-5" />
                                </div>
                                <span>Mombasa, Kenya</span>
                            </motion.div>
                        </div>

                        {/* Socials */}
                        <div className="mt-12 flex gap-4">
                            <motion.a
                                href="#"
                                className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center hover:bg-accent transition-colors"
                                variants={floatHover}
                                whileHover="hover"
                                whileTap="tap"
                            >
                                <FaInstagram className="w-5 h-5" />
                            </motion.a>

                            <motion.a
                                href="#"
                                className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center hover:bg-accent transition-colors"
                                variants={floatHover}
                                whileHover="hover"
                                whileTap="tap"
                            >
                                <FaTwitter className="w-5 h-5" />
                            </motion.a>
                        </div>
                    </motion.div>

                    {/* Right: Form */}
                    <motion.div variants={fadeInRight}>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Name */}
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium mb-2">
                                    Your Name
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    value={formState.name}
                                    onChange={(e) =>
                                        setFormState((prev) => ({ ...prev, name: e.target.value }))
                                    }
                                    className="w-full px-4 py-4 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring transition-all"
                                    placeholder="John Doe"
                                    required
                                />
                            </div>

                            {/* Email */}
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium mb-2">
                                    Email Address
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    value={formState.email}
                                    onChange={(e) =>
                                        setFormState((prev) => ({ ...prev, email: e.target.value }))
                                    }
                                    className="w-full px-4 py-4 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring transition-all"
                                    placeholder="john@example.com"
                                    required
                                />
                            </div>

                            {/* Message */}
                            <div>
                                <label htmlFor="message" className="block text-sm font-medium mb-2">
                                    Your Message
                                </label>
                                <textarea
                                    id="message"
                                    rows={6}
                                    value={formState.message}
                                    onChange={(e) =>
                                        setFormState((prev) => ({ ...prev, message: e.target.value }))
                                    }
                                    className="w-full px-4 py-4 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring transition-all resize-none"
                                    placeholder="Tell me about your project or inquiry..."
                                    required
                                />
                            </div>

                            {/* Submit */}
                            <motion.button
                                type="submit"
                                className="w-full px-8 py-4 bg-foreground text-background font-medium rounded-full transition-all duration-300 hover:shadow-float"
                                whileHover={{ scale: 1.03 }}
                                whileTap={{ scale: 0.97 }}
                            >
                                Send Message
                            </motion.button>
                        </form>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
};
