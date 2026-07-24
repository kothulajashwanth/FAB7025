import React, { useEffect, useState } from 'react';

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [trailingPos, setTrailingPos] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const [sparkles, setSparkles] = useState([]);

  useEffect(() => {
    let animFrame;

    const handleMouseMove = (e) => {
      const x = e.clientX;
      const y = e.clientY;
      setPosition({ x, y });

      // Spawn cute micro sparkle dust trail
      if (Math.random() > 0.7) {
        const colors = ['#ec4899', '#a855f7', '#60a5fa', '#f59e0b', '#34d399'];
        const newSparkle = {
          id: Math.random() + Date.now(),
          x: x + (Math.random() - 0.5) * 8,
          y: y + (Math.random() - 0.5) * 8,
          size: Math.random() * 3.5 + 2,
          color: colors[Math.floor(Math.random() * colors.length)],
          rotation: Math.random() * 360,
          opacity: 0.9
        };

        setSparkles((prev) => [...prev.slice(-14), newSparkle]);
      }
    };

    const handleMouseDown = (e) => {
      const burst = Array.from({ length: 6 }, (_, i) => ({
        id: Math.random() + Date.now() + i,
        x: e.clientX + Math.cos((i * Math.PI) / 3) * 12,
        y: e.clientY + Math.sin((i * Math.PI) / 3) * 12,
        size: Math.random() * 4 + 2.5,
        color: '#ec4899',
        rotation: i * 60,
        opacity: 1
      }));
      setSparkles((prev) => [...prev.slice(-12), ...burst]);
    };

    const handleMouseOver = (e) => {
      const target = e.target;
      if (
        target.tagName === 'BUTTON' ||
        target.tagName === 'A' ||
        target.tagName === 'INPUT' ||
        target.getAttribute('role') === 'button' ||
        target.classList.contains('btn')
      ) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseover', handleMouseOver);

    const render = () => {
      setTrailingPos((prev) => ({
        x: prev.x + (position.x - prev.x) * 0.25,
        y: prev.y + (position.y - prev.y) * 0.25
      }));

      setSparkles((prev) =>
        prev
          .map((s) => ({ ...s, opacity: s.opacity - 0.04, y: s.y - 0.3 }))
          .filter((s) => s.opacity > 0)
      );

      animFrame = requestAnimationFrame(render);
    };
    animFrame = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseover', handleMouseOver);
      cancelAnimationFrame(animFrame);
    };
  }, [position.x, position.y]);

  return (
    <>
      {/* Cute Micro Sparkle Dust Trail */}
      {sparkles.map((s) => (
        <div
          key={s.id}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: `${s.size}px`,
            height: `${s.size}px`,
            backgroundColor: s.color,
            borderRadius: '50%',
            pointerEvents: 'none',
            zIndex: 9997,
            opacity: s.opacity,
            transform: `translate3d(${s.x}px, ${s.y}px, 0) rotate(${s.rotation}deg)`,
            boxShadow: `0 0 4px ${s.color}`
          }}
        />
      ))}

      {/* Cute Compact Core Dot */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: isHovered ? '8px' : '6px',
          height: isHovered ? '8px' : '6px',
          backgroundColor: isHovered ? '#ec4899' : '#a855f7',
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 9999,
          transform: `translate3d(${position.x - (isHovered ? 4 : 3)}px, ${position.y - (isHovered ? 4 : 3)}px, 0)`,
          transition: 'width 0.15s ease, height 0.15s ease, background-color 0.15s ease',
          boxShadow: '0 0 8px rgba(236, 72, 153, 0.8)'
        }}
      />

      {/* Cute Compact Delicate Ring (No Large Expanded Bubbles) */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: isHovered ? '20px' : '16px',
          height: isHovered ? '20px' : '16px',
          borderRadius: '50%',
          border: isHovered ? '1.5px solid #ec4899' : '1px solid rgba(168, 85, 247, 0.4)',
          backgroundColor: isHovered ? 'rgba(236, 72, 153, 0.08)' : 'transparent',
          pointerEvents: 'none',
          zIndex: 9998,
          transform: `translate3d(${trailingPos.x - (isHovered ? 10 : 8)}px, ${trailingPos.y - (isHovered ? 10 : 8)}px, 0)`,
          transition: 'width 0.15s ease, height 0.15s ease, border 0.15s ease',
          boxShadow: isHovered ? '0 0 12px rgba(236, 72, 153, 0.3)' : 'none'
        }}
      />
    </>
  );
}
