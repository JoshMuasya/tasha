"use client";

import { motion } from "framer-motion";
import { ArtworkCard } from "./ArtworkCard";

interface Artwork {
    image: string;
    title: string;
    category: string;
}

const artworks: Artwork[] = [
    { image: "/assets/sketch-portrait.jpg", title: "Silent Reflection", category: "Portraits" },
    { image: "/assets/sketch-hands.jpg", title: "Connected", category: "Studies" },
    { image: "/assets/sketch-street.jpg", title: "Old Town Memories", category: "Architecture" },
    { image: "/assets/sketch-cat.jpg", title: "Peaceful Dreams", category: "Animals" },
    { image: "/assets/sketch-botanic.jpg", title: "Wild Growth", category: "Botanical" },
    { image: "/assets/sketch-eye.jpg", title: "Window to the Soul", category: "Details" },
];

const containerVariants = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.15,
        },
    },
};

export const Gallery = () => {
    return (
        <section
            id="gallery"
            className="relative py-32 paper-texture overflow-hidden"
        >
            {/* Ambient background motion */}
            <motion.div
                className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-foreground/5 blur-3xl"
                animate={{ y: [0, 20, 0], x: [0, -20, 0] }}
                transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
            />

            <div className="relative container mx-auto px-6">
                {/* Section header */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7, ease: "easeOut" }}
                    className="text-center mb-20"
                >
                    <p className="text-sm tracking-[0.3em] uppercase text-muted-foreground mb-4">
                        Selected Works
                    </p>
                    <h2 className="section-heading">The Gallery</h2>
                </motion.div>

                {/* Artwork grid */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                >
                    {artworks.map((artwork, index) => (
                        <ArtworkCard
                            key={artwork.title}
                            image={artwork.image}
                            title={artwork.title}
                            category={artwork.category}
                            index={index}
                        />
                    ))}
                </motion.div>

                {/* View more button */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 }}
                    className="text-center mt-20"
                >
                    <motion.button
                        whileHover={{
                            scale: 1.05,
                            boxShadow: "0px 10px 30px rgba(0,0,0,0.15)",
                        }}
                        whileTap={{ scale: 0.96 }}
                        className="px-10 py-4 border-2 border-foreground text-foreground font-medium rounded-full transition-colors hover:bg-foreground hover:text-background"
                    >
                        View All Works
                    </motion.button>
                </motion.div>
            </div>
        </section>
    );
};
