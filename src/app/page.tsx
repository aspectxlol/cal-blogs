"use client"

import { density } from "@/constants";
import { useState, useEffect, createRef } from "react";
import SkyCSS from '@/styles/sky.module.css'
import Link from "next/link";
import { Post } from "@/interfaces/Post";
import PostPreview from "@/components/PostPreview";;

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
  const sectRef2 = createRef<HTMLElement>()
  const [RefInView, setRefInView] = useState(false)
  const [Ref2InView, setRef2InView] = useState(false)
  const [AllPosts, setAllPosts] = useState<Post[]>()

  useEffect(() => {
    const data = fetch('/api')
      .then((data) => data.json())
      .then(data => setAllPosts(data))
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setRef2InView(entry.isIntersecting)
      },
      { rootMargin: "-300px" }
    );
    observer.observe(sectRef2.current!)
    return () => observer.disconnect()
  }, [sectRef2]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setRefInView(entry.isIntersecting)
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
          <button className='rounded-full p-5 border-white border-4 hover:mb-4 hover:p-7 transition-all' onClick={() => { sectRef.current?.scrollIntoView({ behavior: "smooth" }) }}>About Us</button>
        </div>
      </section>
      <section className="h-dvh w-full p-5" ref={sectRef}>
        <h1 className={`text-9xl text-center font-bold mt-52 block ${RefInView ? "translate-x-0 opacity-100" : "-translate-x-48 opacity-0"} transition-all duration-500`}>About Us</h1>
        <div className="flex flex-row justify-center text-center items-center my-14 gap-5">
          <Link className={`rounded-lg shadow-lg p-12 border-2 hover:shadow-xl transition-all ${RefInView ? "translate-x-0 opacity-100" : "-translate-x-48 opacity-0"} transition-all duration-500 delay-75`} href={"/about-us/louie"}>
            <h1 className="font-bold text-2xl">Louie</h1>
          </Link>
          <Link className={`rounded-lg shadow-lg p-12 border-2 hover:shadow-xl transition-all ${RefInView ? "translate-x-0 opacity-100" : "-translate-x-48 opacity-0"} transition-all duration-500 delay-150`} href={"/about-us/calvin"}>
            <h1 className="font-bold text-2xl">Calvin</h1>
          </Link>
        </div>
        <div className={`relative left-0 right-0 mx-auto items-center justify-center flex ${RefInView ? "translate-x-0 opacity-100" : "-translate-x-48 opacity-0"} transition-all duration-500 delay-500`}>
          <button className='rounded-full p-5 border-black border-4 hover:mb-4 hover:p-7 transition-all' onClick={() => { sectRef2.current?.scrollIntoView({ behavior: "smooth" }) }}>Posts From Us</button>
        </div>
      </section>
      <section className="h-dvh w-full p-5" ref={sectRef2}>
        <h1 className={`text-9xl font-bold text-center mt-32 mb-8 ${RefInView ? "-translate-y-48 opacity-0" : "translate-y-0 opacity-100"} transition-all duration-500`}>Our Posts</h1>
        <div className="grid grid-cols-2 gap-5">
          {AllPosts?.map((post) => <PostPreview post={post} key={post.slug} />)}
        </div>
      </section>
    </main>
  );
}
