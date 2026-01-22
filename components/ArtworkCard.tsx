"use client";

import {
    motion,
    useMotionValue,
    useSpring,
    useTransform,
    easeOut,
    easeInOut,
} from "framer-motion";
import { useState } from "react";

interface ArtworkCardProps {
    image: string;
    title: string;
    category: string;
    index: number;
}

export const ArtworkCard = ({
    image,
    title,
    category,
    index,
}: ArtworkCardProps) => {
    const [isHovered, setIsHovered] = useState(false);

    // Mouse position
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    // Smooth spring motion
    const mouseXSpring = useSpring(x, { stiffness: 250, damping: 25 });
    const mouseYSpring = useSpring(y, { stiffness: 250, damping: 25 });

    // 3D rotation
    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["12deg", "-12deg"]);
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-12deg", "12deg"]);

    // Mouse tracking
    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const xPct = (e.clientX - rect.left) / rect.width - 0.5;
        const yPct = (e.clientY - rect.top) / rect.height - 0.5;

        x.set(xPct);
        y.set(yPct);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
        setIsHovered(false);
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, delay: index * 0.1, ease: easeOut }}
            style={{
                rotateX,
                rotateY,
                transformStyle: "preserve-3d",
            }}
            animate={{
                y: isHovered ? -6 : 0, // subtle lift
            }}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={handleMouseLeave}
            className="group relative cursor-pointer will-change-transform"
        >
            <div
                className="relative overflow-hidden rounded-xl bg-card shadow-lg"
                style={{ transformStyle: "preserve-3d" }}
            >
                {/* Image */}
                <motion.div
                    className="aspect-4/5 overflow-hidden"
                    style={{ transform: "translateZ(40px)" }}
                    animate={{ scale: isHovered ? 1.06 : 1 }}
                    transition={{ duration: 0.6, ease: easeOut }}
                >
                    <img
                        src={image}
                        alt={title}
                        className="w-full h-full object-cover"
                        draggable={false}
                    />
                </motion.div>

                {/* Light sweep */}
                <motion.div
                    className="absolute inset-0 bg-linear-to-r from-transparent via-white/10 to-transparent"
                    initial={{ x: "-120%" }}
                    animate={{ x: isHovered ? "120%" : "-120%" }}
                    transition={{ duration: 0.8, ease: easeInOut }}
                />

                {/* Overlay */}
                <motion.div
                    className="absolute inset-0 bg-linear-to-t from-foreground/80 via-foreground/30 to-transparent"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: isHovered ? 1 : 0 }}
                    transition={{ duration: 0.3 }}
                />

                {/* Content */}
                <motion.div
                    className="absolute bottom-0 left-0 right-0 p-6"
                    style={{ transform: "translateZ(60px)" }}
                    initial={{ y: 24, opacity: 0 }}
                    animate={{
                        y: isHovered ? 0 : 24,
                        opacity: isHovered ? 1 : 0,
                    }}
                    transition={{ duration: 0.35, ease: easeOut }}
                >
                    <p className="text-xs tracking-widest uppercase text-primary-foreground/70 mb-2">
                        {category}
                    </p>
                    <h3 className="font-display text-xl text-primary-foreground">
                        {title}
                    </h3>
                </motion.div>

                {/* Sketch border */}
                <motion.div
                    className="absolute inset-0 rounded-xl border-2 border-sketch-line/30 pointer-events-none"
                    style={{ transform: "rotate(-0.6deg) translateZ(80px)" }}
                    animate={{ opacity: isHovered ? 1 : 0 }}
                    transition={{ duration: 0.3 }}
                />
            </div>
        </motion.div>
    );
};
