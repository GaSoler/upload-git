import Link from "next/link";
import catImg from "../assets/gun.gif"
import Image from "next/image";

export function EmptyMemories() {
  return (
    <div className="flex flex-1 items-center justify-center p-16">
      <p className="w-[360px] text-center leading-relaxed">
        Você ainda não registrou nenhuma lembrança 🤨comece a{' '}
        <Link href="/memories/new" className="underline hover:text-gray-50">
          criar agora
        </Link>
        !
      </p>
    </div>
  )
}