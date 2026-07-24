import React, { useEffect, useRef } from 'react';

export default function Canvas3D() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Mouse tracking for subtle parallax
    let mouse = { x: width / 2, y: height / 2, targetX: width / 2, targetY: height / 2 };

    const handleMouseMove = (e) => {
      mouse.targetX = e.clientX;
      mouse.targetY = e.clientY;
    };
    window.addEventListener('mousemove', handleMouseMove);

    // Subtle, cute micro particle system (NO large spheres or giant bubbles)
    const particleCount = Math.min(Math.floor(width / 35), 35);
    const particles = Array.from({ length: particleCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      z: Math.random() * 1.5 + 0.5,
      radius: Math.random() * 1.8 + 0.6, // Tiny delicate particles
      dx: (Math.random() - 0.5) * 0.3,
      dy: (Math.random() - 0.5) * 0.3,
      alpha: Math.random() * 0.5 + 0.2,
      pulseSpeed: Math.random() * 0.02 + 0.005,
      color: Math.random() > 0.5 ? 'rgba(37, 99, 235,' : 'rgba(168, 85, 247,'
    }));

    const render = () => {
      mouse.x += (mouse.targetX - mouse.x) * 0.05;
      mouse.y += (mouse.targetY - mouse.y) * 0.05;

      ctx.clearRect(0, 0, width, height);

      // Render Floating Cute Micro Particles & Constellations
      particles.forEach((p, i) => {
        p.x += p.dx;
        p.y += p.dy;
        p.alpha += Math.sin(Date.now() * p.pulseSpeed) * 0.004;

        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        const parallaxX = (mouse.x - width / 2) * 0.008 * p.z;
        const parallaxY = (mouse.y - height / 2) * 0.008 * p.z;

        ctx.beginPath();
        ctx.arc(p.x + parallaxX, p.y + parallaxY, p.radius * p.z, 0, Math.PI * 2);
        ctx.fillStyle = `${p.color}${Math.max(0.1, Math.min(0.7, p.alpha))})`;
        ctx.fill();

        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dist = Math.hypot(p.x - p2.x, p.y - p2.y);
          if (dist < 90) {
            ctx.beginPath();
            ctx.moveTo(p.x + parallaxX, p.y + parallaxY);
            ctx.lineTo(p2.x + parallaxX, p2.y + parallaxY);
            ctx.strokeStyle = `rgba(168, 85, 247, ${0.08 * (1 - dist / 90)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 0,
        opacity: 0.7
      }}
    />
  );
}
