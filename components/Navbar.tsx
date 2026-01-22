"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { ModeToggle } from "./ModeToggle";

const navItems = [
    { label: "Work", href: "#gallery" },
    { label: "About", href: "#about" },
    { label: "Process", href: "#process" },
    { label: "Sketchbook", href: "#sketchbook" },
    { label: "Contact", href: "#contact" },
];

export const Navigation = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const scrollToSection = (href: string) => {
        const element = document.querySelector(href);
        if (element) element.scrollIntoView({ behavior: "smooth" });
        setIsMobileMenuOpen(false);
    };

    return (
        <>
            <motion.nav
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled
                        ? "bg-white/30 dark:bg-black/30 backdrop-blur-md shadow-lg py-4"
                        : "bg-transparent py-6"
                    }`}
            >
                <div className="container mx-auto px-6 flex items-center justify-between">
                    {/* Logo */}
                    <motion.a
                        href="#"
                        onClick={(e) => {
                            e.preventDefault();
                            window.scrollTo({ top: 0, behavior: "smooth" });
                        }}
                        className="font-display text-2xl font-semibold tracking-tight"
                        whileHover={{ scale: 1.05 }}
                    >
                        Mitchelle Tasha
                    </motion.a>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-8">
                        {navItems.map((item, index) => (
                            <motion.button
                                key={item.label}
                                onClick={() => scrollToSection(item.href)}
                                className="nav-link text-sm tracking-wide relative overflow-hidden"
                                initial={{ opacity: 0, y: -20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1, type: "spring", stiffness: 100 }}
                                whileHover={{ scale: 1.1, color: "#FF6B6B" }}
                            >
                                {item.label}
                            </motion.button>
                        ))}

                        {/* Theme Toggle */}
                        <ModeToggle />
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="flex md:hidden items-center gap-4">
                        <ModeToggle />
                        <motion.button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            whileTap={{ scale: 0.95 }}
                        >
                            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                        </motion.button>
                    </div>
                </div>
            </motion.nav>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                        className="fixed inset-0 z-40 bg-white/30 dark:bg-black/30 backdrop-blur-md flex flex-col items-center justify-center gap-8 md:hidden"
                    >
                        {navItems.map((item, index) => (
                            <motion.button
                                key={item.label}
                                onClick={() => scrollToSection(item.href)}
                                className="font-display text-3xl"
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.1 }}
                                whileHover={{ scale: 1.1, color: "#FF6B6B" }}
                            >
                                {item.label}
                            </motion.button>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};
