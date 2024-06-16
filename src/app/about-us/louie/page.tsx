"use client"

import LouieStyles from '@/styles/Louie.module.css'
import { createRef } from 'react'

export default function Louie() {
  const sectRef = createRef<HTMLElement>()

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
          <div className="flex flex-row justify-center">
            <h1 className='text-9xl font-extrabold'>The Worlds best <span className='bg-red-800 text-white'>Programmer</span></h1>
          </div>
        </div>
      </section>
    </main>
  )
}