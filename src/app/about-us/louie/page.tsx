"use client"

// import LouieStyles from '@/styles/Louie.module.css'
import { createRef, useEffect, useState } from 'react'

export default function Louie() {
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

  return (
    <main>
      <section className="h-dvh w-full bg-black text-white">
        <div className="flex flex-col h-full justify-center">
          <h1 className="text-center text-9xl font-bold ">Louie</h1>
        </div>
        <div className='absolute bottom-16 left-0 right-0 mx-auto items-center justify-center flex'>
          <button className='rounded-full p-5 border-white border-4 hover:mb-4 hover:p-7 transition-all' onClick={() => { sectRef.current?.scrollIntoView({ behavior: "smooth" }) }}>Look At More!</button>
        </div>
      </section>
      <section className="h-dvh w-full" ref={sectRef}>
        <div className="flex flex-col h-full justify-center text-center">
          <div className="flex flex-col justify-center">
            {/* {InView? <h1>In view</h1> : <h1>not In view</h1>} */}
            <h1 className={`text-9xl font-extrabold ${InView ? "translate-x-0 opacity-100" : "-translate-x-48 opacity-0"} transition-all duration-500`}>The Worlds best<span className='bg-red-800 text-white duration-1000 ml-4'>Programmer</span></h1>
            <p className={`mt-4 text-4xl font-bold ${InView ? "translate-x-0 opacity-100" : "-translate-x-48 opacity-0"} transition-all duration-500 delay-500`}>until proven otherwise<span className='text-red-700'>*</span></p>
          </div>
        </div>
      </section>
    </main>
  )
}