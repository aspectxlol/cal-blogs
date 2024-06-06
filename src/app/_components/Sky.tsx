'use client'
import React, { useState, useEffect, ReactNode } from 'react';
// import './page.css'; // Import your CSS file for styling

interface Circle {
  size: number;
  left: number;
  top: number;
  opacity: number;
  transitionTime: number;
  intervalId?: NodeJS.Timeout; // Optional property for interval ID
}

const AnimatedCircles: React.FC<{ children: JSX.Element }> = ({ children }: { children: ReactNode }) => {
  const [circles, setCircles] = useState<Circle[]>([]);

  useEffect(() => {
    function createCircle(): Circle {
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
    }

    const newCircles = Array(100).fill(null).map(createCircle);
    setCircles(newCircles);

    // Clean up intervals when the component unmounts
    return () => {
      circles.forEach((circle) => clearInterval(circle.intervalId));
    };
  }, []); // Empty dependency array to run effect only once

  useEffect(() => {
    circles.forEach((circle) => {
      const intervalId = setInterval(() => {
        circle.opacity = Math.random() * 0.75 + 0.25; // Range: 0.25 to 1
        circle.transitionTime = Math.random() * 0.5 + 0.25; // Range: 0.25s to 0.75s
      }, Math.random() * 2000 + 1000); // Range: 1s to 3s

      circle.intervalId = intervalId; // Store interval ID for cleanup
    });
  }, [circles]); // Dependency on `circles` to update intervals

  return (
    <div className="background">
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
      {children}
    </div>
  );
};

export default AnimatedCircles;
