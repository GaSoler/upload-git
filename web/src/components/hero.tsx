'use client'
import { useEffect, useState } from "react";
import { Avatar } from "./avatar";
import { api } from "@/lib/api";
import Cookie from 'js-cookie'
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { jwtDecode } from "jwt-decode";

interface User {
  id: string
  name: string
  avatarUrl: string
}

interface UserCookies {
  sub: string
  name: string
  avatarUrl: string
}
let user_cookie: UserCookies | undefined;
const isLogged = Cookie.get('user_data');
if (isLogged !== undefined) {
    const user_cookie:User = jwtDecode(isLogged);
    console.log(user_cookie);
}

export function Hero() {
  const [users, setUsers] = useState<User[]>([])

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await api.get('/users')
        const fetchedUsers = response.data
        setUsers(fetchedUsers)
      } catch (error) {
        console.error('Erro ao buscar lista de usuários:', error)
      }
    }

    fetchUsers()
  }, [isLogged])
  
  return (
    <div className="mx-auto max-w-[420px] space-y-5 text-center lg:mx-0 lg:text-left">
      {/* Text Info */}
      <div className="space-y-1">
        {isLogged ? (
          <>
            <h1 className="text-5xl font-bold leading-tight text-slate-100">
              Ei psiu...
            </h1>
            <p className="text-lg leading-relaxed">
              Fique à vontade para trocar de usuário e ver os momentos que seu
              parceiro decidiu deixar recordado.
            </p>
          </>
        ) : (
          <>
            <h1 className="text-5xl font-bold leading-tight text-slate-100">
              Quem está acessando?
            </h1>
            <p className="text-lg leading-relaxed">
              Acesse um usuário para começar a guardar suas recordações ou espie as
              recordações do seu parceiro.
            </p>
          </>
        )}
      </div>
      <div className="flex items-center justify-center gap-3 self-stretch">
        {users.map((user) => (
          <Avatar
            key={user.id}
            avatarUrl={user.avatarUrl}
            id={user.id}
            name={user.name}
            loggedUser={user_cookie?.sub === user.id}
          />
        ))}
      </div>
      {/* Logged User */}
      {isLogged ? (
        <>
          <div className="flex flex-col items-center justify-center gap-1">
            <h1 className="text-center text-4xl">
              Cápsula do tempo de <b>{user_cookie?.name}</b>
            </h1>
          </div>
          <div className="flex flex-col gap-4 items-center justify-center">
            <Link
              className="relative py-3 px-6 rounded-lg border-none cursor-pointer text-slate-100 bg-violet-500 custom-animation"
              href="/memories/new#form"
            >
              Criar nova memória
            </Link>
          </div>
        </>
      ) : null}
      
    </div>
  )
}