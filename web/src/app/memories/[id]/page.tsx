import { api } from "@/lib/api"
import dayjs from "dayjs"
import { cookies } from "next/headers"
import ptBR from 'dayjs/locale/pt-br'
import Image from "next/image"
import Link from "next/link"
import { ChevronLeft } from "lucide-react"

dayjs.locale(ptBR)

interface MemoryType {
  id: string
  coverUrl: string
  content: string
  createdAt: string
}

export default async function Memory({ params }: any) {
  const token = cookies().get('user_data')?.value

  const response = await api.get(`/memories/${params.id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  const memory: MemoryType = response.data

  return (
    <div className="flex flex-1 flex-col gap-4 p-16">
      <Link
        href="/"
        className="flex items-center gap-1 text-sm text-gray-50 hover:text-gray-100"
      >
        <ChevronLeft className="h-4 w-4" />
        voltar à timeline
      </Link>
      <article>
        {memory.coverUrl.includes('.mp') ? (
          <video
            src={memory.coverUrl}
            controls
            className="aspect-video w-full rounded-lg object-contain"
          />
        ) : (
          <Image
            src={memory.coverUrl}
            alt="Capa da memória do usuário"
            width={592}
            height={280}
            className="aspect-video w-full rounded-lg object-contain"
          />
        )}
        <time className="-ml-8 flex items-center gap-2 text-sm text-gray-100 before:h-px before:w-5 before:bg-gray-50">
          {dayjs(memory.createdAt).format('D[ de ]MMMM[, ]YYYY')}
        </time>
        <p className="py-4 text-lg leading-relaxed text-gray-50">
          {memory.content}
        </p>
      </article>
    </div>
  )
}