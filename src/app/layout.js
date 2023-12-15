import { Inter } from 'next/font/google'
import { Providers } from './providers'
import './globals.css'
const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'ZoRRO',
  description: 'Aplicativo de Inteligencia Artificial ZoRRO'
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
        <body className={`${inter.className}`}>
          <Providers>
            <main className="w-screen h-screen bg-gradient-to-br from-gray-800 to-gray-700 items-center justify-center flex flex-col">
              {children}
            </main>
          </Providers>
        </body>
    </html>
  )
}
