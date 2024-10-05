import { Inter } from 'next/font/google'
import { Providers } from "@/app/providers";
import '@/app/styles/globals.css'
import { Metadata } from 'next';
import NavBar from '@/_components/Admin/NavBar';


const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Prospera Admin',
  description: 'Prospera Admin',
  icons: "/faviconpms.ico",
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className='light'>
      <body className='bg-white text-black'>
        <main>
          <Providers>
            <NavBar />
            {children}
          </Providers>
        </main>
      </body>
    </html>
  )
}