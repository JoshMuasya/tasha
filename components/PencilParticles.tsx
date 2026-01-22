"use client";

import { useEffect, useRef } from "react";

interface Particle {
    x: number;
    y: number;
    vx: number;
    vy: number;
    length: number;
    angle: number;
    opacity: number;
    life: number;
}

export const PencilParticles = () => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const particlesRef = useRef<Particle[]>([]);
    const mouseRef = useRef({ x: 0, y: 0 });
    const animationRef = useRef<number | null>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        resizeCanvas();
        window.addEventListener("resize", resizeCanvas);

        const handleMouseMove = (e: MouseEvent) => {
            mouseRef.current = { x: e.clientX, y: e.clientY };

            // Create particles near mouse
            for (let i = 0; i < 2; i++) {
                const angle = Math.random() * Math.PI * 2;

                particlesRef.current.push({
                    x: e.clientX + (Math.random() - 0.5) * 50,
                    y: e.clientY + (Math.random() - 0.5) * 50,
                    vx: Math.cos(angle) * 0.5,
                    vy: Math.sin(angle) * 0.5 - 0.3,
                    length: Math.random() * 15 + 5,
                    angle: Math.random() * Math.PI,
                    opacity: Math.random() * 0.3 + 0.1,
                    life: 1,
                });
            }

            // Limit particles
            if (particlesRef.current.length > 100) {
                particlesRef.current = particlesRef.current.slice(-100);
            }
        };

        // Initial ambient particles
        for (let i = 0; i < 30; i++) {
            particlesRef.current.push({
                x: Math.random() * window.innerWidth,
                y: Math.random() * window.innerHeight,
                vx: (Math.random() - 0.5) * 0.3,
                vy: (Math.random() - 0.5) * 0.3 - 0.1,
                length: Math.random() * 20 + 10,
                angle: Math.random() * Math.PI,
                opacity: Math.random() * 0.15 + 0.05,
                life: 1,
            });
        }

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            const isDark = document.documentElement.classList.contains("dark");
            const strokeColor = isDark ? "200, 195, 185" : "60, 55, 50";

            particlesRef.current.forEach((particle) => {
                particle.x += particle.vx;
                particle.y += particle.vy;
                particle.life -= 0.003;
                particle.angle += 0.01;

                if (particle.life <= 0 || particle.y < -50) {
                    particle.x = Math.random() * canvas.width;
                    particle.y = canvas.height + 50;
                    particle.life = 1;
                }

                ctx.save();
                ctx.translate(particle.x, particle.y);
                ctx.rotate(particle.angle);
                ctx.beginPath();
                ctx.moveTo(-particle.length / 2, 0);
                ctx.lineTo(particle.length / 2, 0);
                ctx.strokeStyle = `rgba(${strokeColor}, ${particle.opacity * particle.life
                    })`;
                ctx.lineWidth = 1.5;
                ctx.lineCap = "round";
                ctx.stroke();
                ctx.restore();
            });

            animationRef.current = requestAnimationFrame(animate);
        };

        window.addEventListener("mousemove", handleMouseMove);
        animate();

        return () => {
            window.removeEventListener("resize", resizeCanvas);
            window.removeEventListener("mousemove", handleMouseMove);
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current);
            }
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 z-10 pointer-events-none"
        />
    );
};
