import { api } from "@/lib/api"
import Image from "next/image"
import Cookie from 'js-cookie'
import { login } from "@/lib/actions"

interface AvatarProps {
  id: string,
  name: string,
  avatarUrl: string
  loggedUser: boolean | null
}

export function Avatar({ avatarUrl, id, name, loggedUser }: AvatarProps) {
  async function handleLogin() {
    try {
      await login(avatarUrl, id, name)
    } catch (error) {
      console.error('Erro ao fazer login', error)
    }
  }

  return (
    <button onClick={handleLogin}>
      <Image
        className={`rounded-full border-4 border-transparent border-gradient ${!loggedUser ? 'opacity-25 hover:opacity-100' : ''}`}
        src={avatarUrl}
        width={160}
        height={160}
        alt="Avatar do usuário"
      />
    </button>
  )
}