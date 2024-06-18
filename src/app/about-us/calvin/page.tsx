"use client"

import { createRef, useState, useEffect } from "react";
import CalvinStyles from '@/styles/calvin.module.css'

export default function Calvin() {
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

  return  (
    <main>
      <section className="h-dvh w-full">
        <div className="flex flex-col h-full justify-center items-center">
          <h1 className="text-center font-bold text-5xl md:text-9xl">Calvin</h1>
        </div>
        <div className='absolute bottom-16 left-0 right-0 mx-auto items-center justify-center flex'>
          <button className='rounded-full p-5 border-black border-4 hover:mb-4 hover:p-7 transition-all' onClick={() => { sectRef.current?.scrollIntoView({ behavior: "smooth" }) }}>Look At More!</button>
        </div>
      </section>
      <section className="h-dvh w-full" ref={sectRef}>
        <div className="flex flex-col h-full items-center justify-center">
          <p className="text-center text-xl max-w-6xl md:text-4xl">
            <span className={`transition-all ${CalvinStyles['link-underline']} ${CalvinStyles['link-underline-black']} ${InView ? `${CalvinStyles['link-underline-hover']}` : ""} duration-150`}>Student</span>,
            <span  className={`transition-all ${CalvinStyles['link-underline']} ${CalvinStyles['link-underline-black']} ${InView ? `${CalvinStyles['link-underline-hover']}` : ""} duration-150 delay-200`}>Friend</span>,
            <span  className={`transition-all ${CalvinStyles['link-underline']} ${CalvinStyles['link-underline-black']} ${InView ? `${CalvinStyles['link-underline-hover']}` : ""} duration-150 delay-500`}>Therapist</span>,
            <span  className={`transition-all ${CalvinStyles['link-underline']} ${CalvinStyles['link-underline-black']} ${InView ? `${CalvinStyles['link-underline-hover']}` : ""} duration-150 delay-700`}>Gacha Addict</span>.
            Lore speaking, a <span className="font-bold">dad</span> and with <span className="font-bold">6</span> children. Play a whole ton of games and watches anime for life. Is tall just because he can.</p>
        </div>
      </section>
    </main>
  )
}