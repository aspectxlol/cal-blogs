"use client"

import { density } from "@/constants";
import { useState, useEffect, createRef } from "react";
import SkyCSS from '@/styles/sky.module.css'
import Link from "next/link";

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
  const sectRef = createRef<HTMLElement>()
  const [InView, setInView] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting)
      },
      { rootMargin: "-300px" }
    );
    observer.observe(sectRef.current!)
    return () => observer.disconnect()
  }, [sectRef]);


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
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
        <div className='absolute bottom-16 left-0 right-0 mx-auto items-center justify-center flex'>
          <button className='rounded-full p-5 border-white border-4 hover:mb-4 hover:p-7 transition-all' onClick={() => { sectRef.current?.scrollIntoView({ behavior: "smooth" }) }}>Look At More!</button>
        </div>
      </section>
      <section className="h-dvh w-full p-5" ref={sectRef}>
        <h1 className={`text-9xl text-center font-bold mt-52 block ${InView ? "translate-x-0 opacity-100" : "-translate-x-48 opacity-0"} transition-all duration-500`}>About Us</h1>
        <div className="flex flex-row justify-center text-center items-center my-14 gap-5">
          <Link className={`rounded-lg shadow-lg p-12 border-2 hover:shadow-xl transition-all ${InView ? "translate-x-0 opacity-100" : "-translate-x-48 opacity-0"} transition-all duration-500 delay-75`} href={"/about-us/louie"}>
            <h1 className="font-bold text-2xl">Louie</h1>
          </Link>
          <Link className={`rounded-lg shadow-lg p-12 border-2 hover:shadow-xl transition-all ${InView ? "translate-x-0 opacity-100" : "-translate-x-48 opacity-0"} transition-all duration-500 delay-150`} href={"/about-us/calvin"}>
            <h1 className="font-bold text-2xl">Calvin</h1>
          </Link>
        </div>
      </section>
    </main>
  );
}
