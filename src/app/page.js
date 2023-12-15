import Image from 'next/image'
import logo_Zorro from './img/logo_Zorro.jpeg'
import Link from 'next/link';

export default function Home() {
  return (
      <section className="flex flex-col items-center justify-center h-full w-full">
        <img
          src={logo_Zorro.src}
          alt="ZoRRO"
          width={300}
          height={300}
        />
        <h1 className="text-4xl font-bold text-white">
          ZoRRO
        </h1>
        <p className="text-xl text-white">
          Aplicativo de Inteligencia Artificial ZoRRO
        </p>
        <Link href="login">Login</Link>
      </section>
  )
}
