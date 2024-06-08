"use client"

import Stats from "@/app/_components/about-me/stats";
import { density } from "@/constants";
import { Repo } from "@/interfaces/Repo";
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
  const [repos, setRepos] = useState<Repo[]>([]);


  useEffect(() => {
    const fetchRepos = async () => {
      try {
        const response = await fetch('https://api.github.com/users/aspectxlol/repos', {
          cache: 'force-cache', // Consider caching strategies for performance optimization
        });

        if (!response.ok) {
          throw new Error(`Error fetching GitHub repos: ${response.statusText}`);
        }

        const data: Repo[] = await response.json();
        const sortedRepos = data.sort((a, b) => b.stargazers_count - a.stargazers_count);
        setRepos(sortedRepos);
      } catch (error) {
        console.error('Error fetching GitHub repos:', error);
        // Handle errors gracefully, e.g., display an error message to the user
      }
    };

    fetchRepos();
  }, []);

  const NonCoding: {
    title: string,
    description: string,
    link?: string
  }[] = [
    {
      title: 'Foodiez',
      description: 'a p5 project, where we sell food and drinks',
      link: 'https://bwsite.vercel.app/foodiez'
    },
    {
      title: 'Suara Demokrasi',
      description: 'a p5 project, where we make a short film',
      link: 'https://drive.google.com/drive/u/0/folders/1WASOS-ILjOkQRFb1UJacXCei_jXPtRdM'
    }
  ]

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
    const targetNumberOfCircles = Math.floor(
      (window.innerWidth * window.innerHeight) / (density * 1000)
    );

    const newCircles = Array(targetNumberOfCircles).fill(null).map(createCircle);
    setCircles(newCircles);

    // Window resize listener
    const handleResize = () => {
      // Calculate target number of circles based on new window size
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
      <section className="w-full h-dvh text-white bg-louie flex items-center justify-center">
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
        <div className="h-full text-center items-center align-middle justify-center mt-64 md:mt-96">
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
                  "gay": 100
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
      <section className="w-full h-dvh p-20">
        <div className="my-4 text-center md:text-left">
        <h1 className="text-2xl font-bold">Projects</h1>
        <div className="gap-4 flex flex-col sm:flex-row">
          {repos.filter((v, i) => i < 3).map((v: Repo) => 
            <div key={v.id} className="border-2 rounded p-2 w-64 h-48">
              <h1 className=" font-bold">{v.name}</h1>
              <p className="my-4">{v.description}</p>
              <Link href={v.html_url} className="border rounded hover:bg-green-800 hover:text-white p-2">Learn More</Link>
            </div>
          )}
        </div>
      </div>
      <div className="my-4 text-center md:text-left">
        <h1 className="text-2xl font-bold">Non-Coding Projects</h1>
        <div className="gap-4 flex flex-col sm:flex-row">
          {NonCoding.filter((v, i) => i < 3).map((v) => 
            <div key={v.title} className="border-2 rounded p-2 w-64 h-48">
              <h1 className=" font-bold">{v.title}</h1>
              <p className="my-4">{v.description}</p>
              {/* <Link href={v.html_url} className="border rounded hover:bg-green-800 hover:text-white p-2">Learn More</Link> */}
              {v.link? <Link href={v.link!} className="border rounded hover:bg-green-800 hover:text-white p-2">Learn More</Link> : <></>}
            </div>
          )}
        </div>
      </div>
      </section>
    </div>
  )
}