"use client"

import Stats from "@/app/_components/stats";
import Link from "next/link";
import { useState, useEffect } from "react";
interface Circle {
  size: number;
  left: number;
  top: number;
  opacity: number;
  transitionTime: number;
  intervalId?: NodeJS.Timeout; // Optional property for interval ID
}

export default function Page() {
  const [circles, setCircles] = useState<Circle[]>([]);

  useEffect(() => {
    const createCircle = (): Circle => {
      const size = Math.random() * 3 + 1; // Range: 1px to 4px
      const left = Math.random() * (window.innerWidth - size * 2);
      const top = Math.random() * (window.innerHeight - size * 2);
      const opacity = Math.random() < 0.5 ? 0.1 : 1;
      const transitionTime = Math.random() * 0.5 + 0.25; // Range: 0.25s to 075s

      return {
        size,
        left,
        top,
        opacity,
        transitionTime,
      };
    };
    // Calculate target number of circles based on area
    const density = 10; // Adjust this value to control circle density
    const targetNumberOfCircles = Math.floor(
      (window.innerWidth * window.innerHeight) / (density * 1000)
    );

    const newCircles = Array(targetNumberOfCircles).fill(null).map(createCircle);
    setCircles(newCircles);

    // Window resize listener
    const handleResize = () => {
      // Calculate target number of circles based on new window size
      const density = 10; // Adjust this value to control circle density
      const targetNumberOfCircles = Math.floor(
        (window.innerWidth * window.innerHeight) / (density * 1000)
      );

      // Create new circles or update existing ones if needed
      if (circles.length !== targetNumberOfCircles) {
        const newCircles = Array(targetNumberOfCircles).fill(null).map(createCircle);
        setCircles(newCircles);
      }
    };
    window.addEventListener('resize', handleResize);

    // Clean up intervals and resize listener when the component unmounts
    return () => {
      circles.forEach((circle) => clearInterval(circle.intervalId));
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div>
      <section className="w-full h-dvh text-white bg-black flex items-center justify-center">
        <div>
        {circles.map((circle, index) => (
          <div
            key={index}
            className="circle"
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
        </div>
        <div className="h-full text-center items-center align-middle justify-center mt-16 md:mt-96">
          <h1 className="text-5xl md:text-7xl lg:text-8xl xl:text-9xl font-bold">Louie</h1>
          <p className="text-2xl md:text-4xl xl:text-7xl leading-6">Hi, im Louie! Student, Programmer, Mathmetician, Human</p>
        
          <div className='mt-16 lg:mt-32 xl:mt-64 items-center justify-center p-10 flex-row gap-5 hidden md:flex'>
            <div>
              <h2 className="text-2xl md:text-4xl xl:text-7xl font-bold">Interesting Stats</h2>
              <div className='flex-row flex gap-4 justify-center items-center mt-5'>
                <Stats data={{
                  "Coding": 95,
                  "Math": 99,
                  "Charizzma": 150,
                }}/>
              </div>
            </div>
            <div>
              <h2 className="text-2xl md:text-4xl xl:text-7xl font-bold">Things i do</h2>
              <div className='flex-row flex gap-4 justify-center items-center mt-5'>
                <ul className="list-disc">
                  <li>Code</li>
                  <li>Math</li>
                  <li>Love</li>
                </ul>
              </div>
            </div>
          </div>        
        </div>
      </section>
      <section>

      </section>
    </div>
  )
}