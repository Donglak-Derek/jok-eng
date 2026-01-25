"use client";

import { useEffect, useRef } from "react";



interface Particle {
    x: number;
    y: number;
    vx: number;
    vy: number;
    radius: number; // Used for font size now
    color: string;
    char: string; // New: The letter
    originalVx: number;
    originalVy: number;
}

export default function InteractiveGridBackground() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const mouseRef = useRef({ x: 0, y: 0 });
    const isHoveringRef = useRef(false);
    
    const containerRectRef = useRef<DOMRect | null>(null);
    
    // Config
    const PARTICLE_COUNT = 50; // Slightly fewer for text readability
    const MIN_SIZE = 16;
    const MAX_SIZE = 48; // Variable font sizes
    const MOUSE_RADIUS = 200;
    const MOUSE_FORCE = 0.05;
    
    // Alphabet
    const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!?@#$&";
    
    useEffect(() => {
        const canvas = canvasRef.current;
        const container = containerRef.current;
        if (!canvas || !container) return;

        // Brand Colors (Tailwind mapped manually for canvas)
        const COLORS = [
            "rgba(79, 70, 229, 0.25)",  // Primary (lighter for text)
            "rgba(14, 165, 233, 0.25)", // Sky
            "rgba(244, 63, 94, 0.20)",  // Rose
            "rgba(148, 163, 184, 0.20)" // Slate
        ];

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let animationFrameId: number;
        let particles: Particle[] = [];
        let width = 0;
        let height = 0;
        let debounceTimer: NodeJS.Timeout;

        const initPoints = () => {
            if (!container) return;
            width = container.offsetWidth;
            height = container.offsetHeight;
            containerRectRef.current = container.getBoundingClientRect(); // Cache rect on resize
            
            // Handle high DPI
            const dpr = window.devicePixelRatio || 1;
            canvas.width = width * dpr;
            canvas.height = height * dpr;
            canvas.style.width = `${width}px`;
            canvas.style.height = `${height}px`;
            ctx.scale(dpr, dpr);
            ctx.textBaseline = "middle";
            ctx.textAlign = "center";

            // Create Particles
            particles = [];
            for (let i = 0; i < PARTICLE_COUNT; i++) {
                const size = Math.random() * (MAX_SIZE - MIN_SIZE) + MIN_SIZE;
                const x = Math.random() * width;
                const y = Math.random() * height;
                // Random slow movement
                const vx = (Math.random() - 0.5) * 0.5; // Slower for text
                const vy = (Math.random() - 0.5) * 0.5;
               const color = COLORS[Math.floor(Math.random() * COLORS.length)];
                const char = CHARS[Math.floor(Math.random() * CHARS.length)];

                particles.push({
                    x, y, vx, vy, radius: size, color, char,
                    originalVx: vx,
                    originalVy: vy
                });
            }
        };

        const animate = () => {
            if (!ctx || !canvas) return;
            
            // Fix: Clear the logical area
            ctx.clearRect(0, 0, width, height);

            particles.forEach(p => {
                // 1. Move
                p.x += p.vx;
                p.y += p.vy;

                // 2. Wall Bounce (Soft wrap)
                const visualWidth = canvas.width / (window.devicePixelRatio || 1);
                const visualHeight = canvas.height / (window.devicePixelRatio || 1);
                const buffer = 50;

                if (p.x < -buffer) p.x = visualWidth + buffer;
                if (p.x > visualWidth + buffer) p.x = -buffer;
                if (p.y < -buffer) p.y = visualHeight + buffer;
                if (p.y > visualHeight + buffer) p.y = -buffer;

                // 3. Mouse Interaction
                if (isHoveringRef.current) {
                    const dx = p.x - mouseRef.current.x;
                    const dy = p.y - mouseRef.current.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < MOUSE_RADIUS) {
                        const angle = Math.atan2(dy, dx);
                        const force = (MOUSE_RADIUS - distance) / MOUSE_RADIUS;
                        const pushX = Math.cos(angle) * force * 2; 
                        const pushY = Math.sin(angle) * force * 2;
                        
                        p.vx += pushX * MOUSE_FORCE;
                        p.vy += pushY * MOUSE_FORCE;
                    }
                }

                // Friction
                p.vx = p.vx * 0.98 + p.originalVx * 0.02;
                p.vy = p.vy * 0.98 + p.originalVy * 0.02;

                // 4. Draw Text
                ctx.font = `bold ${p.radius}px Inter, sans-serif`;
                ctx.fillStyle = p.color;
                ctx.fillText(p.char, p.x, p.y);
            });

            animationFrameId = requestAnimationFrame(animate);
        };

        // Resize Observer for robust resizing with debounce
        const resizeObserver = new ResizeObserver(() => {
            clearTimeout(debounceTimer);
            debounceTimer = setTimeout(() => {
                initPoints();
            }, 200);
        });
        resizeObserver.observe(container);

        const handleMouseMove = (e: MouseEvent) => {
            if (!containerRectRef.current) return;
            const rect = containerRectRef.current;
            mouseRef.current = {
                x: e.clientX - rect.left,
                y: e.clientY - rect.top
            };
            isHoveringRef.current = true;
        };

        // Need to attach handlers and start
        initPoints();
        animate();

        window.addEventListener("mousemove", handleMouseMove);
        
        return () => {
            cancelAnimationFrame(animationFrameId);
            resizeObserver.disconnect();
            window.removeEventListener("mousemove", handleMouseMove);
        };
    }, []);

    return (
        <div ref={containerRef} className="absolute inset-0 z-0 overflow-hidden">
            <canvas 
                ref={canvasRef} 
                className="absolute inset-0 block"
            />
             {/* Fade out edges for seamless integration */}
             <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background/90" />
             <div className="absolute inset-0 bg-gradient-to-r from-background/50 via-transparent to-background/50" />
        </div>
    );
}
