import { EmptyMemories } from "@/components/empty-memories";
import Image from "next/image";
import Link from "next/link";
import dayjs from 'dayjs'
import ptBR from 'dayjs/locale/pt-br'
import { ArrowRight } from "lucide-react";
import { cookies } from "next/headers";
import { api } from "@/lib/api";
import { InConstruction } from "@/components/in-construction";

dayjs.locale(ptBR)

interface Memory {
  id: string
  coverUrl: string
  excerpt: string
  createdAt: string
}

export default async function Home() {
  const isLoged = cookies().has('user_data')

  if (!isLoged) {
    return <InConstruction />
  }

  const token = cookies().get('user_data')?.value

  const response = await api.get('/memories', {
    headers: {
      Authorization: `Bearer ${token}`,
    }
  })

  const memories: Memory[] = response.data;

  if (memories.length === 0) {
    return <EmptyMemories />
  }

  return (
    <div className="flex flex-col gap-10 p-8">
      {memories.map((memory) => {
        return (
          <div key={memory.id} className="space-y-4">
            <time className="-ml-8 flex items-center gap-2 text-sm text-gray-100 before:h-px before:w-5 before:bg-gray-50">
              {dayjs(memory.createdAt).format('D[ de ]MMMM[, ]YYYY')}
            </time>
            <div className="px-4">
              {memory.coverUrl.includes('.mp') ? (
                <video
                  src={memory.coverUrl}
                  controls={false}
                  autoPlay={false}
                  className="aspect-video w-full rounded-lg object-cover"
                />
              ) : (
                <Image
                  src={memory.coverUrl}
                  alt=""
                  width={592}
                  height={280}
                  className="aspect-video w-full rounded-lg object-contain" // object-scale-down
                />
              )}
              <p className="text-lg leading-relaxed text-gray-50">
                {memory.excerpt}
              </p>
              <Link
                href={`/memories/${memory.id}`}
                className="flex items-center gap-2 text-sm text-gray-100 hover:text-gray-50"
              >
                Ler mais
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        )
      })}
    </div>
  );
}
