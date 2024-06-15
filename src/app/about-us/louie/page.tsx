import LouieStyles from '@/styles/Louie.module.css'

export default async function Louie() {
  return (
    <main>
      <section className="h-dvh w-full bg-black text-white">
        <div className="flex flex-col h-full justify-center">
          <h1 className="text-center text-9xl font-bold">Louie</h1>
        </div>
      </section>
      <section className="h-dvh w-full">
        <div className="flex flex-col h-full justify-center text-center">
          <div className="flex flex-row justify-center">
            <h1 className='text-9xl font-extrabold'>The Worlds best Programmer</h1>
          </div>
        </div>
      </section>
    </main>
  )
}