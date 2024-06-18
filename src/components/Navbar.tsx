import Link from "next/link";
import NavbarCSS from '@/styles/Navbar.module.css'

export default function Navbar() {
  return (
    <nav>
      <div className="fixed flex flex-row justify-center items-center text-white font-extrabold w-full text-4xl">
        <div className="flex flex-row gap-16">
          <Link href={'/post'} className={`rounded hover:-translate-y-4 hover:shadow-xl transition-all p-2 ${NavbarCSS['link']} duration-150`}>
            <h1>Blogs</h1>
          </Link>
          <Link href={'/store'} className={`rounded hover:-translate-y-4 hover:shadow-xl transition-all p-2 ${NavbarCSS['link']} duration-150`}>
            <h1>store</h1>
          </Link>
        </div>
      </div>
    </nav>
  )
}