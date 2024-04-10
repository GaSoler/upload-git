'use client'
import { useEffect, useState } from "react";
import { Avatar } from "./avatar";
import { api } from "@/lib/api";
import Cookie from 'js-cookie'
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { jwtDecode } from "jwt-decode";
import { Loader } from "./loader";

interface User {
  id: string
  name: string
  avatarUrl: string
}

interface JwtPayload {
  sub: string
  name: string
  avatarUrl: string
}

export function Hero() {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(false);
  const [loggedUser, setLoggedUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const response = await api.get('/users')
        const fetchedUsers = response.data
        setUsers(fetchedUsers)
      } catch (error) {
        console.error('Erro ao buscar lista de usuários:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchUsers()

    const isLogged = Cookie.get('user_data');
    if (isLogged !== undefined) {
      const user_cookie: JwtPayload = jwtDecode(isLogged);
      const user: User = {
        id: user_cookie.sub,
        name: user_cookie.name,
        avatarUrl: user_cookie.avatarUrl
      };
        setLoggedUser(user);
    }
  }, [])

  if(loading){
    return <Loader />;
  }
  
  return (
    <div className="mx-auto max-w-[420px] space-y-5 text-center lg:mx-0 lg:text-left">
      {/* Text Info */}
      <div className="space-y-1">
        {loggedUser ? (
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
            loggedUser={loggedUser && loggedUser.id === user.id}
          />
        ))}
      </div>
      {/* Logged User */}
      {loggedUser ? (
        <>
          <div className="flex flex-col items-center justify-center gap-1">
            <h1 className="text-center text-4xl">
              Cápsula do tempo de <b>{loggedUser.name}</b>
            </h1>
          </div>
          <div className="flex flex-col gap-4 items-center justify-center">
            <Link
              className="relative py-3 px-6 rounded-lg border-none cursor-pointer text-slate-100 bg-violet-500 custom-animation-button"
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