import { Authentication } from "@/components/authentication";
import "./globals.css";
import type { Metadata } from "next";
import {
  Roboto_Flex as Roboto,
  Bai_Jamjuree as BaiJamjuree,
} from "next/font/google";
import { cookies } from "next/headers";
import { Hero } from "@/components/hero";

const roboto = Roboto({ subsets: ['latin'], variable: '--font-roboto' })
const baiJamjuree = BaiJamjuree({  subsets: ['latin'], weight: '700', variable: '--font-bai-jamjuree' })

export const metadata: Metadata = {
  title: "Spacetime",
  description: "Uma cápsula do tempo construída com React, Next.js, TailwindCSS e Typescript.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const isAuthenticated = cookies().has('auth_token')
  const isLogged = cookies().has('user_data')

  return (
    <html lang="en">
      <body
        className={`${roboto.variable} ${baiJamjuree.variable} bg-slate-900 font-sans text-slate-100`}
      >
        <main className="grid min-h-screen sm:grid-cols-1 md:grid-cols-2">
          {/* Left */}
          <div className="relative flex flex-col items-center justify-center overflow-hidden border-r border-white/10 px-28 py-16 bg-[url(../assets/bg-stars.svg)]">
            {/* Blur */}
            {/* <div className="absolute right-0 top-1/2 h-[288px] w-[526px] -translate-y-1/2 translate-x-1/2 rounded-full bg-purple-700 opacity-50 blur-full" /> */}

            {/* Stripes */}
            <div className="absolute bottom-0 right-2 top-0 w-2 bg-stripes" />

            
            {isAuthenticated ? <Hero /> : <Authentication />}
          </div>

          {/* Right */}
          <div className="flex max-h-screen flex-col overflow-y-scroll bg-[url(../assets/bg-stars.svg)] bg-cover">
            {children}
          </div>
        </main>
      </body>
    </html>
  );
}
