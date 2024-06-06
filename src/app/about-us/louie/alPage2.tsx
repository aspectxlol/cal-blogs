"use server"
import Stats from "@/app/_components/stats";
import { Repo } from "@/interfaces/Repo";
import Link from "next/link";

export default async function Louie() {
  const githubRepos:Repo[] = await (await fetch('https://api.github.com/users/aspectxlol/repos', { cache: 'force-cache' })).json()
  // console.log(githubRepos)
  githubRepos.sort((a, b) => b.stargazers_count - a.stargazers_count)

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
  return (
    <div className="md:p-5 p-2">
      <div id="profile">
        <h1 className="text-6xl font-bold text-center">Louie</h1>  
      </div>    
      <div className="flex sm:flex-row flex-col gap-4">
        <Stats data={{
          "Coding": 95,
          "Math": 99,
          "Charizzma": 150,
        }}/>
        <p className="text-justify max-w-fit flex-wrap">Student, Programmer, Mathmetician, Human. does Programming just for the fun of it. does math just because he can.</p>
      </div>
      <div className="my-4 text-center md:text-left">
        <h1 className="text-2xl font-bold">Projects</h1>
        <div className="gap-4 flex flex-col sm:flex-row">
          {githubRepos.filter((v, i) => i < 3).map((v: Repo) => 
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
      <div className="my-4 flex flex-row gap-4">
        <div>
          <h1 className="text-2xl font-bold">How to Contact me</h1>
          <div>
            <ul className="list-inside list-disc">
              <li className="list-item">
                <Link href={'mailto:gamernxt6@gmail.com'}>Email</Link>
              </li>
              <li>
                Discord @aspectxlol
              </li>
              <li>
                <Link href={'https://www.instagram.com/leui.hansen/'}>Instagram</Link>
              </li>
            </ul>
          </div>
        </div>
        <div>
          <h1 className="text-2xl font-bold">Find me on</h1>
          <div>
            <ul className="list-inside list-disc">
              <li className="list-item">
                <Link href={'https://github.com/aspectxlol'}>Github</Link>
              </li>
              <li>
                <Link href={'https://www.instagram.com/leui.hansen/'}>Instagram</Link>
              </li>
              <li>
                <Link href={'https://www.youtube.com/channel/UCujSEd_3GdpuWcF3dK4GOPg'}>Youtube</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
