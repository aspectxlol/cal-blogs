"use client"

import { density } from "@/constants";
import { useState, useEffect } from "react";
import SkyCSS from '@/styles/sky.module.css'

interface Circle {
  size: number;
  left: number;
  top: number;
  opacity: number;
  transitionTime: number;
  intervalId?: NodeJS.Timeout; 
}


export default function Home() {
  const [circles, setCircles] = useState<Circle[]>([]);
  
  useEffect(() => {
    const createCircle = (): Circle => {
      const size = Math.random() * 3 + 1; 
      const left = Math.random() * (window.innerWidth - size * 2);
      const top = Math.random() * (window.innerHeight - size * 2);
      const opacity = Math.random() < 0.5 ? 0.1 : 1;
      const transitionTime = Math.random() * 0.5 + 0.25; 
      return {
        size,
        left,
        top,
        opacity,
        transitionTime,
      };
    };
    const targetNumberOfCircles = Math.floor(
      (window.innerWidth * window.innerHeight) / (density * 1000)
    );

    const newCircles = Array(targetNumberOfCircles).fill(null).map(createCircle);
    setCircles(newCircles);
    const handleResize = () => {
      const targetNumberOfCircles = Math.floor(
        (window.innerWidth * window.innerHeight) / (density * 1000)
      );
      if (circles.length !== targetNumberOfCircles) {
        const newCircles = Array(targetNumberOfCircles).fill(null).map(createCircle);
        setCircles(newCircles);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => {
      circles.forEach((circle) => clearInterval(circle.intervalId));
      window.removeEventListener('resize', handleResize);
    };
  }, [circles]);

  return (
    <main>
      <section className={`h-dvh w-full flex items-center justify-center align-bottom bg-black text-white`}>
        {circles.map((circle, index) => (
          <div
            key={index}
            className={SkyCSS['circle']}
            style={{
              width: `${circle.size}px`,
              height: `${circle.size}px`,
              left: `${circle.left}px`,
              top: `${circle.top}px`,
              opacity: circle.opacity,
              transition: `opacity ${circle.transitionTime}s`,
            }}
          />
        ))}        
        <h1 className="font-bold text-3xl md:text-7xl">Calvin & Louie</h1>
      </section>
    </main>
  );
}
