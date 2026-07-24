import React, { useRef } from 'react';

export default function Tilt({ children, className = '', max = 8 }) {
  const ref = useRef(null);

  const onMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    el.style.transform = `perspective(800px) rotateY(${px * max}deg) rotateX(${-py * max}deg)`;
  };

  const reset = () => {
    if (ref.current) {
      ref.current.style.transform = 'perspective(800px) rotateY(0deg) rotateX(0deg)';
    }
  };

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={reset}
      className={`transition-transform duration-200 will-change-transform preserve-3d ${className}`}
      style={{ transformStyle: 'preserve-3d', transform: 'perspective(800px)' }}
    >
      {children}
    </div>
  );
}
