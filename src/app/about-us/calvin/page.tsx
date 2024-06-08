'use server'

import Stats from "@/app/_components/about-me/stats"

export default async function Calvin() {
  return (
    <div>
      <section className="w-full h-dvh">
        <div className="items-center align-middle justify-center flex flex-col h-full">
          <h1 className="text-7xl font-bold">Calvin</h1>
          <p className="text-4xl text-center max-w-screen-lg">Student, Friend, Therapist, Gacha Addict. Lore speaking, a dad and with 6 children. Play a whole ton of games and watches anime for life. Is tall just because he can.</p>
          <div className='mt-16 lg:mt-32 xl:mt-64  items-center justify-center p-10 flex-row gap-5 hidden md:flex'>
            <div>
              <h2 className="text-2xl md:text-4xl xl:text-7xl font-bold">Interesting Stats</h2>
              <div className='flex-row flex gap-4 justify-center items-center mt-5'>
                <Stats data={{
                  "Piano": 100,
                  "Math": 60,
                  "Charizzma": 300
                }}/>
              </div>
            </div>
            <div>
              <h2 className="text-2xl md:text-4xl xl:text-7xl font-bold">Things i do</h2>
              <div className='flex-row flex gap-4 justify-center items-center mt-5'>
                <ul className="list-disc">
                  <li>Games</li>
                  <li>Guitar</li>
                  <li>Keyboard</li>
                  <li>Cajon</li>
                  <li>Anime</li>
                  <li>Rubix Cube</li>
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