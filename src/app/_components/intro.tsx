"use client"
import Link from 'next/link';
import React, { useState, useEffect, ReactNode } from 'react';
import { density } from '../constants';

interface Circle {
  size: number;
  left: number;
  top: number;
  opacity: number;
  transitionTime: number;
  intervalId?: NodeJS.Timeout; 
}

export function Intro() {
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
  }, []);

  return (
    <section className="w-full h-dvh text-white">
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
      <div className="h-full text-center items-center align-middle justify-center mt-24">
        <h1 className="text-5xl md:text-7xl lg:text-8xl xl:text-9xl font-bold">CaL Blogs</h1>
        <p className="text-2xl md:text-4xl xl:text-7xl md:mt-5">Calvin & Louie</p>

        <div className='block mt-16 lg:mt-32 xl:mt-64 items-center p-10'>
          <h2 className="text-2xl md:text-4xl xl:text-7xl font-bold">About Us</h2>
          <div className='flex-row flex gap-4 justify-center items-center mt-2'>
            <Link
              href={'/about-us/louie'}
              className='rounded border-1 p-5 backdrop-blur-lg backdrop-brightness-125 cursor-pointer hover:backdrop-brightness-200 my-2'
            >
              <h1>Louie</h1>
            </Link>
            <Link
              className='rounded border-1 p-5 backdrop-blur-lg backdrop-brightness-125 cursor-pointer hover:backdrop-brightness-200 my-2'
              href={'/about-us/calvin'}
            >
              <h1>Calvin</h1>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
